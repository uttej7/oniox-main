import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "New Change Request" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="New Change Request" />
      <ComingSoon title="New Change Request" />
    </div>
  );
}
