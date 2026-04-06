import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Change Calendar" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Change Calendar" />
      <ComingSoon title="Change Calendar" />
    </div>
  );
}
