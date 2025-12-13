"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileUpload: (file: File) => void
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
  })

  return (
    <Card className="bg-slate-700/50 border-emerald-500/20 border-2 border-dashed">
      <CardContent className="pt-6">
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center min-h-[300px] cursor-pointer transition-colors ${
            isDragActive ? "bg-emerald-500/10" : "hover:bg-slate-600/30"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="p-4 bg-emerald-500/10 rounded-full">
              <Upload className="w-12 h-12 text-emerald-400" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-2">
                {isDragActive ? "Drop your file here" : "Upload Annual Report or BRSR Document"}
              </p>
              <p className="text-slate-400 mb-4">Drag and drop your file or click to browse</p>
              <div className="flex items-center gap-4 justify-center text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  PDF
                </div>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  Excel
                </div>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Select File</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
