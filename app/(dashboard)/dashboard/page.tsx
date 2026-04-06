import React from "react";
import type { Metadata } from "next";
import {
  BookOpen, AlertTriangle, User, Store,
  Building2, UserPlus, UserMinus, TrendingUp, ArrowRight,
} from "lucide-react";
import StatsCard from "@/components/ui/StatsCard";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard" };

// ── Mock data ─────────────────────────────────────────────────────────────────
const CATEGORY_REQUESTS = [
  { category: "Hardware Request",     status: "Active",  count: 12, trend: "+3" },
  { category: "Software Installation",status: "Active",  count: 8,  trend: "+1" },
  { category: "Network Issue",        status: "Active",  count: 5,  trend: "-2" },
  { category: "Access Request",       status: "Pending", count: 14, trend: "+5" },
  { category: "Email Setup",          status: "Resolved",count: 6,  trend: "0"  },
  { category: "VPN Access",           status: "Active",  count: 3,  trend: "+1" },
];

const STATUS_COLORS: Record<string, string> = {
  Active:   "text-green-600 bg-green-50 border-green-200",
  Pending:  "text-yellow-600 bg-yellow-50 border-yellow-200",
  Resolved: "text-blue-600 bg-blue-50 border-blue-200",
  Closed:   "text-gray-500 bg-gray-50 border-gray-200",
};

const RECENT_INCIDENTS = [
  { id: "INC-0042", title: "Email server down",        priority: "High",   assignee: "K. Rao",    status: "Active"   },
  { id: "INC-0041", title: "VPN connectivity issue",   priority: "Medium", assignee: "A. Mishra", status: "Active"   },
  { id: "INC-0040", title: "Printer not working",      priority: "Low",    assignee: "S. Patel",  status: "Resolved" },
];

const PRIORITY_COLORS: Record<string, string> = {
  High:   "text-red-600 bg-red-50",
  Medium: "text-orange-600 bg-orange-50",
  Low:    "text-blue-600 bg-blue-50",
};

// ── Stats card definitions ────────────────────────────────────────────────────
const STATS_CARDS = [
  {
    title: "Catalog Requests",
    icon: <BookOpen size={22} />,
    color: "blue" as const,
    stats: [{ label: "New", count: 26 }],
  },
  {
    title: "Incident Requests",
    icon: <AlertTriangle size={22} />,
    color: "orange" as const,
    stats: [{ label: "Active", count: 2 }],
  },
  {
    title: "Service Requests",
    icon: <User size={22} />,
    color: "green" as const,
    stats: [{ label: "Active", count: 1 }],
  },
  {
    title: "IT Members",
    icon: <User size={22} />,
    color: "purple" as const,
    stats: [
      { label: "Active",   count: 17 },
      { label: "InActive", count: 1, inactive: true },
    ],
  },
  {
    title: "Vendors",
    icon: <Store size={22} />,
    color: "teal" as const,
    stats: [{ label: "Active", count: 9 }],
  },
  {
    title: "Assets",
    icon: <Building2 size={22} />,
    color: "indigo" as const,
    stats: [
      { label: "Active",   count: 182 },
      { label: "InActive", count: 0, inactive: true },
    ],
  },
  {
    title: "OnBoarding Requests",
    icon: <UserPlus size={22} />,
    color: "emerald" as const,
    stats: [{ label: "Active", count: 0 }],
  },
  {
    title: "OffBoarding Requests",
    icon: <UserMinus size={22} />,
    color: "rose" as const,
    stats: [{ label: "Active", count: 0 }],
  },
];

const GRAPH_BARS = [
  { label: "Catalog Requests",  value: 26, max: 40, color: "bg-blue-500"   },
  { label: "Incident Requests", value: 2,  max: 40, color: "bg-orange-500" },
  { label: "Service Requests",  value: 1,  max: 40, color: "bg-green-500"  },
  { label: "IT Members",        value: 17, max: 40, color: "bg-purple-500" },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">

      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-primary rounded-2xl p-6 md:p-8 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white rounded-full" />
          <div className="absolute bottom-0 right-32 w-40 h-40 bg-white rounded-full" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-blue-200 text-sm font-medium mb-1">Welcome back 👋</p>
            <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-blue-200 text-sm mt-2 max-w-sm">
              Here&apos;s what&apos;s happening in your IT environment today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center bg-white/10 rounded-xl px-5 py-3 border border-white/10">
              <p className="text-2xl font-bold">29</p>
              <p className="text-blue-200 text-xs font-medium">Open Tickets</p>
            </div>
            <div className="text-center bg-accent-orange/20 rounded-xl px-5 py-3 border border-accent-orange/30">
              <p className="text-2xl font-bold">182</p>
              <p className="text-blue-200 text-xs font-medium">Total Assets</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Request Overview cards ── */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Request Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS_CARDS.map((card, i) => (
            <StatsCard
              key={card.title}
              title={card.title}
              icon={card.icon}
              color={card.color}
              stats={card.stats}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Category Wise Requests */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Category Wise Requests</h2>
            <Link
              href="/it/service-requests"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 px-3 py-2 bg-gray-50 rounded-xl mb-2">
            {["Category", "Status", "Count"].map((h) => (
              <span key={h} className="text-xs font-semibold text-gray-500 uppercase tracking-wider last:text-right">
                {h}
              </span>
            ))}
          </div>
          <ul className="space-y-1">
            {CATEGORY_REQUESTS.map((row, i) => (
              <li
                key={i}
                className="grid grid-cols-3 gap-4 items-center px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-700 font-medium truncate">{row.category}</span>
                <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border w-fit ${STATUS_COLORS[row.status]}`}>
                  {row.status}
                </span>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm font-bold text-gray-800">{row.count}</span>
                  <span className={`text-[10px] font-semibold ${row.trend.startsWith("+") ? "text-green-500" : row.trend.startsWith("-") ? "text-red-500" : "text-gray-400"}`}>
                    {row.trend !== "0" && row.trend}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Graph data */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Graph Data</h2>
              <TrendingUp size={18} className="text-primary" />
            </div>
            <div className="space-y-4">
              {GRAPH_BARS.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-600">{item.label}</span>
                    <span className="text-xs font-bold text-gray-800">{item.value}</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-700`}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent incidents */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Recent Incidents</h2>
              <Link href="/it/incidents" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <ul className="space-y-2">
              {RECENT_INCIDENTS.map((inc) => (
                <li
                  key={inc.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 ${PRIORITY_COLORS[inc.priority]}`}>
                    {inc.priority}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{inc.title}</p>
                    <p className="text-xs text-gray-500 truncate">{inc.id} · {inc.assignee}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${STATUS_COLORS[inc.status]}`}>
                    {inc.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
