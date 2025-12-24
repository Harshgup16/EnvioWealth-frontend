"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface TrainingCoverage {
  totalProgrammes: string
  topicsCovered: string
  percentageCovered: string
}
interface FinesPenaltyEntry {
  type: string
  ngrbc: string
  regulatoryAgency: string
  amountInr: string
  briefOfCase: string
  appealPreferred: string
}

interface YearPair { currentFY: string; previousFY: string }

interface DisciplineGroup { currentFY: string; previousFY: string }

interface ComplaintEntry { number: string; remarks: string }

interface OpennessBusiness {
  concentrationPurchases: string
  concentrationSales: string
  shareRPTs: {
    purchases: YearPair
    sales: YearPair
    loansAdvances: YearPair
    investments: YearPair
  }
}

interface SafetyIncidents {
  ltifr: { employees: YearPair; workers: YearPair }
  totalRecordableInjuries: { employees: YearPair; workers: YearPair }
  fatalities: { employees: YearPair; workers: YearPair }
  highConsequenceInjuries: { employees: YearPair; workers: YearPair }
}

interface SectionCP1ManualData {
  essential: {
    q1_percentageCoveredByTraining: {
      boardOfDirectors: TrainingCoverage
      kmp: TrainingCoverage
      employees: TrainingCoverage
      workers: TrainingCoverage
    }
    q2_finesPenalties: { monetary: FinesPenaltyEntry[]; nonMonetary: any[] }
    q3_appealsOutstanding: string
    q4_antiCorruptionPolicy: { exists: string; details: string; webLink: string }
    q5_disciplinaryActions: {
      directors: DisciplineGroup
      kmps: DisciplineGroup
      employees: DisciplineGroup
      workers: DisciplineGroup
    }
    q6_conflictOfInterestComplaints: {
      directors: { currentFY: ComplaintEntry; previousFY: ComplaintEntry }
      kmps: { currentFY: ComplaintEntry; previousFY: ComplaintEntry }
    }
    q7_correctiveActions: string
    q8_accountsPayableDays: YearPair
    q9_opennessBusiness: OpennessBusiness
    q10_healthSafetyManagement: { a: string; b: string; c: string; d: string }
    q11_safetyIncidents: SafetyIncidents
    q12_safetyMeasures: string
    // additional essential fields (q13, q14...) can be added later if needed
  }
  leadership: {
    q1_valueChainAwareness: Array<{ totalProgramsHeld: string; topicsCovered: string; percentageValueChainCovered: string }>
    q2_conflictOfInterestProcess: { exists: string; details: string }
  }
}

interface SectionCP1FormProps {
  onDataChange?: (data: SectionCP1ManualData) => void
  initialData?: Partial<SectionCP1ManualData>
}

