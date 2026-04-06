import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ComingSoon from "@/components/ui/ComingSoon";
export const metadata: Metadata = { title: "My Requests" };
export default function Page() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="My Requests" />
      <ComingSoon title="My Requests" />
    </div>
  );
}
