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

    // Forward sectionCP2ManualData (Section C Principle 2) if present
    const sectionCP2ManualData = formData.get("sectionCP2ManualData")
    if (sectionCP2ManualData) {
      backendFormData.append("sectionCP2ManualData", sectionCP2ManualData as string)
    }

    // Forward sectionCP3ManualData (Section C Principle 3) if present
    const sectionCP3ManualData = formData.get("sectionCP3ManualData")
    if (sectionCP3ManualData) {
      backendFormData.append("sectionCP3ManualData", sectionCP3ManualData as string)
    }

    // Forward sectionCP4ManualData (Section C Principle 4) if present
    const sectionCP4ManualData = formData.get("sectionCP4ManualData")
    if (sectionCP4ManualData) {
      backendFormData.append("sectionCP4ManualData", sectionCP4ManualData as string)
    }

    // Forward sectionCP5ManualData (Section C Principle 5) if present
    const sectionCP5ManualData = formData.get("sectionCP5ManualData")
    if (sectionCP5ManualData) {
      backendFormData.append("sectionCP5ManualData", sectionCP5ManualData as string)
    }

    // Forward sectionCP6ManualData (Section C Principle 6) if present
    const sectionCP6ManualData = formData.get("sectionCP6ManualData")
    if (sectionCP6ManualData) {
      backendFormData.append("sectionCP6ManualData", sectionCP6ManualData as string)
    }

    // Forward sectionCP7ManualData (Section C Principle 7) if present
    const sectionCP7ManualData = formData.get("sectionCP7ManualData")
    if (sectionCP7ManualData) {
      backendFormData.append("sectionCP7ManualData", sectionCP7ManualData as string)
    }

    // Forward sectionCP8ManualData (Section C Principle 8) if present
    const sectionCP8ManualData = formData.get("sectionCP8ManualData")
    if (sectionCP8ManualData) {
      backendFormData.append("sectionCP8ManualData", sectionCP8ManualData as string)
    }

    // Forward sectionCP9ManualData (Section C Principle 9) if present
    const sectionCP9ManualData = formData.get("sectionCP9ManualData")
    if (sectionCP9ManualData) {
      backendFormData.append("sectionCP9ManualData", sectionCP9ManualData as string)
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