export function SectionCP1Form({ onDataChange, initialData }: SectionCP1FormProps) {
  const defaultData: SectionCP1ManualData = {
    essential: {
      q1_percentageCoveredByTraining: {
        boardOfDirectors: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
        kmp: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
        employees: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
        workers: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
      },
      q2_finesPenalties: { monetary: [], nonMonetary: [] },
      q3_appealsOutstanding: "",
      q4_antiCorruptionPolicy: { exists: "", details: "", webLink: "" },
      q5_disciplinaryActions: {
        directors: { currentFY: "", previousFY: "" },
        kmps: { currentFY: "", previousFY: "" },
        employees: { currentFY: "", previousFY: "" },
        workers: { currentFY: "", previousFY: "" },
      },
      q6_conflictOfInterestComplaints: {
        directors: { currentFY: { number: "", remarks: "" }, previousFY: { number: "", remarks: "" } },
        kmps: { currentFY: { number: "", remarks: "" }, previousFY: { number: "", remarks: "" } },
      },
      q7_correctiveActions: "",
      q8_accountsPayableDays: { currentFY: "", previousFY: "" },
      q9_opennessBusiness: {
        concentrationPurchases: "",
        concentrationSales: "",
        shareRPTs: { purchases: { currentFY: "", previousFY: "" }, sales: { currentFY: "", previousFY: "" }, loansAdvances: { currentFY: "", previousFY: "" }, investments: { currentFY: "", previousFY: "" } },
      },
      q10_healthSafetyManagement: { a: "", b: "", c: "", d: "" },
      q11_safetyIncidents: { ltifr: { employees: { currentFY: "", previousFY: "" }, workers: { currentFY: "", previousFY: "" } }, totalRecordableInjuries: { employees: { currentFY: "", previousFY: "" }, workers: { currentFY: "", previousFY: "" } }, fatalities: { employees: { currentFY: "", previousFY: "" }, workers: { currentFY: "", previousFY: "" } }, highConsequenceInjuries: { employees: { currentFY: "", previousFY: "" }, workers: { currentFY: "", previousFY: "" } } },
      q12_safetyMeasures: "",
    },
    leadership: {
      q1_valueChainAwareness: [],
      q2_conflictOfInterestProcess: { exists: "", details: "" },
    },
  }

  const [data, setData] = useState<SectionCP1ManualData>(() => ({ ...(defaultData as any), ...(initialData as any) }))

  useEffect(() => {
    if (!initialData) return
    // Merge only if the incoming initialData would change local state — avoids update loops
    setData((prev) => {
      const merged = { ...(prev as any), ...(initialData as any) }
      try {
        if (JSON.stringify(merged) === JSON.stringify(prev)) return prev
      } catch (e) {
        // If stringify fails for some reason, fall back to assigning
      }
      return merged
    })
  }, [initialData])

  useEffect(() => {
    onDataChange && onDataChange(data)
  }, [data, onDataChange])

  const handleTrainingChange = (group: keyof SectionCP1ManualData["essential"]["q1_percentageCoveredByTraining"], field: keyof TrainingCoverage, value: string) => {
    const updated = { ...data }
    ;(updated.essential.q1_percentageCoveredByTraining as any)[group] = {
      ...((updated.essential.q1_percentageCoveredByTraining as any)[group] || {}),
      [field]: value,
    }
    setData(updated)
  }

  const handleAntiCorruptionChange = (field: keyof SectionCP1ManualData["essential"]["q4_antiCorruptionPolicy"], value: string) => {
    const updated = { ...data }
    updated.essential.q4_antiCorruptionPolicy = { ...(updated.essential.q4_antiCorruptionPolicy || {}), [field]: value }
    setData(updated)
  }

  const handleAddValueChain = () => {
    const updated = { ...data }
    updated.leadership.q1_valueChainAwareness = [
      ...(updated.leadership.q1_valueChainAwareness || []),
      { totalProgramsHeld: "", topicsCovered: "", percentageValueChainCovered: "" },
    ]
    setData(updated)
  }

  const handleValueChainChange = (index: number, field: string, value: string) => {
    const updated = { ...data }
    const arr = [...(updated.leadership.q1_valueChainAwareness || [])]
    arr[index] = { ...arr[index], [field]: value }
    updated.leadership.q1_valueChainAwareness = arr
    setData(updated)
  }

  const addMonetaryEntry = () => {
    const updated = { ...data }
    updated.essential.q2_finesPenalties.monetary = [
      ...(updated.essential.q2_finesPenalties.monetary || []),
      { type: "", ngrbc: "", regulatoryAgency: "", amountInr: "", briefOfCase: "", appealPreferred: "" },
    ]
    setData(updated)
  }

  const updateMonetaryEntry = (idx: number, field: string, value: string) => {
    const updated = { ...data }
    updated.essential.q2_finesPenalties.monetary = (updated.essential.q2_finesPenalties.monetary || []).map((e, i) => (i === idx ? { ...e, [field]: value } : e))
    setData(updated)
  }

  const removeMonetaryEntry = (idx: number) => {
    const updated = { ...data }
    const arr = [...(updated.essential.q2_finesPenalties.monetary || [])]
    arr.splice(idx, 1)
    updated.essential.q2_finesPenalties.monetary = arr
    setData(updated)
  }

  const setNonMonetary = (text: string) => {
    const updated = { ...data }
    updated.essential.q2_finesPenalties.nonMonetary = text.split('\n').map((s) => s.trim()).filter(Boolean)
    setData(updated)
  }

  const handleDisciplineChange = (group: keyof SectionCP1ManualData["essential"]["q5_disciplinaryActions"], field: keyof DisciplineGroup, value: string) => {
    const updated = { ...data }
    ;(updated.essential.q5_disciplinaryActions as any)[group] = { ...(updated.essential.q5_disciplinaryActions as any)[group], [field]: value }
    setData(updated)
  }

  const handleComplaintChange = (group: keyof SectionCP1ManualData["essential"]["q6_conflictOfInterestComplaints"], path: string, value: string) => {
    const updated = { ...data }
    const [section, key] = path.split('.')
    ;(updated.essential.q6_conflictOfInterestComplaints as any)[group] = { ...(updated.essential.q6_conflictOfInterestComplaints as any)[group], [section]: { ...((updated.essential.q6_conflictOfInterestComplaints as any)[group] || {})[section], [key]: value } }
    setData(updated)
  }

  const setSimpleField = (path: string[], value: any) => {
    const updated: any = { ...data }
    let cursor: any = updated
    for (let i = 0; i < path.length - 1; i++) cursor = cursor[path[i]] = { ...(cursor[path[i]] || {}) }
    cursor[path[path.length - 1]] = value
    setData(updated)
  }

  const handleAutoFill = () => {
    const sample: SectionCP1ManualData = {
      essential: {
        q1_percentageCoveredByTraining: {
          boardOfDirectors: { totalProgrammes: "4", topicsCovered: "Yarn & Fabric business performance and strategy", percentageCovered: "100%" },
          kmp: { totalProgrammes: "4", topicsCovered: "Yarn & Fabric", percentageCovered: "100%" },
          employees: { totalProgrammes: "5", topicsCovered: "Labour Laws", percentageCovered: "74%" },
          workers: { totalProgrammes: "1", topicsCovered: "PACE", percentageCovered: "85%" },
        },
        q2_finesPenalties: { monetary: [{ type: "Penalty/ Fine", ngrbc: "NIL", regulatoryAgency: "NIL", amountInr: "NIL", briefOfCase: "NIL", appealPreferred: "NIL" }], nonMonetary: ["Imprisonment - NIL", "Punishment - NIL"] },
        q3_appealsOutstanding: "NA",
        q4_antiCorruptionPolicy: { exists: "Yes", details: "Whistle blower mechanism and vigil mechanism", webLink: "https://example.com/whistle" },
        q5_disciplinaryActions: { directors: { currentFY: "NIL", previousFY: "NIL" }, kmps: { currentFY: "NIL", previousFY: "NIL" }, employees: { currentFY: "NIL", previousFY: "NIL" }, workers: { currentFY: "NIL", previousFY: "NIL" } },
        q6_conflictOfInterestComplaints: { directors: { currentFY: { number: "NIL", remarks: "-" }, previousFY: { number: "NIL", remarks: "-" } }, kmps: { currentFY: { number: "NIL", remarks: "-" }, previousFY: { number: "NIL", remarks: "-" } } },
        q7_correctiveActions: "NOT APPLICABLE",
        q8_accountsPayableDays: { currentFY: "23.32", previousFY: "16.21" },
        q9_opennessBusiness: { concentrationPurchases: "trading houses 11%", concentrationSales: "top dealers 59%", shareRPTs: { purchases: { currentFY: "1.61%", previousFY: "2.96%" }, sales: { currentFY: "0.73%", previousFY: "0.86%" }, loansAdvances: { currentFY: "NIL", previousFY: "NIL" }, investments: { currentFY: "NIL", previousFY: "NIL" } } },
        q10_healthSafetyManagement: { a: "Yes, occupational health system in place.", b: "HIRA and monthly incident analysis.", c: "Workers can report hazards and remove themselves.", d: "Yes" },
        q11_safetyIncidents: { ltifr: { employees: { currentFY: "0", previousFY: "0" }, workers: { currentFY: "3.41", previousFY: "52.568" } }, totalRecordableInjuries: { employees: { currentFY: "0", previousFY: "0" }, workers: { currentFY: "162", previousFY: "0" } }, fatalities: { employees: { currentFY: "0", previousFY: "0" }, workers: { currentFY: "3", previousFY: "0" } }, highConsequenceInjuries: { employees: { currentFY: "0", previousFY: "0" }, workers: { currentFY: "0", previousFY: "11" } } },
        q12_safetyMeasures: "Proactive measures including hazard assessments, training, PPEs and mock drills.",
      },
      leadership: {
        q1_valueChainAwareness: [
          { totalProgramsHeld: "1077", topicsCovered: "Training on Water Stewardship", percentageValueChainCovered: "-" },
          { totalProgramsHeld: "437", topicsCovered: "Non-chemical crop protection", percentageValueChainCovered: "-" },
        ],
        q2_conflictOfInterestProcess: { exists: "Yes", details: "Code of Conduct with conflict of interest process" },
      },
    }
    setData(sample)
  }
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-emerald-400">Section C - Principle 1 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential indicators and Leadership indicators for Principle 1</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleAutoFill}>Auto Fill Test Data</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Training coverage</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(["boardOfDirectors", "kmp", "employees", "workers"] as const).map((group) => (
              <div key={group} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{group}</Label>
                <Input className="mt-2" value={(data.essential.q1_percentageCoveredByTraining as any)[group].totalProgrammes} onChange={(e) => handleTrainingChange(group, "totalProgrammes", e.target.value)} placeholder="Total programmes" />
                <Input className="mt-2" value={(data.essential.q1_percentageCoveredByTraining as any)[group].topicsCovered} onChange={(e) => handleTrainingChange(group, "topicsCovered", e.target.value)} placeholder="Topics covered" />
                <Input className="mt-2" value={(data.essential.q1_percentageCoveredByTraining as any)[group].percentageCovered} onChange={(e) => handleTrainingChange(group, "percentageCovered", e.target.value)} placeholder="Percentage covered" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q4: Anti-corruption policy</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-slate-200">Exists</Label>
              <Input value={data.essential.q4_antiCorruptionPolicy.exists} onChange={(e) => handleAntiCorruptionChange("exists", e.target.value)} placeholder="Yes/No" />
            </div>
            <div>
              <Label className="text-slate-200">Web link</Label>
              <Input value={data.essential.q4_antiCorruptionPolicy.webLink} onChange={(e) => handleAntiCorruptionChange("webLink", e.target.value)} placeholder="https://" />
            </div>
            <div className="col-span-2">
              <Label className="text-slate-200">Details</Label>
              <Textarea value={data.essential.q4_antiCorruptionPolicy.details} onChange={(e) => handleAntiCorruptionChange("details", e.target.value)} className="min-h-20" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Fines & penalties (monetary)</h3>
          <div className="space-y-3 mt-2">
            {(data.essential.q2_finesPenalties.monetary || []).map((entry, idx) => (
              <div key={idx} className="bg-slate-700 p-3 rounded grid grid-cols-6 gap-2 items-start">
                <Input placeholder="Type" value={entry.type} onChange={(e) => updateMonetaryEntry(idx, 'type', e.target.value)} />
                <Input placeholder="Regulatory agency" value={entry.regulatoryAgency} onChange={(e) => updateMonetaryEntry(idx, 'regulatoryAgency', e.target.value)} />
                <Input placeholder="Amount (INR)" value={entry.amountInr} onChange={(e) => updateMonetaryEntry(idx, 'amountInr', e.target.value)} />
                <Input placeholder="NGRBC" value={entry.ngrbc} onChange={(e) => updateMonetaryEntry(idx, 'ngrbc', e.target.value)} />
                <Input placeholder="Appeal preferred" value={entry.appealPreferred} onChange={(e) => updateMonetaryEntry(idx, 'appealPreferred', e.target.value)} />
                <Button variant="destructive" size="sm" onClick={() => removeMonetaryEntry(idx)}>Remove</Button>
                <div className="col-span-6">
                  <Label className="text-slate-200">Brief of case</Label>
                  <Textarea value={entry.briefOfCase} onChange={(e) => updateMonetaryEntry(idx, 'briefOfCase', e.target.value)} className="min-h-15" />
                </div>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addMonetaryEntry()}>Add Monetary Entry</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Fines & penalties (non-monetary)</h3>
          <div className="mt-2">
            <Label className="text-slate-200">Notes / Non-monetary penalties (one per line)</Label>
            <Textarea value={(data.essential.q2_finesPenalties.nonMonetary || []).join('\n')} onChange={(e) => setNonMonetary(e.target.value)} className="min-h-20" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Appeals outstanding</h3>
          <div className="mt-2">
            <Input value={data.essential.q3_appealsOutstanding} onChange={(e) => setSimpleField(['essential','q3_appealsOutstanding'], e.target.value)} placeholder="e.g., NA" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q5: Disciplinary actions</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['directors','kmps','employees','workers'] as const).map((grp) => (
              <div key={grp} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{grp}</Label>
                <Input className="mt-2" placeholder="Current FY" value={(data.essential.q5_disciplinaryActions as any)[grp].currentFY} onChange={(e) => handleDisciplineChange(grp, 'currentFY', e.target.value)} />
                <Input className="mt-2" placeholder="Previous FY" value={(data.essential.q5_disciplinaryActions as any)[grp].previousFY} onChange={(e) => handleDisciplineChange(grp, 'previousFY', e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q6: Conflict of interest complaints</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['directors','kmps'] as const).map((grp) => (
              <div key={grp} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{grp}</Label>
                <Input className="mt-2" placeholder="Current FY - number" value={(data.essential.q6_conflictOfInterestComplaints as any)[grp].currentFY.number} onChange={(e) => handleComplaintChange(grp, 'currentFY.number', e.target.value)} />
                <Input className="mt-2" placeholder="Current FY - remarks" value={(data.essential.q6_conflictOfInterestComplaints as any)[grp].currentFY.remarks} onChange={(e) => handleComplaintChange(grp, 'currentFY.remarks', e.target.value)} />
                <Input className="mt-2" placeholder="Previous FY - number" value={(data.essential.q6_conflictOfInterestComplaints as any)[grp].previousFY.number} onChange={(e) => handleComplaintChange(grp, 'previousFY.number', e.target.value)} />
                <Input className="mt-2" placeholder="Previous FY - remarks" value={(data.essential.q6_conflictOfInterestComplaints as any)[grp].previousFY.remarks} onChange={(e) => handleComplaintChange(grp, 'previousFY.remarks', e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q7: Corrective actions</h3>
          <Textarea value={data.essential.q7_correctiveActions} onChange={(e) => setSimpleField(['essential','q7_correctiveActions'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q8: Accounts payable days</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Input placeholder="Current FY" value={data.essential.q8_accountsPayableDays.currentFY} onChange={(e) => setSimpleField(['essential','q8_accountsPayableDays','currentFY'], e.target.value)} />
            <Input placeholder="Previous FY" value={data.essential.q8_accountsPayableDays.previousFY} onChange={(e) => setSimpleField(['essential','q8_accountsPayableDays','previousFY'], e.target.value)} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q9: Openness in business</h3>
          <div className="mt-2">
            <Label className="text-slate-200">Concentration Purchases</Label>
            <Textarea value={data.essential.q9_opennessBusiness.concentrationPurchases} onChange={(e) => setSimpleField(['essential','q9_opennessBusiness','concentrationPurchases'], e.target.value)} className="min-h-15" />
            <Label className="text-slate-200 mt-2">Concentration Sales</Label>
            <Textarea value={data.essential.q9_opennessBusiness.concentrationSales} onChange={(e) => setSimpleField(['essential','q9_opennessBusiness','concentrationSales'], e.target.value)} className="min-h-15" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q10: Health & safety management</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Textarea value={data.essential.q10_healthSafetyManagement.a} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','a'], e.target.value)} className="min-h-20" />
            <Textarea value={data.essential.q10_healthSafetyManagement.b} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','b'], e.target.value)} className="min-h-20" />
            <Textarea value={data.essential.q10_healthSafetyManagement.c} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','c'], e.target.value)} className="min-h-20" />
            <Textarea value={data.essential.q10_healthSafetyManagement.d} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','d'], e.target.value)} className="min-h-20" />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q11: Safety incidents</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <Label className="text-slate-200">LTIFR (Employees)</Label>
              <Input value={data.essential.q11_safetyIncidents.ltifr.employees.currentFY} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents','ltifr','employees','currentFY'], e.target.value)} placeholder="Current FY" />
              <Input value={data.essential.q11_safetyIncidents.ltifr.employees.previousFY} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents','ltifr','employees','previousFY'], e.target.value)} placeholder="Previous FY" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <Label className="text-slate-200">LTIFR (Workers)</Label>
              <Input value={data.essential.q11_safetyIncidents.ltifr.workers.currentFY} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents','ltifr','workers','currentFY'], e.target.value)} placeholder="Current FY" />
              <Input value={data.essential.q11_safetyIncidents.ltifr.workers.previousFY} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents','ltifr','workers','previousFY'], e.target.value)} placeholder="Previous FY" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q12: Safety measures</h3>
          <Textarea value={data.essential.q12_safetyMeasures} onChange={(e) => setSimpleField(['essential','q12_safetyMeasures'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>          <h3 className="text-sm font-semibold text-emerald-400">Leadership - Q1: Value chain awareness</h3>
          <div className="space-y-2 mt-2">
            {(data.leadership.q1_valueChainAwareness || []).map((item, idx) => (
              <div key={idx} className="bg-slate-700 p-3 rounded grid grid-cols-3 gap-2">
                <Input value={item.totalProgramsHeld} onChange={(e) => handleValueChainChange(idx, "totalProgramsHeld", e.target.value)} placeholder="Total programs held" />
                <Input value={item.topicsCovered} onChange={(e) => handleValueChainChange(idx, "topicsCovered", e.target.value)} placeholder="Topics covered" />
                <Input value={item.percentageValueChainCovered} onChange={(e) => handleValueChainChange(idx, "percentageValueChainCovered", e.target.value)} placeholder="% covered" />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={handleAddValueChain}>Add Entry</Button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            try {
              navigator.clipboard.writeText(JSON.stringify(data, null, 2))
              alert('CP1 JSON copied to clipboard')
            } catch (e) {
              alert('Could not copy to clipboard')
            }
          }}>Export JSON</Button>
          <Button variant="outline" size="sm" onClick={() => {
            const raw = window.prompt('Paste CP1 JSON')
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

