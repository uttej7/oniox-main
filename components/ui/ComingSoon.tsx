import React from "react";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export default function ComingSoon({
  title,
  description = "This section is currently under development. Check back soon!",
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
        <Construction size={36} className="text-primary/40" />
      </div>
      <h2 className="text-xl font-bold text-gray-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-400 max-w-sm">{description}</p>
    </div>
  );
}
