"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface YearNums { received: string; pending: string; remarks: string }
interface YearPair { currentFY: string; previousFY: string }

interface ConsumerComplaintsCategory {
  currentFY: YearNums
  previousFY: YearNums
}

interface ProductInformationPercentage {
  environmentalParameters: string
  safeUsage: string
  recycling: string
}

interface ProductRecalls {
  voluntary: { number: string; reasons: string }
  forced: { number: string; reasons: string }
}

interface SectionCP9ManualData {
  essential: {
    q1_consumerComplaintMechanism: string
    q2_productInformationPercentage: ProductInformationPercentage
    q3_consumerComplaints: {
      dataPrivacy: ConsumerComplaintsCategory
      advertising: ConsumerComplaintsCategory
      cybersecurity: ConsumerComplaintsCategory
      deliveryOfServices: ConsumerComplaintsCategory
      restrictiveTradePractices: ConsumerComplaintsCategory
      unfairTradePractices: ConsumerComplaintsCategory
      other: ConsumerComplaintsCategory
    }
    q4_productRecalls: ProductRecalls
    q5_cyberSecurityPolicy: string
    q6_correctiveActions: string
  }
  leadership: {
    q1: string
    q2: string
    q3: string
    q4: string
    q5: string
  }
}

interface SectionCP9FormProps {
  onDataChange?: (data: SectionCP9ManualData) => void
  initialData?: Partial<SectionCP9ManualData>
}

