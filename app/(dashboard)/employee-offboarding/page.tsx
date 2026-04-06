import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { UserMinus, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = { title: "Employee OffBoarding" };

const STEPS = [
  { step: 1, title: "Asset Recovery", desc: "Collect all company devices and equipment", status: "completed" },
  { step: 2, title: "Account Deactivation", desc: "Disable AD, email, and all system accounts", status: "completed" },
  { step: 3, title: "Access Revocation", desc: "Remove access to all systems and applications", status: "in-progress" },
  { step: 4, title: "Data Backup", desc: "Backup and transfer critical employee data", status: "pending" },
  { step: 5, title: "Exit Documentation", desc: "Complete IT exit checklist and sign-off", status: "pending" },
];

const ICON_MAP = {
  completed: CheckCircle,
  "in-progress": Clock,
  pending: AlertCircle,
};
const COLOR_MAP = {
  completed: "text-green-500",
  "in-progress": "text-blue-500",
  pending: "text-gray-300",
};

export default function EmployeeOffboardingPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Employee OffBoarding"
        description="Securely offboard departing employees and recover assets."
        actions={
          <button className="btn-primary flex items-center gap-2">
            <UserMinus size={15} />
            Start OffBoarding
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active OffBoardings", count: 0, color: "text-primary" },
          { label: "Completed This Month", count: 2, color: "text-green-600" },
          { label: "Pending Asset Recovery", count: 0, color: "text-orange-500" },
        ].map((s, i) => (
          <div key={i} className="card p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-5">Standard OffBoarding Checklist</h2>
        <ol className="relative border-l border-gray-200 space-y-6 ml-3">
          {STEPS.map((item) => {
            const Icon = ICON_MAP[item.status as keyof typeof ICON_MAP];
            const color = COLOR_MAP[item.status as keyof typeof COLOR_MAP];
            return (
              <li key={item.step} className="ml-6">
                <span className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-white ring-2 ring-gray-200 ${color}`}>
                  <Icon size={16} />
                </span>
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
