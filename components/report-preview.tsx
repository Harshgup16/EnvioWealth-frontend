"use client"

import React, { forwardRef } from "react"
import type { Ref } from "react"

import type { BRSRData } from "@/lib/types"
import { BRSR_QUESTIONS } from "@/lib/brsr-questions"

interface ReportPreviewProps {
  data: BRSRData
}

const renderValue = (value: any): string => {
  // Treat null/undefined/empty strings and empty objects/arrays as "NIL"
  if (value === null || value === undefined) return "NIL"

  if (typeof value === "string") {
    if (value.trim() === "") return "NIL"
    return value
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      if (value.length === 0) return "NIL"
      return JSON.stringify(value)
    }
    if (Object.keys(value).length === 0) return "NIL"

    // Handle {count, percentage} or {number, percent} objects
    if ("percent" in value) return String(value.percent)
    if ("percentage" in value) return String(value.percentage)
    if ("number" in value) return String(value.number)
    if ("count" in value) return String(value.count)
    return JSON.stringify(value)
  }

  return String(value)
}

// Helper Components
const SectionHeader = ({ title }: { title: string }) => (
  <div className="bg-linear-to-r from-[#007A3D] to-[#005a2d] text-white p-4 mb-4">
    <h2 className="text-lg font-bold tracking-wide">{title}</h2>
  </div>
)

const SubSectionHeader = ({ roman, title }: { roman: string; title: string }) => (
  <div className="border-b-2 border-[#007A3D] pb-2 mb-4 mt-6">
    <h3 className="text-base font-bold text-[#007A3D]">
      {roman}. {title}
    </h3>
  </div>
)

const PrincipleHeader = ({ num, title }: { num: number; title: string }) => (
  <div className="bg-linear-to-r from-[#007A3D] to-[#009944] text-white p-3">
    <h4 className="font-bold">
      PRINCIPLE {num}: {title}
    </h4>
  </div>
)

const IndicatorSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="bg-[#e8f5e9] border-l-4 border-[#007A3D] px-3 py-2 mb-4">
      <h5 className="font-semibold text-[#007A3D]">{title}</h5>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
)

const QuestionBlock = ({
  num,
  question,
  children,
}: {
  num: number | string
  question: string
  children: React.ReactNode
}) => (
  <div className="mb-4 pl-4 border-l-2 border-gray-200">
    <p className="text-sm font-medium mb-2">
      <span className="font-bold text-[#007A3D]">{num}.</span> {question}
    </p>
    <div className="pl-4">{children}</div>
  </div>
)

const TextBlock = ({ text }: { text: string | undefined | null | object }) => (
  <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{renderValue(text)}</p>
)

