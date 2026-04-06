import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { UsersRound, Shield, Plus } from "lucide-react";

export const metadata: Metadata = { title: "User Groups" };

const GROUPS = [
  { name: "IT Administrators", members: 5, permissions: "Full Access", role: "Admin" },
  { name: "IT Support", members: 12, permissions: "Read/Write", role: "Support" },
  { name: "HR Team", members: 8, permissions: "HR Modules", role: "HR" },
  { name: "End Users", members: 142, permissions: "Read Only", role: "User" },
  { name: "Managers", members: 18, permissions: "Approval Rights", role: "Manager" },
];

const ROLE_COLORS: Record<string, string> = {
  Admin: "text-red-600 bg-red-50",
  Support: "text-blue-600 bg-blue-50",
  HR: "text-purple-600 bg-purple-50",
  User: "text-gray-600 bg-gray-100",
  Manager: "text-orange-600 bg-orange-50",
};

export default function UserGroupsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="User Groups"
        description="Manage user groups, roles, and access permissions."
        actions={
          <button className="btn-primary flex items-center gap-2">
            <Plus size={15} />
            Create Group
          </button>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GROUPS.map((group, i) => (
          <div key={i} className="card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-primary/5">
                <UsersRound size={20} className="text-primary" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${ROLE_COLORS[group.role]}`}>
                {group.role}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{group.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{group.permissions}</p>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Shield size={12} className="text-gray-400" />
                {group.permissions}
              </div>
              <span className="text-sm font-bold text-primary">{group.members} members</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
