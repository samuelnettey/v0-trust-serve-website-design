import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import type { CandidateInsert } from "@/lib/types/candidate"

const toString = (value: any): string => {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (value instanceof File) return value.name
  return String(value)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract all form fields
    const applicationData: any = {}
    formData.forEach((value, key) => {
      if (value instanceof File) {
        // Handle file uploads - for now just store filename
        applicationData[key] = value.name
      } else {
        try {
          // Try to parse JSON arrays
          applicationData[key] = JSON.parse(value as string)
        } catch {
          // If not JSON, store as string
          applicationData[key] = value
        }
      }
    })

    console.log("[v0] Application data received:", Object.keys(applicationData))
    console.log("[v0] Form type received:", applicationData.formType)

    const availability = toString(applicationData.availability).trim()
    if (!availability) {
      return NextResponse.json(
        {
          success: false,
          error: "Availability is required",
        },
        { status: 400 },
      )
    }

    const validAvailabilities = ["Immediately", "Within 2 weeks", "Within 1 month", "More than 1 month"]
    if (!validAvailabilities.includes(availability)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid availability value. Must be one of: ${validAvailabilities.join(", ")}`,
        },
        { status: 400 },
      )
    }

    const supabase = await createClient()

    const formType = toString(applicationData.formType).toLowerCase()

    const candidateData: CandidateInsert = {
      // REQUIRED FIELDS - must always be provided
      full_name: toString(applicationData.fullName).trim() || "Unknown",
      phone: toString(applicationData.whatsappNumber).trim() || "",
      date_of_birth: "2000-01-01", // Default since we don't collect this
      form_type: formType || "general",

      // Optional personal information
      first_name: toString(applicationData.fullName).split(" ")[0]?.trim() || null,
      last_name: toString(applicationData.fullName).split(" ").slice(1).join(" ").trim() || null,
      whatsapp_number: toString(applicationData.whatsappNumber).trim() || null,
      email: toString(applicationData.email).trim() || null,
      ghana_card_front_url: applicationData.ghanaCardFront,
      ghana_card_back_url: applicationData.ghanaCardBack,

      // Form metadata with defaults
      status: "pending",

      // Employment history - optional fields
      previous_employer_name: toString(applicationData.previousEmployer1).trim() || null,
      previous_employment_duration: toString(applicationData.duration1).trim() || null,
      reason_for_leaving: toString(applicationData.reason1).trim() || null,

      availability: availability,
      work_type_preference: toString(applicationData.preferredWorkArrangement).trim() || null,

      // References - optional
      reference_name: toString(applicationData.reference1Name).trim() || null,
      reference_phone: toString(applicationData.reference1Phone).trim() || null,
      reference_type: toString(applicationData.reference1Relationship).trim() || null,
      emergency_contact_name: toString(applicationData.reference2Name).trim() || null,
      emergency_contact_phone: toString(applicationData.reference2Phone).trim() || null,
      emergency_contact_relationship: toString(applicationData.reference2Relationship).trim() || null,

      // Consent flags with proper boolean conversion
      consent_background_check:
        applicationData.consentBackgroundCheck === true || applicationData.consentBackgroundCheck === "true",
      consent_medical_screening:
        applicationData.consentMedicalScreening === true || applicationData.consentMedicalScreening === "true",
      consent_employment_terms:
        applicationData.consentEmploymentTerms === true || applicationData.consentEmploymentTerms === "true",
    }

    if (formType === "nanny") {
      const years = Number.parseInt(toString(applicationData.yearsExperience))
      candidateData.years_of_experience = Number.isNaN(years) ? 0 : years
      candidateData.childcare_experience_years = toString(applicationData.yearsExperience).trim() || null
      candidateData.age_groups_comfortable = Array.isArray(applicationData.ageGroupsComfortable)
        ? applicationData.ageGroupsComfortable
        : []
      candidateData.childcare_tasks = Array.isArray(applicationData.childcareTasks)
        ? applicationData.childcareTasks
        : []
      candidateData.special_needs_experience =
        applicationData.specialNeedsExperience === "yes" || applicationData.specialNeedsExperience === true
      candidateData.can_cook_for_children =
        applicationData.canCookForChildren === "yes" || applicationData.canCookForChildren === true
      console.log("[v0] Setting nanny-specific fields, years_of_experience:", candidateData.years_of_experience)
    } else if (formType === "househelp") {
      const years = Number.parseInt(toString(applicationData.yearsExperience))
      candidateData.years_of_experience = Number.isNaN(years) ? 0 : years
      candidateData.housekeeping_tasks = Array.isArray(applicationData.housekeepingTasks)
        ? applicationData.housekeepingTasks
        : []
      candidateData.household_skills = Array.isArray(applicationData.householdSkills)
        ? applicationData.householdSkills
        : []
      candidateData.cooking_skills = Array.isArray(applicationData.cookingSkills) ? applicationData.cookingSkills : []
      candidateData.comfortable_appliances = Array.isArray(applicationData.comfortableAppliances)
        ? applicationData.comfortableAppliances
        : []
      console.log("[v0] Setting househelp-specific fields, years_of_experience:", candidateData.years_of_experience)
    } else if (formType === "general") {
      const years = Number.parseInt(toString(applicationData.yearsExperience))
      candidateData.years_of_experience = Number.isNaN(years) ? 0 : years
      candidateData.preferred_role = toString(applicationData.preferredRole).trim() || null
      candidateData.domestic_skills = Array.isArray(applicationData.domesticSkills)
        ? applicationData.domesticSkills
        : []
      candidateData.special_skills = toString(applicationData.specialSkills).trim() || null
      candidateData.primary_strengths = Array.isArray(applicationData.primaryStrengths)
        ? applicationData.primaryStrengths
        : []
      console.log("[v0] Setting general-specific fields, years_of_experience:", candidateData.years_of_experience)
    } else {
      candidateData.years_of_experience = 0
      console.log("[v0] Unknown form type, defaulting years_of_experience to 0")
    }

    console.log("[v0] Inserting candidate with form_type:", candidateData.form_type)

    // Insert into candidates table
    const { data, error } = await supabase.from("candidates").insert([candidateData]).select()

    if (error) {
      console.error("[v0] Supabase error:", error.message, error.details, error.hint)
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to submit application",
          details: error.details,
          hint: error.hint,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Successfully inserted candidate:", data[0]?.id)
    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error submitting application:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit application",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
