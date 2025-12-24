"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface SectionBManualData {
  policyMatrix: {
    p1: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p2: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p3: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p4: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p5: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p6: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p7: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p8: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
    p9: { hasPolicy: boolean; approvedByBoard: boolean; webLink: string; translatedToProcedures: boolean }
  }
  policyWebLink: string
  valueChainExtension: string
  certifications: string
  commitments: string
  performance: string
  directorStatement: string
  highestAuthority: {
    name: string
    designation: string
    din: string
    email: string
    phone: string
  }
  sustainabilityCommittee: string
  review: {
    performance: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
      p9: string
    }
    performanceFrequency: string
    compliance: string
  }
  independentAssessment: {
    p1: string
    p2: string
    p3: string
    p4: string
    p5: string
    p6: string
    p7: string
    p8: string
    p9: string
  }
  noPolicyReasons: {
    notMaterial: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
      p9: string
    }
    notReady: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
      p9: string
    }
    noResources: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
      p9: string
    }
    plannedNextYear: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
      p9: string
    }
    otherReason: {
      p1: string
      p2: string
      p3: string
      p4: string
      p5: string
      p6: string
      p7: string
      p8: string
      p9: string
    }
  }
}

interface SectionBFormProps {
  onDataChange: (data: SectionBManualData) => void
  initialData?: SectionBManualData
}

const principleLabels = {
  p1: "P1: Ethics & Integrity",
  p2: "P2: Sustainability",
  p3: "P3: Employee Welfare",
  p4: "P4: Stakeholder Engagement",
  p5: "P5: Human Rights",
  p6: "P6: Environment",
  p7: "P7: Public Policy",
  p8: "P8: CSR",
  p9: "P9: Customer Value",
}

