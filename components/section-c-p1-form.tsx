"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface SectionCP1ManualData {
  essential: {
    q1_percentageCoveredByTraining: {
      boardOfDirectors: {
        totalProgrammes: string
        topicsCovered: string
        percentageCovered: string
      }
      kmp: {
        totalProgrammes: string
        topicsCovered: string
        percentageCovered: string
      }
      employees: {
        totalProgrammes: string
        topicsCovered: string
        percentageCovered: string
      }
      workers: {
        totalProgrammes: string
        topicsCovered: string
        percentageCovered: string
      }
    }
    q2_finesPenalties: {
      monetary: Array<{
        type: string
        ngrbc: string
        regulatoryAgency: string
        amountInr: string
        briefOfCase: string
        appealPreferred: string
      }>
      nonMonetary: Array<{
        type: string
        ngrbc: string
        regulatoryAgency: string
        briefOfCase: string
        appealPreferred: string
      }>
    }
    q3_appealsOutstanding: string
    q4_antiCorruptionPolicy: {
      exists: string
      details: string
      webLink: string
    }
    q5_disciplinaryActions: {
      directors: { currentFY: string; previousFY: string }
      kmps: { currentFY: string; previousFY: string }
      employees: { currentFY: string; previousFY: string }
      workers: { currentFY: string; previousFY: string }
    }
    q6_conflictOfInterestComplaints: {
      directors: {
        currentFY: { number: string; remarks: string }
        previousFY: { number: string; remarks: string }
      }
      kmps: {
        currentFY: { number: string; remarks: string }
        previousFY: { number: string; remarks: string }
      }
    }
    q7_correctiveActions: string
    q8_accountsPayableDays: {
      currentFY: string
      previousFY: string
    }
    q9_opennessBusiness: {
      concentrationPurchases: {
        tradingHousesPercent: { currentFY: string; previousFY: string }
        dealersCount: { currentFY: string; previousFY: string }
        top10TradingHouses: { currentFY: string; previousFY: string }
      }
      concentrationSales: {
        dealersDistributorsPercent: { currentFY: string; previousFY: string }
        dealersCount: { currentFY: string; previousFY: string }
        top10Dealers: { currentFY: string; previousFY: string }
      }
      shareRPTs: {
        purchases: { currentFY: string; previousFY: string }
        sales: { currentFY: string; previousFY: string }
        loansAdvances: { currentFY: string; previousFY: string }
        investments: { currentFY: string; previousFY: string }
      }
    }
  }
  leadership: {
    q1_valueChainAwareness: Array<{
      totalProgramsHeld: string
      topicsCovered: string
      percentageValueChainCovered: string
    }>
    q2_conflictOfInterestProcess: {
      details: string
    }
  }
}

interface SectionCP1FormProps {
  onDataChange?: (data: SectionCP1ManualData) => void
  initialData?: Partial<SectionCP1ManualData>
}

const defaultData: SectionCP1ManualData = {
  essential: {
    q1_percentageCoveredByTraining: {
      boardOfDirectors: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
      kmp: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
      employees: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
      workers: { totalProgrammes: "", topicsCovered: "", percentageCovered: "" },
    },
    q2_finesPenalties: {
      monetary: [],
      nonMonetary: [],
    },
    q3_appealsOutstanding: "",
    q4_antiCorruptionPolicy: {
      exists: "",
      details: "",
      webLink: "",
    },
    q5_disciplinaryActions: {
      directors: { currentFY: "", previousFY: "" },
      kmps: { currentFY: "", previousFY: "" },
      employees: { currentFY: "", previousFY: "" },
      workers: { currentFY: "", previousFY: "" },
    },
    q6_conflictOfInterestComplaints: {
      directors: {
        currentFY: { number: "", remarks: "" },
        previousFY: { number: "", remarks: "" },
      },
      kmps: {
        currentFY: { number: "", remarks: "" },
        previousFY: { number: "", remarks: "" },
      },
    },
    q7_correctiveActions: "",
    q8_accountsPayableDays: {
      currentFY: "",
      previousFY: "",
    },
    q9_opennessBusiness: {
      concentrationPurchases: {
        tradingHousesPercent: { currentFY: "", previousFY: "" },
        dealersCount: { currentFY: "", previousFY: "" },
        top10TradingHouses: { currentFY: "", previousFY: "" },
      },
      concentrationSales: {
        dealersDistributorsPercent: { currentFY: "", previousFY: "" },
        dealersCount: { currentFY: "", previousFY: "" },
        top10Dealers: { currentFY: "", previousFY: "" },
      },
      shareRPTs: {
        purchases: { currentFY: "", previousFY: "" },
        sales: { currentFY: "", previousFY: "" },
        loansAdvances: { currentFY: "", previousFY: "" },
        investments: { currentFY: "", previousFY: "" },
      },
    },
  },
  leadership: {
    q1_valueChainAwareness: [],
    q2_conflictOfInterestProcess: {
      details: "",
    },
  },
}

