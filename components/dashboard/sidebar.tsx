"use client";

import React from "react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CalendarDays,
  GalleryVerticalEnd,
  Newspaper,
  Radar,
  BriefcaseBusiness
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems: { href: Route; label: string; icon: React.ElementType }[] = [
  { href: "/", label: "Visão Geral", icon: GalleryVerticalEnd },
  { href: "/portfolio", label: "Portfólio de Projetos", icon: BriefcaseBusiness },
  { href: "/metrics", label: "Métricas de Negócio", icon: BarChart3 },
  { href: "/calendar", label: "Calendário de Eventos", icon: CalendarDays },
  { href: "/benchmark", label: "Benchmark de Agências", icon: Radar },
  { href: "/feed", label: "Feed de Mercado", icon: Newspaper }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-6 overflow-x-auto rounded-3xl border border-border bg-card/70 p-3 backdrop-blur xl:hidden">
        <div className="mb-3 flex items-center justify-between gap-4 px-2">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-primary">Live Marketing OS</p>
            <p className="text-sm text-muted-foreground">Navegação rápida</p>
          </div>
        </div>
        <nav className="flex gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex min-w-max items-center gap-2 rounded-2xl border px-4 py-3 text-sm transition-all",
                  active
                    ? "border-primary/30 bg-primary/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className="sticky top-0 hidden h-screen w-80 shrink-0 border-r border-border/80 bg-card/70 px-6 py-8 backdrop-blur xl:block">
        <div className="mb-8 space-y-3">
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Live Marketing OS
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Dashboard de Gestão</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Projetos, intelligence e calendário unificados para operação de eventos e experiências.
            </p>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all",
                  active
                    ? "border-primary/30 bg-primary/10 text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-secondary/70 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-3xl border border-border bg-background/60 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Status da operação</p>
          <div className="mt-4 grid gap-4">
            <div>
              <p className="text-2xl font-semibold">18</p>
              <p className="text-sm text-muted-foreground">projetos ativos no trimestre</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">R$ 1,18 mi</p>
              <p className="text-sm text-muted-foreground">pipeline aberto em oportunidades</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
