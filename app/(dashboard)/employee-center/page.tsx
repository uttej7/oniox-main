import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { ClipboardList, CheckSquare, BookMarked, ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Employee Center" };

const MY_REQUESTS = [
  { id: "REQ-001", title: "Laptop Upgrade Request", type: "Hardware", status: "Pending", date: "Mar 28, 2026" },
  { id: "REQ-002", title: "Adobe Creative Cloud License", type: "Software", status: "Approved", date: "Mar 25, 2026" },
  { id: "REQ-003", title: "VPN Access for Remote Work", type: "Access", status: "Resolved", date: "Mar 20, 2026" },
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Approved: "text-green-600 bg-green-50 border-green-200",
  Resolved: "text-blue-600 bg-blue-50 border-blue-200",
};

const QUICK_LINKS = [
  { title: "My Requests", icon: ClipboardList, href: "/employee-center/my-requests", color: "bg-blue-50 text-blue-600" },
  { title: "Approvals", icon: CheckSquare, href: "/employee-center/approvals", color: "bg-green-50 text-green-600" },
  { title: "Knowledge Base", icon: BookMarked, href: "/employee-center/knowledge-base", color: "bg-purple-50 text-purple-600" },
];

export default function EmployeeCenterPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader title="Employee Center" description="Your personal hub for IT requests and self-service." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {QUICK_LINKS.map((ql) => {
          const Icon = ql.icon;
          return (
            <Link key={ql.href} href={ql.href} className="card p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className={`p-3 rounded-xl ${ql.color}`}><Icon size={20} /></div>
              <span className="font-semibold text-gray-700 group-hover:text-primary transition-colors">{ql.title}</span>
              <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>

      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">My Recent Requests</h2>
          <Clock size={16} className="text-gray-400" />
        </div>
        <ul className="divide-y divide-gray-50">
          {MY_REQUESTS.map((req) => (
            <li key={req.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{req.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{req.id} · {req.type} · {req.date}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${STATUS_COLORS[req.status]}`}>{req.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
