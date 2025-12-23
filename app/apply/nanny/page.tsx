"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function NannyApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [attemptedNext, setAttemptedNext] = useState(false)

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const [formData, setFormData] = useState({
    // Step 1: Role & Work Type
    role: "Nanny",
    preferredWorkArrangement: "",
    availability: "",

    // Step 2: Eligibility & Identity
    fullName: "",
    whatsappNumber: "",
    ghanaCardFront: null as File | null,
    ghanaCardBack: null as File | null,

    // Step 3: Childcare Experience
    yearsExperience: "",
    ageGroupsComfortable: [] as string[],
    childcareTasks: [] as string[],
    cookingAbility: "",
    hasCprFirstAid: "",
    canCommunicateEnglish: "",
    specialNeedsExperience: "",

    // Step 4: Trust & Safety
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    emergencyContactRelationshipOther: "",
    referenceAvailable: "",
    referenceName: "",
    referencePhone: "",
    referenceRelationship: "",

    // Step 5: Consent
    consentBackgroundCheck: false,
    consentMedicalScreening: false,
    consentEmploymentTerms: false,
    consentToCheck: false,
    consentToTerms: false,
  })

  const handleNext = () => {
    setAttemptedNext(true)
    const errors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.preferredWorkArrangement) {
        errors.preferredWorkArrangement = "Please select a work arrangement"
      }
      if (!formData.availability) {
        errors.availability = "Please select your availability"
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setError("Please complete all required fields in this step")
        return
      }
    } else if (currentStep === 2) {
      if (!formData.fullName) errors.fullName = "Full name is required"
      if (!formData.whatsappNumber) errors.whatsappNumber = "WhatsApp phone number is required"
      if (!formData.ghanaCardFront) errors.ghanaCardFront = "Front of Ghana Card is required"
      if (!formData.ghanaCardBack) errors.ghanaCardBack = "Back of Ghana Card is required"

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setError("Please complete all required fields before continuing")
        return
      }
    } else if (currentStep === 3) {
      if (!formData.yearsExperience) errors.yearsExperience = "Years of experience is required"
      if (formData.ageGroupsComfortable.length === 0) {
        errors.ageGroupsComfortable = "Please select at least one age group"
      }
      if (formData.childcareTasks.length === 0) {
        errors.childcareTasks = "Please select at least one childcare task"
      }
      if (!formData.cookingAbility) errors.cookingAbility = "Please indicate your cooking ability"
      if (!formData.hasCprFirstAid) errors.hasCprFirstAid = "Please indicate if you have CPR/First Aid training"
      if (!formData.canCommunicateEnglish) {
        errors.canCommunicateEnglish = "Please indicate your English communication ability"
      }
      if (!formData.specialNeedsExperience) errors.specialNeedsExperience = "Please indicate special needs experience"

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setError("Please complete all required experience fields")
        return
      }
    } else if (currentStep === 4) {
      if (!formData.emergencyContactName) errors.emergencyContactName = "Emergency contact name is required"
      if (!formData.emergencyContactPhone) errors.emergencyContactPhone = "Emergency contact phone is required"
      if (!formData.emergencyContactRelationship) {
        errors.emergencyContactRelationship = "Emergency contact relationship is required"
      }
      if (!formData.referenceAvailable) errors.referenceAvailable = "Please indicate reference availability"
      if (formData.referenceAvailable === "Yes") {
        if (!formData.referenceName) errors.referenceName = "Reference name is required"
        if (!formData.referencePhone) errors.referencePhone = "Reference phone is required"
        if (!formData.referenceRelationship) errors.referenceRelationship = "Reference relationship is required"
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setError("Please complete all required trust and safety fields")
        return
      }
    }

    setError(null)
    setFieldErrors({})
    setAttemptedNext(false)
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setError(null)
    setFieldErrors({})
    setAttemptedNext(false)
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    const errors: Record<string, string> = {}

    if (!formData.consentBackgroundCheck) {
      errors.consentBackgroundCheck = "Background check consent is required"
    }
    if (!formData.consentMedicalScreening) {
      errors.consentMedicalScreening = "Medical screening consent is required"
    }
    if (!formData.consentEmploymentTerms) {
      errors.consentEmploymentTerms = "Employment terms consent is required"
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setError("You must agree to all consent requirements to submit")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(key, value)
        } else if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value))
        } else if (typeof value === "boolean") {
          formDataToSend.append(key, value.toString())
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString())
        }
      })
      formDataToSend.append("formType", "Nanny")

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit application")
      }

      router.push("/apply/success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMultiSelect = (field: "ageGroupsComfortable" | "childcareTasks", value: string) => {
    const currentValues = formData[field]
    if (currentValues.includes(value)) {
      setFormData({ ...formData, [field]: currentValues.filter((v) => v !== value) })
    } else {
      setFormData({ ...formData, [field]: [...currentValues, value] })
    }
    if (fieldErrors[field]) {
      const newErrors = { ...fieldErrors }
      delete newErrors[field]
      setFieldErrors(newErrors)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="preferredWorkArrangement" className="text-base">
          Preferred Work Arrangement <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.preferredWorkArrangement}
          onValueChange={(value) => {
            setFormData({ ...formData, preferredWorkArrangement: value })
            if (fieldErrors.preferredWorkArrangement)
              setFieldErrors((prev) => ({ ...prev, preferredWorkArrangement: "" }))
          }}
        >
          <SelectTrigger className={`min-h-[44px] ${fieldErrors.preferredWorkArrangement ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Select work arrangement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="live_in">Live-In</SelectItem>
            <SelectItem value="live_out">Live-Out</SelectItem>
          </SelectContent>
        </Select>
        {fieldErrors.preferredWorkArrangement && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.preferredWorkArrangement}</p>
        )}
      </div>

      <div className="space-y-2 md:space-y-2">
        <Label htmlFor="availability" className="text-base">
          When Can You Start? <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.availability}
          onValueChange={(value) => {
            setFormData({ ...formData, availability: value })
            if (fieldErrors.availability) setFieldErrors((prev) => ({ ...prev, availability: "" }))
          }}
        >
          <SelectTrigger className={`min-h-[44px] ${fieldErrors.availability ? "border-red-500" : ""}`}>
            <SelectValue placeholder="Select your availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Immediately">Immediately</SelectItem>
            <SelectItem value="Within 2 weeks">Within 2 weeks</SelectItem>
            <SelectItem value="Within 1 month">Within 1 month</SelectItem>
            <SelectItem value="More than 1 month">More than 1 month</SelectItem>
          </SelectContent>
        </Select>
        {fieldErrors.availability && <p className="mt-1 text-sm text-red-600">{fieldErrors.availability}</p>}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-base">
          Full Name (as on Ghana Card) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value })
            if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: "" }))
          }}
          className={fieldErrors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {fieldErrors.fullName && <p className="mt-1 text-sm text-red-600">{fieldErrors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsappNumber" className="text-base">
          WhatsApp Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="whatsappNumber"
          type="tel"
          inputMode="tel"
          placeholder="+233 XX XXX XXXX"
          value={formData.whatsappNumber}
          onChange={(e) => {
            setFormData({ ...formData, whatsappNumber: e.target.value })
            if (fieldErrors.whatsappNumber) setFieldErrors((prev) => ({ ...prev, whatsappNumber: "" }))
          }}
          className={fieldErrors.whatsappNumber ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {fieldErrors.whatsappNumber && <p className="mt-1 text-sm text-red-600">{fieldErrors.whatsappNumber}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ghanaCardFront" className="text-base">
          Ghana Card - Front <span className="text-red-500">*</span>
        </Label>
        <Input
          id="ghanaCardFront"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null
            setFormData({ ...formData, ghanaCardFront: file })
            if (fieldErrors.ghanaCardFront) setFieldErrors((prev) => ({ ...prev, ghanaCardFront: "" }))
          }}
          className={fieldErrors.ghanaCardFront ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {fieldErrors.ghanaCardFront && <p className="mt-1 text-sm text-red-600">{fieldErrors.ghanaCardFront}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="ghanaCardBack" className="text-base">
          Ghana Card - Back <span className="text-red-500">*</span>
        </Label>
        <Input
          id="ghanaCardBack"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null
            setFormData({ ...formData, ghanaCardBack: file })
            if (fieldErrors.ghanaCardBack) setFieldErrors((prev) => ({ ...prev, ghanaCardBack: "" }))
          }}
          className={fieldErrors.ghanaCardBack ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {fieldErrors.ghanaCardBack && <p className="mt-1 text-sm text-red-600">{fieldErrors.ghanaCardBack}</p>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="yearsExperience" className="text-base">
          Years of Childcare Experience <span className="text-red-500">*</span>
        </Label>
        <Input
          id="yearsExperience"
          type="number"
          inputMode="numeric"
          value={formData.yearsExperience}
          onChange={(e) => {
            setFormData({ ...formData, yearsExperience: e.target.value })
            if (fieldErrors.yearsExperience) setFieldErrors((prev) => ({ ...prev, yearsExperience: "" }))
          }}
          className={fieldErrors.yearsExperience ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {fieldErrors.yearsExperience && <p className="mt-1 text-sm text-red-600">{fieldErrors.yearsExperience}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-base">
          Age Groups You Can Care For <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          {[
            { value: "Newborn (0–3m)", label: "Newborn (0–3 months)" },
            { value: "Infant (3–12m)", label: "Infant (3–12 months)" },
            { value: "Toddler (1–3y)", label: "Toddler (1–3 years)" },
            { value: "Preschool (3–5y)", label: "Preschool (3–5 years)" },
            { value: "School-age (6–12y)", label: "School-age (6–12 years)" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={formData.ageGroupsComfortable.includes(option.value)}
                onCheckedChange={() => toggleMultiSelect("ageGroupsComfortable", option.value)}
              />
              <Label htmlFor={option.value} className="font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        {fieldErrors.ageGroupsComfortable && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.ageGroupsComfortable}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="text-base">
          Tasks You Can Handle <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          {[
            "Feeding",
            "Bathing",
            "Diapering",
            "Sleep routines",
            "Play/learning activities",
            "School runs",
            "Medication reminders",
            "First-aid awareness",
          ].map((task) => (
            <div key={task} className="flex items-center space-x-2">
              <Checkbox
                id={task}
                checked={formData.childcareTasks.includes(task)}
                onCheckedChange={() => toggleMultiSelect("childcareTasks", task)}
              />
              <Label htmlFor={task} className="font-normal">
                {task}
              </Label>
            </div>
          ))}
        </div>
        {fieldErrors.childcareTasks && <p className="mt-1 text-sm text-red-600">{fieldErrors.childcareTasks}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-base">
          Cooking Ability <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.cookingAbility}
          onValueChange={(value) => {
            setFormData({ ...formData, cookingAbility: value })
            if (fieldErrors.cookingAbility) setFieldErrors((prev) => ({ ...prev, cookingAbility: "" }))
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="cook-yes" />
            <Label htmlFor="cook-yes" className="font-normal">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="cook-no" />
            <Label htmlFor="cook-no" className="font-normal">
              No
            </Label>
          </div>
        </RadioGroup>
        {fieldErrors.cookingAbility && <p className="mt-1 text-sm text-red-600">{fieldErrors.cookingAbility}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hasCprFirstAid" className="text-base">
          CPR/First aid training? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.hasCprFirstAid}
          onValueChange={(value) => {
            setFormData({ ...formData, hasCprFirstAid: value })
            if (fieldErrors.hasCprFirstAid) setFieldErrors((prev) => ({ ...prev, hasCprFirstAid: "" }))
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="cpr-yes" />
            <Label htmlFor="cpr-yes" className="font-normal">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="cpr-no" />
            <Label htmlFor="cpr-no" className="font-normal">
              No
            </Label>
          </div>
        </RadioGroup>
        {fieldErrors.hasCprFirstAid && <p className="mt-1 text-sm text-red-600">{fieldErrors.hasCprFirstAid}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="canCommunicateEnglish" className="text-base">
          Can you communicate in basic English? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.canCommunicateEnglish}
          onValueChange={(value) => {
            setFormData({ ...formData, canCommunicateEnglish: value })
            if (fieldErrors.canCommunicateEnglish) setFieldErrors((prev) => ({ ...prev, canCommunicateEnglish: "" }))
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="english-yes" />
            <Label htmlFor="english-yes" className="font-normal">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="english-no" />
            <Label htmlFor="english-no" className="font-normal">
              No
            </Label>
          </div>
        </RadioGroup>
        {fieldErrors.canCommunicateEnglish && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.canCommunicateEnglish}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialNeedsExperience" className="text-base">
          Special Needs Experience <span className="text-red-500">*</span>
        </Label>
        <RadioGroup
          value={formData.specialNeedsExperience}
          onValueChange={(value) => {
            setFormData({ ...formData, specialNeedsExperience: value })
            if (fieldErrors.specialNeedsExperience) setFieldErrors((prev) => ({ ...prev, specialNeedsExperience: "" }))
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Yes" id="special-needs-yes" />
            <Label htmlFor="special-needs-yes" className="font-normal">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="No" id="special-needs-no" />
            <Label htmlFor="special-needs-no" className="font-normal">
              No
            </Label>
          </div>
        </RadioGroup>
        {fieldErrors.specialNeedsExperience && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.specialNeedsExperience}</p>
        )}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base">Emergency Contact</Label>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName" className="text-base">
            Emergency Contact Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={(e) => {
              setFormData({ ...formData, emergencyContactName: e.target.value })
              if (fieldErrors.emergencyContactName) setFieldErrors((prev) => ({ ...prev, emergencyContactName: "" }))
            }}
            className={fieldErrors.emergencyContactName ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.emergencyContactName && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.emergencyContactName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContactPhone" className="text-base">
            Emergency Contact Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="emergencyContactPhone"
            type="tel"
            inputMode="tel"
            value={formData.emergencyContactPhone}
            onChange={(e) => {
              setFormData({ ...formData, emergencyContactPhone: e.target.value })
              if (fieldErrors.emergencyContactPhone) setFieldErrors((prev) => ({ ...prev, emergencyContactPhone: "" }))
            }}
            className={fieldErrors.emergencyContactPhone ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {fieldErrors.emergencyContactPhone && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.emergencyContactPhone}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergencyContactRelationship" className="text-base">
          Relationship <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.emergencyContactRelationship}
          onValueChange={(value) => {
            setFormData({ ...formData, emergencyContactRelationship: value })
            if (fieldErrors.emergencyContactRelationship)
              setFieldErrors((prev) => ({ ...prev, emergencyContactRelationship: "" }))
          }}
        >
          <SelectTrigger className={fieldErrors.emergencyContactRelationship ? "border-red-500" : ""}>
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Sibling">Sibling</SelectItem>
            <SelectItem value="Spouse">Spouse</SelectItem>
            <SelectItem value="Guardian">Guardian</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {fieldErrors.emergencyContactRelationship && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.emergencyContactRelationship}</p>
        )}

        {formData.emergencyContactRelationship === "Other" && (
          <div className="mt-2">
            <Input
              placeholder="Specify relationship"
              value={formData.emergencyContactRelationshipOther}
              onChange={(e) => setFormData({ ...formData, emergencyContactRelationshipOther: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-base">Professional References (Previous Employer or Character Reference)</Label>
        <div className="bg-navy/5 border border-navy/10 rounded p-3 md:p-4 space-y-4">
          <RadioGroup
            value={formData.referenceAvailable}
            onValueChange={(value) => {
              setFormData({ ...formData, referenceAvailable: value })
              if (fieldErrors.referenceAvailable) setFieldErrors((prev) => ({ ...prev, referenceAvailable: "" }))
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Yes" id="ref-yes" />
              <Label htmlFor="ref-yes" className="font-normal">
                Yes
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="No" id="ref-no" />
              <Label htmlFor="ref-no" className="font-normal">
                No
              </Label>
            </div>
          </RadioGroup>
          {fieldErrors.referenceAvailable && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.referenceAvailable}</p>
          )}

          {formData.referenceAvailable === "Yes" && (
            <>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="referenceName" className="text-base">
                    Reference Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="referenceName"
                    value={formData.referenceName}
                    onChange={(e) => {
                      setFormData({ ...formData, referenceName: e.target.value })
                      if (fieldErrors.referenceName) setFieldErrors((prev) => ({ ...prev, referenceName: "" }))
                    }}
                    className={fieldErrors.referenceName ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {fieldErrors.referenceName && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.referenceName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referencePhone" className="text-base">
                    Reference Phone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="referencePhone"
                    type="tel"
                    inputMode="tel"
                    value={formData.referencePhone}
                    onChange={(e) => {
                      setFormData({ ...formData, referencePhone: e.target.value })
                      if (fieldErrors.referencePhone) setFieldErrors((prev) => ({ ...prev, referencePhone: "" }))
                    }}
                    className={fieldErrors.referencePhone ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {fieldErrors.referencePhone && (
                    <p className="mt-1 text-sm text-red-600">{fieldErrors.referencePhone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="referenceRelationship" className="text-base">
                  Relationship <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.referenceRelationship}
                  onValueChange={(value) => {
                    setFormData({ ...formData, referenceRelationship: value })
                    if (fieldErrors.referenceRelationship)
                      setFieldErrors((prev) => ({ ...prev, referenceRelationship: "" }))
                  }}
                >
                  <SelectTrigger className={fieldErrors.referenceRelationship ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employer">Employer</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.referenceRelationship && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.referenceRelationship}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-base md:text-lg text-navy">Review Your Application</h3>
        <div className="grid grid-cols-1 gap-3 text-sm md:text-base bg-soft-grey p-4 md:p-6 rounded-lg">
          <div className="flex items-start justify-between py-3 border-b">
            <span className="text-muted-foreground">Preferred Work Arrangement:</span>
            <span className="font-medium text-right capitalize">
              {formData.preferredWorkArrangement.replace("_", " ")}
            </span>
          </div>
          <div className="flex items-start justify-between py-3 border-b">
            <span className="text-muted-foreground">Availability:</span>
            <span className="font-medium text-right capitalize">{formData.availability.replace("_", " ")}</span>
          </div>
          <div className="flex items-start justify-between py-3 border-b">
            <span className="text-muted-foreground">Full Name:</span>
            <span className="font-medium text-right">{formData.fullName}</span>
          </div>
          <div className="flex items-start justify-between py-3 border-b">
            <span className="text-muted-foreground">Phone:</span>
            <span className="font-medium text-right break-all">{formData.whatsappNumber}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold mb-4 text-navy">Personal Information</h4>
        <div className="grid grid-cols-1 gap-3 text-sm md:text-base bg-soft-grey p-4 md:p-6 rounded-lg">
          <div className="flex items-start justify-between py-3 border-b">
            <span className="text-muted-foreground">Preferred Work Arrangement:</span>
            <span className="font-medium text-right capitalize">
              {formData.preferredWorkArrangement.replace("_", " ")}
            </span>
          </div>
          <div className="flex items-start justify-between py-3 border-b">
            <span className="text-muted-foreground">Availability:</span>
            <span className="font-medium text-right capitalize">{formData.availability.replace("_", " ")}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-base md:text-lg text-navy">Consent & Acknowledgement</h3>
        <div className="space-y-4 bg-navy/5 border border-navy/10 rounded p-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="consentBackgroundCheck"
              checked={formData.consentBackgroundCheck}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, consentBackgroundCheck: checked as boolean })
                if (fieldErrors.consentBackgroundCheck)
                  setFieldErrors((prev) => ({ ...prev, consentBackgroundCheck: "" }))
              }}
            />
            <Label htmlFor="consentBackgroundCheck" className="font-normal leading-relaxed">
              I consent to background verification <span className="text-red-500">*</span>
            </Label>
          </div>
          {fieldErrors.consentBackgroundCheck && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.consentBackgroundCheck}</p>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consentMedicalScreening"
              checked={formData.consentMedicalScreening}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, consentMedicalScreening: checked as boolean })
                if (fieldErrors.consentMedicalScreening)
                  setFieldErrors((prev) => ({ ...prev, consentMedicalScreening: "" }))
              }}
            />
            <Label htmlFor="consentMedicalScreening" className="font-normal leading-relaxed">
              I consent to medical/hygiene screening <span className="text-red-500">*</span>
            </Label>
          </div>
          {fieldErrors.consentMedicalScreening && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.consentMedicalScreening}</p>
          )}

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consentEmploymentTerms"
              checked={formData.consentEmploymentTerms}
              onCheckedChange={(checked) => {
                setFormData({ ...formData, consentEmploymentTerms: checked as boolean })
                if (fieldErrors.consentEmploymentTerms)
                  setFieldErrors((prev) => ({ ...prev, consentEmploymentTerms: "" }))
              }}
            />
            <Label htmlFor="consentEmploymentTerms" className="font-normal leading-relaxed">
              I agree to GPS rules and employment contract terms <span className="text-red-500">*</span>
            </Label>
          </div>
          {fieldErrors.consentEmploymentTerms && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.consentEmploymentTerms}</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-8 px-4 md:px-6 lg:px-8 bg-soft-grey">
        <div className="max-w-3xl mx-auto pb-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-block bg-gold text-navy px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Nanny
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-navy mb-2">Nanny Application Form</h1>
            <p className="text-sm text-charcoal bg-navy/5 border border-navy/10 rounded p-3 leading-relaxed">
              We employ staff under professional contracts and standards. Only shortlisted applicants will be contacted.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between text-xs md:text-sm text-charcoal mb-2">
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form Steps */}
          <Card>
            <CardHeader className="px-4 md:px-6">
              <CardTitle className="text-xl md:text-2xl">
                {currentStep === 1 && "Role & Work Type"}
                {currentStep === 2 && "Eligibility & Identity"}
                {currentStep === 3 && "Childcare Experience"}
                {currentStep === 4 && "Trust & Safety"}
                {currentStep === 5 && "Consent & Review"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your work preferences"}
                {currentStep === 2 && "Provide your personal information"}
                {currentStep === 3 && "Share your childcare experience"}
                {currentStep === 4 && "Emergency contacts and references"}
                {currentStep === 5 && "Review and submit your application"}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6">
              {/* Render current step's content */}
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}

              {/* Error Message */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                  <p className="text-xs text-red-500 mt-1">Please review the highlighted fields above</p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-6 border-t">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="w-full sm:w-auto order-2 sm:order-1 bg-transparent"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}

                {currentStep < totalSteps ? (
                  <Button type="button" onClick={handleNext} className="w-full sm:w-auto order-1 sm:order-2 sm:ml-auto">
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full sm:w-auto order-1 sm:order-2 sm:ml-auto"
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
