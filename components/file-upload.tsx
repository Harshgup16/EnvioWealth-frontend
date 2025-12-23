"use client"

import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileText, FileSpreadsheet, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileUpload: (files: File[]) => void
  selectedFiles?: File[]
  onRemoveFile?: (index: number) => void
}

export function FileUpload({ onFileUpload, selectedFiles = [], onRemoveFile }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload([...selectedFiles, ...acceptedFiles])
      }
    },
    [onFileUpload, selectedFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: true,
  })

  return (
    <Card className="bg-slate-700/50 border-emerald-500/20 border-2 border-dashed">
      <CardContent className="pt-6">
        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <div className="mb-4 space-y-2">
            <p className="text-sm font-medium text-emerald-400">Selected Files ({selectedFiles.length})</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-600"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <FileText className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-white truncate">{file.name}</span>
                    <span className="text-xs text-slate-400 flex-shrink-0">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  {onRemoveFile && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => onRemoveFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-colors ${
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
                {isDragActive ? "Drop your files here" : "Upload Annual Report or BRSR Documents"}
              </p>
              <p className="text-slate-400 mb-2">Drag and drop your files or click to browse</p>
              <p className="text-sm text-emerald-400 mb-4">💡 Upload multiple files for parallel processing</p>
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
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {selectedFiles.length > 0 ? "Add More Files" : "Select Files"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
