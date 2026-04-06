import type { Metadata } from "next";
import { UserX, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Old HR Members" };

const OLD_MEMBERS = [
  { name: "Kiran Joshi",    role: "HR Executive",   email: "kiran.j@orionx.com",  relievedOn: "Dec 2023", tenure: "2 years",  reason: "Resignation" },
  { name: "Neha Gupta",    role: "HR Manager",     email: "neha.g@orionx.com",   relievedOn: "Oct 2023", tenure: "3 years",  reason: "Better Opportunity" },
  { name: "Arun Pillai",   role: "TA Specialist",  email: "arun.p@orionx.com",   relievedOn: "Aug 2023", tenure: "1.5 years",reason: "Relocation" },
];

const REASON_COLORS: Record<string, string> = {
  Resignation:         "bg-red-50 text-red-600 border-red-100",
  "Better Opportunity":"bg-orange-50 text-orange-600 border-orange-100",
  Relocation:          "bg-blue-50 text-blue-600 border-blue-100",
};

export default function OldHRMembersPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Old HR Members</h1>
          <p className="text-sm text-gray-500 mt-1">Former HR team members who have been relieved.</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl w-fit">
          <UserX size={15} /> {OLD_MEMBERS.length} Former Members
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["#","Name","Role","Email","Tenure","Relieved On","Reason"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {OLD_MEMBERS.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold shrink-0">
                        {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="font-semibold text-gray-700">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{m.role}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{m.email}</td>
                  <td className="px-5 py-4 text-gray-500">{m.tenure}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Calendar size={12} className="text-gray-400" /> {m.relievedOn}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${REASON_COLORS[m.reason]}`}>
                      {m.reason}
                    </span>
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