export function SectionCP1Form({ onDataChange, initialData }: SectionCP1FormProps) {
  const [formData, setFormData] = useState<SectionCP1ManualData>(() => {
    if (!initialData) return defaultData

    return {
      essential: {
        q1_percentageCoveredByTraining: {
          boardOfDirectors: {
            ...defaultData.essential.q1_percentageCoveredByTraining.boardOfDirectors,
            ...initialData.essential?.q1_percentageCoveredByTraining?.boardOfDirectors,
          },
          kmp: {
            ...defaultData.essential.q1_percentageCoveredByTraining.kmp,
            ...initialData.essential?.q1_percentageCoveredByTraining?.kmp,
          },
          employees: {
            ...defaultData.essential.q1_percentageCoveredByTraining.employees,
            ...initialData.essential?.q1_percentageCoveredByTraining?.employees,
          },
          workers: {
            ...defaultData.essential.q1_percentageCoveredByTraining.workers,
            ...initialData.essential?.q1_percentageCoveredByTraining?.workers,
          },
        },
        q2_finesPenalties: {
          monetary: initialData.essential?.q2_finesPenalties?.monetary || [],
          nonMonetary: initialData.essential?.q2_finesPenalties?.nonMonetary || [],
        },
        q3_appealsOutstanding: initialData.essential?.q3_appealsOutstanding || "",
        q4_antiCorruptionPolicy: {
          ...defaultData.essential.q4_antiCorruptionPolicy,
          ...initialData.essential?.q4_antiCorruptionPolicy,
        },
        q5_disciplinaryActions: {
          directors: {
            ...defaultData.essential.q5_disciplinaryActions.directors,
            ...initialData.essential?.q5_disciplinaryActions?.directors,
          },
          kmps: {
            ...defaultData.essential.q5_disciplinaryActions.kmps,
            ...initialData.essential?.q5_disciplinaryActions?.kmps,
          },
          employees: {
            ...defaultData.essential.q5_disciplinaryActions.employees,
            ...initialData.essential?.q5_disciplinaryActions?.employees,
          },
          workers: {
            ...defaultData.essential.q5_disciplinaryActions.workers,
            ...initialData.essential?.q5_disciplinaryActions?.workers,
          },
        },
        q6_conflictOfInterestComplaints: {
          directors: {
            currentFY: {
              ...defaultData.essential.q6_conflictOfInterestComplaints.directors.currentFY,
              ...initialData.essential?.q6_conflictOfInterestComplaints?.directors?.currentFY,
            },
            previousFY: {
              ...defaultData.essential.q6_conflictOfInterestComplaints.directors.previousFY,
              ...initialData.essential?.q6_conflictOfInterestComplaints?.directors?.previousFY,
            },
          },
          kmps: {
            currentFY: {
              ...defaultData.essential.q6_conflictOfInterestComplaints.kmps.currentFY,
              ...initialData.essential?.q6_conflictOfInterestComplaints?.kmps?.currentFY,
            },
            previousFY: {
              ...defaultData.essential.q6_conflictOfInterestComplaints.kmps.previousFY,
              ...initialData.essential?.q6_conflictOfInterestComplaints?.kmps?.previousFY,
            },
          },
        },
        q7_correctiveActions: initialData.essential?.q7_correctiveActions || "",
        q8_accountsPayableDays: {
          ...defaultData.essential.q8_accountsPayableDays,
          ...initialData.essential?.q8_accountsPayableDays,
        },
        q9_opennessBusiness: {
          concentrationPurchases: {
            tradingHousesPercent: {
              ...defaultData.essential.q9_opennessBusiness.concentrationPurchases.tradingHousesPercent,
              ...initialData.essential?.q9_opennessBusiness?.concentrationPurchases?.tradingHousesPercent,
            },
            dealersCount: {
              ...defaultData.essential.q9_opennessBusiness.concentrationPurchases.dealersCount,
              ...initialData.essential?.q9_opennessBusiness?.concentrationPurchases?.dealersCount,
            },
            top10TradingHouses: {
              ...defaultData.essential.q9_opennessBusiness.concentrationPurchases.top10TradingHouses,
              ...initialData.essential?.q9_opennessBusiness?.concentrationPurchases?.top10TradingHouses,
            },
          },
          concentrationSales: {
            dealersDistributorsPercent: {
              ...defaultData.essential.q9_opennessBusiness.concentrationSales.dealersDistributorsPercent,
              ...initialData.essential?.q9_opennessBusiness?.concentrationSales?.dealersDistributorsPercent,
            },
            dealersCount: {
              ...defaultData.essential.q9_opennessBusiness.concentrationSales.dealersCount,
              ...initialData.essential?.q9_opennessBusiness?.concentrationSales?.dealersCount,
            },
            top10Dealers: {
              ...defaultData.essential.q9_opennessBusiness.concentrationSales.top10Dealers,
              ...initialData.essential?.q9_opennessBusiness?.concentrationSales?.top10Dealers,
            },
          },
          shareRPTs: {
            purchases: {
              ...defaultData.essential.q9_opennessBusiness.shareRPTs.purchases,
              ...initialData.essential?.q9_opennessBusiness?.shareRPTs?.purchases,
            },
            sales: {
              ...defaultData.essential.q9_opennessBusiness.shareRPTs.sales,
              ...initialData.essential?.q9_opennessBusiness?.shareRPTs?.sales,
            },
            loansAdvances: {
              ...defaultData.essential.q9_opennessBusiness.shareRPTs.loansAdvances,
              ...initialData.essential?.q9_opennessBusiness?.shareRPTs?.loansAdvances,
            },
            investments: {
              ...defaultData.essential.q9_opennessBusiness.shareRPTs.investments,
              ...initialData.essential?.q9_opennessBusiness?.shareRPTs?.investments,
            },
          },
        },
      },
      leadership: {
        q1_valueChainAwareness: initialData.leadership?.q1_valueChainAwareness || [],
        q2_conflictOfInterestProcess: {
          ...defaultData.leadership.q2_conflictOfInterestProcess,
          ...initialData.leadership?.q2_conflictOfInterestProcess,
        },
      },
    }
  })

  const handleAutoFill = () => {
    const dummyData: SectionCP1ManualData = {
      essential: {
        q1_percentageCoveredByTraining: {
          boardOfDirectors: { totalProgrammes: "4", topicsCovered: "Ethics", percentageCovered: "100%" },
          kmp: { totalProgrammes: "6", topicsCovered: "Compliance", percentageCovered: "100%" },
          employees: { totalProgrammes: "250", topicsCovered: "Code of Conduct", percentageCovered: "85%" },
          workers: { totalProgrammes: "500", topicsCovered: "Safety", percentageCovered: "90%" },
        },
        q2_finesPenalties: { monetary: [], nonMonetary: [] },
        q3_appealsOutstanding: "None",
        q4_antiCorruptionPolicy: { hasPolicy: "Yes", details: "Comprehensive anti-corruption policy", webLink: "https://example.com/policy" },
        q5_disciplinaryActions: {
          directors: { currentFY: "0", previousFY: "0" },
          kmps: { currentFY: "0", previousFY: "0" },
          employees: { currentFY: "2", previousFY: "1" },
          workers: { currentFY: "5", previousFY: "3" },
        },
        q6_conflictOfInterestComplaints: {
          directors: { currentFY: { number: "0", remarks: "None" }, previousFY: { number: "0", remarks: "None" } },
          kmps: { currentFY: { number: "0", remarks: "None" }, previousFY: { number: "0", remarks: "None" } },
        },
        q7_correctiveActions: "No major issues reported",
        q8_accountsPayableDays: { currentFY: "45", previousFY: "42" },
        q9_opennessBusiness: {
          concentrationPurchases: {
            tradingHousesPercent: { currentFY: "15%", previousFY: "18%" },
            dealersCount: { currentFY: "25", previousFY: "23" },
            top10TradingHouses: { currentFY: "60%", previousFY: "65%" },
          },
          concentrationSales: {
            dealersDistributorsPercent: { currentFY: "40%", previousFY: "38%" },
            dealersCount: { currentFY: "50", previousFY: "48" },
            top10Dealers: { currentFY: "55%", previousFY: "58%" },
          },
          shareRPTs: {
            purchases: { currentFY: "5%", previousFY: "4%" },
            sales: { currentFY: "3%", previousFY: "2%" },
            loansAdvances: { currentFY: "0%", previousFY: "0%" },
            investments: { currentFY: "10%", previousFY: "8%" },
          },
        },
      },
      leadership: {
        q1_valueChainAwareness: [{ totalProgramsHeld: "100", topicsCovered: "Sustainability training", percentageValueChainCovered: "75%" }],
        q2_conflictOfInterestProcess: { details: "Comprehensive disclosure and review process" },
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
              Section C - Principle 1: Ethical, Transparent and Accountable
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent
              and Accountable.
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

          {/* Q1: Training Coverage */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-800">
              Q1. Percentage coverage by training and awareness programmes on any of the Principles during the
              financial year
            </Label>

            {/* Board of Directors */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Board of Directors</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q1-bod-total">Total Programmes</Label>
                  <Input
                    id="q1-bod-total"
                    value={formData.essential.q1_percentageCoveredByTraining.boardOfDirectors.totalProgrammes}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.boardOfDirectors.totalProgrammes", e.target.value)
                    }
                    placeholder="Number of programmes"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-bod-topics">Topics Covered</Label>
                  <Input
                    id="q1-bod-topics"
                    value={formData.essential.q1_percentageCoveredByTraining.boardOfDirectors.topicsCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.boardOfDirectors.topicsCovered", e.target.value)
                    }
                    placeholder="Topics/principles covered"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-bod-percent">% Covered</Label>
                  <Input
                    id="q1-bod-percent"
                    value={formData.essential.q1_percentageCoveredByTraining.boardOfDirectors.percentageCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.boardOfDirectors.percentageCovered", e.target.value)
                    }
                    placeholder="Percentage"
                  />
                </div>
              </div>
            </div>

            {/* KMP */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Key Managerial Personnel</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q1-kmp-total">Total Programmes</Label>
                  <Input
                    id="q1-kmp-total"
                    value={formData.essential.q1_percentageCoveredByTraining.kmp.totalProgrammes}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.kmp.totalProgrammes", e.target.value)
                    }
                    placeholder="Number of programmes"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-kmp-topics">Topics Covered</Label>
                  <Input
                    id="q1-kmp-topics"
                    value={formData.essential.q1_percentageCoveredByTraining.kmp.topicsCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.kmp.topicsCovered", e.target.value)
                    }
                    placeholder="Topics/principles covered"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-kmp-percent">% Covered</Label>
                  <Input
                    id="q1-kmp-percent"
                    value={formData.essential.q1_percentageCoveredByTraining.kmp.percentageCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.kmp.percentageCovered", e.target.value)
                    }
                    placeholder="Percentage"
                  />
                </div>
              </div>
            </div>

            {/* Employees */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Employees other than BoD and KMPs</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q1-emp-total">Total Programmes</Label>
                  <Input
                    id="q1-emp-total"
                    value={formData.essential.q1_percentageCoveredByTraining.employees.totalProgrammes}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.employees.totalProgrammes", e.target.value)
                    }
                    placeholder="Number of programmes"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-emp-topics">Topics Covered</Label>
                  <Input
                    id="q1-emp-topics"
                    value={formData.essential.q1_percentageCoveredByTraining.employees.topicsCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.employees.topicsCovered", e.target.value)
                    }
                    placeholder="Topics/principles covered"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-emp-percent">% Covered</Label>
                  <Input
                    id="q1-emp-percent"
                    value={formData.essential.q1_percentageCoveredByTraining.employees.percentageCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.employees.percentageCovered", e.target.value)
                    }
                    placeholder="Percentage"
                  />
                </div>
              </div>
            </div>

            {/* Workers */}
            <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
              <p className="font-medium text-sm text-gray-700">Workers</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="q1-workers-total">Total Programmes</Label>
                  <Input
                    id="q1-workers-total"
                    value={formData.essential.q1_percentageCoveredByTraining.workers.totalProgrammes}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.workers.totalProgrammes", e.target.value)
                    }
                    placeholder="Number of programmes"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-workers-topics">Topics Covered</Label>
                  <Input
                    id="q1-workers-topics"
                    value={formData.essential.q1_percentageCoveredByTraining.workers.topicsCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.workers.topicsCovered", e.target.value)
                    }
                    placeholder="Topics/principles covered"
                  />
                </div>
                <div>
                  <Label htmlFor="q1-workers-percent">% Covered</Label>
                  <Input
                    id="q1-workers-percent"
                    value={formData.essential.q1_percentageCoveredByTraining.workers.percentageCovered}
                    onChange={(e) =>
                      handleFieldChange("essential.q1_percentageCoveredByTraining.workers.percentageCovered", e.target.value)
                    }
                    placeholder="Percentage"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Q2: Note about Fines/Penalties */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-800">
              Q2. Details of fines / penalties / punishment / award / compounding fees / settlement amount paid in
              proceedings
            </Label>
            <p className="text-sm text-gray-600 italic">
              Note: Fines/penalties data is typically extracted by AI. Use the extracted values or add manual entries
              if needed.
            </p>
          </div>

          {/* Q3: Appeals Outstanding */}
          <div className="space-y-2">
            <Label htmlFor="q3-appeals" className="text-base font-semibold text-gray-800">
              Q3. Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred
            </Label>
            <Textarea
              id="q3-appeals"
              value={formData.essential.q3_appealsOutstanding}
              onChange={(e) => handleFieldChange("essential.q3_appealsOutstanding", e.target.value)}
              placeholder="Provide details of appeals or revisions..."
              rows={3}
            />
          </div>

          {/* Q4: Anti-Corruption Policy */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-800">
              Q4. Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and
              if available, provide a web-link to the policy
            </Label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="q4-exists">Policy Exists (Yes/No)</Label>
                <Input
                  id="q4-exists"
                  value={formData.essential.q4_antiCorruptionPolicy.exists}
                  onChange={(e) => handleFieldChange("essential.q4_antiCorruptionPolicy.exists", e.target.value)}
                  placeholder="Yes/No"
                />
              </div>
              <div>
                <Label htmlFor="q4-details">Brief Details</Label>
                <Input
                  id="q4-details"
                  value={formData.essential.q4_antiCorruptionPolicy.details}
                  onChange={(e) => handleFieldChange("essential.q4_antiCorruptionPolicy.details", e.target.value)}
                  placeholder="Brief description"
                />
              </div>
              <div>
                <Label htmlFor="q4-weblink">Web Link</Label>
                <Input
                  id="q4-weblink"
                  value={formData.essential.q4_antiCorruptionPolicy.webLink}
                  onChange={(e) => handleFieldChange("essential.q4_antiCorruptionPolicy.webLink", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Q5: Disciplinary Actions */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-800">
              Q5. Number of Directors/KMPs/employees/workers against whom disciplinary action was taken by any law
              enforcement agency
            </Label>
            <div className="space-y-4">
              {/* Directors */}
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-700">Directors</div>
                <div>
                  <Label htmlFor="q5-directors-current">Current FY</Label>
                  <Input
                    id="q5-directors-current"
                    value={formData.essential.q5_disciplinaryActions.directors.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.directors.currentFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q5-directors-previous">Previous FY</Label>
                  <Input
                    id="q5-directors-previous"
                    value={formData.essential.q5_disciplinaryActions.directors.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.directors.previousFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
              </div>

              {/* KMPs */}
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-700">KMPs</div>
                <div>
                  <Label htmlFor="q5-kmps-current">Current FY</Label>
                  <Input
                    id="q5-kmps-current"
                    value={formData.essential.q5_disciplinaryActions.kmps.currentFY}
                    onChange={(e) => handleFieldChange("essential.q5_disciplinaryActions.kmps.currentFY", e.target.value)}
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q5-kmps-previous">Previous FY</Label>
                  <Input
                    id="q5-kmps-previous"
                    value={formData.essential.q5_disciplinaryActions.kmps.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.kmps.previousFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
              </div>

              {/* Employees */}
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-700">Employees</div>
                <div>
                  <Label htmlFor="q5-employees-current">Current FY</Label>
                  <Input
                    id="q5-employees-current"
                    value={formData.essential.q5_disciplinaryActions.employees.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.employees.currentFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q5-employees-previous">Previous FY</Label>
                  <Input
                    id="q5-employees-previous"
                    value={formData.essential.q5_disciplinaryActions.employees.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.employees.previousFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
              </div>

              {/* Workers */}
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-700">Workers</div>
                <div>
                  <Label htmlFor="q5-workers-current">Current FY</Label>
                  <Input
                    id="q5-workers-current"
                    value={formData.essential.q5_disciplinaryActions.workers.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.workers.currentFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q5-workers-previous">Previous FY</Label>
                  <Input
                    id="q5-workers-previous"
                    value={formData.essential.q5_disciplinaryActions.workers.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q5_disciplinaryActions.workers.previousFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Q6: Conflict of Interest Complaints */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-800">
              Q6. Details of complaints with regard to conflict of interest
            </Label>
            
            {/* Directors */}
            <div className="space-y-2">
              <p className="font-medium text-sm text-gray-700">Directors</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q6-dir-current-num">Current FY - Number</Label>
                  <Input
                    id="q6-dir-current-num"
                    value={formData.essential.q6_conflictOfInterestComplaints.directors.currentFY.number}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.directors.currentFY.number", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q6-dir-current-remarks">Current FY - Remarks</Label>
                  <Input
                    id="q6-dir-current-remarks"
                    value={formData.essential.q6_conflictOfInterestComplaints.directors.currentFY.remarks}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.directors.currentFY.remarks", e.target.value)
                    }
                    placeholder="Remarks"
                  />
                </div>
                <div>
                  <Label htmlFor="q6-dir-previous-num">Previous FY - Number</Label>
                  <Input
                    id="q6-dir-previous-num"
                    value={formData.essential.q6_conflictOfInterestComplaints.directors.previousFY.number}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.directors.previousFY.number", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q6-dir-previous-remarks">Previous FY - Remarks</Label>
                  <Input
                    id="q6-dir-previous-remarks"
                    value={formData.essential.q6_conflictOfInterestComplaints.directors.previousFY.remarks}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.directors.previousFY.remarks", e.target.value)
                    }
                    placeholder="Remarks"
                  />
                </div>
              </div>
            </div>

            {/* KMPs */}
            <div className="space-y-2">
              <p className="font-medium text-sm text-gray-700">KMPs</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="q6-kmp-current-num">Current FY - Number</Label>
                  <Input
                    id="q6-kmp-current-num"
                    value={formData.essential.q6_conflictOfInterestComplaints.kmps.currentFY.number}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.kmps.currentFY.number", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q6-kmp-current-remarks">Current FY - Remarks</Label>
                  <Input
                    id="q6-kmp-current-remarks"
                    value={formData.essential.q6_conflictOfInterestComplaints.kmps.currentFY.remarks}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.kmps.currentFY.remarks", e.target.value)
                    }
                    placeholder="Remarks"
                  />
                </div>
                <div>
                  <Label htmlFor="q6-kmp-previous-num">Previous FY - Number</Label>
                  <Input
                    id="q6-kmp-previous-num"
                    value={formData.essential.q6_conflictOfInterestComplaints.kmps.previousFY.number}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.kmps.previousFY.number", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q6-kmp-previous-remarks">Previous FY - Remarks</Label>
                  <Input
                    id="q6-kmp-previous-remarks"
                    value={formData.essential.q6_conflictOfInterestComplaints.kmps.previousFY.remarks}
                    onChange={(e) =>
                      handleFieldChange("essential.q6_conflictOfInterestComplaints.kmps.previousFY.remarks", e.target.value)
                    }
                    placeholder="Remarks"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Q7: Corrective Actions */}
          <div className="space-y-2">
            <Label htmlFor="q7-corrective" className="text-base font-semibold text-gray-800">
              Q7. Provide details of any corrective action taken or underway on issues related to fines / penalties /
              action taken by regulators
            </Label>
            <Textarea
              id="q7-corrective"
              value={formData.essential.q7_correctiveActions}
              onChange={(e) => handleFieldChange("essential.q7_correctiveActions", e.target.value)}
              placeholder="Describe corrective actions..."
              rows={3}
            />
          </div>

          {/* Q8: Accounts Payable Days */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-800">
              Q8. Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="q8-current">Current FY</Label>
                <Input
                  id="q8-current"
                  value={formData.essential.q8_accountsPayableDays.currentFY}
                  onChange={(e) => handleFieldChange("essential.q8_accountsPayableDays.currentFY", e.target.value)}
                  placeholder="Number of days"
                />
              </div>
              <div>
                <Label htmlFor="q8-previous">Previous FY</Label>
                <Input
                  id="q8-previous"
                  value={formData.essential.q8_accountsPayableDays.previousFY}
                  onChange={(e) => handleFieldChange("essential.q8_accountsPayableDays.previousFY", e.target.value)}
                  placeholder="Number of days"
                />
              </div>
            </div>
          </div>

          {/* Q9: Openness of Business */}
          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-800">
              Q9. Open-ness of business - Provide details of concentration of purchases and sales with trading houses,
              dealers, and related parties
            </Label>

            {/* Concentration of Purchases */}
            <div className="space-y-3">
              <p className="font-medium text-sm text-green-700">Concentration of Purchases</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Trading Houses %</div>
                <div>
                  <Label htmlFor="q9-purch-trading-current">Current FY</Label>
                  <Input
                    id="q9-purch-trading-current"
                    value={formData.essential.q9_opennessBusiness.concentrationPurchases.tradingHousesPercent.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationPurchases.tradingHousesPercent.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-purch-trading-previous">Previous FY</Label>
                  <Input
                    id="q9-purch-trading-previous"
                    value={formData.essential.q9_opennessBusiness.concentrationPurchases.tradingHousesPercent.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationPurchases.tradingHousesPercent.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Number of Dealers</div>
                <div>
                  <Label htmlFor="q9-purch-dealers-current">Current FY</Label>
                  <Input
                    id="q9-purch-dealers-current"
                    value={formData.essential.q9_opennessBusiness.concentrationPurchases.dealersCount.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationPurchases.dealersCount.currentFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-purch-dealers-previous">Previous FY</Label>
                  <Input
                    id="q9-purch-dealers-previous"
                    value={formData.essential.q9_opennessBusiness.concentrationPurchases.dealersCount.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationPurchases.dealersCount.previousFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Top 10 Trading Houses %</div>
                <div>
                  <Label htmlFor="q9-purch-top10-current">Current FY</Label>
                  <Input
                    id="q9-purch-top10-current"
                    value={formData.essential.q9_opennessBusiness.concentrationPurchases.top10TradingHouses.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationPurchases.top10TradingHouses.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-purch-top10-previous">Previous FY</Label>
                  <Input
                    id="q9-purch-top10-previous"
                    value={formData.essential.q9_opennessBusiness.concentrationPurchases.top10TradingHouses.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationPurchases.top10TradingHouses.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>
            </div>

            {/* Concentration of Sales */}
            <div className="space-y-3">
              <p className="font-medium text-sm text-green-700">Concentration of Sales</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Dealers/Distributors %</div>
                <div>
                  <Label htmlFor="q9-sales-dealers-current">Current FY</Label>
                  <Input
                    id="q9-sales-dealers-current"
                    value={formData.essential.q9_opennessBusiness.concentrationSales.dealersDistributorsPercent.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationSales.dealersDistributorsPercent.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-sales-dealers-previous">Previous FY</Label>
                  <Input
                    id="q9-sales-dealers-previous"
                    value={formData.essential.q9_opennessBusiness.concentrationSales.dealersDistributorsPercent.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationSales.dealersDistributorsPercent.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Number of Dealers</div>
                <div>
                  <Label htmlFor="q9-sales-count-current">Current FY</Label>
                  <Input
                    id="q9-sales-count-current"
                    value={formData.essential.q9_opennessBusiness.concentrationSales.dealersCount.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationSales.dealersCount.currentFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-sales-count-previous">Previous FY</Label>
                  <Input
                    id="q9-sales-count-previous"
                    value={formData.essential.q9_opennessBusiness.concentrationSales.dealersCount.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationSales.dealersCount.previousFY", e.target.value)
                    }
                    placeholder="Number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Top 10 Dealers %</div>
                <div>
                  <Label htmlFor="q9-sales-top10-current">Current FY</Label>
                  <Input
                    id="q9-sales-top10-current"
                    value={formData.essential.q9_opennessBusiness.concentrationSales.top10Dealers.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationSales.top10Dealers.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-sales-top10-previous">Previous FY</Label>
                  <Input
                    id="q9-sales-top10-previous"
                    value={formData.essential.q9_opennessBusiness.concentrationSales.top10Dealers.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.concentrationSales.top10Dealers.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>
            </div>

            {/* Share of RPTs */}
            <div className="space-y-3">
              <p className="font-medium text-sm text-green-700">Share of Related Party Transactions (RPTs)</p>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Purchases</div>
                <div>
                  <Label htmlFor="q9-rpt-purch-current">Current FY</Label>
                  <Input
                    id="q9-rpt-purch-current"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.purchases.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.purchases.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-rpt-purch-previous">Previous FY</Label>
                  <Input
                    id="q9-rpt-purch-previous"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.purchases.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.purchases.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Sales</div>
                <div>
                  <Label htmlFor="q9-rpt-sales-current">Current FY</Label>
                  <Input
                    id="q9-rpt-sales-current"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.sales.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.sales.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-rpt-sales-previous">Previous FY</Label>
                  <Input
                    id="q9-rpt-sales-previous"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.sales.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.sales.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Loans & Advances</div>
                <div>
                  <Label htmlFor="q9-rpt-loans-current">Current FY</Label>
                  <Input
                    id="q9-rpt-loans-current"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.loansAdvances.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.loansAdvances.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-rpt-loans-previous">Previous FY</Label>
                  <Input
                    id="q9-rpt-loans-previous"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.loansAdvances.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.loansAdvances.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium text-sm text-gray-600">Investments</div>
                <div>
                  <Label htmlFor="q9-rpt-invest-current">Current FY</Label>
                  <Input
                    id="q9-rpt-invest-current"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.investments.currentFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.investments.currentFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
                <div>
                  <Label htmlFor="q9-rpt-invest-previous">Previous FY</Label>
                  <Input
                    id="q9-rpt-invest-previous"
                    value={formData.essential.q9_opennessBusiness.shareRPTs.investments.previousFY}
                    onChange={(e) =>
                      handleFieldChange("essential.q9_opennessBusiness.shareRPTs.investments.previousFY", e.target.value)
                    }
                    placeholder="%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERSHIP INDICATORS */}
        <div className="space-y-6 mt-8">
          <h3 className="text-lg font-semibold text-green-700 border-b pb-2">Leadership Indicators</h3>

          {/* Q1: Value Chain Awareness */}
          <div className="space-y-2">
            <Label className="text-base font-semibold text-gray-800">
              Q1. Awareness programmes conducted for value chain partners on any of the Principles during the financial
              year
            </Label>
            <p className="text-sm text-gray-600 italic">
              Note: Typically extracted by AI. Manual entry option available if needed.
            </p>
          </div>

          {/* Q2: Conflict of Interest Process */}
          <div className="space-y-2">
            <Label htmlFor="leadership-q2" className="text-base font-semibold text-gray-800">
              Q2. Does the entity have processes in place to avoid/ manage conflict of interests involving members of
              the Board? (Yes/No) If Yes, provide details of the same.
            </Label>
            <Textarea
              id="leadership-q2"
              value={formData.leadership.q2_conflictOfInterestProcess.details}
              onChange={(e) => handleFieldChange("leadership.q2_conflictOfInterestProcess.details", e.target.value)}
              placeholder="Describe the processes in place..."
              rows={3}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
