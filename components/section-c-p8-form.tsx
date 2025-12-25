"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface YearPair { currentFY: string; previousFY: string }

interface InputMaterialSourcing {
  msmes: YearPair
  withinDistrict: YearPair
  neighboringDistricts: YearPair
}

interface JobCreation {
  rural: YearPair
  semiurban: YearPair
  urban: YearPair
  metropolitan: YearPair
}

interface CSRProject { title: string; location: string; beneficiaries: string; spendInr: string }

interface CSRBeneficiary { project: string; beneficiaries: string; percentVulnerable: string }

interface SectionCP8ManualData {
  essential: {
    q1_socialImpactAssessments: string
    q2_rehabilitationResettlement: string
    q3_communityGrievanceMechanism: string
    q3a_preferentialProcurement: string
    q3b_vulnerableGroups: string
    q3c_procurementPercentage: string
    q4_inputMaterialSourcing: InputMaterialSourcing
    q5_jobCreation: JobCreation
  }
  leadership: {
    q1_negativeImpactMitigation: string
    q2_csrProjects: CSRProject[]
    q3a_preferentialProcurement: string
    q3b_vulnerableGroups: string
    q3c_procurementPercentage: string
    q4_intellectualProperty: string
    q5_ipDisputes: string
    q6_csrBeneficiaries: CSRBeneficiary[]
  }
} 

interface SectionCP8FormProps {
  onDataChange?: (data: SectionCP8ManualData) => void
  initialData?: Partial<SectionCP8ManualData>
}

