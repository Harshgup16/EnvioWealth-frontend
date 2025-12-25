"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface StakeholderEngagementEntry {
  stakeholderGroup: string
  vulnerableMarginalized: string
  channels: string
  frequency: string
  purpose: string
}

interface VulnerableEngagementEntry {
  vulnerableGroup: string
  concerns: string
  actionTaken: string
}

interface StakeholderConsultationDetails {
  a: string
  b: string
  c: string
}

interface SectionCP4ManualData {
  essential: {
    q1_stakeholderIdentification: string
    q2_stakeholderEngagement: StakeholderEngagementEntry[]
  }
  leadership: {
    q1_boardConsultation: string
    q2_stakeholderConsultationUsed: string
    q2_details: StakeholderConsultationDetails
    q3_vulnerableEngagement: VulnerableEngagementEntry[]
  }
}

interface SectionCP4FormProps {
  onDataChange?: (data: SectionCP4ManualData) => void
  initialData?: Partial<SectionCP4ManualData>
}

export function SectionCP4Form({ onDataChange, initialData }: SectionCP4FormProps) {
  const defaultData: SectionCP4ManualData = {
    essential: {
      q1_stakeholderIdentification: "",
      q2_stakeholderEngagement: [],
    },
    leadership: {
      q1_boardConsultation: "",
      q2_stakeholderConsultationUsed: "",
      q2_details: { a: "", b: "", c: "" },
      q3_vulnerableEngagement: [],
    },
  }

  const [data, setData] = useState<SectionCP4ManualData>(() => ({ ...(defaultData as any), ...(initialData as any) }))

  useEffect(() => {
    if (!initialData) return
    setData((prev) => {
      const merged = { ...(prev as any), ...(initialData as any) }
      try {
        if (JSON.stringify(merged) === JSON.stringify(prev)) return prev
      } catch (e) {
        // ignore
      }
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

  const addStakeholderEntry = () => {
    const updated = { ...data }
    updated.essential.q2_stakeholderEngagement = [...(updated.essential.q2_stakeholderEngagement || []), { stakeholderGroup: "", vulnerableMarginalized: "", channels: "", frequency: "", purpose: "" }]
    setData(updated)
  }

  const updateStakeholderEntry = (idx: number, field: string, value: string) => {
    const updated = { ...data }
    const arr = [...(updated.essential.q2_stakeholderEngagement || [])]
    arr[idx] = { ...arr[idx], [field]: value }
    updated.essential.q2_stakeholderEngagement = arr
    setData(updated)
  }

  const removeStakeholderEntry = (idx: number) => {
    const updated = { ...data }
    const arr = [...(updated.essential.q2_stakeholderEngagement || [])]
    arr.splice(idx, 1)
    updated.essential.q2_stakeholderEngagement = arr
    setData(updated)
  }

  const addVulnerableEntry = () => {
    const updated = { ...data }
    updated.leadership.q3_vulnerableEngagement = [...(updated.leadership.q3_vulnerableEngagement || []), { vulnerableGroup: "", concerns: "", actionTaken: "" }]
    setData(updated)
  }

  const updateVulnerableEntry = (idx: number, field: string, value: string) => {
    const updated = { ...data }
    const arr = [...(updated.leadership.q3_vulnerableEngagement || [])]
    arr[idx] = { ...arr[idx], [field]: value }
    updated.leadership.q3_vulnerableEngagement = arr
    setData(updated)
  }

  const removeVulnerableEntry = (idx: number) => {
    const updated = { ...data }
    const arr = [...(updated.leadership.q3_vulnerableEngagement || [])]
    arr.splice(idx, 1)
    updated.leadership.q3_vulnerableEngagement = arr
    setData(updated)
  }

  const handleAutoFill = () => {
    const sample: SectionCP4ManualData = {
      essential: {
        q1_stakeholderIdentification: "The Company employs a comprehensive approach to identify stakeholders, including surveys, interviews and focus groups.",
        q2_stakeholderEngagement: [
          { stakeholderGroup: "Shareholders & Investors", vulnerableMarginalized: "No", channels: "AGM, Email, Reports", frequency: "As & when required", purpose: "Profitability & Stability" },
          { stakeholderGroup: "Communities", vulnerableMarginalized: "Yes", channels: "Community meets, NGO partnerships", frequency: "Regular", purpose: "Need assessment, CSR feedback" },
        ],
      },
      leadership: {
        q1_boardConsultation: "Board committees on Audit, CSR & Sustainability meet regularly to discuss ESG issues.",
        q2_stakeholderConsultationUsed: "Yes",
        q2_details: { a: "Environmental Policy Development: consultations with communities and experts.", b: "Social Impact Assessments before expansions.", c: "Supply chain stakeholder dialogues for responsible sourcing." },
        q3_vulnerableEngagement: [
          { vulnerableGroup: "Underprivileged Community", concerns: "Access to healthcare", actionTaken: "Health camps, equipment donations" },
        ],
      },
    }
    setData(sample)
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-emerald-400">Section C - Principle 4 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill stakeholder identification, engagement and leadership indicators for Principle 4</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleAutoFill}>Auto Fill Test Data</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Stakeholder identification</h3>
          <Textarea value={data.essential.q1_stakeholderIdentification} onChange={(e) => setSimpleField(['essential','q1_stakeholderIdentification'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Stakeholder engagement</h3>
          <div className="space-y-3 mt-2">
            {(data.essential.q2_stakeholderEngagement || []).map((entry, idx) => (
              <div key={idx} className="bg-slate-700 p-3 rounded grid grid-cols-6 gap-2 items-start">
                <Input placeholder="Stakeholder group" value={entry.stakeholderGroup} onChange={(e) => updateStakeholderEntry(idx, 'stakeholderGroup', e.target.value)} />
                <Input placeholder="Vulnerable/Marginalized" value={entry.vulnerableMarginalized} onChange={(e) => updateStakeholderEntry(idx, 'vulnerableMarginalized', e.target.value)} />
                <Input placeholder="Channels" value={entry.channels} onChange={(e) => updateStakeholderEntry(idx, 'channels', e.target.value)} />
                <Input placeholder="Frequency" value={entry.frequency} onChange={(e) => updateStakeholderEntry(idx, 'frequency', e.target.value)} />
                <Input placeholder="Purpose" value={entry.purpose} onChange={(e) => updateStakeholderEntry(idx, 'purpose', e.target.value)} />
                <Button variant="destructive" size="sm" onClick={() => removeStakeholderEntry(idx)}>Remove</Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addStakeholderEntry()}>Add Stakeholder Entry</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q1: Board consultation</h3>
          <Textarea value={data.leadership.q1_boardConsultation} onChange={(e) => setSimpleField(['leadership','q1_boardConsultation'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q2: Stakeholder consultation used</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Input placeholder="Yes/No" value={data.leadership.q2_stakeholderConsultationUsed} onChange={(e) => setSimpleField(['leadership','q2_stakeholderConsultationUsed'], e.target.value)} />
            <div>
              <Label className="text-slate-200">Details (a, b, c)</Label>
              <Textarea value={data.leadership.q2_details.a} onChange={(e) => setSimpleField(['leadership','q2_details','a'], e.target.value)} className="min-h-10 mt-2" />
              <Textarea value={data.leadership.q2_details.b} onChange={(e) => setSimpleField(['leadership','q2_details','b'], e.target.value)} className="min-h-10 mt-2" />
              <Textarea value={data.leadership.q2_details.c} onChange={(e) => setSimpleField(['leadership','q2_details','c'], e.target.value)} className="min-h-10 mt-2" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q3: Vulnerable engagement</h3>
          <div className="space-y-3 mt-2">
            {(data.leadership.q3_vulnerableEngagement || []).map((entry, idx) => (
              <div key={idx} className="bg-slate-700 p-3 rounded grid grid-cols-3 gap-2">
                <Input placeholder="Vulnerable group" value={entry.vulnerableGroup} onChange={(e) => updateVulnerableEntry(idx, 'vulnerableGroup', e.target.value)} />
                <Input placeholder="Concerns" value={entry.concerns} onChange={(e) => updateVulnerableEntry(idx, 'concerns', e.target.value)} />
                <Textarea placeholder="Action taken" value={entry.actionTaken} onChange={(e) => updateVulnerableEntry(idx, 'actionTaken', e.target.value)} className="min-h-10" />
                <Button variant="destructive" size="sm" onClick={() => removeVulnerableEntry(idx)}>Remove</Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addVulnerableEntry()}>Add Vulnerable Entry</Button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            try {
              navigator.clipboard.writeText(JSON.stringify(data, null, 2))
              alert('CP4 JSON copied to clipboard')
            } catch (e) {
              alert('Could not copy to clipboard')
            }
          }}>Export JSON</Button>

          <Button variant="outline" size="sm" onClick={() => {
            const raw = window.prompt('Paste CP4 JSON')
            if (!raw) return
            try {
              const parsed = JSON.parse(raw)
              setData(parsed)
            } catch (e) {
              alert('Invalid JSON')
            }
          }}>Import JSON</Button>

          <Button onClick={() => onDataChange && onDataChange(data)}>Apply</Button>
        </div>
      </CardContent>
    </Card>
  )
}
