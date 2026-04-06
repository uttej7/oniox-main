import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Roles" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Roles" />
      <ComingSoon title="Roles" />
    </div>
  );
}