const DataTable = ({
  headers,
  rows,
  compact = false,
}: {
  headers: string[]
  rows: any[][]
  compact?: boolean
}) => (
  <div className="overflow-x-auto">
    <table className={`w-full border-collapse text-sm ${compact ? "text-xs" : ""}`}>
      <thead>
        <tr className="bg-[#007A3D] text-white">
          {headers.map((h, i) => (
            <th key={i} className="border border-gray-300 p-2 text-left font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            {row.map((cell, j) => (
              <td key={j} className="border border-gray-300 p-2">
                {renderValue(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const NumberedRow = ({
  num,
  label,
  value,
}: { num: number; label: string; value: string | undefined | null | object }) => (
  <tr className="border-b">
    <td className="p-2 w-12 text-center font-medium">{num}.</td>
    <td className="p-2 font-medium bg-gray-50">{label}</td>
    <td className="p-2">{renderValue(value)}</td>
  </tr>
)

const MinimumWagesTable = ({ data }: { data: any }) => {
  if (!data || (!data.employees && !data.workers)) {
    return <TextBlock text="No minimum wages data provided" />
  }

  const renderEmployeeSection = () => {
    if (!data.employees) return null

    const employees = data.employees
    return (
      <div className="mb-6">
        <h6 className="font-semibold text-[#007A3D] mb-2">EMPLOYEES</h6>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#007A3D] text-white">
                <th rowSpan={3} className="border border-gray-300 p-2">
                  Category
                </th>
                <th rowSpan={3} className="border border-gray-300 p-2"></th>
                <th colSpan={6} className="border border-gray-300 p-2">
                  Current FY
                </th>
                <th colSpan={6} className="border border-gray-300 p-2">
                  Previous FY
                </th>
              </tr>
              <tr className="bg-[#009944] text-white">
                <th colSpan={2} className="border border-gray-300 p-1">
                  Total
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  Equal to Min Wage
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  More than Min Wage
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  Total
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  Equal to Min Wage
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  More than Min Wage
                </th>
              </tr>
              <tr className="bg-[#00aa55] text-white">
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
              </tr>
            </thead>
            <tbody>
              {/* Permanent Male */}
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 font-medium text-center" rowSpan={2}>
                  Permanent
                </td>
                <td className="border border-gray-300 p-2">Male</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.male?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
              {/* Permanent Female */}
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Female</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.permanent?.female?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
              {/* Other than Permanent Male */}
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 font-medium text-center" rowSpan={2}>
                  Other than Permanent
                </td>
                <td className="border border-gray-300 p-2">Male</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
              {/* Other than Permanent Female */}
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-2">Female</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">-</td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {employees.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderWorkerSection = () => {
    if (!data.workers) return null

    const workers = data.workers
    return (
      <div>
        <h6 className="font-semibold text-[#007A3D] mb-2">WORKERS</h6>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[#007A3D] text-white">
                <th rowSpan={3} className="border border-gray-300 p-2">
                  Category
                </th>
                <th rowSpan={3} className="border border-gray-300 p-2"></th>
                <th colSpan={6} className="border border-gray-300 p-2">
                  Current FY
                </th>
                <th colSpan={6} className="border border-gray-300 p-2">
                  Previous FY
                </th>
              </tr>
              <tr className="bg-[#009944] text-white">
                <th colSpan={2} className="border border-gray-300 p-1">
                  Total
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  Equal to Min Wage
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  More than Min Wage
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  Total
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  Equal to Min Wage
                </th>
                <th colSpan={2} className="border border-gray-300 p-1">
                  More than Min Wage
                </th>
              </tr>
              <tr className="bg-[#00aa55] text-white">
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
                <th className="border border-gray-300 p-1">No.</th>
                <th className="border border-gray-300 p-1">%</th>
              </tr>
            </thead>
            <tbody>
              {/* Permanent Male */}
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 font-medium" rowSpan={2}>
                  Permanent
                </td>
                <td className="border border-gray-300 p-1">Male</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.male?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
              {/* Permanent Female */}
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-1">Female</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.permanent?.female?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
              {/* Other than Permanent Male */}
              <tr className="bg-white">
                <td className="border border-gray-300 p-2 font-medium" rowSpan={2}>
                  Other than Permanent
                </td>
                <td className="border border-gray-300 p-1">Male</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
              {/* Other than Permanent Female */}
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-1">Female</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.currentFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.currentFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.currentFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.previousFY?.total || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">-</td>
                <td className="border border-ggray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.previousFY?.equalToMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.previousFY?.equalToMinWage?.percent || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.number || "-"}
                </td>
                <td className="border border-gray-300 p-1 text-center">
                  {workers.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.percent || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {renderEmployeeSection()}
      {renderWorkerSection()}
    </div>
  )
}

export const ReportPreview = forwardRef<HTMLDivElement, ReportPreviewProps>(
  function ReportPreview({ data }, ref) {
    const { sectionA, sectionB, sectionC } = data || {}

    const p1 = sectionC?.principle1
    const p2 = sectionC?.principle2
    const p3 = sectionC?.principle3
    const p4 = sectionC?.principle4
    const p5 = sectionC?.principle5
    const p6 = sectionC?.principle6
    const p7 = sectionC?.principle7
    const p8 = sectionC?.principle8
    const p9 = sectionC?.principle9

    return (
      <div ref={ref} className="bg-white text-black p-8 max-w-[210mm] mx-auto shadow-lg print:shadow-none print:p-6 print:max-w-full">
      {/* Title Page */}
      <div className="text-center mb-12 pb-8 border-b-4 border-[#007A3D] page-break-inside-avoid">
        <h1 className="text-3xl font-bold text-[#007A3D] mb-2">BUSINESS RESPONSIBILITY &</h1>
        <h1 className="text-3xl font-bold text-[#007A3D] mb-6">SUSTAINABILITY REPORTING</h1>
        <p className="text-lg text-gray-600">Annual Report {sectionA?.financialYear || "2023-24"}</p>
      </div>

      {/* SECTION A */}
      <SectionHeader title="SECTION A: GENERAL DISCLOSURES" />

      <SubSectionHeader roman="I" title="Details of the Listed Entity" />
      <table className="w-full border-collapse mb-6">
        <tbody>
          <NumberedRow num={1} label="Corporate Identity Number (CIN)" value={sectionA?.cin} />
          <NumberedRow num={2} label="Name of the Listed Entity" value={sectionA?.entityName} />
          <NumberedRow num={3} label="Year of incorporation" value={sectionA?.yearOfIncorporation} />
          <NumberedRow num={4} label="Registered office address" value={sectionA?.registeredAddress} />
          <NumberedRow num={5} label="Corporate address" value={sectionA?.corporateAddress} />
          <NumberedRow num={6} label="E-mail" value={sectionA?.email} />
          <NumberedRow num={7} label="Telephone" value={sectionA?.telephone} />
          <NumberedRow num={8} label="Website" value={sectionA?.website} />
          <NumberedRow
            num={9}
            label="Financial year for which reporting is being done"
            value={sectionA?.financialYear}
          />
          <NumberedRow num={10} label="Stock Exchange(s) where shares are listed" value={sectionA?.stockExchanges} />
          <NumberedRow num={11} label="Paid-up Capital" value={sectionA?.paidUpCapital} />
          <NumberedRow
            num={12}
            label="Contact person for BRSR queries"
            value={`${sectionA?.contactName || ""}, ${sectionA?.contactDesignation || ""}, ${sectionA?.contactPhone || ""}, ${sectionA?.contactEmail || ""}`}
          />
          <NumberedRow num={13} label="Reporting boundary" value={sectionA?.reportingBoundary} />
          <NumberedRow num={14} label="Name of assurance provider" value={sectionA?.assuranceProvider} />
          <NumberedRow num={15} label="Type of assurance obtained" value={sectionA?.assuranceType} />
        </tbody>
      </table>

      {/* Section A - Products/Services */}
      <SubSectionHeader roman="II" title="Products/Services" />
      <QuestionBlock num={16} question="Details of business activities:">
        <DataTable
          headers={["S.No.", "Description of Main Activity", "Description of Business Activity", "% of Turnover"]}
          rows={
            sectionA?.businessActivities?.map((b: any, i: number) => [
              i + 1,
              b.mainActivity,
              b.businessDescription,
              b.turnoverPercent,
            ]) || []
          }
        />
      </QuestionBlock>
      <QuestionBlock num={17} question="Products/Services sold by the entity:">
        <DataTable
          headers={["S.No.", "Product/Service", "NIC Code", "% of Total Turnover"]}
          rows={sectionA?.products?.map((p: any, i: number) => [i + 1, p.name, p.nicCode, p.turnoverPercent]) || []}
        />
      </QuestionBlock>

      {/* Section A - Operations */}
      <SubSectionHeader roman="III" title="Operations" />
      <QuestionBlock num={18} question="Number of locations where plants/operations/offices are situated:">
        <DataTable
          headers={["Location", "Number of plants", "Number of offices"]}
          rows={[
            ["National", sectionA?.nationalPlants, sectionA?.nationalOffices],
            ["International", sectionA?.internationalPlants, sectionA?.internationalOffices],
          ]}
        />
      </QuestionBlock>
      <QuestionBlock num={19} question="Markets served by the entity:">
        <TextBlock
          text={`National: ${sectionA?.nationalStates || "NA"} states/UTs | International: ${sectionA?.internationalCountries || "NA"} countries | Export contribution: ${sectionA?.exportContribution || "NA"}`}
        />
      </QuestionBlock>

      {/* Section A - Employees */}
      <SubSectionHeader roman="IV" title="Employees" />
      <QuestionBlock num={20} question="Details of employees and workers:">
        <DataTable
          headers={["Category", "Male", "Female", "Total"]}
          rows={[
            [
              "Permanent Employees",
              sectionA?.employees?.permanent?.male || "0",
              sectionA?.employees?.permanent?.female || "0",
              sectionA?.employees?.permanent?.total || "0",
            ],
            [
              "Other than Permanent",
              sectionA?.employees?.otherThanPermanent?.male || "0",
              sectionA?.employees?.otherThanPermanent?.female || "0",
              sectionA?.employees?.otherThanPermanent?.total || "0",
            ],
            [
              "Permanent Workers",
              sectionA?.workers?.permanent?.male || "0",
              sectionA?.workers?.permanent?.female || "0",
              sectionA?.workers?.permanent?.total || "0",
            ],
            [
              "Other than Permanent",
              sectionA?.workers?.otherThanPermanent?.male || "0",
              sectionA?.workers?.otherThanPermanent?.female || "0",
              sectionA?.workers?.otherThanPermanent?.total || "0",
            ],
          ]}
        />
      </QuestionBlock>

      <QuestionBlock num={21} question="Participation/Inclusion/Representation of women:">
        <DataTable
          headers={["Category", "Total (A)", "Female (B)", "% (B/A)"]}
          rows={[
            [
              "Board of Directors",
              sectionA?.board?.total || "0",
              sectionA?.board?.female || "0",
              sectionA?.board?.femalePercent || "0%",
            ],
            [
              "Key Management Personnel",
              sectionA?.kmp?.total || "0",
              sectionA?.kmp?.female || "0",
              sectionA?.kmp?.femalePercent || "0%",
            ],
          ]}
        />
      </QuestionBlock>

      <QuestionBlock num={22} question="Turnover rate for permanent employees and workers:">
        <DataTable
          headers={["Category", "Male", "Female", "Total"]}
          rows={[
            [
              "Permanent Employees",
              sectionA?.turnover?.employees?.male || "0%",
              sectionA?.turnover?.employees?.female || "0%",
              sectionA?.turnover?.employees?.total || "0%",
            ],
            [
              "Permanent Workers",
              sectionA?.turnover?.workers?.male || "0%",
              sectionA?.turnover?.workers?.female || "0%",
              sectionA?.turnover?.workers?.total || "0%",
            ],
          ]}
        />
      </QuestionBlock>

      {/* Section A - Holding, Subsidiary */}
      <SubSectionHeader roman="V" title="Holding, Subsidiary and Associate Companies" />
      <QuestionBlock num={23} question="Names of holding / subsidiary / associate companies / joint ventures:">
        <TextBlock text={sectionA?.subsidiaries || "NA"} />
      </QuestionBlock>

      {/* Section A - CSR Details */}
      <SubSectionHeader roman="VI" title="CSR Details" />
      <QuestionBlock num={24} question="CSR activities:">
        <TextBlock
          text={`CSR prescribed amount: ${sectionA?.csr?.prescribedAmount || "NA"} | Amount spent: ${sectionA?.csr?.amountSpent || "NA"} | Surplus: ${sectionA?.csr?.surplus || "NA"}`}
        />
      </QuestionBlock>

      {/* Section A - Transparency */}
      <SubSectionHeader roman="VII" title="Transparency and Disclosures Compliances" />
      <QuestionBlock num={25} question="Complaints/Grievances on any of the principles:">
        <DataTable
          headers={["Stakeholder", "Current FY Filed", "Current FY Pending", "Previous FY Remarks"]}
          rows={[
            [
              "Communities",
              sectionA?.complaints?.communities?.filed || "0",
              sectionA?.complaints?.communities?.pending || "0",
              sectionA?.complaints?.communities?.remarks || "None",
            ],
            [
              "Investors",
              sectionA?.complaints?.investors?.filed || "0",
              sectionA?.complaints?.investors?.pending || "0",
              sectionA?.complaints?.investors?.remarks || "None",
            ],
            [
              "Shareholders",
              sectionA?.complaints?.shareholders?.filed || "0",
              sectionA?.complaints?.shareholders?.pending || "0",
              sectionA?.complaints?.shareholders?.remarks || "None",
            ],
            [
              "Employees & Workers",
              sectionA?.complaints?.employees?.filed || "0",
              sectionA?.complaints?.employees?.pending || "0",
              sectionA?.complaints?.employees?.remarks || "None",
            ],
            [
              "Customers",
              sectionA?.complaints?.customers?.filed || "0",
              sectionA?.complaints?.customers?.pending || "0",
              sectionA?.complaints?.customers?.remarks || "None",
            ],
            [
              "Value Chain Partners",
              sectionA?.complaints?.valueChain?.filed || "0",
              sectionA?.complaints?.valueChain?.pending || "0",
              sectionA?.complaints?.valueChain?.remarks || "None",
            ],
          ]}
        />
      </QuestionBlock>

      <QuestionBlock num={26} question="Overview of the entity's material responsible business conduct issues:">
        {sectionA?.materialIssues && Array.isArray(sectionA.materialIssues) && sectionA.materialIssues.length > 0 ? (
          <DataTable
            headers={["S.No.", "Material Issue", "R/O", "Rationale", "Approach to Mitigate", "Financial Implications"]}
            rows={sectionA.materialIssues.map((issue: any, index: number) => [
              (index + 1).toString(),
              issue.issue || "NA",
              issue.type || "NA",
              issue.rationale || "NA",
              issue.approach || "NA",
              issue.financialImplications || "NA",
            ])}
          />
        ) : (
          <TextBlock text="No material issues disclosed" />
        )}
      </QuestionBlock>

      {/* SECTION B */}
      <div className="mt-8">
        <SectionHeader title="SECTION B: MANAGEMENT AND PROCESS DISCLOSURES" />
        <p className="text-sm mb-4 text-gray-600">
          This section is aimed at helping businesses demonstrate the structures, policies and processes put in place
          towards adopting the NGRBC Principles and Core Elements.
        </p>

        <div className="mb-6">
          <h4 className="font-bold text-[#007A3D] mb-3">Policy and management processes</h4>
          
          <QuestionBlock num={1} question="Whether your entity's policy/policies cover each principle and its core elements:">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold mb-1 text-gray-600">a. Whether your entity's policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)</p>
                <DataTable
                  compact
                  headers={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
                  rows={[[
                    sectionB?.policyMatrix?.p1?.hasPolicy || "",
                    sectionB?.policyMatrix?.p2?.hasPolicy || "",
                    sectionB?.policyMatrix?.p3?.hasPolicy || "",
                    sectionB?.policyMatrix?.p4?.hasPolicy || "",
                    sectionB?.policyMatrix?.p5?.hasPolicy || "",
                    sectionB?.policyMatrix?.p6?.hasPolicy || "",
                    sectionB?.policyMatrix?.p7?.hasPolicy || "",
                    sectionB?.policyMatrix?.p8?.hasPolicy || "",
                    sectionB?.policyMatrix?.p9?.hasPolicy || "",
                  ]]}
                />
              </div>
              
              <div>
                <p className="text-xs font-semibold mb-1 text-gray-600">b. Has the policy been approved by the Board? (Yes/No)</p>
                <DataTable
                  compact
                  headers={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
                  rows={[[
                    sectionB?.policyMatrix?.p1?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p2?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p3?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p4?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p5?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p6?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p7?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p8?.approvedByBoard || "",
                    sectionB?.policyMatrix?.p9?.approvedByBoard || "",
                  ]]}
                />
              </div>
              
              <div>
                <p className="text-xs font-semibold mb-1 text-gray-600">c. Web Link of the Policies, if available</p>
                {sectionB?.policyWebLink && (
                  <div className="mb-2">
                    <TextBlock text={sectionB.policyWebLink} />
                  </div>
                )}
                <DataTable
                  compact
                  headers={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
                  rows={[[
                    sectionB?.policyMatrix?.p1?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p2?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p3?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p4?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p5?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p6?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p7?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p8?.webLink ? "Link" : "-",
                    sectionB?.policyMatrix?.p9?.webLink ? "Link" : "-",
                  ]]}
                />
                <div className="mt-2 text-xs space-y-1">
                  {sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P1:</strong> <a href={sectionB.policyMatrix.p1.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p1.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p2?.webLink && sectionB.policyMatrix.p2.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P2:</strong> <a href={sectionB.policyMatrix.p2.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p2.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p3?.webLink && sectionB.policyMatrix.p3.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P3:</strong> <a href={sectionB.policyMatrix.p3.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p3.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p4?.webLink && sectionB.policyMatrix.p4.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P4:</strong> <a href={sectionB.policyMatrix.p4.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p4.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p5?.webLink && sectionB.policyMatrix.p5.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P5:</strong> <a href={sectionB.policyMatrix.p5.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p5.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p6?.webLink && sectionB.policyMatrix.p6.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P6:</strong> <a href={sectionB.policyMatrix.p6.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p6.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p7?.webLink && sectionB.policyMatrix.p7.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P7:</strong> <a href={sectionB.policyMatrix.p7.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p7.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p8?.webLink && sectionB.policyMatrix.p8.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P8:</strong> <a href={sectionB.policyMatrix.p8.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p8.webLink}</a></p>
                  )}
                  {sectionB?.policyMatrix?.p9?.webLink && sectionB.policyMatrix.p9.webLink !== sectionB?.policyMatrix?.p1?.webLink && (
                    <p className="text-gray-600"><strong>P9:</strong> <a href={sectionB.policyMatrix.p9.webLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{sectionB.policyMatrix.p9.webLink}</a></p>
                  )}
                </div>
              </div>
            </div>
          </QuestionBlock>

          <QuestionBlock num={2} question="Whether the entity has translated the policy into procedures. (Yes / No)">
            <DataTable
              compact
              headers={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
              rows={[[
                sectionB?.policyMatrix?.p1?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p2?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p3?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p4?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p5?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p6?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p7?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p8?.translatedToProcedures || "",
                sectionB?.policyMatrix?.p9?.translatedToProcedures || "",
              ]]}
            />
          </QuestionBlock>
        </div>

        <div className="mb-6">
          <h4 className="font-bold text-[#007A3D] mb-3">Governance, leadership and oversight</h4>
          
          <QuestionBlock num={3} question="Do the enlisted policies extend to your value chain partners? (Yes/No)">
            <TextBlock text={sectionB?.valueChainExtension || ""} />
          </QuestionBlock>

          <QuestionBlock num={4} question="Name of the national and international codes/certifications/labels/ standards (e.g. Forest Stewardship Council, Fairtrade, Rainforest Alliance, Trustea) standards (e.g. SA 8000, OHSAS, ISO, BIS) adopted by your entity and mapped to each principle.">
            <TextBlock text={sectionB?.certifications || ""} />
          </QuestionBlock>

          <QuestionBlock num={5} question="Specific commitments, goals and targets set by the entity with defined timelines, if any.">
            <TextBlock text={sectionB?.commitments || ""} />
          </QuestionBlock>

          <QuestionBlock num={6} question="Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.">
            <TextBlock text={sectionB?.performance || ""} />
          </QuestionBlock>

          <QuestionBlock num={7} question="Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements">
            <TextBlock text={sectionB?.directorStatement || ""} />
          </QuestionBlock>

          <QuestionBlock num={8} question="Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).">
            <div className="bg-gray-50 p-3 rounded space-y-1 text-sm">
              <p><strong>Name:</strong> {sectionB?.highestAuthority?.name || ""}</p>
              <p><strong>Designation:</strong> {sectionB?.highestAuthority?.designation || ""}</p>
              <p><strong>DIN:</strong> {sectionB?.highestAuthority?.din || ""}</p>
              <p><strong>Email:</strong> {sectionB?.highestAuthority?.email || ""}</p>
              <p><strong>Tel:</strong> {sectionB?.highestAuthority?.phone || ""}</p>
            </div>
          </QuestionBlock>

          <QuestionBlock num={9} question="Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.">
            <TextBlock text={sectionB?.sustainabilityCommittee || ""} />
          </QuestionBlock>
        </div>

        <QuestionBlock num={10} question="Details of Review of NGRBCs by the Company:">
          <div className="mb-3">
            <p className="text-xs font-semibold mb-2 text-gray-600">Subject: Performance against above policies and follow up action</p>
            <div className="mb-4">
              <p className="text-xs font-medium mb-1">Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee</p>
              <DataTable
                compact
                headers={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
                rows={[[
                  sectionB?.review?.performance?.p1 || "",
                  sectionB?.review?.performance?.p2 || "",
                  sectionB?.review?.performance?.p3 || "",
                  sectionB?.review?.performance?.p4 || "",
                  sectionB?.review?.performance?.p5 || "",
                  sectionB?.review?.performance?.p6 || "",
                  sectionB?.review?.performance?.p7 || "",
                  sectionB?.review?.performance?.p8 || "",
                  sectionB?.review?.performance?.p9 || "",
                ]]}
              />
            </div>
            <div>
              <p className="text-xs font-medium mb-1">Frequency (Annually/ Half yearly/ Quarterly/ Any other – please specify)</p>
              <TextBlock text={sectionB?.review?.performanceFrequency || ""} />
            </div>
          </div>
          
          <div>
            <p className="text-xs font-semibold mb-2 text-gray-600">Subject: Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances</p>
            <TextBlock text={sectionB?.review?.compliance || ""} />
          </div>
        </QuestionBlock>

        <QuestionBlock num={11} question="Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.">
          <DataTable
            compact
            headers={["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
            rows={[[
              sectionB?.independentAssessment?.p1 || "",
              sectionB?.independentAssessment?.p2 || "",
              sectionB?.independentAssessment?.p3 || "",
              sectionB?.independentAssessment?.p4 || "",
              sectionB?.independentAssessment?.p5 || "",
              sectionB?.independentAssessment?.p6 || "",
              sectionB?.independentAssessment?.p7 || "",
              sectionB?.independentAssessment?.p8 || "",
              sectionB?.independentAssessment?.p9 || "",
            ]]}
          />
        </QuestionBlock>

        <QuestionBlock num={12} question='If answer to question (1) above is "No" i.e. not all Principles are covered by a policy, reasons to be stated:'>
          <DataTable
            headers={["Questions", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]}
            rows={[
              [
                "The entity does not consider the Principles material to its business (Yes/No)",
                sectionB?.noPolicyReasons?.notMaterial?.p1 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p2 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p3 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p4 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p5 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p6 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p7 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p8 || "",
                sectionB?.noPolicyReasons?.notMaterial?.p9 || "",
              ],
              [
                "The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles (Yes/No)",
                sectionB?.noPolicyReasons?.notReady?.p1 || "",
                sectionB?.noPolicyReasons?.notReady?.p2 || "",
                sectionB?.noPolicyReasons?.notReady?.p3 || "",
                sectionB?.noPolicyReasons?.notReady?.p4 || "",
                sectionB?.noPolicyReasons?.notReady?.p5 || "",
                sectionB?.noPolicyReasons?.notReady?.p6 || "",
                sectionB?.noPolicyReasons?.notReady?.p7 || "",
                sectionB?.noPolicyReasons?.notReady?.p8 || "",
                sectionB?.noPolicyReasons?.notReady?.p9 || "",
              ],
              [
                "The entity does not have the financial or/human and technical resources available for the task (Yes/No)",
                sectionB?.noPolicyReasons?.noResources?.p1 || "",
                sectionB?.noPolicyReasons?.noResources?.p2 || "",
                sectionB?.noPolicyReasons?.noResources?.p3 || "",
                sectionB?.noPolicyReasons?.noResources?.p4 || "",
                sectionB?.noPolicyReasons?.noResources?.p5 || "",
                sectionB?.noPolicyReasons?.noResources?.p6 || "",
                sectionB?.noPolicyReasons?.noResources?.p7 || "",
                sectionB?.noPolicyReasons?.noResources?.p8 || "",
                sectionB?.noPolicyReasons?.noResources?.p9 || "",
              ],
              [
                "It is planned to be done in the next financial year (Yes/No)",
                sectionB?.noPolicyReasons?.plannedNextYear?.p1 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p2 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p3 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p4 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p5 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p6 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p7 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p8 || "",
                sectionB?.noPolicyReasons?.plannedNextYear?.p9 || "",
              ],
              [
                "Any other reason (please specify)",
                sectionB?.noPolicyReasons?.otherReason?.p1 || "",
                sectionB?.noPolicyReasons?.otherReason?.p2 || "",
                sectionB?.noPolicyReasons?.otherReason?.p3 || "",
                sectionB?.noPolicyReasons?.otherReason?.p4 || "",
                sectionB?.noPolicyReasons?.otherReason?.p5 || "",
                sectionB?.noPolicyReasons?.otherReason?.p6 || "",
                sectionB?.noPolicyReasons?.otherReason?.p7 || "",
                sectionB?.noPolicyReasons?.otherReason?.p8 || "",
                sectionB?.noPolicyReasons?.otherReason?.p9 || "",
              ],
            ]}
          />
        </QuestionBlock>
      </div>

      {/* SECTION C */}
      <div className="mt-8">
        <SectionHeader title="SECTION C: PRINCIPLE WISE PERFORMANCE DISCLOSURE" />
        <p className="text-sm text-gray-600 mb-6">
          This section demonstrates performance in integrating the Principles and Core Elements with key processes and
          decisions. Information is categorized as "Essential" and "Leadership" indicators.
        </p>

        {/* PRINCIPLE 1 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={1}
            title="Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent and Accountable."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q1 ||
                  "Percentage coverage by training and awareness programmes on any of the Principles during the financial year:"
                }
              >
                <DataTable
                  headers={["Segment", "Total number of training and awareness programmes held", "Topics/ principles covered under the training and its impact", "%age of persons in respective category covered by the awareness programmes"]}
                  rows={[
                    [
                      "Board of Directors",
                      p1?.essential?.q1_percentageCoveredByTraining?.boardOfDirectors?.totalProgrammes,
                      p1?.essential?.q1_percentageCoveredByTraining?.boardOfDirectors?.topicsCovered,
                      p1?.essential?.q1_percentageCoveredByTraining?.boardOfDirectors?.percentageCovered,
                    ],
                    [
                      "Key Managerial Personnel",
                      p1?.essential?.q1_percentageCoveredByTraining?.kmp?.totalProgrammes,
                      p1?.essential?.q1_percentageCoveredByTraining?.kmp?.topicsCovered,
                      p1?.essential?.q1_percentageCoveredByTraining?.kmp?.percentageCovered,
                    ],
                    [
                      "Employees other than BoD and KMPs",
                      p1?.essential?.q1_percentageCoveredByTraining?.employees?.totalProgrammes,
                      p1?.essential?.q1_percentageCoveredByTraining?.employees?.topicsCovered,
                      p1?.essential?.q1_percentageCoveredByTraining?.employees?.percentageCovered,
                    ],
                    [
                      "Workers",
                      p1?.essential?.q1_percentageCoveredByTraining?.workers?.totalProgrammes,
                      p1?.essential?.q1_percentageCoveredByTraining?.workers?.topicsCovered,
                      p1?.essential?.q1_percentageCoveredByTraining?.workers?.percentageCovered,
                    ],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q2 ||
                  "Details of fines / penalties / punishment / award / compounding fees / settlement amount"
                }
              >
                <p className="text-sm font-medium mb-2 text-[#007A3D]">Monetary:</p>
                <DataTable
                  headers={[
                    "Type",
                    "NGRBC Principle",
                    "Regulatory Agency",
                    "Amount (INR)",
                    "Brief of Case",
                    "Appeal Preferred?",
                  ]}
                  rows={(p1?.essential?.q2_finesPenalties?.monetary || []).map((f: any) => [
                    f?.type,
                    f?.ngrbc,
                    f?.regulatoryAgency,
                    f?.amountInr,
                    f?.briefOfCase,
                    f?.appealPreferred,
                  ])}
                  compact
                />
                <p className="text-sm font-medium mb-2 mt-4 text-[#007A3D]">Non-Monetary:</p>
                <DataTable
                  headers={["Type", "NGRBC Principle", "Regulatory Agency", "Brief of Case", "Appeal Preferred?"]}
                  rows={(p1?.essential?.q2_finesPenalties?.nonMonetary || []).map((f: any) => [
                    f?.type,
                    f?.ngrbc,
                    f?.regulatoryAgency,
                    f?.briefOfCase,
                    f?.appealPreferred,
                  ])}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q3 ||
                  "Of the instances disclosed in Question 2 above, details of the Appeal/ Revision"
                }
              >
                <TextBlock text={p1?.essential?.q3_appealsOutstanding} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q4 ||
                  "Does the entity have an anti-corruption or anti-bribery policy?"
                }
              >
                <TextBlock
                  text={`${p1?.essential?.q4_antiCorruptionPolicy?.exists || "NA"} - ${p1?.essential?.q4_antiCorruptionPolicy?.details || ""}`}
                />
                {p1?.essential?.q4_antiCorruptionPolicy?.webLink && (
                  <p className="text-xs text-[#007A3D] mt-1">
                    Web Link: {p1.essential.q4_antiCorruptionPolicy.webLink}
                  </p>
                )}
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q5 ||
                  "Number of Directors/KMPs/employees/workers against whom disciplinary action was taken"
                }
              >
                <DataTable
                  headers={["Category", "FY (Current)", "FY (Previous)"]}
                  rows={[
                    [
                      "Directors",
                      p1?.essential?.q5_disciplinaryActions?.directors?.currentFY,
                      p1?.essential?.q5_disciplinaryActions?.directors?.previousFY,
                    ],
                    [
                      "KMPs",
                      p1?.essential?.q5_disciplinaryActions?.kmps?.currentFY,
                      p1?.essential?.q5_disciplinaryActions?.kmps?.previousFY,
                    ],
                    [
                      "Employees",
                      p1?.essential?.q5_disciplinaryActions?.employees?.currentFY,
                      p1?.essential?.q5_disciplinaryActions?.employees?.previousFY,
                    ],
                    [
                      "Workers",
                      p1?.essential?.q5_disciplinaryActions?.workers?.currentFY,
                      p1?.essential?.q5_disciplinaryActions?.workers?.previousFY,
                    ],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q6 ||
                  "Details of complaints with regard to conflict of interest"
                }
              >
                <DataTable
                  headers={[
                    "Category",
                    "FY Current - Number",
                    "FY Current - Remarks",
                    "FY Previous - Number",
                    "FY Previous - Remarks",
                  ]}
                  rows={[
                    [
                      "Directors",
                      p1?.essential?.q6_conflictOfInterestComplaints?.directors?.currentFY?.number,
                      p1?.essential?.q6_conflictOfInterestComplaints?.directors?.currentFY?.remarks,
                      p1?.essential?.q6_conflictOfInterestComplaints?.directors?.previousFY?.number,
                      p1?.essential?.q6_conflictOfInterestComplaints?.directors?.previousFY?.remarks,
                    ],
                    [
                      "KMPs",
                      p1?.essential?.q6_conflictOfInterestComplaints?.kmps?.currentFY?.number,
                      p1?.essential?.q6_conflictOfInterestComplaints?.kmps?.currentFY?.remarks,
                      p1?.essential?.q6_conflictOfInterestComplaints?.kmps?.previousFY?.number,
                      p1?.essential?.q6_conflictOfInterestComplaints?.kmps?.previousFY?.remarks,
                    ],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={7}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q7 ||
                  "Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest."
                }
              >
                <TextBlock text={p1?.essential?.q7_correctiveActions} />
              </QuestionBlock>

              <QuestionBlock
                num={8}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q8 ||
                  "Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured) in the following format:"
                }
              >
                <DataTable
                  headers={["", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    [
                      "Number of days of accounts payables",
                      p1?.essential?.q8_accountsPayableDays?.currentFY,
                      p1?.essential?.q8_accountsPayableDays?.previousFY,
                    ],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={9}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle1?.essential?.q9 ||
                  "Open-ness of business"
                }
              >
                <p className="text-sm font-medium mb-2 text-[#007A3D]">Provide details of concentration of purchases and sales with trading houses, dealers and related parties along-with loans and advances & investments, with related parties, in the following format:</p>
                
                <p className="text-sm font-medium mb-2 mt-4">Concentration of Purchases</p>
                <DataTable
                  headers={["Parameter", "Metrics", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Concentration of Purchases", "a. Purchases from trading houses as % of total purchases", p1?.essential?.q9_opennessBusiness?.concentrationPurchases?.tradingHousesPercent?.currentFY, p1?.essential?.q9_opennessBusiness?.concentrationPurchases?.tradingHousesPercent?.previousFY],
                    ["", "b. Number of trading houses where purchases are made from", p1?.essential?.q9_opennessBusiness?.concentrationPurchases?.dealersCount?.currentFY, p1?.essential?.q9_opennessBusiness?.concentrationPurchases?.dealersCount?.previousFY],
                    ["", "c. Purchases from top 10 trading houses as % of total purchases from trading houses", p1?.essential?.q9_opennessBusiness?.concentrationPurchases?.top10TradingHouses?.currentFY, p1?.essential?.q9_opennessBusiness?.concentrationPurchases?.top10TradingHouses?.previousFY],
                  ]}
                  compact
                />

                <p className="text-sm font-medium mb-2 mt-4">Concentration of Sales</p>
                <DataTable
                  headers={["Parameter", "Metrics", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Concentration of Sales*", "a. Sales to dealers / distributors as % of total sales", p1?.essential?.q9_opennessBusiness?.concentrationSales?.dealersDistributorsPercent?.currentFY, p1?.essential?.q9_opennessBusiness?.concentrationSales?.dealersDistributorsPercent?.previousFY],
                    ["", "b. Number of dealers / distributors to whom sales are made", p1?.essential?.q9_opennessBusiness?.concentrationSales?.dealersCount?.currentFY, p1?.essential?.q9_opennessBusiness?.concentrationSales?.dealersCount?.previousFY],
                    ["", "c. Sales to top 10 dealers / distributors as % of total sales to dealers / distributors", p1?.essential?.q9_opennessBusiness?.concentrationSales?.top10Dealers?.currentFY, p1?.essential?.q9_opennessBusiness?.concentrationSales?.top10Dealers?.previousFY],
                  ]}
                  compact
                />

                <p className="text-sm font-medium mb-2 mt-4">Share of RPTs in</p>
                <DataTable
                  headers={["Parameter", "Metrics", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Share of RPTs in", "a. Purchases (Purchases with related parties / Total Purchases)", p1?.essential?.q9_opennessBusiness?.shareRPTs?.purchases?.currentFY, p1?.essential?.q9_opennessBusiness?.shareRPTs?.purchases?.previousFY],
                    ["", "b. Sales (Sales to related parties / Total Sales)", p1?.essential?.q9_opennessBusiness?.shareRPTs?.sales?.currentFY, p1?.essential?.q9_opennessBusiness?.shareRPTs?.sales?.previousFY],
                    ["", "c. Loans & advances (Loans & advances given to related parties / Total loans & advances)", p1?.essential?.q9_opennessBusiness?.shareRPTs?.loansAdvances?.currentFY, p1?.essential?.q9_opennessBusiness?.shareRPTs?.loansAdvances?.previousFY],
                    ["", "d. Investments (Investments in related parties / Total Investments made", p1?.essential?.q9_opennessBusiness?.shareRPTs?.investments?.currentFY, p1?.essential?.q9_opennessBusiness?.shareRPTs?.investments?.previousFY],
                  ]}
                  compact
                />
                <p className="text-xs text-gray-600 mt-2">*Based on domestic sales only</p>
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question={
                  (BRSR_QUESTIONS as any)?.sectionC?.principle1?.leadership?.q1 ||
                  "Awareness programmes conducted for value chain partners on any of the Principles during the financial year:"
                }
              >
                <DataTable
                  headers={["Total number of awareness programmes held", "Topics/principles covered under the training", "%age of value chain partners covered (by value of business done with such partners) under the awareness programmes"]}
                  rows={(p1?.leadership?.q1_valueChainAwareness || []).map((p: any) => [
                    p?.totalProgramsHeld,
                    p?.topicsCovered,
                    p?.percentageValueChainCovered,
                  ])}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question={
                  (BRSR_QUESTIONS as any)?.sectionC?.principle1?.leadership?.q2 ||
                  "Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board? (Yes/No) If Yes, provide details of the same."
                }
              >
                <TextBlock text={p1?.leadership?.q2_conflictOfInterestProcess?.details} />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 2 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={2}
            title="Businesses should provide goods and services in a manner that is sustainable and safe."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle2?.essential?.q1 ||
                  "Percentage of R&D and capital expenditure investments in specific technologies"
                }
              >
                <DataTable
                  headers={["", "FY (Current)", "FY (Previous)", "Details of improvements"]}
                  rows={[
                    [
                      "R&D",
                      p2?.essential?.q1_rdCapexInvestments?.rd?.currentFY,
                      p2?.essential?.q1_rdCapexInvestments?.rd?.previousFY,
                      p2?.essential?.q1_rdCapexInvestments?.rd?.improvementDetails,
                    ],
                    [
                      "Capex",
                      p2?.essential?.q1_rdCapexInvestments?.capex?.currentFY,
                      p2?.essential?.q1_rdCapexInvestments?.capex?.previousFY,
                      p2?.essential?.q1_rdCapexInvestments?.capex?.improvementDetails,
                    ],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num="2"
                question={
                  (BRSR_QUESTIONS as any)?.sectionC?.principle2?.essential?.q2a ||
                  "a. Does the entity have procedures in place for sustainable sourcing? (Yes/No)"
                }
              >
                <TextBlock text={p2?.essential?.q2_sustainableSourcing?.proceduresInPlace} />
              </QuestionBlock>

              <QuestionBlock
                num=""
                question={
                  (BRSR_QUESTIONS as any)?.sectionC?.principle2?.essential?.q2b ||
                  "b. If yes, what percentage of inputs were sourced sustainably?"
                }
              >
                <TextBlock text={p2?.essential?.q2_sustainableSourcing?.percentageSustainablySourced} />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle2?.essential?.q3 ||
                  "Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for (a) Plastics (including packaging) (b) E-waste (c) Hazardous waste and (d) other waste."
                }
              >
                <DataTable
                  headers={["Type of product", "Applicable to you (Y/N)", "Processes in place to safely reclaim your products for reusing/ recycling and disposing at end of life (please provide a brief right-up of the process in place)"]}
                  rows={[
                    ["a. Plastics (including packaging)", p2?.essential?.q3_reclaimProcesses?.plastics?.applicable, p2?.essential?.q3_reclaimProcesses?.plastics?.process],
                    ["b. E-waste", p2?.essential?.q3_reclaimProcesses?.eWaste?.applicable, p2?.essential?.q3_reclaimProcesses?.eWaste?.process],
                    ["c. Hazardous waste", p2?.essential?.q3_reclaimProcesses?.hazardousWaste?.applicable, p2?.essential?.q3_reclaimProcesses?.hazardousWaste?.process],
                    ["d. Other waste-if any (add more rows if required)", p2?.essential?.q3_reclaimProcesses?.otherWaste?.applicable, p2?.essential?.q3_reclaimProcesses?.otherWaste?.process],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle2?.essential?.q4 ||
                  "Whether Extended Producer Responsibility (EPR) is applicable to the entity"
                }
              >
                <TextBlock
                  text={`Applicable: ${p2?.essential?.q4_epr?.applicable || "NA"} | Waste Collection Plan: ${p2?.essential?.q4_epr?.wasteCollectionPlanInLine || "NA"}`}
                />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle2?.leadership?.q1 ||
                  "Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)? If yes, provide details in the following format?"
                }
              >
                <TextBlock text={p2?.leadership?.q1_lcaDetails} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle2?.leadership?.q2 ||
                  "If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same"
                }
              >
                <TextBlock text={p2?.leadership?.q2_significantConcerns} />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question={
                  BRSR_QUESTIONS?.sectionC?.principle2?.leadership?.q3 ||
                  "Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry)."
                }
              >
                <DataTable
                  headers={["Indicate input material", "Recycled or re-used input material to total material - FY 2023-24", "Recycled or re-used input material to total material - FY 2022-23"]}
                  rows={(p2?.leadership?.q3_recycledInputMaterial || []).map((m: any) => [
                    m?.inputMaterial,
                    m?.currentFY,
                    m?.previousFY,
                  ])}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question={
                  (BRSR_QUESTIONS as any)?.sectionC?.principle2?.leadership?.q4 ||
                  "Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:"
                }
              >
                <DataTable
                  headers={["", "FY 2023-24 - Re-Used", "FY 2023-24 - Recycled", "FY 2023-24 - Safely Disposed", "FY 2022-23 - Re-Used", "FY 2022-23 - Recycled", "FY 2022-23 - Safely Disposed"]}
                  rows={[
                    ["Plastics (including packaging)", p2?.leadership?.q4_productsReclaimed?.plastics?.currentFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.plastics?.currentFY?.recycled, p2?.leadership?.q4_productsReclaimed?.plastics?.currentFY?.safelyDisposed, p2?.leadership?.q4_productsReclaimed?.plastics?.previousFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.plastics?.previousFY?.recycled, p2?.leadership?.q4_productsReclaimed?.plastics?.previousFY?.safelyDisposed],
                    ["E-waste", p2?.leadership?.q4_productsReclaimed?.eWaste?.currentFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.eWaste?.currentFY?.recycled, p2?.leadership?.q4_productsReclaimed?.eWaste?.currentFY?.safelyDisposed, p2?.leadership?.q4_productsReclaimed?.eWaste?.previousFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.eWaste?.previousFY?.recycled, p2?.leadership?.q4_productsReclaimed?.eWaste?.previousFY?.safelyDisposed],
                    ["Hazardous waste", p2?.leadership?.q4_productsReclaimed?.hazardousWaste?.currentFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.hazardousWaste?.currentFY?.recycled, p2?.leadership?.q4_productsReclaimed?.hazardousWaste?.currentFY?.safelyDisposed, p2?.leadership?.q4_productsReclaimed?.hazardousWaste?.previousFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.hazardousWaste?.previousFY?.recycled, p2?.leadership?.q4_productsReclaimed?.hazardousWaste?.previousFY?.safelyDisposed],
                    ["Other waste", p2?.leadership?.q4_productsReclaimed?.otherWaste?.currentFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.otherWaste?.currentFY?.recycled, p2?.leadership?.q4_productsReclaimed?.otherWaste?.currentFY?.safelyDisposed, p2?.leadership?.q4_productsReclaimed?.otherWaste?.previousFY?.reUsed, p2?.leadership?.q4_productsReclaimed?.otherWaste?.previousFY?.recycled, p2?.leadership?.q4_productsReclaimed?.otherWaste?.previousFY?.safelyDisposed],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question={
                  (BRSR_QUESTIONS as any)?.sectionC?.principle2?.leadership?.q5 ||
                  "Reclaimed products and their packaging materials (as percentage of products sold) for each product category."
                }
              >
                <TextBlock text={p2?.leadership?.q5_reclaimedPercentage} />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 3 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={3}
            title="Businesses should respect and promote the well-being of all employees, including those in their value chains."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num="1a"
                question={
                  BRSR_QUESTIONS?.sectionC?.principle3?.essential?.q1a ||
                  "Details of measures for the well-being of employees:"
                }
              >
                <DataTable
                  headers={[
                    "Category",
                    "Total (A)",
                    "Health insurance - No. (B)",
                    "Health insurance - %(B/A)",
                    "Accident insurance - No. (C)",
                    "Accident insurance - %(C/A)",
                    "Maternity benefits - No. (D)",
                    "Maternity benefits - %(D/A)",
                    "Paternity Benefits - No. (E)",
                    "Paternity Benefits - %(E/A)",
                    "Day Care facilities - No. (F)",
                    "Day Care facilities - %(F/A)"
                  ]}
                  rows={[
                    ["Permanent employees - Male", p3?.essential?.q1a_employeeWellbeing?.permanentMale?.total, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.healthInsurance?.no, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.healthInsurance?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.accidentInsurance?.no, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.accidentInsurance?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.maternityBenefits?.no, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.maternityBenefits?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.paternityBenefits?.no, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.paternityBenefits?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.dayCare?.no, p3?.essential?.q1a_employeeWellbeing?.permanentMale?.dayCare?.percent],
                    ["Permanent employees - Female", p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.total, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.healthInsurance?.no, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.healthInsurance?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.accidentInsurance?.no, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.accidentInsurance?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.maternityBenefits?.no, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.maternityBenefits?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.paternityBenefits?.no, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.paternityBenefits?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.dayCare?.no, p3?.essential?.q1a_employeeWellbeing?.permanentFemale?.dayCare?.percent],
                    ["Permanent employees - Total", p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.total, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.healthInsurance?.no, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.healthInsurance?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.accidentInsurance?.no, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.accidentInsurance?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.maternityBenefits?.no, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.maternityBenefits?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.paternityBenefits?.no, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.paternityBenefits?.percent, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.dayCare?.no, p3?.essential?.q1a_employeeWellbeing?.permanentTotal?.dayCare?.percent],
                    ["Other than Permanent employees - Male", p3?.essential?.q1a_employeeWellbeing?.otherMale, "", "", "", "", "", "", "", "", "", ""],
                    ["Other than Permanent employees - Female", p3?.essential?.q1a_employeeWellbeing?.otherFemale, "", "", "", "", "", "", "", "", "", ""],
                    ["Other than Permanent employees - Total", p3?.essential?.q1a_employeeWellbeing?.otherTotal, "", "", "", "", "", "", "", "", "", ""],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock num="1b" question="Details of measures for the well-being of workers:">
                <DataTable
                  headers={[
                    "Category",
                    "Total (A)",
                    "Health insurance - No. (B)",
                    "Health insurance - %(B/A)",
                    "Accident insurance - No. (C)",
                    "Accident insurance - %(C/A)",
                    "Maternity benefits - No. (D)",
                    "Maternity benefits - %(D/A)",
                    "Paternity Benefits - No. (E)",
                    "Paternity Benefits - %(E/A)",
                    "Day Care facilities - No. (F)",
                    "Day Care facilities - %(F/A)"
                  ]}
                  rows={[
                    ["Permanent Workers - Male", p3?.essential?.q1b_workerWellbeing?.permanentMale?.total, p3?.essential?.q1b_workerWellbeing?.permanentMale?.healthInsurance?.no, p3?.essential?.q1b_workerWellbeing?.permanentMale?.healthInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.permanentMale?.accidentInsurance?.no, p3?.essential?.q1b_workerWellbeing?.permanentMale?.accidentInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.permanentMale?.maternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.permanentMale?.maternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.permanentMale?.paternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.permanentMale?.paternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.permanentMale?.dayCare?.no, p3?.essential?.q1b_workerWellbeing?.permanentMale?.dayCare?.percent],
                    ["Permanent Workers - Female", p3?.essential?.q1b_workerWellbeing?.permanentFemale?.total, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.healthInsurance?.no, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.healthInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.accidentInsurance?.no, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.accidentInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.maternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.maternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.paternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.paternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.dayCare?.no, p3?.essential?.q1b_workerWellbeing?.permanentFemale?.dayCare?.percent],
                    ["Permanent Workers - Total", p3?.essential?.q1b_workerWellbeing?.permanentTotal?.total, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.healthInsurance?.no, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.healthInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.accidentInsurance?.no, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.accidentInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.maternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.maternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.paternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.paternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.dayCare?.no, p3?.essential?.q1b_workerWellbeing?.permanentTotal?.dayCare?.percent],
                    ["Other than Permanent Workers - Male", p3?.essential?.q1b_workerWellbeing?.otherMale?.total, p3?.essential?.q1b_workerWellbeing?.otherMale?.healthInsurance?.no, p3?.essential?.q1b_workerWellbeing?.otherMale?.healthInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.otherMale?.accidentInsurance?.no, p3?.essential?.q1b_workerWellbeing?.otherMale?.accidentInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.otherMale?.maternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.otherMale?.maternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.otherMale?.paternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.otherMale?.paternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.otherMale?.dayCare?.no, p3?.essential?.q1b_workerWellbeing?.otherMale?.dayCare?.percent],
                    ["Other than Permanent Workers - Female", p3?.essential?.q1b_workerWellbeing?.otherFemale?.total, p3?.essential?.q1b_workerWellbeing?.otherFemale?.healthInsurance?.no, p3?.essential?.q1b_workerWellbeing?.otherFemale?.healthInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.otherFemale?.accidentInsurance?.no, p3?.essential?.q1b_workerWellbeing?.otherFemale?.accidentInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.otherFemale?.maternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.otherFemale?.maternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.otherFemale?.paternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.otherFemale?.paternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.otherFemale?.dayCare?.no, p3?.essential?.q1b_workerWellbeing?.otherFemale?.dayCare?.percent],
                    ["Other than Permanent Workers - Total", p3?.essential?.q1b_workerWellbeing?.otherTotal?.total, p3?.essential?.q1b_workerWellbeing?.otherTotal?.healthInsurance?.no, p3?.essential?.q1b_workerWellbeing?.otherTotal?.healthInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.otherTotal?.accidentInsurance?.no, p3?.essential?.q1b_workerWellbeing?.otherTotal?.accidentInsurance?.percent, p3?.essential?.q1b_workerWellbeing?.otherTotal?.maternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.otherTotal?.maternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.otherTotal?.paternityBenefits?.no, p3?.essential?.q1b_workerWellbeing?.otherTotal?.paternityBenefits?.percent, p3?.essential?.q1b_workerWellbeing?.otherTotal?.dayCare?.no, p3?.essential?.q1b_workerWellbeing?.otherTotal?.dayCare?.percent],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock 
                num="1c"
                question="Spending on measures towards well-being of employees and workers (including permanent and other than permanent) in the following format"
              >
                <DataTable
                  headers={["", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Cost incurred on well-being measures as a % of total revenue of the company", p3?.essential?.q1c_spendingOnWellbeing?.currentFY, p3?.essential?.q1c_spendingOnWellbeing?.previousFY]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock num={2} question="Details of retirement benefits, for Current FY and Previous Financial Year.">
                <DataTable
                  headers={[
                    "Benefits",
                    "FY 2023-24 - No. of employees covered as a % of total employees",
                    "FY 2023-24 - No. of workers covered as a% of total workers",
                    "FY 2023-24 - Deducted and deposited with the authority (Y/N/N.A.)",
                    "FY 2022-23 - No. of employees covered as a % of total employees",
                    "FY 2022-23 - No. of workers covered as a % of total workers",
                    "FY 2022-23 - Deducted and deposited with the authority (Y/N/N.A.)"
                  ]}
                  rows={[
                    ["PF", p3?.essential?.q2_retirementBenefits?.pf?.currentFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.pf?.currentFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.pf?.currentFY?.deductedDeposited, p3?.essential?.q2_retirementBenefits?.pf?.previousFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.pf?.previousFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.pf?.previousFY?.deductedDeposited],
                    ["Gratuity", p3?.essential?.q2_retirementBenefits?.gratuity?.currentFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.gratuity?.currentFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.gratuity?.currentFY?.deductedDeposited, p3?.essential?.q2_retirementBenefits?.gratuity?.previousFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.gratuity?.previousFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.gratuity?.previousFY?.deductedDeposited],
                    ["ESI", p3?.essential?.q2_retirementBenefits?.esi?.currentFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.esi?.currentFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.esi?.currentFY?.deductedDeposited, p3?.essential?.q2_retirementBenefits?.esi?.previousFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.esi?.previousFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.esi?.previousFY?.deductedDeposited],
                    ["NPS", p3?.essential?.q2_retirementBenefits?.nps?.currentFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.nps?.currentFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.nps?.currentFY?.deductedDeposited, p3?.essential?.q2_retirementBenefits?.nps?.previousFY?.employeesPercent, p3?.essential?.q2_retirementBenefits?.nps?.previousFY?.workersPercent, p3?.essential?.q2_retirementBenefits?.nps?.previousFY?.deductedDeposited],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock num={3} question="Accessibility of workplaces">
                <TextBlock text={p3?.essential?.q3_accessibilityOfWorkplaces} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy."
              >
                <TextBlock text={p3?.essential?.q4_equalOpportunityPolicy?.details} />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Return to work and Retention rates of permanent employees and workers that took parental leave."
              >
                <DataTable
                  headers={["Gender", "Permanent employees - Return to work rate", "Permanent employees - Retention rate", "Permanent workers - Return to work rate", "Permanent workers - Retention rate"]}
                  rows={[
                    ["Male", p3?.essential?.q5_parentalLeaveRates?.permanentEmployees?.male?.returnToWorkRate, p3?.essential?.q5_parentalLeaveRates?.permanentEmployees?.male?.retentionRate, p3?.essential?.q5_parentalLeaveRates?.permanentWorkers?.male?.returnToWorkRate, p3?.essential?.q5_parentalLeaveRates?.permanentWorkers?.male?.retentionRate],
                    ["Female", p3?.essential?.q5_parentalLeaveRates?.permanentEmployees?.female?.returnToWorkRate, p3?.essential?.q5_parentalLeaveRates?.permanentEmployees?.female?.retentionRate, p3?.essential?.q5_parentalLeaveRates?.permanentWorkers?.female?.returnToWorkRate, p3?.essential?.q5_parentalLeaveRates?.permanentWorkers?.female?.retentionRate],
                    ["Total", p3?.essential?.q5_parentalLeaveRates?.permanentEmployees?.total?.returnToWorkRate, p3?.essential?.q5_parentalLeaveRates?.permanentEmployees?.total?.retentionRate, p3?.essential?.q5_parentalLeaveRates?.permanentWorkers?.total?.returnToWorkRate, p3?.essential?.q5_parentalLeaveRates?.permanentWorkers?.total?.retentionRate],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Is there a mechanism available to receive and redress grievances for the following categories of employees and worker? If yes, give details of the mechanism in brief."
              >
                <DataTable
                  headers={["", "Yes/No (If yes, then give details of the mechanism in brief)"]}
                  rows={[
                    ["Permanent Workers", p3?.essential?.q6_grievanceMechanism?.permanentWorkers],
                    ["Other than Permanent Workers", p3?.essential?.q6_grievanceMechanism?.otherThanPermanentWorkers],
                    ["Permanent Employees", p3?.essential?.q6_grievanceMechanism?.permanentEmployees],
                    ["Other than Permanent Employees", p3?.essential?.q6_grievanceMechanism?.otherThanPermanentEmployees],
                  ]}
                  compact
                />
                <TextBlock text={p3?.essential?.q6_grievanceMechanism?.details} />
              </QuestionBlock>

              <QuestionBlock
                num={7}
                question="Membership of employees and worker in association(s) or Unions recognized by the listed entity:"
              >
                <DataTable
                  headers={["Category", "FY 2023-24 - Total employees / workers in respective category (A)", "FY 2023-24 - No. of employees / workers in respective category, who are part of association(s) or Union (B)", "FY 2023-24 - % (B / A)", "FY 2022-23 - Total employees / workers in respective category (C)", "FY 2022-23 - No. of employees/ workers in respective category, who are part of association(s) or Union (D)", "FY 2022-23 - % (D /C)"]}
                  rows={[
                    ["Total Permanent Employees", p3?.essential?.q7_membershipUnions?.permanentEmployees?.currentFY?.totalEmployees, p3?.essential?.q7_membershipUnions?.permanentEmployees?.currentFY?.membersInUnions, p3?.essential?.q7_membershipUnions?.permanentEmployees?.currentFY?.percentage, p3?.essential?.q7_membershipUnions?.permanentEmployees?.previousFY?.totalEmployees, p3?.essential?.q7_membershipUnions?.permanentEmployees?.previousFY?.membersInUnions, p3?.essential?.q7_membershipUnions?.permanentEmployees?.previousFY?.percentage],
                    ["- Male", "---", "---", "---", "---", "---", "---"],
                    ["- Female", "---", "---", "---", "---", "---", "---"],
                    ["Total Permanent Workers", p3?.essential?.q7_membershipUnions?.permanentWorkers?.currentFY?.totalWorkers, p3?.essential?.q7_membershipUnions?.permanentWorkers?.currentFY?.membersInUnions, p3?.essential?.q7_membershipUnions?.permanentWorkers?.currentFY?.percentage, p3?.essential?.q7_membershipUnions?.permanentWorkers?.previousFY?.totalWorkers, p3?.essential?.q7_membershipUnions?.permanentWorkers?.previousFY?.membersInUnions, p3?.essential?.q7_membershipUnions?.permanentWorkers?.previousFY?.percentage],
                    ["- Male", "---", "---", "---", "---", "---", "---"],
                    ["- Female", "---", "---", "---", "---", "---", "---"],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={8}
                question="Details of training given to employees and workers:"
              >
                <p className="text-sm font-medium mb-2">Employees:</p>
                <DataTable
                  headers={["Category", "FY 2023-24 - Total (A)", "FY 2023-24 - On Health And safety measures - No. (B)", "FY 2023-24 - On Health And safety measures - %(B/A)", "FY 2023-24 - On skill upgradation - No. (C)", "FY 2023-24 - On skill upgradation - %(C/A)", "FY 2022-23 - Total (D)", "FY 2022-23 - On Health and safety measures - No. (E)", "FY 2022-23 - On Health and safety measures - %(E/D)", "FY 2022-23 - On Skill upgradation - No. (F)", "FY 2022-23 - On Skill upgradation - %(F/D)"]}
                  rows={[
                    ["Male", p3?.essential?.q8_trainingDetails?.employees?.currentFY?.male?.total, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.male?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.male?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.male?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.male?.skillUpgradation?.percent, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.male?.total, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.male?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.male?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.male?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.male?.skillUpgradation?.percent],
                    ["Female", p3?.essential?.q8_trainingDetails?.employees?.currentFY?.female?.total, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.female?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.female?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.female?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.female?.skillUpgradation?.percent, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.female?.total, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.female?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.female?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.female?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.female?.skillUpgradation?.percent],
                    ["Total", p3?.essential?.q8_trainingDetails?.employees?.currentFY?.total?.total, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.total?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.total?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.total?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.employees?.currentFY?.total?.skillUpgradation?.percent, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.total?.total, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.total?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.total?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.total?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.employees?.previousFY?.total?.skillUpgradation?.percent],
                  ]}
                  compact
                />
                <p className="text-sm font-medium mb-2 mt-4">Workers:</p>
                <DataTable
                  headers={["Category", "FY 2023-24 - Total (A)", "FY 2023-24 - On Health And safety measures - No. (B)", "FY 2023-24 - On Health And safety measures - %(B/A)", "FY 2023-24 - On skill upgradation - No. (C)", "FY 2023-24 - On skill upgradation - %(C/A)", "FY 2022-23 - Total (D)", "FY 2022-23 - On Health and safety measures - No. (E)", "FY 2022-23 - On Health and safety measures - %(E/D)", "FY 2022-23 - On Skill upgradation - No. (F)", "FY 2022-23 - On Skill upgradation - %(F/D)"]}
                  rows={[
                    ["Male", p3?.essential?.q8_trainingDetails?.workers?.currentFY?.male?.total, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.male?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.male?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.male?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.male?.skillUpgradation?.percent, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.male?.total, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.male?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.male?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.male?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.male?.skillUpgradation?.percent],
                    ["Female", p3?.essential?.q8_trainingDetails?.workers?.currentFY?.female?.total, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.female?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.female?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.female?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.female?.skillUpgradation?.percent, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.female?.total, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.female?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.female?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.female?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.female?.skillUpgradation?.percent],
                    ["Total", p3?.essential?.q8_trainingDetails?.workers?.currentFY?.total?.total, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.total?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.total?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.total?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.workers?.currentFY?.total?.skillUpgradation?.percent, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.total?.total, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.total?.healthSafety?.no, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.total?.healthSafety?.percent, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.total?.skillUpgradation?.no, p3?.essential?.q8_trainingDetails?.workers?.previousFY?.total?.skillUpgradation?.percent],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={9}
                question="Details of performance and career development reviews of employees and worker:"
              >
                <p className="text-sm font-medium mb-2">Employees:</p>
                <DataTable
                  headers={["Category", "FY 2023-24 - Total (A)", "FY 2023-24 - No. (B)", "FY 2023-24 - % (B / A)", "FY 2022-23 - Total (C)", "FY 2022-23 - No. (D)", "FY 2022-23 - % (D / C)"]}
                  rows={[
                    ["Male", p3?.essential?.q9_performanceReviews?.employees?.currentFY?.male?.total, p3?.essential?.q9_performanceReviews?.employees?.currentFY?.male?.reviewed, p3?.essential?.q9_performanceReviews?.employees?.currentFY?.male?.percentage, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.male?.total, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.male?.reviewed, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.male?.percentage],
                    ["Female", p3?.essential?.q9_performanceReviews?.employees?.currentFY?.female?.total, p3?.essential?.q9_performanceReviews?.employees?.currentFY?.female?.reviewed, p3?.essential?.q9_performanceReviews?.employees?.currentFY?.female?.percentage, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.female?.total, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.female?.reviewed, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.female?.percentage],
                    ["Total", p3?.essential?.q9_performanceReviews?.employees?.currentFY?.total?.total, p3?.essential?.q9_performanceReviews?.employees?.currentFY?.total?.reviewed, p3?.essential?.q9_performanceReviews?.employees?.currentFY?.total?.percentage, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.total?.total, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.total?.reviewed, p3?.essential?.q9_performanceReviews?.employees?.previousFY?.total?.percentage],
                  ]}
                  compact
                />
                <p className="text-sm font-medium mb-2 mt-4">Workers:</p>
                <DataTable
                  headers={["Category", "FY 2023-24 - Total (A)", "FY 2023-24 - No. (B)", "FY 2023-24 - % (B / A)", "FY 2022-23 - Total (C)", "FY 2022-23 - No. (D)", "FY 2022-23 - % (D / C)"]}
                  rows={[
                    ["Male", p3?.essential?.q9_performanceReviews?.workers?.currentFY?.male?.total, p3?.essential?.q9_performanceReviews?.workers?.currentFY?.male?.reviewed, p3?.essential?.q9_performanceReviews?.workers?.currentFY?.male?.percentage, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.male?.total, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.male?.reviewed, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.male?.percentage],
                    ["Female", p3?.essential?.q9_performanceReviews?.workers?.currentFY?.female?.total, p3?.essential?.q9_performanceReviews?.workers?.currentFY?.female?.reviewed, p3?.essential?.q9_performanceReviews?.workers?.currentFY?.female?.percentage, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.female?.total, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.female?.reviewed, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.female?.percentage],
                    ["Total", p3?.essential?.q9_performanceReviews?.workers?.currentFY?.total?.total, p3?.essential?.q9_performanceReviews?.workers?.currentFY?.total?.reviewed, p3?.essential?.q9_performanceReviews?.workers?.currentFY?.total?.percentage, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.total?.total, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.total?.reviewed, p3?.essential?.q9_performanceReviews?.workers?.previousFY?.total?.percentage],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={10}
                question="Health and safety management system:"
              >
                <p className="text-sm font-medium mb-2">a. Whether an occupational health and safety management system has been implemented by the entity? (Yes/ No). If yes, the coverage such system?</p>
                <TextBlock text={p3?.essential?.q10_healthSafetyManagement?.a} />
                
                <p className="text-sm font-medium mb-2 mt-4">b. What are the processes used to identify work-related hazards and assess risks on a routine and non-routine basis by the entity?</p>
                <TextBlock text={p3?.essential?.q10_healthSafetyManagement?.b} />
                
                <p className="text-sm font-medium mb-2 mt-4">c. Whether you have processes for workers to report the work related hazards and to remove themselves from such risks. (Y/N)</p>
                <TextBlock text={p3?.essential?.q10_healthSafetyManagement?.c} />
                
                <p className="text-sm font-medium mb-2 mt-4">d. Do the employees/ worker of the entity have access to non-occupational medical and healthcare services? (Yes/ No)</p>
                <TextBlock text={p3?.essential?.q10_healthSafetyManagement?.d} />
              </QuestionBlock>

              <QuestionBlock
                num={11}
                question={BRSR_QUESTIONS?.sectionC?.principle3?.essential?.q11 || "Details of safety related incidents, in the following format:"}
              >
                <DataTable
                  headers={["Safety Incident/Number", "Category", "FY 2023-24 Current Financial Year", "FY 2022-23 Previous Financial Year"]}
                  rows={[
                    ["Lost Time Injury Frequency Rate (LTIFR) (per one million-person hours worked)", "Employees", p3?.essential?.q11_safetyIncidents?.ltifr?.employees?.currentYear, p3?.essential?.q11_safetyIncidents?.ltifr?.employees?.previousYear],
                    ["", "Workers", p3?.essential?.q11_safetyIncidents?.ltifr?.workers?.currentYear, p3?.essential?.q11_safetyIncidents?.ltifr?.workers?.previousYear],
                    ["Total recordable work-related injuries", "Employees", p3?.essential?.q11_safetyIncidents?.totalRecordableInjuries?.employees?.currentYear, p3?.essential?.q11_safetyIncidents?.totalRecordableInjuries?.employees?.previousYear],
                    ["", "Workers", p3?.essential?.q11_safetyIncidents?.totalRecordableInjuries?.workers?.currentYear, p3?.essential?.q11_safetyIncidents?.totalRecordableInjuries?.workers?.previousYear],
                    ["No. of fatalities", "Employees", p3?.essential?.q11_safetyIncidents?.fatalities?.employees?.currentYear, p3?.essential?.q11_safetyIncidents?.fatalities?.employees?.previousYear],
                    ["", "Workers", p3?.essential?.q11_safetyIncidents?.fatalities?.workers?.currentYear, p3?.essential?.q11_safetyIncidents?.fatalities?.workers?.previousYear],
                    ["High consequence work-related injury or ill-health (excluding fatalities)", "Employees", p3?.essential?.q11_safetyIncidents?.highConsequenceInjuries?.employees?.currentYear, p3?.essential?.q11_safetyIncidents?.highConsequenceInjuries?.employees?.previousYear],
                    ["", "Workers", p3?.essential?.q11_safetyIncidents?.highConsequenceInjuries?.workers?.currentYear, p3?.essential?.q11_safetyIncidents?.highConsequenceInjuries?.workers?.previousYear],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={12}
                question="Describe the measures taken by the entity to ensure a safe and healthy work place."
              >
                <TextBlock text={p3?.essential?.q12_safetyMeasures} />
              </QuestionBlock>

              <QuestionBlock
                num={13}
                question="Number of Complaints on the following made by employees and workers:"
              >
                <DataTable
                  headers={["", "FY 2023-24 - Filed during the year", "FY 2023-24 - Pending resolution at the end of year", "FY 2023-24 - Remarks", "FY 2022-23 - Filed during the year", "FY 2022-23 - Pending resolution at the end of year", "FY 2022-23 - Remarks"]}
                  rows={[
                    ["Working Conditions", p3?.essential?.q13_complaintsWorkingConditions?.workingConditions?.currentFY?.filed, p3?.essential?.q13_complaintsWorkingConditions?.workingConditions?.currentFY?.pendingResolution, p3?.essential?.q13_complaintsWorkingConditions?.workingConditions?.currentFY?.remarks, p3?.essential?.q13_complaintsWorkingConditions?.workingConditions?.previousFY?.filed, p3?.essential?.q13_complaintsWorkingConditions?.workingConditions?.previousFY?.pendingResolution, p3?.essential?.q13_complaintsWorkingConditions?.workingConditions?.previousFY?.remarks],
                    ["Health & Safety", p3?.essential?.q13_complaintsWorkingConditions?.healthSafety?.currentFY?.filed, p3?.essential?.q13_complaintsWorkingConditions?.healthSafety?.currentFY?.pendingResolution, p3?.essential?.q13_complaintsWorkingConditions?.healthSafety?.currentFY?.remarks, p3?.essential?.q13_complaintsWorkingConditions?.healthSafety?.previousFY?.filed, p3?.essential?.q13_complaintsWorkingConditions?.healthSafety?.previousFY?.pendingResolution, p3?.essential?.q13_complaintsWorkingConditions?.healthSafety?.previousFY?.remarks],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={14}
                question="Assessments for the year:"
              >
                <DataTable
                  headers={["", "% of your plants and offices that were assessed (by entity or statutory authorities or third parties)"]}
                  rows={[
                    ["Health and safety practices", p3?.essential?.q14_assessments?.healthSafetyPractices],
                    ["Working Conditions", p3?.essential?.q14_assessments?.workingConditions],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={15}
                question="Provide details of any corrective action taken or underway to address safety-related incidents (if any) and on significant risks / concerns arising from assessments of health & safety practices and working conditions."
              >
                <TextBlock text={p3?.essential?.q15_correctiveActions} />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Does the entity extend any life insurance or any compensatory package in the event of death of (A) Employees (Y/N) (B) Workers (Y/N)."
              >
                <TextBlock text={p3?.leadership?.q1_lifeInsurance} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Provide the measures undertaken by the entity to ensure that statutory dues have been deducted and deposited by the value chain partners."
              >
                <TextBlock text={p3?.leadership?.q2_statutoryDuesValueChain} />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Provide the number of employees / workers having suffered high consequence work-related injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above), who have been are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment:"
              >
                <DataTable
                  headers={["", "Total no. of affected employees/ workers - FY 2023-24", "Total no. of affected employees/ workers - FY 2022-23", "No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment - FY 2023-24", "No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment - FY 2022-23"]}
                  rows={[
                    ["Employees", p3?.leadership?.q3_rehabilitation?.employees?.currentFY?.totalAffected, p3?.leadership?.q3_rehabilitation?.employees?.previousFY?.totalAffected, p3?.leadership?.q3_rehabilitation?.employees?.currentFY?.rehabilitated, p3?.leadership?.q3_rehabilitation?.employees?.previousFY?.rehabilitated],
                    ["Workers", p3?.leadership?.q3_rehabilitation?.workers?.currentFY?.totalAffected, p3?.leadership?.q3_rehabilitation?.workers?.previousFY?.totalAffected, p3?.leadership?.q3_rehabilitation?.workers?.currentFY?.rehabilitated, p3?.leadership?.q3_rehabilitation?.workers?.previousFY?.rehabilitated],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Does the entity provide transition assistance programs to facilitate continued employability and the management of career endings resulting from retirement or termination of employment? (Yes/ No)"
              >
                <TextBlock text={p3?.leadership?.q4_transitionAssistance} />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Details on assessment of value chain partners:"
              >
                <DataTable
                  headers={["", "% of value chain partners (by value of business done with such partners) that were assessed"]}
                  rows={[
                    ["Health and safety practices", p3?.leadership?.q5_valueChainAssessment?.healthSafetyPractices],
                    ["Working Conditions", p3?.leadership?.q5_valueChainAssessment?.workingConditions],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Provide details of any corrective actions taken or underway to address significant risks / concerns arising from assessments of health and safety practices and working conditions of value chain partners."
              >
                <TextBlock text={p3?.leadership?.q6_correctiveActionsValueChain} />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 4 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={4}
            title="Businesses should respect the interests of and be responsive to all its stakeholders."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question="Describe the processes for identifying key stakeholder groups of the entity."
              >
                <TextBlock text={p4?.essential?.q1_stakeholderIdentification} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group."
              >
                <DataTable
                  headers={[
                    "Stakeholder Group", 
                    "Whether identified as Vulnerable & Marginalized Group (Yes/No)", 
                    "Channels of communication (Email, SMS, Newspaper, Pamphlets, Advertisement, Community Meetings, Notice Board, Website), Other", 
                    "Frequency of engagement (Annually/ Half yearly/ Quarterly / others – please specify)", 
                    "Purpose and scope of engagement including key topics and concerns raised during such engagement"
                  ]}
                  rows={(p4?.essential?.q2_stakeholderEngagement || []).map((s: any) => [
                    s?.stakeholderGroup,
                    s?.vulnerableMarginalized,
                    s?.channels,
                    s?.frequency,
                    s?.purpose,
                  ])}
                  compact
                />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Provide the processes for consultation between stakeholders and the Board on economic, environmental and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board."
              >
                <TextBlock text={p4?.leadership?.q1_boardConsultation} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Whether stakeholder consultation is used to support the identification and management of environmental and social topics (Yes / No). If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity."
              >
                <TextBlock text={p4?.leadership?.q2_stakeholderConsultationUsed} />
                
                {p4?.leadership?.q2_details && (
                  <>
                    <p className="text-sm font-medium mb-2 mt-4">a. Environmental Policy Development:</p>
                    <TextBlock text={p4?.leadership?.q2_details?.a} />
                    
                    <p className="text-sm font-medium mb-2 mt-4">b. Social Impact Assessment:</p>
                    <TextBlock text={p4?.leadership?.q2_details?.b} />
                    
                    <p className="text-sm font-medium mb-2 mt-4">c. Supply Chain Management:</p>
                    <TextBlock text={p4?.leadership?.q2_details?.c} />
                  </>
                )}
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups."
              >
                <DataTable
                  headers={["Vulnerable Group", "Concerns", "Action Taken"]}
                  rows={(p4?.leadership?.q3_vulnerableEngagement || []).map((v: any) => [
                    v?.vulnerableGroup,
                    v?.concerns,
                    v?.actionTaken,
                  ])}
                  compact
                />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 5 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader num={5} title="Businesses should respect and promote human rights." />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question="Employees and workers who have been provided training on human rights issues and policy(ies) of the entity, in the following format:"
              >
                <DataTable
                  headers={[
                    "Category", 
                    "FY 2022-23 (Current Financial Year) - Total (A)", 
                    "FY 2022-23 - No. of employees / workers covered or Union (B)", 
                    "FY 2022-23 - % (B / A)",
                    "FY 2021-22 (Previous Financial Year) - Total (C)",
                    "FY 2021-22 - No. of employees/ workers covered (D)",
                    "FY 2021-22 - % (D / C)"
                  ]}
                  rows={[
                    ["Employees - Permanent", p5?.essential?.q1_humanRightsTraining?.employees?.permanent?.total, p5?.essential?.q1_humanRightsTraining?.employees?.permanent?.covered, p5?.essential?.q1_humanRightsTraining?.employees?.permanent?.percentage, "-", "-", "-"],
                    ["Employees - Other than permanent", p5?.essential?.q1_humanRightsTraining?.employees?.otherThanPermanent?.total, p5?.essential?.q1_humanRightsTraining?.employees?.otherThanPermanent?.covered, p5?.essential?.q1_humanRightsTraining?.employees?.otherThanPermanent?.percentage, "-", "-", "-"],
                    ["Total Employees", p5?.essential?.q1_humanRightsTraining?.employees?.totalEmployees?.total, p5?.essential?.q1_humanRightsTraining?.employees?.totalEmployees?.covered, p5?.essential?.q1_humanRightsTraining?.employees?.totalEmployees?.percentage, "-", "-", "-"],
                    ["Workers - Permanent", p5?.essential?.q1_humanRightsTraining?.workers?.permanent?.total, p5?.essential?.q1_humanRightsTraining?.workers?.permanent?.covered, p5?.essential?.q1_humanRightsTraining?.workers?.permanent?.percentage, "-", "-", "-"],
                    ["Workers - Other than permanent", p5?.essential?.q1_humanRightsTraining?.workers?.otherThanPermanent?.total, p5?.essential?.q1_humanRightsTraining?.workers?.otherThanPermanent?.covered, p5?.essential?.q1_humanRightsTraining?.workers?.otherThanPermanent?.percentage, "-", "-", "-"],
                    ["Total Workers", p5?.essential?.q1_humanRightsTraining?.workers?.totalWorkers?.total, p5?.essential?.q1_humanRightsTraining?.workers?.totalWorkers?.covered, p5?.essential?.q1_humanRightsTraining?.workers?.totalWorkers?.percentage, "-", "-", "-"],
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Details of minimum wages paid to employees and workers, in the following format:"
              >
                <p className="text-sm font-medium mb-2">Employees - Permanent:</p>
                <DataTable
                  headers={[
                    "Category",
                    "FY 2023-24 - Total (A)",
                    "FY 2023-24 - Equal to Minimum Wage - No. (B)",
                    "FY 2023-24 - Equal to Minimum Wage - %(B/A)",
                    "FY 2023-24 - More than Minimum Wage - No. (C)",
                    "FY 2023-24 - More than Minimum Wage - %(C/A)",
                    "FY 2022-23 - Total (D)",
                    "FY 2022-23 - Equal to Minimum Wage - No. (E)",
                    "FY 2022-23 - Equal to Minimum Wage - %(E/D)",
                    "FY 2022-23 - More than Minimum Wage - No. (F)",
                    "FY 2022-23 - More than Minimum Wage - %(F/D)"
                  ]}
                  rows={[
                    ["Male", p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.currentFY?.total, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.previousFY?.total, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.male?.previousFY?.moreThanMinWage?.percent],
                    ["Female", p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.currentFY?.total, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.previousFY?.total, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.permanent?.female?.previousFY?.moreThanMinWage?.percent]
                  ]}
                  compact
                />

                <p className="text-sm font-medium mb-2 mt-4">Employees - Other than Permanent:</p>
                <DataTable
                  headers={[
                    "Category",
                    "FY 2023-24 - Total (A)",
                    "FY 2023-24 - Equal to Min Wage - No. (B)",
                    "FY 2023-24 - %(B/A)",
                    "FY 2023-24 - More than Min Wage - No. (C)",
                    "FY 2023-24 - %(C/A)",
                    "FY 2022-23 - Total (D)",
                    "FY 2022-23 - Equal to Min Wage - No. (E)",
                    "FY 2022-23 - %(E/D)",
                    "FY 2022-23 - More than Min Wage - No. (F)",
                    "FY 2022-23 - %(F/D)"
                  ]}
                  rows={[
                    ["Male", p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.currentFY?.total, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.previousFY?.total, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.percent],
                    ["Female", p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.currentFY?.total, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.previousFY?.total, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.employees?.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.percent]
                  ]}
                  compact
                />

                <p className="text-sm font-medium mb-2 mt-4">Workers - Permanent:</p>
                <DataTable
                  headers={[
                    "Category",
                    "FY 2023-24 - Total (A)",
                    "FY 2023-24 - Equal to Min Wage - No. (B)",
                    "FY 2023-24 - %(B/A)",
                    "FY 2023-24 - More than Min Wage - No. (C)",
                    "FY 2023-24 - %(C/A)",
                    "FY 2022-23 - Total (D)",
                    "FY 2022-23 - Equal to Min Wage - No. (E)",
                    "FY 2022-23 - %(E/D)",
                    "FY 2022-23 - More than Min Wage - No. (F)",
                    "FY 2022-23 - %(F/D)"
                  ]}
                  rows={[
                    ["Male", p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.currentFY?.total, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.previousFY?.total, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.male?.previousFY?.moreThanMinWage?.percent],
                    ["Female", p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.currentFY?.total, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.previousFY?.total, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.permanent?.female?.previousFY?.moreThanMinWage?.percent]
                  ]}
                  compact
                />

                <p className="text-sm font-medium mb-2 mt-4">Workers - Other than Permanent:</p>
                <DataTable
                  headers={[
                    "Category",
                    "FY 2023-24 - Total (A)",
                    "FY 2023-24 - Equal to Min Wage - No. (B)",
                    "FY 2023-24 - %(B/A)",
                    "FY 2023-24 - More than Min Wage - No. (C)",
                    "FY 2023-24 - %(C/A)",
                    "FY 2022-23 - Total (D)",
                    "FY 2022-23 - Equal to Min Wage - No. (E)",
                    "FY 2022-23 - %(E/D)",
                    "FY 2022-23 - More than Min Wage - No. (F)",
                    "FY 2022-23 - %(F/D)"
                  ]}
                  rows={[
                    ["Male", p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.currentFY?.total, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.previousFY?.total, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.male?.previousFY?.moreThanMinWage?.percent],
                    ["Female", p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.currentFY?.total, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.currentFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.currentFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.currentFY?.moreThanMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.previousFY?.total, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.previousFY?.equalToMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.previousFY?.equalToMinWage?.percent, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.no, p5?.essential?.q2_minimumWages?.workers?.otherThanPermanent?.female?.previousFY?.moreThanMinWage?.percent]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Details of remuneration/salary/wages Median remuneration / wages:"
              >
                <DataTable
                  headers={["", "Male - Number", "Male - Median remuneration/ salary/ wages of respective category", "Female - Number", "Female - Median remuneration/ salary/ wages of respective category"]}
                  rows={[
                    ["Board of Directors (BoD)", p5?.essential?.q3_medianRemuneration?.boardOfDirectors?.male?.number, p5?.essential?.q3_medianRemuneration?.boardOfDirectors?.male?.median, p5?.essential?.q3_medianRemuneration?.boardOfDirectors?.female?.number, p5?.essential?.q3_medianRemuneration?.boardOfDirectors?.female?.median],
                    ["Key Managerial Personnel", p5?.essential?.q3_medianRemuneration?.keyManagerialPersonnel?.male?.number, p5?.essential?.q3_medianRemuneration?.keyManagerialPersonnel?.male?.median, p5?.essential?.q3_medianRemuneration?.keyManagerialPersonnel?.female?.number, p5?.essential?.q3_medianRemuneration?.keyManagerialPersonnel?.female?.median],
                    ["Employees other than BoD and KMP", p5?.essential?.q3_medianRemuneration?.employeesOtherThanBoDAndKMP?.male?.number, p5?.essential?.q3_medianRemuneration?.employeesOtherThanBoDAndKMP?.male?.median, p5?.essential?.q3_medianRemuneration?.employeesOtherThanBoDAndKMP?.female?.number, p5?.essential?.q3_medianRemuneration?.employeesOtherThanBoDAndKMP?.female?.median],
                    ["Workers", p5?.essential?.q3_medianRemuneration?.workers?.male?.number, p5?.essential?.q3_medianRemuneration?.workers?.male?.median, p5?.essential?.q3_medianRemuneration?.workers?.female?.number, p5?.essential?.q3_medianRemuneration?.workers?.female?.median]
                  ]}
                  compact
                />
                
                <p className="text-sm font-medium mb-2 mt-4">a. Gross wages paid to females as % of total wages paid by the entity, in the following format:</p>
                <DataTable
                  headers={["Particulars", "FY 2023-24 Current Financial Year", "FY 2022-23 Previous Financial Year"]}
                  rows={[
                    ["Gross wages paid to females as % of total wages", p5?.essential?.q3a_grossWagesFemales?.currentFY, p5?.essential?.q3a_grossWagesFemales?.previousFY]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Do you have a focal point (Individual/Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business? (Yes/No)"
              >
                <TextBlock text={p5?.essential?.q4_focalPointHumanRights} />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Describe the internal mechanisms in place to redress grievances related to human rights issues."
              >
                <TextBlock text={p5?.essential?.q5_grievanceMechanisms} />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Number of Complaints on the following made by employees and workers:"
              >
                <DataTable
                  headers={["Benefits", "FY 2023-24 - Filed during the year", "FY 2023-24 - Pending resolution at the end of year", "FY 2023-24 - Remarks", "FY 2022-23 - Filed during the year", "FY 2022-23 - Pending resolution at the end of year", "FY 2022-23 - Remarks"]}
                  rows={[
                    ["Sexual Harassment", p5?.essential?.q6_complaints?.sexualHarassment?.currentFY?.filed, p5?.essential?.q6_complaints?.sexualHarassment?.currentFY?.pending, p5?.essential?.q6_complaints?.sexualHarassment?.currentFY?.remarks, p5?.essential?.q6_complaints?.sexualHarassment?.previousFY?.filed, p5?.essential?.q6_complaints?.sexualHarassment?.previousFY?.pending, p5?.essential?.q6_complaints?.sexualHarassment?.previousFY?.remarks],
                    ["Discrimination at workplace", p5?.essential?.q6_complaints?.discriminationAtWorkplace?.currentFY?.filed, p5?.essential?.q6_complaints?.discriminationAtWorkplace?.currentFY?.pending, p5?.essential?.q6_complaints?.discriminationAtWorkplace?.currentFY?.remarks, p5?.essential?.q6_complaints?.discriminationAtWorkplace?.previousFY?.filed, p5?.essential?.q6_complaints?.discriminationAtWorkplace?.previousFY?.pending, p5?.essential?.q6_complaints?.discriminationAtWorkplace?.previousFY?.remarks],
                    ["Child Labour", p5?.essential?.q6_complaints?.childLabour?.currentFY?.filed, p5?.essential?.q6_complaints?.childLabour?.currentFY?.pending, p5?.essential?.q6_complaints?.childLabour?.currentFY?.remarks, p5?.essential?.q6_complaints?.childLabour?.previousFY?.filed, p5?.essential?.q6_complaints?.childLabour?.previousFY?.pending, p5?.essential?.q6_complaints?.childLabour?.previousFY?.remarks],
                    ["Forced Labour/Involuntary Labour", p5?.essential?.q6_complaints?.forcedLabour?.currentFY?.filed, p5?.essential?.q6_complaints?.forcedLabour?.currentFY?.pending, p5?.essential?.q6_complaints?.forcedLabour?.currentFY?.remarks, p5?.essential?.q6_complaints?.forcedLabour?.previousFY?.filed, p5?.essential?.q6_complaints?.forcedLabour?.previousFY?.pending, p5?.essential?.q6_complaints?.forcedLabour?.previousFY?.remarks],
                    ["Wages", p5?.essential?.q6_complaints?.wages?.currentFY?.filed, p5?.essential?.q6_complaints?.wages?.currentFY?.pending, p5?.essential?.q6_complaints?.wages?.currentFY?.remarks, p5?.essential?.q6_complaints?.wages?.previousFY?.filed, p5?.essential?.q6_complaints?.wages?.previousFY?.pending, p5?.essential?.q6_complaints?.wages?.previousFY?.remarks],
                    ["Other human rights related issues", p5?.essential?.q6_complaints?.otherHumanRights?.currentFY?.filed, p5?.essential?.q6_complaints?.otherHumanRights?.currentFY?.pending, p5?.essential?.q6_complaints?.otherHumanRights?.currentFY?.remarks, p5?.essential?.q6_complaints?.otherHumanRights?.previousFY?.filed, p5?.essential?.q6_complaints?.otherHumanRights?.previousFY?.pending, p5?.essential?.q6_complaints?.otherHumanRights?.previousFY?.remarks]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={7}
                question="Complaints filed under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, in the following format:"
              >
                <DataTable
                  headers={["Particulars", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal Act, 2013 (POSH)", p5?.essential?.q7_poshComplaints?.totalComplaints?.currentFY, p5?.essential?.q7_poshComplaints?.totalComplaints?.previousFY],
                    ["Complaints on POSH as a % of female employees / workers", p5?.essential?.q7_poshComplaints?.complaintsAsPercentFemale?.currentFY, p5?.essential?.q7_poshComplaints?.complaintsAsPercentFemale?.previousFY],
                    ["Complaints on POSH upheld", p5?.essential?.q7_poshComplaints?.complaintsUpheld?.currentFY, p5?.essential?.q7_poshComplaints?.complaintsUpheld?.previousFY]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={8}
                question="Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases."
              >
                <TextBlock text={p5?.essential?.q8_mechanismsPreventAdverseConsequences} />
              </QuestionBlock>

              <QuestionBlock
                num={9}
                question="Do human rights requirements form part of your business agreements and contracts? (Yes/No)"
              >
                <TextBlock text={p5?.essential?.q9_humanRightsInContracts} />
              </QuestionBlock>

              <QuestionBlock
                num={10}
                question="Assessments for the year:"
              >
                <DataTable
                  headers={["", "% of your plants and offices that were assessed (by entity or statutory authorities or third parties)"]}
                  rows={[
                    ["Child labour", p5?.essential?.q10_assessments?.childLabour],
                    ["Forced/involuntary labour", p5?.essential?.q10_assessments?.forcedInvoluntaryLabour],
                    ["Sexual harassment", p5?.essential?.q10_assessments?.sexualHarassment],
                    ["Discrimination at workplace", p5?.essential?.q10_assessments?.discriminationAtWorkplace],
                    ["Wages", p5?.essential?.q10_assessments?.wages],
                    ["Others – please specify", p5?.essential?.q10_assessments?.othersSpecify]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={11}
                question="Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 9 above."
              >
                <TextBlock text={p5?.essential?.q11_correctiveActions} />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Details of a business process being modified / introduced as a result of addressing human rights grievances/complaints."
              >
                <TextBlock text={p5?.leadership?.q1_businessProcessModified} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Details of the scope and coverage of any Human rights due-diligence conducted."
              >
                <TextBlock text={p5?.leadership?.q2_humanRightsDueDiligence} />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?"
              >
                <TextBlock text={p5?.leadership?.q3_accessibilityDifferentlyAbled} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Details on assessment of value chain partners:"
              >
                <DataTable
                  headers={["", "% of value chain partners (by value of business done with such partners) that were assessed"]}
                  rows={[
                    ["Sexual Harassment", p5?.leadership?.q4_valueChainAssessment?.sexualHarassment],
                    ["Discrimination at workplace", p5?.leadership?.q4_valueChainAssessment?.discriminationAtWorkplace],
                    ["Child Labour", p5?.leadership?.q4_valueChainAssessment?.childLabour],
                    ["Forced Labour/Involuntary Labour", p5?.leadership?.q4_valueChainAssessment?.forcedLabourInvoluntaryLabour],
                    ["Wages", p5?.leadership?.q4_valueChainAssessment?.wages],
                    ["Others – please specify", p5?.leadership?.q4_valueChainAssessment?.othersSpecify]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 4 above."
              >
                <TextBlock text={p5?.leadership?.q5_correctiveActionsValueChain} />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 6 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={6}
            title="Businesses should respect and make efforts to protect and restore the environment."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question="Details of total energy consumption (in Million GJ) and energy intensity, in the following format:"
              >
                <p className="text-sm font-semibold mb-2">From renewable sources</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Total electricity consumption (A)", p6?.essential?.q1_energyConsumption?.renewable?.electricity?.currentFY, p6?.essential?.q1_energyConsumption?.renewable?.electricity?.previousFY],
                    ["Total fuel consumption (B)", p6?.essential?.q1_energyConsumption?.renewable?.fuel?.currentFY, p6?.essential?.q1_energyConsumption?.renewable?.fuel?.previousFY],
                    ["Energy consumption through other sources (C)", p6?.essential?.q1_energyConsumption?.renewable?.otherSources?.currentFY, p6?.essential?.q1_energyConsumption?.renewable?.otherSources?.previousFY],
                    ["Total energy consumed from renewable sources (A+B+C)", p6?.essential?.q1_energyConsumption?.renewable?.total?.currentFY, p6?.essential?.q1_energyConsumption?.renewable?.total?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm font-semibold mb-2 mt-4">From non-renewable sources</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Total electricity consumption (D)", p6?.essential?.q1_energyConsumption?.nonRenewable?.electricity?.currentFY, p6?.essential?.q1_energyConsumption?.nonRenewable?.electricity?.previousFY],
                    ["Total fuel consumption (E)", p6?.essential?.q1_energyConsumption?.nonRenewable?.fuel?.currentFY, p6?.essential?.q1_energyConsumption?.nonRenewable?.fuel?.previousFY],
                    ["Energy consumption through other sources (F)", p6?.essential?.q1_energyConsumption?.nonRenewable?.otherSources?.currentFY, p6?.essential?.q1_energyConsumption?.nonRenewable?.otherSources?.previousFY],
                    ["Total energy consumed from non-renewable sources (D+E+F)", p6?.essential?.q1_energyConsumption?.nonRenewable?.total?.currentFY, p6?.essential?.q1_energyConsumption?.nonRenewable?.total?.previousFY],
                    ["Total energy consumed (A+B+C+D+E+F)", p6?.essential?.q1_energyConsumption?.totalEnergyConsumed?.currentFY, p6?.essential?.q1_energyConsumption?.totalEnergyConsumed?.previousFY],
                    ["Energy intensity per rupee of turnover (Total energy consumed / Revenue from operations) (million GJ/Crore)", p6?.essential?.q1_energyConsumption?.energyIntensityPerTurnover?.currentFY, p6?.essential?.q1_energyConsumption?.energyIntensityPerTurnover?.previousFY]
                  ]}
                  compact
                />
                <div className="mt-4">
                  <DataTable
                    headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                    rows={[
                      ["Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP) (million GJ/USD)", p6?.essential?.q1_energyConsumption?.energyIntensityPPP?.currentFY, p6?.essential?.q1_energyConsumption?.energyIntensityPPP?.previousFY],
                      ["Energy intensity in terms of physical output", p6?.essential?.q1_energyConsumption?.energyIntensityPhysicalOutput, p6?.essential?.q1_energyConsumption?.energyIntensityPhysicalOutput]
                    ]}
                    compact
                  />
                </div>
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.essential?.q1_energyConsumption?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Does the entity have any sites / facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India? (Y/N) If yes, disclose whether targets set under the PAT scheme have been achieved. In case targets have not been achieved, provide the remedial action taken, if any."
              >
                <TextBlock text={p6?.essential?.q2_patScheme} />
                {p6?.essential?.q2_patFacilities && (
                  <DataTable
                    headers={["Sr", "FACILITIES", "DESIGNATED CONSUMER REG NO", "Baseline SEC PAT VII", "Target SEC PAT VII", "SEC Achieved As per Form 3"]}
                    rows={(p6?.essential?.q2_patFacilities || []).map((f: any, i: number) => [
                      i + 1,
                      f?.name,
                      f?.consumerReg,
                      f?.baselineSEC,
                      f?.targetSEC,
                      f?.secAchieved
                    ])}
                    compact
                  />
                )}
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Provide details of the following disclosures related to water, in the following format:"
              >
                <p className="text-sm font-semibold mb-2">Water withdrawal by source (in kiloliters)</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["(i) Surface water", p6?.essential?.q3_waterDetails?.withdrawal?.surfaceWater?.currentFY, p6?.essential?.q3_waterDetails?.withdrawal?.surfaceWater?.previousFY],
                    ["(ii) Groundwater", p6?.essential?.q3_waterDetails?.withdrawal?.groundwater?.currentFY, p6?.essential?.q3_waterDetails?.withdrawal?.groundwater?.previousFY],
                    ["(iii) Third party water", p6?.essential?.q3_waterDetails?.withdrawal?.thirdPartyWater?.currentFY, p6?.essential?.q3_waterDetails?.withdrawal?.thirdPartyWater?.previousFY],
                    ["(iv) Seawater / desalinated water", p6?.essential?.q3_waterDetails?.withdrawal?.seawaterDesalinated?.currentFY, p6?.essential?.q3_waterDetails?.withdrawal?.seawaterDesalinated?.previousFY],
                    ["(v) Others", p6?.essential?.q3_waterDetails?.withdrawal?.others?.currentFY, p6?.essential?.q3_waterDetails?.withdrawal?.others?.previousFY],
                    ["Total volume of water withdrawal (in kiloliters) (i + ii + iii + iv + v)", p6?.essential?.q3_waterDetails?.withdrawal?.total?.currentFY, p6?.essential?.q3_waterDetails?.withdrawal?.total?.previousFY],
                    ["Total volume of water consumption (in kiloliters)", p6?.essential?.q3_waterDetails?.consumption?.total?.currentFY, p6?.essential?.q3_waterDetails?.consumption?.total?.previousFY],
                    ["Water intensity per rupee of turnover (Total water consumption / Revenue from operations) (KL/Crore)", p6?.essential?.q3_waterDetails?.waterIntensityPerTurnover?.currentFY, p6?.essential?.q3_waterDetails?.waterIntensityPerTurnover?.previousFY]
                  ]}
                  compact
                />
                <div className="mt-4">
                  <DataTable
                    headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                    rows={[
                      ["Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP) (KL/USD)", p6?.essential?.q3_waterDetails?.waterIntensityPPP?.currentFY, p6?.essential?.q3_waterDetails?.waterIntensityPPP?.previousFY],
                      ["Water intensity in terms of physical output", p6?.essential?.q3_waterDetails?.waterIntensityPhysicalOutput, p6?.essential?.q3_waterDetails?.waterIntensityPhysicalOutput]
                    ]}
                    compact
                  />
                </div>
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.essential?.q3_waterDetails?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Provide the following details related to water discharged:"
              >
                <p className="text-sm font-semibold mb-2">Water discharge by destination and level of treatment (in kiloliters)</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["(i) To Surface water", "", ""],
                    ["   - No treatment", p6?.essential?.q4_waterDischarge?.surfaceWater?.noTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.surfaceWater?.noTreatment?.previousFY],
                    ["   - With treatment – please specify level of Treatment", p6?.essential?.q4_waterDischarge?.surfaceWater?.withTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.surfaceWater?.withTreatment?.previousFY],
                    ["(ii) To Groundwater", "", ""],
                    ["   - No treatment", p6?.essential?.q4_waterDischarge?.groundwater?.noTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.groundwater?.noTreatment?.previousFY],
                    ["   - With treatment – please specify level of Treatment", p6?.essential?.q4_waterDischarge?.groundwater?.withTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.groundwater?.withTreatment?.previousFY],
                    ["(iii) To Seawater", "", ""],
                    ["   - No treatment", p6?.essential?.q4_waterDischarge?.seawater?.noTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.seawater?.noTreatment?.previousFY],
                    ["   - With treatment – please specify level of Treatment", p6?.essential?.q4_waterDischarge?.seawater?.withTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.seawater?.withTreatment?.previousFY],
                    ["(iv) Sent to third-parties (CETP)", "", ""],
                    ["   - No treatment", p6?.essential?.q4_waterDischarge?.thirdParties?.noTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.thirdParties?.noTreatment?.previousFY],
                    ["   - With treatment (After Homo tank)", p6?.essential?.q4_waterDischarge?.thirdParties?.withTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.thirdParties?.withTreatment?.previousFY],
                    ["(v) Others (Municipal Sewer)", "", ""],
                    ["   - No treatment", p6?.essential?.q4_waterDischarge?.others?.noTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.others?.noTreatment?.previousFY],
                    ["   - With treatment (Primary, secondary and tertiary treatment)", p6?.essential?.q4_waterDischarge?.others?.withTreatment?.currentFY, p6?.essential?.q4_waterDischarge?.others?.withTreatment?.previousFY],
                    ["Total water discharged (in kiloliters)", p6?.essential?.q4_waterDischarge?.totalWaterDischarged?.currentFY, p6?.essential?.q4_waterDischarge?.totalWaterDischarged?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.essential?.q4_waterDischarge?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details of its coverage and implementation."
              >
                <TextBlock text={p6?.essential?.q5_zeroLiquidDischarge} />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Please provide details of air emissions (other than GHG emissions) by the entity, in the following format:"
              >
                <DataTable
                  headers={["Parameter", "Please specify unit", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["NOx", p6?.essential?.q6_airEmissions?.nox?.unit, p6?.essential?.q6_airEmissions?.nox?.currentFY, p6?.essential?.q6_airEmissions?.nox?.previousFY],
                    ["SOx", p6?.essential?.q6_airEmissions?.sox?.unit, p6?.essential?.q6_airEmissions?.sox?.currentFY, p6?.essential?.q6_airEmissions?.sox?.previousFY],
                    ["Particulate matter (PM)", p6?.essential?.q6_airEmissions?.pm?.unit, p6?.essential?.q6_airEmissions?.pm?.currentFY, p6?.essential?.q6_airEmissions?.pm?.previousFY],
                    ["Persistent organic pollutants (POP)", p6?.essential?.q6_airEmissions?.pop?.unit, p6?.essential?.q6_airEmissions?.pop?.currentFY, p6?.essential?.q6_airEmissions?.pop?.previousFY],
                    ["Volatile organic compounds (VOC)", p6?.essential?.q6_airEmissions?.voc?.unit, p6?.essential?.q6_airEmissions?.voc?.currentFY, p6?.essential?.q6_airEmissions?.voc?.previousFY],
                    ["Hazardous air pollutants (HAP)", p6?.essential?.q6_airEmissions?.hap?.unit, p6?.essential?.q6_airEmissions?.hap?.currentFY, p6?.essential?.q6_airEmissions?.hap?.previousFY],
                    ["Others – please specify", p6?.essential?.q6_airEmissions?.others?.unit, p6?.essential?.q6_airEmissions?.others?.currentFY, p6?.essential?.q6_airEmissions?.others?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.essential?.q6_airEmissions?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={7}
                question="Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, in the following format:"
              >
                <DataTable
                  headers={["Parameter", "Unit", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Total Scope 1 emissions (Break-up of the GHG into CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃, if available)", p6?.essential?.q7_ghgEmissions?.scope1?.unit, p6?.essential?.q7_ghgEmissions?.scope1?.currentFY, p6?.essential?.q7_ghgEmissions?.scope1?.previousFY],
                    ["Total Scope 2 emissions (Break-up of the GHG into CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃, if available)", p6?.essential?.q7_ghgEmissions?.scope2?.unit, p6?.essential?.q7_ghgEmissions?.scope2?.currentFY, p6?.essential?.q7_ghgEmissions?.scope2?.previousFY],
                    ["Total Scope 1 and Scope 2 emissions per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations) (tCO2/Crore)", p6?.essential?.q7_ghgEmissions?.totalScope1And2?.unit, p6?.essential?.q7_ghgEmissions?.totalScope1And2?.currentFY, p6?.essential?.q7_ghgEmissions?.totalScope1And2?.previousFY],
                    ["Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP) (tCO2/USD)", p6?.essential?.q7_ghgEmissions?.scope1And2IntensityPerTurnover?.unit, p6?.essential?.q7_ghgEmissions?.scope1And2IntensityPerTurnover?.currentFY, p6?.essential?.q7_ghgEmissions?.scope1And2IntensityPerTurnover?.previousFY],
                    ["Total Scope 1 and Scope 2 emission intensity in terms of physical output", "", p6?.essential?.q7_ghgEmissions?.scope1And2IntensityPhysicalOutput, p6?.essential?.q7_ghgEmissions?.scope1And2IntensityPhysicalOutput]
                  ]}
                  compact
                />
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.essential?.q7_ghgEmissions?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={8}
                question="Does the entity have any project related to reducing Green House Gas emission? If Yes, then provide details."
              >
                <TextBlock text={p6?.essential?.q8_ghgReductionProjects} />
              </QuestionBlock>

              <QuestionBlock
                num={9}
                question="Provide details related to waste management by the entity, in the following format:"
              >
                <p className="text-sm font-semibold mb-2">Total Waste generated (in metric tonnes)</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Plastic waste (A)", p6?.essential?.q9_wasteManagement?.plasticWaste?.currentFY, p6?.essential?.q9_wasteManagement?.plasticWaste?.previousFY],
                    ["E-waste (B)", p6?.essential?.q9_wasteManagement?.eWaste?.currentFY, p6?.essential?.q9_wasteManagement?.eWaste?.previousFY],
                    ["Bio-medical waste (C)", p6?.essential?.q9_wasteManagement?.bioMedicalWaste?.currentFY, p6?.essential?.q9_wasteManagement?.bioMedicalWaste?.previousFY],
                    ["Construction and demolition waste (D)", p6?.essential?.q9_wasteManagement?.constructionDemolitionWaste?.currentFY, p6?.essential?.q9_wasteManagement?.constructionDemolitionWaste?.previousFY],
                    ["Battery waste (E)", p6?.essential?.q9_wasteManagement?.batteryWaste?.currentFY, p6?.essential?.q9_wasteManagement?.batteryWaste?.previousFY],
                    ["Radioactive waste (F)", p6?.essential?.q9_wasteManagement?.radioactiveWaste?.currentFY, p6?.essential?.q9_wasteManagement?.radioactiveWaste?.previousFY],
                    ["Other Hazardous waste. Please specify, if any. (G)", p6?.essential?.q9_wasteManagement?.otherHazardousWaste?.currentFY, p6?.essential?.q9_wasteManagement?.otherHazardousWaste?.previousFY],
                    ["Other Non-hazardous waste generated (H). Please specify, if any. (Break-up by composition i.e. by materials relevant to the sector)", p6?.essential?.q9_wasteManagement?.otherNonHazardousWaste?.currentFY, p6?.essential?.q9_wasteManagement?.otherNonHazardousWaste?.previousFY],
                    ["Total (A+B + C + D + E + F + G + H)", p6?.essential?.q9_wasteManagement?.totalWaste?.currentFY, p6?.essential?.q9_wasteManagement?.totalWaste?.previousFY],
                    ["Waste intensity per rupee of turnover (Total waste generated / Revenue from operations) (MT/Crore)", p6?.essential?.q9_wasteManagement?.wasteIntensityPerTurnover?.currentFY, p6?.essential?.q9_wasteManagement?.wasteIntensityPerTurnover?.previousFY]
                  ]}
                  compact
                />
                <div className="mt-4">
                  <DataTable
                    headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                    rows={[
                      ["Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP) (MT/USD)", p6?.essential?.q9_wasteManagement?.wasteIntensityPPP?.currentFY, p6?.essential?.q9_wasteManagement?.wasteIntensityPPP?.previousFY],
                      ["Waste intensity in terms of physical output", p6?.essential?.q9_wasteManagement?.wasteIntensityPhysicalOutput, p6?.essential?.q9_wasteManagement?.wasteIntensityPhysicalOutput]
                    ]}
                    compact
                  />
                </div>
                <p className="text-sm font-semibold mb-2 mt-4">For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tonnes)</p>
                <DataTable
                  headers={["Category of waste", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["(i) Recycled", p6?.essential?.q9_wasteManagement?.recycled?.currentFY, p6?.essential?.q9_wasteManagement?.recycled?.previousFY],
                    ["(ii) Re-used", p6?.essential?.q9_wasteManagement?.reused?.currentFY, p6?.essential?.q9_wasteManagement?.reused?.previousFY],
                    ["(iii) Other recovery operations", p6?.essential?.q9_wasteManagement?.otherRecovery?.currentFY, p6?.essential?.q9_wasteManagement?.otherRecovery?.previousFY],
                    ["Total", p6?.essential?.q9_wasteManagement?.totalRecovered?.currentFY, p6?.essential?.q9_wasteManagement?.totalRecovered?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm font-semibold mb-2 mt-4">For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)</p>
                <DataTable
                  headers={["Category of waste", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["(i) Incineration", p6?.essential?.q9_wasteManagement?.incineration?.currentFY, p6?.essential?.q9_wasteManagement?.incineration?.previousFY],
                    ["(ii) Landfilling", p6?.essential?.q9_wasteManagement?.landfilling?.currentFY, p6?.essential?.q9_wasteManagement?.landfilling?.previousFY],
                    ["(iii) Other disposal operations", p6?.essential?.q9_wasteManagement?.otherDisposal?.currentFY, p6?.essential?.q9_wasteManagement?.otherDisposal?.previousFY],
                    ["Total", p6?.essential?.q9_wasteManagement?.totalDisposed?.currentFY, p6?.essential?.q9_wasteManagement?.totalDisposed?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.essential?.q9_wasteManagement?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={10}
                question="Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes."
              >
                <TextBlock text={p6?.essential?.q10_wastePractices} />
              </QuestionBlock>

              <QuestionBlock
                num={11}
                question="If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests, coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:"
              >
                <TextBlock text={p6?.essential?.q11_ecologicallySensitiveAreas} />
                <p className="text-sm mt-2">{p6?.essential?.q11_ecologicallySensitiveDetails}</p>
              </QuestionBlock>

              <QuestionBlock
                num={12}
                question="Details of environmental impact assessments of projects undertaken by the entity based on applicable laws, in the current financial year:"
              >
                <TextBlock text={p6?.essential?.q12_environmentalImpactAssessments} />
              </QuestionBlock>

              <QuestionBlock
                num={13}
                question="Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N)."
              >
                <TextBlock text={p6?.essential?.q13_environmentalCompliance} />
                <p className="text-sm mt-2">If not, provide details of all such non-compliances:</p>
                <TextBlock text={p6?.essential?.q13_nonCompliances} />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Water withdrawal, consumption and discharge in areas of water stress (in kilolitres):"
              >
                <p className="text-sm mb-2">For each facility / plant located in areas of water stress, provide the following information:</p>
                <p className="text-sm mb-1"><strong>i. Name of the area:</strong> {p6?.leadership?.q1_waterStressAreas?.name}</p>
                <p className="text-sm mb-2"><strong>ii. Nature of operations:</strong> {p6?.leadership?.q1_waterStressAreas?.natureOfOperations}</p>
                <p className="text-sm font-semibold mb-2">iii. Water withdrawal, consumption and discharge in the following format:</p>
                <p className="text-sm font-semibold mb-2 mt-2">Water withdrawal by source (in kiloliters)</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["(i) Surface water", p6?.leadership?.q1_waterStressAreas?.withdrawal?.surfaceWater?.currentFY, p6?.leadership?.q1_waterStressAreas?.withdrawal?.surfaceWater?.previousFY],
                    ["(ii) Groundwater", p6?.leadership?.q1_waterStressAreas?.withdrawal?.groundwater?.currentFY, p6?.leadership?.q1_waterStressAreas?.withdrawal?.groundwater?.previousFY],
                    ["(iii) Third party water", p6?.leadership?.q1_waterStressAreas?.withdrawal?.thirdPartyWater?.currentFY, p6?.leadership?.q1_waterStressAreas?.withdrawal?.thirdPartyWater?.previousFY],
                    ["(iv) Seawater / desalinated water", p6?.leadership?.q1_waterStressAreas?.withdrawal?.seawaterDesalinated?.currentFY, p6?.leadership?.q1_waterStressAreas?.withdrawal?.seawaterDesalinated?.previousFY],
                    ["(v) Others", p6?.leadership?.q1_waterStressAreas?.withdrawal?.others?.currentFY, p6?.leadership?.q1_waterStressAreas?.withdrawal?.others?.previousFY],
                    ["Total volume of water withdrawal (in kiloliters)", p6?.leadership?.q1_waterStressAreas?.withdrawal?.total?.currentFY, p6?.leadership?.q1_waterStressAreas?.withdrawal?.total?.previousFY],
                    ["Total volume of water consumption (in kiloliters)", p6?.leadership?.q1_waterStressAreas?.consumption?.total?.currentFY, p6?.leadership?.q1_waterStressAreas?.consumption?.total?.previousFY],
                    ["Water intensity per rupee of turnover (Water consumed / turnover) (KL/ Crore)", p6?.leadership?.q1_waterStressAreas?.waterIntensityPerTurnover?.currentFY, p6?.leadership?.q1_waterStressAreas?.waterIntensityPerTurnover?.previousFY],
                    ["Water intensity (optional)–the relevant metric may be selected by the entity", p6?.leadership?.q1_waterStressAreas?.waterIntensityPhysicalOutput, p6?.leadership?.q1_waterStressAreas?.waterIntensityPhysicalOutput]
                  ]}
                  compact
                />
                <p className="text-sm font-semibold mb-2 mt-4">Water discharge by destination and level of treatment (in kiloliters)</p>
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["(i) Into Surface water", "", ""],
                    ["   - No treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.surfaceWater?.noTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.surfaceWater?.noTreatment?.previousFY],
                    ["   - Withtreatment–please specify level of treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.surfaceWater?.withTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.surfaceWater?.withTreatment?.previousFY],
                    ["(ii) Into Groundwater", "", ""],
                    ["   - No treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.groundwater?.noTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.groundwater?.noTreatment?.previousFY],
                    ["   - Withtreatment–please specify level of treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.groundwater?.withTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.groundwater?.withTreatment?.previousFY],
                    ["(iii) Into Seawater", "", ""],
                    ["   - No treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.seawater?.noTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.seawater?.noTreatment?.previousFY],
                    ["   - Withtreatment–please specify level of treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.seawater?.withTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.seawater?.withTreatment?.previousFY],
                    ["(iv) Sent to third-parties", "", ""],
                    ["   - No treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.thirdParties?.noTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.thirdParties?.noTreatment?.previousFY],
                    ["   - Withtreatment–please specify level of treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.thirdParties?.withTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.thirdParties?.withTreatment?.previousFY],
                    ["(v) Others", "", ""],
                    ["   - No treatment", p6?.leadership?.q1_waterStressAreas?.discharge?.others?.noTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.others?.noTreatment?.previousFY],
                    ["   - Withtreatment–(Primary, secondary & tertiary treatment)", p6?.leadership?.q1_waterStressAreas?.discharge?.others?.withTreatment?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.others?.withTreatment?.previousFY],
                    ["Total water discharged (in kilolitres)", p6?.leadership?.q1_waterStressAreas?.discharge?.total?.currentFY, p6?.leadership?.q1_waterStressAreas?.discharge?.total?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.leadership?.q1_waterStressAreas?.externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Please provide details of total Scope 3 emissions & its intensity, in the following format:"
              >
                <DataTable
                  headers={["Parameter", "Unit", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Total Scope 3 emissions (Break-up of the GHG into CO₂, CH₄, N₂O, HFCs, PFCs, SF₆, NF₃, if available)", "Metric tonnes of CO₂ equivalent", p6?.leadership?.q2_scope3Emissions, p6?.leadership?.q2_scope3Emissions],
                    ["Total Scope 3 emissions per rupee of turnover", "", p6?.leadership?.q2_scope3EmissionsPerTurnover, p6?.leadership?.q2_scope3EmissionsPerTurnover],
                    ["Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity", "", p6?.leadership?.q2_scope3IntensityPhysicalOutput, p6?.leadership?.q2_scope3IntensityPhysicalOutput]
                  ]}
                  compact
                />
                <p className="text-sm mt-2"><strong>Note:</strong> Indicate if any independent assessment/ evaluation/assurance has been carried out by an external agency? (Y/N) If yes, name of the external agency.</p>
                <TextBlock text={p6?.leadership?.q2_externalAssessment} />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="With respect to the ecologically sensitive areas reported at Question 10 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities."
              >
                <TextBlock text={p6?.leadership?.q3_biodiversityImpact} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:"
              >
                <DataTable
                  headers={["S. No.", "Initiative undertaken", "Details of the initiative (Web-link, if any, may be provided along-with summary)", "Outcome of the initiative"]}
                  rows={(p6?.leadership?.q4_resourceEfficiencyInitiatives || []).map((init: any, i: number) => [
                    i + 1,
                    init?.initiative,
                    init?.details,
                    init?.outcome
                  ])}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Does the entity have a business continuity and disaster management plan? Give details in 100 words/ web link."
              >
                <TextBlock text={p6?.leadership?.q5_businessContinuityPlan} />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard."
              >
                <TextBlock text={p6?.leadership?.q6_valueChainEnvironmentalImpact} />
              </QuestionBlock>

              <QuestionBlock
                num={7}
                question="Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts."
              >
                <TextBlock text={p6?.leadership?.q7_valueChainPartnersAssessed} />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 7 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={7}
            title="Businesses, when engaging in influencing public and regulatory policy, should do so in a manner that is responsible and transparent."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question="a. Number of affiliations with trade and industry chambers/ associations."
              >
                <TextBlock text={p7?.essential?.q1a_numberOfAffiliations} />
              </QuestionBlock>

              <QuestionBlock 
                num={2} 
                question="b. List the top 10 trade and industry chambers/ associations (determined based on the total members of such body) the entity is a member of/ affiliated to."
              >
                <DataTable
                  headers={["S.No.", "Name of the trade and industry chambers/ associations", "Reach of trade and industry chambers/ associations (State/National)"]}
                  rows={(p7?.essential?.q1b_affiliationsList || []).map((a: any, i: number) => [
                    i + 1,
                    a?.name,
                    a?.reach,
                  ])}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Provide details of corrective action taken or underway on any issues related to anti-competitive conduct by the entity, based on adverse orders from regulatory authorities."
              >
                <DataTable
                  headers={["Name of authority", "Brief of the case", "Corrective action taken"]}
                  rows={[
                    [p7?.essential?.q2_antiCompetitiveConduct || "None", "", ""]
                  ]}
                  compact
                />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Details of public policy positions advocated by the entity:"
              >
                <DataTable
                  headers={["S. No.", "Public policy advocated", "Method resorted for such advocacy", "Whether information available in public domain? (Yes/No)", "Frequency of Review by Board (Annually/ Half yearly/ Quarterly / Others – please specify)", "Web Link, if available"]}
                  rows={(p7?.leadership?.q1_publicPolicyAdvocacy || []).map((p: any, i: number) => [
                    i + 1,
                    p?.policyAdvocated,
                    p?.methodResorted,
                    p?.publicDomain,
                    p?.frequencyOfReview,
                    p?.webLink
                  ])}
                  compact
                />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 8 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader num={8} title="Businesses should promote inclusive growth and equitable development." />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question="Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year."
              >
                <DataTable
                  headers={["Name and brief details of project", "SIA Notification No.", "Date of notification", "Whether conducted by independent in external agency (Yes / No)", "Results communicated in public domain (Yes/No)", "Relevant Web link"]}
                  rows={[
                    [p8?.essential?.q1_socialImpactAssessments || "Not Applicable", "", "", "", "", ""]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity, in the following format:"
              >
                <DataTable
                  headers={["S. No.", "Name of Project for which R&R is ongoing", "State", "District", "No. of Project Affected Families (PAFs)", "% of PAFs covered by R&R", "Amounts paid to PAFs in the FY (In INR)"]}
                  rows={[
                    ["", p8?.essential?.q2_rehabilitationResettlement || "Not Applicable", "", "", "", "", ""]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Describe the mechanisms to receive and redress grievances of the community."
              >
                <TextBlock text={p8?.essential?.q3_communityGrievanceMechanism} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Percentage of input material (inputs to total inputs by value) sourced from suppliers:"
              >
                <DataTable
                  headers={["Parameter", "FY 2023-24", "FY 2022-23"]}
                  rows={[
                    ["Directly sourced from MSMEs/ small producers", p8?.essential?.q4_inputMaterialSourcing?.msmes?.currentFY, p8?.essential?.q4_inputMaterialSourcing?.msmes?.previousFY],
                    ["Sourced directly from within the district (out of total input)", p8?.essential?.q4_inputMaterialSourcing?.withinDistrict?.currentFY, p8?.essential?.q4_inputMaterialSourcing?.withinDistrict?.previousFY],
                    ["Sourced directly from neighboring districts (out of total input)", p8?.essential?.q4_inputMaterialSourcing?.neighboringDistricts?.currentFY, p8?.essential?.q4_inputMaterialSourcing?.neighboringDistricts?.previousFY]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Job creation in smaller towns – Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis) in the following locations, as % of total wage cost"
              >
                <DataTable
                  headers={["Parameter", "FY 23-24 Current Financial Year", "FY 22-23 Previous Financial Year"]}
                  rows={[
                    ["Rural", p8?.essential?.q5_jobCreation?.rural?.currentFY, p8?.essential?.q5_jobCreation?.rural?.previousFY],
                    ["Semi-urban", p8?.essential?.q5_jobCreation?.semiUrban?.currentFY, p8?.essential?.q5_jobCreation?.semiUrban?.previousFY],
                    ["Urban", p8?.essential?.q5_jobCreation?.urban?.currentFY, p8?.essential?.q5_jobCreation?.urban?.previousFY],
                    ["Metropolitan", p8?.essential?.q5_jobCreation?.metropolitan?.currentFY, p8?.essential?.q5_jobCreation?.metropolitan?.previousFY]
                  ]}
                  compact
                />
                <p className="text-sm mt-2">(Place to be categorized as per RBI Classification System - rural / semi-urban / urban / metropolitan)</p>
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above):"
              >
                <DataTable
                  headers={["Details of negative social impact identified", "Corrective action taken"]}
                  rows={[
                    [p8?.leadership?.q1_negativeImpactMitigation || "Not Applicable", ""]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies:"
              >
                <DataTable
                  headers={["S. No.", "State", "Aspirational District", "Amount spent (in ₹)"]}
                  rows={(p8?.leadership?.q2_csrProjects || []).map((c: any, i: number) => [
                    i + 1,
                    c?.state,
                    c?.aspirationalDistrict,
                    c?.amountSpent,
                  ])}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="(a) Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups? (Yes/No)"
              >
                <TextBlock text={p8?.leadership?.q3a_preferentialProcurement} />
                <p className="text-sm mt-2"><strong>(b) From which marginalized /vulnerable groups do you procure?</strong></p>
                <TextBlock text={p8?.leadership?.q3b_vulnerableGroups} />
                <p className="text-sm mt-2"><strong>(c) What percentage of total procurement (by value) does it constitute?</strong></p>
                <TextBlock text={p8?.leadership?.q3c_procurementPercentage} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge:"
              >
                <DataTable
                  headers={["S. No.", "Intellectual Property based on traditional knowledge", "Owned/ Acquired (Yes/No)", "Benefit shared (Yes / No)", "Basis of calculating benefit share"]}
                  rows={[
                    ["", p8?.leadership?.q4_intellectualProperty || "Nil", "", "", ""]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved."
              >
                <DataTable
                  headers={["Name of authority", "Brief of the Case", "Corrective action taken"]}
                  rows={[
                    ["", p8?.leadership?.q5_ipDisputes || "Not Applicable", ""]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Details of beneficiaries of CSR Projects:"
              >
                <DataTable
                  headers={["S. No.", "CSR Project", "No. of persons benefitted from CSR Projects", "% of beneficiaries from vulnerable and marginalized groups"]}
                  rows={(p8?.leadership?.q6_csrBeneficiaries || []).map((b: any, i: number) => [
                    i + 1,
                    b?.project,
                    b?.beneficiaries,
                    b?.percentVulnerable
                  ])}
                  compact
                />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>

        {/* PRINCIPLE 9 */}
        <div className="mb-8 rounded-lg border overflow-hidden">
          <PrincipleHeader
            num={9}
            title="Businesses should engage with and provide value to their consumers in a responsible manner."
          />
          <div className="p-4">
            <IndicatorSection title="Essential Indicators">
              <QuestionBlock
                num={1}
                question="Describe the mechanisms in place to receive and respond to consumer complaints and feedback."
              >
                <TextBlock text={p9?.essential?.q1_consumerComplaintMechanism} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Turnover of products and/ services as a percentage of turnover from all products/service that carry information about:"
              >
                <DataTable
                  headers={["", "As a percentage to total turnover"]}
                  rows={[
                    ["Environmental and social parameters relevant to the product", p9?.essential?.q2_productInformationPercentage?.environmentalParameters],
                    ["Safe and responsible usage Recycling and/or safe disposal", p9?.essential?.q2_productInformationPercentage?.safeUsage],
                    ["Recycling and/or safe disposal", p9?.essential?.q2_productInformationPercentage?.recycling]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Number of consumer complaints in respect of the following:"
              >
                <DataTable
                  headers={["", "FY 2023-24 Received during the year", "FY 2023-24 Pending resolution at end of year", "FY 2023-24 Remarks", "FY 2022-23 Received during the year", "FY 2022-23 Pending resolution at end of year", "FY 2022-23 Remarks"]}
                  rows={[
                    [
                      "Data privacy",
                      p9?.essential?.q3_consumerComplaints?.dataPrivacy?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.dataPrivacy?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.dataPrivacy?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.dataPrivacy?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.dataPrivacy?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.dataPrivacy?.previousFY?.remarks
                    ],
                    [
                      "Advertising",
                      p9?.essential?.q3_consumerComplaints?.advertising?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.advertising?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.advertising?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.advertising?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.advertising?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.advertising?.previousFY?.remarks
                    ],
                    [
                      "Cyber-security",
                      p9?.essential?.q3_consumerComplaints?.cyberSecurity?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.cyberSecurity?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.cyberSecurity?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.cyberSecurity?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.cyberSecurity?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.cyberSecurity?.previousFY?.remarks
                    ],
                    [
                      "Delivery of essential services",
                      p9?.essential?.q3_consumerComplaints?.deliveryOfServices?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.deliveryOfServices?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.deliveryOfServices?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.deliveryOfServices?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.deliveryOfServices?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.deliveryOfServices?.previousFY?.remarks
                    ],
                    [
                      "Restrictive Trade Practices",
                      p9?.essential?.q3_consumerComplaints?.restrictiveTradePractices?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.restrictiveTradePractices?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.restrictiveTradePractices?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.restrictiveTradePractices?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.restrictiveTradePractices?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.restrictiveTradePractices?.previousFY?.remarks
                    ],
                    [
                      "Unfair Trade Practices",
                      p9?.essential?.q3_consumerComplaints?.unfairTradePractices?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.unfairTradePractices?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.unfairTradePractices?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.unfairTradePractices?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.unfairTradePractices?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.unfairTradePractices?.previousFY?.remarks
                    ],
                    [
                      "Other",
                      p9?.essential?.q3_consumerComplaints?.other?.currentFY?.received,
                      p9?.essential?.q3_consumerComplaints?.other?.currentFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.other?.currentFY?.remarks,
                      p9?.essential?.q3_consumerComplaints?.other?.previousFY?.received,
                      p9?.essential?.q3_consumerComplaints?.other?.previousFY?.pending,
                      p9?.essential?.q3_consumerComplaints?.other?.previousFY?.remarks
                    ]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Details of instances of product recalls on account of safety issues:"
              >
                <DataTable
                  headers={["", "Number", "Reasons for recall"]}
                  rows={[
                    ["Voluntary recalls", p9?.essential?.q4_productRecalls?.voluntary?.number, p9?.essential?.q4_productRecalls?.voluntary?.reasons],
                    ["Forced recalls", p9?.essential?.q4_productRecalls?.forced?.number, p9?.essential?.q4_productRecalls?.forced?.reasons]
                  ]}
                  compact
                />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Does the entity have a framework/ policy on cyber security and risks related to data privacy?"
              >
                <TextBlock text={p9?.essential?.q5_cyberSecurityPolicy} />
              </QuestionBlock>

              <QuestionBlock
                num={6}
                question="Provide details of any corrective actions taken or underway on issues relating to advertising and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services."
              >
                <TextBlock text={p9?.essential?.q6_correctiveActions} />
              </QuestionBlock>

              <QuestionBlock
                num={7}
                question="Provide the following information relating to data breaches:"
              >
                <p className="text-sm mb-2"><strong>a. Number of instances of data breaches:</strong></p>
                <TextBlock text={p9?.essential?.q7_dataBreaches?.a_numberOfInstances} />
                <p className="text-sm mt-2 mb-2"><strong>b. Percentage of data breaches involving personally identifiable information of customers:</strong></p>
                <TextBlock text={p9?.essential?.q7_dataBreaches?.b_percentageWithPII} />
                <p className="text-sm mt-2 mb-2"><strong>c. Impact, if any, of the data breaches:</strong></p>
                <TextBlock text={p9?.essential?.q7_dataBreaches?.c_impact} />
              </QuestionBlock>
            </IndicatorSection>

            <IndicatorSection title="Leadership Indicators">
              <QuestionBlock
                num={1}
                question="Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available)."
              >
                <TextBlock text={p9?.leadership?.q1_informationChannels} />
              </QuestionBlock>

              <QuestionBlock
                num={2}
                question="Steps taken to inform and educate consumers about safe and responsible usage of products and/or services."
              >
                <TextBlock text={p9?.leadership?.q2_consumerEducation} />
              </QuestionBlock>

              <QuestionBlock
                num={3}
                question="Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services."
              >
                <TextBlock text={p9?.leadership?.q3_disruptionMechanisms} />
              </QuestionBlock>

              <QuestionBlock
                num={4}
                question="Does the entity display product information on the product over and above what is mandated as per local laws? (Yes/No/Not Applicable) If yes, provide details in brief. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole?"
              >
                <TextBlock text={p9?.leadership?.q4_productInformationDisplay} />
              </QuestionBlock>

              <QuestionBlock
                num={5}
                question="Provide the following information relating to data breaches:"
              >
                <p className="text-sm mb-2"><strong>a) Number of instances of data breaches along-with impact:</strong></p>
                <TextBlock text={p9?.leadership?.q5_dataBreaches?.a_numberOfInstances} />
                <p className="text-sm mt-2 mb-2"><strong>b) Percentage of data breaches involving personally identifiable information of customers:</strong></p>
                <TextBlock text={p9?.leadership?.q5_dataBreaches?.b_percentageWithPII} />
              </QuestionBlock>
            </IndicatorSection>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t-2 border-[#007A3D] text-center page-break-inside-avoid">
        <p className="text-sm text-gray-500">
          Annual Report {sectionA?.financialYear || "2023-24"} | {sectionA?.entityName || "Company Name"}
        </p>
      </div>
    </div>
    )
  }
)

ReportPreview.displayName = "ReportPreview"


