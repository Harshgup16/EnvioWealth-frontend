"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface WellbeingGroup {
  total: string
  healthInsurance: { no: string; percent: string }
  accidentInsurance: { no: string; percent: string }
  maternityBenefits?: { no: string; percent: string }
  paternityBenefits?: { no: string; percent: string }
  dayCare?: { no: string; percent: string }
}

interface YearPair { currentFY?: string; previousFY?: string }
interface YearNums { received?: string; pending?: string; remarks?: string }

interface RetirementScheme {
  currentFY: { employeesPercent?: string; workersPercent?: string; deductedDeposited?: string }
  previousFY: { employeesPercent?: string; workersPercent?: string; deductedDeposited?: string }
}

interface SafetyIncidents {
  ltifr: { employees: YearPair; workers: YearPair }
  totalRecordableInjuries: { employees: YearPair; workers: YearPair }
  fatalities: { employees: YearPair; workers: YearPair }
  highConsequenceInjuries: { employees: YearPair; workers: YearPair }
}

interface SectionCP3ManualData {
  essential: {
    q1a_employeeWellbeing: { permanentMale: WellbeingGroup; permanentFemale: WellbeingGroup; permanentTotal: WellbeingGroup; otherMale: string | WellbeingGroup; otherFemale: string | WellbeingGroup; otherTotal: string | WellbeingGroup }
    q1b_workerWellbeing: { permanentMale: WellbeingGroup; permanentFemale: WellbeingGroup; permanentTotal: WellbeingGroup; otherMale: string | WellbeingGroup; otherFemale: string | WellbeingGroup; otherTotal: string | WellbeingGroup }
    q1c_spendingOnWellbeing: { currentFY?: string; previousFY?: string }
    q2_retirementBenefits: { pf?: RetirementScheme; gratuity?: RetirementScheme; esi?: RetirementScheme; nps?: RetirementScheme }
    q3_accessibilityOfWorkplaces: string
    q4_equalOpportunityPolicy: { exists?: string; details?: string }
    q5_parentalLeaveRates: { permanentEmployees?: { male?: YearPair; female?: YearPair; total?: YearPair }; permanentWorkers?: { male?: YearPair; female?: YearPair; total?: YearPair } }
    q6_grievancemechanism: { permanentWorkers?: string; otherThanPermanentWorkers?: string; permanentEmployees?: string; otherThanPermanentEmployees?: string; details?: string }
    q7_membershipUnions: { currentFY?: { employeesMembers?: string; employeesPercentUnionised?: string; workersMembers?: string; workersPercentUnionised?: string }; previousFY?: { employeesMembers?: string; employeesPercentUnionised?: string; workersMembers?: string; workersPercentUnionised?: string } }
    q8_trainingDetails: { employees?: { currentFY?: { totalHours?: string; trainedCount?: string; healthSafetyPercent?: string; skillUpgradationPercent?: string }; previousFY?: { totalHours?: string; trainedCount?: string; healthSafetyPercent?: string; skillUpgradationPercent?: string } }; workers?: { currentFY?: { totalHours?: string; trainedCount?: string; healthSafetyPercent?: string; skillUpgradationPercent?: string }; previousFY?: { totalHours?: string; trainedCount?: string; healthSafetyPercent?: string; skillUpgradationPercent?: string } } }
    q9_performanceReviews: { employees?: { currentFY?: { percentReviewed?: string; percentPromoted?: string }; previousFY?: { percentReviewed?: string; percentPromoted?: string } }; workers?: { currentFY?: { percentReviewed?: string }; previousFY?: { percentReviewed?: string } } }
    q10_healthSafetyManagement?: { policyExists?: string; safetyOfficer?: string; safetyAuditFrequency?: string; trainingHoursPerFY?: string; certifications?: string; emergencyPlan?: string }
    q11_safetyIncidents: SafetyIncidents
    q12_safetyMeasures: string
    q13_complaintsWorkingConditions?: { employees?: { filed?: string; pending?: string; resolved?: string; remarks?: string }; workers?: { filed?: string; pending?: string; resolved?: string; remarks?: string }; other?: { filed?: string; pending?: string; resolved?: string; remarks?: string } }
    q14_assessments?: { riskAssessmentConducted?: string; frequency?: string; thirdPartyAssurance?: string; lastAssessmentDate?: string; summary?: string }
    q15_correctiveActions?: string
  }
  leadership: {
    q1_lifeInsurance?: string
    q2_statutoryDuesValueChain?: string
    q3_rehabilitation?: { programsCount?: string; budgetAllocated?: string; description?: string; employees?: { currentFY?: { totalAffected?: string; rehabilitated?: string }; previousFY?: { totalAffected?: string; rehabilitated?: string } }; workers?: { currentFY?: { totalAffected?: string; rehabilitated?: string }; previousFY?: { totalAffected?: string; rehabilitated?: string } } }
    q4_transitionAssistance?: { assistanceExists?: string; programs?: string; budgetAllocated?: string; details?: string }
    q5_valueChainAssessment?: { assessmentConducted?: string; percentSuppliersAssessed?: string; correctiveActionsCount?: string; lastAssessmentDate?: string; notes?: string }
    q6_correctiveActionsValueChain?: string
  }
}

interface SectionCP3FormProps {
  onDataChange?: (data: SectionCP3ManualData) => void
  initialData?: Partial<SectionCP3ManualData>
}

