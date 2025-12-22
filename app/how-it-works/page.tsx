import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Client Qualification & Consultation",
      description:
        "We begin with a comprehensive consultation to understand your specific needs, environment, and expectations. This ensures we align our services with your requirements from the outset.",
    },
    {
      number: "02",
      title: "Contract & Engagement",
      description:
        "Clear service agreements are established outlining scope, responsibilities, timelines, and terms. Professional contracts provide clarity and protection for all parties involved.",
    },
    {
      number: "03",
      title: "Candidate Shortlisting",
      description:
        "Based on your requirements, we present pre-vetted candidates from our rigorously screened personnel pool. Each candidate has verified credentials, references, and background checks.",
    },
    {
      number: "04",
      title: "Placement & Probation",
      description:
        "Selected candidates are placed with a structured onboarding process and probation period. This trial phase ensures compatibility and allows for adjustments before final confirmation.",
    },
    {
      number: "05",
      title: "Monitoring & Support",
      description:
        "Ongoing quality assurance through regular check-ins, performance reviews, and responsive support. We maintain open communication channels for feedback and issue resolution.",
    },
    {
      number: "06",
      title: "Replacement if Required",
      description:
        "If a placement does not meet expectations during or after the probation period, we provide qualified replacement candidates at no additional placement cost.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance" style={{ color: "var(--navy)" }}>
            How Golden PrimeSteward Works
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our structured, transparent process is designed to deliver quality personnel placements with accountability
            at every stage.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--soft-grey)" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <div className="text-7xl md:text-8xl font-serif font-bold" style={{ color: "var(--gold)" }}>
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-4">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4" style={{ color: "var(--navy)" }}>
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute left-12 top-32 w-0.5 h-16"
                    style={{ backgroundColor: "var(--gold)", opacity: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: "var(--navy)" }}>
              Built on Professional Standards
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Every stage of our process is designed to ensure quality, transparency, and accountability. From initial
              vetting to ongoing support, we maintain rigorous standards that protect your interests.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="text-4xl font-serif font-bold" style={{ color: "var(--gold)" }}>
                100%
              </div>
              <p className="font-semibold text-gray-700">Background Verified</p>
              <p className="text-sm text-gray-600">Every candidate undergoes comprehensive background checks</p>
            </div>

            <div className="text-center space-y-3">
              <div className="text-4xl font-serif font-bold" style={{ color: "var(--gold)" }}>
                Professional
              </div>
              <p className="font-semibold text-gray-700">Contract Standards</p>
              <p className="text-sm text-gray-600">Clear agreements protect all parties and set expectations</p>
            </div>

            <div className="text-center space-y-3">
              <div className="text-4xl font-serif font-bold" style={{ color: "var(--gold)" }}>
                Ongoing
              </div>
              <p className="font-semibold text-gray-700">Quality Monitoring</p>
              <p className="text-sm text-gray-600">Regular check-ins ensure consistent service delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--navy)" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Contact our team to begin the process and experience professional personnel management built on trust and
            accountability.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="text-base px-8 py-6 font-semibold"
              style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
            >
              Start Your Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
