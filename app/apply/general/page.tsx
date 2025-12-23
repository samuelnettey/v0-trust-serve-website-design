"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function GeneralApplicationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    alternatePhone: "",
    email: "",
    currentAddress: "",
    city: "",
    region: "",

    // Experience & Skills
    yearsExperience: "",
    preferredRole: "",
    skills: [] as string[],
    additionalSkills: "",

    // Previous Employment
    previousEmployer1: "",
    position1: "",
    duration1: "",
    reason1: "",
    previousEmployer2: "",
    position2: "",
    duration2: "",
    reason2: "",

    // Preferences & Availability
    preferredWorkArrangement: "",
    willingToTravel: "",
    availability: "",
    expectedSalary: "",

    // References
    reference1Name: "",
    reference1Phone: "",
    reference1Relationship: "",
    reference2Name: "",
    reference2Phone: "",
    reference2Relationship: "",

    // Additional Information
    healthConditions: "",
    criminalRecord: "",
    additionalInfo: "",

    // Documents
    hasValidID: false,
    hasHealthCertificate: false,
    hasPoliceReport: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const skillOptions = [
    "Cleaning",
    "Cooking",
    "Laundry",
    "Ironing",
    "Gardening",
    "Driving",
    "Security",
    "Maintenance",
    "Pet Care",
    "Elderly Care",
  ]

  const steps = [
    { number: 1, title: "Personal Info", description: "Basic information" },
    { number: 2, title: "Experience", description: "Skills & background" },
    { number: 3, title: "Employment History", description: "Previous work" },
    { number: 4, title: "Preferences", description: "Work arrangements" },
    { number: 5, title: "References", description: "Contact references" },
    { number: 6, title: "Review", description: "Confirm details" },
  ]

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.fullName &&
          formData.dateOfBirth &&
          formData.phoneNumber &&
          formData.currentAddress &&
          formData.city &&
          formData.region
        )
      case 2:
        return !!(formData.yearsExperience && formData.preferredRole && formData.skills.length > 0)
      case 3:
        return !!(formData.previousEmployer1 && formData.position1 && formData.duration1)
      case 4:
        return !!(
          formData.preferredWorkArrangement &&
          formData.willingToTravel &&
          formData.availability &&
          formData.expectedSalary
        )
      case 5:
        return !!(formData.reference1Name && formData.reference1Phone && formData.reference1Relationship)
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6))
    } else {
      alert("Please fill in all required fields")
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formDataToSend.append(key, JSON.stringify(value))
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, String(value))
        }
      })
      formDataToSend.append("formType", "General")

      const response = await fetch("/api/applications", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to submit application")
      }

      alert("Application submitted successfully! We will contact you soon.")
      router.push("/apply")
    } catch (err) {
      console.error("[v0] Error submitting:", err)
      alert(err instanceof Error ? err.message : "Failed to submit application")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Role Selection
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold text-balance mb-2">General Domestic Staff Application</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Join Golden PrimeSteward Home as general domestic personnel
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-colors ${
                        currentStep >= step.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.number ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /> : step.number}
                    </div>
                    <div className="mt-2 text-center hidden md:block">
                      <div className="text-xs font-medium">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-1 md:mx-2 transition-colors ${
                        currentStep > step.number ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="md:hidden text-center mt-3">
              <div className="text-sm font-medium">{steps[currentStep - 1].title}</div>
              <div className="text-xs text-muted-foreground">{steps[currentStep - 1].description}</div>
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <CardHeader className="px-4 md:px-6">
              <CardTitle className="text-xl md:text-2xl">{steps[currentStep - 1].title}</CardTitle>
              <CardDescription className="text-sm">{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 md:space-y-6 px-4 md:px-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 md:space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-base">
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth" className="text-base">
                        Date of Birth *
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-base">
                        Phone Number *
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        inputMode="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => updateFormData("phoneNumber", e.target.value)}
                        placeholder="+233 XX XXX XXXX"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone" className="text-base">
                        Alternate Phone
                      </Label>
                      <Input
                        id="alternatePhone"
                        type="tel"
                        inputMode="tel"
                        value={formData.alternatePhone}
                        onChange={(e) => updateFormData("alternatePhone", e.target.value)}
                        placeholder="+233 XX XXX XXXX"
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="your.email@example.com"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentAddress" className="text-base">
                      Current Address *
                    </Label>
                    <Input
                      id="currentAddress"
                      value={formData.currentAddress}
                      onChange={(e) => updateFormData("currentAddress", e.target.value)}
                      placeholder="House number, street name"
                      className="h-11"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-base">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        placeholder="e.g., Accra"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-base">
                        Region *
                      </Label>
                      <Input
                        id="region"
                        value={formData.region}
                        onChange={(e) => updateFormData("region", e.target.value)}
                        placeholder="e.g., Greater Accra"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Experience & Skills */}
              {currentStep === 2 && (
                <div className="space-y-4 md:space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience" className="text-base">
                      Years of Experience in Domestic Work *
                    </Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      min="0"
                      value={formData.yearsExperience}
                      onChange={(e) => updateFormData("yearsExperience", e.target.value)}
                      placeholder="e.g., 2"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferredRole" className="text-base">
                      Preferred Role/Position *
                    </Label>
                    <Input
                      id="preferredRole"
                      value={formData.preferredRole}
                      onChange={(e) => updateFormData("preferredRole", e.target.value)}
                      placeholder="e.g., Househelp, Driver, Gardener, etc."
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base">Skills & Abilities * (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-2">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center gap-2">
                          <Checkbox
                            id={skill}
                            checked={formData.skills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label htmlFor={skill} className="font-normal cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalSkills" className="text-base">
                      Additional Skills or Certifications
                    </Label>
                    <Textarea
                      id="additionalSkills"
                      value={formData.additionalSkills}
                      onChange={(e) => updateFormData("additionalSkills", e.target.value)}
                      placeholder="e.g., Valid driver's license, first aid certification, etc."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Employment History */}
              {currentStep === 3 && (
                <div className="space-y-6 md:space-y-6">
                  <div className="space-y-4 md:space-y-4">
                    <h3 className="font-semibold text-lg md:text-xl">Previous Employer 1 *</h3>
                    <div className="space-y-4 md:space-y-4">
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="previousEmployer1" className="text-base">
                          Employer Name/Family *
                        </Label>
                        <Input
                          id="previousEmployer1"
                          value={formData.previousEmployer1}
                          onChange={(e) => updateFormData("previousEmployer1", e.target.value)}
                          placeholder="Enter employer name"
                          className="h-11"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:space-y-2">
                          <Label htmlFor="position1" className="text-base">
                            Position/Role *
                          </Label>
                          <Input
                            id="position1"
                            value={formData.position1}
                            onChange={(e) => updateFormData("position1", e.target.value)}
                            placeholder="e.g., General help"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2 md:space-y-2">
                          <Label htmlFor="duration1" className="text-base">
                            Duration *
                          </Label>
                          <Input
                            id="duration1"
                            value={formData.duration1}
                            onChange={(e) => updateFormData("duration1", e.target.value)}
                            placeholder="e.g., 2 years"
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="reason1" className="text-base">
                          Reason for Leaving
                        </Label>
                        <Textarea
                          id="reason1"
                          value={formData.reason1}
                          onChange={(e) => updateFormData("reason1", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-4">
                    <h3 className="font-semibold text-lg md:text-xl">Previous Employer 2 (Optional)</h3>
                    <div className="space-y-4 md:space-y-4">
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="previousEmployer2" className="text-base">
                          Employer Name/Family
                        </Label>
                        <Input
                          id="previousEmployer2"
                          value={formData.previousEmployer2}
                          onChange={(e) => updateFormData("previousEmployer2", e.target.value)}
                          placeholder="Enter employer name"
                          className="h-11"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:space-y-2">
                          <Label htmlFor="position2" className="text-base">
                            Position/Role
                          </Label>
                          <Input
                            id="position2"
                            value={formData.position2}
                            onChange={(e) => updateFormData("position2", e.target.value)}
                            placeholder="e.g., Driver"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2 md:space-y-2">
                          <Label htmlFor="duration2" className="text-base">
                            Duration
                          </Label>
                          <Input
                            id="duration2"
                            value={formData.duration2}
                            onChange={(e) => updateFormData("duration2", e.target.value)}
                            placeholder="e.g., 1 year"
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="reason2" className="text-base">
                          Reason for Leaving
                        </Label>
                        <Textarea
                          id="reason2"
                          value={formData.reason2}
                          onChange={(e) => updateFormData("reason2", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Preferences & Availability */}
              {currentStep === 4 && (
                <div className="space-y-4 md:space-y-4">
                  <div className="space-y-2 md:space-y-2">
                    <Label className="text-base">Preferred Work Arrangement *</Label>
                    <RadioGroup
                      value={formData.preferredWorkArrangement}
                      onValueChange={(value) => updateFormData("preferredWorkArrangement", value)}
                    >
                      <div className="space-y-2 md:space-y-2">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="live-in" id="live-in" />
                          <Label htmlFor="live-in" className="font-normal cursor-pointer">
                            Live-in (Resident)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="live-out" id="live-out" />
                          <Label htmlFor="live-out" className="font-normal cursor-pointer">
                            Live-out (Daily commute)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both" className="font-normal cursor-pointer">
                            Open to both
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2 md:space-y-2">
                    <Label className="text-base">Willing to Travel with Family? *</Label>
                    <RadioGroup
                      value={formData.willingToTravel}
                      onValueChange={(value) => updateFormData("willingToTravel", value)}
                    >
                      <div className="flex gap-4 md:gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="yes" id="travel-yes" />
                          <Label htmlFor="travel-yes" className="font-normal cursor-pointer">
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="no" id="travel-no" />
                          <Label htmlFor="travel-no" className="font-normal cursor-pointer">
                            No
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="maybe" id="travel-maybe" />
                          <Label htmlFor="travel-maybe" className="font-normal cursor-pointer">
                            Maybe
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="availability" className="text-base">
                        When Can You Start? *
                      </Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => updateFormData("availability", value)}
                      >
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediately">Immediately</SelectItem>
                          <SelectItem value="Within 2 weeks">Within 2 weeks</SelectItem>
                          <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                          <SelectItem value="More than 1 month">More than 1 month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="expectedSalary" className="text-base">
                        Expected Monthly Salary (GHS) *
                      </Label>
                      <Input
                        id="expectedSalary"
                        type="number"
                        value={formData.expectedSalary}
                        onChange={(e) => updateFormData("expectedSalary", e.target.value)}
                        placeholder="e.g., 1200"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: References */}
              {currentStep === 5 && (
                <div className="space-y-6 md:space-y-6">
                  <div className="space-y-4 md:space-y-4">
                    <h3 className="font-semibold text-lg md:text-xl">Reference 1 *</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="reference1Name" className="text-base">
                          Full Name *
                        </Label>
                        <Input
                          id="reference1Name"
                          value={formData.reference1Name}
                          onChange={(e) => updateFormData("reference1Name", e.target.value)}
                          placeholder="Enter reference name"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="reference1Phone" className="text-base">
                          Phone Number *
                        </Label>
                        <Input
                          id="reference1Phone"
                          type="tel"
                          inputMode="tel"
                          value={formData.reference1Phone}
                          onChange={(e) => updateFormData("reference1Phone", e.target.value)}
                          placeholder="+233 XX XXX XXXX"
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="reference1Relationship" className="text-base">
                        Relationship/How They Know You *
                      </Label>
                      <Input
                        id="reference1Relationship"
                        value={formData.reference1Relationship}
                        onChange={(e) => updateFormData("reference1Relationship", e.target.value)}
                        placeholder="e.g., Former employer, community leader, etc."
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-4">
                    <h3 className="font-semibold text-lg md:text-xl">Reference 2 (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="reference2Name" className="text-base">
                          Full Name
                        </Label>
                        <Input
                          id="reference2Name"
                          value={formData.reference2Name}
                          onChange={(e) => updateFormData("reference2Name", e.target.value)}
                          placeholder="Enter reference name"
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2 md:space-y-2">
                        <Label htmlFor="reference2Phone" className="text-base">
                          Phone Number
                        </Label>
                        <Input
                          id="reference2Phone"
                          type="tel"
                          inputMode="tel"
                          value={formData.reference2Phone}
                          onChange={(e) => updateFormData("reference2Phone", e.target.value)}
                          placeholder="+233 XX XXX XXXX"
                          className="h-11"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="reference2Relationship" className="text-base">
                        Relationship/How They Know You
                      </Label>
                      <Input
                        id="reference2Relationship"
                        value={formData.reference2Relationship}
                        onChange={(e) => updateFormData("reference2Relationship", e.target.value)}
                        placeholder="e.g., Pastor, neighbor, etc."
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-4">
                    <h3 className="font-semibold text-lg md:text-xl">Additional Information</h3>
                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="healthConditions" className="text-base">
                        Any Health Conditions We Should Know About?
                      </Label>
                      <Textarea
                        id="healthConditions"
                        value={formData.healthConditions}
                        onChange={(e) => updateFormData("healthConditions", e.target.value)}
                        placeholder="Please disclose any health conditions"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="criminalRecord" className="text-base">
                        Criminal Record (if any)
                      </Label>
                      <Textarea
                        id="criminalRecord"
                        value={formData.criminalRecord}
                        onChange={(e) => updateFormData("criminalRecord", e.target.value)}
                        placeholder="Please disclose if applicable"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2 md:space-y-2">
                      <Label htmlFor="additionalInfo" className="text-base">
                        Additional Information
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                        placeholder="Anything else you'd like us to know"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-3 md:space-y-3">
                      <Label className="text-base">Required Documents</Label>
                      <div className="space-y-2 md:space-y-2">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="hasValidID"
                            checked={formData.hasValidID}
                            onCheckedChange={(checked) => updateFormData("hasValidID", checked)}
                          />
                          <Label htmlFor="hasValidID" className="font-normal cursor-pointer">
                            I have a valid ID (Ghana Card, Passport, or Voter's ID)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="hasHealthCertificate"
                            checked={formData.hasHealthCertificate}
                            onCheckedChange={(checked) => updateFormData("hasHealthCertificate", checked)}
                          />
                          <Label htmlFor="hasHealthCertificate" className="font-normal cursor-pointer">
                            I can obtain a health certificate
                          </Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="hasPoliceReport"
                            checked={formData.hasPoliceReport}
                            onCheckedChange={(checked) => updateFormData("hasPoliceReport", checked)}
                          />
                          <Label htmlFor="hasPoliceReport" className="font-normal cursor-pointer">
                            I can obtain a police clearance report
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review */}
              {currentStep === 6 && (
                <div className="space-y-6 md:space-y-6">
                  <div className="bg-muted p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-lg md:text-xl">Personal Information</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Name:</span> {formData.fullName}
                      </p>
                      <p>
                        <span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {formData.phoneNumber}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span> {formData.email || "Not provided"}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span> {formData.currentAddress}, {formData.city},{" "}
                        {formData.region}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-lg md:text-xl">Experience & Skills</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Years of Experience:</span> {formData.yearsExperience}
                      </p>
                      <p>
                        <span className="font-medium">Preferred Role:</span> {formData.preferredRole}
                      </p>
                      <p>
                        <span className="font-medium">Skills:</span> {formData.skills.join(", ")}
                      </p>
                      {formData.additionalSkills && (
                        <p>
                          <span className="font-medium">Additional Skills:</span> {formData.additionalSkills}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-lg md:text-xl">Previous Employment</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Most Recent:</span> {formData.position1} at{" "}
                        {formData.previousEmployer1} ({formData.duration1})
                      </p>
                      {formData.previousEmployer2 && (
                        <p>
                          <span className="font-medium">Previous:</span> {formData.position2} at{" "}
                          {formData.previousEmployer2} ({formData.duration2})
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-lg md:text-xl">Preferences</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Work Arrangement:</span> {formData.preferredWorkArrangement}
                      </p>
                      <p>
                        <span className="font-medium">Willing to Travel:</span> {formData.willingToTravel}
                      </p>
                      <p>
                        <span className="font-medium">Availability:</span> {formData.availability}
                      </p>
                      <p>
                        <span className="font-medium">Expected Salary:</span> GHS {formData.expectedSalary}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted p-4 md:p-6 rounded-lg">
                    <h3 className="font-semibold mb-2 text-lg md:text-xl">References</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Reference 1:</span> {formData.reference1Name} -{" "}
                        {formData.reference1Phone}
                      </p>
                      {formData.reference2Name && (
                        <p>
                          <span className="font-medium">Reference 2:</span> {formData.reference2Name} -{" "}
                          {formData.reference2Phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-accent/50 border border-accent p-4 md:p-6 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you confirm that all information provided is accurate and
                      truthful. Golden PrimeSteward reserves the right to verify all information and conduct background
                      checks.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="w-full sm:w-auto order-2 sm:order-1 h-11 bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < 6 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto order-1 sm:order-2 sm:ml-auto h-11"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full sm:w-auto order-1 sm:order-2 sm:ml-auto h-11"
                    disabled={isLoading}
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