export function SectionCP3Form({ onDataChange, initialData }: SectionCP3FormProps) {
  const defaultData: SectionCP3ManualData = {
    essential: {
      q1a_employeeWellbeing: {
        permanentMale: { total: "", healthInsurance: { no: "", percent: "" }, accidentInsurance: { no: "", percent: "" }, maternityBenefits: { no: "", percent: "" }, paternityBenefits: { no: "", percent: "" }, dayCare: { no: "", percent: "" } },
        permanentFemale: { total: "", healthInsurance: { no: "", percent: "" }, accidentInsurance: { no: "", percent: "" }, maternityBenefits: { no: "", percent: "" }, paternityBenefits: { no: "", percent: "" }, dayCare: { no: "", percent: "" } },
        permanentTotal: { total: "", healthInsurance: { no: "", percent: "" }, accidentInsurance: { no: "", percent: "" }, maternityBenefits: { no: "", percent: "" }, paternityBenefits: { no: "", percent: "" }, dayCare: { no: "", percent: "" } },
        otherMale: "",
        otherFemale: "",
        otherTotal: ""
      },
      q1b_workerWellbeing: {
        permanentMale: { total: "", healthInsurance: { no: "", percent: "" }, accidentInsurance: { no: "", percent: "" } },
        permanentFemale: { total: "", healthInsurance: { no: "", percent: "" }, accidentInsurance: { no: "", percent: "" } },
        permanentTotal: { total: "", healthInsurance: { no: "", percent: "" }, accidentInsurance: { no: "", percent: "" } },
        otherMale: "",
        otherFemale: "",
        otherTotal: ""
      },
      q1c_spendingOnWellbeing: { currentFY: "", previousFY: "" },
      q2_retirementBenefits: {
        pf: { currentFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" }, previousFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" } },
        gratuity: { currentFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" }, previousFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" } },
        esi: { currentFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" }, previousFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" } },
        nps: { currentFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" }, previousFY: { employeesPercent: "", workersPercent: "", deductedDeposited: "" } },
      },
      q3_accessibilityOfWorkplaces: "",
      q4_equalOpportunityPolicy: { exists: "", details: "" },
      q5_parentalLeaveRates: { permanentEmployees: { male: {}, female: {}, total: {} }, permanentWorkers: { male: {}, female: {}, total: {} } },
      q6_grievancemechanism: { permanentWorkers: "", otherThanPermanentWorkers: "", permanentEmployees: "", otherThanPermanentEmployees: "", details: "" },
      q7_membershipUnions: { currentFY: { employeesMembers: "", employeesPercentUnionised: "", workersMembers: "", workersPercentUnionised: "" }, previousFY: { employeesMembers: "", employeesPercentUnionised: "", workersMembers: "", workersPercentUnionised: "" } },
      q8_trainingDetails: { employees: { currentFY: { totalHours: "", trainedCount: "", healthSafetyPercent: "", skillUpgradationPercent: "" }, previousFY: { totalHours: "", trainedCount: "", healthSafetyPercent: "", skillUpgradationPercent: "" } }, workers: { currentFY: { totalHours: "", trainedCount: "", healthSafetyPercent: "", skillUpgradationPercent: "" }, previousFY: { totalHours: "", trainedCount: "", healthSafetyPercent: "", skillUpgradationPercent: "" } } },
      q9_performanceReviews: { employees: { currentFY: { percentReviewed: "", percentPromoted: "" }, previousFY: { percentReviewed: "", percentPromoted: "" } }, workers: { currentFY: { percentReviewed: "" }, previousFY: { percentReviewed: "" } } },
      q10_healthSafetyManagement: { policyExists: "", safetyOfficer: "", safetyAuditFrequency: "", trainingHoursPerFY: "", certifications: "", emergencyPlan: "" },
      q11_safetyIncidents: { ltifr: { employees: {}, workers: {} }, totalRecordableInjuries: { employees: {}, workers: {} }, fatalities: { employees: {}, workers: {} }, highConsequenceInjuries: { employees: {}, workers: {} } },
      q12_safetyMeasures: "",
      q13_complaintsWorkingConditions: { employees: { filed: "", pending: "", resolved: "", remarks: "" }, workers: { filed: "", pending: "", resolved: "", remarks: "" }, other: { filed: "", pending: "", resolved: "", remarks: "" } },
      q14_assessments: { riskAssessmentConducted: "", frequency: "", thirdPartyAssurance: "", lastAssessmentDate: "", summary: "" },
      q15_correctiveActions: ""
    },
    leadership: {
      q1_lifeInsurance: "",
      q2_statutoryDuesValueChain: "",
      q3_rehabilitation: { programsCount: "", budgetAllocated: "", description: "", employees: { currentFY: { totalAffected: "", rehabilitated: "" }, previousFY: { totalAffected: "", rehabilitated: "" } }, workers: { currentFY: { totalAffected: "", rehabilitated: "" }, previousFY: { totalAffected: "", rehabilitated: "" } } },
      q4_transitionAssistance: { assistanceExists: "", programs: "", budgetAllocated: "", details: "" },
      q5_valueChainAssessment: { assessmentConducted: "", percentSuppliersAssessed: "", correctiveActionsCount: "", lastAssessmentDate: "", notes: "" },
      q6_correctiveActionsValueChain: ""
    }
  }

  const normalize = (raw: any) => {
    if (!raw) return raw
    const copy = { ...(raw as any) }
    copy.essential = copy.essential || {}
    copy.essential.q1a_employeeWellbeing = copy.essential.q1a_employeeWellbeing || JSON.parse(JSON.stringify(defaultData.essential.q1a_employeeWellbeing))
    copy.essential.q1b_workerWellbeing = copy.essential.q1b_workerWellbeing || JSON.parse(JSON.stringify(defaultData.essential.q1b_workerWellbeing))
    copy.essential.q1c_spendingOnWellbeing = copy.essential.q1c_spendingOnWellbeing || { currentFY: "", previousFY: "" }
    copy.essential.q2_retirementBenefits = copy.essential.q2_retirementBenefits || JSON.parse(JSON.stringify(defaultData.essential.q2_retirementBenefits))
    copy.essential.q3_accessibilityOfWorkplaces = typeof copy.essential.q3_accessibilityOfWorkplaces === 'undefined' ? '' : copy.essential.q3_accessibilityOfWorkplaces
    copy.essential.q4_equalOpportunityPolicy = copy.essential.q4_equalOpportunityPolicy || { exists: '', details: '' }
    copy.essential.q5_parentalLeaveRates = copy.essential.q5_parentalLeaveRates || { permanentEmployees: {}, permanentWorkers: {} }
    copy.essential.q6_grievancemechanism = copy.essential.q6_grievancemechanism || { permanentWorkers: '', otherThanPermanentWorkers: '', permanentEmployees: '', otherThanPermanentEmployees: '', details: '' }
    copy.essential.q7_membershipUnions = copy.essential.q7_membershipUnions || { currentFY: { employeesMembers: '', employeesPercentUnionised: '', workersMembers: '', workersPercentUnionised: '' }, previousFY: { employeesMembers: '', employeesPercentUnionised: '', workersMembers: '', workersPercentUnionised: '' } }
    copy.essential.q8_trainingDetails = copy.essential.q8_trainingDetails || { employees: { currentFY: {}, previousFY: {} }, workers: { currentFY: {}, previousFY: {} } }
    copy.essential.q9_performanceReviews = copy.essential.q9_performanceReviews || { employees: { currentFY: {}, previousFY: {} }, workers: { currentFY: {}, previousFY: {} } }
    copy.essential.q10_healthSafetyManagement = copy.essential.q10_healthSafetyManagement || { policyExists: '', safetyOfficer: '', safetyAuditFrequency: '', trainingHoursPerFY: '', certifications: '', emergencyPlan: '' }
    copy.essential.q11_safetyIncidents = copy.essential.q11_safetyIncidents || JSON.parse(JSON.stringify(defaultData.essential.q11_safetyIncidents))
    copy.essential.q13_complaintsWorkingConditions = copy.essential.q13_complaintsWorkingConditions || { employees: { filed: '', pending: '', resolved: '', remarks: '' }, workers: { filed: '', pending: '', resolved: '', remarks: '' }, other: { filed: '', pending: '', resolved: '', remarks: '' } }
    copy.essential.q14_assessments = copy.essential.q14_assessments || { riskAssessmentConducted: '', frequency: '', thirdPartyAssurance: '', lastAssessmentDate: '', summary: '' }
    copy.essential.q12_safetyMeasures = typeof copy.essential.q12_safetyMeasures === 'undefined' ? '' : copy.essential.q12_safetyMeasures
    copy.essential.q15_correctiveActions = typeof copy.essential.q15_correctiveActions === 'undefined' ? '' : copy.essential.q15_correctiveActions

    copy.leadership = copy.leadership || {}
    copy.leadership.q1_lifeInsurance = typeof copy.leadership.q1_lifeInsurance === 'undefined' ? '' : copy.leadership.q1_lifeInsurance
    copy.leadership.q2_statutoryDuesValueChain = typeof copy.leadership.q2_statutoryDuesValueChain === 'undefined' ? '' : copy.leadership.q2_statutoryDuesValueChain
    copy.leadership.q3_rehabilitation = copy.leadership.q3_rehabilitation || { programsCount: '', budgetAllocated: '', description: '', employees: { currentFY: { totalAffected: '', rehabilitated: '' }, previousFY: { totalAffected: '', rehabilitated: '' } }, workers: { currentFY: { totalAffected: '', rehabilitated: '' }, previousFY: { totalAffected: '', rehabilitated: '' } } }
    copy.leadership.q4_transitionAssistance = copy.leadership.q4_transitionAssistance || { assistanceExists: '', programs: '', budgetAllocated: '', details: '' }
    copy.leadership.q5_valueChainAssessment = copy.leadership.q5_valueChainAssessment || { assessmentConducted: '', percentSuppliersAssessed: '', correctiveActionsCount: '', lastAssessmentDate: '', notes: '' }
    copy.leadership.q6_correctiveActionsValueChain = typeof copy.leadership.q6_correctiveActionsValueChain === 'undefined' ? '' : copy.leadership.q6_correctiveActionsValueChain

    return copy
  }

  const [data, setData] = useState<SectionCP3ManualData>(() => normalize({ ...(defaultData as any), ...(initialData as any) }))

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
    const sample: SectionCP3ManualData = {
      essential: {
        q1a_employeeWellbeing: {
          permanentMale: { total: "3424", healthInsurance: { no: "0", percent: "0%" }, accidentInsurance: { no: "3424", percent: "100%" }, maternityBenefits: { no: "NA", percent: "NA" }, paternityBenefits: { no: "NA", percent: "NA" }, dayCare: { no: "NA", percent: "NA" } },
          permanentFemale: { total: "421", healthInsurance: { no: "0", percent: "0%" }, accidentInsurance: { no: "421", percent: "100%" }, maternityBenefits: { no: "421", percent: "100%" }, paternityBenefits: { no: "NA", percent: "NA" }, dayCare: { no: "421", percent: "100%" } },
          permanentTotal: { total: "3845", healthInsurance: { no: "0", percent: "0%" }, accidentInsurance: { no: "3845", percent: "100%" }, maternityBenefits: { no: "421", percent: "10.95%" }, paternityBenefits: { no: "NA", percent: "NA" }, dayCare: { no: "421", percent: "10.95%" } },
          otherMale: "Not Applicable",
          otherFemale: "Not Applicable",
          otherTotal: "Not Applicable"
        },
        q1b_workerWellbeing: JSON.parse(JSON.stringify(defaultData.essential.q1b_workerWellbeing)),
        q1c_spendingOnWellbeing: { currentFY: "1,234,567", previousFY: "1,200,000" },
        q2_retirementBenefits: JSON.parse(JSON.stringify(defaultData.essential.q2_retirementBenefits)),
        q3_accessibilityOfWorkplaces: "Wheelchair ramps and accessible washrooms across main facilities.",
        q4_equalOpportunityPolicy: { exists: "Yes", details: "Equal opportunity policy in place and disclosed in annual report." },
        q5_parentalLeaveRates: defaultData.essential.q5_parentalLeaveRates,
        q6_grievancemechanism: { permanentWorkers: "Yes", otherThanPermanentWorkers: "Yes", permanentEmployees: "Yes", otherThanPermanentEmployees: "Yes", details: "Mechanism includes helpline and online portal." },
        q7_membershipUnions: { currentFY: { employeesMembers: "1024", employeesPercentUnionised: "15%", workersMembers: "512", workersPercentUnionised: "8%" }, previousFY: { employeesMembers: "980", employeesPercentUnionised: "14%", workersMembers: "480", workersPercentUnionised: "7%" } },
        q8_trainingDetails: { employees: { currentFY: { totalHours: "12500", trainedCount: "3200", healthSafetyPercent: "85%", skillUpgradationPercent: "40%" }, previousFY: { totalHours: "12000", trainedCount: "3100", healthSafetyPercent: "80%", skillUpgradationPercent: "38%" } }, workers: { currentFY: { totalHours: "6500", trainedCount: "1800", healthSafetyPercent: "75%", skillUpgradationPercent: "25%" }, previousFY: { totalHours: "6000", trainedCount: "1700", healthSafetyPercent: "70%", skillUpgradationPercent: "20%" } } },
        q9_performanceReviews: { employees: { currentFY: { percentReviewed: "92%", percentPromoted: "8%" }, previousFY: { percentReviewed: "90%", percentPromoted: "7%" } }, workers: { currentFY: { percentReviewed: "60%" }, previousFY: { percentReviewed: "58%" } } },
        q10_healthSafetyManagement: { policyExists: "Yes", safetyOfficer: "Yes", safetyAuditFrequency: "Quarterly", trainingHoursPerFY: "5000", certifications: "ISO 45001", emergencyPlan: "Yes" },
        q11_safetyIncidents: JSON.parse(JSON.stringify(defaultData.essential.q11_safetyIncidents)),
        q12_safetyMeasures: "Regular safety audits and trainings",
        q13_complaintsWorkingConditions: { employees: { filed: "12", pending: "2", resolved: "10", remarks: "Minor issues" }, workers: { filed: "5", pending: "1", resolved: "4", remarks: "Handled" }, other: { filed: "0", pending: "0", resolved: "0", remarks: "" } },
        q14_assessments: { riskAssessmentConducted: "Yes", frequency: "Annual", thirdPartyAssurance: "Yes", lastAssessmentDate: "2024-11-01", summary: "Annual risk assessment conducted with third-party assurance." },
        q15_correctiveActions: "Implemented corrective actions for identified safety gaps."
      },
      leadership: {
        q1_lifeInsurance: "Life insurance coverage extended to employees in core locations.",
        q2_statutoryDuesValueChain: "Suppliers required to comply with statutory dues validation.",
        q3_rehabilitation: { programsCount: "3", budgetAllocated: "₹2,500,000", description: "Rehabilitation programs include reskilling and placement support for affected workers.", employees: { currentFY: { totalAffected: "12", rehabilitated: "10" }, previousFY: { totalAffected: "8", rehabilitated: "6" } }, workers: { currentFY: { totalAffected: "6", rehabilitated: "5" }, previousFY: { totalAffected: "4", rehabilitated: "3" } } },
        q4_transitionAssistance: { assistanceExists: "Yes", programs: "Reskilling & placement", budgetAllocated: "₹1,000,000", details: "Transition assistance for displaced workers includes reskilling, counselling, and placement support." },
        q5_valueChainAssessment: { assessmentConducted: "Yes", percentSuppliersAssessed: "65%", correctiveActionsCount: "5", lastAssessmentDate: "2024-10-15", notes: "Assessments focused on statutory compliance and worker safety." },
        q6_correctiveActionsValueChain: "Corrective actions implemented for non-compliant suppliers."
      }
    }
    setData(sample)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `section_c_p3_manual.json`
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
            <CardTitle className="text-emerald-400">Section C - Principle 3 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential indicators for Principle 3 (Human Capital)</CardDescription>
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
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1a: Employee Wellbeing (Permanent)</h3>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Permanent - Male Total</Label>
              <Input placeholder="Total" value={data.essential.q1a_employeeWellbeing.permanentMale.total} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing','permanentMale','total'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Permanent - Female Total</Label>
              <Input placeholder="Total" value={data.essential.q1a_employeeWellbeing.permanentFemale.total} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing','permanentFemale','total'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Permanent - Total</Label>
              <Input placeholder="Total" value={data.essential.q1a_employeeWellbeing.permanentTotal.total} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing','permanentTotal','total'], e.target.value)} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3">
            {(['permanentMale','permanentFemale','permanentTotal'] as const).map((grp) => (
              <div key={grp} className="bg-slate-700 p-3 rounded">
                <h4 className="text-sm font-semibold text-slate-200">{grp}</h4>
                <Label className="text-slate-300 mt-2">Health Insurance - No</Label>
                <Input placeholder="No" value={(data.essential.q1a_employeeWellbeing as any)[grp].healthInsurance.no} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'healthInsurance','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Health Insurance - %</Label>
                <Input placeholder="%" value={(data.essential.q1a_employeeWellbeing as any)[grp].healthInsurance.percent} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'healthInsurance','percent'], e.target.value)} className="mt-1" />

                <Label className="text-slate-300 mt-2">Accident Insurance - No</Label>
                <Input placeholder="No" value={(data.essential.q1a_employeeWellbeing as any)[grp].accidentInsurance.no} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'accidentInsurance','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Accident Insurance - %</Label>
                <Input placeholder="%" value={(data.essential.q1a_employeeWellbeing as any)[grp].accidentInsurance.percent} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'accidentInsurance','percent'], e.target.value)} className="mt-1" />

                <Label className="text-slate-300 mt-2">Maternity Benefits - No</Label>
                <Input placeholder="No" value={(data.essential.q1a_employeeWellbeing as any)[grp].maternityBenefits?.no || ''} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'maternityBenefits','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Maternity Benefits - %</Label>
                <Input placeholder="%" value={(data.essential.q1a_employeeWellbeing as any)[grp].maternityBenefits?.percent || ''} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'maternityBenefits','percent'], e.target.value)} className="mt-1" />

                <Label className="text-slate-300 mt-2">Paternity Benefits - No</Label>
                <Input placeholder="No" value={(data.essential.q1a_employeeWellbeing as any)[grp].paternityBenefits?.no || ''} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'paternityBenefits','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Paternity Benefits - %</Label>
                <Input placeholder="%" value={(data.essential.q1a_employeeWellbeing as any)[grp].paternityBenefits?.percent || ''} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'paternityBenefits','percent'], e.target.value)} className="mt-1" />

                <Label className="text-slate-300 mt-2">Day Care - No</Label>
                <Input placeholder="No" value={(data.essential.q1a_employeeWellbeing as any)[grp].dayCare?.no || ''} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'dayCare','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Day Care - %</Label>
                <Input placeholder="%" value={(data.essential.q1a_employeeWellbeing as any)[grp].dayCare?.percent || ''} onChange={(e) => setSimpleField(['essential','q1a_employeeWellbeing', String(grp),'dayCare','percent'], e.target.value)} className="mt-1" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1b: Worker Wellbeing</h3>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Permanent - Male Total</Label>
              <Input placeholder="Total" value={data.essential.q1b_workerWellbeing.permanentMale.total} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing','permanentMale','total'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Permanent - Female Total</Label>
              <Input placeholder="Total" value={data.essential.q1b_workerWellbeing.permanentFemale.total} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing','permanentFemale','total'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Permanent - Total</Label>
              <Input placeholder="Total" value={data.essential.q1b_workerWellbeing.permanentTotal.total} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing','permanentTotal','total'], e.target.value)} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3">
            {(['permanentMale','permanentFemale','permanentTotal'] as const).map((grp) => (
              <div key={grp} className="bg-slate-700 p-3 rounded">
                <h4 className="text-sm font-semibold text-slate-200">{grp}</h4>
                <Label className="text-slate-300 mt-2">Health Insurance - No</Label>
                <Input placeholder="No" value={(data.essential.q1b_workerWellbeing as any)[grp].healthInsurance.no} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing', String(grp),'healthInsurance','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Health Insurance - %</Label>
                <Input placeholder="%" value={(data.essential.q1b_workerWellbeing as any)[grp].healthInsurance.percent} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing', String(grp),'healthInsurance','percent'], e.target.value)} className="mt-1" />

                <Label className="text-slate-300 mt-2">Accident Insurance - No</Label>
                <Input placeholder="No" value={(data.essential.q1b_workerWellbeing as any)[grp].accidentInsurance.no} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing', String(grp),'accidentInsurance','no'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Accident Insurance - %</Label>
                <Input placeholder="%" value={(data.essential.q1b_workerWellbeing as any)[grp].accidentInsurance.percent} onChange={(e) => setSimpleField(['essential','q1b_workerWellbeing', String(grp),'accidentInsurance','percent'], e.target.value)} className="mt-1" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1c: Spending on Wellbeing</h3>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Current FY</Label>
              <Input placeholder="Amount" value={data.essential.q1c_spendingOnWellbeing.currentFY} onChange={(e) => setSimpleField(['essential','q1c_spendingOnWellbeing','currentFY'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Previous FY</Label>
              <Input placeholder="Amount" value={data.essential.q1c_spendingOnWellbeing.previousFY} onChange={(e) => setSimpleField(['essential','q1c_spendingOnWellbeing','previousFY'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q4: Equal Opportunity Policy</h3>
          <div className="grid grid-cols-1 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Policy Exists</Label>
              <Input placeholder="Yes/No" value={data.essential.q4_equalOpportunityPolicy.exists} onChange={(e) => setSimpleField(['essential','q4_equalOpportunityPolicy','exists'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Details</Label>
              <Textarea placeholder="Details" value={data.essential.q4_equalOpportunityPolicy.details} onChange={(e) => setSimpleField(['essential','q4_equalOpportunityPolicy','details'], e.target.value)} className="min-h-16 mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Retirement Benefits (PF / Gratuity / ESI / NPS)</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['pf','gratuity','esi','nps'] as const).map((scheme) => (
              <div key={scheme} className="bg-slate-700 p-3 rounded">
                <h4 className="text-sm font-semibold text-slate-200">{scheme.toUpperCase()}</h4>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div>
                    <Label className="text-slate-300">Current FY - Employees %</Label>
                    <Input placeholder="%" value={(data.essential.q2_retirementBenefits as any)[scheme].currentFY.employeesPercent} onChange={(e) => setSimpleField(['essential','q2_retirementBenefits', String(scheme),'currentFY','employeesPercent'], e.target.value)} className="mt-1" />
                    <Label className="text-slate-300 mt-2">Current FY - Workers %</Label>
                    <Input placeholder="%" value={(data.essential.q2_retirementBenefits as any)[scheme].currentFY.workersPercent} onChange={(e) => setSimpleField(['essential','q2_retirementBenefits', String(scheme),'currentFY','workersPercent'], e.target.value)} className="mt-1" />
                    <Label className="text-slate-300 mt-2">Current FY - Deducted/Deposited</Label>
                    <Input placeholder="Amount" value={(data.essential.q2_retirementBenefits as any)[scheme].currentFY.deductedDeposited} onChange={(e) => setSimpleField(['essential','q2_retirementBenefits', String(scheme),'currentFY','deductedDeposited'], e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Previous FY - Employees %</Label>
                    <Input placeholder="%" value={(data.essential.q2_retirementBenefits as any)[scheme].previousFY.employeesPercent} onChange={(e) => setSimpleField(['essential','q2_retirementBenefits', String(scheme),'previousFY','employeesPercent'], e.target.value)} className="mt-1" />
                    <Label className="text-slate-300 mt-2">Previous FY - Workers %</Label>
                    <Input placeholder="%" value={(data.essential.q2_retirementBenefits as any)[scheme].previousFY.workersPercent} onChange={(e) => setSimpleField(['essential','q2_retirementBenefits', String(scheme),'previousFY','workersPercent'], e.target.value)} className="mt-1" />
                    <Label className="text-slate-300 mt-2">Previous FY - Deducted/Deposited</Label>
                    <Input placeholder="Amount" value={(data.essential.q2_retirementBenefits as any)[scheme].previousFY.deductedDeposited} onChange={(e) => setSimpleField(['essential','q2_retirementBenefits', String(scheme),'previousFY','deductedDeposited'], e.target.value)} className="mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Accessibility of Workplaces</h3>
          <Textarea placeholder="Accessibility measures" value={data.essential.q3_accessibilityOfWorkplaces} onChange={(e) => setSimpleField(['essential','q3_accessibilityOfWorkplaces'], e.target.value)} className="min-h-16 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q5: Parental Leave Rates</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Permanent Employees</h4>
              {(['male','female','total'] as const).map((g) => (
                <div key={g} className="mt-2">
                  <Label className="text-slate-300">{g} - Return to Work Rate</Label>
                  <Input value={(data.essential.q5_parentalLeaveRates as any).permanentEmployees[g]?.returnToWorkRate || ''} onChange={(e) => setSimpleField(['essential','q5_parentalLeaveRates','permanentEmployees', String(g),'returnToWorkRate'], e.target.value)} className="mt-1" />
                  <Label className="text-slate-300 mt-2">{g} - Retention Rate</Label>
                  <Input value={(data.essential.q5_parentalLeaveRates as any).permanentEmployees[g]?.retentionRate || ''} onChange={(e) => setSimpleField(['essential','q5_parentalLeaveRates','permanentEmployees', String(g),'retentionRate'], e.target.value)} className="mt-1" />
                </div>
              ))}
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Permanent Workers</h4>
              {(['male','female','total'] as const).map((g) => (
                <div key={g} className="mt-2">
                  <Label className="text-slate-300">{g} - Return to Work Rate</Label>
                  <Input value={(data.essential.q5_parentalLeaveRates as any).permanentWorkers[g]?.returnToWorkRate || ''} onChange={(e) => setSimpleField(['essential','q5_parentalLeaveRates','permanentWorkers', String(g),'returnToWorkRate'], e.target.value)} className="mt-1" />
                  <Label className="text-slate-300 mt-2">{g} - Retention Rate</Label>
                  <Input value={(data.essential.q5_parentalLeaveRates as any).permanentWorkers[g]?.retentionRate || ''} onChange={(e) => setSimpleField(['essential','q5_parentalLeaveRates','permanentWorkers', String(g),'retentionRate'], e.target.value)} className="mt-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q6: Grievance Mechanism</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-slate-300">Permanent Workers</Label>
              <Input placeholder="Yes/No or details" value={data.essential.q6_grievancemechanism.permanentWorkers} onChange={(e) => setSimpleField(['essential','q6_grievancemechanism','permanentWorkers'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Other than Permanent Workers</Label>
              <Input placeholder="Yes/No or details" value={data.essential.q6_grievancemechanism.otherThanPermanentWorkers} onChange={(e) => setSimpleField(['essential','q6_grievancemechanism','otherThanPermanentWorkers'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Permanent Employees</Label>
              <Input placeholder="Yes/No or details" value={data.essential.q6_grievancemechanism.permanentEmployees} onChange={(e) => setSimpleField(['essential','q6_grievancemechanism','permanentEmployees'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Other than Permanent Employees</Label>
              <Input placeholder="Yes/No or details" value={data.essential.q6_grievancemechanism.otherThanPermanentEmployees} onChange={(e) => setSimpleField(['essential','q6_grievancemechanism','otherThanPermanentEmployees'], e.target.value)} className="mt-1" />
            </div>
          </div>
          <Label className="text-slate-300 mt-2">Details</Label>
          <Textarea placeholder="Details" value={data.essential.q6_grievancemechanism.details} onChange={(e) => setSimpleField(['essential','q6_grievancemechanism','details'], e.target.value)} className="min-h-16 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q7: Membership / Unions</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Current FY</h4>
              <Label className="text-slate-300 mt-2">Employees - Members</Label>
              <Input value={(data.essential.q7_membershipUnions.currentFY as any).employeesMembers || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','currentFY','employeesMembers'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Employees - % Unionised</Label>
              <Input value={(data.essential.q7_membershipUnions.currentFY as any).employeesPercentUnionised || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','currentFY','employeesPercentUnionised'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Workers - Members</Label>
              <Input value={(data.essential.q7_membershipUnions.currentFY as any).workersMembers || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','currentFY','workersMembers'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Workers - % Unionised</Label>
              <Input value={(data.essential.q7_membershipUnions.currentFY as any).workersPercentUnionised || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','currentFY','workersPercentUnionised'], e.target.value)} className="mt-1" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Previous FY</h4>
              <Label className="text-slate-300 mt-2">Employees - Members</Label>
              <Input value={(data.essential.q7_membershipUnions.previousFY as any).employeesMembers || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','previousFY','employeesMembers'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Employees - % Unionised</Label>
              <Input value={(data.essential.q7_membershipUnions.previousFY as any).employeesPercentUnionised || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','previousFY','employeesPercentUnionised'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Workers - Members</Label>
              <Input value={(data.essential.q7_membershipUnions.previousFY as any).workersMembers || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','previousFY','workersMembers'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Workers - % Unionised</Label>
              <Input value={(data.essential.q7_membershipUnions.previousFY as any).workersPercentUnionised || ''} onChange={(e) => setSimpleField(['essential','q7_membershipUnions','previousFY','workersPercentUnionised'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q8: Training Details</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Employees</h4>
              <Label className="text-slate-300 mt-2">Current FY - Total Training Hours</Label>
              <Input value={data.essential.q8_trainingDetails?.employees?.currentFY?.totalHours || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','employees','currentFY','totalHours'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - Trained Count</Label>
              <Input value={data.essential.q8_trainingDetails?.employees?.currentFY?.trainedCount || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','employees','currentFY','trainedCount'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - Health & Safety %</Label>
              <Input value={data.essential.q8_trainingDetails?.employees?.currentFY?.healthSafetyPercent || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','employees','currentFY','healthSafetyPercent'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - Skill Upgradation %</Label>
              <Input value={data.essential.q8_trainingDetails?.employees?.currentFY?.skillUpgradationPercent || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','employees','currentFY','skillUpgradationPercent'], e.target.value)} className="mt-1" />

              <Label className="text-slate-300 mt-4">Previous FY - Total Training Hours</Label>
              <Input value={data.essential.q8_trainingDetails?.employees?.previousFY?.totalHours || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','employees','previousFY','totalHours'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Previous FY - Trained Count</Label>
              <Input value={data.essential.q8_trainingDetails?.employees?.previousFY?.trainedCount || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','employees','previousFY','trainedCount'], e.target.value)} className="mt-1" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Workers</h4>
              <Label className="text-slate-300 mt-2">Current FY - Total Training Hours</Label>
              <Input value={data.essential.q8_trainingDetails?.workers?.currentFY?.totalHours || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','workers','currentFY','totalHours'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - Trained Count</Label>
              <Input value={data.essential.q8_trainingDetails?.workers?.currentFY?.trainedCount || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','workers','currentFY','trainedCount'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - Health & Safety %</Label>
              <Input value={data.essential.q8_trainingDetails?.workers?.currentFY?.healthSafetyPercent || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','workers','currentFY','healthSafetyPercent'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - Skill Upgradation %</Label>
              <Input value={data.essential.q8_trainingDetails?.workers?.currentFY?.skillUpgradationPercent || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','workers','currentFY','skillUpgradationPercent'], e.target.value)} className="mt-1" />

              <Label className="text-slate-300 mt-4">Previous FY - Total Training Hours</Label>
              <Input value={data.essential.q8_trainingDetails?.workers?.previousFY?.totalHours || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','workers','previousFY','totalHours'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Previous FY - Trained Count</Label>
              <Input value={data.essential.q8_trainingDetails?.workers?.previousFY?.trainedCount || ''} onChange={(e) => setSimpleField(['essential','q8_trainingDetails','workers','previousFY','trainedCount'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q9: Performance Reviews</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Employees</h4>
              <Label className="text-slate-300 mt-2">Current FY - % Reviewed</Label>
              <Input value={data.essential.q9_performanceReviews?.employees?.currentFY?.percentReviewed || ''} onChange={(e) => setSimpleField(['essential','q9_performanceReviews','employees','currentFY','percentReviewed'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Current FY - % Promoted</Label>
              <Input value={data.essential.q9_performanceReviews?.employees?.currentFY?.percentPromoted || ''} onChange={(e) => setSimpleField(['essential','q9_performanceReviews','employees','currentFY','percentPromoted'], e.target.value)} className="mt-1" />

              <Label className="text-slate-300 mt-4">Previous FY - % Reviewed</Label>
              <Input value={data.essential.q9_performanceReviews?.employees?.previousFY?.percentReviewed || ''} onChange={(e) => setSimpleField(['essential','q9_performanceReviews','employees','previousFY','percentReviewed'], e.target.value)} className="mt-1" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Workers</h4>
              <Label className="text-slate-300 mt-2">Current FY - % Reviewed</Label>
              <Input value={data.essential.q9_performanceReviews?.workers?.currentFY?.percentReviewed || ''} onChange={(e) => setSimpleField(['essential','q9_performanceReviews','workers','currentFY','percentReviewed'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-4">Previous FY - % Reviewed</Label>
              <Input value={data.essential.q9_performanceReviews?.workers?.previousFY?.percentReviewed || ''} onChange={(e) => setSimpleField(['essential','q9_performanceReviews','workers','previousFY','percentReviewed'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q10: Health & Safety Management</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-slate-300">Policy Exists (Yes/No)</Label>
              <Input value={data.essential.q10_healthSafetyManagement?.policyExists || ''} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','policyExists'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Safety Officer Present (Yes/No)</Label>
              <Input value={data.essential.q10_healthSafetyManagement?.safetyOfficer || ''} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','safetyOfficer'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Audit Frequency</Label>
              <Input value={data.essential.q10_healthSafetyManagement?.safetyAuditFrequency || ''} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','safetyAuditFrequency'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Training Hours per FY</Label>
              <Input value={data.essential.q10_healthSafetyManagement?.trainingHoursPerFY || ''} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','trainingHoursPerFY'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Certifications</Label>
              <Input value={data.essential.q10_healthSafetyManagement?.certifications || ''} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','certifications'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Emergency Plan (Yes/No)</Label>
              <Input value={data.essential.q10_healthSafetyManagement?.emergencyPlan || ''} onChange={(e) => setSimpleField(['essential','q10_healthSafetyManagement','emergencyPlan'], e.target.value)} className="mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Complaints & Working Conditions - Q13</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Employees</h4>
              <Label className="text-slate-300 mt-2">Filed</Label>
              <Input value={data.essential.q13_complaintsWorkingConditions?.employees?.filed || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','employees','filed'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Pending</Label>
              <Input value={data.essential.q13_complaintsWorkingConditions?.employees?.pending || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','employees','pending'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Resolved</Label>
              <Input value={data.essential.q13_complaintsWorkingConditions?.employees?.resolved || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','employees','resolved'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Remarks</Label>
              <Textarea value={data.essential.q13_complaintsWorkingConditions?.employees?.remarks || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','employees','remarks'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div className="bg-slate-700 p-3 rounded">
              <h4 className="text-sm font-semibold text-slate-200">Workers</h4>
              <Label className="text-slate-300 mt-2">Filed</Label>
              <Input value={data.essential.q13_complaintsWorkingConditions?.workers?.filed || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','workers','filed'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Pending</Label>
              <Input value={data.essential.q13_complaintsWorkingConditions?.workers?.pending || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','workers','pending'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Resolved</Label>
              <Input value={data.essential.q13_complaintsWorkingConditions?.workers?.resolved || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','workers','resolved'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Remarks</Label>
              <Textarea value={data.essential.q13_complaintsWorkingConditions?.workers?.remarks || ''} onChange={(e) => setSimpleField(['essential','q13_complaintsWorkingConditions','workers','remarks'], e.target.value)} className="min-h-16 mt-1" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Assessments - Q14</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <Label className="text-slate-300">Risk Assessment Conducted (Yes/No)</Label>
              <Input value={data.essential.q14_assessments?.riskAssessmentConducted || ''} onChange={(e) => setSimpleField(['essential','q14_assessments','riskAssessmentConducted'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Frequency</Label>
              <Input value={data.essential.q14_assessments?.frequency || ''} onChange={(e) => setSimpleField(['essential','q14_assessments','frequency'], e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Third-party Assurance (Yes/No)</Label>
              <Input value={data.essential.q14_assessments?.thirdPartyAssurance || ''} onChange={(e) => setSimpleField(['essential','q14_assessments','thirdPartyAssurance'], e.target.value)} className="mt-1" />
              <Label className="text-slate-300 mt-2">Last Assessment Date</Label>
              <Input value={data.essential.q14_assessments?.lastAssessmentDate || ''} onChange={(e) => setSimpleField(['essential','q14_assessments','lastAssessmentDate'], e.target.value)} className="mt-1" />
            </div>
          </div>
          <Label className="text-slate-300 mt-2">Summary</Label>
          <Textarea value={data.essential.q14_assessments?.summary || ''} onChange={(e) => setSimpleField(['essential','q14_assessments','summary'], e.target.value)} className="min-h-16 mt-1" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Corrective Actions - Q15</h3>
          <Textarea placeholder="Corrective actions" value={data.essential.q15_correctiveActions} onChange={(e) => setSimpleField(['essential','q15_correctiveActions'], e.target.value)} className="min-h-16 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q11: Safety Incidents</h3>
          {(['ltifr','totalRecordableInjuries','fatalities','highConsequenceInjuries'] as const).map((metric) => (
            <div key={metric} className="bg-slate-700 p-3 rounded mt-2">
              <h4 className="text-sm font-semibold text-slate-200">{metric}</h4>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <Label className="text-slate-300">Employees - Current FY</Label>
                  <Input value={(data.essential.q11_safetyIncidents as any)[metric]?.employees?.currentFY || ''} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents', String(metric),'employees','currentFY'], e.target.value)} className="mt-1" />
                  <Label className="text-slate-300 mt-2">Employees - Previous FY</Label>
                  <Input value={(data.essential.q11_safetyIncidents as any)[metric]?.employees?.previousFY || ''} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents', String(metric),'employees','previousFY'], e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Workers - Current FY</Label>
                  <Input value={(data.essential.q11_safetyIncidents as any)[metric]?.workers?.currentFY || ''} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents', String(metric),'workers','currentFY'], e.target.value)} className="mt-1" />
                  <Label className="text-slate-300 mt-2">Workers - Previous FY</Label>
                  <Input value={(data.essential.q11_safetyIncidents as any)[metric]?.workers?.previousFY || ''} onChange={(e) => setSimpleField(['essential','q11_safetyIncidents', String(metric),'workers','previousFY'], e.target.value)} className="mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q12: Safety Measures</h3>
          <Textarea placeholder="Safety measures" value={data.essential.q12_safetyMeasures} onChange={(e) => setSimpleField(['essential','q12_safetyMeasures'], e.target.value)} className="min-h-16 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership</h3>
          <div className="grid grid-cols-1 gap-3 mt-2">
            <div>
              <Label className="text-slate-300">Life Insurance / Benefits (Leadership Q1)</Label>
              <Textarea placeholder="Life insurance summary" value={data.leadership.q1_lifeInsurance} onChange={(e) => setSimpleField(['leadership','q1_lifeInsurance'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Statutory Dues - Value Chain (Leadership Q2)</Label>
              <Textarea placeholder="Statutory dues enforcement in value chain" value={data.leadership.q2_statutoryDuesValueChain} onChange={(e) => setSimpleField(['leadership','q2_statutoryDuesValueChain'], e.target.value)} className="min-h-16 mt-1" />
            </div>
            <div>
              <Label className="text-slate-300">Transition Assistance (Leadership Q4)</Label>
              <div className="grid grid-cols-1 gap-2 mt-2 bg-slate-800 p-2 rounded">
                <Label className="text-slate-300">Assistance Exists (Yes/No)</Label>
                <Input value={(data.leadership.q4_transitionAssistance as any)?.assistanceExists || ''} onChange={(e) => setSimpleField(['leadership','q4_transitionAssistance','assistanceExists'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Programs</Label>
                <Input value={(data.leadership.q4_transitionAssistance as any)?.programs || ''} onChange={(e) => setSimpleField(['leadership','q4_transitionAssistance','programs'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Budget Allocated</Label>
                <Input value={(data.leadership.q4_transitionAssistance as any)?.budgetAllocated || ''} onChange={(e) => setSimpleField(['leadership','q4_transitionAssistance','budgetAllocated'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Details</Label>
                <Textarea value={(data.leadership.q4_transitionAssistance as any)?.details || ''} onChange={(e) => setSimpleField(['leadership','q4_transitionAssistance','details'], e.target.value)} className="min-h-16 mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label className="text-slate-300">Rehabilitation - Programs Count (Leadership Q3)</Label>
                <Input value={(data.leadership.q3_rehabilitation as any)?.programsCount || ''} onChange={(e) => setSimpleField(['leadership','q3_rehabilitation','programsCount'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Rehabilitation - Budget Allocated</Label>
                <Input value={(data.leadership.q3_rehabilitation as any)?.budgetAllocated || ''} onChange={(e) => setSimpleField(['leadership','q3_rehabilitation','budgetAllocated'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Rehabilitation - Description</Label>
                <Textarea value={(data.leadership.q3_rehabilitation as any)?.description || ''} onChange={(e) => setSimpleField(['leadership','q3_rehabilitation','description'], e.target.value)} className="min-h-16 mt-1" />
              </div>
              <div>
                <Label className="text-slate-300">Value Chain Assessment - Conducted (Leadership Q5)</Label>
                <Input value={(data.leadership.q5_valueChainAssessment as any)?.assessmentConducted || ''} onChange={(e) => setSimpleField(['leadership','q5_valueChainAssessment','assessmentConducted'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">% Suppliers Assessed</Label>
                <Input value={(data.leadership.q5_valueChainAssessment as any)?.percentSuppliersAssessed || ''} onChange={(e) => setSimpleField(['leadership','q5_valueChainAssessment','percentSuppliersAssessed'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Corrective Actions Count</Label>
                <Input value={(data.leadership.q5_valueChainAssessment as any)?.correctiveActionsCount || ''} onChange={(e) => setSimpleField(['leadership','q5_valueChainAssessment','correctiveActionsCount'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Last Assessment Date</Label>
                <Input value={(data.leadership.q5_valueChainAssessment as any)?.lastAssessmentDate || ''} onChange={(e) => setSimpleField(['leadership','q5_valueChainAssessment','lastAssessmentDate'], e.target.value)} className="mt-1" />
                <Label className="text-slate-300 mt-2">Notes</Label>
                <Textarea value={(data.leadership.q5_valueChainAssessment as any)?.notes || ''} onChange={(e) => setSimpleField(['leadership','q5_valueChainAssessment','notes'], e.target.value)} className="min-h-16 mt-1" />
              </div>
            </div>
            <div>
              <Label className="text-slate-300">Corrective Actions - Value Chain (Leadership Q6)</Label>
              <Textarea placeholder="Corrective actions" value={data.leadership.q6_correctiveActionsValueChain} onChange={(e) => setSimpleField(['leadership','q6_correctiveActionsValueChain'], e.target.value)} className="min-h-16 mt-1" />
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
