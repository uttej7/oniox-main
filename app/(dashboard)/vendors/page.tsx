import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { Briefcase, Package, ListOrdered, ArrowRight, Store } from "lucide-react";

export const metadata: Metadata = { title: "Vendors" };

const VENDORS_MOCK = [
  { name: "TechPro Solutions", category: "Hardware", status: "Active", contracts: 3 },
  { name: "CloudBase Inc.", category: "Software", status: "Active", contracts: 5 },
  { name: "SecureNet Ltd.", category: "Security", status: "Active", contracts: 2 },
  { name: "DataSync Corp.", category: "Storage", status: "Active", contracts: 1 },
];

const SECTIONS = [
  { title: "Vendor Management", icon: Briefcase, href: "/vendors/management", color: "text-blue-600 bg-blue-50" },
  { title: "Vendor Assets", icon: Package, href: "/vendors/assets", color: "text-green-600 bg-green-50" },
  { title: "Assets List", icon: ListOrdered, href: "/vendors/assets-list", color: "text-purple-600 bg-purple-50" },
];

export default function VendorsPage() {
  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader
        title="Vendors"
        description="Manage vendor relationships, assets, and contracts."
        actions={
          <button className="btn-primary flex items-center gap-2">
            <Store size={15} />
            Add Vendor
          </button>
        }
      />

      {/* Sub-section nav */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.href} href={s.href} className="card p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className={`p-2.5 rounded-xl ${s.color}`}>
                <Icon size={20} />
              </div>
              <span className="font-semibold text-gray-700 text-sm group-hover:text-primary transition-colors">{s.title}</span>
              <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>

      {/* Vendors table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Active Vendors</h2>
          <span className="text-xs font-semibold text-primary bg-primary/5 px-2.5 py-1 rounded-full">9 Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendor Name</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contracts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {VENDORS_MOCK.map((v, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5 font-medium text-gray-800">{v.name}</td>
                  <td className="px-5 py-3.5 text-gray-500">{v.category}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-gray-700 font-semibold">{v.contracts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
