"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";

// ── Colour theme map ──────────────────────────────────────────────────────────
export type CardColor =
  | "blue" | "orange" | "green" | "purple"
  | "teal" | "indigo" | "emerald" | "rose";

interface ColorTheme {
  gradient: string;       // card background gradient
  iconRing: string;       // animated ring behind icon
  iconBg: string;         // icon container bg
  iconColor: string;      // icon stroke colour
  badgeActive: string;    // "Active" badge classes
  badgeInactive: string;  // "InActive" / secondary badge classes
  blob1: string;          // decorative blob 1
  blob2: string;          // decorative blob 2
  numberColor: string;    // count-up number colour
  dotGrid: string;        // dot grid overlay colour
}

const THEMES: Record<CardColor, ColorTheme> = {
  blue: {
    gradient:      "from-blue-50 via-white to-white",
    iconRing:      "bg-blue-400/30",
    iconBg:        "bg-blue-500",
    iconColor:     "text-white",
    badgeActive:   "text-blue-700 bg-blue-100 border-blue-200",
    badgeInactive: "text-blue-400 bg-blue-50  border-blue-100",
    blob1:         "bg-blue-200/40",
    blob2:         "bg-blue-100/60",
    numberColor:   "text-blue-700",
    dotGrid:       "bg-blue-300/20",
  },
  orange: {
    gradient:      "from-orange-50 via-white to-white",
    iconRing:      "bg-orange-400/30",
    iconBg:        "bg-orange-500",
    iconColor:     "text-white",
    badgeActive:   "text-orange-700 bg-orange-100 border-orange-200",
    badgeInactive: "text-orange-400 bg-orange-50  border-orange-100",
    blob1:         "bg-orange-200/40",
    blob2:         "bg-orange-100/60",
    numberColor:   "text-orange-700",
    dotGrid:       "bg-orange-300/20",
  },
  green: {
    gradient:      "from-green-50 via-white to-white",
    iconRing:      "bg-green-400/30",
    iconBg:        "bg-green-500",
    iconColor:     "text-white",
    badgeActive:   "text-green-700 bg-green-100 border-green-200",
    badgeInactive: "text-red-500   bg-red-50    border-red-100",
    blob1:         "bg-green-200/40",
    blob2:         "bg-green-100/60",
    numberColor:   "text-green-700",
    dotGrid:       "bg-green-300/20",
  },
  purple: {
    gradient:      "from-purple-50 via-white to-white",
    iconRing:      "bg-purple-400/30",
    iconBg:        "bg-purple-500",
    iconColor:     "text-white",
    badgeActive:   "text-purple-700 bg-purple-100 border-purple-200",
    badgeInactive: "text-red-500    bg-red-50     border-red-100",
    blob1:         "bg-purple-200/40",
    blob2:         "bg-purple-100/60",
    numberColor:   "text-purple-700",
    dotGrid:       "bg-purple-300/20",
  },
  teal: {
    gradient:      "from-teal-50 via-white to-white",
    iconRing:      "bg-teal-400/30",
    iconBg:        "bg-teal-500",
    iconColor:     "text-white",
    badgeActive:   "text-teal-700 bg-teal-100 border-teal-200",
    badgeInactive: "text-red-500  bg-red-50   border-red-100",
    blob1:         "bg-teal-200/40",
    blob2:         "bg-teal-100/60",
    numberColor:   "text-teal-700",
    dotGrid:       "bg-teal-300/20",
  },
  indigo: {
    gradient:      "from-indigo-50 via-white to-white",
    iconRing:      "bg-indigo-400/30",
    iconBg:        "bg-indigo-500",
    iconColor:     "text-white",
    badgeActive:   "text-indigo-700 bg-indigo-100 border-indigo-200",
    badgeInactive: "text-red-500    bg-red-50     border-red-100",
    blob1:         "bg-indigo-200/40",
    blob2:         "bg-indigo-100/60",
    numberColor:   "text-indigo-700",
    dotGrid:       "bg-indigo-300/20",
  },
  emerald: {
    gradient:      "from-emerald-50 via-white to-white",
    iconRing:      "bg-emerald-400/30",
    iconBg:        "bg-emerald-500",
    iconColor:     "text-white",
    badgeActive:   "text-emerald-700 bg-emerald-100 border-emerald-200",
    badgeInactive: "text-red-500     bg-red-50      border-red-100",
    blob1:         "bg-emerald-200/40",
    blob2:         "bg-emerald-100/60",
    numberColor:   "text-emerald-700",
    dotGrid:       "bg-emerald-300/20",
  },
  rose: {
    gradient:      "from-rose-50 via-white to-white",
    iconRing:      "bg-rose-400/30",
    iconBg:        "bg-rose-500",
    iconColor:     "text-white",
    badgeActive:   "text-rose-700 bg-rose-100 border-rose-200",
    badgeInactive: "text-red-500  bg-red-50   border-red-100",
    blob1:         "bg-rose-200/40",
    blob2:         "bg-rose-100/60",
    numberColor:   "text-rose-700",
    dotGrid:       "bg-rose-300/20",
  },
};

