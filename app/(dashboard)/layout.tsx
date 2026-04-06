"use client";

import React, { useState, useCallback } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);     // mobile overlay
  const [isCollapsed, setIsCollapsed] = useState(true);     // desktop icon-only

  // Single toggle: on mobile opens the overlay; on desktop collapses the sidebar
  const handleMenuToggle = useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setIsCollapsed((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  }, []);

  const handleSidebarClose = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        isCollapsed={isCollapsed}
      />

      {/* Main content — fills remaining width automatically */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-300">
        <Header onMenuToggle={handleMenuToggle} isCollapsed={isCollapsed} />

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
