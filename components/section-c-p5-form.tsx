"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface YearPair { currentFY: string; previousFY: string }

interface TrainingGroup { total: string; covered: string; percentage: string }

interface MinWageEntry { currentFY: { total: string; equalToMinWage: { no: string; percent: string }; moreThanMinWage: { no: string; percent: string } }; previousFY: { total: string; equalToMinWage: { no: string; percent: string }; moreThanMinWage: { no: string; percent: string } } }

interface ComplaintDetail { filed: string; pending: string; remarks: string }

interface P5Complaints {
  sexualHarassment: { currentFY: ComplaintDetail; previousFY: ComplaintDetail }
  discriminationAtWorkplace: { currentFY: ComplaintDetail; previousFY: ComplaintDetail }
  childLabour: { currentFY: ComplaintDetail; previousFY: ComplaintDetail }
  forcedLabour: { currentFY: ComplaintDetail; previousFY: ComplaintDetail }
  wages: { currentFY: ComplaintDetail; previousFY: ComplaintDetail }
  otherHumanRights: { currentFY: ComplaintDetail; previousFY: ComplaintDetail }
}

interface P5PoshComplaints { totalComplaints: YearPair; complaintsAsPercentFemale: YearPair; complaintsUpheld: YearPair }

interface P5Assessments { childLabour: string; forcedInvoluntaryLabour: string; sexualHarassment: string; discriminationAtWorkplace: string; wages: string; othersSpecify: string }

interface P5ValueChainAssessment { sexualHarassment: string; discriminationAtWorkplace: string; childLabour: string; forcedLabourInvoluntaryLabour: string; wages: string; othersSpecify: string }

interface SectionCP5ManualData {
  essential: {
    q1_humanRightsTraining: { employees: { permanent: TrainingGroup; otherThanPermanent: TrainingGroup; totalEmployees: TrainingGroup }; workers: { permanent: TrainingGroup; otherThanPermanent: TrainingGroup; totalWorkers: TrainingGroup } }
    q2_minimumWages: { employees: any; workers: any }
    q3_medianRemuneration: any
    q3a_grossWagesFemales: YearPair
    q4_focalPointHumanRights: string
    q5_grievanceMechanisms: string
    q6_complaints: P5Complaints
    q7_poshComplaints: P5PoshComplaints
    q8_mechanismsPreventAdverseConsequences: string
    q9_humanRightsInContracts: string
    q10_assessments: P5Assessments
    q11_correctiveActions: string
  }
  leadership: {
    q1_businessProcessModified: string
    q2_humanRightsDueDiligence: string
    q3_accessibilityDifferentlyAbled: string
    q4_valueChainAssessment: P5ValueChainAssessment
    q5_correctiveActionsValueChain: string
  }
} 

interface SectionCP5FormProps {
  onDataChange?: (data: SectionCP5ManualData) => void
  initialData?: Partial<SectionCP5ManualData>
}

