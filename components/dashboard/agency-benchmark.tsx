"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { ArrowUpDown, Award, Building2, Plus, Radar } from "lucide-react";

import { SummaryCard } from "@/components/dashboard/summary-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { initialAgencies, type Agency } from "@/lib/data";

type SortKey = "name" | "segment" | "awards";

export function AgencyBenchmark() {
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies);
  const [segmentFilter, setSegmentFilter] = useState("todos");
  const [sortBy, setSortBy] = useState<SortKey>("awards");
  const [form, setForm] = useState({
    name: "",
    segment: "",
    recentProjects: "",
    clients: "",
    instagram: "",
    linkedin: "",
    behance: "",
    awards: "",
    positioning: ""
  });

  const segments = useMemo(() => ["todos", ...new Set(agencies.map((agency) => agency.segment))], [agencies]);

  const filteredAgencies = useMemo(() => {
    return agencies
      .filter((agency) => segmentFilter === "todos" || agency.segment === segmentFilter)
      .sort((left, right) => {
        if (sortBy === "awards") return right.awards - left.awards;
        return left[sortBy].localeCompare(right[sortBy]);
      });
  }, [agencies, segmentFilter, sortBy]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.segment) return;

    setAgencies((current) => [
      {
        id: `ag-${crypto.randomUUID()}`,
        name: form.name,
        segment: form.segment,
        recentProjects: form.recentProjects,
        clients: form.clients.split(",").map((item) => item.trim()).filter(Boolean),
        instagram: form.instagram,
        linkedin: form.linkedin,
        behance: form.behance,
        awards: Number(form.awards || 0),
        positioning: form.positioning
      },
      ...current
    ]);

    setForm({
      name: "",
      segment: "",
      recentProjects: "",
      clients: "",
      instagram: "",
      linkedin: "",
      behance: "",
      awards: "",
      positioning: ""
    });
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <SummaryCard title="Agências mapeadas" value={String(agencies.length)} hint="Base competitiva ativa" icon={Building2} />
        <SummaryCard title="Segmentos ativos" value={String(segments.length - 1)} hint="Recortes de atuação" icon={Radar} />
        <SummaryCard title="Prêmios monitorados" value={String(agencies.reduce((sum, agency) => sum + agency.awards, 0))} hint="Soma da amostra atual" icon={Award} />
        <Card className="border-primary/20 bg-primary/10">
          <CardHeader>
            <CardTitle>Leitura comparativa</CardTitle>
            <CardDescription>Ordene e filtre a amostra conforme o segmento observado.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Select value={segmentFilter} onChange={(event) => setSegmentFilter(event.target.value)}>
              {segments.map((segment) => (
                <option key={segment} value={segment}>
                  {segment === "todos" ? "Todos os segmentos" : segment}
                </option>
              ))}
            </Select>
            <Select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortKey)}>
              <option value="awards">Ordenar por prêmios</option>
              <option value="name">Ordenar por nome</option>
              <option value="segment">Ordenar por segmento</option>
            </Select>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Benchmark de agências</CardTitle>
                <CardDescription>Tabela ordenável com clientes, presença digital, prêmios e posicionamento.</CardDescription>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-sm text-muted-foreground">
                <ArrowUpDown className="h-4 w-4" />
                {sortBy === "awards" ? "Maior número de prêmios" : `Ordenação por ${sortBy}`}
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 font-medium">Agência</th>
                  <th className="px-4 py-3 font-medium">Segmento</th>
                  <th className="px-4 py-3 font-medium">Projetos públicos recentes</th>
                  <th className="px-4 py-3 font-medium">Clientes</th>
                  <th className="px-4 py-3 font-medium">Presença digital</th>
                  <th className="px-4 py-3 font-medium">Prêmios</th>
                  <th className="px-4 py-3 font-medium">Posicionamento</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgencies.map((agency) => (
                  <tr key={agency.id} className="border-b border-border/70 align-top">
                    <td className="px-4 py-4 font-medium">{agency.name}</td>
                    <td className="px-4 py-4 text-muted-foreground">{agency.segment}</td>
                    <td className="px-4 py-4 text-muted-foreground">{agency.recentProjects}</td>
                    <td className="px-4 py-4 text-muted-foreground">{agency.clients.join(", ")}</td>
                    <td className="px-4 py-4 text-muted-foreground">
                      <div className="grid gap-1">
                        <span>Instagram: {agency.instagram}</span>
                        <span>LinkedIn: {agency.linkedin}</span>
                        <span>Behance: {agency.behance}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-primary">{agency.awards}</td>
                    <td className="px-4 py-4 text-muted-foreground">{agency.positioning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Adicionar agência</CardTitle>
            <CardDescription>Amplie a base competitiva com novas referências de mercado.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input placeholder="Nome da agência" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
              <Input placeholder="Segmento de atuação" value={form.segment} onChange={(event) => setForm((current) => ({ ...current, segment: event.target.value }))} />
              <Input placeholder="Projetos públicos recentes" value={form.recentProjects} onChange={(event) => setForm((current) => ({ ...current, recentProjects: event.target.value }))} />
              <Input placeholder="Clientes atendidos (vírgula)" value={form.clients} onChange={(event) => setForm((current) => ({ ...current, clients: event.target.value }))} />
              <Input placeholder="Instagram" value={form.instagram} onChange={(event) => setForm((current) => ({ ...current, instagram: event.target.value }))} />
              <Input placeholder="LinkedIn" value={form.linkedin} onChange={(event) => setForm((current) => ({ ...current, linkedin: event.target.value }))} />
              <Input placeholder="Behance" value={form.behance} onChange={(event) => setForm((current) => ({ ...current, behance: event.target.value }))} />
              <Input placeholder="Quantidade de prêmios" type="number" value={form.awards} onChange={(event) => setForm((current) => ({ ...current, awards: event.target.value }))} />
              <Input placeholder="Posicionamento de mercado" value={form.positioning} onChange={(event) => setForm((current) => ({ ...current, positioning: event.target.value }))} />
              <Button type="submit">
                <Plus className="h-4 w-4" />
                Inserir agência
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
