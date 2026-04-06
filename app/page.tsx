"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Shield, Users, UserCircle, Zap, BarChart3, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getHomePath } from "@/lib/auth";

/* ── Brand colours (left panel only) ───────────────────────────────────── */
const BG_DARK  = "#071e10";
const BG_MID   = "#0d3b1e";
const ORANGE   = "#e07a28";
const GREEN    = "#2da84a";

/* ── Portal cards ────────────────────────────────────────────────────────── */
const PORTALS = [
  {
    key: "admin",
    label: "Admin / IT Portal",
    desc: "Manage incidents, assets & IT operations.",
    href: "/login",
    icon: Shield,
    accent: "#02114f",
    accentLight: "#02114f14",
    comingSoon: false,
  },
  {
    key: "hr",
    label: "HR Portal",
    desc: "Onboarding, offboarding & HR workflows.",
    href: "/hr-login",
    icon: Users,
    accent: "#4485d0",
    accentLight: "#4485d014",
    comingSoon: false,
  },
  {
    key: "employee",
    label: "Employee Portal",
    desc: "Profile, payslips, attendance & leave.",
    href: "#",
    icon: UserCircle,
    accent: "#9ca3af",
    accentLight: "#9ca3af10",
    comingSoon: true,
  },
];

const FEATURES = [
  { Icon: Zap,       label: "IT Service Management",  sub: "Incidents, assets & change control" },
  { Icon: Users,     label: "HR Operations",           sub: "Onboarding & employee lifecycle"   },
  { Icon: BarChart3, label: "Analytics & Reports",     sub: "Real-time dashboards & insights"   },
  { Icon: Globe,     label: "Unified Platform",        sub: "One login, three powerful portals" },
];

/* ── XSILICA X logo (SVG, three-colour panels matching the real logo) ──── */
function XsilicaLogo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* TL → BR strip — orange */}
      <polygon points="0,0 18,0 48,48 30,48" fill={ORANGE} />
      {/* TR → BL strip — green (rendered on top, overlaps orange) */}
      <polygon points="30,0 48,0 18,48 0,48" fill={GREEN} />
      {/* Centre diamond — blue */}
      <polygon points="24,8 13,24 24,40 35,24" fill="#4485d0" />
    </svg>
  );
}

