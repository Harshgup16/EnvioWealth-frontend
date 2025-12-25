"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface SectionCP7ManualData {
  essential: {
    q1a_numberOfAffiliations: string
    q1b_affiliationsList: Array<{ name: string }>
    q2_antiCompetitiveConduct: string
  }
  leadership: {
    q1_publicPolicyAdvocacy: Array<{ issue: string; position: string; details: string }>
  }
}

interface SectionCP7FormProps {
  onDataChange?: (data: SectionCP7ManualData) => void
  initialData?: Partial<SectionCP7ManualData>
}

export function SectionCP7Form({ onDataChange, initialData }: SectionCP7FormProps) {
  const defaultData: SectionCP7ManualData = {
    essential: {
      q1a_numberOfAffiliations: "",
      q1b_affiliationsList: [],
      q2_antiCompetitiveConduct: "",
    },
    leadership: {
      q1_publicPolicyAdvocacy: [],
    },
  }

  const asArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : [])

  const normalize = (raw: any) => {
    if (!raw) return raw
    const copy = { ...(raw as any) }
    copy.essential = copy.essential || {}
    copy.leadership = copy.leadership || {}
    copy.essential.q1b_affiliationsList = asArray(copy.essential.q1b_affiliationsList)
    copy.leadership.q1_publicPolicyAdvocacy = asArray(copy.leadership.q1_publicPolicyAdvocacy)
    return copy
  }

  const [data, setData] = useState<SectionCP7ManualData>(() => normalize({ ...(defaultData as any), ...(initialData as any) }))

  useEffect(() => {
    if (!initialData) return
    setData((prev) => {
      const merged = normalize({ ...(prev as any), ...(initialData as any) })
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

  const handleAutoFill = () => {
    const sample: SectionCP7ManualData = {
      essential: {
        q1a_numberOfAffiliations: "3",
        q1b_affiliationsList: [{ name: "Federation of Industries" }, { name: "Trade Chamber A" }],
        q2_antiCompetitiveConduct: "No incidents reported",
      },
      leadership: {
        q1_publicPolicyAdvocacy: [{ issue: "Environment policy", position: "Support", details: "Participated in consultations" }],
      },
    }
    setData(sample)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `section_c_p7_manual.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportJSON = (text: string) => {
    try {
      const parsed = JSON.parse(text)
      const normalized = normalize(parsed)
      setData((prev) => ({ ...(prev as any), ...(normalized as any) }))
    } catch (e) {
      alert('Invalid JSON')
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-emerald-400">Section C - Principle 7 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential and Leadership indicators for Principle 7 (Public Policy)</CardDescription>
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
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Affiliations</h3>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Input placeholder="Number of affiliations" value={data.essential.q1a_numberOfAffiliations} onChange={(e) => setSimpleField(['essential','q1a_numberOfAffiliations'], e.target.value)} />
            <div className="col-span-2">
              <Label className="text-slate-300">Affiliations (major only)</Label>
              {asArray(data.essential.q1b_affiliationsList).map((a: any, idx: number) => (
                <div key={idx} className="bg-slate-700 p-2 rounded mt-2 flex gap-2 items-center">
                  <Input placeholder="Name" value={String(a.name ?? '')} onChange={(e) => setSimpleField(['essential','q1b_affiliationsList', String(idx),'name'], e.target.value)} />
                  <Button size="sm" variant="destructive" onClick={() => {
                    const arr = [...(asArray(data.essential.q1b_affiliationsList))]
                    arr.splice(idx, 1)
                    setSimpleField(['essential','q1b_affiliationsList'], arr)
                  }}>Remove</Button>
                </div>
              ))}
              <div className="mt-2"><Button size="sm" onClick={() => { const arr = [...(data.essential.q1b_affiliationsList || [])]; arr.push({ name: '' }); setSimpleField(['essential','q1b_affiliationsList'], arr) }}>Add Affiliation</Button></div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Anti-competitive Conduct</h3>
          <Textarea value={data.essential.q2_antiCompetitiveConduct} onChange={(e) => setSimpleField(['essential','q2_antiCompetitiveConduct'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q1: Public Policy Advocacy</h3>
          {asArray(data.leadership.q1_publicPolicyAdvocacy).map((it: any, idx: number) => (
            <div key={idx} className="bg-slate-700 p-3 rounded mt-2">
              <Input placeholder="Issue" value={String(it.issue ?? '')} onChange={(e) => setSimpleField(['leadership','q1_publicPolicyAdvocacy', String(idx),'issue'], e.target.value)} />
              <Input placeholder="Position/Outcome" value={String(it.position ?? '')} onChange={(e) => setSimpleField(['leadership','q1_publicPolicyAdvocacy', String(idx),'position'], e.target.value)} className="mt-2" />
              <Textarea placeholder="Details" value={String(it.details ?? '')} onChange={(e) => setSimpleField(['leadership','q1_publicPolicyAdvocacy', String(idx),'details'], e.target.value)} className="mt-2" />
              <div className="mt-2 flex justify-end"><Button size="sm" variant="destructive" onClick={() => { const arr = [...(asArray(data.leadership.q1_publicPolicyAdvocacy))]; arr.splice(idx, 1); setSimpleField(['leadership','q1_publicPolicyAdvocacy'], arr) }}>Remove</Button></div>
            </div>
          ))}
          <div className="mt-2"><Button size="sm" onClick={() => { const arr = [...(data.leadership.q1_publicPolicyAdvocacy || [])]; arr.push({ issue: '', position: '', details: '' }); setSimpleField(['leadership','q1_publicPolicyAdvocacy'], arr) }}>Add Advocacy Entry</Button></div>
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