export function SectionCP9Form({ onDataChange, initialData }: SectionCP9FormProps) {
  const defaultData: SectionCP9ManualData = {
    essential: {
      q1_consumerComplaintMechanism: "",
      q2_productInformationPercentage: { environmentalParameters: "", safeUsage: "", recycling: "" },
      q3_consumerComplaints: {
        dataPrivacy: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
        advertising: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
        cybersecurity: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
        deliveryOfServices: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
        restrictiveTradePractices: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
        unfairTradePractices: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
        other: { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } },
      },
      q4_productRecalls: { voluntary: { number: "", reasons: "" }, forced: { number: "", reasons: "" } },
      q5_cyberSecurityPolicy: "",
      q6_correctiveActions: ""
    },
    leadership: {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: ""
    }
  }

  const normalize = (raw: any) => {
    if (!raw) return raw
    const copy = { ...(raw as any) }
    copy.essential = copy.essential || {}
    copy.essential.q2_productInformationPercentage = copy.essential.q2_productInformationPercentage || { environmentalParameters: "", safeUsage: "", recycling: "" }
    const defaultsCat = { currentFY: { received: "", pending: "", remarks: "" }, previousFY: { received: "", pending: "", remarks: "" } }
    copy.essential.q3_consumerComplaints = copy.essential.q3_consumerComplaints || {}
    for (const k of ["dataPrivacy","advertising","cybersecurity","deliveryOfServices","restrictiveTradePractices","unfairTradePractices","other"]) {
      copy.essential.q3_consumerComplaints[k] = copy.essential.q3_consumerComplaints[k] || JSON.parse(JSON.stringify(defaultsCat))
    }
    copy.essential.q4_productRecalls = copy.essential.q4_productRecalls || { voluntary: { number: "", reasons: "" }, forced: { number: "", reasons: "" } }

    copy.essential.q5_cyberSecurityPolicy = typeof copy.essential.q5_cyberSecurityPolicy === 'undefined' ? '' : copy.essential.q5_cyberSecurityPolicy
    copy.essential.q6_correctiveActions = typeof copy.essential.q6_correctiveActions === 'undefined' ? '' : copy.essential.q6_correctiveActions

    copy.leadership = copy.leadership || {}
    copy.leadership.q1 = typeof copy.leadership.q1 === 'undefined' ? '' : copy.leadership.q1
    copy.leadership.q2 = typeof copy.leadership.q2 === 'undefined' ? '' : copy.leadership.q2
    copy.leadership.q3 = typeof copy.leadership.q3 === 'undefined' ? '' : copy.leadership.q3
    copy.leadership.q4 = typeof copy.leadership.q4 === 'undefined' ? '' : copy.leadership.q4
    copy.leadership.q5 = typeof copy.leadership.q5 === 'undefined' ? '' : copy.leadership.q5

    return copy
  }

  const [data, setData] = useState<SectionCP9ManualData>(() => normalize({ ...(defaultData as any), ...(initialData as any) }))

  useEffect(() => {
    if (!initialData) return
    setData((prev) => {
      const merged = normalize({ ...(prev as any), ...(initialData as any) })
      try { if (JSON.stringify(merged) === JSON.stringify(prev)) return prev } catch (e) {}
      return merged
    })
  }, [initialData])

  useEffect(() => { onDataChange && onDataChange(data) }, [data, onDataChange])

  const setSimpleField = (path: string[], value: any) => {
    const updated: any = { ...data }
    let cursor: any = updated
    for (let i = 0; i < path.length - 1; i++) cursor = cursor[path[i]] = { ...(cursor[path[i]] || {}) }
    cursor[path[path.length - 1]] = value
    setData(updated)
  }

  const handleAutoFill = () => {
    const sample: SectionCP9ManualData = {
      essential: {
        q1_consumerComplaintMechanism: "We maintain a centralized consumer grievance mechanism with a 30-day SLA.",
        q2_productInformationPercentage: { environmentalParameters: "80%", safeUsage: "90%", recycling: "75%" },
        q3_consumerComplaints: {
          dataPrivacy: { currentFY: { received: "10", pending: "2", remarks: "Resolved" }, previousFY: { received: "12", pending: "1", remarks: "" } },
          advertising: { currentFY: { received: "5", pending: "0", remarks: "None" }, previousFY: { received: "3", pending: "0", remarks: "" } },
          cybersecurity: { currentFY: { received: "2", pending: "0", remarks: "None" }, previousFY: { received: "1", pending: "0", remarks: "" } },
          deliveryOfServices: { currentFY: { received: "8", pending: "1", remarks: "Ongoing" }, previousFY: { received: "6", pending: "2", remarks: "" } },
          restrictiveTradePractices: { currentFY: { received: "0", pending: "0", remarks: "" }, previousFY: { received: "0", pending: "0", remarks: "" } },
          unfairTradePractices: { currentFY: { received: "1", pending: "0", remarks: "Settled" }, previousFY: { received: "2", pending: "0", remarks: "" } },
          other: { currentFY: { received: "0", pending: "0", remarks: "" }, previousFY: { received: "0", pending: "0", remarks: "" } },
        },
        q4_productRecalls: { voluntary: { number: "1", reasons: "Labeling" }, forced: { number: "0", reasons: "" } },
        q5_cyberSecurityPolicy: "Cyber security policy adopted and reviewed annually.",
        q6_correctiveActions: "Corrective actions include product withdrawal and customer notification protocols."
      },
      leadership: {
        q1: "Led consumer awareness campaigns across regions.",
        q2: "Implemented product safety standards and supplier audits.",
        q3: "Established escalation procedures for major complaints.",
        q4: "Provided staff training on complaint handling.",
        q5: "Conducted third-party audits on consumer grievance processes."
      }
    }
    setData(sample)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `section_c_p9_manual.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportJSON = (text: string) => {
    try { const parsed = JSON.parse(text); const normalized = normalize(parsed); setData((prev) => ({ ...(prev as any), ...(normalized as any) })) } catch (e) { alert('Invalid JSON') }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-emerald-400">Section C - Principle 9 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential indicators for Principle 9 (Consumer Affairs)</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleAutoFill}>Auto Fill Test Data</Button>
            <Button size="sm" variant="outline" onClick={handleExportJSON}>Export JSON</Button>
            <Button size="sm" variant="outline" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(data, null, 2)); alert('Copied to clipboard') }}>Copy JSON</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Consumer Complaint Mechanism</h3>
          <Textarea placeholder="Describe your consumer complaint mechanism" value={data.essential.q1_consumerComplaintMechanism} onChange={(e) => setSimpleField(['essential','q1_consumerComplaintMechanism'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Product Information (%)</h3>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Environmental Parameters</Label>
              <Input placeholder="% of products" value={data.essential.q2_productInformationPercentage.environmentalParameters} onChange={(e) => setSimpleField(['essential','q2_productInformationPercentage','environmentalParameters'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Safe Usage</Label>
              <Input placeholder="% of products" value={data.essential.q2_productInformationPercentage.safeUsage} onChange={(e) => setSimpleField(['essential','q2_productInformationPercentage','safeUsage'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Recycling</Label>
              <Input placeholder="% of products" value={data.essential.q2_productInformationPercentage.recycling} onChange={(e) => setSimpleField(['essential','q2_productInformationPercentage','recycling'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Consumer Complaints (by category)</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['dataPrivacy','advertising','cybersecurity','deliveryOfServices','restrictiveTradePractices','unfairTradePractices','other'] as const).map((cat) => (
              <div key={cat} className="bg-slate-700 p-3 rounded">
                <h4 className="text-sm font-semibold text-slate-200">{cat}</h4>
                <Label className="text-slate-300 mt-2">Current FY - Received</Label>
                <Input placeholder="Received" value={(data.essential.q3_consumerComplaints as any)[cat].currentFY.received} onChange={(e) => setSimpleField(['essential','q3_consumerComplaints', String(cat),'currentFY','received'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Current FY - Pending</Label>
                <Input placeholder="Pending" value={(data.essential.q3_consumerComplaints as any)[cat].currentFY.pending} onChange={(e) => setSimpleField(['essential','q3_consumerComplaints', String(cat),'currentFY','pending'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Current FY - Remarks</Label>
                <Input placeholder="Remarks" value={(data.essential.q3_consumerComplaints as any)[cat].currentFY.remarks} onChange={(e) => setSimpleField(['essential','q3_consumerComplaints', String(cat),'currentFY','remarks'], e.target.value)} className="mt-1" />

                <hr className="my-2" />
                <Label className="text-slate-300 mt-2">Previous FY - Received</Label>
                <Input placeholder="Received" value={(data.essential.q3_consumerComplaints as any)[cat].previousFY.received} onChange={(e) => setSimpleField(['essential','q3_consumerComplaints', String(cat),'previousFY','received'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Previous FY - Pending</Label>
                <Input placeholder="Pending" value={(data.essential.q3_consumerComplaints as any)[cat].previousFY.pending} onChange={(e) => setSimpleField(['essential','q3_consumerComplaints', String(cat),'previousFY','pending'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Previous FY - Remarks</Label>
                <Input placeholder="Remarks" value={(data.essential.q3_consumerComplaints as any)[cat].previousFY.remarks} onChange={(e) => setSimpleField(['essential','q3_consumerComplaints', String(cat),'previousFY','remarks'], e.target.value)} className="mt-1" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q4: Product Recalls</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Voluntary Recalls - Number</Label>
              <Input placeholder="Number" value={data.essential.q4_productRecalls.voluntary.number} onChange={(e) => setSimpleField(['essential','q4_productRecalls','voluntary','number'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Voluntary - Reasons</Label>
              <Input placeholder="Reasons" value={data.essential.q4_productRecalls.voluntary.reasons} onChange={(e) => setSimpleField(['essential','q4_productRecalls','voluntary','reasons'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Forced Recalls - Number</Label>
              <Input placeholder="Number" value={data.essential.q4_productRecalls.forced.number} onChange={(e) => setSimpleField(['essential','q4_productRecalls','forced','number'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Forced - Reasons</Label>
              <Input placeholder="Reasons" value={data.essential.q4_productRecalls.forced.reasons} onChange={(e) => setSimpleField(['essential','q4_productRecalls','forced','reasons'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q5: Cyber Security Policy</h3>
          <Textarea placeholder="Cyber security policy summary or link" value={data.essential.q5_cyberSecurityPolicy} onChange={(e) => setSimpleField(['essential','q5_cyberSecurityPolicy'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q6: Corrective Actions</h3>
          <Textarea placeholder="Corrective actions taken / protocols" value={data.essential.q6_correctiveActions} onChange={(e) => setSimpleField(['essential','q6_correctiveActions'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership</h3>
          <div className="grid grid-cols-1 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Leadership Q1</Label>
              <Textarea placeholder="Leadership Q1 details" value={data.leadership.q1} onChange={(e) => setSimpleField(['leadership','q1'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Leadership Q2</Label>
              <Textarea placeholder="Leadership Q2 details" value={data.leadership.q2} onChange={(e) => setSimpleField(['leadership','q2'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Leadership Q3</Label>
              <Textarea placeholder="Leadership Q3 details" value={data.leadership.q3} onChange={(e) => setSimpleField(['leadership','q3'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Leadership Q4</Label>
              <Textarea placeholder="Leadership Q4 details" value={data.leadership.q4} onChange={(e) => setSimpleField(['leadership','q4'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Leadership Q5</Label>
              <Textarea placeholder="Leadership Q5 details" value={data.leadership.q5} onChange={(e) => setSimpleField(['leadership','q5'], e.target.value)} className="min-h-16 mt-1" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleAutoFill()}>Auto Fill</Button>
            <Button size="sm" onClick={() => handleExportJSON()}>Export JSON</Button>
          </div>
          <div>
            <Button size="sm" onClick={() => onDataChange && onDataChange(data)}>Apply</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
