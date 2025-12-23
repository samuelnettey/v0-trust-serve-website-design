"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/trustserve-home", label: "Services" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/apply", label: "Apply" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/golden-primesteward-logo.png"
              alt="Golden PrimeSteward"
              width={50}
              height={50}
              className="w-10 h-10 md:w-12 md:h-12"
            />
            <div className="text-xl md:text-2xl font-serif font-bold" style={{ color: "var(--navy)" }}>
              Golden PrimeSteward
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-[#C8A951]"
                style={{ color: "var(--charcoal)" }}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button className="text-white font-medium" style={{ backgroundColor: "var(--navy)" }}>
                Request Personnel
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" style={{ color: "var(--navy)" }} />
            ) : (
              <Menu className="h-6 w-6" style={{ color: "var(--navy)" }} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2 transition-colors hover:text-[#C8A951]"
                  style={{ color: "var(--charcoal)" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full text-white font-medium" style={{ backgroundColor: "var(--navy)" }}>
                  Request Personnel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
