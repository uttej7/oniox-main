import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import { AlertTriangle, FileText, BookOpen, Laptop, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "IT" };

const IT_SECTIONS = [
  {
    title: "Incidents",
    description: "Track and resolve IT incidents reported across the organization.",
    icon: AlertTriangle,
    href: "/it/incidents",
    color: "text-red-500 bg-red-50",
    count: 2,
    label: "Active",
  },
  {
    title: "Service Requests",
    description: "Manage employee service requests and fulfillment workflows.",
    icon: FileText,
    href: "/it/service-requests",
    color: "text-blue-500 bg-blue-50",
    count: 1,
    label: "Active",
  },
  {
    title: "Catalog",
    description: "Browse and order from the IT service catalog.",
    icon: BookOpen,
    href: "/it/catalog",
    color: "text-purple-500 bg-purple-50",
    count: 26,
    label: "Items",
  },
  {
    title: "IT Assets",
    description: "View and manage all IT hardware and software assets.",
    icon: Laptop,
    href: "/it/assets",
    color: "text-green-500 bg-green-50",
    count: 182,
    label: "Total",
  },
];

export default function ITPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="IT Management"
        description="Manage incidents, requests, catalog and IT assets from one place."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {IT_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="card p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${section.color}`}>
                  <Icon size={22} />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{section.count}</p>
                  <p className="text-xs text-gray-500 font-medium">{section.label}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                View Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
