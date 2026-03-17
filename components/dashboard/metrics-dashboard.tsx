"use client";

import { useMemo, useState } from "react";
import { BarChart3, BriefcaseBusiness, RefreshCcw, TrendingUp, Wallet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { SummaryCard } from "@/components/dashboard/summary-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { clientMix, monthlyProjects, revenueByService, topClients } from "@/lib/data";

const pieColors = ["#22c55e", "#38bdf8"];

export function MetricsDashboard() {
  const [period, setPeriod] = useState("trimestre");
  const [projectType, setProjectType] = useState("todos");

  const summary = useMemo(() => {
    const revenueTotal = revenueByService.reduce((sum, item) => sum + item.receita, 0);
    const projectsTotal = monthlyProjects.reduce((sum, item) => sum + item.projetos, 0);
    const avgConversion = Math.round(
      monthlyProjects.reduce((sum, item) => sum + item.conversao, 0) / monthlyProjects.length
    );
    return { revenueTotal, projectsTotal, avgConversion };
  }, []);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px_220px]">
        <Card className="border-primary/20 bg-primary/10">
          <CardHeader>
            <CardTitle>Filtros de leitura</CardTitle>
            <CardDescription>Combine horizonte temporal e recorte de serviço para revisar o desempenho comercial.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Select value={period} onChange={(event) => setPeriod(event.target.value)}>
              <option value="mes">Mês</option>
              <option value="trimestre">Trimestre</option>
              <option value="ano">Ano</option>
            </Select>
            <Select value={projectType} onChange={(event) => setProjectType(event.target.value)}>
              <option value="todos">Todos os projetos</option>
              <option value="key-visual">Key visual</option>
              <option value="arquitetura-3d">Arquitetura 3D</option>
              <option value="identidade-visual">Identidade visual</option>
              <option value="materiais-impressos">Materiais impressos</option>
            </Select>
          </CardContent>
        </Card>
        <SummaryCard title="Projetos analisados" value={String(summary.projectsTotal)} hint={`Filtro atual: ${period}`} icon={BriefcaseBusiness} />
        <SummaryCard title="Conversão média" value={`${summary.avgConversion}%`} hint={`Leitura por tipo: ${projectType === "todos" ? "todos" : projectType}`} icon={RefreshCcw} />
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        <SummaryCard title="Receita total" value={summary.revenueTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })} hint="Receita consolidada por linha de serviço" icon={Wallet} />
        <SummaryCard title="Clientes recorrentes" value="64%" hint="Base recorrente no mix comercial" icon={TrendingUp} />
        <SummaryCard title="Top client share" value="29%" hint="Participação do maior cliente no faturamento" icon={BarChart3} />
        <SummaryCard title="Ticket médio" value="R$ 57 mil" hint="Média por job no período selecionado" icon={Wallet} />
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Projetos por mês</CardTitle>
            <CardDescription>Evolução simultânea de volume entregue e taxa de conversão.</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProjects}>
                <CartesianGrid stroke="rgba(148,163,184,0.14)" vertical={false} />
                <XAxis dataKey="label" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "16px" }} />
                <Line yAxisId="left" type="monotone" dataKey="projetos" stroke="#38bdf8" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="conversao" stroke="#fb923c" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receita por tipo de serviço</CardTitle>
            <CardDescription>Comparativo direto entre frentes de receita.</CardDescription>
          </CardHeader>
          <CardContent className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByService} layout="vertical" margin={{ left: 16 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.14)" horizontal={false} />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" width={120} stroke="#94a3b8" />
                <Tooltip
                  formatter={(value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
                  contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "16px" }}
                />
                <Bar dataKey="receita" radius={[0, 12, 12, 0]} fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Clientes recorrentes vs novos</CardTitle>
            <CardDescription>Composição do pipeline e sustentação da carteira.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={clientMix} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110}>
                  {clientMix.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(148,163,184,0.2)", borderRadius: "16px" }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 5 clientes por faturamento</CardTitle>
            <CardDescription>Contas com maior peso na receita consolidada.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {topClients.map((client, index) => (
                <div key={client.client} className="flex items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">#{index + 1}</p>
                    <p className="mt-1 font-medium">{client.client}</p>
                  </div>
                  <p className="text-sm text-primary">{client.faturamento.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
