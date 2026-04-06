import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "Knowledge Base" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Knowledge Base" />
      <ComingSoon title="Knowledge Base" />
    </div>
  );
}
