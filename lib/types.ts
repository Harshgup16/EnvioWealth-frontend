export interface BRSRData {
  sectionA?: {
    cin?: string
    entityName?: string
    yearOfIncorporation?: string
    registeredAddress?: string
    corporateAddress?: string
    email?: string
    telephone?: string
    website?: string
    financialYear?: string
    stockExchanges?: string
    paidUpCapital?: string
    contactName?: string
    contactDesignation?: string
    contactPhone?: string
    contactEmail?: string
    reportingBoundary?: string
    assuranceProvider?: string
    assuranceType?: string
    businessActivities?: Array<{
      mainActivity: string
      businessDescription: string
      turnoverPercent: string
    }>
    products?: Array<{
      name: string
      nicCode: string
      turnoverPercent: string
    }>
    nationalPlants?: string
    nationalOffices?: string
    internationalPlants?: string
    internationalOffices?: string
    nationalStates?: string
    internationalCountries?: string
    exportContribution?: string
    employees?: any
    workers?: any
    [key: string]: any
  }
  sectionB?: {
    policyMatrix?: {
      [key: string]: {
        hasPolicy?: string
        approvedByBoard?: string
        translatedToProcedures?: string
        webLink?: string
      }
    }
    policyWebLink?: string
    valueChainExtension?: string
    certifications?: string
    commitments?: string
    performance?: string
    directorStatement?: string
    highestAuthority?: {
      name?: string
      designation?: string
      din?: string
      email?: string
      phone?: string
    }
    sustainabilityCommittee?: string
    review?: {
      performance?: {
        p1?: string
        p2?: string
        p3?: string
        p4?: string
        p5?: string
        p6?: string
        p7?: string
        p8?: string
        p9?: string
      }
      performanceFrequency?: string
      compliance?: string
    }
    independentAssessment?: {
      p1?: string
      p2?: string
      p3?: string
      p4?: string
      p5?: string
      p6?: string
      p7?: string
      p8?: string
      p9?: string
    }
    noPolicyReasons?: {
      notMaterial?: {
        p1?: string
        p2?: string
        p3?: string
        p4?: string
        p5?: string
        p6?: string
        p7?: string
        p8?: string
        p9?: string
      }
      notReady?: {
        p1?: string
        p2?: string
        p3?: string
        p4?: string
        p5?: string
        p6?: string
        p7?: string
        p8?: string
        p9?: string
      }
      noResources?: {
        p1?: string
        p2?: string
        p3?: string
        p4?: string
        p5?: string
        p6?: string
        p7?: string
        p8?: string
        p9?: string
      }
      plannedNextYear?: {
        p1?: string
        p2?: string
        p3?: string
        p4?: string
        p5?: string
        p6?: string
        p7?: string
        p8?: string
        p9?: string
      }
      otherReason?: {
        p1?: string
        p2?: string
        p3?: string
        p4?: string
        p5?: string
        p6?: string
        p7?: string
        p8?: string
        p9?: string
      }
    }
    [key: string]: any
  }
  sectionC?: {
    principle1?: {
      essential?: {
        q1_percentageCoveredByTraining?: {
          boardOfDirectors?: {
            totalProgrammes?: string
            topicsCovered?: string
            percentageCovered?: string
          }
          kmp?: {
            totalProgrammes?: string
            topicsCovered?: string
            percentageCovered?: string
          }
          employees?: {
            totalProgrammes?: string
            topicsCovered?: string
            percentageCovered?: string
          }
          workers?: {
            totalProgrammes?: string
            topicsCovered?: string
            percentageCovered?: string
          }
        }
        q2_finesPenalties?: {
          monetary?: Array<{
            type?: string
            ngrbc?: string
            regulatoryAgency?: string
            amountInr?: string
            briefOfCase?: string
            appealPreferred?: string
          }>
          nonMonetary?: Array<{
            type?: string
            ngrbc?: string
            regulatoryAgency?: string
            briefOfCase?: string
            appealPreferred?: string
          }>
        }
        q3_appealsOutstanding?: string
        q4_antiCorruptionPolicy?: {
          exists?: string
          details?: string
          webLink?: string
        }
        q5_disciplinaryActions?: {
          directors?: { currentFY?: string; previousFY?: string }
          kmps?: { currentFY?: string; previousFY?: string }
          employees?: { currentFY?: string; previousFY?: string }
          workers?: { currentFY?: string; previousFY?: string }
        }
        q6_conflictOfInterestComplaints?: {
          directors?: {
            currentFY?: { number?: string; remarks?: string }
            previousFY?: { number?: string; remarks?: string }
          }
          kmps?: {
            currentFY?: { number?: string; remarks?: string }
            previousFY?: { number?: string; remarks?: string }
          }
        }
        q7_correctiveActions?: string
        q8_accountsPayableDays?: {
          currentFY?: string
          previousFY?: string
        }
        q9_opennessBusiness?: {
          concentrationPurchases?: {
            tradingHousesPercent?: { currentFY?: string; previousFY?: string }
            dealersCount?: { currentFY?: string; previousFY?: string }
            top10TradingHouses?: { currentFY?: string; previousFY?: string }
          }
          concentrationSales?: {
            dealersDistributorsPercent?: { currentFY?: string; previousFY?: string }
            dealersCount?: { currentFY?: string; previousFY?: string }
            top10Dealers?: { currentFY?: string; previousFY?: string }
          }
          shareRPTs?: {
            purchases?: { currentFY?: string; previousFY?: string }
            sales?: { currentFY?: string; previousFY?: string }
            loansAdvances?: { currentFY?: string; previousFY?: string }
            investments?: { currentFY?: string; previousFY?: string }
          }
        }
      }
      leadership?: {
        q1_valueChainAwareness?: Array<{
          totalProgramsHeld?: string
          topicsCovered?: string
          percentageValueChainCovered?: string
        }>
        q2_conflictOfInterestProcess?: {
          details?: string
        }
      }
    }
    principle2?: {
      essential?: {
        q1_rdCapexInvestments?: {
          rd?: {
            currentFY?: string
            previousFY?: string
            improvementDetails?: string
          }
          capex?: {
            currentFY?: string
            previousFY?: string
            improvementDetails?: string
          }
        }
        q2_sustainableSourcing?: {
          proceduresInPlace?: string
          percentageSustainablySourced?: string
        }
        q3_reclaimProcesses?: {
          plastics?: {
            applicable?: string
            process?: string
          }
          eWaste?: {
            applicable?: string
            process?: string
          }
          hazardousWaste?: {
            applicable?: string
            process?: string
          }
          otherWaste?: {
            applicable?: string
            process?: string
          }
        }
        q4_epr?: {
          applicable?: string
          wasteCollectionPlanInLine?: string
        }
      }
      leadership?: {
        q1_lcaDetails?: string
        q2_significantConcerns?: string
        q3_recycledInputMaterial?: Array<{
          inputMaterial?: string
          currentFY?: string
          previousFY?: string
        }>
        q4_productsReclaimed?: {
          plastics?: {
            currentFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
            previousFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
          }
          eWaste?: {
            currentFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
            previousFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
          }
          hazardousWaste?: {
            currentFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
            previousFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
          }
          otherWaste?: {
            currentFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
            previousFY?: {
              reUsed?: string
              recycled?: string
              safelyDisposed?: string
            }
          }
        }
        q5_reclaimedPercentage?: string
      }
    }
    [key: string]: any
  }
}
