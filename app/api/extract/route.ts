import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 3600 // 60 minutes for Vercel serverless functions
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 })
    }

    // Get backend URL from environment or use default
    const backendUrl = process.env.BACKEND_URL || "http://localhost:8000"

    // Forward the files and manual data to the backend
    const backendFormData = new FormData()
    
    // Append all files
    files.forEach((file) => {
      backendFormData.append("files", file)
    })
    
    // Forward sectionAManualData if present
    const sectionAManualData = formData.get("sectionAManualData")
    if (sectionAManualData) {
      backendFormData.append("sectionAManualData", sectionAManualData as string)
    }
    
    // Forward sectionBManualData if present
    const sectionBManualData = formData.get("sectionBManualData")
    if (sectionBManualData) {
      backendFormData.append("sectionBManualData", sectionBManualData as string)
    }

    // Forward sectionCP1ManualData (Section C Principle 1) if present
    const sectionCP1ManualData = formData.get("sectionCP1ManualData")
    if (sectionCP1ManualData) {
      backendFormData.append("sectionCP1ManualData", sectionCP1ManualData as string)
    }

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

      // Return the complete result (includes success, data, message, stats)
      return NextResponse.json(result)
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
