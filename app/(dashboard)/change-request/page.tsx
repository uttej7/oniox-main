import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { Plus, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = { title: "Change Request" };

const CHANGES = [
  { id: "CHG-0015", title: "Network Switch Replacement", type: "Normal", risk: "Medium", status: "In Progress", date: "Apr 2, 2026" },
  { id: "CHG-0014", title: "Firewall Rule Update", type: "Standard", risk: "Low", status: "Approved", date: "Mar 31, 2026" },
  { id: "CHG-0013", title: "ERP System Upgrade", type: "Major", risk: "High", status: "Pending Review", date: "Apr 5, 2026" },
  { id: "CHG-0012", title: "Email Server Migration", type: "Normal", risk: "High", status: "Completed", date: "Mar 25, 2026" },
  { id: "CHG-0011", title: "SSL Certificate Renewal", type: "Standard", risk: "Low", status: "Completed", date: "Mar 20, 2026" },
];

const STATUS_COLORS: Record<string, string> = {
  "In Progress": "text-blue-600 bg-blue-50 border-blue-100",
  Approved: "text-green-600 bg-green-50 border-green-100",
  "Pending Review": "text-yellow-600 bg-yellow-50 border-yellow-100",
  Completed: "text-gray-600 bg-gray-100 border-gray-200",
};

const RISK_COLORS: Record<string, string> = {
  High: "text-red-600 bg-red-50",
  Medium: "text-orange-600 bg-orange-50",
  Low: "text-green-600 bg-green-50",
};

export default function ChangeRequestPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Change Requests"
        description="Plan, track, and manage IT change requests."
        actions={
          <div className="flex gap-2">
            <Link href="/change-request/calendar" className="btn-secondary flex items-center gap-2">
              <Calendar size={15} />
              Calendar
            </Link>
            <button className="btn-primary flex items-center gap-2">
              <Plus size={15} />
              New Request
            </button>
          </div>
        }
      />
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Change ID", "Title", "Type", "Risk", "Status", "Planned Date"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CHANGES.map((ch) => (
                <tr key={ch.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-mono text-xs text-primary font-semibold">{ch.id}</td>
                  <td className="px-5 py-3.5 font-medium text-gray-800 max-w-[200px] truncate">{ch.title}</td>
                  <td className="px-5 py-3.5 text-gray-500">{ch.type}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${RISK_COLORS[ch.risk]}`}>{ch.risk}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_COLORS[ch.status]}`}>{ch.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{ch.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
