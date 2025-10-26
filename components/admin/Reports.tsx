'use client'

import { useState, useEffect } from 'react'

type Report = {
  salesByItem: Array<{
    name: string
    quantity: number
    revenue: number
  }>
  salesByCategory: Array<{
    category: string
    quantity: number
    revenue: number
  }>
  salesByDate: Array<{
    date: string
    orders: number
    revenue: number
  }>
}

export default function Reports() {
  const [reportData, setReportData] = useState<Report | null>(null)
  const [dateRange, setDateRange] = useState('week') // week, month, year

  useEffect(() => {
    fetchReports()
  }, [dateRange])

  const fetchReports = async () => {
    try {
      const response = await fetch(`/api/reports?range=${dateRange}`)
      const data = await response.json()
      setReportData(data)
    } catch (error) {
      console.error('Error fetching reports:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="mt-1 block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {reportData && (
        <>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Sales by Item</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Item</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reportData.salesByItem.map((item, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${item.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Sales by Category</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reportData.salesByCategory.map((category, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {category.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.quantity}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${category.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Daily Sales</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Orders</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reportData.salesByDate.map((day, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {new Date(day.date).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{day.orders}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${day.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}