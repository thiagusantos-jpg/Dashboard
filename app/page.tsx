import { ArrowRight, BarChart3, CalendarDays, Newspaper, Wallet } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard/header";
import { SummaryCard } from "@/components/dashboard/summary-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    title: "Portfólio de Projetos",
    description: "Kanban, cadastros, anexos e gestão completa do pipeline de jobs.",
    href: "/portfolio"
  },
  {
    title: "Métricas de Negócio",
    description: "Receita, conversão, mix de clientes e análise de faturamento por serviço.",
    href: "/metrics"
  },
  {
    title: "Calendário de Eventos",
    description: "Visualização mensal com deadlines, briefings, apresentações e eventos.",
    href: "/calendar"
  },
  {
    title: "Benchmark de Agências",
    description: "Tabela competitiva de players, clientes, prêmios e presença digital.",
    href: "/benchmark"
  },
  {
    title: "Feed de Mercado",
    description: "Curadoria de tendências, tecnologia e cases relevantes para live marketing.",
    href: "/feed"
  }
];

export default function HomePage() {
  return (
    <div>
      <DashboardHeader
        title="Visão geral da operação"
        description="Uma estrutura única para acompanhar criação, performance comercial, agenda, concorrência e intelligence de mercado no contexto de live marketing."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <SummaryCard title="Pipeline aberto" value="R$ 1,18 mi" hint="Oportunidades e projetos em produção" icon={Wallet} />
        <SummaryCard title="Conversão" value="42%" hint="Média do trimestre em propostas aceitas" icon={BarChart3} />
        <SummaryCard title="Eventos do mês" value="12" hint="Inclui entregas, apresentações e ativações" icon={CalendarDays} />
        <SummaryCard title="Sinais de mercado" value="5" hint="Fontes de conteúdo monitoradas" icon={Newspaper} />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1.4fr_1fr]">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Mapa dos módulos</CardTitle>
            <CardDescription>Navegue pelas áreas principais do dashboard e evolua cada frente separadamente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="rounded-3xl border border-border bg-background/70 p-5 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <p className="text-lg font-semibold">{section.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-primary">
                  Abrir módulo
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leitura rápida</CardTitle>
            <CardDescription>Os blocos já cobrem operação, negócios e intelligence em uma UI escura única.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-sm text-muted-foreground">Portfólio</p>
              <p className="mt-2 font-medium">Kanban com cadastro de projetos, anexos e backlog de oportunidades.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-sm text-muted-foreground">Analytics</p>
              <p className="mt-2 font-medium">Gráficos de barras, linhas e composição de clientes para análise comercial.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-sm text-muted-foreground">Competição + Mercado</p>
              <p className="mt-2 font-medium">Benchmark de agências e feed temático para apoiar direção estratégica.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-sm text-muted-foreground">Radar</p>
              <p className="mt-2 font-medium">Calendário central com filtros por cliente e tipo de atividade crítica.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