export function SectionCP5Form({ onDataChange, initialData }: SectionCP5FormProps) {
  const defaultData: SectionCP5ManualData = {
    essential: {
      q1_humanRightsTraining: {
        employees: { permanent: { total: "", covered: "", percentage: "" }, otherThanPermanent: { total: "", covered: "", percentage: "" }, totalEmployees: { total: "", covered: "", percentage: "" } },
        workers: { permanent: { total: "", covered: "", percentage: "" }, otherThanPermanent: { total: "", covered: "", percentage: "" }, totalWorkers: { total: "", covered: "", percentage: "" } },
      },
      q2_minimumWages: {
        employees: {
          permanent: {
            male: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } },
            female: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } }
          },
          otherThanPermanent: {
            male: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } },
            female: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } }
          }
        },
        workers: {
          permanent: {
            male: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } },
            female: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } }
          },
          otherThanPermanent: {
            male: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } },
            female: { currentFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } }, previousFY: { total: "", equalToMinWage: { no: "", percent: "" }, moreThanMinWage: { no: "", percent: "" } } }
          }
        }
      },
      q3_medianRemuneration: {
        boardOfDirectors: { male: { number: "", median: "" }, female: { number: "", median: "" } },
        keyManagerialPersonnel: { male: { number: "", median: "" }, female: { number: "", median: "" } },
        employeesOtherThanBoDAndKMP: { male: { number: "", median: "" }, female: { number: "", median: "" } },
        workers: { male: { number: "", median: "" }, female: { number: "", median: "" } }
      },
      q3a_grossWagesFemales: { currentFY: "", previousFY: "" },
      q4_focalPointHumanRights: "",
      q5_grievanceMechanisms: "",
      q6_complaints: {
        sexualHarassment: { currentFY: { filed: "", pending: "", remarks: "" }, previousFY: { filed: "", pending: "", remarks: "" } },
        discriminationAtWorkplace: { currentFY: { filed: "", pending: "", remarks: "" }, previousFY: { filed: "", pending: "", remarks: "" } },
        childLabour: { currentFY: { filed: "", pending: "", remarks: "" }, previousFY: { filed: "", pending: "", remarks: "" } },
        forcedLabour: { currentFY: { filed: "", pending: "", remarks: "" }, previousFY: { filed: "", pending: "", remarks: "" } },
        wages: { currentFY: { filed: "", pending: "", remarks: "" }, previousFY: { filed: "", pending: "", remarks: "" } },
        otherHumanRights: { currentFY: { filed: "", pending: "", remarks: "" }, previousFY: { filed: "", pending: "", remarks: "" } },
      },
      q7_poshComplaints: { totalComplaints: { currentFY: "", previousFY: "" }, complaintsAsPercentFemale: { currentFY: "", previousFY: "" }, complaintsUpheld: { currentFY: "", previousFY: "" } },
      q8_mechanismsPreventAdverseConsequences: "",
      q9_humanRightsInContracts: "",
      q10_assessments: { childLabour: "", forcedInvoluntaryLabour: "", sexualHarassment: "", discriminationAtWorkplace: "", wages: "", othersSpecify: "" },
      q11_correctiveActions: "",
    },
    leadership: {
      q1_businessProcessModified: "",
      q2_humanRightsDueDiligence: "",
      q3_accessibilityDifferentlyAbled: "",
      q4_valueChainAssessment: { sexualHarassment: "", discriminationAtWorkplace: "", childLabour: "", forcedLabourInvoluntaryLabour: "", wages: "", othersSpecify: "" },
      q5_correctiveActionsValueChain: "",
    },
  }

  const [data, setData] = useState<SectionCP5ManualData>(() => ({ ...(defaultData as any), ...(initialData as any) }))

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

  const handleAutoFill = () => {
    const sample: SectionCP5ManualData = {
      essential: {
        q1_humanRightsTraining: {
          employees: { permanent: { total: "3845", covered: "3200", percentage: "83.27%" }, otherThanPermanent: { total: "0", covered: "0", percentage: "NIL" }, totalEmployees: { total: "3845", covered: "3200", percentage: "83.27%" } },
          workers: { permanent: { total: "21084", covered: "18172", percentage: "86.19%" }, otherThanPermanent: { total: "3027", covered: "2208", percentage: "72.94%" }, totalWorkers: { total: "24000", covered: "20380", percentage: "84.92%" } },
        },
        q2_minimumWages: {
          employees: {
            permanent: {
              male: { currentFY: { total: "3424", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "3424", percent: "100%" } }, previousFY: { total: "3543", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "3543", percent: "100%" } } },
              female: { currentFY: { total: "421", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "421", percent: "100%" } }, previousFY: { total: "401", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "401", percent: "100%" } } }
            },
            otherThanPermanent: {
              male: { currentFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } }, previousFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } } },
              female: { currentFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } }, previousFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } } }
            }
          },
          workers: {
            permanent: {
              male: { currentFY: { total: "13082", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "13082", percent: "100%" } }, previousFY: { total: "13891", equalToMinWage: { no: "232", percent: "1.67%" }, moreThanMinWage: { no: "13659", percent: "98.33%" } } },
              female: { currentFY: { total: "8002", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "8002", percent: "100%" } }, previousFY: { total: "7359", equalToMinWage: { no: "407", percent: "5.53%" }, moreThanMinWage: { no: "6952", percent: "94.47%" } } }
            },
            otherThanPermanent: {
              male: { currentFY: { total: "1839", equalToMinWage: { no: "1839", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } }, previousFY: { total: "1447", equalToMinWage: { no: "1447", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } } },
              female: { currentFY: { total: "1188", equalToMinWage: { no: "1188", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } }, previousFY: { total: "1642", equalToMinWage: { no: "1642", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } } }
            }
          }
        },
        q3_medianRemuneration: {
          boardOfDirectors: { male: { number: "7", median: "540000" }, female: { number: "3", median: "1084689.1" } },
          keyManagerialPersonnel: { male: { number: "2", median: "5945167" }, female: { number: "0", median: "0" } },
          employeesOtherThanBoDAndKMP: { male: { number: "3424", median: "490000" }, female: { number: "419", median: "362000" } },
          workers: { male: { number: "13082", median: "136968" }, female: { number: "8002", median: "129792" } }
        },
        q3a_grossWagesFemales: { currentFY: "21.20%", previousFY: "20.15%" },
        q4_focalPointHumanRights: "Yes, all employees can reach out to management.",
        q5_grievanceMechanisms: "Grievance redressal mechanism available",
        q6_complaints: {
          sexualHarassment: { currentFY: { filed: "0", pending: "0", remarks: "0" }, previousFY: { filed: "0", pending: "0", remarks: "0" } },
          discriminationAtWorkplace: { currentFY: { filed: "0", pending: "0", remarks: "0" }, previousFY: { filed: "0", pending: "0", remarks: "0" } },
          childLabour: { currentFY: { filed: "0", pending: "0", remarks: "0" }, previousFY: { filed: "0", pending: "0", remarks: "0" } },
          forcedLabour: { currentFY: { filed: "0", pending: "0", remarks: "0" }, previousFY: { filed: "0", pending: "0", remarks: "0" } },
          wages: { currentFY: { filed: "0", pending: "0", remarks: "0" }, previousFY: { filed: "0", pending: "0", remarks: "0" } },
          otherHumanRights: { currentFY: { filed: "Nil", pending: "Nil", remarks: "Nil" }, previousFY: { filed: "Nil", pending: "Nil", remarks: "Nil" } },
        },
        q7_poshComplaints: { totalComplaints: { currentFY: "Nil", previousFY: "-" }, complaintsAsPercentFemale: { currentFY: "Nil", previousFY: "-" }, complaintsUpheld: { currentFY: "Nil", previousFY: "-" } },
        q8_mechanismsPreventAdverseConsequences: "Zero tolerance. Confidential investigations and disciplinary actions.",
        q9_humanRightsInContracts: "Yes",
        q10_assessments: { childLabour: "100%", forcedInvoluntaryLabour: "100%", sexualHarassment: "100%", discriminationAtWorkplace: "100%", wages: "100%", othersSpecify: "100%" },
        q11_correctiveActions: "No incidents observed.",
      },
      leadership: {
        q1_businessProcessModified: "Human Rights Policy in place",
        q2_humanRightsDueDiligence: "Code of Conduct and vendor assessments",
        q3_accessibilityDifferentlyAbled: "Yes",
        q4_valueChainAssessment: { sexualHarassment: "No assessment conducted during the year 2023-24.", discriminationAtWorkplace: "No assessment conducted during the year 2023-24.", childLabour: "We are aiming to conduct assessments in the future.", forcedLabourInvoluntaryLabour: "We are aiming to conduct assessments in the future.", wages: "We are aiming to conduct assessments in the future.", othersSpecify: "" },
        q5_correctiveActionsValueChain: "Not Applicable",
      }
    }
    setData(sample)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `section_c_p5_manual.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportJSON = (text: string) => {
    try {
      const parsed = JSON.parse(text)
      setData((prev) => ({ ...(prev as any), ...(parsed as any) }))
    } catch (e) {
      alert('Invalid JSON')
    }
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-emerald-400">Section C - Principle 5 (Manual Input)</CardTitle>
            <CardDescription className="text-slate-400">Fill Essential and Leadership indicators for Principle 5 (Human Rights)</CardDescription>
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
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q1: Human Rights Training</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['employees', 'workers'] as const).map((group) => (
              <div key={group} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{group}</Label>
                <Input placeholder="Permanent - total" value={(data.essential.q1_humanRightsTraining as any)[group].permanent.total} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'permanent','total'], e.target.value)} className="mt-2" />
                <Input placeholder="Permanent - covered" value={(data.essential.q1_humanRightsTraining as any)[group].permanent.covered} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'permanent','covered'], e.target.value)} className="mt-2" />
                <Input placeholder="Permanent - percentage" value={(data.essential.q1_humanRightsTraining as any)[group].permanent.percentage} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'permanent','percentage'], e.target.value)} className="mt-2" />
                <Input placeholder="Other - total" value={(data.essential.q1_humanRightsTraining as any)[group].otherThanPermanent.total} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'otherThanPermanent','total'], e.target.value)} className="mt-2" />
                <Input placeholder="Other - covered" value={(data.essential.q1_humanRightsTraining as any)[group].otherThanPermanent.covered} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'otherThanPermanent','covered'], e.target.value)} className="mt-2" />
                <Input placeholder="Other - percentage" value={(data.essential.q1_humanRightsTraining as any)[group].otherThanPermanent.percentage} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'otherThanPermanent','percentage'], e.target.value)} className="mt-2" />
                <Input placeholder="Total - total" value={(data.essential.q1_humanRightsTraining as any)[group].totalEmployees?.total || (data.essential.q1_humanRightsTraining as any)[group].total || ''} onChange={(e) => setSimpleField(['essential','q1_humanRightsTraining',group,'totalEmployees','total'], e.target.value)} className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q2: Minimum Wages</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['employees','workers'] as const).map((group) => (
              <div key={group} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{group}</Label>
                {(['permanent','otherThanPermanent'] as const).map((status) => (
                  <div key={status} className="mt-2">
                    <Label className="text-slate-300">{status}</Label>
                    {(['male','female'] as const).map((gender) => (
                      <div key={gender} className="mt-1">
                        <Label className="text-slate-400">{gender}</Label>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <Input placeholder="Current FY - total" value={(data.essential.q2_minimumWages as any)[group][status][gender].currentFY.total} onChange={(e) => setSimpleField(['essential','q2_minimumWages',group,status,gender,'currentFY','total'], e.target.value)} />
                          <Input placeholder="Previous FY - total" value={(data.essential.q2_minimumWages as any)[group][status][gender].previousFY.total} onChange={(e) => setSimpleField(['essential','q2_minimumWages',group,status,gender,'previousFY','total'], e.target.value)} />
                          <Input placeholder="Current - equalToMinWage (no)" value={(data.essential.q2_minimumWages as any)[group][status][gender].currentFY.equalToMinWage.no} onChange={(e) => setSimpleField(['essential','q2_minimumWages',group,status,gender,'currentFY','equalToMinWage','no'], e.target.value)} />
                          <Input placeholder="Current - equalToMinWage (%)" value={(data.essential.q2_minimumWages as any)[group][status][gender].currentFY.equalToMinWage.percent} onChange={(e) => setSimpleField(['essential','q2_minimumWages',group,status,gender,'currentFY','equalToMinWage','percent'], e.target.value)} />
                          <Input placeholder="Current - moreThanMinWage (no)" value={(data.essential.q2_minimumWages as any)[group][status][gender].currentFY.moreThanMinWage.no} onChange={(e) => setSimpleField(['essential','q2_minimumWages',group,status,gender,'currentFY','moreThanMinWage','no'], e.target.value)} />
                          <Input placeholder="Current - moreThanMinWage (%)" value={(data.essential.q2_minimumWages as any)[group][status][gender].currentFY.moreThanMinWage.percent} onChange={(e) => setSimpleField(['essential','q2_minimumWages',group,status,gender,'currentFY','moreThanMinWage','percent'], e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q3: Median Remuneration</h3>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {(['boardOfDirectors','keyManagerialPersonnel','employeesOtherThanBoDAndKMP','workers'] as const).map((role) => (
              <div key={role} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{role}</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input placeholder="Male - number" value={(data.essential.q3_medianRemuneration as any)[role].male.number} onChange={(e) => setSimpleField(['essential','q3_medianRemuneration',role,'male','number'], e.target.value)} />
                  <Input placeholder="Male - median" value={(data.essential.q3_medianRemuneration as any)[role].male.median} onChange={(e) => setSimpleField(['essential','q3_medianRemuneration',role,'male','median'], e.target.value)} />
                  <Input placeholder="Female - number" value={(data.essential.q3_medianRemuneration as any)[role].female.number} onChange={(e) => setSimpleField(['essential','q3_medianRemuneration',role,'female','number'], e.target.value)} />
                  <Input placeholder="Female - median" value={(data.essential.q3_medianRemuneration as any)[role].female.median} onChange={(e) => setSimpleField(['essential','q3_medianRemuneration',role,'female','median'], e.target.value)} />
                </div>
              </div>
            ))}

            <div className="mt-2 grid grid-cols-2 gap-2">
              <Input placeholder="Q3a - Gross wages females (currentFY)" value={data.essential.q3a_grossWagesFemales.currentFY} onChange={(e) => setSimpleField(['essential','q3a_grossWagesFemales','currentFY'], e.target.value)} />
              <Input placeholder="Q3a - Gross wages females (previousFY)" value={data.essential.q3a_grossWagesFemales.previousFY} onChange={(e) => setSimpleField(['essential','q3a_grossWagesFemales','previousFY'], e.target.value)} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q4: Focal point / grievance</h3>
          <Textarea value={data.essential.q4_focalPointHumanRights} onChange={(e) => setSimpleField(['essential','q4_focalPointHumanRights'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q5: Grievance mechanisms</h3>
          <Textarea value={data.essential.q5_grievanceMechanisms} onChange={(e) => setSimpleField(['essential','q5_grievanceMechanisms'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q6: Complaints</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {(['sexualHarassment','discriminationAtWorkplace','childLabour','forcedLabour','wages','otherHumanRights'] as const).map((topic) => (
              <div key={topic} className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">{topic}</Label>
                <Input placeholder="Current FY - filed" value={(data.essential.q6_complaints as any)[topic].currentFY.filed} onChange={(e) => setSimpleField(['essential','q6_complaints',topic,'currentFY','filed'], e.target.value)} className="mt-2" />
                <Input placeholder="Current FY - pending" value={(data.essential.q6_complaints as any)[topic].currentFY.pending} onChange={(e) => setSimpleField(['essential','q6_complaints',topic,'currentFY','pending'], e.target.value)} className="mt-2" />
                <Input placeholder="Current FY - remarks" value={(data.essential.q6_complaints as any)[topic].currentFY.remarks} onChange={(e) => setSimpleField(['essential','q6_complaints',topic,'currentFY','remarks'], e.target.value)} className="mt-2" />
                <Input placeholder="Previous FY - filed" value={(data.essential.q6_complaints as any)[topic].previousFY.filed} onChange={(e) => setSimpleField(['essential','q6_complaints',topic,'previousFY','filed'], e.target.value)} className="mt-2" />
                <Input placeholder="Previous FY - pending" value={(data.essential.q6_complaints as any)[topic].previousFY.pending} onChange={(e) => setSimpleField(['essential','q6_complaints',topic,'previousFY','pending'], e.target.value)} className="mt-2" />
                <Input placeholder="Previous FY - remarks" value={(data.essential.q6_complaints as any)[topic].previousFY.remarks} onChange={(e) => setSimpleField(['essential','q6_complaints',topic,'previousFY','remarks'], e.target.value)} className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q7: POSH complaints</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <Input placeholder="Total complaints - currentFY" value={data.essential.q7_poshComplaints.totalComplaints.currentFY} onChange={(e) => setSimpleField(['essential','q7_poshComplaints','totalComplaints','currentFY'], e.target.value)} />
            <Input placeholder="Complaints % female - currentFY" value={data.essential.q7_poshComplaints.complaintsAsPercentFemale.currentFY} onChange={(e) => setSimpleField(['essential','q7_poshComplaints','complaintsAsPercentFemale','currentFY'], e.target.value)} />
            <Input placeholder="Complaints upheld - currentFY" value={data.essential.q7_poshComplaints.complaintsUpheld.currentFY} onChange={(e) => setSimpleField(['essential','q7_poshComplaints','complaintsUpheld','currentFY'], e.target.value)} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q8: Mechanisms to prevent adverse consequences</h3>
          <Textarea value={data.essential.q8_mechanismsPreventAdverseConsequences} onChange={(e) => setSimpleField(['essential','q8_mechanismsPreventAdverseConsequences'], e.target.value)} className="min-h-20" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Essential - Q9/Q10/Q11 (short fields)</h3>
          <Input placeholder="Human rights in contracts (Yes/No)" value={data.essential.q9_humanRightsInContracts} onChange={(e) => setSimpleField(['essential','q9_humanRightsInContracts'], e.target.value)} className="mt-2" />

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Input placeholder="Q10 - Child Labour" value={data.essential.q10_assessments.childLabour} onChange={(e) => setSimpleField(['essential','q10_assessments','childLabour'], e.target.value)} />
            <Input placeholder="Q10 - Forced/Involuntary Labour" value={data.essential.q10_assessments.forcedInvoluntaryLabour} onChange={(e) => setSimpleField(['essential','q10_assessments','forcedInvoluntaryLabour'], e.target.value)} />
            <Input placeholder="Q10 - Sexual Harassment" value={data.essential.q10_assessments.sexualHarassment} onChange={(e) => setSimpleField(['essential','q10_assessments','sexualHarassment'], e.target.value)} />
            <Input placeholder="Q10 - Discrimination at Workplace" value={data.essential.q10_assessments.discriminationAtWorkplace} onChange={(e) => setSimpleField(['essential','q10_assessments','discriminationAtWorkplace'], e.target.value)} />
            <Input placeholder="Q10 - Wages" value={data.essential.q10_assessments.wages} onChange={(e) => setSimpleField(['essential','q10_assessments','wages'], e.target.value)} />
            <Input placeholder="Q10 - Others (specify)" value={data.essential.q10_assessments.othersSpecify} onChange={(e) => setSimpleField(['essential','q10_assessments','othersSpecify'], e.target.value)} />
          </div>

          <Textarea placeholder="Q11 corrective actions" value={data.essential.q11_correctiveActions} onChange={(e) => setSimpleField(['essential','q11_correctiveActions'], e.target.value)} className="min-h-20 mt-2" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-emerald-400">Leadership</h3>

          <div className="mt-2">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q1: Business process modified</h4>
            <Textarea placeholder="Details" value={data.leadership.q1_businessProcessModified} onChange={(e) => setSimpleField(['leadership','q1_businessProcessModified'], e.target.value)} className="min-h-20 mt-2" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q2: Human rights due diligence</h4>
            <Textarea placeholder="Details" value={data.leadership.q2_humanRightsDueDiligence} onChange={(e) => setSimpleField(['leadership','q2_humanRightsDueDiligence'], e.target.value)} className="min-h-20 mt-2" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q3: Accessibility (Differently Abled)</h4>
            <Input placeholder="Yes/No" value={data.leadership.q3_accessibilityDifferentlyAbled} onChange={(e) => setSimpleField(['leadership','q3_accessibilityDifferentlyAbled'], e.target.value)} className="mt-2" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q4: Value chain assessment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">Q4.1 Sexual Harassment</Label>
                <Textarea value={data.leadership.q4_valueChainAssessment?.sexualHarassment || ''} onChange={(e) => setSimpleField(['leadership','q4_valueChainAssessment','sexualHarassment'], e.target.value)} className="min-h-20 mt-2" />
              </div>

              <div className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">Q4.2 Discrimination at workplace</Label>
                <Textarea value={data.leadership.q4_valueChainAssessment?.discriminationAtWorkplace || ''} onChange={(e) => setSimpleField(['leadership','q4_valueChainAssessment','discriminationAtWorkplace'], e.target.value)} className="min-h-20 mt-2" />
              </div>

              <div className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">Q4.3 Child Labour</Label>
                <Textarea value={data.leadership.q4_valueChainAssessment?.childLabour || ''} onChange={(e) => setSimpleField(['leadership','q4_valueChainAssessment','childLabour'], e.target.value)} className="min-h-20 mt-2" />
              </div>

              <div className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">Q4.4 Forced / Involuntary Labour</Label>
                <Textarea value={data.leadership.q4_valueChainAssessment?.forcedLabourInvoluntaryLabour || ''} onChange={(e) => setSimpleField(['leadership','q4_valueChainAssessment','forcedLabourInvoluntaryLabour'], e.target.value)} className="min-h-20 mt-2" />
              </div>

              <div className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">Q4.5 Wages</Label>
                <Textarea value={data.leadership.q4_valueChainAssessment?.wages || ''} onChange={(e) => setSimpleField(['leadership','q4_valueChainAssessment','wages'], e.target.value)} className="min-h-20 mt-2" />
              </div>

              <div className="bg-slate-700 p-3 rounded">
                <Label className="text-slate-200">Q4.6 Others (specify)</Label>
                <Input value={data.leadership.q4_valueChainAssessment?.othersSpecify || ''} onChange={(e) => setSimpleField(['leadership','q4_valueChainAssessment','othersSpecify'], e.target.value)} className="mt-2" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-emerald-300">Leadership - Q5: Corrective actions in value chain</h4>
            <Textarea placeholder="Details" value={data.leadership.q5_correctiveActionsValueChain} onChange={(e) => setSimpleField(['leadership','q5_correctiveActionsValueChain'], e.target.value)} className="min-h-20 mt-2" />
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
