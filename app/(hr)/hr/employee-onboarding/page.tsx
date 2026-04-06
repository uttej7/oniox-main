import type { Metadata } from "next";
import { UserPlus, CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";

export const metadata: Metadata = { title: "Employee OnBoarding" };

const ONBOARDING_LIST = [
  { id: "REQ0003", name: "Finn Allen",   dept: "Engineering", manager: "Kamal Manohar Rao J", joinDate: "06 Mar 2026", status: "Joined",    progress: 100 },
  { id: "REQ0004", name: "Ravi Kumar",   dept: "IT",          manager: "Kamal Manohar Rao J", joinDate: "07 Mar 2026", status: "In Progress",progress: 60  },
  { id: "REQ0005", name: "Sara Thomas",  dept: "HR",          manager: "Meena K",             joinDate: "10 Mar 2026", status: "Pending",   progress: 20  },
];

const STATUS_STYLES: Record<string, { badge: string; icon: React.ElementType; bar: string }> = {
  Joined:       { badge: "bg-green-100 text-green-700 border-green-200",  icon: CheckCircle, bar: "bg-green-500"  },
  "In Progress":{ badge: "bg-blue-100  text-blue-700  border-blue-200",   icon: Clock,       bar: "bg-blue-500"   },
  Pending:      { badge: "bg-yellow-100 text-yellow-700 border-yellow-200",icon: AlertCircle, bar: "bg-yellow-400" },
};

const CHECKLIST = [
  "Offer letter sent",
  "Account credentials created",
  "Hardware assigned",
  "Software installed",
  "Access provisioned",
  "IT orientation completed",
  "Joining kit uploaded",
];

export default function HROnboardingPage() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employee OnBoarding</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage new employee onboarding requests.</p>
        </div>
        <button className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90 shadow-sm w-fit" style={{ backgroundColor: "#4485d0" }}>
          <UserPlus size={15} /> New Onboarding
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total",       value: 3, color: "text-gray-700"  },
          { label: "Joined",      value: 1, color: "text-green-600" },
          { label: "In Progress", value: 2, color: "text-blue-600"  },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Onboarding list */}
        <div className="xl:col-span-2 space-y-4">
          {ONBOARDING_LIST.map((emp) => {
            const s = STATUS_STYLES[emp.status];
            const Icon = s.icon;
            return (
              <div key={emp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-sm shrink-0" style={{ color: "#4485d0" }}>
                      {emp.name.split(" ").map((n) => n[0]).join("")}
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
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <FileText size={10} /> {emp.id}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">Onboarding Progress</span>
                    <span className="font-bold text-gray-700">{emp.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${s.bar}`} style={{ width: `${emp.progress}%` }} />
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-400">Join Date: <span className="font-medium text-gray-600">{emp.joinDate}</span></div>
              </div>
            );
          })}
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit">
          <h2 className="font-semibold text-gray-800 mb-4">Onboarding Checklist</h2>
          <ul className="space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${i < 4 ? "bg-green-500" : "bg-gray-200"}`}>
                  {i < 4 && <CheckCircle size={12} className="text-white" />}
                </div>
                <span className={`text-sm ${i < 4 ? "text-gray-700 line-through" : "text-gray-500"}`}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
