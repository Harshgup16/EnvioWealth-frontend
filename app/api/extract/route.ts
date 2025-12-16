import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 3600 // 60 minutes for Vercel serverless functions
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Get backend URL from environment or use default
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000"

    // Forward the file to the backend
    const backendFormData = new FormData()
    backendFormData.append("file", file)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3600000) // 60 minutes timeout

    try {
      const response = await fetch(`${backendUrl}/api/extract`, {
        method: "POST",
        body: backendFormData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Backend request failed" }))
        return NextResponse.json(
          {
            error: "Failed to process document",
            details: errorData.detail || "Unknown error from backend",
          },
          { status: response.status },
        )
      }

      const result = await response.json()

      // Return the data in the format expected by the frontend
      return NextResponse.json(result.data || result)
    } catch (fetchError) {
      clearTimeout(timeoutId)
      throw fetchError
    }
  } catch (error) {
    console.error("[Frontend API] Extraction error:", error)
    return NextResponse.json(
      {
        error: "Failed to process document",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
