"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Monitor, Users, Building2, Store, UsersRound,
  GitBranch, UserPlus, UserMinus, AlertCircle, ChevronRight,
  AlertTriangle, FileText, BookOpen, Laptop, List, BookUser,
  Building, ClipboardList, CheckSquare, BookMarked, Briefcase,
  Package, ListOrdered, Shield, Lock, Plus, Calendar, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import sidebarItemsData from "@/data/sidebarItems.json";
import { useAuth } from "@/context/AuthContext";

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Monitor, Users, Building2, Store, UsersRound,
  GitBranch, UserPlus, UserMinus, AlertCircle, AlertTriangle,
  FileText, BookOpen, Laptop, List, BookUser, Building,
  ClipboardList, CheckSquare, BookMarked, Briefcase, Package,
  ListOrdered, Shield, Lock, Plus, Calendar,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge: string | null;
  children: SidebarItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

// ── Collapsed flyout rendered via portal (never clipped by overflow) ──────────
function CollapsedFlyout({
  item,
  anchorTop,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  item: SidebarItem;
  anchorTop: number;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const pathname = usePathname();
  const hasChildren = item.children.length > 0;

  // Keep flyout inside viewport vertically
  const maxH = typeof window !== "undefined" ? window.innerHeight : 600;
  const estimatedH = hasChildren ? 48 + item.children.length * 40 : 36;
  const top = Math.min(anchorTop, maxH - estimatedH - 16);

  return createPortal(
    <div
      style={{ top, left: 72 }}
      className="fixed z-[9999] animate-fade-in"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {hasChildren ? (
        /* Parent — flyout panel with child links */
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[200px]">
          <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 mb-1">
            {item.label}
          </p>
          {item.children.map((child) => {
            const ChildIcon = ICON_MAP[child.icon] ?? LayoutDashboard;
            const isActive =
              pathname === child.path ||
              (child.path !== "/" && pathname.startsWith(child.path + "/"));
            return (
              <Link
                key={child.id}
                href={child.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                  isActive
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary font-medium"
                )}
              >
                <ChildIcon
                  size={15}
                  className={isActive ? "text-primary" : "text-gray-400"}
                />
                {child.label}
              </Link>
            );
          })}
        </div>
      ) : (
        /* Leaf — simple dark tooltip */
        <div className="flex items-center">
          <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900 mt-1" />
          <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            {item.label}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

// ── Collapsed nav item (icon only + portal flyout on hover) ───────────────────
function CollapsedNavItem({
  item,
  onClose,
}: {
  item: SidebarItem;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;
  const hasChildren = item.children.length > 0;
  const liRef = useRef<HTMLLIElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const [anchorTop, setAnchorTop] = useState<number | null>(null);

  const isActive =
    pathname === item.path ||
    (item.path !== "/" && pathname.startsWith(item.path + "/")) ||
    (hasChildren &&
      item.children.some(
        (c) =>
          pathname === c.path ||
          (c.path !== "/" && pathname.startsWith(c.path + "/"))
      ));

  const showFlyout = () => {
    clearTimeout(hideTimer.current);
    if (liRef.current) {
      const rect = liRef.current.getBoundingClientRect();
      setAnchorTop(rect.top);
    }
  };

  const hideFlyout = () => {
    hideTimer.current = setTimeout(() => setAnchorTop(null), 80);
  };

  const keepFlyout = () => clearTimeout(hideTimer.current);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  const iconClass = cn(
    "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 mx-auto",
    isActive
      ? "bg-white text-primary shadow-sm"
      : "text-blue-100 hover:bg-white/15 hover:text-white"
  );

  return (
    <li ref={liRef} onMouseEnter={showFlyout} onMouseLeave={hideFlyout}>
      {hasChildren ? (
        <button className={iconClass} aria-label={item.label}>
          <Icon size={20} />
        </button>
      ) : (
        <Link href={item.path} onClick={onClose} className={iconClass} aria-label={item.label}>
          <Icon size={20} />
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

// ── Expanded NavItem ───────────────────────────────────────────────────────────
function NavItem({
  item,
  depth = 0,
  onClose,
}: {
  item: SidebarItem;
  depth?: number;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const hasChildren = item.children.length > 0;
  const Icon = ICON_MAP[item.icon] ?? LayoutDashboard;

  const isActive =
    pathname === item.path ||
    (item.path !== "/" && pathname.startsWith(item.path + "/"));

  const isParentActive =
    hasChildren &&
    item.children.some(
      (c) =>
        pathname === c.path ||
        (c.path !== "/" && pathname.startsWith(c.path + "/"))
    );

  const [isExpanded, setIsExpanded] = useState(isParentActive || isActive);

  useEffect(() => {
    if (isParentActive) setIsExpanded(true);
  }, [isParentActive]);

  const handleClick = useCallback(() => {
    if (hasChildren) setIsExpanded((p) => !p);
    else onClose();
  }, [hasChildren, onClose]);

  const itemClass = cn(
    "group flex items-center gap-3 w-full rounded-xl text-sm font-medium transition-all duration-200 select-none",
    depth === 0 ? "px-3 py-2.5" : "px-3 py-2",
    isActive && !hasChildren
      ? "bg-white text-primary shadow-sm"
      : isParentActive
      ? "bg-white/10 text-white"
      : "text-blue-100 hover:bg-white/10 hover:text-white",
    depth > 0 && "text-xs"
  );

  return (
    <li>
      {hasChildren ? (
        <button onClick={handleClick} className={itemClass}>
          <Icon
            size={depth === 0 ? 18 : 16}
            className={cn(
              "shrink-0",
              isActive || isParentActive
                ? "text-accent-orange"
                : "text-blue-200 group-hover:text-white"
            )}
          />
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && (
            <span className="bg-accent-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
          <ChevronRight
            size={14}
            className={cn(
              "shrink-0 transition-transform duration-200 text-blue-300",
              isExpanded && "rotate-90"
            )}
          />
        </button>
      ) : (
        <Link href={item.path} onClick={handleClick} className={itemClass}>
          <Icon
            size={depth === 0 ? 18 : 16}
            className={cn(
              "shrink-0",
              isActive ? "text-primary" : "text-blue-200 group-hover:text-white"
            )}
          />
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge && (
            <span className="bg-accent-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </Link>
      )}

      {hasChildren && isExpanded && (
        <ul className="mt-1 space-y-0.5 border-l border-white/10 ml-[22px] pl-2">
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} depth={depth + 1} onClose={onClose} />
          ))}
        </ul>
      )}
    </li>
  );
}

// ── Sidebar root ──────────────────────────────────────────────────────────────
export default function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const { user } = useAuth();
  const items = sidebarItemsData as SidebarItem[];

  // User tooltip state for collapsed footer avatar
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarHideTimer = useRef<ReturnType<typeof setTimeout>>();
  const [avatarTipTop, setAvatarTipTop] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => () => clearTimeout(avatarHideTimer.current), []);

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
          "fixed top-0 left-0 z-50 h-full flex flex-col bg-primary shadow-sidebar",
          "transition-all duration-300 ease-in-out",
          "lg:static lg:z-auto",
          // Mobile: slide in/out; always full-width on mobile
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          // Desktop width
          isCollapsed ? "lg:w-[68px]" : "lg:w-72",
          "w-72"
        )}
      >
        {/* ── Logo header ── */}
        <div
          className={cn(
            "flex items-center border-b border-white/10 shrink-0 px-4 py-4",
            isCollapsed && "lg:justify-center lg:px-0"
          )}
        >
          <Link
            href="/dashboard"
            className={cn("flex items-center gap-3 group", isCollapsed && "lg:justify-center")}
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all shrink-0">
              <Image
                src="/logo.svg"
                alt="OrionX"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className={cn("transition-all duration-200", isCollapsed && "lg:hidden")}>
              <span className="text-white font-bold text-lg leading-none tracking-wide">
                OrionX
              </span>
              <p className="text-blue-300 text-[10px] font-medium tracking-widest uppercase mt-0.5">
                ITSM Platform
              </p>
            </div>
          </Link>

          {/* Close — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden ml-auto p-2 rounded-lg text-blue-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className={cn("flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
          isCollapsed ? "lg:px-2 px-3" : "px-3"
        )}>
          {/* Expanded list (always shown on mobile, shown on desktop when not collapsed) */}
          <ul className={cn("space-y-1", isCollapsed && "lg:hidden")}>
            {items.map((item) => (
              <NavItem key={item.id} item={item} depth={0} onClose={onClose} />
            ))}
          </ul>

          {/* Collapsed icon list (desktop only) */}
          <ul className={cn("hidden space-y-1 items-center", isCollapsed && "lg:block")}>
            {items.map((item) => (
              <CollapsedNavItem key={item.id} item={item} onClose={onClose} />
            ))}
          </ul>
        </nav>

        {/* ── User footer ── */}
        <div
          className={cn(
            "border-t border-white/10 shrink-0 px-4 py-4",
            isCollapsed && "lg:px-2 lg:py-3"
          )}
        >
          {/* Expanded */}
          <div className={cn("flex items-center gap-3", isCollapsed && "lg:hidden")}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-orange to-yellow-400 flex items-center justify-center text-white text-sm font-bold shadow-lg shrink-0">
              {user?.avatar ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{user?.name ?? "User"}</p>
              <p className="text-blue-300 text-xs truncate">{user?.role ?? "Staff"}</p>
            </div>
          </div>

          {/* Collapsed — avatar with portal tooltip */}
          <div
            ref={avatarRef}
            className={cn("hidden justify-center", isCollapsed && "lg:flex")}
            onMouseEnter={() => {
              clearTimeout(avatarHideTimer.current);
              if (avatarRef.current) {
                const rect = avatarRef.current.getBoundingClientRect();
                setAvatarTipTop(rect.top);
              }
            }}
            onMouseLeave={() => {
              avatarHideTimer.current = setTimeout(() => setAvatarTipTop(null), 80);
            }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-orange to-yellow-400 flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer">
              {user?.avatar ?? "U"}
            </div>

            {avatarTipTop !== null &&
              createPortal(
                <div
                  style={{ top: avatarTipTop, left: 76 }}
                  className="fixed z-[9999] flex items-center animate-fade-in"
                  onMouseEnter={() => clearTimeout(avatarHideTimer.current)}
                  onMouseLeave={() => setAvatarTipTop(null)}
                >
                  <span className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-gray-900" />
                  <div className="bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
                    <p>{user?.name}</p>
                    <p className="text-gray-400 font-normal mt-0.5">{user?.role}</p>
                  </div>
                </div>,
                document.body
              )}
          </div>
        </div>
      </aside>
    </>
  );
}
