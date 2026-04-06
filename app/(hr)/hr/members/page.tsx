import type { Metadata } from "next";
import { UserPlus, Mail, Phone, Shield } from "lucide-react";

export const metadata: Metadata = { title: "HR Members" };

const HR_MEMBERS = [
  { name: "Meena K",          role: "HR Manager",          email: "meena@orionx.com",   phone: "9876543210", status: "Active",   joined: "Jan 2024" },
  { name: "Priya Sharma",     role: "HR Executive",        email: "priya@orionx.com",   phone: "9123456780", status: "Active",   joined: "Mar 2024" },
  { name: "Anita Rao",        role: "Talent Acquisition",  email: "anita@orionx.com",   phone: "9988776655", status: "Active",   joined: "Jun 2023" },
  { name: "Deepak Verma",     role: "HR Business Partner", email: "deepak@orionx.com",  phone: "9012345678", status: "Active",   joined: "Nov 2023" },
  { name: "Sonal Mehta",      role: "Payroll Specialist",  email: "sonal@orionx.com",   phone: "9765432100", status: "Active",   joined: "Feb 2024" },
];

const AVATAR_COLORS = [
  "bg-[#4485d0]","bg-pink-500","bg-purple-500","bg-indigo-500","bg-orange-500",
];

export default function HRMembersPage() {
  return (
    <div className="animate-fade-in space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">HR Members</h1>
          <p className="text-sm text-gray-500 mt-1">Active HR team members and their roles.</p>
        </div>
        <button className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90 shadow-sm w-fit" style={{ backgroundColor: "#4485d0" }}>
          <UserPlus size={15} /> Add HR Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Members", value: 5,  color: "text-[#4485d0] bg-blue-50" },
          { label: "Active",        value: 5,  color: "text-green-600 bg-green-50" },
          { label: "On Leave",      value: 0,  color: "text-yellow-600 bg-yellow-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
            <p className={`text-3xl font-extrabold ${s.color.split(" ")[0]}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {HR_MEMBERS.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm shadow`}>
                {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{m.name}</p>
                <p className="text-xs text-gray-500 truncate">{m.role}</p>
              </div>
              <Shield size={14} className="text-[#4485d0] shrink-0" />
            </div>
            <div className="space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><Mail size={12} className="text-gray-400" /><span className="truncate">{m.email}</span></div>
              <div className="flex items-center gap-2"><Phone size={12} className="text-gray-400" /><span>{m.phone}</span></div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Joined {m.joined}</span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">{m.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
