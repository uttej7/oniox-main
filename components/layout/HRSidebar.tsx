"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, UserPlus, UserMinus,
  ChevronDown, X, UserCheck, UserX,
  Settings, MessageSquare, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import hrSidebarItems from "@/data/hrSidebarItems.json";
import { useAuth } from "@/context/AuthContext";

/* ── Brand colours ───────────────────────────────────────────────────────── */
const HR_COLOR  = "#4485d0";          // primary blue
const HR_STRIP  = "#0e2548";          // icon-strip bg  (very dark navy)
const HR_PANEL  = "#142f5e";          // text-panel bg  (slightly lighter navy)

/* ── Icon map ────────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Users, UserPlus, UserMinus, UserCheck, UserX,
};

/* ── Types ───────────────────────────────────────────────────────────────── */
interface HRItem {
  id: string; label: string; icon: string; path: string;
  badge: string | null; children: HRItem[];
}
interface HRSidebarProps {
  isOpen: boolean; onClose: () => void; isCollapsed: boolean;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Flyout portal – shown when hovering an icon in the collapsed strip
   ═══════════════════════════════════════════════════════════════════════════ */
function CollapsedFlyout({
  item, anchorTop, onClose, onMouseEnter, onMouseLeave,
}: {
  item: HRItem; anchorTop: number; onClose: () => void;
  onMouseEnter: () => void; onMouseLeave: () => void;
}) {
  const pathname = usePathname();
  const hasChildren = item.children.length > 0;
  const maxH = typeof window !== "undefined" ? window.innerHeight : 600;
  const estimatedH = hasChildren ? 56 + item.children.length * 40 : 36;
  const top = Math.min(anchorTop, maxH - estimatedH - 16);

  return createPortal(
    <div
      style={{ top, left: 58 }}
      className="fixed z-[9999] animate-fade-in"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {hasChildren ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[200px]">
          <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 mb-1">
            {item.label}
          </p>
          {item.children.map((child) => {
            const ChildIcon = ICON_MAP[child.icon] ?? Users;
            const isActive = pathname === child.path || pathname.startsWith(child.path + "/");
            return (
              <Link
                key={child.id}
                href={child.path}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ color: isActive ? HR_COLOR : "#374151" }}
              >
                <ChildIcon size={15} style={{ color: isActive ? HR_COLOR : "#9ca3af" }} />
                {child.label}
              </Link>
            );
          })}
        </div>
      ) : (
        /* Simple tooltip for leaf items */
        <div className="flex items-center">
          <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900" />
          <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            {item.label}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Strip nav item – icon only, with flyout on hover (collapsed desktop)
   ═══════════════════════════════════════════════════════════════════════════ */
function StripNavItem({ item, onClose }: { item: HRItem; onClose: () => void }) {
  const pathname = usePathname();
  const Icon = ICON_MAP[item.icon] ?? Users;
  const hasChildren = item.children.length > 0;
  const liRef = useRef<HTMLLIElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const [anchorTop, setAnchorTop] = useState<number | null>(null);

  const isActive =
    pathname === item.path || pathname.startsWith(item.path + "/") ||
    (hasChildren && item.children.some((c) => pathname === c.path || pathname.startsWith(c.path + "/")));

  const showFlyout = () => {
    clearTimeout(hideTimer.current);
    if (liRef.current) setAnchorTop(liRef.current.getBoundingClientRect().top);
  };
  const hideFlyout = () => { hideTimer.current = setTimeout(() => setAnchorTop(null), 80); };
  const keepFlyout = () => clearTimeout(hideTimer.current);
  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const iconBtn = (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: isActive ? HR_COLOR : "transparent",
        color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
      }}
    >
      <Icon size={18} />
    </div>
  );

