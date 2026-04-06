import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { Plus, AlertCircle } from "lucide-react";

export const metadata: Metadata = { title: "Problem Management" };

const PROBLEMS = [
  { id: "PRB-0008", title: "Recurring email delivery failures", category: "Email", impact: "High", status: "Root Cause Analysis", opened: "Mar 15, 2026" },
  { id: "PRB-0007", title: "VPN performance degradation", category: "Network", impact: "Medium", status: "Known Error", opened: "Mar 10, 2026" },
  { id: "PRB-0006", title: "Database connection timeouts", category: "Database", impact: "High", status: "In Investigation", opened: "Mar 5, 2026" },
  { id: "PRB-0005", title: "Print server instability", category: "Print", impact: "Low", status: "Resolved", opened: "Feb 28, 2026" },
];

const STATUS_COLORS: Record<string, string> = {
  "Root Cause Analysis": "text-orange-600 bg-orange-50 border-orange-100",
  "Known Error": "text-yellow-600 bg-yellow-50 border-yellow-100",
  "In Investigation": "text-blue-600 bg-blue-50 border-blue-100",
  Resolved: "text-green-600 bg-green-50 border-green-100",
};

const IMPACT_COLORS: Record<string, string> = {
  High: "text-red-600 bg-red-50",
  Medium: "text-orange-600 bg-orange-50",
  Low: "text-blue-600 bg-blue-50",
};

export default function ProblemManagementPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Problem Management"
        description="Identify, analyze, and resolve root causes of recurring incidents."
        actions={
          <button className="btn-primary flex items-center gap-2">
            <Plus size={15} />
            Log Problem
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Open Problems", count: 3, color: "text-primary", icon: AlertCircle },
          { label: "Under Investigation", count: 2, color: "text-blue-600", icon: AlertCircle },
          { label: "Known Errors", count: 1, color: "text-yellow-600", icon: AlertCircle },
        ].map((s, i) => (
          <div key={i} className="card p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gray-50`}>
              <s.icon size={20} className={s.color} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Problem ID", "Title", "Category", "Impact", "Status", "Opened"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PROBLEMS.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-mono text-xs text-primary font-semibold">{p.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-800 max-w-[200px] truncate">{p.title}</td>
                  <td className="px-5 py-3.5 text-gray-500">{p.category}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${IMPACT_COLORS[p.impact]}`}>{p.impact}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{p.opened}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
