import { Bell, Search, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";

export function DashboardHeader({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          Operação integrada
        </p>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Pesquisar cliente, projeto ou agência..." />
        </div>
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/60">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
