import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: "var(--navy)", color: "white" }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/golden-primesteward-logo.png"
                alt="Golden PrimeSteward"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <h3 className="text-xl md:text-2xl font-serif font-bold">Golden PrimeSteward</h3>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Professional personnel management and placement services built on trust, dignity, and accountability.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/trustserve-home" className="text-white/80 hover:text-[#C8A951] transition-colors">
                  Golden PrimeSteward Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-white/80 hover:text-[#C8A951] transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/80 hover:text-[#C8A951] transition-colors">
                  About Golden PrimeSteward
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-[#C8A951] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Accra, Ghana</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@goldenprimesteward.com"
                  className="text-white/80 hover:text-[#C8A951] transition-colors"
                >
                  info@goldenprimesteward.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+233000000000" className="text-white/80 hover:text-[#C8A951] transition-colors">
                  +233 (0) 000 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
            <p>© {new Date().getFullYear()} Golden PrimeSteward Group Ltd. All rights reserved.</p>
            <p className="text-xs text-center md:text-right max-w-2xl leading-relaxed">
              Golden PrimeSteward Group Ltd provides personnel management and placement services. We do not employ
              domestic or business staff directly unless otherwise stated.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
