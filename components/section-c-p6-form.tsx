"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface YearPair { currentFY: string; previousFY: string }

interface EnergyCategory { currentFY: string; previousFY: string }

interface WaterWithdrawal { surfaceWater: YearPair; groundwater: YearPair; thirdPartyWater: YearPair; seawaterDesalinated: YearPair; others: YearPair; total: YearPair }

interface WaterDetails { withdrawal: WaterWithdrawal; consumption: { total: YearPair }; waterIntensityPerTurnover: YearPair; waterIntensityPPP: YearPair; waterIntensityPhysicalOutput: string; externalAssessment: string }

interface AirEmissions { nox: YearPair & { unit?: string }; sox: YearPair & { unit?: string }; pm: YearPair & { unit?: string }; pop?: any; voc?: any; hap?: any; others?: any; externalAssessment?: string }

interface GHG { scope1: any; scope2: any; totalScope1And2: any; scope1And2IntensityPerTurnover: any; scope1And2IntensityPhysicalOutput: string; externalAssessment?: string }

interface WasteManagement { plasticWaste: YearPair; eWaste: YearPair; bioMedicalWaste: YearPair; constructionDemolitionWaste: YearPair; batteryWaste: YearPair; radioactiveWaste: YearPair; otherHazardousWaste: YearPair; otherNonHazardousWaste: YearPair; totalWaste: YearPair; recycled: YearPair; reused: YearPair; otherRecovery: YearPair; totalRecovered: YearPair; incineration: YearPair; landfilling: YearPair; otherDisposal: YearPair; totalDisposed: YearPair; wasteIntensityPerTurnover: YearPair; wasteIntensityPPP: YearPair; wasteIntensityPhysicalOutput: string; externalAssessment?: string }

interface SectionCP6ManualData {
  essential: {
    q1_energyConsumption: { renewable: { electricity: YearPair; fuel: YearPair; otherSources: YearPair; total: YearPair }; nonRenewable: { electricity: YearPair; fuel: YearPair; otherSources: YearPair; total: YearPair }; totalEnergyConsumed: YearPair; energyIntensityPerTurnover: YearPair; energyIntensityPPP: YearPair; energyIntensityPhysicalOutput: string; externalAssessment: string }
    q2_patScheme: string
    q2_patFacilities?: any
    q3_waterDetails: WaterDetails
    q4_waterDischarge: any
    q5_zeroLiquidDischarge: string
    q6_airEmissions: AirEmissions
    q7_ghgEmissions: GHG
    q8_ghgReductionProjects: string
    q9_wasteManagement: WasteManagement
    q10_wastePractices: string
    q11_ecologicallySensitiveAreas: string
    q11_ecologicallySensitiveDetails: string
    q12_environmentalImpactAssessments: string
    q13_environmentalCompliance: string
    q13_nonCompliances: string
  }
  leadership: {
    q1_waterStressAreas: any
    q2_scope3Emissions: string
    q2_scope3EmissionsPerTurnover: string
    q2_scope3IntensityPhysicalOutput: string
    q2_externalAssessment: string
    q3_biodiversityImpact: string
    q4_resourceEfficiencyInitiatives: any
    q5_businessContinuityPlan: string
    q6_valueChainEnvironmentalImpact: string
    q7_valueChainPartnersAssessed: string
  }
}

interface SectionCP6FormProps {
  onDataChange?: (data: SectionCP6ManualData) => void
  initialData?: Partial<SectionCP6ManualData>
}

