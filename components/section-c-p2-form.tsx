"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface RDOrCapexEntry { currentFY: string; previousFY: string; improvementDetails?: string }
interface ReclaimProcess { applicable: string; process: string }
interface ReclaimedProductNumbers { reUsed: string; recycled: string; safelyDisposed: string }

interface SectionCP2ManualData {
  essential: {
    q1_rdCapexInvestments: { rd: RDOrCapexEntry; capex: RDOrCapexEntry }
    q2_sustainableSourcing: { proceduresInPlace: string; percentageSustainablySourced: string }
    q3_reclaimProcesses: { plastics: ReclaimProcess; eWaste: ReclaimProcess; hazardousWaste: ReclaimProcess; otherWaste: ReclaimProcess }
    q4_epr: { applicable: string; wasteCollectionPlanInLine: string }
  }
  leadership: {
    q1_lcaDetails: string
    q2_significantConcerns: string
    q3_recycledInputMaterial: Array<{ inputMaterial: string; currentFY: string; previousFY: string }>
    q4_productsReclaimed: {
      plastics: { currentFY: ReclaimedProductNumbers; previousFY: ReclaimedProductNumbers }
      eWaste: { currentFY: ReclaimedProductNumbers; previousFY: ReclaimedProductNumbers }
      hazardousWaste: { currentFY: ReclaimedProductNumbers; previousFY: ReclaimedProductNumbers }
      otherWaste: { currentFY: ReclaimedProductNumbers; previousFY: ReclaimedProductNumbers }
    }
    q5_reclaimedPercentage: string
  }
}

interface SectionCP2FormProps {
  onDataChange?: (data: SectionCP2ManualData) => void
  initialData?: Partial<SectionCP2ManualData>
}

