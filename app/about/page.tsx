import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Shield, Users, Scale, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance" style={{ color: "var(--navy)" }}>
            About Golden PrimeSteward Group Ltd
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            A professional personnel management company built on the principles of trust, dignity, and structured
            accountability.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--soft-grey)" }}>
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square rounded-lg overflow-hidden shadow-xl">
              <img
                src="/black-ghanaian-business-professionals-handshake.jpg"
                alt="Golden PrimeSteward Mission"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: "var(--navy)" }}>
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Golden PrimeSteward Group Ltd exists to transform personnel management through professional standards,
                ethical practices, and measurable accountability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We bridge the gap between clients seeking quality personnel and professionals seeking dignified
                employment opportunities. By implementing structured vetting, clear contracts, and ongoing support, we
                create sustainable value for all stakeholders.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our approach recognizes that exceptional service delivery requires more than placement—it demands
                continuous management, transparent communication, and a commitment to professional excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "var(--navy)" }}>
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              These principles guide every decision we make and every service we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Shield className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Trust
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We earn confidence through transparency, consistent delivery, and accountability at every level of
                  service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Dignity
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every individual—client and personnel alike—deserves respect, fair treatment, and professional
                  consideration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We pursue the highest standards in vetting, placement, management, and client service delivery.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md text-center">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Scale className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Accountability
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Clear expectations, documented processes, and measurable outcomes ensure responsibility and results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Ethical Commitment */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--soft-grey)" }}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: "var(--navy)" }}>
              Our Ethical Commitment
            </h2>
            <div className="space-y-4 text-left max-w-3xl mx-auto">
              <p className="text-gray-600 leading-relaxed">
                Golden PrimeSteward Group Ltd operates under strict ethical guidelines that prioritize fair treatment,
                transparent practices, and professional integrity. We believe that sustainable business success is built
                on doing what is right, not just what is expedient.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment extends to fair compensation practices, clear employment terms, professional development
                opportunities, and respectful working conditions for all personnel in our network.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We maintain rigorous compliance with employment regulations, data protection standards, and industry
                best practices. Our clients can be confident that their association with Golden PrimeSteward reflects
                positively on their own values and reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6" style={{ color: "var(--navy)" }}>
              What Sets Us Apart
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Professional Management, Not Just Placement",
                description:
                  "We don't simply connect people and walk away. Golden PrimeSteward provides ongoing management, quality assurance, and support throughout the employment relationship.",
              },
              {
                title: "Structured Accountability",
                description:
                  "Clear contracts, documented processes, and regular reviews ensure everyone understands their responsibilities and performance expectations.",
              },
              {
                title: "Replacement Guarantee",
                description:
                  "Our confidence in our vetting process is backed by our commitment to provide qualified replacements if a placement does not meet agreed standards.",
              },
              {
                title: "Ethical Standards",
                description:
                  "We build our business on fair practices, transparent communication, and respect for all individuals in our network.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-4 pl-6" style={{ borderColor: "var(--gold)" }}>
                <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--navy)" }}>
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
