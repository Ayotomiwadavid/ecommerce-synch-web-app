"use client"

import React from "react"
import Layout from "../components/Layout"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const salesData = [
  { name: "Jan", Amazon: 4000, Etsy: 2400, eBay: 2400 },
  { name: "Feb", Amazon: 3000, Etsy: 1398, eBay: 2210 },
  { name: "Mar", Amazon: 2000, Etsy: 9800, eBay: 2290 },
  { name: "Apr", Amazon: 2780, Etsy: 3908, eBay: 2000 },
  { name: "May", Amazon: 1890, Etsy: 4800, eBay: 2181 },
  { name: "Jun", Amazon: 2390, Etsy: 3800, eBay: 2500 },
]

const trafficData = [
  { name: "Week 1", visitors: 500 },
  { name: "Week 2", visitors: 750 },
  { name: "Week 3", visitors: 1000 },
  { name: "Week 4", visitors: 1250 },
]

export default function Analytics() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sales by Platform</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Amazon" fill="#8884d8" />
                <Bar dataKey="Etsy" fill="#82ca9d" />
                <Bar dataKey="eBay" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Website Traffic</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard title="Conversion Rate" value="3.2%" change="+0.5%" positive={true} />
            <MetricCard title="Average Order Value" value="$78.35" change="-$2.10" positive={false} />
            <MetricCard title="Customer Retention" value="68%" change="+2%" positive={true} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

const MetricCard = ({
  title,
  value,
  change,
  positive,
}: { title: string; value: string; change: string; positive: boolean }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
    <p className={`mt-2 ${positive ? "text-green-600" : "text-red-600"}`}>
      {change} {positive ? "↑" : "↓"}
    </p>
  </div>
)

