"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SectionAManualData {
  contactName: string
  contactDesignation: string
  contactPhone: string
  contactEmail: string
  reportingBoundary: string
  employees: {
    permanent: { male: number; female: number; total: number }
    otherThanPermanent: { male: number; female: number; total: number }
  }
  workers: {
    permanent: { male: number; female: number; total: number }
    otherThanPermanent: { male: number; female: number; total: number }
  }
  turnover: {
    employees: { male: number; female: number; total: number }
    workers: { male: number; female: number; total: number }
  }
}

interface SectionAFormProps {
  onDataChange: (data: SectionAManualData) => void
  initialData?: Partial<SectionAManualData>
}

export function SectionAForm({ onDataChange, initialData }: SectionAFormProps) {
  const [formData, setFormData] = useState<SectionAManualData>({
    contactName: initialData?.contactName || "",
    contactDesignation: initialData?.contactDesignation || "",
    contactPhone: initialData?.contactPhone || "",
    contactEmail: initialData?.contactEmail || "",
    reportingBoundary: initialData?.reportingBoundary || "Standalone",
    employees: {
      permanent: { male: 0, female: 0, total: 0 },
      otherThanPermanent: { male: 0, female: 0, total: 0 },
    },
    workers: {
      permanent: { male: 0, female: 0, total: 0 },
      otherThanPermanent: { male: 0, female: 0, total: 0 },
    },
    turnover: {
      employees: { male: 0, female: 0, total: 0 },
      workers: { male: 0, female: 0, total: 0 },
    },
    ...initialData,
  })

  const handleAutoFill = () => {
    const dummyData: SectionAManualData = {
      contactName: "John Doe",
      contactDesignation: "Chief Sustainability Officer",
      contactPhone: "+91-9876543210",
      contactEmail: "john.doe@example.com",
      reportingBoundary: "Standalone",
      employees: {
        permanent: { male: 150, female: 75, total: 225 },
        otherThanPermanent: { male: 50, female: 25, total: 75 },
      },
      workers: {
        permanent: { male: 300, female: 100, total: 400 },
        otherThanPermanent: { male: 100, female: 50, total: 150 },
      },
      turnover: {
        employees: { male: 5, female: 3, total: 8 },
        workers: { male: 10, female: 5, total: 15 },
      },
    }
    setFormData(dummyData)
    onDataChange(dummyData)
  }

  const handleChange = (field: string, value: any) => {
    const updatedData = { ...formData }
    const keys = field.split(".")
    let current: any = updatedData

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]]
    }
    current[keys[keys.length - 1]] = value

    // Auto-calculate totals for employee and worker counts
    if (field.includes("employees.permanent")) {
      updatedData.employees.permanent.total =
        Number(updatedData.employees.permanent.male) + Number(updatedData.employees.permanent.female)
    }
    if (field.includes("employees.otherThanPermanent")) {
      updatedData.employees.otherThanPermanent.total =
        Number(updatedData.employees.otherThanPermanent.male) + Number(updatedData.employees.otherThanPermanent.female)
    }
    if (field.includes("workers.permanent")) {
      updatedData.workers.permanent.total =
        Number(updatedData.workers.permanent.male) + Number(updatedData.workers.permanent.female)
    }
    if (field.includes("workers.otherThanPermanent")) {
      updatedData.workers.otherThanPermanent.total =
        Number(updatedData.workers.otherThanPermanent.male) + Number(updatedData.workers.otherThanPermanent.female)
    }

    // Auto-calculate turnover totals (weighted average)
    if (field.includes("turnover.employees")) {
      const totalEmployees = 
        updatedData.employees.permanent.total + updatedData.employees.otherThanPermanent.total
      const maleEmployees = 
        updatedData.employees.permanent.male + updatedData.employees.otherThanPermanent.male
      const femaleEmployees = 
        updatedData.employees.permanent.female + updatedData.employees.otherThanPermanent.female
      
      if (totalEmployees > 0) {
        updatedData.turnover.employees.total = Number(
          ((updatedData.turnover.employees.male * maleEmployees + 
            updatedData.turnover.employees.female * femaleEmployees) / totalEmployees).toFixed(2)
        )
      }
    }
    
    if (field.includes("turnover.workers")) {
      const totalWorkers = 
        updatedData.workers.permanent.total + updatedData.workers.otherThanPermanent.total
      const maleWorkers = 
        updatedData.workers.permanent.male + updatedData.workers.otherThanPermanent.male
      const femaleWorkers = 
        updatedData.workers.permanent.female + updatedData.workers.otherThanPermanent.female
      
      if (totalWorkers > 0) {
        updatedData.turnover.workers.total = Number(
          ((updatedData.turnover.workers.male * maleWorkers + 
            updatedData.turnover.workers.female * femaleWorkers) / totalWorkers).toFixed(2)
        )
      }
    }

    setFormData(updatedData)
    onDataChange(updatedData)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-emerald-400">Section A - Contact & Reporting Details</CardTitle>
              <CardDescription className="text-slate-400">
                Provide basic company contact information and reporting boundary
              </CardDescription>
            </div>
            <Button onClick={handleAutoFill} variant="outline" size="sm">
              Auto Fill Test Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName" className="text-slate-300">
                Contact Person Name
              </Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                placeholder="e.g., Kamal Kumar Gwalani"
                className="bg-slate-900/50 border-slate-600 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactDesignation" className="text-slate-300">
                Designation
              </Label>
              <Input
                id="contactDesignation"
                value={formData.contactDesignation}
                onChange={(e) => handleChange("contactDesignation", e.target.value)}
                placeholder="e.g., Company Secretary"
                className="bg-slate-900/50 border-slate-600 text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-slate-300">
                Contact Phone
              </Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                placeholder="e.g., 011-24364869"
                className="bg-slate-900/50 border-slate-600 text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-slate-300">
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                placeholder="e.g., gkk@indianoil.in"
                className="bg-slate-900/50 border-slate-600 text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reportingBoundary" className="text-slate-300">
              Reporting Boundary
            </Label>
            <select
              id="reportingBoundary"
              value={formData.reportingBoundary}
              onChange={(e) => handleChange("reportingBoundary", e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-600 text-slate-100 rounded-md px-3 py-2"
            >
              <option value="Standalone">Standalone</option>
              <option value="Consolidated">Consolidated</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-emerald-400">Employee & Worker Count</CardTitle>
          <CardDescription className="text-slate-400">Enter headcount data (totals auto-calculate)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Permanent Employees */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">Permanent Employees</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Male</Label>
                <Input
                  type="number"
                  value={formData.employees.permanent.male || ""}
                  onChange={(e) => handleChange("employees.permanent.male", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Female</Label>
                <Input
                  type="number"
                  value={formData.employees.permanent.female || ""}
                  onChange={(e) => handleChange("employees.permanent.female", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Total (Auto)</Label>
                <Input
                  type="number"
                  value={formData.employees.permanent.total}
                  disabled
                  className="bg-slate-900/80 border-slate-600 text-emerald-400 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Other Than Permanent Employees */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">Other Than Permanent Employees</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Male</Label>
                <Input
                  type="number"
                  value={formData.employees.otherThanPermanent.male || ""}
                  onChange={(e) => handleChange("employees.otherThanPermanent.male", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Female</Label>
                <Input
                  type="number"
                  value={formData.employees.otherThanPermanent.female || ""}
                  onChange={(e) => handleChange("employees.otherThanPermanent.female", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Total (Auto)</Label>
                <Input
                  type="number"
                  value={formData.employees.otherThanPermanent.total}
                  disabled
                  className="bg-slate-900/80 border-slate-600 text-emerald-400 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Permanent Workers */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">Permanent Workers</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Male</Label>
                <Input
                  type="number"
                  value={formData.workers.permanent.male || ""}
                  onChange={(e) => handleChange("workers.permanent.male", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Female</Label>
                <Input
                  type="number"
                  value={formData.workers.permanent.female || ""}
                  onChange={(e) => handleChange("workers.permanent.female", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Total (Auto)</Label>
                <Input
                  type="number"
                  value={formData.workers.permanent.total}
                  disabled
                  className="bg-slate-900/80 border-slate-600 text-emerald-400 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Other Than Permanent Workers */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">Other Than Permanent Workers</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Male</Label>
                <Input
                  type="number"
                  value={formData.workers.otherThanPermanent.male || ""}
                  onChange={(e) => handleChange("workers.otherThanPermanent.male", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Female</Label>
                <Input
                  type="number"
                  value={formData.workers.otherThanPermanent.female || ""}
                  onChange={(e) => handleChange("workers.otherThanPermanent.female", Number(e.target.value))}
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Total (Auto)</Label>
                <Input
                  type="number"
                  value={formData.workers.otherThanPermanent.total}
                  disabled
                  className="bg-slate-900/80 border-slate-600 text-emerald-400 font-semibold"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-emerald-400">Turnover Rate (%)</CardTitle>
          <CardDescription className="text-slate-400">Enter percentage values (total auto-calculates)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Employee Turnover */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">Employee Turnover Rate</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Male %</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.turnover.employees.male || ""}
                  onChange={(e) => handleChange("turnover.employees.male", Number(e.target.value))}
                  placeholder="e.g., 3.2"
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Female %</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.turnover.employees.female || ""}
                  onChange={(e) => handleChange("turnover.employees.female", Number(e.target.value))}
                  placeholder="e.g., 2.9"
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Total % (Auto)</Label>
                <Input
                  type="number"
                  value={formData.turnover.employees.total || 0}
                  disabled
                  className="bg-slate-900/80 border-slate-600 text-emerald-400 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Worker Turnover */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-emerald-400">Worker Turnover Rate</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Male %</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.turnover.workers.male || ""}
                  onChange={(e) => handleChange("turnover.workers.male", Number(e.target.value))}
                  placeholder="e.g., 8.5"
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Female %</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.turnover.workers.female || ""}
                  onChange={(e) => handleChange("turnover.workers.female", Number(e.target.value))}
                  placeholder="e.g., 7.8"
                  className="bg-slate-900/50 border-slate-600 text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs">Total % (Auto)</Label>
                <Input
                  type="number"
                  value={formData.turnover.workers.total || 0}
                  disabled
                  className="bg-slate-900/80 border-slate-600 text-emerald-400 font-semibold"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
