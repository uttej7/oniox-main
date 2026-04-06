import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "All Requests" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="All Change Requests" />
      <ComingSoon title="All Change Requests" />
    </div>
  );
}
