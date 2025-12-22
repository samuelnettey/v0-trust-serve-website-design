"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Users, Home, Briefcase } from "lucide-react"

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8 bg-soft-grey">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-navy mb-4">Apply to Golden PrimeSteward</h1>
            <p className="text-lg text-charcoal mb-2">Join our team of trusted domestic professionals</p>
            <div className="bg-navy/5 border border-navy/10 rounded-lg p-4 max-w-3xl mx-auto">
              <p className="text-sm text-charcoal">
                We employ staff under professional contracts and standards. Only shortlisted applicants will be
                contacted.
              </p>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nanny Application */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-gold" />
                </div>
                <CardTitle className="text-navy">Nanny</CardTitle>
                <CardDescription>Childcare and child development specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-charcoal space-y-2 mb-6">
                  <li>• Childcare experience required</li>
                  <li>• Infant to school-age care</li>
                  <li>• Child development focus</li>
                  <li>• Educational activities</li>
                </ul>
                <Link href="/apply/nanny">
                  <Button className="w-full" variant="default">
                    Apply as Nanny
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Househelp Application */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-gold" />
                </div>
                <CardTitle className="text-navy">Househelp</CardTitle>
                <CardDescription>Household management and domestic support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-charcoal space-y-2 mb-6">
                  <li>• Cleaning & organization</li>
                  <li>• Laundry & ironing</li>
                  <li>• Cooking & kitchen duties</li>
                  <li>• General household tasks</li>
                </ul>
                <Link href="/apply/househelp">
                  <Button className="w-full" variant="default">
                    Apply as Househelp
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* General/Flexible Application */}
            <Card className="hover:shadow-lg transition-shadow border-gold/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
                  <Briefcase className="w-8 h-8 text-gold" />
                </div>
                <CardTitle className="text-navy">General / Both</CardTitle>
                <CardDescription>Flexible role - childcare and household</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-charcoal space-y-2 mb-6">
                  <li>• Multi-skilled position</li>
                  <li>• Childcare + housekeeping</li>
                  <li>• Flexible role duties</li>
                  <li>• Comprehensive support</li>
                </ul>
                <Link href="/apply/general">
                  <Button className="w-full" variant="default">
                    Apply for General Role
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-charcoal">
              All positions require valid identification and reference checks.{" "}
              <Link href="/how-it-works" className="text-gold hover:underline">
                Learn more about our process
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
