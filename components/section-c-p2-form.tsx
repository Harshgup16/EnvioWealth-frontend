"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface SectionCP2ManualData {
  essential: {
    q1_rdCapexInvestments: {
      rd: {
        currentFY: string
        previousFY: string
        improvementDetails: string
      }
      capex: {
        currentFY: string
        previousFY: string
        improvementDetails: string
      }
    }
    q2_sustainableSourcing: {
      proceduresInPlace: string
      percentageSustainablySourced: string
    }
    q3_reclaimProcesses: {
      plastics: {
        applicable: string
        process: string
      }
      eWaste: {
        applicable: string
        process: string
      }
      hazardousWaste: {
        applicable: string
        process: string
      }
      otherWaste: {
        applicable: string
        process: string
      }
    }
    q4_epr: {
      applicable: string
      wasteCollectionPlanInLine: string
    }
  }
  leadership: {
    q1_lcaDetails: string
    q2_significantConcerns: string
    q3_recycledInputMaterial: Array<{
      inputMaterial: string
      currentFY: string
      previousFY: string
    }>
    q4_productsReclaimed: {
      plastics: {
        currentFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
        previousFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
      }
      eWaste: {
        currentFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
        previousFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
      }
      hazardousWaste: {
        currentFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
        previousFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
      }
      otherWaste: {
        currentFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
        previousFY: {
          reUsed: string
          recycled: string
          safelyDisposed: string
        }
      }
    }
    q5_reclaimedPercentage: string
  }
}

interface SectionCP2FormProps {
  onDataChange?: (data: SectionCP2ManualData) => void
  initialData?: Partial<SectionCP2ManualData>
}

const defaultData: SectionCP2ManualData = {
  essential: {
    q1_rdCapexInvestments: {
      rd: { currentFY: "", previousFY: "", improvementDetails: "" },
      capex: { currentFY: "", previousFY: "", improvementDetails: "" },
    },
    q2_sustainableSourcing: {
      proceduresInPlace: "",
      percentageSustainablySourced: "",
    },
    q3_reclaimProcesses: {
      plastics: { applicable: "", process: "" },
      eWaste: { applicable: "", process: "" },
      hazardousWaste: { applicable: "", process: "" },
      otherWaste: { applicable: "", process: "" },
    },
    q4_epr: {
      applicable: "",
      wasteCollectionPlanInLine: "",
    },
  },
  leadership: {
    q1_lcaDetails: "",
    q2_significantConcerns: "",
    q3_recycledInputMaterial: [],
    q4_productsReclaimed: {
      plastics: {
        currentFY: { reUsed: "", recycled: "", safelyDisposed: "" },
        previousFY: { reUsed: "", recycled: "", safelyDisposed: "" },
      },
      eWaste: {
        currentFY: { reUsed: "", recycled: "", safelyDisposed: "" },
        previousFY: { reUsed: "", recycled: "", safelyDisposed: "" },
      },
      hazardousWaste: {
        currentFY: { reUsed: "", recycled: "", safelyDisposed: "" },
        previousFY: { reUsed: "", recycled: "", safelyDisposed: "" },
      },
      otherWaste: {
        currentFY: { reUsed: "", recycled: "", safelyDisposed: "" },
        previousFY: { reUsed: "", recycled: "", safelyDisposed: "" },
      },
    },
    q5_reclaimedPercentage: "",
  },
}