export function SectionCP6Form({ onDataChange, initialData }: SectionCP6FormProps) {
  const defaultData: SectionCP6ManualData = {
    essential: {
      q1_energyConsumption: {
        renewable: { electricity: { currentFY: "", previousFY: "" }, fuel: { currentFY: "", previousFY: "" }, otherSources: { currentFY: "", previousFY: "" }, total: { currentFY: "", previousFY: "" } },
        nonRenewable: { electricity: { currentFY: "", previousFY: "" }, fuel: { currentFY: "", previousFY: "" }, otherSources: { currentFY: "", previousFY: "" }, total: { currentFY: "", previousFY: "" } },
        totalEnergyConsumed: { currentFY: "", previousFY: "" }, energyIntensityPerTurnover: { currentFY: "", previousFY: "" }, energyIntensityPPP: { currentFY: "", previousFY: "" }, energyIntensityPhysicalOutput: "", externalAssessment: ""
      },
      q2_patScheme: "",
      q2_patFacilities: [],
      q3_waterDetails: { withdrawal: { surfaceWater: { currentFY: "", previousFY: "" }, groundwater: { currentFY: "", previousFY: "" }, thirdPartyWater: { currentFY: "", previousFY: "" }, seawaterDesalinated: { currentFY: "", previousFY: "" }, others: { currentFY: "", previousFY: "" }, total: { currentFY: "", previousFY: "" } }, consumption: { total: { currentFY: "", previousFY: "" } }, waterIntensityPerTurnover: { currentFY: "", previousFY: "" }, waterIntensityPPP: { currentFY: "", previousFY: "" }, waterIntensityPhysicalOutput: "", externalAssessment: "" },
      q4_waterDischarge: {},
      q5_zeroLiquidDischarge: "",
      q6_airEmissions: { nox: { unit: "MT", currentFY: "", previousFY: "" }, sox: { unit: "MT", currentFY: "", previousFY: "" }, pm: { unit: "MT", currentFY: "", previousFY: "" }, pop: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, voc: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, hap: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, others: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, externalAssessment: "" },
      q7_ghgEmissions: { scope1: { unit: "Metric tonnes of CO₂ equivalent", currentFY: "", previousFY: "" }, scope2: { unit: "Metric tonnes of CO₂ equivalent", currentFY: "", previousFY: "" }, totalScope1And2: { unit: "Metric tonnes of CO₂ equivalent per rupee of turnover", currentFY: "", previousFY: "" }, scope1And2IntensityPerTurnover: { unit: "Metric tonnes of CO₂ per USD", currentFY: "", previousFY: "" }, scope1And2IntensityPhysicalOutput: "", externalAssessment: "" },
      q8_ghgReductionProjects: "",
      q9_wasteManagement: { plasticWaste: { currentFY: "", previousFY: "" }, eWaste: { currentFY: "", previousFY: "" }, bioMedicalWaste: { currentFY: "", previousFY: "" }, constructionDemolitionWaste: { currentFY: "", previousFY: "" }, batteryWaste: { currentFY: "", previousFY: "" }, radioactiveWaste: { currentFY: "", previousFY: "" }, otherHazardousWaste: { currentFY: "", previousFY: "" }, otherNonHazardousWaste: { currentFY: "", previousFY: "" }, totalWaste: { currentFY: "", previousFY: "" }, recycled: { currentFY: "", previousFY: "" }, reused: { currentFY: "", previousFY: "" }, otherRecovery: { currentFY: "", previousFY: "" }, totalRecovered: { currentFY: "", previousFY: "" }, incineration: { currentFY: "", previousFY: "" }, landfilling: { currentFY: "", previousFY: "" }, otherDisposal: { currentFY: "", previousFY: "" }, totalDisposed: { currentFY: "", previousFY: "" }, wasteIntensityPerTurnover: { currentFY: "", previousFY: "" }, wasteIntensityPPP: { currentFY: "", previousFY: "" }, wasteIntensityPhysicalOutput: "", externalAssessment: "" },
      q10_wastePractices: "",
      q11_ecologicallySensitiveAreas: "",
      q11_ecologicallySensitiveDetails: "",
      q12_environmentalImpactAssessments: "",
      q13_environmentalCompliance: "",
      q13_nonCompliances: "",
    },
    leadership: {
      q1_waterStressAreas: [],
      q2_scope3Emissions: "",
      q2_scope3EmissionsPerTurnover: "",
      q2_scope3IntensityPhysicalOutput: "",
      q2_externalAssessment: "",
      q3_biodiversityImpact: "",
      q4_resourceEfficiencyInitiatives: [],
      q5_businessContinuityPlan: "",
      q6_valueChainEnvironmentalImpact: "",
      q7_valueChainPartnersAssessed: "",
    }
  }

  const asArray = (v: any) => (Array.isArray(v) ? v : v ? [v] : [])

  const normalize = (raw: any) => {
    if (!raw) return raw
    const copy = { ...(raw as any) }
    // Ensure essential nested objects exist
    copy.essential = copy.essential || {}
    copy.leadership = copy.leadership || {}

    // q2_patFacilities should be an array
    copy.essential.q2_patFacilities = asArray(copy.essential.q2_patFacilities)

    // leadership arrays
    copy.leadership.q1_waterStressAreas = asArray(copy.leadership.q1_waterStressAreas)
    copy.leadership.q4_resourceEfficiencyInitiatives = asArray(copy.leadership.q4_resourceEfficiencyInitiatives)

    return copy
  }

  const [data, setData] = useState<SectionCP6ManualData>(() => normalize({ ...(defaultData as any), ...(initialData as any) }))

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
    const sample: SectionCP6ManualData = {
      essential: {
        q1_energyConsumption: { renewable: { electricity: { currentFY: "0.105", previousFY: "0.09" }, fuel: { currentFY: "1.765", previousFY: "0" }, otherSources: { currentFY: "0.000", previousFY: "0" }, total: { currentFY: "1.870", previousFY: "0.09" } }, nonRenewable: { electricity: { currentFY: "3.744", previousFY: "3.32" }, fuel: { currentFY: "7.314", previousFY: "4.95" }, otherSources: { currentFY: "0.000", previousFY: "0" }, total: { currentFY: "11.058", previousFY: "8.27" } }, totalEnergyConsumed: { currentFY: "12.928", previousFY: "8.36" }, energyIntensityPerTurnover: { currentFY: "0.00139", previousFY: "0.00084" }, energyIntensityPPP: { currentFY: "0.0311", previousFY: "0.0191" }, energyIntensityPhysicalOutput: "-", externalAssessment: "No" },
      q2_patScheme: "Yes, we have 8 facilities identified as designated consumers (DCs)",
      q2_patFacilities: [],
      q3_waterDetails: { withdrawal: { surfaceWater: { currentFY: "2349107", previousFY: "2198355" }, groundwater: { currentFY: "7681657", previousFY: "7143308" }, thirdPartyWater: { currentFY: "-", previousFY: "-" }, seawaterDesalinated: { currentFY: "-", previousFY: "-" }, others: { currentFY: "-", previousFY: "-" }, total: { currentFY: "10040764", previousFY: "9341663" } }, consumption: { total: { currentFY: "5695455.25", previousFY: "9341663" } }, waterIntensityPerTurnover: { currentFY: "612.50", previousFY: "949.27" }, waterIntensityPPP: { currentFY: "13720.35", previousFY: "21425.34" }, waterIntensityPhysicalOutput: "-", externalAssessment: "No" },
      q4_waterDischarge: {},
      q5_zeroLiquidDischarge: "Yes",
      q6_airEmissions: { nox: { unit: "MT", currentFY: "295.9", previousFY: "201" }, sox: { unit: "MT", currentFY: "432.5", previousFY: "332" }, pm: { unit: "MT", currentFY: "78.32", previousFY: "52" }, pop: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, voc: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, hap: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, others: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" }, externalAssessment: "No" },
      q7_ghgEmissions: { scope1: { unit: "Metric tonnes of CO₂ equivalent", currentFY: "282924.00", previousFY: "323221.74" }, scope2: { unit: "Metric tonnes of CO₂ equivalent", currentFY: "857272.48", previousFY: "727830.980" }, totalScope1And2: { unit: "Metric tonnes of CO₂ equivalent per rupee of turnover", currentFY: "122.619", previousFY: "106.806" }, scope1And2IntensityPerTurnover: { unit: "Metric tonnes of CO₂ per USD", currentFY: "2746.73", previousFY: "2410.61" }, scope1And2IntensityPhysicalOutput: "-", externalAssessment: "FY 23-24 GHG Emission data under Third party assurance." },
      q8_ghgReductionProjects: "Multiple initiatives: biomass, solar, sludge dryers, recycling",
      q9_wasteManagement: { plasticWaste: { currentFY: "1264.35", previousFY: "1290.411" }, eWaste: { currentFY: "28.71", previousFY: "35.794" }, bioMedicalWaste: { currentFY: "2.21", previousFY: "0.1765" }, constructionDemolitionWaste: { currentFY: "453.60", previousFY: "61.22" }, batteryWaste: { currentFY: "28.01", previousFY: "16.856" }, radioactiveWaste: { currentFY: "0", previousFY: "0" }, otherHazardousWaste: { currentFY: "12459.58", previousFY: "25060.653" }, otherNonHazardousWaste: { currentFY: "718741", previousFY: "15928.45" }, totalWaste: { currentFY: "21423.87", previousFY: "42383.56" }, recycled: { currentFY: "8139.15", previousFY: "28313.04" }, reused: { currentFY: "1256.12", previousFY: "5785.771" }, otherRecovery: { currentFY: "0", previousFY: "0" }, totalRecovered: { currentFY: "9395.27", previousFY: "34098.811" }, incineration: { currentFY: "63.14", previousFY: "0" }, landfilling: { currentFY: "11965.46", previousFY: "14492.45" }, otherDisposal: { currentFY: "0", previousFY: "0" }, totalDisposed: { currentFY: "12028.60", previousFY: "14492.45" }, wasteIntensityPerTurnover: { currentFY: "2.304", previousFY: "4.308" }, wasteIntensityPPP: { currentFY: "49.136", previousFY: "11705" }, wasteIntensityPhysicalOutput: "-", externalAssessment: "No" },
      q10_wastePractices: "Active waste management practices",
      q11_ecologicallySensitiveAreas: "Not Applicable",
      q11_ecologicallySensitiveDetails: "Not Applicable",
      q12_environmentalImpactAssessments: "Not Applicable",
      q13_environmentalCompliance: "Yes",
      q13_nonCompliances: "Not Applicable",
    },
    leadership: {
      q1_waterStressAreas: [{ name: "Ludhiana & Malerkotla", natureOfOperations: "Spinning Units", withdrawal: { total: { currentFY: "1067739", previousFY: "1287786" } }, consumption: { total: { currentFY: "1067739", previousFY: "1287786" } } }],
      q2_scope3Emissions: "-",
      q2_scope3EmissionsPerTurnover: "-",
      q2_scope3IntensityPhysicalOutput: "-",
      q2_externalAssessment: "No",
      q3_biodiversityImpact: "Not Applicable",
      q4_resourceEfficiencyInitiatives: [],
      q5_businessContinuityPlan: "",
      q6_valueChainEnvironmentalImpact: "",
      q7_valueChainPartnersAssessed: "Some value chain partners assessed",
    }
    }
    setData(sample)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `section_c_p6_manual.json`
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
            <CardTitle className="text-emerald-400">Section C - Principle 6 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential and Leadership indicators for Principle 6 (Environment & Energy)</CardDescription>
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
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Energy Consumption</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <Label className="text-slate-200">Renewable - Electricity</Label>
              <Input placeholder="Current FY" value={data.essential.q1_energyConsumption.renewable.electricity.currentFY} onChange={(e) => setSimpleField(['essential','q1_energyConsumption','renewable','electricity','currentFY'], e.target.value)} className="mt-2" />
              <Input placeholder="Previous FY" value={data.essential.q1_energyConsumption.renewable.electricity.previousFY} onChange={(e) => setSimpleField(['essential','q1_energyConsumption','renewable','electricity','previousFY'], e.target.value)} className="mt-2" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <Label className="text-slate-200">Non-Renewable - Electricity</Label>
              <Input placeholder="Current FY" value={data.essential.q1_energyConsumption.nonRenewable.electricity.currentFY} onChange={(e) => setSimpleField(['essential','q1_energyConsumption','nonRenewable','electricity','currentFY'], e.target.value)} className="mt-2" />
              <Input placeholder="Previous FY" value={data.essential.q1_energyConsumption.nonRenewable.electricity.previousFY} onChange={(e) => setSimpleField(['essential','q1_energyConsumption','nonRenewable','electricity','previousFY'], e.target.value)} className="mt-2" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: PAT Scheme</h3>
          <Textarea value={data.essential.q2_patScheme} onChange={(e) => setSimpleField(['essential','q2_patScheme'], e.target.value)} className="min-h-20" />

          <div className="mt-3">
            <Label className="text-slate-300">PAT Facilities</Label>
            {asArray(data.essential.q2_patFacilities).map((fac: any, idx: number) => (
              <div key={idx} className="bg-slate-700 p-3 rounded mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Name" value={String(fac.name ?? '') as any} onChange={(e) => setSimpleField(['essential','q2_patFacilities', String(idx),'name'], e.target.value)} />
                  <Input placeholder="Consumer Reg" value={String(fac.consumerReg ?? '') as any} onChange={(e) => setSimpleField(['essential','q2_patFacilities', String(idx),'consumerReg'], e.target.value)} />
                  <Input placeholder="Baseline SEC" value={String(fac.baselineSEC ?? '') as any} onChange={(e) => setSimpleField(['essential','q2_patFacilities', String(idx),'baselineSEC'], e.target.value)} />
                  <Input placeholder="Target SEC" value={String(fac.targetSEC ?? '') as any} onChange={(e) => setSimpleField(['essential','q2_patFacilities', String(idx),'targetSEC'], e.target.value)} />
                  <Input placeholder="SEC Achieved" value={String(fac.secAchieved ?? '') as any} onChange={(e) => setSimpleField(['essential','q2_patFacilities', String(idx),'secAchieved'], e.target.value)} />
                </div>
                <div className="mt-2 flex gap-2 justify-end">
                  <Button size="sm" variant="destructive" onClick={() => {
                    const arr = [...(asArray(data.essential.q2_patFacilities))]
                    arr.splice(idx, 1)
                    setSimpleField(['essential','q2_patFacilities'], arr)
                  }}>Remove</Button>
                </div>
              </div>
            ))}

            <div className="mt-2">
              <Button size="sm" onClick={() => {
                const arr = [...(data.essential.q2_patFacilities || [])]
                arr.push({ name: '', consumerReg: '', baselineSEC: '', targetSEC: '', secAchieved: '' })
                setSimpleField(['essential','q2_patFacilities'], arr)
              }}>Add PAT Facility</Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Water Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Input placeholder="Withdrawal - Surface Water (currentFY)" value={data.essential.q3_waterDetails.withdrawal.surfaceWater.currentFY} onChange={(e) => setSimpleField(['essential','q3_waterDetails','withdrawal','surfaceWater','currentFY'], e.target.value)} />
            <Input placeholder="Withdrawal - Surface Water (previousFY)" value={data.essential.q3_waterDetails.withdrawal.surfaceWater.previousFY} onChange={(e) => setSimpleField(['essential','q3_waterDetails','withdrawal','surfaceWater','previousFY'], e.target.value)} />
            <Input placeholder="Total Consumption (currentFY)" value={data.essential.q3_waterDetails.consumption.total.currentFY} onChange={(e) => setSimpleField(['essential','q3_waterDetails','consumption','total','currentFY'], e.target.value)} />
            <Input placeholder="Total Consumption (previousFY)" value={data.essential.q3_waterDetails.consumption.total.previousFY} onChange={(e) => setSimpleField(['essential','q3_waterDetails','consumption','total','previousFY'], e.target.value)} />
          </div>

          <div className="mt-4 bg-slate-700 p-3 rounded">
            <h4 className="text-slate-200 font-medium">Q4: Water Discharge (noTreatment / withTreatment)</h4>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {(['surfaceWater','groundwater','seawater','thirdParties','others'] as const).map((loc) => (
                <div key={loc} className="bg-slate-800 p-2 rounded">
                  <Label className="text-slate-300">{loc}</Label>
                  <Input placeholder="NoTreatment - currentFY" value={(data.essential.q4_waterDischarge as any)[loc]?.noTreatment?.currentFY || ''} onChange={(e) => setSimpleField(['essential','q4_waterDischarge',loc,'noTreatment','currentFY'], e.target.value)} className="mt-1" />
                  <Input placeholder="NoTreatment - previousFY" value={(data.essential.q4_waterDischarge as any)[loc]?.noTreatment?.previousFY || ''} onChange={(e) => setSimpleField(['essential','q4_waterDischarge',loc,'noTreatment','previousFY'], e.target.value)} className="mt-1" />
                  <Input placeholder="WithTreatment - currentFY" value={(data.essential.q4_waterDischarge as any)[loc]?.withTreatment?.currentFY || ''} onChange={(e) => setSimpleField(['essential','q4_waterDischarge',loc,'withTreatment','currentFY'], e.target.value)} className="mt-1" />
                  <Input placeholder="WithTreatment - previousFY" value={(data.essential.q4_waterDischarge as any)[loc]?.withTreatment?.previousFY || ''} onChange={(e) => setSimpleField(['essential','q4_waterDischarge',loc,'withTreatment','previousFY'], e.target.value)} className="mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q5: Zero Liquid Discharge</h3>
          <Textarea value={data.essential.q5_zeroLiquidDischarge} onChange={(e) => setSimpleField(['essential','q5_zeroLiquidDischarge'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q6: Air Emissions</h3>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {(['nox','sox','pm','pop','voc','hap','others'] as const).map((key) => (
              <div key={key} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{key.toUpperCase()}</Label>
                <Input placeholder={key.toUpperCase() + ' - unit'} value={(data.essential.q6_airEmissions as any)[key].unit || ''} onChange={(e) => setSimpleField(['essential','q6_airEmissions',key,'unit'], e.target.value)} className="mt-2" />
                <Input placeholder={key.toUpperCase() + ' - currentFY'} value={(data.essential.q6_airEmissions as any)[key].currentFY} onChange={(e) => setSimpleField(['essential','q6_airEmissions',key,'currentFY'], e.target.value)} className="mt-2" />
                <Input placeholder={key.toUpperCase() + ' - previousFY'} value={(data.essential.q6_airEmissions as any)[key].previousFY} onChange={(e) => setSimpleField(['essential','q6_airEmissions',key,'previousFY'], e.target.value)} className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q7: GHG Emissions</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Input placeholder="Scope1 (currentFY)" value={data.essential.q7_ghgEmissions.scope1.currentFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','scope1','currentFY'], e.target.value)} />
            <Input placeholder="Scope1 (previousFY)" value={data.essential.q7_ghgEmissions.scope1.previousFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','scope1','previousFY'], e.target.value)} />
            <Input placeholder="Scope2 (currentFY)" value={data.essential.q7_ghgEmissions.scope2.currentFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','scope2','currentFY'], e.target.value)} />
            <Input placeholder="Scope2 (previousFY)" value={data.essential.q7_ghgEmissions.scope2.previousFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','scope2','previousFY'], e.target.value)} />
            <Input placeholder="Total Scope1+2 (currentFY)" value={data.essential.q7_ghgEmissions.totalScope1And2.currentFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','totalScope1And2','currentFY'], e.target.value)} />
            <Input placeholder="Total Scope1+2 (previousFY)" value={data.essential.q7_ghgEmissions.totalScope1And2.previousFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','totalScope1And2','previousFY'], e.target.value)} />
            <Input placeholder="Intensity per Turnover (currentFY)" value={data.essential.q7_ghgEmissions.scope1And2IntensityPerTurnover.currentFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','scope1And2IntensityPerTurnover','currentFY'], e.target.value)} />
            <Input placeholder="Intensity per Turnover (previousFY)" value={data.essential.q7_ghgEmissions.scope1And2IntensityPerTurnover.previousFY} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','scope1And2IntensityPerTurnover','previousFY'], e.target.value)} />
            <Input placeholder="External Assessment" value={data.essential.q7_ghgEmissions.externalAssessment} onChange={(e) => setSimpleField(['essential','q7_ghgEmissions','externalAssessment'], e.target.value)} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q8: GHG Reduction Projects</h3>
          <Textarea value={data.essential.q8_ghgReductionProjects} onChange={(e) => setSimpleField(['essential','q8_ghgReductionProjects'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q9: Waste Management</h3>

          <div className="mt-3 grid grid-cols-3 gap-3">
            <div>
              <Label className="text-slate-300">Plastic Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.plasticWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','plasticWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.plasticWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','plasticWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">E-Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.eWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','eWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.eWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','eWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Bio-medical Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.bioMedicalWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','bioMedicalWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.bioMedicalWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','bioMedicalWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Construction & Demolition Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.constructionDemolitionWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','constructionDemolitionWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.constructionDemolitionWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','constructionDemolitionWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Battery Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.batteryWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','batteryWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.batteryWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','batteryWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Radioactive Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.radioactiveWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','radioactiveWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.radioactiveWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','radioactiveWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Other Hazardous Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.otherHazardousWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherHazardousWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.otherHazardousWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherHazardousWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Other Non-Hazardous Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.otherNonHazardousWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherNonHazardousWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.otherNonHazardousWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherNonHazardousWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Total Waste</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.totalWaste.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','totalWaste','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.totalWaste.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','totalWaste','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Recycled</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.recycled.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','recycled','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.recycled.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','recycled','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Reused</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.reused.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','reused','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.reused.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','reused','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Other Recovery</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.otherRecovery.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherRecovery','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.otherRecovery.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherRecovery','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Total Recovered</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.totalRecovered.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','totalRecovered','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.totalRecovered.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','totalRecovered','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Incineration</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.incineration.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','incineration','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.incineration.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','incineration','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Landfilling</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.landfilling.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','landfilling','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.landfilling.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','landfilling','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Other Disposal</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.otherDisposal.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherDisposal','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.otherDisposal.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','otherDisposal','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Total Disposed</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.totalDisposed.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','totalDisposed','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.totalDisposed.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','totalDisposed','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Waste Intensity per Turnover</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.wasteIntensityPerTurnover.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','wasteIntensityPerTurnover','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.wasteIntensityPerTurnover.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','wasteIntensityPerTurnover','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div>
              <Label className="text-slate-300">Waste Intensity (PPP)</Label>
              <Input placeholder="Current FY" value={data.essential.q9_wasteManagement.wasteIntensityPPP.currentFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','wasteIntensityPPP','currentFY'], e.target.value)} className="mt-1" />
              <Input placeholder="Previous FY" value={data.essential.q9_wasteManagement.wasteIntensityPPP.previousFY} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','wasteIntensityPPP','previousFY'], e.target.value)} className="mt-1" />
            </div>

            <div className="col-span-3 mt-2">
              <Label className="text-slate-300">Waste Intensity (Physical Output)</Label>
              <Input placeholder="Waste intensity (physical output)" value={data.essential.q9_wasteManagement.wasteIntensityPhysicalOutput} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','wasteIntensityPhysicalOutput'], e.target.value)} className="mt-1" />
            </div>

            <div className="col-span-3 mt-2">
              <Label className="text-slate-300">Waste Notes / External Assessment</Label>
              <Textarea placeholder="External assessment or notes" value={data.essential.q9_wasteManagement.externalAssessment} onChange={(e) => setSimpleField(['essential','q9_wasteManagement','externalAssessment'], e.target.value)} className="min-h-20 mt-2" />
            </div>
          </div>

        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q10: Waste Practices</h3>
          <Textarea value={data.essential.q10_wastePractices} onChange={(e) => setSimpleField(['essential','q10_wastePractices'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q11: Ecologically sensitive areas</h3>
          <Input placeholder="Ecologically sensitive areas (Yes/No/NA)" value={data.essential.q11_ecologicallySensitiveAreas} onChange={(e) => setSimpleField(['essential','q11_ecologicallySensitiveAreas'], e.target.value)} className="mt-2" />
          <Textarea placeholder="Details" value={data.essential.q11_ecologicallySensitiveDetails} onChange={(e) => setSimpleField(['essential','q11_ecologicallySensitiveDetails'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q12: Environmental impact assessments</h3>
          <Textarea value={data.essential.q12_environmentalImpactAssessments} onChange={(e) => setSimpleField(['essential','q12_environmentalImpactAssessments'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q13: Environmental compliance & non-compliances</h3>
          <Textarea placeholder="Compliance summary" value={data.essential.q13_environmentalCompliance} onChange={(e) => setSimpleField(['essential','q13_environmentalCompliance'], e.target.value)} className="min-h-20" />
          <Textarea placeholder="Non-compliances (if any)" value={data.essential.q13_nonCompliances} onChange={(e) => setSimpleField(['essential','q13_nonCompliances'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership</h3>

          <div className="mt-2">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q1: Water Stress Areas</h4>
            <Label className="text-slate-300">(Add one or more water stress areas)</Label>
            {asArray(data.leadership.q1_waterStressAreas).map((area: any, idx: number) => (
              <div key={idx} className="bg-slate-700 p-3 rounded mt-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Q1 - Name" value={String(area.name ?? '') as any} onChange={(e) => setSimpleField(['leadership','q1_waterStressAreas', String(idx),'name'], e.target.value)} />
                  <Input placeholder="Q1 - Nature of Operations" value={String(area.natureOfOperations ?? '') as any} onChange={(e) => setSimpleField(['leadership','q1_waterStressAreas', String(idx),'natureOfOperations'], e.target.value)} />
                  <Input placeholder="Q1 - Withdrawal - total (currentFY)" value={String((area.withdrawal && area.withdrawal.total && area.withdrawal.total.currentFY) ?? '') as any} onChange={(e) => setSimpleField(['leadership','q1_waterStressAreas', String(idx),'withdrawal','total','currentFY'], e.target.value)} />
                  <Input placeholder="Q1 - Withdrawal - total (previousFY)" value={String((area.withdrawal && area.withdrawal.total && area.withdrawal.total.previousFY) ?? '') as any} onChange={(e) => setSimpleField(['leadership','q1_waterStressAreas', String(idx),'withdrawal','total','previousFY'], e.target.value)} />
                  <Input placeholder="Q1 - Consumption - total (currentFY)" value={String((area.consumption && area.consumption.total && area.consumption.total.currentFY) ?? '') as any} onChange={(e) => setSimpleField(['leadership','q1_waterStressAreas', String(idx),'consumption','total','currentFY'], e.target.value)} />
                  <Input placeholder="Q1 - Consumption - total (previousFY)" value={String((area.consumption && area.consumption.total && area.consumption.total.previousFY) ?? '') as any} onChange={(e) => setSimpleField(['leadership','q1_waterStressAreas', String(idx),'consumption','total','previousFY'], e.target.value)} />
                </div>
                <div className="mt-2 flex gap-2 justify-end">
                  <Button size="sm" variant="destructive" onClick={() => {
                    const arr = [...(asArray(data.leadership.q1_waterStressAreas))]
                    arr.splice(idx, 1)
                    setSimpleField(['leadership','q1_waterStressAreas'], arr)
                  }}>Remove</Button>
                </div>
              </div>
            ))}
            <div className="mt-2"><Button size="sm" onClick={() => { const arr = [...(data.leadership.q1_waterStressAreas || [])]; arr.push({ name: '', natureOfOperations: '', withdrawal: { total: { currentFY: '', previousFY: '' } }, consumption: { total: { currentFY: '', previousFY: '' } } }); setSimpleField(['leadership','q1_waterStressAreas'], arr) }}>Add Water Stress Area</Button></div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q2: Scope 3 Emissions</h4>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Input placeholder="Q2 - Scope3 Emissions (value)" value={data.leadership.q2_scope3Emissions} onChange={(e) => setSimpleField(['leadership','q2_scope3Emissions'], e.target.value)} />
              <Input placeholder="Q2 - Scope3 per Turnover" value={data.leadership.q2_scope3EmissionsPerTurnover} onChange={(e) => setSimpleField(['leadership','q2_scope3EmissionsPerTurnover'], e.target.value)} />
              <Input placeholder="Q2 - Scope3 Intensity (Physical Output)" value={data.leadership.q2_scope3IntensityPhysicalOutput} onChange={(e) => setSimpleField(['leadership','q2_scope3IntensityPhysicalOutput'], e.target.value)} />
              <Input placeholder="Q2 - Scope3 External Assessment" value={data.leadership.q2_externalAssessment} onChange={(e) => setSimpleField(['leadership','q2_externalAssessment'], e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q3: Biodiversity Impact</h4>
            <Textarea placeholder="Q3 - Describe biodiversity impacts" value={data.leadership.q3_biodiversityImpact} onChange={(e) => setSimpleField(['leadership','q3_biodiversityImpact'], e.target.value)} className="min-h-20 mt-2" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q4: Resource Efficiency Initiatives</h4>
            <Label className="text-slate-300">(List initiatives, details and outcomes)</Label>
            {asArray(data.leadership.q4_resourceEfficiencyInitiatives).map((it: any, idx: number) => (
              <div key={idx} className="bg-slate-700 p-3 rounded mt-2">
                <Input placeholder={`Q4.${idx+1} - Initiative`} value={String(it.initiative ?? '') as any} onChange={(e) => setSimpleField(['leadership','q4_resourceEfficiencyInitiatives', String(idx),'initiative'], e.target.value)} />
                <Input placeholder={`Q4.${idx+1} - Details`} value={String(it.details ?? '') as any} onChange={(e) => setSimpleField(['leadership','q4_resourceEfficiencyInitiatives', String(idx),'details'], e.target.value)} className="mt-2" />
                <Input placeholder={`Q4.${idx+1} - Outcome`} value={String(it.outcome ?? '') as any} onChange={(e) => setSimpleField(['leadership','q4_resourceEfficiencyInitiatives', String(idx),'outcome'], e.target.value)} className="mt-2" />
                <div className="mt-2 flex justify-end">
                  <Button size="sm" variant="destructive" onClick={() => { const arr = [...(asArray(data.leadership.q4_resourceEfficiencyInitiatives))]; arr.splice(idx, 1); setSimpleField(['leadership','q4_resourceEfficiencyInitiatives'], arr) }}>Remove</Button>
                </div>
              </div>
            ))}
            <div className="mt-2"><Button size="sm" onClick={() => { const arr = [...(data.leadership.q4_resourceEfficiencyInitiatives || [])]; arr.push({ initiative: '', details: '', outcome: '' }); setSimpleField(['leadership','q4_resourceEfficiencyInitiatives'], arr) }}>Add Initiative</Button></div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q5: Business Continuity Plan</h4>
            <Textarea placeholder="Q5 - Business continuity plan details" value={data.leadership.q5_businessContinuityPlan} onChange={(e) => setSimpleField(['leadership','q5_businessContinuityPlan'], e.target.value)} className="min-h-20 mt-2" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q6: Value Chain Environmental Impact</h4>
            <Textarea placeholder="Q6 - Value chain environmental impacts" value={data.leadership.q6_valueChainEnvironmentalImpact} onChange={(e) => setSimpleField(['leadership','q6_valueChainEnvironmentalImpact'], e.target.value)} className="min-h-20 mt-2" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q7: Value Chain Partners Assessed</h4>
            <Input placeholder="Q7 - Summary of partners assessed" value={data.leadership.q7_valueChainPartnersAssessed} onChange={(e) => setSimpleField(['leadership','q7_valueChainPartnersAssessed'], e.target.value)} className="mt-1" />
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
