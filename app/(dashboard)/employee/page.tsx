import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { UserPlus, Mail, Phone } from "lucide-react";

export const metadata: Metadata = { title: "Employee" };

const EMPLOYEES = [
  { name: "Kamal Manohar Rao J", role: "IT Administrator", dept: "IT", email: "kamal@orionx.com", status: "Active" },
  { name: "Abinash Mishra", role: "IT Manager", dept: "IT", email: "abinash@orionx.com", status: "Active" },
  { name: "Sania Patel", role: "HR Manager", dept: "HR", email: "sania@orionx.com", status: "Active" },
  { name: "Ravi Kumar", role: "Network Engineer", dept: "IT", email: "ravi@orionx.com", status: "Active" },
  { name: "Meera Nair", role: "Software Developer", dept: "Engineering", email: "meera@orionx.com", status: "Active" },
  { name: "John Thomas", role: "Support Analyst", dept: "IT", email: "john@orionx.com", status: "InActive" },
];

const AVATAR_COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500",
  "bg-orange-500", "bg-teal-500", "bg-rose-500",
];

export default function EmployeePage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Employees"
        description="Manage your organization's workforce directory."
        actions={
          <button className="btn-primary flex items-center gap-2">
            <UserPlus size={15} />
            Add Employee
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EMPLOYEES.map((emp, i) => (
          <div key={i} className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shadow`}>
                {emp.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.role}</p>
              </div>
            </div>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <Mail size={12} className="text-gray-400" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="text-gray-400" />
                <span>+91 98765 43210</span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">{emp.dept}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${emp.status === "Active" ? "text-green-600 bg-green-50 border-green-100" : "text-red-500 bg-red-50 border-red-100"}`}>
                {emp.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
