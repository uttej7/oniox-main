"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  Search,
  LogOut,
  User,
  Settings,
  ChevronDown,
  BookOpen,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle: () => void;
  isCollapsed?: boolean;
}

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", path: "/" }];
  let currentPath = "";
  for (const part of parts) {
    currentPath += `/${part}`;
    crumbs.push({
      label: part
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      path: currentPath,
    });
  }
  return crumbs;
}

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "New Incident Request", desc: "Incident #INC-0042 has been assigned to you", time: "2 min ago", unread: true },
  { id: 2, title: "Catalog Request Approved", desc: "Your request for MacBook Pro has been approved", time: "1 hr ago", unread: true },
  { id: 3, title: "Change Request Updated", desc: "CHG-0015 status changed to In Progress", time: "3 hr ago", unread: false },
];

export default function Header({ onMenuToggle, isCollapsed }: HeaderProps) {
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
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 px-4 md:px-6 h-16">

        {/* ── Menu / Collapse toggle — visible on ALL screen sizes ── */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors shrink-0"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {/* Mobile: always show Menu; Desktop: show panel icons based on collapsed */}
          <span className="lg:hidden">
            <Menu size={20} />
          </span>
          <span className="hidden lg:inline">
            {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
          </span>
        </button>

        {/* Breadcrumb */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm flex-1">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <ChevronDown size={12} className="text-gray-400 -rotate-90" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-primary">{crumb.label}</span>
              ) : (
                <Link href={crumb.path} className="text-gray-500 hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Page title (mobile) */}
        <h1 className="md:hidden flex-1 font-semibold text-primary text-base truncate">
          {breadcrumbs[breadcrumbs.length - 1]?.label ?? "Dashboard"}
        </h1>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 w-56 animate-fade-in">
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none flex-1 w-full"
                />
                <button
                  onClick={() => { setShowSearch(false); setSearchQuery(""); }}
                  className="w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shrink-0 transition-colors"
                >
                  <X size={11} className="text-gray-500" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Knowledge Base */}
          <Link
            href="/employee-center/knowledge-base"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <BookOpen size={15} />
            <span>Knowledge Base</span>
          </Link>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotifications((p) => !p); setShowProfile(false); }}
              className="relative p-2 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800 text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <ul className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <li key={n.id} className={cn("px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors", n.unread && "bg-blue-50/50")}>
                      <div className="flex items-start gap-2">
                        {n.unread && <span className="mt-1.5 w-2 h-2 bg-primary rounded-full shrink-0" />}
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
                  <button className="text-xs text-primary font-medium hover:underline w-full text-center">
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
              aria-label="Profile menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow">
                {user?.avatar ?? "U"}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                {user?.name?.split(" ")[0] ?? "User"}
              </span>
              <ChevronDown size={14} className={cn("hidden md:block text-gray-400 transition-transform duration-200", showProfile && "rotate-180")} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {user?.role}
                  </span>
                </div>
                <ul className="py-1">
                  <li>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                      <User size={15} /> My Profile
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors">
                      <Settings size={15} /> Settings
                    </button>
                  </li>
                </ul>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
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
