import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Employee Directory" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Employee Directory" />
      <ComingSoon title="Employee Directory" />
    </div>
  );
}