export function SectionCP8Form({ onDataChange, initialData }: SectionCP8FormProps) {
  const defaultData: SectionCP8ManualData = {
    essential: {
      q1_socialImpactAssessments: "",
      q2_rehabilitationResettlement: "",
      q3_communityGrievanceMechanism: "",
      q3a_preferentialProcurement: "No",
      q3b_vulnerableGroups: "Not Applicable",
      q3c_procurementPercentage: "Not Applicable",
      q4_inputMaterialSourcing: { msmes: { currentFY: "", previousFY: "" }, withinDistrict: { currentFY: "", previousFY: "" }, neighboringDistricts: { currentFY: "", previousFY: "" } },
      q5_jobCreation: { rural: { currentFY: "", previousFY: "" }, semiurban: { currentFY: "", previousFY: "" }, urban: { currentFY: "", previousFY: "" }, metropolitan: { currentFY: "", previousFY: "" } },
    },
    leadership: {
      q1_negativeImpactMitigation: "",
      q2_csrProjects: [],
      q3a_preferentialProcurement: "No",
      q3b_vulnerableGroups: "Not Applicable",
      q3c_procurementPercentage: "Not Applicable",
      q4_intellectualProperty: "Nil",
      q5_ipDisputes: "",
      q6_csrBeneficiaries: []
    }
  }

  const asArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : [])

  const normalize = (raw: any) => {
    if (!raw) return raw
    const copy = { ...(raw as any) }
    copy.essential = copy.essential || {}
    copy.leadership = copy.leadership || {}
    copy.leadership.q2_csrProjects = asArray(copy.leadership.q2_csrProjects)
    copy.essential.q4_inputMaterialSourcing = copy.essential.q4_inputMaterialSourcing || { msmes: { currentFY: "", previousFY: "" }, withinDistrict: { currentFY: "", previousFY: "" }, neighboringDistricts: { currentFY: "", previousFY: "" } }
    copy.essential.q5_jobCreation = copy.essential.q5_jobCreation || { rural: { currentFY: "", previousFY: "" }, semiurban: { currentFY: "", previousFY: "" }, urban: { currentFY: "", previousFY: "" }, metropolitan: { currentFY: "", previousFY: "" } }

    // Ensure newly added P8 fields exist with safe defaults
    copy.essential.q3a_preferentialProcurement = typeof copy.essential.q3a_preferentialProcurement === 'undefined' ? 'No' : copy.essential.q3a_preferentialProcurement
    copy.essential.q3b_vulnerableGroups = typeof copy.essential.q3b_vulnerableGroups === 'undefined' ? 'Not Applicable' : copy.essential.q3b_vulnerableGroups
    copy.essential.q3c_procurementPercentage = typeof copy.essential.q3c_procurementPercentage === 'undefined' ? 'Not Applicable' : copy.essential.q3c_procurementPercentage

    // Ensure leadership CSR beneficiaries exists as an array
    copy.leadership.q6_csrBeneficiaries = Array.isArray(copy.leadership.q6_csrBeneficiaries) ? copy.leadership.q6_csrBeneficiaries : (copy.leadership.q6_csrBeneficiaries ? copy.leadership.q6_csrBeneficiaries : [])

    // Mirror essential fields into leadership so downstream mapping/preview find them (only procurement fields)
    copy.leadership.q3a_preferentialProcurement = typeof copy.leadership.q3a_preferentialProcurement === 'undefined' ? copy.essential.q3a_preferentialProcurement : copy.leadership.q3a_preferentialProcurement
    copy.leadership.q3b_vulnerableGroups = typeof copy.leadership.q3b_vulnerableGroups === 'undefined' ? copy.essential.q3b_vulnerableGroups : copy.leadership.q3b_vulnerableGroups
    copy.leadership.q3c_procurementPercentage = typeof copy.leadership.q3c_procurementPercentage === 'undefined' ? copy.essential.q3c_procurementPercentage : copy.leadership.q3c_procurementPercentage

    return copy
  }

  const [data, setData] = useState<SectionCP8ManualData>(() => normalize({ ...(defaultData as any), ...(initialData as any) }))

  useEffect(() => {
    if (!initialData) return
    setData((prev) => {
      const merged = normalize({ ...(prev as any), ...(initialData as any) })
      try { if (JSON.stringify(merged) === JSON.stringify(prev)) return prev } catch (e) {}
      return merged
    })
  }, [initialData])

  useEffect(() => { onDataChange && onDataChange(data) }, [data, onDataChange])

  // Keep leadership copies for P8 mapping in sync with essential fields (procurement related)
  useEffect(() => {
    setData((prev) => {
      const copy: any = { ...(prev as any) }
      const keys = ['q3a_preferentialProcurement','q3b_vulnerableGroups','q3c_procurementPercentage']
      let changed = false
      for (const k of keys) {
        const essentialVal = (prev as any).essential[k]
        const leadershipVal = (prev as any).leadership?.[k]
        if (typeof leadershipVal === 'undefined' || leadershipVal !== essentialVal) {
          copy.leadership = { ...(copy.leadership || {}), [k]: essentialVal }
          changed = true
        }
      }
      return changed ? copy : prev
    })
  }, [data.essential])

  // Also sync leadership edits back into essential so users can edit either place (procurement related)
  useEffect(() => {
    setData((prev) => {
      const copy: any = { ...(prev as any) }
      const keys = ['q3a_preferentialProcurement','q3b_vulnerableGroups','q3c_procurementPercentage']
      let changed = false
      for (const k of keys) {
        const leadershipVal = (prev as any).leadership?.[k]
        const essentialVal = (prev as any).essential?.[k]
        if (typeof leadershipVal !== 'undefined' && leadershipVal !== essentialVal) {
          copy.essential = { ...(copy.essential || {}), [k]: leadershipVal }
          changed = true
        }
      }
      return changed ? copy : prev
    })
  }, [data.leadership])

  const setSimpleField = (path: string[], value: any) => {
    const updated: any = { ...data }
    let cursor: any = updated
    for (let i = 0; i < path.length - 1; i++) cursor = cursor[path[i]] = { ...(cursor[path[i]] || {}) }
    cursor[path[path.length - 1]] = value
    setData(updated)
  }

  const handleAddCSR = () => { const arr = [...(data.leadership.q2_csrProjects || [])]; arr.push({ title: '', location: '', beneficiaries: '', spendInr: '' }); setSimpleField(['leadership','q2_csrProjects'], arr) }

  const handleAddBeneficiary = () => { const arr = [...(data.leadership.q6_csrBeneficiaries || [])]; arr.push({ project: '', beneficiaries: '', percentVulnerable: '' }); setSimpleField(['leadership','q6_csrBeneficiaries'], arr) }

  const handleAutoFill = () => {
    const sample: SectionCP8ManualData = {
      essential: {
        q1_socialImpactAssessments: "Social impact assessment performed for expansion project.",
        q2_rehabilitationResettlement: "Resettlement plan in place for affected families.",
        q3_communityGrievanceMechanism: "Grievance mechanism established with response time 30 days.",
        q3a_preferentialProcurement: "No",
        q3b_vulnerableGroups: "Not Applicable",
        q3c_procurementPercentage: "Not Applicable",
        q4_inputMaterialSourcing: { msmes: { currentFY: "120", previousFY: "100" }, withinDistrict: { currentFY: "60", previousFY: "55" }, neighboringDistricts: { currentFY: "30", previousFY: "25" } },
        q5_jobCreation: { rural: { currentFY: "400", previousFY: "350" }, semiurban: { currentFY: "200", previousFY: "150" }, urban: { currentFY: "100", previousFY: "90" }, metropolitan: { currentFY: "50", previousFY: "30" } },
      },
      leadership: {
        q1_negativeImpactMitigation: "Implemented mitigation measures including rainy-season scheduling and erosion control.",
        q2_csrProjects: [{ title: 'Rural Water Project', location: 'Village A', beneficiaries: '500', spendInr: '1000000' }],
        q3a_preferentialProcurement: "No",
        q3b_vulnerableGroups: "Not Applicable",
        q3c_procurementPercentage: "Not Applicable",
        q4_intellectualProperty: "Nil",
        q5_ipDisputes: "None",
        q6_csrBeneficiaries: [
          { project: 'Project NANDINI: An awareness programme on Menstrual Hygiene Management (MHM)', beneficiaries: '30000', percentVulnerable: '100%' },
          { project: 'Provided artificial limbs to disabled people', beneficiaries: '44', percentVulnerable: '100%' }
        ]
      }
    }
    setData(sample)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `section_c_p8_manual.json`
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
            <CardTitle className="text-emerald-400">Section C - Principle 8 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential and Leadership indicators for Principle 8 (Social Impact)</CardDescription>
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
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Social Impact Assessments</h3>
          <Textarea placeholder="Describe SIAs performed" value={data.essential.q1_socialImpactAssessments} onChange={(e) => setSimpleField(['essential','q1_socialImpactAssessments'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Rehabilitation & Resettlement</h3>
          <Textarea placeholder="R&R details" value={data.essential.q2_rehabilitationResettlement} onChange={(e) => setSimpleField(['essential','q2_rehabilitationResettlement'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Community Grievance Mechanism</h3>
          <Textarea placeholder="Grievance mechanism details" value={data.essential.q3_communityGrievanceMechanism} onChange={(e) => setSimpleField(['essential','q3_communityGrievanceMechanism'], e.target.value)} className="min-h-20" />

          <div className="mt-3 grid grid-cols-3 gap-3">
            <div>
              <Label className="text-slate-300">Preferential Procurement (Q3a)</Label>
              <Input placeholder="Yes / No" value={data.essential.q3a_preferentialProcurement} onChange={(e) => setSimpleField(['essential','q3a_preferentialProcurement'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Vulnerable Groups (Q3b)</Label>
              <Input placeholder="e.g., Smallholders / Not Applicable" value={data.essential.q3b_vulnerableGroups} onChange={(e) => setSimpleField(['essential','q3b_vulnerableGroups'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Procurement % (Q3c)</Label>
              <Input placeholder="e.g., 30% or Not Applicable" value={data.essential.q3c_procurementPercentage} onChange={(e) => setSimpleField(['essential','q3c_procurementPercentage'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>



        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q4: Input Material Sourcing (by geography)</h3>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">MSMEs</Label>
              <Input placeholder="Current FY" value={data.essential.q4_inputMaterialSourcing.msmes.currentFY} onChange={(e) => setSimpleField(['essential','q4_inputMaterialSourcing','msmes','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q4_inputMaterialSourcing.msmes.previousFY} onChange={(e) => setSimpleField(['essential','q4_inputMaterialSourcing','msmes','previousFY'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Within District</Label>
              <Input placeholder="Current FY" value={data.essential.q4_inputMaterialSourcing.withinDistrict.currentFY} onChange={(e) => setSimpleField(['essential','q4_inputMaterialSourcing','withinDistrict','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q4_inputMaterialSourcing.withinDistrict.previousFY} onChange={(e) => setSimpleField(['essential','q4_inputMaterialSourcing','withinDistrict','previousFY'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Neighboring Districts</Label>
              <Input placeholder="Current FY" value={data.essential.q4_inputMaterialSourcing.neighboringDistricts.currentFY} onChange={(e) => setSimpleField(['essential','q4_inputMaterialSourcing','neighboringDistricts','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q4_inputMaterialSourcing.neighboringDistricts.previousFY} onChange={(e) => setSimpleField(['essential','q4_inputMaterialSourcing','neighboringDistricts','previousFY'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q5: Job creation (by area)</h3>
          <div className="grid grid-cols-4 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Rural</Label>
              <Input placeholder="Current FY" value={data.essential.q5_jobCreation.rural.currentFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','rural','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q5_jobCreation.rural.previousFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','rural','previousFY'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Semi-urban</Label>
              <Input placeholder="Current FY" value={data.essential.q5_jobCreation.semiurban.currentFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','semiurban','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q5_jobCreation.semiurban.previousFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','semiurban','previousFY'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Urban</Label>
              <Input placeholder="Current FY" value={data.essential.q5_jobCreation.urban.currentFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','urban','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q5_jobCreation.urban.previousFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','urban','previousFY'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Metropolitan</Label>
              <Input placeholder="Current FY" value={data.essential.q5_jobCreation.metropolitan.currentFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','metropolitan','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q5_jobCreation.metropolitan.previousFY} onChange={(e) => setSimpleField(['essential','q5_jobCreation','metropolitan','previousFY'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership</h3>
          <div>
            <Label className="text-slate-300">Negative impact mitigation (Q1)</Label>
            <Textarea placeholder="Mitigation measures" value={data.leadership.q1_negativeImpactMitigation} onChange={(e) => setSimpleField(['leadership','q1_negativeImpactMitigation'], e.target.value)} className="min-h-20 mt-2" />
          </div>

          <div className="mt-3">
            <Label className="text-slate-300">CSR Projects (Q2)</Label>
            {asArray(data.leadership.q2_csrProjects).map((p: any, idx: number) => (
              <div key={idx} className="bg-slate-700 p-3 rounded mt-2">
                <Input placeholder="Title" value={String(p.title ?? '')} onChange={(e) => setSimpleField(['leadership','q2_csrProjects', String(idx),'title'], e.target.value)} />
                <Input placeholder="Location" value={String(p.location ?? '')} onChange={(e) => setSimpleField(['leadership','q2_csrProjects', String(idx),'location'], e.target.value)} className="mt-2" />
                <Input placeholder="Beneficiaries" value={String(p.beneficiaries ?? '')} onChange={(e) => setSimpleField(['leadership','q2_csrProjects', String(idx),'beneficiaries'], e.target.value)} className="mt-2" />
                <Input placeholder="Spend (INR)" value={String(p.spendInr ?? '')} onChange={(e) => setSimpleField(['leadership','q2_csrProjects', String(idx),'spendInr'], e.target.value)} className="mt-2" />
                <div className="mt-2 flex justify-end"><Button size="sm" variant="destructive" onClick={() => { const arr = [...(asArray(data.leadership.q2_csrProjects))]; arr.splice(idx, 1); setSimpleField(['leadership','q2_csrProjects'], arr) }}>Remove</Button></div>
              </div>
            ))}
            <div className="mt-2"><Button size="sm" onClick={() => handleAddCSR()}>Add CSR Project</Button></div>
            <div className="mt-4 p-3 bg-slate-700 rounded">
              <h4 className="text-sm font-semibold text-emerald-400">Leadership - Other indicators (Q3a–Q6)</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-300">Preferential Procurement (Q3a)</Label>
                  <Input placeholder="Yes / No" value={String(data.leadership.q3a_preferentialProcurement ?? '')} onChange={(e) => setSimpleField(['leadership','q3a_preferentialProcurement'], e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Vulnerable Groups (Q3b)</Label>
                  <Input placeholder="e.g., Smallholders" value={String(data.leadership.q3b_vulnerableGroups ?? '')} onChange={(e) => setSimpleField(['leadership','q3b_vulnerableGroups'], e.target.value)} className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-300">Procurement % (Q3c)</Label>
                  <Input placeholder="e.g., 30% or Not Applicable" value={String(data.leadership.q3c_procurementPercentage ?? '')} onChange={(e) => setSimpleField(['leadership','q3c_procurementPercentage'], e.target.value)} className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-300">Intellectual Property (Q4)</Label>
                  <Input placeholder="IP summary" value={String(data.leadership.q4_intellectualProperty ?? '')} onChange={(e) => setSimpleField(['leadership','q4_intellectualProperty'], e.target.value)} className="mt-1" />
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-300">IP Disputes (Q5)</Label>
                  <Textarea placeholder="IP disputes details" value={String(data.leadership.q5_ipDisputes ?? '')} onChange={(e) => setSimpleField(['leadership','q5_ipDisputes'], e.target.value)} className="min-h-12 mt-1" />
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-300">CSR Beneficiaries (Q6)</Label>
                  {asArray(data.leadership.q6_csrBeneficiaries).map((b: any, idx: number) => (
                    <div key={idx} className="bg-slate-700 p-3 rounded mt-2">
                      <Input placeholder="Project" value={String(b.project ?? '')} onChange={(e) => setSimpleField(['leadership','q6_csrBeneficiaries', String(idx),'project'], e.target.value)} />
                      <Input placeholder="No. of beneficiaries" value={String(b.beneficiaries ?? '')} onChange={(e) => setSimpleField(['leadership','q6_csrBeneficiaries', String(idx),'beneficiaries'], e.target.value)} className="mt-2" />
                      <Input placeholder="% of beneficiaries from vulnerable groups" value={String(b.percentVulnerable ?? '')} onChange={(e) => setSimpleField(['leadership','q6_csrBeneficiaries', String(idx),'percentVulnerable'], e.target.value)} className="mt-2" />
                      <div className="mt-2 flex justify-end"><Button size="sm" variant="destructive" onClick={() => { const arr = [...(asArray(data.leadership.q6_csrBeneficiaries) || [])]; arr.splice(idx, 1); setSimpleField(['leadership','q6_csrBeneficiaries'], arr) }}>Remove</Button></div>
                    </div>
                  ))}
                  <div className="mt-2"><Button size="sm" onClick={() => handleAddBeneficiary()}>Add Beneficiary</Button></div>
                </div> 
              </div>          </div>
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
