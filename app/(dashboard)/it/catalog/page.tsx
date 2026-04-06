import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "IT Catalog" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="IT Catalog" />
      <ComingSoon title="IT Catalog" />
    </div>
  );
}
