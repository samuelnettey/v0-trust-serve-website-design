import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, FileCheck, RefreshCw, Scale } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section
        className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--navy) 0%, var(--charcoal) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/luxury-ghanaian-home-interior-black-family.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight text-balance">
              Professionally Managed Personnel You Can Trust
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Vetted domestic personnel, placed and managed with care, structure, and accountability for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 font-semibold"
                  style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
                >
                  Request Personnel
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 bg-white text-[#0B1F3B] border-white hover:bg-white/90 font-semibold"
                >
                  How Golden PrimeSteward Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--soft-grey)" }}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "var(--navy)" }}>
              Why Clients Choose Golden PrimeSteward
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We combine rigorous vetting with professional management to deliver personnel services that meet the
              highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Pre-Vetted Personnel
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Every candidate undergoes comprehensive background checks and skills verification before placement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <FileCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Professional Contracts
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Clear agreements establish accountability, expectations, and protection for all parties involved.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Replacement Guarantee
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  If a placement doesn't meet expectations, we provide qualified replacements at no additional cost.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8 space-y-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--navy)" }}
                >
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: "var(--navy)" }}>
                  Ethical Management
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Transparent practices ensure dignity, fair treatment, and professional standards at every level.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "var(--navy)" }}>
              Golden PrimeSteward Home
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professional domestic personnel management for households that value quality, reliability, and peace of
              mind.
            </p>
          </div>

          <div className="space-y-8">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <img
                src="/luxury-ghanaian-living-room-modern-african-design.jpg"
                alt="Golden PrimeSteward Home"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--navy)" }}>
                    Househelps
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Trained domestic staff for general household maintenance, cleaning, and daily operations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--navy)" }}>
                    Nannies
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Professional childcare specialists who provide attentive, nurturing supervision for your children.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--navy)" }}>
                    Caregivers
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Compassionate professionals trained to support elderly family members and those with special needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--navy)" }}>
                    Cooks / Chefs
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Skilled culinary professionals who prepare nutritious, delicious meals tailored to your preferences.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center pt-4">
              <Link href="/trustserve-home">
                <Button size="lg" className="px-8 py-6" style={{ backgroundColor: "var(--navy)", color: "white" }}>
                  Learn More About Home Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4" style={{ backgroundColor: "var(--charcoal)" }}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 text-balance">
            Ready to Experience Professional Personnel Management?
          </h2>
          <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Connect with our team to discuss your requirements and discover how Golden PrimeSteward can deliver the
            quality and reliability you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-base px-8 py-6 font-semibold"
                style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/apply">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 bg-white hover:bg-white/90 font-semibold"
                style={{ color: "var(--navy)", borderColor: "var(--gold)" }}
              >
                Apply as Candidate
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
