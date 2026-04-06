import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { UserPlus, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = { title: "Employee OnBoarding" };

const STEPS = [
  { step: 1, title: "Account Creation", desc: "Create AD, email, and system accounts", status: "completed" },
  { step: 2, title: "Hardware Assignment", desc: "Assign laptop, peripherals and accessories", status: "completed" },
  { step: 3, title: "Software Installation", desc: "Install required tools and applications", status: "in-progress" },
  { step: 4, title: "Access Provisioning", desc: "Grant access to required systems and tools", status: "pending" },
  { step: 5, title: "IT Orientation", desc: "Conduct IT orientation and security briefing", status: "pending" },
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

export default function EmployeeOnboardingPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Employee OnBoarding"
        description="Streamline the onboarding process for new employees."
        actions={
          <button className="btn-primary flex items-center gap-2">
            <UserPlus size={15} />
            Start Onboarding
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Onboardings", count: 0, color: "text-primary" },
          { label: "Completed This Month", count: 4, color: "text-green-600" },
          { label: "Avg. Time to Complete", count: "3 days", color: "text-orange-500" },
        ].map((s, i) => (
          <div key={i} className="card p-5 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="card p-6">
        <h2 className="font-semibold text-gray-800 mb-5">Standard Onboarding Checklist</h2>
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