export function SectionCP2Form({ onDataChange, initialData }: SectionCP2FormProps) {
  const [formData, setFormData] = useState<SectionCP2ManualData>(() => {
    if (!initialData) return defaultData

    return {
      essential: {
        q1_rdCapexInvestments: {
          rd: {
            ...defaultData.essential.q1_rdCapexInvestments.rd,
            ...initialData.essential?.q1_rdCapexInvestments?.rd,
          },
          capex: {
            ...defaultData.essential.q1_rdCapexInvestments.capex,
            ...initialData.essential?.q1_rdCapexInvestments?.capex,
          },
        },
        q2_sustainableSourcing: {
          ...defaultData.essential.q2_sustainableSourcing,
          ...initialData.essential?.q2_sustainableSourcing,
        },
        q3_reclaimProcesses: {
          plastics: {
            ...defaultData.essential.q3_reclaimProcesses.plastics,
            ...initialData.essential?.q3_reclaimProcesses?.plastics,
          },
          eWaste: {
            ...defaultData.essential.q3_reclaimProcesses.eWaste,
            ...initialData.essential?.q3_reclaimProcesses?.eWaste,
          },
          hazardousWaste: {
            ...defaultData.essential.q3_reclaimProcesses.hazardousWaste,
            ...initialData.essential?.q3_reclaimProcesses?.hazardousWaste,
          },
          otherWaste: {
            ...defaultData.essential.q3_reclaimProcesses.otherWaste,
            ...initialData.essential?.q3_reclaimProcesses?.otherWaste,
          },
        },
        q4_epr: {
          ...defaultData.essential.q4_epr,
          ...initialData.essential?.q4_epr,
        },
      },
      leadership: {
        q1_lcaDetails: initialData.leadership?.q1_lcaDetails || "",
        q2_significantConcerns: initialData.leadership?.q2_significantConcerns || "",
        q3_recycledInputMaterial: initialData.leadership?.q3_recycledInputMaterial || [],
        q4_productsReclaimed: {
          plastics: {
            currentFY: {
              ...defaultData.leadership.q4_productsReclaimed.plastics.currentFY,
              ...initialData.leadership?.q4_productsReclaimed?.plastics?.currentFY,
            },
            previousFY: {
              ...defaultData.leadership.q4_productsReclaimed.plastics.previousFY,
              ...initialData.leadership?.q4_productsReclaimed?.plastics?.previousFY,
            },
          },
          eWaste: {
            currentFY: {
              ...defaultData.leadership.q4_productsReclaimed.eWaste.currentFY,
              ...initialData.leadership?.q4_productsReclaimed?.eWaste?.currentFY,
            },
            previousFY: {
              ...defaultData.leadership.q4_productsReclaimed.eWaste.previousFY,
              ...initialData.leadership?.q4_productsReclaimed?.eWaste?.previousFY,
            },
          },
          hazardousWaste: {
            currentFY: {
              ...defaultData.leadership.q4_productsReclaimed.hazardousWaste.currentFY,
              ...initialData.leadership?.q4_productsReclaimed?.hazardousWaste?.currentFY,
            },
            previousFY: {
              ...defaultData.leadership.q4_productsReclaimed.hazardousWaste.previousFY,
              ...initialData.leadership?.q4_productsReclaimed?.hazardousWaste?.previousFY,
            },
          },
          otherWaste: {
            currentFY: {
              ...defaultData.leadership.q4_productsReclaimed.otherWaste.currentFY,
              ...initialData.leadership?.q4_productsReclaimed?.otherWaste?.currentFY,
            },
            previousFY: {
              ...defaultData.leadership.q4_productsReclaimed.otherWaste.previousFY,
              ...initialData.leadership?.q4_productsReclaimed?.otherWaste?.previousFY,
            },
          },
        },
        q5_reclaimedPercentage: initialData.leadership?.q5_reclaimedPercentage || "",
      },
    }
  })

  const handleAutoFill = () => {
    const dummyData: SectionCP2ManualData = {
      essential: {
        q1_rdCapexInvestments: {
          rd: { currentFY: "5.5", previousFY: "4.8", improvementDetails: "Sustainable materials research" },
          capex: { currentFY: "12.3", previousFY: "10.5", improvementDetails: "Green infrastructure" },
        },
        q2_sustainableSourcing: {
          proceduresInPlace: "Yes, comprehensive sustainable sourcing procedures",
          percentageSustainablySourced: "65%",
        },
        q3_reclaimProcesses: {
          plastics: { applicable: "Yes", process: "Recycling program" },
          eWaste: { applicable: "Yes", process: "E-waste collection" },
          hazardousWaste: { applicable: "Yes", process: "Safe disposal" },
          otherWaste: { applicable: "No", process: "" },
        },
        q4_epr: {
          applicable: "Yes",
          wasteCollectionPlanInLine: "Yes, compliant with regulations",
        },
      },
      leadership: {
        q1_lcaDetails: "LCA conducted",
        q2_significantConcerns: "None identified",
        q3_recycledInputMaterial: [
          { inputMaterial: "Recycled Cotton", currentFY: "10%", previousFY: "8%" },
          { inputMaterial: "Recycled Polyester", currentFY: "15%", previousFY: "12%" },
        ],
        q4_productsReclaimed: {
          plastics: {
            currentFY: { reUsed: "100", recycled: "500", safelyDisposed: "50" },
            previousFY: { reUsed: "80", recycled: "450", safelyDisposed: "40" },
          },
          eWaste: {
            currentFY: { reUsed: "20", recycled: "100", safelyDisposed: "10" },
            previousFY: { reUsed: "15", recycled: "90", safelyDisposed: "8" },
          },
          hazardousWaste: {
            currentFY: { reUsed: "0", recycled: "50", safelyDisposed: "200" },
            previousFY: { reUsed: "0", recycled: "45", safelyDisposed: "180" },
          },
          otherWaste: {
            currentFY: { reUsed: "300", recycled: "600", safelyDisposed: "100" },
            previousFY: { reUsed: "280", recycled: "550", safelyDisposed: "90" },
          },
        },
        q5_reclaimedPercentage: "45%",
      },
    }
    setFormData(dummyData)
    onDataChange?.(dummyData)
  }

  useEffect(() => {
    onDataChange?.(formData)
  }, [formData, onDataChange])

  const handleFieldChange = (path: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current: any = newData

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-green-800">
              Section C - Principle 2: Sustainable and Safe Goods and Services
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Businesses should provide goods and services in a manner that is sustainable and safe.
            </p>
          </div>
          <Button onClick={handleAutoFill} variant="outline" size="sm">
            Auto Fill Test Data
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* ESSENTIAL INDICATORS */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-green-700 border-b pb-2">Essential Indicators</h3>

          {/* Q1: R&D and Capex Investments */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-800">
              Q1. Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve
              the environmental and social impacts of product and processes
            </Label>

            {/* R&D */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">R&D</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q1-rd-current">Current FY (%)</Label>
                  <Input
                    id="q1-rd-current"
                    value={formData.essential.q1_rdCapexInvestments.rd.currentFY}
                    onChange={(e) => handleFieldChange("essential.q1_rdCapexInvestments.rd.currentFY", e.target.value)}
                    placeholder="Percentage"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-rd-previous">Previous FY (%)</Label>
                  <Input
                    id="q1-rd-previous"
                    value={formData.essential.q1_rdCapexInvestments.rd.previousFY}
                    onChange={(e) => handleFieldChange("essential.q1_rdCapexInvestments.rd.previousFY", e.target.value)}
                    placeholder="Percentage"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-rd-details">Details of Improvements</Label>
                  <Input
                    id="q1-rd-details"
                    value={formData.essential.q1_rdCapexInvestments.rd.improvementDetails}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_rdCapexInvestments.rd.improvementDetails", e.target.value)
                    }
                    placeholder="Brief details"
                  />
                </div>
              </div>
            </div>

            {/* Capex */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Capex</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q1-capex-current">Current FY (%)</Label>
                  <Input
                    id="q1-capex-current"
                    value={formData.essential.q1_rdCapexInvestments.capex.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_rdCapexInvestments.capex.currentFY", e.target.value)
                    }
                    placeholder="Percentage"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-capex-previous">Previous FY (%)</Label>
                  <Input
                    id="q1-capex-previous"
                    value={formData.essential.q1_rdCapexInvestments.capex.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_rdCapexInvestments.capex.previousFY", e.target.value)
                    }
                    placeholder="Percentage"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-capex-details">Details of Improvements</Label>
                  <Input
                    id="q1-capex-details"
                    value={formData.essential.q1_rdCapexInvestments.capex.improvementDetails}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_rdCapexInvestments.capex.improvementDetails", e.target.value)
                    }
                    placeholder="Brief details"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Q2: Sustainable Sourcing */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-800">
              Q2. Does the entity have procedures in place for sustainable sourcing?
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="q2-procedures">a. Procedures in place (Yes/No)</Label>
                <Input
                  id="q2-procedures"
                  value={formData.essential.q2_sustainableSourcing.proceduresInPlace}
                  onChange={(e) =>
                    handleFieldChange("essential.q2_sustainableSourcing.proceduresInPlace", e.target.value)
                  }
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="q2-percentage">b. If yes, what percentage of inputs was sourced sustainably?</Label>
                <Input
                  id="q2-percentage"
                  value={formData.essential.q2_sustainableSourcing.percentageSustainablySourced}
                  onChange={(e) =>
                    handleFieldChange("essential.q2_sustainableSourcing.percentageSustainablySourced", e.target.value)
                  }
                  placeholder="Percentage"
                />
              </div>
            </div>
          </div>

          {/* Q3: Reclaim Processes */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-800">
              Q3. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing
              at the end of life
            </Label>

            {/* Plastics */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">a. Plastics (including packaging)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q3-plastics-applicable">Applicable (Y/N)</Label>
                  <Input
                    id="q3-plastics-applicable"
                    value={formData.essential.q3_reclaimProcesses.plastics.applicable}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.plastics.applicable", e.target.value)
                    }
                    placeholder="Y/N"
                  />
                </div>
                <div>
                  <Label htmlFor="q3-plastics-process">Process Description</Label>
                  <Input
                    id="q3-plastics-process"
                    value={formData.essential.q3_reclaimProcesses.plastics.process}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.plastics.process", e.target.value)
                    }
                    placeholder="Brief description of process"
                  />
                </div>
              </div>
            </div>

            {/* E-waste */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">b. E-waste</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q3-ewaste-applicable">Applicable (Y/N)</Label>
                  <Input
                    id="q3-ewaste-applicable"
                    value={formData.essential.q3_reclaimProcesses.eWaste.applicable}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.eWaste.applicable", e.target.value)
                    }
                    placeholder="Y/N"
                  />
                </div>
                <div>
                  <Label htmlFor="q3-ewaste-process">Process Description</Label>
                  <Input
                    id="q3-ewaste-process"
                    value={formData.essential.q3_reclaimProcesses.eWaste.process}
                    onChange={(e) => handleFieldChange("essential.q3_reclaimProcesses.eWaste.process", e.target.value)}
                    placeholder="Brief description of process"
                  />
                </div>
              </div>
            </div>

            {/* Hazardous Waste */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">c. Hazardous waste</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q3-hazardous-applicable">Applicable (Y/N)</Label>
                  <Input
                    id="q3-hazardous-applicable"
                    value={formData.essential.q3_reclaimProcesses.hazardousWaste.applicable}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.hazardousWaste.applicable", e.target.value)
                    }
                    placeholder="Y/N"
                  />
                </div>
                <div>
                  <Label htmlFor="q3-hazardous-process">Process Description</Label>
                  <Input
                    id="q3-hazardous-process"
                    value={formData.essential.q3_reclaimProcesses.hazardousWaste.process}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.hazardousWaste.process", e.target.value)
                    }
                    placeholder="Brief description of process"
                  />
                </div>
              </div>
            </div>

            {/* Other Waste */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">d. Other waste</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q3-other-applicable">Applicable (Y/N)</Label>
                  <Input
                    id="q3-other-applicable"
                    value={formData.essential.q3_reclaimProcesses.otherWaste.applicable}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.otherWaste.applicable", e.target.value)
                    }
                    placeholder="Y/N"
                  />
                </div>
                <div>
                  <Label htmlFor="q3-other-process">Process Description</Label>
                  <Input
                    id="q3-other-process"
                    value={formData.essential.q3_reclaimProcesses.otherWaste.process}
                    onChange={(e) =>
                      handleFieldChange("essential.q3_reclaimProcesses.otherWaste.process", e.target.value)
                    }
                    placeholder="Brief description of process"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Q4: EPR */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-800">
              Q4. Whether Extended Producer Responsibility (EPR) is applicable to the entity's activities (Yes / No).
              If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR)
              plan submitted to Pollution Control Boards?
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="q4-applicable">EPR Applicable (Yes/No)</Label>
                <Input
                  id="q4-applicable"
                  value={formData.essential.q4_epr.applicable}
                  onChange={(e) => handleFieldChange("essential.q4_epr.applicable", e.target.value)}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="q4-plan">Waste Collection Plan In Line (Yes/No)</Label>
                <Input
                  id="q4-plan"
                  value={formData.essential.q4_epr.wasteCollectionPlanInLine}
                  onChange={(e) => handleFieldChange("essential.q4_epr.wasteCollectionPlanInLine", e.target.value)}
                  placeholder="Yes/No/NA"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LEADERSHIP INDICATORS */}
        <div className="space-y-6 mt-8">
          <h3 className="text-lg font-semibold text-green-700 border-b pb-2">Leadership Indicators</h3>

          {/* Q1: LCA Details */}
          <div className="space-y-2">
            <Label htmlFor="leadership-q1" className="text-base font-semibold text-gray-800">
              Q1. Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for
              manufacturing industry) or for its services (for service industry)? If yes, provide details in the
              following format?
            </Label>
            <Textarea
              id="leadership-q1"
              value={formData.leadership.q1_lcaDetails}
              onChange={(e) => handleFieldChange("leadership.q1_lcaDetails", e.target.value)}
              placeholder="Provide LCA details, or NA if not conducted..."
              rows={3}
            />
          </div>

          {/* Q2: Significant Concerns */}
          <div className="space-y-2">
            <Label htmlFor="leadership-q2" className="text-base font-semibold text-gray-800">
              Q2. If there are any significant social or environmental concerns and/or risks arising from production
              or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA)
              or through any other means, briefly describe the same along-with action taken to mitigate the same.
            </Label>
            <Textarea
              id="leadership-q2"
              value={formData.leadership.q2_significantConcerns}
              onChange={(e) => handleFieldChange("leadership.q2_significantConcerns", e.target.value)}
              placeholder="Describe concerns and mitigation actions, or NA if none..."
              rows={3}
            />
          </div>

          {/* Q3: Recycled Input Material */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-800">
              Q3. Percentage of recycled or reused input material to total material (by value) used in production (for
              manufacturing industry) or providing services (for service industry)
            </Label>
            <p className="text-sm text-gray-600 italic">
              Note: Typically extracted by AI. Manual entry option available if needed.
            </p>
          </div>

          {/* Q4: Products Reclaimed */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-800">
              Q4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes)
              reused, recycled, and safely disposed, as per the following format:
            </Label>

            {/* Plastics */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Plastics (including packaging)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Current FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-plastics-current-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-plastics-current-reused"
                        value={formData.leadership.q4_productsReclaimed.plastics.currentFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.plastics.currentFY.reUsed", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-plastics-current-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-plastics-current-recycled"
                        value={formData.leadership.q4_productsReclaimed.plastics.currentFY.recycled}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.plastics.currentFY.recycled", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-plastics-current-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-plastics-current-disposed"
                        value={formData.leadership.q4_productsReclaimed.plastics.currentFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.plastics.currentFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Previous FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-plastics-previous-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-plastics-previous-reused"
                        value={formData.leadership.q4_productsReclaimed.plastics.previousFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.plastics.previousFY.reUsed", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-plastics-previous-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-plastics-previous-recycled"
                        value={formData.leadership.q4_productsReclaimed.plastics.previousFY.recycled}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.plastics.previousFY.recycled",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-plastics-previous-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-plastics-previous-disposed"
                        value={formData.leadership.q4_productsReclaimed.plastics.previousFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.plastics.previousFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* E-waste */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">E-waste</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Current FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-ewaste-current-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-ewaste-current-reused"
                        value={formData.leadership.q4_productsReclaimed.eWaste.currentFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.eWaste.currentFY.reUsed", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-ewaste-current-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-ewaste-current-recycled"
                        value={formData.leadership.q4_productsReclaimed.eWaste.currentFY.recycled}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.eWaste.currentFY.recycled", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-ewaste-current-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-ewaste-current-disposed"
                        value={formData.leadership.q4_productsReclaimed.eWaste.currentFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.eWaste.currentFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Previous FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-ewaste-previous-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-ewaste-previous-reused"
                        value={formData.leadership.q4_productsReclaimed.eWaste.previousFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.eWaste.previousFY.reUsed", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-ewaste-previous-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-ewaste-previous-recycled"
                        value={formData.leadership.q4_productsReclaimed.eWaste.previousFY.recycled}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.eWaste.previousFY.recycled", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-ewaste-previous-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-ewaste-previous-disposed"
                        value={formData.leadership.q4_productsReclaimed.eWaste.previousFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.eWaste.previousFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hazardous Waste */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Hazardous waste</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Current FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-hazardous-current-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-hazardous-current-reused"
                        value={formData.leadership.q4_productsReclaimed.hazardousWaste.currentFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.hazardousWaste.currentFY.reUsed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-hazardous-current-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-hazardous-current-recycled"
                        value={formData.leadership.q4_productsReclaimed.hazardousWaste.currentFY.recycled}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.hazardousWaste.currentFY.recycled",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-hazardous-current-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-hazardous-current-disposed"
                        value={formData.leadership.q4_productsReclaimed.hazardousWaste.currentFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.hazardousWaste.currentFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Previous FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-hazardous-previous-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-hazardous-previous-reused"
                        value={formData.leadership.q4_productsReclaimed.hazardousWaste.previousFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.hazardousWaste.previousFY.reUsed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-hazardous-previous-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-hazardous-previous-recycled"
                        value={formData.leadership.q4_productsReclaimed.hazardousWaste.previousFY.recycled}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.hazardousWaste.previousFY.recycled",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-hazardous-previous-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-hazardous-previous-disposed"
                        value={formData.leadership.q4_productsReclaimed.hazardousWaste.previousFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.hazardousWaste.previousFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Waste */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Other waste</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Current FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-other-current-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-other-current-reused"
                        value={formData.leadership.q4_productsReclaimed.otherWaste.currentFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.otherWaste.currentFY.reUsed", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-other-current-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-other-current-recycled"
                        value={formData.leadership.q4_productsReclaimed.otherWaste.currentFY.recycled}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.otherWaste.currentFY.recycled",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-other-current-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-other-current-disposed"
                        value={formData.leadership.q4_productsReclaimed.otherWaste.currentFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.otherWaste.currentFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Previous FY</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div>
                      <Label htmlFor="q4-other-previous-reused" className="text-xs">
                        Re-Used (MT)
                      </Label>
                      <Input
                        id="q4-other-previous-reused"
                        value={formData.leadership.q4_productsReclaimed.otherWaste.previousFY.reUsed}
                        onChange={(e) =>
                          handleFieldChange("leadership.q4_productsReclaimed.otherWaste.previousFY.reUsed", e.target.value)
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-other-previous-recycled" className="text-xs">
                        Recycled (MT)
                      </Label>
                      <Input
                        id="q4-other-previous-recycled"
                        value={formData.leadership.q4_productsReclaimed.otherWaste.previousFY.recycled}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.otherWaste.previousFY.recycled",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                    <div>
                      <Label htmlFor="q4-other-previous-disposed" className="text-xs">
                        Safely Disposed (MT)
                      </Label>
                      <Input
                        id="q4-other-previous-disposed"
                        value={formData.leadership.q4_productsReclaimed.otherWaste.previousFY.safelyDisposed}
                        onChange={(e) =>
                          handleFieldChange(
                            "leadership.q4_productsReclaimed.otherWaste.previousFY.safelyDisposed",
                            e.target.value
                          )
                        }
                        placeholder="MT"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Q5: Reclaimed Percentage */}
          <div className="space-y-2">
            <Label htmlFor="leadership-q5" className="text-base font-semibold text-gray-800">
              Q5. Reclaimed products and their packaging materials (as percentage of products sold) for each product
              category
            </Label>
            <Textarea
              id="leadership-q5"
              value={formData.leadership.q5_reclaimedPercentage}
              onChange={(e) => handleFieldChange("leadership.q5_reclaimedPercentage", e.target.value)}
              placeholder="Provide percentage details for each product category, or NA..."
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
