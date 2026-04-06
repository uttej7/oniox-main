"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye, EyeOff, Mail, Lock, AlertCircle, Loader2, ArrowRight,
  ChevronLeft, UserCheck, Shield, Clock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const HR_COLOR = "#4485d0";
const HR_DARK  = "#2d6ab8";

const HR_FEATURES = [
  { Icon: UserCheck, label: "Onboarding & Offboarding", sub: "Full employee lifecycle management" },
  { Icon: Shield,    label: "HR Compliance",             sub: "Audit trails & policy management" },
  { Icon: Clock,     label: "Attendance & Leave",        sub: "Real-time tracking & approvals" },
];

export default function HRLoginPage() {
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/hr/dashboard";

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace(callbackUrl);
    }
  }, [isAuthenticated, authLoading, router, callbackUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setIsSubmitting(true);
    setError(null);
    const result = await login({ email: form.email, password: form.password }, callbackUrl);
    if (!result.success) {
      setError(result.error ?? "Login failed. Please check your credentials.");
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${HR_DARK}, ${HR_COLOR})` }}>
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">

      {/* ══════════════════════════════════════════════════
          LEFT PANEL – HR branding
      ══════════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] p-12 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${HR_DARK} 0%, ${HR_COLOR} 60%, ${HR_DARK} 100%)` }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/3 -left-16 w-56 h-56 bg-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 right-20 w-72 h-72 bg-white/[0.04] rounded-full pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          {/* Back to portal */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium mb-8 transition-colors group"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to portal selection
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white/25 shadow-xl">
              <Image src="/logo.svg" alt="OrionX" width={56} height={56} priority className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-white text-3xl font-bold tracking-wide">OrionX</span>
              <p className="text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5">
                HR Portal
              </p>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="relative z-10 space-y-7">
          <div>
            <p className="text-white/50 text-xs font-bold uppercase tracking-[0.22em] mb-3">
              Human Resources
            </p>
            <h1 className="text-5xl xl:text-[3.4rem] font-extrabold text-white leading-[1.1] tracking-tight">
              Empower Your
              <br />
              <span style={{ color: "rgba(255,255,255,0.75)" }}>HR Team.</span>
            </h1>
            <p className="mt-5 text-white/60 text-[15px] leading-relaxed max-w-[400px]">
              Manage the complete employee lifecycle — from seamless onboarding
              to graceful offboarding — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 max-w-[420px]">
            {HR_FEATURES.map(({ Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 rounded-2xl px-4 py-3 border border-white/10 hover:bg-white/[0.08] transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-white/80" />
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold leading-none">{label}</p>
                  <p className="text-white/50 text-[11px] mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} OrionX HR Portal. All rights reserved.
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          RIGHT PANEL – login form
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 px-6 md:px-12 py-12">

        {/* Mobile logo + back */}
        <div className="lg:hidden w-full max-w-md mb-8 space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
            <ChevronLeft size={15} /> Back to portal selection
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <Image src="/logo.svg" alt="OrionX" width={40} height={40} priority />
            </div>
            <div>
              <span className="text-primary text-lg font-bold">OrionX</span>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">HR Portal</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

            {/* Header */}
            <div className="mb-6">
              {/* Colored tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-white text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: HR_COLOR }}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                HR Portal Access
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Sign in to HR</h2>
              <p className="text-gray-500 text-sm mt-1.5">
                Access your HR dashboard and manage your team.
              </p>
            </div>

            {/* Demo credentials */}
            <div className="mb-6 p-3.5 rounded-xl border space-y-1.5"
              style={{ backgroundColor: `${HR_COLOR}0d`, borderColor: `${HR_COLOR}30` }}>
              <p className="text-xs font-semibold" style={{ color: HR_COLOR }}>Demo Credentials</p>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: HR_COLOR }}>HR</span>
                <span className="text-xs text-gray-600 font-mono">meena@orionx.com / Admin@123</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="email" name="email" type="email" autoComplete="email"
                    placeholder="you@orionx.com"
                    value={form.email} onChange={handleChange}
                    className={cn(
                      "input-field pl-10",
                      error && "border-red-300 focus:border-red-400 focus:ring-red-200"
                    )}
                    style={!error ? { ["--tw-ring-color" as string]: `${HR_COLOR}33` } : {}}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <button type="button" className="text-xs font-medium hover:underline" style={{ color: HR_COLOR }}>
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    id="password" name="password" type={showPassword ? "text" : "password"}
                    autoComplete="current-password" placeholder="••••••••"
                    value={form.password} onChange={handleChange}
                    className={cn(
                      "input-field pl-10 pr-11",
                      error && "border-red-300 focus:border-red-400 focus:ring-red-200"
                    )}
                  />
                  <button
                    type="button" onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <input
                  id="remember" name="remember" type="checkbox"
                  checked={form.remember} onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor: HR_COLOR }}
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Keep me signed in for 7 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-semibold text-sm transition-all duration-200 shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                style={{
                  backgroundColor: HR_COLOR,
                  boxShadow: `0 4px 14px 0 ${HR_COLOR}40`,
                }}
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Signing in...</>
                ) : (
                  <>Sign in to HR Portal <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          </div>

          {/* Back link + footer */}
          <div className="mt-5 text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
              <ChevronLeft size={14} /> Back to portal selection
            </Link>
            <p className="text-[11px] text-gray-400">
              &copy; {new Date().getFullYear()} OrionX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