export function SectionCP2Form({ onDataChange, initialData }: SectionCP2FormProps) {
  const defaultData: SectionCP2ManualData = {
    essential: {
      q1_rdCapexInvestments: { rd: { currentFY: "", previousFY: "", improvementDetails: "" }, capex: { currentFY: "", previousFY: "", improvementDetails: "" } },
      q2_sustainableSourcing: { proceduresInPlace: "", percentageSustainablySourced: "" },
      q3_reclaimProcesses: { plastics: { applicable: "", process: "" }, eWaste: { applicable: "", process: "" }, hazardousWaste: { applicable: "", process: "" }, otherWaste: { applicable: "", process: "" } },
      q4_epr: { applicable: "", wasteCollectionPlanInLine: "" },
    },
    leadership: {
      q1_lcaDetails: "",
      q2_significantConcerns: "",
      q3_recycledInputMaterial: [],
      q4_productsReclaimed: {
        plastics: { currentFY: { reUsed: "", recycled: "", safelyDisposed: "" }, previousFY: { reUsed: "", recycled: "", safelyDisposed: "" } },
        eWaste: { currentFY: { reUsed: "", recycled: "", safelyDisposed: "" }, previousFY: { reUsed: "", recycled: "", safelyDisposed: "" } },
        hazardousWaste: { currentFY: { reUsed: "", recycled: "", safelyDisposed: "" }, previousFY: { reUsed: "", recycled: "", safelyDisposed: "" } },
        otherWaste: { currentFY: { reUsed: "", recycled: "", safelyDisposed: "" }, previousFY: { reUsed: "", recycled: "", safelyDisposed: "" } },
      },
      q5_reclaimedPercentage: "",
    },
  }

  const [data, setData] = useState<SectionCP2ManualData>(() => ({ ...(defaultData as any), ...(initialData as any) }))

  useEffect(() => {
    if (!initialData) return
    setData((prev) => {
      const merged = { ...(prev as any), ...(initialData as any) }
      try {
        if (JSON.stringify(merged) === JSON.stringify(prev)) return prev
      } catch (e) {}
      return merged
    })
  }, [initialData])

  useEffect(() => {
    onDataChange && onDataChange(data)
  }, [data, onDataChange])

  const setSimpleField = (path: string[], value: any) => {
    const updated: any = { ...data }
    let cursor: any = updated
    for (let i = 0; i < path.length - 1; i++) cursor = cursor[path[i]] = { ...(cursor[path[i]] || {}) }
    cursor[path[path.length - 1]] = value
    setData(updated)
  }

  const addRecycledInput = () => {
    const updated = { ...data }
    updated.leadership.q3_recycledInputMaterial = [...(updated.leadership.q3_recycledInputMaterial || []), { inputMaterial: "", currentFY: "", previousFY: "" }]
    setData(updated)
  }

  const updateRecycledInput = (idx: number, field: string, value: string) => {
    const updated = { ...data }
    const arr = [...(updated.leadership.q3_recycledInputMaterial || [])]
    arr[idx] = { ...arr[idx], [field]: value }
    updated.leadership.q3_recycledInputMaterial = arr
    setData(updated)
  }

  const handleAutoFill = () => {
    const sample: SectionCP2ManualData = {
      essential: {
        q1_rdCapexInvestments: { rd: { currentFY: "100%", previousFY: "100%", improvementDetails: "Working on new fuels and alternate energy sources" }, capex: { currentFY: "100%", previousFY: "100%", improvementDetails: "Energy Security & efficiency, alternate energy" } },
        q2_sustainableSourcing: { proceduresInPlace: "Vendor selection includes environmental/social checks", percentageSustainablySourced: "42.46%" },
        q3_reclaimProcesses: { plastics: { applicable: "Yes", process: "Collection and recycling via third-party collection centers" }, eWaste: { applicable: "No", process: "Not Applicable" }, hazardousWaste: { applicable: "Yes", process: "State-wise collection centers for used lube oil containers" }, otherWaste: { applicable: "", process: "Not Applicable" } },
        q4_epr: { applicable: "Yes", wasteCollectionPlanInLine: "Registered under EPR and achieved 2023-24 target" },
      },
      leadership: {
        q1_lcaDetails: "No LCA undertaken during 2023-24.",
        q2_significantConcerns: "Not Applicable",
        q3_recycledInputMaterial: [{ inputMaterial: "Recycled Base Oil", currentFY: "0.15%", previousFY: "0.08%*" }],
        q4_productsReclaimed: {
          plastics: { currentFY: { reUsed: "0", recycled: "0", safelyDisposed: "7,661*" }, previousFY: { reUsed: "0", recycled: "0", safelyDisposed: "69.55" } },
          eWaste: { currentFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" }, previousFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" } },
          hazardousWaste: { currentFY: { reUsed: "0", recycled: "0", safelyDisposed: "222.82" }, previousFY: { reUsed: "0", recycled: "0", safelyDisposed: "133" } },
          otherWaste: { currentFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" }, previousFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" } },
        },
        q5_reclaimedPercentage: "The Company successfully fulfilled the EPR target for 2023-24 by reclaiming plastic waste equivalent to 100% of the total plastic used in lubricant packaging.",
      },
    }
    setData(sample)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-emerald-400">Section C - Principle 2 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential & Leadership indicators for Principle 2</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleAutoFill}>Auto Fill Test Data</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: R&D / CAPEX Investments</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <Label className="text-slate-200">R&D</Label>
              <Input value={data.essential.q1_rdCapexInvestments.rd.currentFY} onChange={(e) => setSimpleField(['essential','q1_rdCapexInvestments','rd','currentFY'], e.target.value)} placeholder="Current FY" />
              <Input className="mt-2" value={data.essential.q1_rdCapexInvestments.rd.previousFY} onChange={(e) => setSimpleField(['essential','q1_rdCapexInvestments','rd','previousFY'], e.target.value)} placeholder="Previous FY" />
              <Textarea className="mt-2" value={data.essential.q1_rdCapexInvestments.rd.improvementDetails} onChange={(e) => setSimpleField(['essential','q1_rdCapexInvestments','rd','improvementDetails'], e.target.value)} placeholder="Improvement details" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <Label className="text-slate-200">CAPEX</Label>
              <Input value={data.essential.q1_rdCapexInvestments.capex.currentFY} onChange={(e) => setSimpleField(['essential','q1_rdCapexInvestments','capex','currentFY'], e.target.value)} placeholder="Current FY" />
              <Input className="mt-2" value={data.essential.q1_rdCapexInvestments.capex.previousFY} onChange={(e) => setSimpleField(['essential','q1_rdCapexInvestments','capex','previousFY'], e.target.value)} placeholder="Previous FY" />
              <Textarea className="mt-2" value={data.essential.q1_rdCapexInvestments.capex.improvementDetails} onChange={(e) => setSimpleField(['essential','q1_rdCapexInvestments','capex','improvementDetails'], e.target.value)} placeholder="Improvement details" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Sustainable sourcing</h3>
          <div className="mt-2">
            <Label className="text-slate-200">Procedures in place</Label>
            <Textarea value={data.essential.q2_sustainableSourcing.proceduresInPlace} onChange={(e) => setSimpleField(['essential','q2_sustainableSourcing','proceduresInPlace'], e.target.value)} className="min-h-20" />
            <Label className="text-slate-200 mt-2">% sustainably sourced</Label>
            <Input value={data.essential.q2_sustainableSourcing.percentageSustainablySourced} onChange={(e) => setSimpleField(['essential','q2_sustainableSourcing','percentageSustainablySourced'], e.target.value)} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Reclaim Processes</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['plastics','eWaste','hazardousWaste','otherWaste'] as const).map((k) => (
              <div key={k} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{k}</Label>
                <Input value={(data.essential.q3_reclaimProcesses as any)[k].applicable} onChange={(e) => setSimpleField(['essential','q3_reclaimProcesses',k,'applicable'], e.target.value)} placeholder="Applicable? Yes/No" />
                <Textarea className="mt-2 min-h-20" value={(data.essential.q3_reclaimProcesses as any)[k].process} onChange={(e) => setSimpleField(['essential','q3_reclaimProcesses',k,'process'], e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q4: EPR</h3>
          <div className="mt-2">
            <Label className="text-slate-200">Applicable</Label>
            <Input value={data.essential.q4_epr.applicable} onChange={(e) => setSimpleField(['essential','q4_epr','applicable'], e.target.value)} />
            <Label className="text-slate-200 mt-2">Waste collection plan</Label>
            <Textarea className="mt-2 min-h-20" value={data.essential.q4_epr.wasteCollectionPlanInLine} onChange={(e) => setSimpleField(['essential','q4_epr','wasteCollectionPlanInLine'], e.target.value)} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q1: LCA details</h3>
          <Textarea value={data.leadership.q1_lcaDetails} onChange={(e) => setSimpleField(['leadership','q1_lcaDetails'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q2: Significant concerns</h3>
          <Textarea value={data.leadership.q2_significantConcerns} onChange={(e) => setSimpleField(['leadership','q2_significantConcerns'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q3: Recycled input material</h3>
          <div className="space-y-2 mt-2">
            {(data.leadership.q3_recycledInputMaterial || []).map((item, idx) => (
              <div key={idx} className="bg-slate-700 p-3 rounded grid grid-cols-3 gap-2">
                <Input value={item.inputMaterial} onChange={(e) => updateRecycledInput(idx, 'inputMaterial', e.target.value)} placeholder="Input material" />
                <Input value={item.currentFY} onChange={(e) => updateRecycledInput(idx, 'currentFY', e.target.value)} placeholder="Current FY" />
                <Input value={item.previousFY} onChange={(e) => updateRecycledInput(idx, 'previousFY', e.target.value)} placeholder="Previous FY" />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={addRecycledInput}>Add Entry</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q4: Products reclaimed</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['plastics','eWaste','hazardousWaste','otherWaste'] as const).map((k) => (
              <div key={k} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{k} (Current FY)</Label>
                <Input value={(data.leadership.q4_productsReclaimed as any)[k].currentFY.reUsed} onChange={(e) => setSimpleField(['leadership','q4_productsReclaimed',k,'currentFY','reUsed'], e.target.value)} placeholder="Re-used" />
                <Input className="mt-2" value={(data.leadership.q4_productsReclaimed as any)[k].currentFY.recycled} onChange={(e) => setSimpleField(['leadership','q4_productsReclaimed',k,'currentFY','recycled'], e.target.value)} placeholder="Recycled" />
                <Input className="mt-2" value={(data.leadership.q4_productsReclaimed as any)[k].currentFY.safelyDisposed} onChange={(e) => setSimpleField(['leadership','q4_productsReclaimed',k,'currentFY','safelyDisposed'], e.target.value)} placeholder="Safely disposed" />
                <Label className="text-slate-200 mt-2">{k} (Previous FY)</Label>
                <Input value={(data.leadership.q4_productsReclaimed as any)[k].previousFY.reUsed} onChange={(e) => setSimpleField(['leadership','q4_productsReclaimed',k,'previousFY','reUsed'], e.target.value)} placeholder="Re-used" />
                <Input className="mt-2" value={(data.leadership.q4_productsReclaimed as any)[k].previousFY.recycled} onChange={(e) => setSimpleField(['leadership','q4_productsReclaimed',k,'previousFY','recycled'], e.target.value)} placeholder="Recycled" />
                <Input className="mt-2" value={(data.leadership.q4_productsReclaimed as any)[k].previousFY.safelyDisposed} onChange={(e) => setSimpleField(['leadership','q4_productsReclaimed',k,'previousFY','safelyDisposed'], e.target.value)} placeholder="Safely disposed" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q5: Reclaimed percentage</h3>
          <Textarea value={data.leadership.q5_reclaimedPercentage} onChange={(e) => setSimpleField(['leadership','q5_reclaimedPercentage'], e.target.value)} className="min-h-20" />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            try { navigator.clipboard.writeText(JSON.stringify(data, null, 2)); alert('CP2 JSON copied to clipboard') } catch (e) { alert('Could not copy to clipboard') }
          }}>Export JSON</Button>
          <Button variant="outline" size="sm" onClick={() => {
            const raw = window.prompt('Paste CP2 JSON')
            if (!raw) return
            try { const parsed = JSON.parse(raw); setData(parsed) } catch (e) { alert('Invalid JSON') }
          }}>Import JSON</Button>
          <Button onClick={() => onDataChange && onDataChange(data)}>Apply</Button>
        </div>
      </CardContent>
    </Card>
  )
}
