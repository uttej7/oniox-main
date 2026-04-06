import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Vendor Assets" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Vendor Assets" />
      <ComingSoon title="Vendor Assets" />
    </div>
  );
}
