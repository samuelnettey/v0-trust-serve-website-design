import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { username, code } = await request.json()

    if (!username || !code) {
      return NextResponse.json({ error: "Username and code are required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("username", username)
      .eq("code", code)
      .single()

    if (adminError || !adminUser) {
      return NextResponse.json({ error: "Invalid username or code" }, { status: 401 })
    }

    // Set admin session cookie
    const cookieStore = await cookies()
    cookieStore.set("admin_session", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({
      success: true,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Error verifying admin credentials:", error)
    return NextResponse.json({ error: "Failed to verify credentials" }, { status: 500 })
  }
}
