import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Incidents" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Incidents" />
      <ComingSoon title="Incidents" />
    </div>
  );
}