export default function PortalSelectionPage() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      router.replace(getHomePath(user));
    }
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <div className="h-screen w-screen overflow-hidden flex">

      {/* ═══════════════════════════════════════════
          LEFT — XSILICA branding (desktop only)
      ═══════════════════════════════════════════ */}
      <div
        className="hidden lg:flex lg:w-[52%] h-full flex-col px-10 xl:px-14 py-8 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${BG_DARK} 0%, ${BG_MID} 55%, ${BG_DARK} 100%)` }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
          style={{ backgroundColor: `${ORANGE}08` }} />
        <div className="absolute top-1/2 -left-14 w-48 h-48 rounded-full pointer-events-none"
          style={{ backgroundColor: `${GREEN}08` }} />
        <div className="absolute -bottom-16 right-12 w-56 h-56 rounded-full pointer-events-none"
          style={{ backgroundColor: `${ORANGE}0c` }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 shadow-lg shrink-0 flex items-center justify-center bg-black/40"
            style={{ ringColor: `${ORANGE}40` }}>
            <XsilicaLogo size={36} />
          </div>
          <div>
            <p className="text-white text-xl font-extrabold leading-none tracking-widest uppercase">
              XSILICA
            </p>
            <p className="text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5"
              style={{ color: ORANGE }}>
              Software Solutions Pvt. Ltd
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 mt-8 shrink-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-2"
            style={{ color: `${GREEN}99` }}>
            All-in-One Solution
          </p>
          <h1 className="text-4xl xl:text-[2.75rem] font-extrabold text-white leading-[1.1] tracking-tight">
            One Platform.
            <br />
            <span style={{ color: ORANGE }}>Infinite</span> Power.
          </h1>
          <p className="text-white/55 text-[13px] leading-relaxed max-w-sm mt-3">
            XSILICA unifies IT service management, HR operations, and employee
            self-service into a single beautifully designed workspace.
          </p>
        </div>

        {/* Feature cards */}
        <div className="relative z-10 flex flex-col gap-2 mt-6 flex-1 justify-center">
          {FEATURES.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors border"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.09)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.05)"; }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${ORANGE}22` }}>
                <Icon size={15} style={{ color: ORANGE }} />
              </div>
              <div>
                <p className="text-white text-[12px] font-semibold leading-none">{label}</p>
                <p className="text-white/45 text-[11px] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="relative z-10 text-[10px] mt-6 shrink-0" style={{ color: `${GREEN}55` }}>
          &copy; {new Date().getFullYear()} XSILICA Software Solutions Pvt. Ltd. All rights reserved.
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          RIGHT — portal selection (all screens)
      ═══════════════════════════════════════════ */}
      <div className="flex-1 h-full bg-white flex flex-col overflow-hidden">

        {/* Mobile logo bar */}
        <div className="lg:hidden flex items-center gap-3 px-6 pt-6 shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-black shrink-0">
            <XsilicaLogo size={30} />
          </div>
          <div>
            <p className="text-gray-900 text-base font-extrabold leading-none tracking-widest uppercase">
              XSILICA
            </p>
            <p className="text-[9px] uppercase tracking-widest font-bold mt-0.5" style={{ color: ORANGE }}>
              Software Solutions
            </p>
          </div>
        </div>

        {/* Centred content */}
        <div className="flex flex-1 items-center justify-center px-6 md:px-12 overflow-hidden">
          <div className="w-full max-w-[400px]">

            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-[1.7rem] font-extrabold text-gray-900 tracking-tight leading-tight">
                Welcome Back
              </h2>
              <p className="text-gray-500 text-sm mt-1.5">
                Select your portal to securely access the system.
              </p>
            </div>

            {/* Portal cards */}
            <div className="flex flex-col gap-2.5">
              {PORTALS.map(({ key, label, desc, href, icon: Icon, accent, accentLight, comingSoon }) => {
                const inner = (
                  <div
                    className="flex items-center gap-3.5 border border-gray-200 rounded-xl p-4 transition-all duration-200"
                    style={{
                      backgroundColor: comingSoon ? "#fafafa" : "#fff",
                      cursor: comingSoon ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (comingSoon) return;
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = accent;
                      el.style.boxShadow = `0 4px 20px 0 ${accent}20`;
                      el.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      if (comingSoon) return;
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#e5e7eb";
                      el.style.boxShadow = "";
                      el.style.transform = "";
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accentLight }}>
                      <Icon size={19} style={{ color: comingSoon ? "#9ca3af" : accent }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-800 text-[13.5px] leading-snug">{label}</p>
                        {comingSoon && (
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full shrink-0">
                            Soon
                          </span>
                        )}
                      </div>
                      <p className="text-[11.5px] text-gray-500 mt-0.5 leading-snug">{desc}</p>
                    </div>

                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: accentLight }}>
                      <ArrowRight size={13} style={{ color: comingSoon ? "#d1d5db" : accent }} />
                    </div>
                  </div>
                );

                return comingSoon
                  ? <div key={key}>{inner}</div>
                  : <Link key={key} href={href} className="block">{inner}</Link>;
              })}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                Secure &amp; role-based access
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5 flex-wrap">
              {["SSO Ready", "Role-Based Access", "Audit Logs"].map((b) => (
                <div key={b} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GREEN }} />
                  <span className="text-[10.5px] text-gray-400 font-medium">{b}</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-center text-[10px] text-gray-400 mt-5">
              &copy; {new Date().getFullYear()} XSILICA Software Solutions Pvt. Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
