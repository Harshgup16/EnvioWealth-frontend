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
        webLink?: string
      }
    }
    [key: string]: any
  }
  sectionC?: {
    [key: string]: any
  }
}
