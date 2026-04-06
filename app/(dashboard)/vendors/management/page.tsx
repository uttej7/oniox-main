import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Vendor Management" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Vendor Management" />
      <ComingSoon title="Vendor Management" />
    </div>
  );
}
