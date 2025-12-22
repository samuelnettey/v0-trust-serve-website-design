import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserCheck, ClipboardCheck, Home, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function TrustServeHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center space-y-6 mb-12">
            <h1
              className="text-4xl md:text-5xl font-serif font-bold leading-tight text-balance"
              style={{ color: "var(--navy)" }}
            >
              Peace of Mind for Your Home
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Golden PrimeSteward Home provides trained, vetted domestic personnel with professional management and
              replacement guarantees. Experience the confidence that comes with structured, accountable home staffing.
            </p>
          </div>

          <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
            <img
              src="/luxury-ghanaian-home-living-room.jpg"
              alt="Golden PrimeSteward Home Services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--soft-grey)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "var(--navy)" }}>
              Domestic Personnel Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professional staff for every aspect of household management, each carefully selected and continuously
              supported.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Home className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--navy)" }}>
                  Househelps
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Reliable, trained personnel for general household duties including cleaning, laundry, and daily
                  maintenance. Each househelp undergoes skills assessment and reference verification.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <UserCheck className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--navy)" }}>
                  Nannies
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Experienced childcare professionals who understand child development, safety protocols, and family
                  routines. Background checks and reference validation are mandatory.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <ClipboardCheck className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--navy)" }}>
                  Caregivers
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Compassionate support for elderly family members or individuals requiring assistance. Our caregivers
                  are trained in patient care, medication management, and emergency response.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold" style={{ color: "var(--navy)" }}>
                  Cooks / Chefs
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Skilled culinary professionals for daily meal preparation or special occasions. From traditional
                  dishes to international cuisine, we match cooks to your preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "var(--navy)" }}>
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A structured, transparent process designed to match you with the right personnel for your household needs.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Client Consultation",
                description:
                  "We begin with a thorough discussion of your household needs, preferences, and expectations to understand exactly what you require.",
              },
              {
                number: "02",
                title: "Shortlisted Candidates",
                description:
                  "Based on your requirements, we present pre-vetted candidates with verified backgrounds, skills, and references.",
              },
              {
                number: "03",
                title: "Trial & Placement",
                description:
                  "Selected candidates undergo a trial period with clear expectations and professional contracts outlining responsibilities and terms.",
              },
              {
                number: "04",
                title: "Ongoing Monitoring",
                description:
                  "Regular check-ins ensure service quality, address concerns promptly, and provide support for both clients and personnel.",
              },
            ].map((step) => (
              <div key={step.number} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-5xl font-serif font-bold flex-shrink-0" style={{ color: "var(--gold)" }}>
                  {step.number}
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="text-2xl font-semibold" style={{ color: "var(--navy)" }}>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--navy)" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 text-balance">
            Request Domestic Personnel
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Let us help you find the right personnel for your household. Contact our team to discuss your specific
            requirements.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="text-base px-8 py-6 font-semibold"
              style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
            >
              Contact Golden PrimeSteward Home
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
