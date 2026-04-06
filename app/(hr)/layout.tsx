"use client";

import React, { useState, useCallback } from "react";
import HRSidebar from "@/components/layout/HRSidebar";
import HRHeader from "@/components/layout/HRHeader";
import Footer from "@/components/layout/Footer";

export default function HRLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMenuToggle = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsCollapsed((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <HRSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={isCollapsed} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        <HRHeader onMenuToggle={handleMenuToggle} isCollapsed={isCollapsed} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col">
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
              {children}
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
