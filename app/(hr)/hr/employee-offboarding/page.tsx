import type { Metadata } from "next";
import { UserMinus, CheckCircle, Clock, AlertCircle, Package } from "lucide-react";

export const metadata: Metadata = { title: "Employee OffBoarding" };

const OFFBOARDING_LIST = [
  { id: "REQ0002", name: "Meena Kachipuram", dept: "Sales",   manager: "Kamal Manohar Rao J", lastDay: "06 Mar 2026", status: "Initiated",   progress: 30  },
  { id: "REQ0001", name: "Arjun Singh",      dept: "IT",      manager: "Abinash Mishra",      lastDay: "28 Feb 2026", status: "Completed",   progress: 100 },
];

const STATUS_STYLES: Record<string, { badge: string; icon: React.ElementType; bar: string }> = {
  Initiated:  { badge: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: AlertCircle, bar: "bg-yellow-400" },
  "In Review":{ badge: "bg-blue-100 text-blue-700 border-blue-200",       icon: Clock,       bar: "bg-blue-500"   },
  Completed:  { badge: "bg-green-100 text-green-700 border-green-200",    icon: CheckCircle, bar: "bg-green-500"  },
};

const CHECKLIST = [
  "Exit interview scheduled",
  "Asset recovery initiated",
  "Access revocation started",
  "Email deactivated",
  "Data backup completed",
  "Payroll settlement done",
  "Experience letter issued",
];

export default function HROffboardingPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employee OffBoarding</h1>
          <p className="text-sm text-gray-500 mt-1">Manage departing employee offboarding requests.</p>
        </div>
        <button className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90 shadow-sm w-fit" style={{ backgroundColor: "#4485d0" }}>
          <UserMinus size={15} /> Start OffBoarding
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total",     value: 2, color: "text-gray-700"  },
          { label: "Initiated", value: 1, color: "text-yellow-600"},
          { label: "Completed", value: 1, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          {OFFBOARDING_LIST.map((emp) => {
            const s = STATUS_STYLES[emp.status];
            const Icon = s.icon;
            return (
              <div key={emp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-sm shrink-0" style={{ color: "#4485d0" }}>
                      {emp.name.split(" ").map((n) => n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{emp.name}</p>
                      <p className="text-xs text-gray-500">{emp.dept} · {emp.manager}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${s.badge}`}>
                      <Icon size={11} /> {emp.status}
                    </span>
                    <span className="text-[10px] text-gray-400">{emp.id}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Offboarding Progress</span>
                    <span className="font-bold text-gray-700">{emp.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${s.bar}`} style={{ width: `${emp.progress}%` }} />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400">Last Day: <span className="font-medium text-gray-600">{emp.lastDay}</span></div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Package size={16} className="text-red-500" />
            <h2 className="font-semibold text-gray-800">OffBoarding Checklist</h2>
          </div>
          <ul className="space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 3 ? "bg-green-500" : "bg-gray-200"}`}>
                  {i < 3 && <CheckCircle size={12} className="text-white" />}
                </div>
                <span className={`text-sm ${i < 3 ? "text-gray-700 line-through" : "text-gray-500"}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
