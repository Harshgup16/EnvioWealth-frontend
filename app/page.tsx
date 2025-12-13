"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileUpload } from "@/components/file-upload"
import { ReportPreview } from "@/components/report-preview"
import { useToast } from "@/hooks/use-toast"
import { Loader2, FileText, Download } from "lucide-react"

export default function Home() {
  const [formData, setFormData] = useState<any>({})
  const [extractionProgress, setExtractionProgress] = useState(0)
  const [isExtracting, setIsExtracting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (file: File) => {
    setIsExtracting(true)
    setExtractionProgress(0)

    const formDataToSend = new FormData()
    formDataToSend.append("file", file)

    try {
      const progressInterval = setInterval(() => {
        setExtractionProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch("/api/extract", {
        method: "POST",
        body: formDataToSend,
      })

      clearInterval(progressInterval)
      setExtractionProgress(100)

      if (!response.ok) {
        throw new Error("Extraction failed")
      }

      const extractedData = await response.json()
      setFormData(extractedData)
      setShowPreview(true)

      toast({
        title: "Success",
        description: "BRSR data extracted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract data from file",
        variant: "destructive",
      })
    } finally {
      setIsExtracting(false)
      setTimeout(() => setExtractionProgress(0), 1000)
    }
  }

  const loadDemoData = () => {
    const demoData = {
      sectionA: {
        cin: "L23201DL1959GOI003948",
        entityName: "Indian Oil Corporation Limited",
        yearOfIncorporation: "1959",
        registeredAddress: "IndianOil Bhavan, G-9, Ali Yavar Jung Marg, Bandra (East), Mumbai - 400051",
        corporateAddress: "Scope Complex, Core-2, 7 Institutional Area, Lodhi Road, New Delhi-110003",
        email: "corporate@indianoil.in",
        telephone: "011-24360090",
        website: "www.iocl.com",
        financialYear: "2023-24",
        stockExchanges: "BSE, NSE",
        paidUpCapital: "₹10,973.76 Crores",
        contactName: "Kamal Kumar Gwalani",
        contactDesignation: "Company Secretary",
        contactPhone: "011-24364869",
        contactEmail: "gkk@indianoil.in",
        reportingBoundary: "Standalone",
        assuranceProvider: "Deloitte Haskins & Sells LLP",
        assuranceType: "Limited Assurance",

        businessActivities: [
          {
            mainActivity: "Oil & Gas Refining",
            businessDescription:
              "Refining of crude oil into petroleum products including Motor Spirit (MS), High-Speed Diesel (HSD), Aviation Turbine Fuel (ATF), Liquefied Petroleum Gas (LPG)",
            turnoverPercent: "78.5%",
          },
          {
            mainActivity: "Marketing & Distribution",
            businessDescription:
              "Marketing and distribution of petroleum products through retail outlets, bulk consumers, and institutional sales",
            turnoverPercent: "18.2%",
          },
          {
            mainActivity: "Petrochemicals",
            businessDescription: "Production and sale of petrochemical products, polymers, and specialty chemicals",
            turnoverPercent: "3.3%",
          },
        ],

        products: [
          { name: "Motor Spirit (Petrol)", nicCode: "19201", turnoverPercent: "32.4%" },
          { name: "High Speed Diesel", nicCode: "19201", turnoverPercent: "38.6%" },
          { name: "Aviation Turbine Fuel", nicCode: "19201", turnoverPercent: "12.8%" },
          { name: "LPG", nicCode: "19201", turnoverPercent: "8.9%" },
          { name: "Lubricants", nicCode: "19202", turnoverPercent: "4.1%" },
          { name: "Petrochemicals", nicCode: "20111", turnoverPercent: "3.2%" },
        ],

        nationalPlants: "11",
        nationalOffices: "145",
        internationalPlants: "2",
        internationalOffices: "8",
        nationalStates: "36 States/UTs",
        internationalCountries: "24 countries",
        exportContribution: "18%",

        employees: {
          permanent: { male: 29456, female: 2345, total: 31801 },
          otherThanPermanent: { male: 1234, female: 234, total: 1468 },
        },

        workers: {
          permanent: { male: 5234, female: 456, total: 5690 },
          otherThanPermanent: { male: 12456, female: 1234, total: 13690 },
        },

        board: { total: 10, female: 3, femalePercent: "30%" },
        kmp: { total: 8, female: 1, femalePercent: "12.5%" },

        turnover: {
          employees: { male: "3.2%", female: "2.9%", total: "3.1%" },
          workers: { male: "8.5%", female: "7.8%", total: "8.2%" },
        },

        subsidiaries:
          "1. Chennai Petroleum Corporation Limited (Subsidiary, 51.89%) 2. IndianOil LNG Pvt. Ltd. (Subsidiary, 100%) 3. IndianOil Petronas Pvt. Ltd. (Joint Venture, 50%) 4. Petronet LNG Limited (Associate, 12.5%)",

        csr: {
          prescribedAmount: "₹185.88 Crores",
          amountSpent: "₹723.45 Crores",
          surplus: "₹537.57 Crores",
        },

        complaints: {
          communities: { filed: 12, pending: 2, remarks: "None" },
          investors: { filed: 5, pending: 0, remarks: "None" },
          shareholders: { filed: 23, pending: 1, remarks: "None" },
          employees: { filed: 67, pending: 2, remarks: "None" },
          customers: { filed: 234, pending: 6, remarks: "None" },
          valueChain: { filed: 8, pending: 0, remarks: "None" },
        },

        materialIssues: [
          {
            issue: "Climate Change & GHG Emissions",
            type: "Risk",
            rationale: "Regulatory requirements and stakeholder expectations for carbon neutrality",
            approach: "Mitigation through renewable energy investments and carbon reduction initiatives",
            financialImplications: "Negative short-term due to CAPEX; Positive long-term through compliance",
          },
          {
            issue: "Energy Transition",
            type: "Opportunity",
            rationale: "Market shift towards cleaner fuels and electric mobility",
            approach: "Investing in green hydrogen, biofuels, and EV charging infrastructure",
            financialImplications: "Positive through new revenue streams and market leadership",
          },
          {
            issue: "Water Management",
            type: "Risk",
            rationale: "Water scarcity in operational areas affecting production",
            approach: "Water recycling, rainwater harvesting, and zero liquid discharge",
            financialImplications: "Cost savings through reduced consumption and treatment",
          },
        ],
      },

      sectionB: {
        policyMatrix: {
          p1: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/ethics" },
          p2: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/sustainability" },
          p3: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/employee-welfare" },
          p4: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/stakeholder" },
          p5: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/human-rights" },
          p6: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/environment" },
          p7: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/public-policy" },
          p8: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/csr" },
          p9: { hasPolicy: "Y", approvedByBoard: "Y", webLink: "https://iocl.com/customer" },
        },

        governance: {
          directorStatement:
            "The Board is committed to highest standards of corporate governance and sustainability, recognizing our responsibility towards all stakeholders including employees, communities, environment, and future generations.",
          frequencyReview: "Quarterly by CSR & Sustainability Committee",
          chiefResponsibility: "Director (HR) - Member of Board of Directors",
          weblink: "https://iocl.com/governance",
        },
      },

      sectionC: {
        principle1: {
          essential: {
            q1_percentageCoveredByTraining: {
              boardOfDirectors: {
                totalProgrammes: "4",
                topicsCovered: "Yarn & Fabric business performance and strategy, Changes in economic and industrial scenario, CSR, Sustainability initiatives and Renewable energy related matters.",
                percentageCovered: "100%",
              },
              kmp: {
                totalProgrammes: "4",
                topicsCovered: "Yarn & Fabric business performance and strategy, Changes in economic and industrial scenario, CSR, Sustainability initiatives and Renewable energy related matters.",
                percentageCovered: "100%",
              },
              employees: {
                totalProgrammes: "250",
                topicsCovered: "Labour Laws,Managing Seniors Expectations & Service Orientation, Problem Solving Tools (KK).",
                percentageCovered: "74%",
              },
              workers: {
                totalProgrammes: "6701",
                topicsCovered: "PACE, Fire safety, First- aid, Energy Saving, PPE's, Do's and Don'ts at shop floor, Technical, TPM, Health and Hygiene, Waste Management.",
                percentageCovered: "85%",
              },
            },
            q2_finesPenalties: {
              monetary: [
                { type: "Penalty/ Fine", ngrbc: "NIL", regulatoryAgency: "NIL", amountInr: "NIL", briefOfCase: "NIL", appealPreferred: "NIL" },
                { type: "Settlement", ngrbc: "NIL", regulatoryAgency: "NIL", amountInr: "NIL", briefOfCase: "NIL", appealPreferred: "NIL" },
                { type: "Compounding fee", ngrbc: "NIL", regulatoryAgency: "NIL", amountInr: "NIL", briefOfCase: "NIL", appealPreferred: "NIL" },
              ],
              nonMonetary: [
                { type: "Imprisonment", ngrbc: "NIL", regulatoryAgency: "NIL", briefOfCase: "NIL", appealPreferred: "NIL" },
                { type: "Punishment", ngrbc: "NIL", regulatoryAgency: "NIL", briefOfCase: "NIL", appealPreferred: "NIL" },
              ]
            },
            q3_appealsOutstanding: "NA",
            q4_antiCorruptionPolicy: {
              exists: "Yes",
              details: "The Vigil Mechanism of the Company, which also incorporates a whistle blower policy in terms of the Uniform Listing Agreement aims to provide a channel to the employees and directors to report to the Management concerns about unethical behavior, actual or suspected fraud or violation of the Codes of Conduct or Policy. The mechanism provides for adequate safeguards against victimization of employees and also provide for direct access to the Chairman/ Chairman of the Audit Committee in exceptional cases. The vigil mechanism/ whistle blower policy is available at the Company's website at the link https://www.vardhman.com/Document/Report/Company%20Information/Policies/Vardhman%20Textiles%20Ltd/Whistle_Blower_Policy.pdf",
              webLink: "https://www.vardhman.com/Document/Report/Company%20Information/Policies/Vardhman%20Textiles%20Ltd/Whistle_Blower_Policy.pdf"
            },
            q5_disciplinaryActions: {
              directors: { currentFY: "NIL", previousFY: "NIL" },
              kmps: { currentFY: "NIL", previousFY: "NIL" },
              employees: { currentFY: "NIL", previousFY: "NIL" },
              workers: { currentFY: "NIL", previousFY: "NIL" }
            },
            q6_conflictOfInterestComplaints: {
              directors: {
                currentFY: { number: "NIL", remarks: "-" },
                previousFY: { number: "NIL", remarks: "-" }
              },
              kmps: {
                currentFY: { number: "NIL", remarks: "-" },
                previousFY: { number: "NIL", remarks: "-" }
              }
            },
            q7_correctiveActions: "NOT APPLICABLE",
            q8_accountsPayableDays: {
              currentFY: "23.32",
              previousFY: "16.21"
            },
            q9_opennessBusiness: {
              concentrationPurchases: {
                tradingHousesPercent: { currentFY: "11%", previousFY: "25%" },
                dealersCount: { currentFY: "17", previousFY: "20" },
                top10TradingHouses: { currentFY: "94%", previousFY: "85%" }
              },
              concentrationSales: {
                dealersDistributorsPercent: { currentFY: "31%", previousFY: "33%" },
                dealersCount: { currentFY: "52", previousFY: "49" },
                top10Dealers: { currentFY: "59%", previousFY: "61%" }
              },
              shareRPTs: {
                purchases: { currentFY: "1.61%", previousFY: "2.96%" },
                sales: { currentFY: "0.73%", previousFY: "0.86%" },
                loansAdvances: { currentFY: "NIL", previousFY: "NIL" },
                investments: { currentFY: "NIL", previousFY: "NIL" }
              }
            }
          },
          leadership: {
            q1_valueChainAwareness: [{
              totalProgramsHeld: "1077",
              topicsCovered: "1. Water Stewardship at Cotton Farms 2. Water Budgeting 3. How Agriculture is affecting the Climate change and what are the mitigation and adaptations which farmers can adopt to address climate change 4. Soil health management practices 5.Non Chemical based practices to maintain soil health 6. Enhancing biodiversity and preservation of biodiversity 7. Importance of Riparian zones and importance of its protection 8. Practices to Enhance livelihood of village community. 9. Awareness on child labour and forced labour, minimum wages and safe working conditions for workers.",
              percentageValueChainCovered: "-",
            },
            {
              totalProgramsHeld: "437",
              topicsCovered: "1. Non-chemical based crop protection practices 2. Safe use, handling, storage and application of pesticides 3. Importance of Plant protection equipment (PPEs) 4. Safe disposing of empty pesticide containers.",
              percentageValueChainCovered: "-",
            },
            {
              totalProgramsHeld: "460",
              topicsCovered: "1. Training on how to maintain fibre quality of cotton 2. Problem of contamination in cotton and measures to address it.",
              percentageValueChainCovered: "-",
            },
            {
              totalProgramsHeld: "101",
              topicsCovered: "1.Women improvement 2. Measure to upliftment to disadvantage groups through linkage with Govt. Schemes 3. Livelihood 4. Domestic violence and importance of Girl education.",
              percentageValueChainCovered: "-",
            }],
            q2_conflictOfInterestProcess: {
              exists: "Yes",
              details: "Yes, the entity has a Code of Conduct that applies to all directors and senior employees. This Code is designed to uphold the highest standards of business conduct in accordance with the Company's ethics. It provides guidance for navigating conflicts of interest and moral dilemmas, ensuring compliance with all applicable laws. All senior employees are required to read, understand and agree to adhere to this Code. The Code of Conduct is available at the Company's website https://www.vardhman.com/Document/Report/Company%20Information/Policies/Vardhman%20Textiles%20Ltd/Code_of_Conduct_for_Directors_&_Senior_Management.pdf"
            }
          },
        },
        principle2: {
          essential: {
            q1_rdCapexInvestments: {
              rd: { currentFY: "100%", previousFY: "100%", improvementDetails: "The Company is working to develop new fuels, processes, and alternative energy sources. The entirety of R&D activities is directly or indirectly contributing to emission reduction or improvement in product efficiency, which in turn leads to further emission reduction. Energy Security & efficiency, alternate energy, renewable energy, pipeline transportation, energy transition & clean energy etc." },
              capex: { currentFY: "100%", previousFY: "100%", improvementDetails: "Energy Security & efficiency, alternate energy, renewable energy, pipeline transportation, energy transition & clean energy etc." }
            },
            q2_sustainableSourcing: {
              proceduresInPlace: "The Company has a well-established vendor selection process that addresses social, ethical, and environmental considerations as mandated by law. The Company employs a transparent tendering process for vendor selection. All tender invitations of the Company include General Conditions of Contract covering aspects regarding prohibition of child labor and welfare of contractual labor. Environmental screening parameters such as adherence to IS/BIS/OSHAS standards or performance criteria, are specified on tender-to-tender basis. Additionally, the Company has implemented purchase preference conditions to engage vendors from categories such as local suppliers, MSE vendors, startups, and women entrepreneurs.",
              percentageSustainablySourced: "42.46% of the total procurement of the Company's inputs were sourced from MSE vendors."
            },
            q3_reclaimProcesses: {
              plastics: {
                applicable: "Yes",
                process: "The Company is actively implementing measures for collection and recycling of waste which can then be added with virgin material to form new products, thereby promoting circular economy. For example, for lubricants packaging material, the Company has started collecting once used plastic container through collection centers operated by third-party vendors, with the target of undertaking responsible waste disposal in line with the guidelines issued by MoEF&CC."
              },
              eWaste: {
                applicable: "No",
                process: "E-waste does not make a part in your Company's product portfolio."
              },
              hazardousWaste: {
                applicable: "Yes",
                process: "The Company has awarded work for creation of state-wise centers for collection of used lube oil containers (hazardous waste) as per EPR Rules and Guidelines"
              },
              otherWaste: {
                applicable: "",
                process: "Not Applicable"
              }
            },
            q4_epr: {
              applicable: "Yes",
              wasteCollectionPlanInLine: "Yes, the Company is registered under EPR along with complying with the norms stipulated by Central Pollution Control Board (CPCB) in Plastic Waste Management Rules and its subsequent amendments. Extended Producer Responsibility (EPR) applies to the lubricant sales (recycling of used oil) and the plastic packaging used for the product. Plastic packaging recycling or safe disposal is undertaken as per regulations. The waste collection plan is aligned with the EPR plan submitted to the Pollution Control Board. During 2023-24, the Company has successfully achieved its EPR target."
            },
          },
          leadership: {
            q1_lcaDetails: "No LCA undertaken during 2023-24.",
            q2_significantConcerns: "Not Applicable",
            q3_recycledInputMaterial: [
              { inputMaterial: "Recycled Base Oil", currentFY: "0.15%", previousFY: "0.08%*" }
            ],
            q4_productsReclaimed: {
              plastics: {
                currentFY: { reUsed: "0", recycled: "0", safelyDisposed: "7,661*" },
                previousFY: { reUsed: "0", recycled: "0", safelyDisposed: "69.55" }
              },
              eWaste: {
                currentFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" },
                previousFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" }
              },
              hazardousWaste: {
                currentFY: { reUsed: "0", recycled: "0", safelyDisposed: "222.82" },
                previousFY: { reUsed: "0", recycled: "0", safelyDisposed: "133" }
              },
              otherWaste: {
                currentFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" },
                previousFY: { reUsed: "-", recycled: "-", safelyDisposed: "-" }
              }
            },
            q5_reclaimedPercentage: "The Company was assigned targets for recycling plastic packaging waste under EPR. The Company successfully fulfilled the EPR target for 2023-24 by reclaiming plastic waste equivalent to 100% of the total plastic used in lubricant packaging."
          },
        },
        principle3: {
          essential: {
            q1a_employeeWellbeing: {
              permanentMale: { 
                total: "3424",
                healthInsurance: { no: "0", percent: "0%" },
                accidentInsurance: { no: "3424", percent: "100%" },
                maternityBenefits: { no: "NA", percent: "NA" },
                paternityBenefits: { no: "NA", percent: "NA" },
                dayCare: { no: "NA", percent: "NA" }
              },
              permanentFemale: { 
                total: "421",
                healthInsurance: { no: "0", percent: "0%" },
                accidentInsurance: { no: "421", percent: "100%" },
                maternityBenefits: { no: "421", percent: "100%" },
                paternityBenefits: { no: "NA", percent: "NA" },
                dayCare: { no: "421", percent: "100%" }
              },
              permanentTotal: { 
                total: "3845",
                healthInsurance: { no: "0", percent: "0%" },
                accidentInsurance: { no: "3845", percent: "100%" },
                maternityBenefits: { no: "421", percent: "10.95%" },
                paternityBenefits: { no: "NA", percent: "NA" },
                dayCare: { no: "421", percent: "10.95%" }
              },
              otherMale: "Not Applicable",
              otherFemale: "Not Applicable",
              otherTotal: "Not Applicable"
            },
            q1b_workerWellbeing: {
              permanentMale: { 
                total: "13082",
                healthInsurance: { no: "11324", percent: "86.56%" },
                accidentInsurance: { no: "13082", percent: "100%" },
                maternityBenefits: { no: "NA", percent: "NA" },
                paternityBenefits: { no: "NA", percent: "NA" },
                dayCare: { no: "NA", percent: "NA" }
              },
              permanentFemale: { 
                total: "8002",
                healthInsurance: { no: "6848", percent: "85.58%" },
                accidentInsurance: { no: "8002", percent: "100%" },
                maternityBenefits: { no: "8002", percent: "100%" },
                paternityBenefits: { no: "N.A.", percent: "N.A." },
                dayCare: { no: "8002", percent: "100%" }
              },
              permanentTotal: { 
                total: "21084",
                healthInsurance: { no: "18172", percent: "86.19%" },
                accidentInsurance: { no: "21084", percent: "100%" },
                maternityBenefits: { no: "8002", percent: "37.95%" },
                paternityBenefits: { no: "NA", percent: "NA" },
                dayCare: { no: "8002", percent: "37.95%" }
              },
              otherMale: { 
                total: "1839",
                healthInsurance: { no: "1391", percent: "75.64%" },
                accidentInsurance: { no: "1839", percent: "100%" },
                maternityBenefits: { no: "Nil", percent: "Nil" },
                paternityBenefits: { no: "Nil", percent: "Nil" },
                dayCare: { no: "Nil", percent: "Nil" }
              },
              otherFemale: { 
                total: "1188",
                healthInsurance: { no: "817", percent: "68.77%" },
                accidentInsurance: { no: "1188", percent: "100%" },
                maternityBenefits: { no: "1188", percent: "100%" },
                paternityBenefits: { no: "Nil", percent: "Nil" },
                dayCare: { no: "Nil", percent: "Nil" }
              },
              otherTotal: { 
                total: "3027",
                healthInsurance: { no: "2208", percent: "72.94%" },
                accidentInsurance: { no: "3027", percent: "100%" },
                maternityBenefits: { no: "1188", percent: "39.25%" },
                paternityBenefits: { no: "Nil", percent: "Nil" },
                dayCare: { no: "Nil", percent: "Nil" }
              }
            },
            q1c_spendingOnWellbeing: {
              currentFY: "0.016%",
              previousFY: "0.021%"
            },
            q2_retirementBenefits: {
              pf: {
                currentFY: { employeesPercent: "100%", workersPercent: "100%", deductedDeposited: "Y" },
                previousFY: { employeesPercent: "100%", workersPercent: "100%", deductedDeposited: "Y" }
              },
              gratuity: {
                currentFY: { employeesPercent: "100%", workersPercent: "100%", deductedDeposited: "Y" },
                previousFY: { employeesPercent: "100%", workersPercent: "100%", deductedDeposited: "Y" }
              },
              esi: {
                currentFY: { employeesPercent: "21.46%", workersPercent: "94%", deductedDeposited: "Y" },
                previousFY: { employeesPercent: "30%", workersPercent: "97%", deductedDeposited: "Y" }
              },
              nps: {
                currentFY: { employeesPercent: "7.76%", workersPercent: "-", deductedDeposited: "Y" },
                previousFY: { employeesPercent: "7%", workersPercent: "-", deductedDeposited: "Y" }
              }
            },
            q3_accessibilityOfWorkplaces: "Yes, in compliance with the Rights of Persons with Disabilities Act, 2016, we have implemented several measures to ensure our premises are accessible to differently abled employees and workers. For example, ramps and elevators have been installed at different entry and exit points to facilitate easy access.",
            q4_equalOpportunityPolicy: {
              exists: "Yes",
              details: "The Company is committed to providing equal opportunities to all employees, including those with disabilities, in accordance with the Rights of Persons with Disabilities Act, 2016. However, there is no formal policy laid in this regard."
            },
            q5_parentalLeaveRates: {
              permanentEmployees: {
                male: { returnToWorkRate: "Not Applicable", retentionRate: "Not Applicable" },
                female: { returnToWorkRate: "100%", retentionRate: "100%" },
                total: { returnToWorkRate: "100%", retentionRate: "100%" }
              },
              permanentWorkers: {
                male: { returnToWorkRate: "Not Applicable", retentionRate: "Not Applicable" },
                female: { returnToWorkRate: "100%", retentionRate: "100%" },
                total: { returnToWorkRate: "100%", retentionRate: "100%" }
              }
            },
            q6_grievanceMechanism: {
              permanentWorkers: "Yes",
              otherThanPermanentWorkers: "Yes",
              permanentEmployees: "Yes",
              otherThanPermanentEmployees: "Yes",
              details: "Yes, a mechanism is available for employees and workers to receive and redress grievances under the Grievance Redressal Policy. This policy outlines a 3-tier grievance redressal mechanism:\n\nStage I: An aggrieved worker must submit their grievance in writing to their immediate supervisor. If the resolution provided is unsatisfactory, the worker can proceed to the next stage.\n\nStage II: The grievance can be escalated in writing to the concerned Sectional Head. If the worker is still not satisfied with the outcome, they can further escalate the issue to the Head of Department and subsequently to the Industrial Relations Department."
            },
            q7_membershipUnions: {
              permanentEmployees: {
                currentFY: { totalEmployees: "NIL", membersInUnions: "NIL", percentage: "NIL" },
                previousFY: { totalEmployees: "NIL", membersInUnions: "NIL", percentage: "NIL" }
              },
              permanentWorkers: {
                currentFY: { totalWorkers: "NIL", membersInUnions: "NIL", percentage: "NIL" },
                previousFY: { totalWorkers: "NIL", membersInUnions: "NIL", percentage: "NIL" }
              }
            },
            q8_trainingDetails: {
              employees: {
                currentFY: {
                  male: { total: "3424", healthSafety: { no: "822", percent: "24.01%" }, skillUpgradation: { no: "3389", percent: "98.98%" } },
                  female: { total: "421", healthSafety: { no: "91", percent: "21.62%" }, skillUpgradation: { no: "413", percent: "98.10%" } },
                  total: { total: "3845", healthSafety: { no: "913", percent: "23.75%" }, skillUpgradation: { no: "3773", percent: "98.13%" } }
                },
                previousFY: {
                  male: { total: "3543", healthSafety: { no: "1625", percent: "45.87%" }, skillUpgradation: { no: "2961", percent: "83.57%" } },
                  female: { total: "401", healthSafety: { no: "138", percent: "34.41%" }, skillUpgradation: { no: "357", percent: "89.03%" } },
                  total: { total: "3944", healthSafety: { no: "1763", percent: "44.70%" }, skillUpgradation: { no: "3318", percent: "84.13%" } }
                }
              },
              workers: {
                currentFY: {
                  male: { total: "13082", healthSafety: { no: "10325", percent: "78.93%" }, skillUpgradation: { no: "6036", percent: "46.14%" } },
                  female: { total: "8002", healthSafety: { no: "8002", percent: "100%" }, skillUpgradation: { no: "2780", percent: "34.74%" } },
                  total: { total: "21084", healthSafety: { no: "18327", percent: "86.92%" }, skillUpgradation: { no: "8816", percent: "41.81%" } }
                },
                previousFY: {
                  male: { total: "13891", healthSafety: { no: "9679", percent: "69.68%" }, skillUpgradation: { no: "4798", percent: "34.54%" } },
                  female: { total: "7359", healthSafety: { no: "5565", percent: "75.62%" }, skillUpgradation: { no: "2509", percent: "34.09%" } },
                  total: { total: "21250", healthSafety: { no: "15244", percent: "71.74%" }, skillUpgradation: { no: "7307", percent: "34.39%" } }
                }
              }
            },
            q9_performanceReviews: {
              employees: {
                currentFY: {
                  male: { total: "3424", reviewed: "3204", percentage: "93.57%" },
                  female: { total: "421", reviewed: "379", percentage: "90.02%" },
                  total: { total: "3845", reviewed: "3583", percentage: "93.19%" }
                },
                previousFY: {
                  male: { total: "3543", reviewed: "3256", percentage: "91.90%" },
                  female: { total: "401", reviewed: "342", percentage: "85.29%" },
                  total: { total: "3944", reviewed: "3598", percentage: "91.23%" }
                }
              },
              workers: {
                currentFY: {
                  male: { total: "13082", reviewed: "12098", percentage: "92.48%" },
                  female: { total: "8002", reviewed: "7993", percentage: "99.89%" },
                  total: { total: "21084", reviewed: "20091", percentage: "95.29%" }
                },
                previousFY: {
                  male: { total: "13891", reviewed: "13745", percentage: "98.95%" },
                  female: { total: "7359", reviewed: "7358", percentage: "99.99%" },
                  total: { total: "21250", reviewed: "21103", percentage: "99.31%" }
                }
              }
            },
            q10_healthSafetyManagement: {
              a: "Yes, our organization has implemented an occupational health and safety management system, as evidenced by our ISO 14001:2015 certification. The coverage of this system includes various measures aimed at achieving a zero-accident workplace. To ensure the health and safety of our employees, we have organized various health check-up camps at all our units regularly over the past year. Additionally, we have established occupational health centers staffed by qualified healthcare professionals. Furthermore, our commitment to safety is demonstrated through regular fire mock drills conducted by the security department on a weekly basis, as well as mock drills and emergency evacuation drills conducted every six months. Moreover, we actively engage in different safety campaigns such as State and National Safety Weeks, World Environment Day, Fire Service Week, World Ozone Day, Water Conservation Day, etc., to raise awareness and promote a culture of safety within our organization.",
              b: "Yes, the Company has established a comprehensive approach to identify work-related hazards and assess risks on both routine and non-routine basis by the entity through the Hazard Identification and Risk Assessment (HIRA) process. We have implemented a systematic procedure to identify risks which involves a thorough examination of hazards associated with each activity, determining their potential impacts and prioritizing risks accordingly. By concentrating on activities with heightened risk levels, we enact measures to effectively mitigate these risks. Furthermore, we actively encourage worker involvement in hazard identification through near miss reporting, recognizing it as a valuable tool for pinpointing hazards in work areas. The input and insights provided by our workers are highly valued in this process. Additionally, we employ various methods such as audits, surveys and cross-functional team meetings to analyze problems and enhance our understanding of hazards and risks across the organization. Discussions held during Management Review meetings further contribute to this understanding. Moreover, our commitment to safety is reinforced through monthly incident and accident analysis, which enable us to identify major contributing factors. Based on these findings, we offer targeted training on workplace safety procedures to effectively address identified risks. Through these integrated processes, we proactively identify and address work-related hazards, implement appropriate control measures and continuously strive to minimize risks to our workforce, fostering a safer working environment for all.",
              c: "Yes, the Company has a process in place for workers to report work-related hazards and to remove themselves from such risks. (Y/N): This includes the implementation of Unsafe Activity & Unsafe Condition reporting registers in all units, providing a platform for workers to report any unsafe acts or conditions observed in the workplace. This system encourages active employee participation in hazard identification, fostering a culture of safety. We review sources such as OSHA standards, management views, corporate guidance, industry consensus standards and engineering reports to identify potential hazards",
              d: "Yes"
            },
            q11_safetyIncidents: {
              ltifr: {
                employees: { currentYear: "0", previousYear: "0" },
                workers: { currentYear: "3.41", previousYear: "52.568" }
              },
              totalRecordableInjuries: {
                employees: { currentYear: "0", previousYear: "0" },
                workers: { currentYear: "162", previousYear: "0" }
              },
              fatalities: {
                employees: { currentYear: "0", previousYear: "0" },
                workers: { currentYear: "3", previousYear: "0" }
              },
              highConsequenceInjuries: {
                employees: { currentYear: "0", previousYear: "0" },
                workers: { currentYear: "0", previousYear: "11" }
              }
            },
            q12_safetyMeasures: "The Company implements proactive measures to ensure a safe and healthy workplace environment. Regular hazard assessments, including the Hazard Identification and Risk Assessment (HIRA) process, are conducted to identify and eliminate potential risks effectively. By addressing these hazards at their source, the Company significantly reduces the likelihood of accidents or injuries. The Company ensures that all employees undergo comprehensive training in occupational health and safety practices. This includes instruction on the safe operation of machinery and equipment, proper handling of hazardous substances and adherence to established safety protocols. Moreover, the Company places a high emphasis on providing appropriate personal protective equipment (PPE) to its employees. Comprehensive training is provided to ensure that employees have access to and are proficient in the correct use of safety gear such as helmets, gloves, safety shoes, goggles and ear protection. Furthermore, the Company actively promotes awareness of safety practices and messages throughout its facilities. Utilizing a variety of mediums including signs, labels, posters and other visual aids, important safety information and reminders are effectively communicated to employees. These visual aids serve as constant reminders of safe practices and play a pivotal role in reinforcing a robust safety culture within the Company.",
            q13_complaintsWorkingConditions: {
              workingConditions: {
                currentFY: { filed: "-", pendingResolution: "-", remarks: "-" },
                previousFY: { filed: "365", pendingResolution: "42", remarks: "-" }
              },
              healthSafety: {
                currentFY: { filed: "-", pendingResolution: "-", remarks: "-" },
                previousFY: { filed: "266", pendingResolution: "11", remarks: "-" }
              }
            },
            q14_assessments: {
              healthSafetyPractices: "100% (All units of Vardhman Textiles including assessment by both internal & external parties)",
              workingConditions: "internal & external parties)"
            },
            q15_correctiveActions: "In each of our manufacturing operations, we maintain dedicated safety committees that convene regularly to address safety concerns and develop strategies for fostering a safe work environment. These committees play a vital role in ensuring that safety protocols are upheld and continuously improved upon. Furthermore, we conduct periodic mock drills across all manufacturing operations to simulate emergency scenarios and evaluate the effectiveness of our emergency response procedures. These drills help to ensure that our workforce is well-prepared to handle any potential emergencies that may arise. In our production halls, we replace all the normal wooden and glass doors with fire-rated door. This proactive measure not only reduces the risk of injury due to broken glass but also enhances fire safety measures within the facility. Additionally, to ensure the safety of workers around critical machinery, proper guarding with door interlocking has been provided. This means that access to these machines is restricted and the doors automatically interlock when the machines are in operation, preventing unauthorized entry and minimizing the risk of accidents. These initiatives reflect our commitment to prioritize the safety and well-being of our workforce by implementing robust safety measures to mitigate potential hazards effectively."
          },
          leadership: {
            q1_lifeInsurance: "Yes, the Company extends life insurance and compensatory packages in the event of the death of employees and workers. The Company offers benefits under various schemes such as Employee State Insurance (ESI), Group Personal Accident (GPA) insurance, Mediclaim and an Employee Compensation Policy specifically designed to cover death resulting from occupational injuries. Additionally, the Company offers the Employee's Deposit Linked Insurance (EDLI) scheme, which provides life insurance coverage in case of natural death.",
            q2_statutoryDuesValueChain: "The contract agreement with the value chain partners incorporates strict adherence to all applicable statutory provisions, including the timely payment and deduction of statutory dues. The Company ensures that all relevant clauses pertaining to statutory compliance are thoroughly validated and upheld by both parties involved.",
            q3_rehabilitation: {
              employees: {
                currentFY: { totalAffected: "0", rehabilitated: "0" },
                previousFY: { totalAffected: "0", rehabilitated: "0" }
              },
              workers: {
                currentFY: { totalAffected: "3", rehabilitated: "0" },
                previousFY: { totalAffected: "1", rehabilitated: "0" }
              }
            },
            q4_transitionAssistance: "No",
            q5_valueChainAssessment: {
              healthSafetyPractices: "Yes, the domain expert from respective functions visit our suppliers and assess conformance to our business requirements.",
              workingConditions: "suppliers and assess conformance to our business requirements."
            },
            q6_correctiveActionsValueChain: "Not Applicable"
          },
        },
        principle4: {
          essential: {
            q1_stakeholderIdentification: "The Company employs a comprehensive and diverse approach to identify key stakeholder groups, utilizing methods such as surveys, interviews, focus groups and consultation sessions. These activities are aimed at gathering valuable feedback, opinions and concerns from various individuals and groups.\n\nExternally, our key stakeholders include shareholders, investors and suppliers who play crucial roles in our supply chain, as well as local communities impacted by our operations. Internally, stakeholders encompass our dedicated employees, who drive our daily operations and contribute significantly to our success and our senior management team, responsible for steering strategic decision-making and leadership.\n\nBy actively engaging with both external and internal stakeholders, the Company ensures that it takes into account the needs and expectations of all relevant parties in its decision-making processes. This holistic approach underscores our commitment to transparency, accountability and sustainable growth, fostering mutually beneficial relationships and promoting long-term success.",
            q2_stakeholderEngagement: [
              { 
                stakeholderGroup: "Shareholders & Investors", 
                vulnerableMarginalized: "No", 
                channels: "Annual General Meeting, Shareholder Meets, Email, Stock Exchange intimations, Investor Meet, Annual Report, Quarterly Results, Media Releases, Company Website", 
                frequency: "As and when required", 
                purpose: "Profitability & Stability, Growth Prospects, Major Events" 
              },
              { 
                stakeholderGroup: "Media", 
                vulnerableMarginalized: "No", 
                channels: "Press Releases, Quarterly Results, Annual Reports.", 
                frequency: "As & when required", 
                purpose: "Performance Reporting, Award & Achievements, Initiatives etc. are reported." 
              },
              { 
                stakeholderGroup: "Customers", 
                vulnerableMarginalized: "No", 
                channels: "Email, SMS, Advertisement, Website, Social Media, Customer Surveys, Customer Meets, Business Interactions.", 
                frequency: "Regular", 
                purpose: "Product Launches, Brand Promotion & Communication Customer Satisfaction & Feedback." 
              },
              { 
                stakeholderGroup: "Employees", 
                vulnerableMarginalized: "No", 
                channels: "Email, SMS, In House Magazines, Engagement Activities, Employee Satisfaction Surveys.", 
                frequency: "Regular", 
                purpose: "Career Growth, Training & Development, Improvement Plans, Long-Term Strategy, Awareness Campaigns, Health & Safety Initiatives." 
              },
              { 
                stakeholderGroup: "Communities", 
                vulnerableMarginalized: "Yes", 
                channels: "Community & Local Authority Meets, Direct Engagement, Community Visits, Partnership with NGO's.", 
                frequency: "Regular", 
                purpose: "Need Assessment, Expectation and Feedback on impact/ success of CSR Projects." 
              },
              { 
                stakeholderGroup: "Value Chain Partners", 
                vulnerableMarginalized: "No", 
                channels: "Email, SMS, Vendor Visits & Meets", 
                frequency: "As & when required", 
                purpose: "Quality, Timely Payments, ESG Consideration (Sustainability, Safety Checks, Compliances, Ethical Behavior, ISO & OHSAS Standards, Supply Chain Issues, Technical Training Sessions, New Technology Launches by Vendors" 
              }
            ]
          },
          leadership: {
            q1_boardConsultation: "The Company has established several committees dedicated to economic and ESG (Environmental, Social and Governance) domains to effectively monitor performance in these areas. These include the committees on Audit, Risk Management, Nomination & Remuneration, CSR & Sustainability, Reducing Emissions, Water Conservation, Health & Safety and Energy Conservation.\n\nThese committees meet regularly to appraise performance in the respective domains, evaluating the Company's achievements, challenges and opportunities. These evaluations are crucial for identifying areas of improvement and implementing strategies to drive positive change.",
            q2_stakeholderConsultationUsed: "Yes",
            q2_details: {
              a: "Environmental Policy Development: When formulating our environmental policy, we conducted consultations with various stakeholders, including local communities, environmental organizations and industry experts. Through these consultations, we received valuable insights on environmental concerns, such as resource depletion and pollution. Stakeholders shared their suggestions and expectations regarding sustainable practices and we incorporated their inputs into our policy framework. This led to the inclusion of specific targets for reducing greenhouse gas emissions, adopting renewable energy sources and implementing waste management strategies.",
              b: "Social Impact Assessment: Before undertaking major projects or expansions, we conduct social impact assessments to understand the potential effects on local communities. As part of this process, we engage with stakeholders, including community representatives, non-governmental organizations and indigenous groups. Their input helps us identify and mitigate adverse social impacts.",
              c: "Supply Chain Management: To address social and environmental concerns in our supply chain, we actively involve stakeholders such as suppliers, workers' organizations and human rights advocates. Through ongoing dialogues and consultation sessions, we gather feedback and suggestions on responsible sourcing, labor practices and community well-being."
            },
            q3_vulnerableEngagement: [
              {
                vulnerableGroup: "Underprivileged Community from Rural, Urban and Peri-Urban Areas",
                concerns: "Needy People not having access to Healthcare Facilities",
                actionTaken: "1. Supported the Mandke Foundation in their noble endeavor to sponsor medical treatment for economically disadvantaged patients at the renowned Kokilaben Dhirubhai Ambani Hospital & Medical Research Institute in Mumbai.\n2. Organized Health Check-up Camps in the vicinity of VSGL, Ludhiana.\n3. We have provided various medical equipment to several government healthcare facilities, including Government Hospital of Ludhiana, SDH Samrala, CHC Manupur, CHC Hathur, CHC Pahowal, MCH Vardhman, DMC Office and the Civil Surgeon Office. The equipment includes 2 Digital X-Ray Machines, 2 Semi Auto Analyzers, 12 ECG Machines, a Microscope, a Labour Bed, 2 Inverters and 2 Solar systems.\n4. Provided a Colour Doppler Ultrasound Machine (Samsung HS-50) with Convex, Linear, TVS and Echo probes, along with a thermal printer and UPS, to Ek Noor Nek Da Hospital in Alamgir, which is run by an NGO."
              },
              {
                vulnerableGroup: "Disadvantaged Sections of Society",
                concerns: "",
                actionTaken: "1. Provided artificial limbs to individuals with disabilities, empowering them to regain mobility and independence."
              },
              {
                vulnerableGroup: "Underprivileged Women",
                concerns: "",
                actionTaken: "1. We have initiated an impactful awareness program focused on Menstrual Hygiene Management (MHM) and the distribution of sanitary pads to women and adolescent girls residing in the slum areas as well as to school girls of Baddi.\n2. Introduced \"Project Chetna,\" a comprehensive women's awareness initiative focused on promoting women's rights and empowerment under various government schemes."
              },
              {
                vulnerableGroup: "Funds to Needy",
                concerns: "",
                actionTaken: "1. Contribution of ₹ 25.00 lac to Poor Patient fund of DMC Hospital, Ludhiana.\n2. Financial contribution of ₹ 18.00 lac to Cancer Treatment Fund at Oncology Department of Christian Medical College & Hospital, Ludhiana.\n3. Financial contribution of ₹ 15.00 lac to Advance Eye Research Centre, PGI, Chandigarh for Corneal transplantation of poor, needy and marginalized families."
              }
            ]
          }
        },
        principle5: {
          essential: {
            q1_humanRightsTraining: {
              employees: {
                permanent: { total: "-", covered: "-", percentage: "-" },
                otherThanPermanent: { total: "-", covered: "-", percentage: "-" },
                totalEmployees: { total: "-", covered: "-", percentage: "-" }
              },
              workers: {
                permanent: { total: "-", covered: "-", percentage: "-" },
                otherThanPermanent: { total: "-", covered: "-", percentage: "-" },
                totalWorkers: { total: "-", covered: "-", percentage: "-" }
              }
            },
            q2_minimumWages: {
              employees: {
                permanent: {
                  male: {
                    currentFY: { total: "3424", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "3424", percent: "100%" } },
                    previousFY: { total: "3543", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "3543", percent: "100%" } }
                  },
                  female: {
                    currentFY: { total: "421", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "421", percent: "100%" } },
                    previousFY: { total: "401", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "401", percent: "100%" } }
                  }
                },
                otherThanPermanent: {
                  male: {
                    currentFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } },
                    previousFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } }
                  },
                  female: {
                    currentFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } },
                    previousFY: { total: "-", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "-", percent: "-" } }
                  }
                }
              },
              workers: {
                permanent: {
                  male: {
                    currentFY: { total: "13082", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "13082", percent: "100%" } },
                    previousFY: { total: "13891", equalToMinWage: { no: "232", percent: "1.67%" }, moreThanMinWage: { no: "13659", percent: "98.33%" } }
                  },
                  female: {
                    currentFY: { total: "8002", equalToMinWage: { no: "-", percent: "-" }, moreThanMinWage: { no: "8002", percent: "100%" } },
                    previousFY: { total: "7359", equalToMinWage: { no: "407", percent: "5.53%" }, moreThanMinWage: { no: "6952", percent: "94.47%" } }
                  }
                },
                otherThanPermanent: {
                  male: {
                    currentFY: { total: "1839", equalToMinWage: { no: "1839", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } },
                    previousFY: { total: "1447", equalToMinWage: { no: "1447", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } }
                  },
                  female: {
                    currentFY: { total: "1188", equalToMinWage: { no: "1188", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } },
                    previousFY: { total: "1642", equalToMinWage: { no: "1642", percent: "100%" }, moreThanMinWage: { no: "-", percent: "-" } }
                  }
                }
              }
            },
            q3_medianRemuneration: {
              boardOfDirectors: {
                male: { number: "7", median: "540000" },
                female: { number: "3", median: "1084689.1" }
              },
              keyManagerialPersonnel: {
                male: { number: "2", median: "5945167" },
                female: { number: "0", median: "0" }
              },
              employeesOtherThanBoDAndKMP: {
                male: { number: "3424", median: "490000" },
                female: { number: "419", median: "362000" }
              },
              workers: {
                male: { number: "13082", median: "136968" },
                female: { number: "8002", median: "129792" }
              }
            },
            q3a_grossWagesFemales: {
              currentFY: "21.20%",
              previousFY: "20.15%"
            },
            q4_focalPointHumanRights: "Yes, all employees can reach out to the management to address their concerns and the Company also has grievance redressal mechanism.",
            q5_grievanceMechanisms: "The Grievance redressal system is governed by the Grievance Handling Policy. The employee having a cause for complaint has a right to present his/her case in writing to the Head of the Department/Supervisor for investigation and consideration within a reasonable period from the date of arising of said cause.",
            q6_complaints: {
              sexualHarassment: {
                currentFY: { filed: "0", pending: "0", remarks: "0" },
                previousFY: { filed: "0", pending: "0", remarks: "0" }
              },
              discriminationAtWorkplace: {
                currentFY: { filed: "0", pending: "0", remarks: "0" },
                previousFY: { filed: "0", pending: "0", remarks: "0" }
              },
              childLabour: {
                currentFY: { filed: "0", pending: "0", remarks: "0" },
                previousFY: { filed: "0", pending: "0", remarks: "0" }
              },
              forcedLabour: {
                currentFY: { filed: "0", pending: "0", remarks: "0" },
                previousFY: { filed: "0", pending: "0", remarks: "0" }
              },
              wages: {
                currentFY: { filed: "0", pending: "0", remarks: "0" },
                previousFY: { filed: "0", pending: "0", remarks: "0" }
              },
              otherHumanRights: {
                currentFY: { filed: "Nil", pending: "Nil", remarks: "Nil" },
                previousFY: { filed: "Nil", pending: "Nil", remarks: "Nil" }
              }
            },
            q7_poshComplaints: {
              totalComplaints: { currentFY: "Nil", previousFY: "-" },
              complaintsAsPercentFemale: { currentFY: "Nil", previousFY: "-" },
              complaintsUpheld: { currentFY: "Nil", previousFY: "-" }
            },
            q8_mechanismsPreventAdverseConsequences: "There is zero tolerance with regards to concerns of discrimination and sexual harassment. Any concerns related to these issues are dealt with confidentially. The person found guilty is subject to disciplinary action.\n\nhttps://www.vardhman.com/Document/Report/Company%20Information/Policies/Vardhman%20Textiles%20Ltd/Anti_Sexual_Harassment_Policy.pdf",
            q9_humanRightsInContracts: "Yes",
            q10_assessments: {
              childLabour: "100%",
              forcedInvoluntaryLabour: "100%",
              sexualHarassment: "100%",
              discriminationAtWorkplace: "100%",
              wages: "100%",
              othersSpecify: "100%"
            },
            q11_correctiveActions: "No such incident of non-compliance has been observed during assessment."
          },
          leadership: {
            q1_businessProcessModified: "The Company recognizes its responsibility of treating all employees equal in dignity, respect and rights. We have a Human Rights Policy. The objective of this policy is to respect and protect human rights and to provide a safe and healthy working environment for all the employees.",
            q2_humanRightsDueDiligence: "The Company is committed to a value-based culture which is embodied in our code of conduct and ethics. We have a Code of Conduct Policy to outline the standards and behaviors that Company upholds and that it expects from all of its employees. This code provides a guide to the values, behaviors and ways of working. We have a learning portal for our employees which includes topics on human rights also. Our vendor assessments include human rights related assessments.",
            q3_accessibilityDifferentlyAbled: "Yes",
            q4_valueChainAssessment: {
              sexualHarassment: "No assessment conducted during the year 2023-24.",
              discriminationAtWorkplace: "No assessment conducted during the year 2023-24.",
              childLabour: "We are aiming to conduct assessments in the future.",
              forcedLabourInvoluntaryLabour: "We are aiming to conduct assessments in the future.",
              wages: "We are aiming to conduct assessments in the future.",
              othersSpecify: ""
            },
            q5_correctiveActionsValueChain: "Not Applicable"
          }
        },
        principle6: {
          essential: {
            q1_energyConsumption: {
              renewable: {
                electricity: { currentFY: "0.105", previousFY: "0.09" },
                fuel: { currentFY: "1.765", previousFY: "0" },
                otherSources: { currentFY: "0.000", previousFY: "0" },
                total: { currentFY: "1.870", previousFY: "0.09" }
              },
              nonRenewable: {
                electricity: { currentFY: "3.744", previousFY: "3.32" },
                fuel: { currentFY: "7.314", previousFY: "4.95" },
                otherSources: { currentFY: "0.000", previousFY: "0" },
                total: { currentFY: "11.058", previousFY: "8.27" }
              },
              totalEnergyConsumed: { currentFY: "12.928", previousFY: "8.36" },
              energyIntensityPerTurnover: { currentFY: "0.00139", previousFY: "0.00084" },
              energyIntensityPPP: { currentFY: "0.0311", previousFY: "0.0191" },
              energyIntensityPhysicalOutput: "-",
              externalAssessment: "No"
            },
            q2_patScheme: "Yes, we have 8 facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India. Through the concerted efforts and the implementation of various energy-saving initiatives, the Company has been awarded Energy Savings Certificates (ESCerts) under the PAT scheme. These certificates can be redeemed in the market, providing additional incentives for our successful energy efficiency achievements.",
            q2_patFacilities: [
              { name: "Arisht Spinning Mills, Baddi", consumerReg: "TXT0009HP", baselineSEC: "0.3873", targetSEC: "0.3738", secAchieved: "0.31" },
              { name: "Vardhman Yarns, Satlapur", consumerReg: "TXT0087MP", baselineSEC: "1.4764", targetSEC: "1.4156", secAchieved: "0.56" },
              { name: "Auto Spinning Mills, Baddi", consumerReg: "TXT0013HP", baselineSEC: "0.4686", targetSEC: "0.4489", secAchieved: "0.43" },
              { name: "Arihant Spinning Mills, Malerkotla", consumerReg: "TXT0008PB", baselineSEC: "0.3535", targetSEC: "0.3422", secAchieved: "0.51" },
              { name: "VSGM, Ludhiana", consumerReg: "TXT0086PB", baselineSEC: "0.3060", targetSEC: "0.3060", secAchieved: "0.35" },
              { name: "VSM, Baddi", consumerReg: "TXT0098HP", baselineSEC: "0.4511", targetSEC: "0.4528", secAchieved: "0.45" },
              { name: "Vardhman Fabrics, Budhni", consumerReg: "TXT0085MP", baselineSEC: "2.1693", targetSEC: "2.083", secAchieved: "2.07" },
              { name: "Anant Spinning Mills, Mandideep", consumerReg: "TXT0006MP", baselineSEC: "0.4296", targetSEC: "0.4130", secAchieved: "0.41" }
            ],
            q3_waterDetails: {
              withdrawal: {
                surfaceWater: { currentFY: "2349107", previousFY: "2198355" },
                groundwater: { currentFY: "7681657", previousFY: "7143308" },
                thirdPartyWater: { currentFY: "-", previousFY: "-" },
                seawaterDesalinated: { currentFY: "-", previousFY: "-" },
                others: { currentFY: "-", previousFY: "-" },
                total: { currentFY: "10040764", previousFY: "9341663" }
              },
              consumption: {
                total: { currentFY: "5695455.25", previousFY: "9341663" }
              },
              waterIntensityPerTurnover: { currentFY: "612.50", previousFY: "949.27" },
              waterIntensityPPP: { currentFY: "13720.35", previousFY: "21425.34" },
              waterIntensityPhysicalOutput: "-",
              externalAssessment: "No"
            },
            q4_waterDischarge: {
              surfaceWater: {
                noTreatment: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                withTreatment: { currentFY: "-", previousFY: "-" }
              },
              groundwater: {
                noTreatment: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                withTreatment: { currentFY: "-", previousFY: "-" }
              },
              seawater: {
                noTreatment: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                withTreatment: { currentFY: "-", previousFY: "-" }
              },
              thirdParties: {
                noTreatment: { currentFY: "25919", previousFY: "16950" },
                withTreatment: { currentFY: "3225333", previousFY: "3308624" }
              },
              others: {
                noTreatment: { currentFY: "-", previousFY: "-" },
                withTreatment: { currentFY: "460221", previousFY: "484622" }
              },
              totalWaterDischarged: { currentFY: "3711523", previousFY: "3808196" },
              externalAssessment: "No"
            },
            q5_zeroLiquidDischarge: "Yes, the Company is committed to environmental sustainability, exemplified by our concerted efforts to minimize water consumption and adopt eco-friendly practices across our operations. At all our facilities, we adhere strictly to the Pollution Control Board (PCB) norms. Our two sites are equipped with advanced ZLD systems—Budhni, our largest integrated facility, boasts a ZLD System with an effluent treatment capacity of 11,000 KLD. Utilizing a bio-oxidation process, this plant achieves remarkable COD and BOD removal efficiencies of 90-92% and 96-98% respectively, without chemical treatment. Approximately 8,400 KLD of biologically treated effluent is recycled through reverse osmosis (RO) and mechanical vapor compression (MEE) for process reuse, while the remaining treated water contributes to Green Belt Development. Achieving a recovery rate of 99.0% through RO and MEE, the salt recovered by MEE is disposed of at government authorized facilities. Similarly, our Baddi location operates a ZLD system with an effluent capacity of 2000 KLD, employing a bio-oxidation process followed by recycling through RO-MEE for process reuse, further exemplifying our commitment to sustainable water management practices across all operations.",
            q6_airEmissions: {
              nox: { unit: "MT", currentFY: "295.9", previousFY: "201" },
              sox: { unit: "MT", currentFY: "432.5", previousFY: "332" },
              pm: { unit: "MT", currentFY: "78.32", previousFY: "52" },
              pop: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" },
              voc: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" },
              hap: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" },
              others: { unit: "NIL", currentFY: "NIL", previousFY: "NIL" },
              externalAssessment: "No"
            },
            q7_ghgEmissions: {
              scope1: { unit: "Metric tonnes of CO₂ equivalent", currentFY: "282924.00", previousFY: "323221.74" },
              scope2: { unit: "Metric tonnes of CO₂ equivalent", currentFY: "857272.48", previousFY: "727830.980" },
              totalScope1And2: { unit: "Metric tonnes of CO₂ equivalent per rupee of turnover", currentFY: "122.619", previousFY: "106.806" },
              scope1And2IntensityPerTurnover: { unit: "Metric tonnes of CO₂ per USD", currentFY: "2746.73", previousFY: "2410.61" },
              scope1And2IntensityPhysicalOutput: "-",
              externalAssessment: "FY 23-24 GHG Emission data under Third party assurance. FY 22-23 GHG Emission data is verified by Earthood Pvt Ltd"
            },
            q8_ghgReductionProjects: "The Company is steadfast in its commitment to reducing carbon emissions, exemplified through a series of proactive measures aimed at mitigating Greenhouse Gas (GHG) Emissions. This year, the Company is spearheading multiple initiatives focused on greenhouse gas reduction, including: • Utilization of Agri-based Biomass as Renewable Fuel: Embracing sustainability, the Company is incorporating agri-based biomass as a renewable fuel source to generate green steam at various sites, notably VSGM Ludhiana, Agro Textiles, & VFB sites. • Investment in Renewable Energy: The Company is significantly investing in renewable energy, primarily through solar and biomass technologies. By expanding its solar power capacity from 19.2 MW to 53 MW by 2025, the entity is bolstering its portfolio of renewable energy, furthering its mission to combat GHG emissions. • Sludge Dryer Implementation: The Company has introduced sludge dryers across all three Effluent Treatment Plants (ETPs), effectively mitigating GHG emissions associated with landfill disposal. • Plastic Packaging Waste Recycling: The entity demonstrates its environmental stewardship by achieving 100% recycling of plastic packaging waste, minimizing its carbon footprint. • Implement an energy-efficient pump in the ETP (Thermal Fluid Heater), which is aircooled, reducing energy consumption by 50% and removing the need for water in pump cooling.",
            q9_wasteManagement: {
              plasticWaste: { currentFY: "1264.35", previousFY: "1290.411" },
              eWaste: { currentFY: "28.71", previousFY: "35.794" },
              bioMedicalWaste: { currentFY: "2.21", previousFY: "0.1765" },
              constructionDemolitionWaste: { currentFY: "453.60", previousFY: "61.22" },
              batteryWaste: { currentFY: "28.01", previousFY: "16.856" },
              radioactiveWaste: { currentFY: "0", previousFY: "0" },
              otherHazardousWaste: { currentFY: "12459.58", previousFY: "25060.653" },
              otherNonHazardousWaste: { currentFY: "718741", previousFY: "15928.45" },
              totalWaste: { currentFY: "21423.87", previousFY: "42383.56" },
              wasteIntensityPerTurnover: { currentFY: "2.304", previousFY: "4.308" },
              wasteIntensityPPP: { currentFY: "49.136", previousFY: "11705" },
              wasteIntensityPhysicalOutput: "-",
              recycled: { currentFY: "8139.15", previousFY: "28313.04" },
              reused: { currentFY: "1256.12", previousFY: "5785.771" },
              otherRecovery: { currentFY: "0", previousFY: "0" },
              totalRecovered: { currentFY: "9395.27", previousFY: "34098.811" },
              incineration: { currentFY: "63.14", previousFY: "0" },
              landfilling: { currentFY: "11965.46", previousFY: "14492.45" },
              otherDisposal: { currentFY: "0", previousFY: "0" },
              totalDisposed: { currentFY: "12028.60", previousFY: "14492.45" },
              externalAssessment: "No"
            },
            q10_wastePractices: "The Company is actively involved in better waste management practices. we prioritize waste reduction, maximize recycling and reuse opportunities, and ensure responsible disposal of waste. Here are a few points that highlight the positive aspects of Vardhman's waste management practices: Textiles Waste Recycling: We actively explore opportunities to reuse materials within our operations. One exemplary initiative is the Vardhman Acrylon plant at Hoshiarpur. Removed worn-out material from Vardhman knitted fabric plant is sent to this plant, which are then used to create new clothes or other textile products. By diverting textiles from landfills to recycling, the plant significantly reduces environmental waste. Follow 3R's of waste management: We prioritize waste reduction by identifying operational areas where waste can be minimized through process optimization and adoption of alternative practices. Our commitment extends to recycling various waste types, such as paper, plastic, cardboard, and glass. Rather than discarding these materials, we actively recover them for reuse or recycling, contributing to a more sustainable environment.",
            q11_ecologicallySensitiveAreas: "Not Applicable",
            q11_ecologicallySensitiveDetails: "The above-mentioned requirement is not applicable to the Company as the Company does not have any of its operations/offices in/around ecologically sensitive areas.",
            q12_environmentalImpactAssessments: "Not Applicable",
            q13_environmentalCompliance: "Yes, the Company is compliant with the applicable environmental law/ regulations/ guidelines in India.",
            q13_nonCompliances: "Not Applicable"
          },
          leadership: {
            q1_waterStressAreas: {
              name: "Ludhiana & Malerkotla",
              natureOfOperations: "Spinning Units",
              withdrawal: {
                surfaceWater: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                groundwater: { currentFY: "1067739", previousFY: "1287786" },
                thirdPartyWater: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                seawaterDesalinated: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                others: { currentFY: "Not Applicable", previousFY: "Not Applicable" },
                total: { currentFY: "1067739", previousFY: "1287786" }
              },
              consumption: {
                total: { currentFY: "1067739", previousFY: "1287786" }
              },
              waterIntensityPerTurnover: { currentFY: "114.83", previousFY: "130.86" },
              waterIntensityPhysicalOutput: "-",
              discharge: {
                surfaceWater: {
                  noTreatment: { currentFY: "-", previousFY: "-" },
                  withTreatment: { currentFY: "-", previousFY: "-" }
                },
                groundwater: {
                  noTreatment: { currentFY: "-", previousFY: "-" },
                  withTreatment: { currentFY: "-", previousFY: "-" }
                },
                seawater: {
                  noTreatment: { currentFY: "-", previousFY: "-" },
                  withTreatment: { currentFY: "-", previousFY: "-" }
                },
                thirdParties: {
                  noTreatment: { currentFY: "-", previousFY: "-" },
                  withTreatment: { currentFY: "-", previousFY: "-" }
                },
                others: {
                  noTreatment: { currentFY: "-", previousFY: "-" },
                  withTreatment: { currentFY: "460221", previousFY: "484622" }
                },
                total: { currentFY: "460221", previousFY: "484622" }
              },
              externalAssessment: "No"
            },
            q2_scope3Emissions: "-",
            q2_scope3EmissionsPerTurnover: "-",
            q2_scope3IntensityPhysicalOutput: "-",
            q2_externalAssessment: "No",
            q3_biodiversityImpact: "Not Applicable",
            q4_resourceEfficiencyInitiatives: [
              { initiative: "Enhance capacity of STP & establish 10 MLD", details: "Increased STP capacity by 300 KLD and install 1500 KLD HO system to utilize excess volume of STP water at Arihant Spinning Mills, a unit in Punjab.", outcome: "Aim to Achieve zero liquid discharge; enhanced capacity to treat waste water effectively, ensuring compliance with environmental regulations." },
              { initiative: "Renovate Existing STP to MBBR technology", details: "Upgrade existing STP with MBBR technology at one of the MP locations for maximization utilization of treated water in secondary applications like urinal flushing, cleaning and gardening.", outcome: "Optimize treated water utilization; improve efficiency and effectiveness of waste water treatment; reducing environmental impact." },
              { initiative: "Installation of 10 MLD Homogenization System prior to CETP tank", details: "Installed Homogenization system before CETP tank at Baddi plant to balance effluent load, facilitating easier CETP operation and better results in the CETP process.", outcome: "Improve CETP efficiency; streamline waste water treatment processes, ensure consistent quality of treated effluent and regulatory compliance." },
              { initiative: "Optimization ZLD system in two plants", details: "Implemented ZLD system in two Vardhman plants, utilizing 100% of wastewater through multi-stage RO system for primary applications such as fiber production & clothes.", outcome: "Attain complete waste water utilization; minimize water wastage, enhancing sustainability and resource efficiency in manufacturing processes." },
              { initiative: "Waste Management", details: "Implementation of Sludge Dryer Introduced sludge dryer technology at Punjab and Baddi locations to address the challenge of sludge generated through ETP operation. 100% Recycling of Plastic Packaging Implement a comprehensive recycling program to recycle 100% of its plastic packaging waste consumed, mitigating the environmental impact of plastic usage.", outcome: "Efficiently manage ETP sludge; reduce volume and weight of sludge for easier disposal, minimizing environmental impact and operational costs. Reduce plastic pollution; promote circular economy by reusing plastic materials, conserving resources and reducing landfill waste." },
              { initiative: "Ground water recharging initiatives", details: "Continuously invest in water conservation initiatives since 2005, focusing on groundwater recharge, via 25 Rainwater Harvesting Systems (RWH) installed on premises.", outcome: "These rainwater harvesting systems have a capacity to recharge 1.75 million KL of water annually." },
              { initiative: "Installation of Rooftop Solar Plants", details: "Install rooftop solar plants and sign Power Purchase Agreements (PPA) with Renewable Energy (RE) IPPs/Developers.", outcome: "Harness solar energy for electricity generation; reduce dependence on non-renewable energy sources, lower carbon emissions and potentially save on electricity costs." },
              { initiative: "Green Fuel in Boilers", details: "Utilization of Biomass as fuel in power plant boilers to reduce coal usage and installation of turbines for green power generation.", outcome: "Reducing GHG emissions and transitioning to a more sustainable energy future." },
              { initiative: "Safety and Sustainability", details: "Promote safety and sustainability among employees and workers through theme-based campaigns covering topics such as machine guarding, electrical safety, forklift and driving safety.", outcome: "Enhance workplace safety; instill a sense of responsibility towards safety and sustainability practices, reducing accidents and environmental impact." },
              { initiative: "Awareness Programs", details: "To spread awareness about environmental protection measures, every year, the entity celebrates Earth Day, Environment Day, Environment Week, and World Saving Week. The activities held during such programs include Tree Plantation, Drawing Competition, Slogan Competition, Social media campaign etc", outcome: "A collective effort that addresses environmental challenges more effectively and promotes a greener and more sustainable future." },
              { initiative: "Green Energy Initiative", details: "Signed a Power Purchase Agreement (PPA) to establish a 11.5 MW Wind-Solar Hybrid Power Plant in Madhya Pradesh.", outcome: "Resulting in a notable decrease in carbon emissions and promoting a more sustainable and environmentally friendly energy portfolio." }
            ],
            q5_businessContinuityPlan: "The Company acknowledges the unpredictable nature of emergencies and disasters, which can strike without warning. To ensure the safety of our employees, surrounding communities and the environment, we have established a robust emergency preparedness and response program. Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard. This plan serves as a comprehensive framework for swift and effective response to local emergencies. To measure the effectiveness of our emergency preparedness plan, we conduct rigorous testing and evaluation. This includes management reviews, third-party audits and continuous improvement and make necessary adjustments to enhance our emergency response capabilities.",
            q6_valueChainEnvironmentalImpact: "Based on the available information, the Company's value chain has not resulted in any significant adverse impacts on the environment. We are committed to conducting our business operations in an environmentally responsible manner and strive to minimize any potential negative impact on our environment along our value chain.",
            q7_valueChainPartnersAssessed: "Some of the value chain partners were assessed for environmental impacts."
          }
        },
        principle7: {
          essential: {
            q1a_numberOfAffiliations: "10",
            q1b_affiliationsList: [
              { name: "Confederation of Indian Industries (CII)", reach: "National" },
              { name: "Federation of Indian Chamber of Commerce and Industries (FICCI)", reach: "National" },
              { name: "PHD Chamber of Commerce and Industries (PHDCCI)", reach: "National" },
              { name: "Confederation of Indian Textile Industry (CITI)", reach: "National" },
              { name: "Texprocil", reach: "National" },
              { name: "Synthetic & Rayon Textiles Export Promotion Council (SRTEPC)", reach: "National" },
              { name: "Apex chamber of commerce", reach: "State" },
              { name: "Textiles Committee", reach: "National" },
              { name: "Federation of Indian Export Organization (FIEO)", reach: "National" },
              { name: "International Textile Manufacturers Federation (ITMF)", reach: "International" }
            ],
            q2_antiCompetitiveConduct: "None"
          },
          leadership: {
            q1_publicPolicyAdvocacy: [
              {
                policyAdvocated: "Various issues affecting Textile Industry in general.",
                methodResorted: "Representation through industry associations like CITI/Texprocil/CII",
                publicDomain: "Yes",
                frequencyOfReview: "NA",
                webLink: ""
              }
            ]
          }
        },
        principle8: {
          essential: {
            q1_socialImpactAssessments: "Not Applicable",
            q2_rehabilitationResettlement: "Not Applicable",
            q3_communityGrievanceMechanism: "The stakeholders can send their grievances to the Compliance Officer at secretarial.lud@vardhman.com or mngt@vardhman.com",
            q4_inputMaterialSourcing: {
              msmes: { currentFY: "28.93%", previousFY: "30%" },
              withinDistrict: { currentFY: "5.65%", previousFY: "3%" },
              neighboringDistricts: { currentFY: "94.35%", previousFY: "97%" }
            },
            q5_jobCreation: {
              rural: { currentFY: "-", previousFY: "-" },
              semiUrban: { currentFY: "62.82%", previousFY: "63.74%" },
              urban: { currentFY: "9.86%", previousFY: "9.98%" },
              metropolitan: { currentFY: "27.32%", previousFY: "26.28%" }
            }
          },
          leadership: {
            q1_negativeImpactMitigation: "Not Applicable",
            q2_csrProjects: [
              { state: "Bihar", aspirationalDistrict: "Jamui", amountSpent: "30 lacs" }
            ],
            q3a_preferentialProcurement: "No",
            q3b_vulnerableGroups: "Not Applicable",
            q3c_procurementPercentage: "Not Applicable",
            q4_intellectualProperty: "Nil",
            q5_ipDisputes: "Not Applicable",
            q6_csrBeneficiaries: [
              { 
                project: "Project NANDINI: An awareness programme on Menstrual Hygiene Management (MHM) and distribution of Sanitary Pads among women and adolescent girls living in slum areas of Baddi, Himachal Pradesh and Budhni, Madhya Pradesh.",
                beneficiaries: "30,000",
                percentVulnerable: "100%"
              },
              {
                project: "Provided artificial limbs to disabled people (artificial limbs and polio calipers) in Punjab, Himachal Pradesh & Madhya Pradesh.",
                beneficiaries: "44",
                percentVulnerable: "100%"
              },
              {
                project: "Contribution to Tribal Welfare Council, MP for welfare activities in School for tribal students.",
                beneficiaries: "200",
                percentVulnerable: "100%"
              }
            ]
          }
        },
        principle9: {
          essential: {
            q1_consumerComplaintMechanism: "The customer complaint handling protocol involves a streamlined process. It begins with complaint generation by the corporate department, who receives customer complaints through various channels. The complaints are then analyzed by the Customer Service and Technical Support (C&TS), Quality Assurance (QA), Production and Unit Head departments. After a thorough investigation, the findings and recommendations are compiled and shared with the Corporate. The report is then reviewed by Business Heads, who assess the impact and provide insights if needed. Finally, a suitable resolution is determined and communicated to the customer, ensuring their satisfaction. The complaint is considered closed once the necessary actions have been implemented.",
            q2_productInformationPercentage: {
              environmentalParameters: "NA",
              safeUsage: "NA",
              recycling: "NA"
            },
            q3_consumerComplaints: {
              dataPrivacy: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              },
              advertising: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              },
              cyberSecurity: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              },
              deliveryOfServices: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              },
              restrictiveTradePractices: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              },
              unfairTradePractices: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              },
              other: {
                currentFY: { received: "None", pending: "None", remarks: "NA" },
                previousFY: { received: "None", pending: "None", remarks: "NA" }
              }
            },
            q4_productRecalls: {
              voluntary: { number: "0", reasons: "NA" },
              forced: { number: "0", reasons: "NA" }
            },
            q5_cyberSecurityPolicy: "Yes. The policy can be accessed on the following link: https://vardhman.com/Document/I.I.03%20Privacy%20and%20Data%20Protection%20Policy%20-%20PDF.pdf",
            q6_correctiveActions: "Not Applicable",
            q7_dataBreaches: {
              a_numberOfInstances: "Nil",
              b_percentageWithPII: "Nil",
              c_impact: "Nil"
            }
          },
          leadership: {
            q1_informationChannels: "www.vardhman.com",
            q2_consumerEducation: "We have a dedicated sales team to ensure pre to post sale services to our customer. Post-sale service ensures smooth usage of our products and problem solving through a partnership approach that helps us forge long-lasting relationships with our customers.",
            q3_disruptionMechanisms: "We maintain active communication channels with our customers, including instant email support and SMS messaging. These channels serve as an effective means to proactively inform customers about any potential disruptions or discontinuations of essential services.",
            q4_productInformationDisplay: "Yes, we disclose all the information on our labels in compliance with the legal requirements so as to enable customers to make an informed decision. The Company engages with its customers and conducts annual consumer surveys to assess the satisfaction levels related to different products. These surveys are aimed at gathering feedback from customers in order to understand their preferences and satisfaction. The Company has a dedicated market research department responsible for conducting these surveys and providing valuable insights to the respective business teams. The findings from these surveys play a crucial role in guiding new product developments and identifying areas that may require remedial action. By actively seeking customer feedback, the Company strives to enhance customer satisfaction and improve its overall offerings.",
            q5_dataBreaches: {
              a_numberOfInstances: "Nil",
              b_percentageWithPII: "Nil"
            }
          }
        },
      },
    }

    setFormData(demoData)
    setShowPreview(true)
    toast({
      title: "Demo Data Loaded",
      description: "IOCL sample BRSR data loaded successfully",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="border-b border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <FileText className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BRSR Buddy</h1>
              <p className="text-xs text-slate-400">Business Responsibility & Sustainability Reporting</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={loadDemoData}
              variant="outline"
              className="border-emerald-500/30 text-emerald-400 bg-transparent"
            >
              Load IOCL Demo Data
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!showPreview ? (
          <Card className="max-w-2xl mx-auto bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Upload BRSR Document</CardTitle>
              <CardDescription className="text-slate-400">
                Upload your existing BRSR report or annual report PDF to extract data automatically using AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FileUpload onFileUpload={handleFileUpload} />

              {isExtracting && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                      Extracting BRSR data using AI...
                    </span>
                    <span>{extractionProgress}%</span>
                  </div>
                  <Progress value={extractionProgress} className="h-2" />
                </div>
              )}

              <div className="pt-4 border-t border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Or try with sample data:</p>
                <Button
                  onClick={loadDemoData}
                  variant="outline"
                  className="w-full border-emerald-500/30 text-emerald-400 bg-transparent"
                >
                  Load Indian Oil Corporation Demo Data
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button onClick={() => setShowPreview(false)} variant="outline" className="text-slate-300">
                ← Back to Upload
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={loadDemoData}
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 bg-transparent"
                >
                  Load Demo Data
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>

            <Card className="bg-white">
              <CardContent className="p-8">
                <ReportPreview data={formData} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
