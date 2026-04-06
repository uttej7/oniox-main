"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, Bell, Search, LogOut, User, Settings,
  ChevronDown, BookOpen, X, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface HRHeaderProps {
  onMenuToggle: () => void;
  isCollapsed?: boolean;
}

// Primary HR colour (matches HRSidebar)
const HR_COLOR = "#4485d0";

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "HR Portal", path: "/hr/dashboard" }];
  let current = "";
  for (const part of parts) {
    current += `/${part}`;
    if (part === "hr") continue;
    crumbs.push({
      label: part.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      path: current,
    });
  }
  return crumbs;
}

const HR_NOTIFICATIONS = [
  { id: 1, title: "New Onboarding Request", desc: "REQ0004 submitted for John Doe", time: "5 min ago", unread: true },
  { id: 2, title: "Offboarding Initiated", desc: "REQ0003 — Meena Kachipuram relieved", time: "2 hr ago", unread: true },
  { id: 3, title: "Document Pending", desc: "Joining kit not uploaded for REQ0002", time: "1 day ago", unread: false },
];

export default function HRHeader({ onMenuToggle, isCollapsed }: HRHeaderProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = HR_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 px-4 md:px-6 h-16">

        {/* Toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-gray-500 transition-colors shrink-0 hover:bg-blue-50"
          style={{ color: undefined }}
          onMouseEnter={(e) => (e.currentTarget.style.color = HR_COLOR)}
          onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="lg:hidden"><Menu size={20} /></span>
          <span className="hidden lg:inline">
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </span>
        </button>

        {/* HR portal pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full shrink-0 border"
          style={{ backgroundColor: "#eef4fb", borderColor: "#c4d9f0" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: HR_COLOR }} />
          <span className="text-xs font-semibold" style={{ color: HR_COLOR }}>HR Portal</span>
        </div>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm flex-1">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && <ChevronDown size={12} className="text-gray-400 -rotate-90" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold" style={{ color: HR_COLOR }}>{crumb.label}</span>
              ) : (
                <Link href={crumb.path} className="text-gray-500 transition-colors hover:opacity-80"
                  style={{ color: undefined }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = HR_COLOR)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Mobile title */}
        <h1 className="md:hidden flex-1 font-semibold text-base truncate" style={{ color: HR_COLOR }}>
          {breadcrumbs[breadcrumbs.length - 1]?.label ?? "HR Dashboard"}
        </h1>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 ml-auto">

          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-52 animate-fade-in">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input autoFocus type="text" placeholder="Search HR..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 min-w-0" />
                <button
                  onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                  className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shrink-0 transition-colors"
                >
                  <X size={11} className="text-gray-500" />
                </button>
              </div>
            ) : (
              <button onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-gray-500 transition-colors hover:bg-blue-50"
                onMouseEnter={(e) => (e.currentTarget.style.color = HR_COLOR)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Knowledge Base */}
          <Link href="/hr/knowledge-base"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: HR_COLOR }}>
            <BookOpen size={15} />
            <span>Knowledge Base</span>
          </Link>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifications((p) => !p); setShowProfile(false); }}
              className="relative p-2 rounded-lg text-gray-500 transition-colors hover:bg-blue-50"
              onMouseEnter={(e) => (e.currentTarget.style.color = HR_COLOR)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: HR_COLOR }} />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm">HR Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-white text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: HR_COLOR }}>{unreadCount} new</span>
                  )}
                </div>
                <ul className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {HR_NOTIFICATIONS.map((n) => (
                    <li key={n.id} className={cn("px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors")}
                      style={n.unread ? { backgroundColor: "#eef4fb40" } : {}}>
                      <div className="flex items-start gap-2">
                        {n.unread && <span className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: HR_COLOR }} />}
                        <div className={cn(!n.unread && "ml-4")}>
                          <p className="text-sm font-medium text-gray-800">{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{n.desc}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                  <button className="text-xs font-medium hover:underline w-full text-center" style={{ color: HR_COLOR }}>
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile((p) => !p); setShowNotifications(false); }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow"
                style={{ background: `linear-gradient(135deg, ${HR_COLOR}, #2d6ab8)` }}>
                {user?.avatar ?? "HR"}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                {user?.name?.split(" ")[0] ?? "HR User"}
              </span>
              <ChevronDown size={14} className={cn("hidden md:block text-gray-400 transition-transform duration-200", showProfile && "rotate-180")} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{ color: HR_COLOR, backgroundColor: "#eef4fb", borderColor: "#c4d9f0" }}>
                    {user?.role}
                  </span>
                </div>
                <ul className="py-1">
                  <li>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.color = HR_COLOR)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
                      <User size={15} /> My Profile
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.color = HR_COLOR)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
                      <Settings size={15} /> Settings
                    </button>
                  </li>
                </ul>
                <div className="border-t border-gray-100 py-1">
                  <button onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={15} /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
