// TypeScript types that match the database schema exactly
export interface CandidateInsert {
  // Required fields (NOT NULL in DB or have defaults)
  full_name: string
  phone: string
  date_of_birth: string // ISO date string
  form_type: "nanny" | "househelp" | "general"

  // Optional personal fields
  first_name?: string
  last_name?: string
  email?: string
  whatsapp_number?: string
  gender?: string
  nationality?: string
  ghana_card_number?: string
  ghana_card_front_url?: string
  ghana_card_back_url?: string
  residential_address?: string
  city?: string
  region?: string
  current_area?: string
  age?: number

  // Status and metadata
  status?: string
  position_applied?: string

  // Employment history
  previous_employer_name?: string
  previous_employer_phone?: string
  previous_employment_duration?: string
  reason_for_leaving?: string

  // Availability
  availability?: string
  work_type_preference?: string
  preferred_work_location?: string

  // References
  reference_name?: string
  reference_phone?: string
  reference_type?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  emergency_contact_relationship?: string

  // Skills and experience
  years_of_experience?: number
  special_skills?: string
  languages_spoken?: string[]
  primary_strengths?: string[]

  // Nanny-specific fields
  childcare_experience_years?: string
  age_groups_comfortable?: string[]
  childcare_tasks?: string[]
  special_needs_experience?: boolean
  can_cook_for_children?: boolean
  has_cpr_first_aid?: boolean

  // Househelp-specific fields
  housekeeping_tasks?: string[]
  household_skills?: string[]
  cooking_skills?: string[]
  comfortable_appliances?: string[]

  // General-specific fields
  preferred_role?: string
  domestic_skills?: string[]
  role_preference?: string

  // Consent flags (have defaults)
  consent_background_check?: boolean
  consent_medical_screening?: boolean
  consent_employment_terms?: boolean
  willing_to_background_check?: boolean

  // Admin fields
  cv_url?: string
  ghana_card_url?: string
  interview_date?: string
  interview_time?: string
  interview_location?: string
  interview_notes?: string
  interviewer_name?: string
  admin_rating?: number
  admin_notes?: string
  admin_user_id?: string
  pre_screening_score?: number
  pre_screening_answers?: any
  pre_screening_completed_at?: string
  strengths?: string
  areas_for_improvement?: string
  recommendation?: string
}

export interface ApplicationFormData {
  // Personal Information
  fullName: string
  whatsappNumber: string
  ghanaCardFront?: File | string
  ghanaCardBack?: File | string

  // Role & Experience
  yearsExperience: string

  // Employment History
  previousEmployer1?: string
  duration1?: string
  reason1?: string
  previousEmployer2?: string
  duration2?: string
  reason2?: string

  // Availability
  startDate?: string
  preferredWorkArrangement?: string

  // References
  reference1Name?: string
  reference1Phone?: string
  reference1Relationship?: string
  reference2Name?: string
  reference2Phone?: string
  reference2Relationship?: string

  // Role-specific fields
  formType: "nanny" | "househelp" | "general"

  // Nanny-specific
  ageGroupsComfortable?: string[]
  childcareTasks?: string[]
  specialNeedsExperience?: "yes" | "no" | boolean
  canCookForChildren?: "yes" | "no" | boolean

  // Househelp-specific
  housekeepingTasks?: string[]
  householdSkills?: string[]
  cookingSkills?: string[]
  comfortableAppliances?: string[]

  // General-specific
  preferredRole?: string
  domesticSkills?: string[]
  specialSkills?: string
  primaryStrengths?: string[]

  // Consent
  consentBackgroundCheck: boolean
  consentMedicalScreening: boolean
  consentEmploymentTerms: boolean
}
