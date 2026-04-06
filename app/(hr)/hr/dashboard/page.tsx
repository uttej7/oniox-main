import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus, UserMinus, FileText, CheckCircle, Clock, Users } from "lucide-react";

export const metadata: Metadata = { title: "HR Dashboard" };

const REQUESTS = [
  {
    id: "REQ0002", date: "06 Mar 2026", name: "Meena Kachipuram", empId: "XSS-0619",
    manager: "Kamal Manohar Rao J", email: "virat.kohli@xsilica.com", phone: "8522805172",
    type: "Offboarding", status: "Initiated",
  },
  {
    id: "REQ0003", date: "06 Mar 2026", name: "Meena Kachipuram", empId: "N/A",
    manager: "Kamal Manohar Rao J", email: "finn.allen@gmail.com", phone: "970536447234",
    type: "Onboarding", status: "Joined",
  },
  {
    id: "REQ0004", date: "07 Mar 2026", name: "Ravi Kumar", empId: "XSS-0723",
    manager: "Kamal Manohar Rao J", email: "ravi.k@orionx.com", phone: "9876543210",
    type: "Onboarding", status: "Successful With Issue",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Initiated:              "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Joined:                 "bg-green-100 text-green-700 border border-green-200",
  "Successful With Issue":"bg-orange-100 text-orange-700 border border-orange-200",
  Relieved:               "bg-blue-100 text-blue-700 border border-blue-200",
};

const STATS = [
  { label: "Total Requests", value: 3, icon: FileText, color: "text-gray-600 bg-gray-100" },
  { label: "Successful With Issue", value: 1, icon: Clock, color: "text-yellow-600 bg-yellow-100" },
  { label: "Joined", value: 1, icon: CheckCircle, color: "text-green-600 bg-green-100" },
  { label: "Relieved", value: 1, icon: CheckCircle, color: "text-blue-600 bg-blue-100" },
];

export default function HRDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── Hero banner (yellow, like screenshot) ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 p-6 md:p-8">
        {/* Decorative blobs */}
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute right-32 bottom-0 w-28 h-28 bg-white/10 rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left text */}
          <div>
            <p className="text-amber-800 text-sm font-semibold mb-1">Welcome back 👋</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900">HR Management</h1>
            <p className="text-amber-800 text-sm mt-2 max-w-xs">
              Manage employee lifecycle — onboarding, offboarding, and everything in between.
            </p>
          </div>

          {/* Character illustration (SVG placeholder) */}
          <div className="hidden md:flex items-end justify-center">
            <svg width="100" height="110" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Body */}
              <rect x="28" y="55" width="44" height="48" rx="10" fill="#4f46e5" />
              {/* Head */}
              <circle cx="50" cy="38" r="20" fill="#fbbf24" />
              {/* Face */}
              <circle cx="43" cy="36" r="2.5" fill="#1e1b4b" />
              <circle cx="57" cy="36" r="2.5" fill="#1e1b4b" />
              <path d="M43 45 Q50 51 57 45" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Hat */}
              <rect x="30" y="20" width="40" height="6" rx="3" fill="#fbbf24" />
              <rect x="38" y="10" width="24" height="12" rx="4" fill="#fbbf24" />
              {/* Arms */}
              <rect x="8"  y="58" width="22" height="10" rx="5" fill="#4f46e5" />
              <rect x="70" y="58" width="22" height="10" rx="5" fill="#4f46e5" />
              {/* Laptop */}
              <rect x="34" y="64" width="32" height="22" rx="4" fill="#94a3b8" />
              <rect x="37" y="67" width="26" height="16" rx="2" fill="#1e293b" />
              <rect x="28" y="86" width="44" height="4"  rx="2" fill="#64748b" />
            </svg>
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/hr/employee-onboarding"
              className="flex items-center gap-2.5 bg-white/90 hover:bg-white text-amber-800 font-semibold text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <UserPlus size={17} className="text-amber-600" />
              Employee Onboarding
            </Link>
            <Link
              href="/hr/employee-offboarding"
              className="flex items-center gap-2.5 bg-white/90 hover:bg-white text-amber-800 font-semibold text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <UserMinus size={17} className="text-red-500" />
              Employee Offboarding
            </Link>
          </div>
        </div>

        {/* Tab strip */}
        <div className="relative z-10 mt-6">
          <div className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-amber-800 font-semibold text-sm px-4 py-2 rounded-xl cursor-pointer transition-all border border-amber-200">
            <FileText size={15} />
            All Requests ({REQUESTS.length})
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color} shrink-0`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium leading-tight mt-0.5">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Requests table ── */}
      <div className="card overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#4485d0]"
            />
            <svg className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
              All
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
              Today
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors">
              ↓
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["#", "Request Id & Date", "Request Details", "Manager", "Contact", "Type", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {REQUESTS.map((req, i) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-4 text-sm text-gray-500">{i + 1}</td>
                  <td className="px-4 py-4">
                    <Link href="#" className="text-[#4485d0] font-semibold hover:underline text-sm">{req.id}</Link>
                    <p className="text-xs text-gray-400 mt-0.5">{req.date}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-800 text-sm">{req.name}</p>
                    <p className="text-xs text-gray-400">For: {req.empId}</p>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">{req.manager}</td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-gray-600">{req.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{req.phone}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${req.type === "Onboarding" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                      {req.type}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[req.status]}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <circle cx="8" cy="2" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="8" cy="14" r="1.5"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