// ── Dot-grid SVG background ───────────────────────────────────────────────────
function DotGrid({ color }: { color: string }) {
  return (
    <svg
      className={cn("absolute inset-0 w-full h-full opacity-40", color)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={`dots-${color}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dots-${color})`} />
    </svg>
  );
}

// ── Wavy bottom decoration ────────────────────────────────────────────────────
function WaveDecor({ color }: { color: string }) {
  return (
    <svg
      className={cn("absolute bottom-0 left-0 w-full opacity-20", color)}
      viewBox="0 0 300 40"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      height="40"
    >
      <path
        d="M0,20 C50,5 100,35 150,20 C200,5 250,35 300,20 L300,40 L0,40 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ── Single animated stat (badge + count-up number) ────────────────────────────
function StatValue({
  label,
  count,
  isInactive,
  theme,
  delay,
}: {
  label: string;
  count: number;
  isInactive: boolean;
  theme: ColorTheme;
  delay: number;
}) {
  const animated = useCountUp(count, 1400, delay);

  return (
    <div className="flex flex-col gap-2">
      <span
        className={cn(
          "inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border w-fit",
          isInactive ? theme.badgeInactive : theme.badgeActive
        )}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            isInactive ? "bg-red-400" : theme.iconBg
          )}
        />
        {label}
      </span>
      <span
        className={cn(
          "text-4xl font-extrabold leading-none tabular-nums tracking-tight",
          theme.numberColor
        )}
      >
        {animated.toLocaleString()}
      </span>
    </div>
  );
}

// ── StatsCard ─────────────────────────────────────────────────────────────────
export interface StatBadge {
  label: string;
  count: number;
  inactive?: boolean;
}

export interface StatsCardProps {
  title: string;
  icon: React.ReactNode;
  stats: StatBadge[];
  color?: CardColor;
  index?: number;    // card position → stagger delay
  className?: string;
}

export default function StatsCard({
  title,
  icon,
  stats,
  color = "blue",
  index = 0,
  className,
}: StatsCardProps) {
  const theme = THEMES[color];
  const baseDelay = index * 80; // stagger each card by 80 ms

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-gray-100",
        "bg-gradient-to-br", theme.gradient,
        "shadow-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
        "p-5 flex flex-col gap-4",
        className
      )}
    >
      {/* ── Background decorations ── */}

      {/* Dot grid */}
      {/* <DotGrid color={theme.dotGrid} /> */}

      {/* Animated blob 1 — top right */}
      <div
        className={cn(
          "absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl animate-blob",
          theme.blob1
        )}
        style={{ animationDelay: "0s" }}
      />
      {/* Animated blob 2 — bottom left */}
      <div
        className={cn(
          "absolute -bottom-6 -left-6 w-24 h-24 rounded-full blur-2xl animate-blob",
          theme.blob2
        )}
        style={{ animationDelay: "3.5s" }}
      />

      {/* Wave decoration */}
      <WaveDecor color={theme.iconBg} />

      {/* Shimmer streak */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div
          className={cn(
            "absolute top-0 -left-16 w-12 h-full opacity-20 animate-shimmer",
            "bg-gradient-to-r from-transparent via-white to-transparent"
          )}
          style={{ animationDelay: `${index * 0.4}s`, animationDuration: "3.5s" }}
        />
      </div>

      {/* ── Content (above decorations) ── */}
      <div className="relative z-10 flex items-start justify-between">
        {/* Title */}
        <h3 className="font-semibold text-gray-600 text-sm leading-tight max-w-[60%]">
          {title}
        </h3>

        {/* Animated icon */}
        <div className="relative shrink-0">
          {/* Pulse ring */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl animate-pulse-ring",
              theme.iconRing
            )}
          />
          {/* Secondary slower ring */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl animate-pulse-ring",
              theme.iconRing
            )}
            style={{ animationDelay: "1.1s" }}
          />
          {/* Icon box */}
          <div
            className={cn(
              "relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
              "animate-float",
              theme.iconBg, theme.iconColor
            )}
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            {icon}
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="relative z-10 flex items-end gap-6 flex-wrap">
        {stats.map((stat, i) => (
          <StatValue
            key={stat.label}
            label={stat.label}
            count={stat.count}
            isInactive={stat.inactive ?? false}
            theme={theme}
            delay={baseDelay + i * 120}
          />
        ))}
      </div>
    </div>
  );
}