export function SectionBForm({ onDataChange, initialData }: SectionBFormProps) {
  const defaultData: SectionBManualData = {
    policyMatrix: {
      p1: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p2: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p3: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p4: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p5: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p6: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p7: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p8: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
      p9: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
    },
    policyWebLink: "",
    valueChainExtension: "",
    certifications: "",
    commitments: "",
    performance: "",
    directorStatement: "",
    highestAuthority: {
      name: "",
      designation: "",
      din: "",
      email: "",
      phone: "",
    },
    sustainabilityCommittee: "",
    review: {
      performance: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
      performanceFrequency: "",
      compliance: "",
    },
    independentAssessment: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
    noPolicyReasons: {
      notMaterial: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
      notReady: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
      noResources: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
      plannedNextYear: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
      otherReason: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
    },
  }

  const [data, setData] = React.useState<SectionBManualData>(() => {
    // Merge initialData with defaultData to ensure all fields exist
    if (initialData && Object.keys(initialData).length > 0) {
      return {
        ...defaultData,
        ...initialData,
        policyMatrix: {
          ...defaultData.policyMatrix,
          ...(initialData.policyMatrix || {}),
        },
        highestAuthority: {
          ...defaultData.highestAuthority,
          ...(initialData.highestAuthority || {}),
        },
        review: {
          performance: {
            ...defaultData.review.performance,
            ...(initialData.review?.performance || {}),
          },
          performanceFrequency: initialData.review?.performanceFrequency || defaultData.review.performanceFrequency,
          compliance: initialData.review?.compliance || defaultData.review.compliance,
        },
        independentAssessment: {
          ...defaultData.independentAssessment,
          ...(initialData.independentAssessment || {}),
        },
        noPolicyReasons: {
          notMaterial: {
            ...defaultData.noPolicyReasons.notMaterial,
            ...(initialData.noPolicyReasons?.notMaterial || {}),
          },
          notReady: {
            ...defaultData.noPolicyReasons.notReady,
            ...(initialData.noPolicyReasons?.notReady || {}),
          },
          noResources: {
            ...defaultData.noPolicyReasons.noResources,
            ...(initialData.noPolicyReasons?.noResources || {}),
          },
          plannedNextYear: {
            ...defaultData.noPolicyReasons.plannedNextYear,
            ...(initialData.noPolicyReasons?.plannedNextYear || {}),
          },
          otherReason: {
            ...defaultData.noPolicyReasons.otherReason,
            ...(initialData.noPolicyReasons?.otherReason || {}),
          },
        },
      }
    }
    return defaultData
  })

  const handleAutoFill = () => {
    const dummyData: SectionBManualData = {
      policyMatrix: {
        p1: { hasPolicy: true, approvedByBoard: true, webLink: "https://example.com/p1", translatedToProcedures: true },
        p2: { hasPolicy: true, approvedByBoard: true, webLink: "https://example.com/p2", translatedToProcedures: true },
        p3: { hasPolicy: true, approvedByBoard: false, webLink: "https://example.com/p3", translatedToProcedures: false },
        p4: { hasPolicy: true, approvedByBoard: true, webLink: "https://example.com/p4", translatedToProcedures: true },
        p5: { hasPolicy: true, approvedByBoard: true, webLink: "https://example.com/p5", translatedToProcedures: true },
        p6: { hasPolicy: true, approvedByBoard: true, webLink: "https://example.com/p6", translatedToProcedures: true },
        p7: { hasPolicy: false, approvedByBoard: false, webLink: "", translatedToProcedures: false },
        p8: { hasPolicy: true, approvedByBoard: true, webLink: "https://example.com/p8", translatedToProcedures: true },
        p9: { hasPolicy: true, approvedByBoard: false, webLink: "https://example.com/p9", translatedToProcedures: false },
      },
      policyWebLink: "https://example.com/policies",
      valueChainExtension: "Yes, policies extend to value chain partners",
      certifications: "ISO 14001, ISO 45001, SA 8000",
      commitments: "Net Zero by 2050, 50% renewable energy by 2030",
      performance: "Met 80% of sustainability targets",
      directorStatement: "Sustainability is core to our business strategy",
      highestAuthority: {
        name: "Jane Smith",
        designation: "Chief Executive Officer",
        din: "12345678",
        email: "jane.smith@example.com",
        phone: "+91-9876543210",
      },
      sustainabilityCommittee: "ESG Committee with 5 members",
      review: {
        performance: { p1: "Quarterly", p2: "Quarterly", p3: "Half-yearly", p4: "Quarterly", p5: "Quarterly", p6: "Quarterly", p7: "Annually", p8: "Quarterly", p9: "Half-yearly" },
        performanceFrequency: "Quarterly",
        compliance: "Yes, all policies comply with regulations",
      },
      independentAssessment: { p1: "Yes", p2: "Yes", p3: "No", p4: "Yes", p5: "Yes", p6: "Yes", p7: "No", p8: "Yes", p9: "No" },
      noPolicyReasons: {
        notMaterial: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "Not material to business", p8: "", p9: "" },
        notReady: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
        noResources: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
        plannedNextYear: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
        otherReason: { p1: "", p2: "", p3: "", p4: "", p5: "", p6: "", p7: "", p8: "", p9: "" },
      },
    }
    setData(dummyData)
    // sync to parent in effect to avoid update loops
  }

  const handlePolicyChange = (
    principle: keyof SectionBManualData["policyMatrix"],
    field: keyof SectionBManualData["policyMatrix"]["p1"],
    value: boolean | string
  ) => {
    const updatedData = {
      ...data,
      policyMatrix: {
        ...data.policyMatrix,
        [principle]: {
          ...data.policyMatrix[principle],
          [field]: value,
        },
      },
    }
    setData(updatedData)
    // sync to parent in effect to avoid update loops
  }

  const handleFieldChange = (field: string, value: string) => {
    const updatedData = { ...data }
    
    if (field.startsWith("highestAuthority.")) {
      const subField = field.split(".")[1]
      updatedData.highestAuthority = {
        ...updatedData.highestAuthority,
        [subField]: value,
      }
    } else if (field.startsWith("review.performance.")) {
      const principle = field.split(".")[2] as keyof SectionBManualData["review"]["performance"]
      updatedData.review = {
        ...updatedData.review,
        performance: {
          ...updatedData.review.performance,
          [principle]: value,
        },
      }
    } else if (field.startsWith("review.")) {
      const subField = field.split(".")[1] as "performanceFrequency" | "compliance"
      updatedData.review = {
        ...updatedData.review,
        [subField]: value,
      }
    } else if (field.startsWith("independentAssessment.")) {
      const principle = field.split(".")[1] as keyof SectionBManualData["independentAssessment"]
      updatedData.independentAssessment = {
        ...updatedData.independentAssessment,
        [principle]: value,
      }
    } else if (field.startsWith("noPolicyReasons.")) {
      const parts = field.split(".")
      const subField = parts[1] as "notMaterial" | "notReady" | "noResources" | "plannedNextYear" | "otherReason"
      const principle = parts[2] as keyof SectionBManualData["noPolicyReasons"]["notMaterial"]
      updatedData.noPolicyReasons = {
        ...updatedData.noPolicyReasons,
        [subField]: {
          ...(updatedData.noPolicyReasons as any)[subField],
          [principle]: value,
        },
      }
    } else {
      ;(updatedData as any)[field] = value
    }
    
    setData(updatedData)
    // sync to parent in effect to avoid update loops
  }

  // Sync local data state to parent via onDataChange using effect (avoids tight render loops)
  React.useEffect(() => {
    try {
      onDataChange(data)
    } catch (e) {
      // swallow to avoid breaking the form if parent handler throws
      console.error("SectionBForm onDataChange error:", e)
    }
  }, [data, onDataChange])

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-emerald-400">Section B: Manual Input Form</CardTitle>
              <CardDescription className="text-slate-400">
                Fill in Section B data to reduce AI extraction load and improve accuracy
              </CardDescription>
            </div>
            <Button onClick={handleAutoFill} variant="outline" size="sm">
              Auto Fill Test Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Q1: Policy Matrix for P1-P9 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-emerald-400">Q1: Whether your entity's policy/policies cover each principle and its core elements</h3>
            <p className="text-xs text-slate-400">For each principle (P1-P9), indicate policy coverage and approval status</p>
            
            <div className="space-y-4">
              {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                <Card key={principle} className="bg-slate-700 border-slate-600">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-slate-200">{principleLabels[principle]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${principle}-hasPolicy`}
                          checked={data.policyMatrix[principle].hasPolicy}
                          onCheckedChange={(checked) =>
                            handlePolicyChange(principle, "hasPolicy", checked as boolean)
                          }
                        />
                        <Label htmlFor={`${principle}-hasPolicy`} className="text-sm text-slate-300">
                          Has Policy
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${principle}-approvedByBoard`}
                          checked={data.policyMatrix[principle].approvedByBoard}
                          onCheckedChange={(checked) =>
                            handlePolicyChange(principle, "approvedByBoard", checked as boolean)
                          }
                        />
                        <Label htmlFor={`${principle}-approvedByBoard`} className="text-sm text-slate-300">
                          Approved by Board
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`${principle}-translatedToProcedures`}
                          checked={data.policyMatrix[principle].translatedToProcedures}
                          onCheckedChange={(checked) =>
                            handlePolicyChange(principle, "translatedToProcedures", checked as boolean)
                          }
                        />
                        <Label htmlFor={`${principle}-translatedToProcedures`} className="text-sm text-slate-300">
                          Translated to Procedures
                        </Label>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`${principle}-webLink`} className="text-xs text-slate-400">
                        Policy Web Link (optional)
                      </Label>
                      <Input
                        id={`${principle}-webLink`}
                        type="url"
                        placeholder="https://example.com/policy"
                        value={data.policyMatrix[principle].webLink}
                        onChange={(e) => handlePolicyChange(principle, "webLink", e.target.value)}
                        className="mt-1 bg-slate-600 border-slate-500 text-slate-100"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* General Policy Web Link */}
          <div>
            <Label htmlFor="policyWebLink" className="text-slate-300">
              c. Web Link of the Policies, if available
            </Label>
            <Textarea
              id="policyWebLink"
              placeholder="Various policies of the Company are available at..."
              value={data.policyWebLink}
              onChange={(e) => handleFieldChange("policyWebLink", e.target.value)}
              className="mt-1 bg-slate-700 border-slate-600 text-slate-100"
              rows={2}
            />
          </div>

          {/* Q2: Translated to Procedures */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-emerald-400">Q2: Whether the entity has translated the policy into procedures (Yes / No)</h3>
            <p className="text-xs text-slate-400">This is already captured in the policy matrix above (Translated to Procedures checkbox)</p>
          </div>

          {/* Governance, Leadership and Oversight */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4">Governance, Leadership and Oversight</h3>
          </div>

          {/* Q3-Q7 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Q3: Do the enlisted policies extend to your value chain partners? (Yes/No)</Label>
              <Textarea
                placeholder="Do policies extend to the value chain?"
                value={data.valueChainExtension}
                onChange={(e) => handleFieldChange("valueChainExtension", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Q4: Name of the national and international codes/certifications/labels/standards adopted by your entity and mapped to each principle</Label>
              <Textarea
                placeholder="e.g. Forest Stewardship Council, Fairtrade, SA 8000, OHSAS, ISO, BIS"
                value={data.certifications}
                onChange={(e) => handleFieldChange("certifications", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Q5: Specific commitments, goals and targets set by the entity with defined timelines, if any</Label>
              <Textarea
                placeholder="Enter specific commitments, goals and targets with timelines"
                value={data.commitments}
                onChange={(e) => handleFieldChange("commitments", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Q6: Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met</Label>
              <Textarea
                placeholder="Enter performance details and reasons for any unmet targets"
                value={data.performance}
                onChange={(e) => handleFieldChange("performance", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100"
                rows={2}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="text-slate-300">Q7: Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements</Label>
              <Textarea
                placeholder="Enter director's statement on ESG challenges, targets and achievements"
                value={data.directorStatement}
                onChange={(e) => handleFieldChange("directorStatement", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100"
                rows={3}
              />
            </div>
          </div>

          {/* Q8: Highest Authority */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-medium">Q8: Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Name</Label>
                <Input
                  value={data.highestAuthority.name}
                  onChange={(e) => handleFieldChange("highestAuthority.name", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label className="text-slate-300">Designation</Label>
                <Input
                  value={data.highestAuthority.designation}
                  onChange={(e) => handleFieldChange("highestAuthority.designation", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                  placeholder="Designation"
                />
              </div>
              <div>
                <Label className="text-slate-300">DIN</Label>
                <Input
                  value={data.highestAuthority.din}
                  onChange={(e) => handleFieldChange("highestAuthority.din", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                  placeholder="DIN"
                />
              </div>
              <div>
                <Label className="text-slate-300">Email</Label>
                <Input
                  type="email"
                  value={data.highestAuthority.email}
                  onChange={(e) => handleFieldChange("highestAuthority.email", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                  placeholder="email@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-slate-300">Phone</Label>
                <Input
                  value={data.highestAuthority.phone}
                  onChange={(e) => handleFieldChange("highestAuthority.phone", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                  placeholder="Contact number"
                />
              </div>
            </div>
          </div>

          {/* Q9: Sustainability Committee */}
          <div className="space-y-2">
            <Label className="text-slate-300">Q9: Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details</Label>
            <Textarea
              placeholder="Enter Yes/No and provide committee details if applicable"
              value={data.sustainabilityCommittee}
              onChange={(e) => handleFieldChange("sustainabilityCommittee", e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-100"
              rows={2}
            />
          </div>

          {/* Q10: Review */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-medium">Q10: Details of Review of NGRBCs by the Company</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                <div key={`review-${principle}`} className="space-y-1">
                  <Label className="text-slate-300">Performance {principle.toUpperCase()}</Label>
                  <Input
                    placeholder="Y/N or notes"
                    value={data.review.performance[principle]}
                    onChange={(e) => handleFieldChange(`review.performance.${principle}`, e.target.value)}
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-slate-300">Performance Review Frequency</Label>
                <Input
                  placeholder="Annually / Quarterly / etc."
                  value={data.review.performanceFrequency}
                  onChange={(e) => handleFieldChange("review.performanceFrequency", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
              <div>
                <Label className="text-slate-300">Compliance Review</Label>
                <Input
                  placeholder="Compliance details"
                  value={data.review.compliance}
                  onChange={(e) => handleFieldChange("review.compliance", e.target.value)}
                  className="bg-slate-700 border-slate-600 text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Q11: Independent Assessment */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-medium">Q11: Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                <div key={`ia-${principle}`} className="space-y-1">
                  <Label className="text-slate-300">{principleLabels[principle]}</Label>
                  <Input
                    placeholder="Y/N or notes"
                    value={(data.independentAssessment as any)[principle]}
                    onChange={(e) => handleFieldChange(`independentAssessment.${principle}`, e.target.value)}
                    className="bg-slate-700 border-slate-600 text-slate-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Q12: No Policy Reasons */}
          <div className="space-y-4">
            <h4 className="text-slate-200 font-medium">Q12: If answer to question (1) above is "No" i.e. not all Principles are covered by a policy, reasons to be stated</h4>
            
            {/* Not Material */}
            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">a. Not Material to Business (Y/N)</h5>
              <div className="grid md:grid-cols-3 gap-3">
                {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                  <div key={`npr-nm-${principle}`} className="space-y-1">
                    <Label className="text-slate-300 text-xs">{principleLabels[principle]}</Label>
                    <Input
                      placeholder="Y/N"
                      value={data.noPolicyReasons.notMaterial[principle]}
                      onChange={(e) => handleFieldChange(`noPolicyReasons.notMaterial.${principle}`, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Not Ready */}
            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">b. Not Ready to Formulate (Y/N)</h5>
              <div className="grid md:grid-cols-3 gap-3">
                {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                  <div key={`npr-nr-${principle}`} className="space-y-1">
                    <Label className="text-slate-300 text-xs">{principleLabels[principle]}</Label>
                    <Input
                      placeholder="Y/N"
                      value={data.noPolicyReasons.notReady[principle]}
                      onChange={(e) => handleFieldChange(`noPolicyReasons.notReady.${principle}`, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* No Resources */}
            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">c. No Resources Available (Y/N)</h5>
              <div className="grid md:grid-cols-3 gap-3">
                {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                  <div key={`npr-nores-${principle}`} className="space-y-1">
                    <Label className="text-slate-300 text-xs">{principleLabels[principle]}</Label>
                    <Input
                      placeholder="Y/N"
                      value={data.noPolicyReasons.noResources[principle]}
                      onChange={(e) => handleFieldChange(`noPolicyReasons.noResources.${principle}`, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Planned Next Year */}
            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">d. Planned Next Year (Y/N)</h5>
              <div className="grid md:grid-cols-3 gap-3">
                {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                  <div key={`npr-pny-${principle}`} className="space-y-1">
                    <Label className="text-slate-300 text-xs">{principleLabels[principle]}</Label>
                    <Input
                      placeholder="Y/N"
                      value={data.noPolicyReasons.plannedNextYear[principle]}
                      onChange={(e) => handleFieldChange(`noPolicyReasons.plannedNextYear.${principle}`, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Other Reason */}
            <div className="space-y-2">
              <h5 className="text-slate-300 text-sm font-medium">e. Other Reason (Text)</h5>
              <div className="grid md:grid-cols-3 gap-3">
                {(Object.keys(principleLabels) as Array<keyof typeof principleLabels>).map((principle) => (
                  <div key={`npr-or-${principle}`} className="space-y-1">
                    <Label className="text-slate-300 text-xs">{principleLabels[principle]}</Label>
                    <Input
                      placeholder="Specify reason"
                      value={data.noPolicyReasons.otherReason[principle]}
                      onChange={(e) => handleFieldChange(`noPolicyReasons.otherReason.${principle}`, e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