  return (
    <li ref={liRef} onMouseEnter={showFlyout} onMouseLeave={hideFlyout} className="w-full">
      {hasChildren ? (
        <button className="w-full" aria-label={item.label}>{iconBtn}</button>
      ) : (
        <Link href={item.path} onClick={onClose} aria-label={item.label} className="block">
          {iconBtn}
        </Link>
      )}
      {anchorTop !== null && (
        <CollapsedFlyout
          item={item}
          anchorTop={anchorTop}
          onClose={() => { setAnchorTop(null); onClose(); }}
          onMouseEnter={keepFlyout}
          onMouseLeave={() => setAnchorTop(null)}
        />
      )}
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Text-panel nav item (expanded state)
   ═══════════════════════════════════════════════════════════════════════════ */
function NavItem({ item, depth = 0, onClose }: { item: HRItem; depth?: number; onClose: () => void }) {
  const pathname = usePathname();
  const hasChildren = item.children.length > 0;
  const Icon = ICON_MAP[item.icon] ?? Users;

  const isActive   = !hasChildren && (pathname === item.path || pathname.startsWith(item.path + "/"));
  const isParent   = hasChildren && item.children.some((c) => pathname === c.path || pathname.startsWith(c.path + "/"));
  const [open, setOpen] = useState(isParent);
  useEffect(() => { if (isParent) setOpen(true); }, [isParent]);

  /* Shared inline-style helpers */
  const parentStyle = isParent
    ? { color: "#fff", backgroundColor: "rgba(255,255,255,0.12)" }
    : { color: "rgba(255,255,255,0.65)", backgroundColor: "transparent" };

  const leafStyle = isActive
    ? { backgroundColor: HR_COLOR, color: "#fff" }
    : { backgroundColor: "transparent", color: "rgba(255,255,255,0.65)" };

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setOpen((p) => !p)}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 select-none",
            depth === 0 ? "py-2.5" : "py-2 text-xs"
          )}
          style={parentStyle}
          onMouseEnter={(e) => { if (!isParent) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={(e) => { if (!isParent) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
        >
          <Icon size={depth === 0 ? 17 : 15}
            style={{ color: isParent ? HR_COLOR : "rgba(255,255,255,0.4)", flexShrink: 0 }} />
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: HR_COLOR }}>{item.badge}</span>
          )}
          <ChevronDown
            size={13}
            style={{ opacity: 0.45, flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
          />
        </button>
        {open && (
          <ul
            className="mt-0.5 space-y-0.5 pl-3 ml-3 border-l"
            style={{ borderColor: "rgba(255,255,255,0.12)" }}
          >
            {item.children.map((child) => (
              <NavItem key={child.id} item={child} depth={depth + 1} onClose={onClose} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.path}
        onClick={onClose}
        className={cn(
          "flex items-center gap-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200",
          depth === 0 ? "py-2.5" : "py-2 text-xs"
        )}
        style={leafStyle}
        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)"; }}
        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
      >
        <Icon size={depth === 0 ? 17 : 15}
          style={{ color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.38)", flexShrink: 0 }} />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: HR_COLOR }}>{item.badge}</span>
        )}
      </Link>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Root sidebar
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HRSidebar({ isOpen, onClose, isCollapsed }: HRSidebarProps) {
  const { user, logout } = useAuth();
  const items = hrSidebarItems as HRItem[];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Avatar initial */
  const initials = user?.avatar ?? user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) ?? "HR";

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          /* Positioning */
          "fixed top-0 left-0 z-50 h-full flex shadow-sidebar overflow-hidden",
          "transition-all duration-300 ease-in-out",
          "lg:static lg:z-auto",
          /* Mobile: slides from left */
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          /* Width: mobile always full, desktop collapses to strip only */
          "w-[252px]",
          isCollapsed ? "lg:w-[52px]" : "lg:w-[252px]"
        )}
      >
        {/* ══════════════════════════════════════════════════════════════════
            LEFT ICON STRIP  (always visible on desktop even when collapsed)
            ══════════════════════════════════════════════════════════════════ */}
        <div
          className="w-[52px] shrink-0 flex flex-col items-center py-3"
          style={{ backgroundColor: HR_STRIP }}
        >
          {/* Brand logo */}
          <Link
            href="/hr/dashboard"
            className="w-9 h-9 rounded-xl overflow-hidden mb-3 ring-2 ring-white/20 hover:ring-white/45 transition-all shrink-0"
          >
            <Image src="/logo.svg" alt="OrionX" width={36} height={36} className="w-full h-full object-cover" priority />
          </Link>

          {/* Top divider */}
          <div className="w-6 h-px mb-3" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

          {/* Nav icons — with flyout on hover in collapsed desktop mode */}
          <ul className="flex flex-col items-center gap-1.5 w-full px-1.5 flex-1">
            {items.map((item) => (
              <StripNavItem key={item.id} item={item} onClose={onClose} />
            ))}
          </ul>

          {/* Bottom icons */}
          <div className="flex flex-col items-center gap-1.5 px-1.5 mt-auto pt-3">
            {/* Bottom divider */}
            <div className="w-6 h-px mb-1" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

            {[
              { Icon: Settings, label: "Settings" },
              { Icon: MessageSquare, label: "Messages" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                title={label}
                aria-label={label}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-150"
                style={{ color: "rgba(255,255,255,0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Icon size={17} />
              </button>
            ))}

            {/* User avatar in strip */}
            <div
              title={user?.name ?? "HR User"}
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white/25 cursor-pointer mt-0.5 select-none"
              style={{ backgroundColor: HR_COLOR, color: "#fff" }}
            >
              {initials}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT TEXT PANEL  (hidden in collapsed desktop, always on mobile)
            ══════════════════════════════════════════════════════════════════ */}
        <div
          className={cn(
            "flex-1 flex flex-col overflow-hidden",
            /* Hide on desktop when collapsed, always visible on mobile */
            isCollapsed ? "lg:hidden" : "flex"
          )}
          style={{ backgroundColor: HR_PANEL }}
        >
          {/* ── Panel header ── */}
          <div
            className="flex items-center gap-3 px-4 py-4 shrink-0 border-b"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[15px] leading-none tracking-wide">OrionX</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: HR_COLOR }} />
                <p className="text-[9px] font-bold tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
                  HR Portal
                </p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Navigation ── */}
          <nav className="flex-1 overflow-y-auto py-3 px-2.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <p
              className="text-[9px] font-bold uppercase tracking-[0.15em] px-3 mb-2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Menu
            </p>
            <ul className="space-y-0.5">
              {items.map((item) => (
                <NavItem key={item.id} item={item} depth={0} onClose={onClose} />
              ))}
            </ul>
          </nav>

          {/* ── User footer ── */}
          <div
            className="px-3 py-3 border-t shrink-0"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-white/20"
                style={{ backgroundColor: HR_COLOR, color: "#fff" }}
              >
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[12px] font-semibold truncate">{user?.name ?? "HR User"}</p>
                <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {user?.role ?? "HR Manager"}
                </p>
              </div>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-lg transition-colors shrink-0"
                style={{ color: "rgba(255,255,255,0.38)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.38)"; }}
              >
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
