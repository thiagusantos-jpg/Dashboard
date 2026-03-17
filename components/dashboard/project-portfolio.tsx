"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { CalendarClock, FileStack, ImagePlus, Plus, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialProjects, type Project, type ProjectStatus, type ProjectType } from "@/lib/data";

const statusColumns: ProjectStatus[] = ["Em andamento", "Em briefing", "Concluído", "Backlog"];
const projectTypes: ProjectType[] = ["Key Visual", "Identidade", "Arquitetura 3D", "Estande"];

type FormState = {
  name: string;
  client: string;
  type: ProjectType;
  status: ProjectStatus;
  deadline: string;
  investment: string;
  notes: string;
  references: string;
  presentations: string;
};

const emptyForm: FormState = {
  name: "",
  client: "",
  type: "Key Visual",
  status: "Em briefing",
  deadline: "",
  investment: "",
  notes: "",
  references: "",
  presentations: ""
};

function statusVariant(status: ProjectStatus) {
  switch (status) {
    case "Em andamento":
      return "default";
    case "Em briefing":
      return "warning";
    case "Concluído":
      return "success";
    case "Backlog":
      return "secondary";
  }
}

export function ProjectPortfolio() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [form, setForm] = useState<FormState>(emptyForm);

  const totals = useMemo(() => {
    const totalInvestment = projects.reduce((sum, project) => sum + project.investment, 0);
    const activeProjects = projects.filter((project) => project.status === "Em andamento").length;
    return {
      totalInvestment,
      activeProjects,
      backlog: projects.filter((project) => project.status === "Backlog").length
    };
  }, [projects]);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name || !form.client || !form.deadline || !form.investment) {
      return;
    }

    const newProject: Project = {
      id: `proj-${crypto.randomUUID()}`,
      name: form.name,
      client: form.client,
      type: form.type,
      status: form.status,
      deadline: form.deadline,
      investment: Number(form.investment),
      owner: "Novo projeto",
      notes: form.notes,
      references: form.references
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      presentations: form.presentations
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    };

    setProjects((current) => [newProject, ...current]);
    setForm(emptyForm);
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Projetos em andamento</CardDescription>
            <CardTitle className="text-3xl">{totals.activeProjects}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4 text-primary" />
            Entregas críticas concentradas nas próximas 2 semanas
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Investimento mapeado</CardDescription>
            <CardTitle className="text-3xl">
              {totals.totalInvestment.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="h-4 w-4 text-accent" />
            Pipeline somado entre entregas ativas e backlog comercial
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Backlog de oportunidades</CardDescription>
            <CardTitle className="text-3xl">{totals.backlog}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileStack className="h-4 w-4 text-emerald-300" />
            Demandas aguardando aprovação ou detalhamento de escopo
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Novo projeto</CardTitle>
            <CardDescription>Cadastre oportunidades e jobs de live marketing com anexos e notas.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <Input placeholder="Nome do projeto" value={form.name} onChange={(event) => updateField("name", event.target.value)} />
              <Input placeholder="Cliente" value={form.client} onChange={(event) => updateField("client", event.target.value)} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Select value={form.type} onChange={(event) => updateField("type", event.target.value as ProjectType)}>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                <Select value={form.status} onChange={(event) => updateField("status", event.target.value as ProjectStatus)}>
                  {statusColumns.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input type="date" value={form.deadline} onChange={(event) => updateField("deadline", event.target.value)} />
                <Input type="number" placeholder="Investimento (R$)" value={form.investment} onChange={(event) => updateField("investment", event.target.value)} />
              </div>
              <Input placeholder="Imagens de referência (separadas por vírgula)" value={form.references} onChange={(event) => updateField("references", event.target.value)} />
              <Input placeholder="Arquivos de apresentação (separados por vírgula)" value={form.presentations} onChange={(event) => updateField("presentations", event.target.value)} />
              <Textarea placeholder="Notas do projeto, briefing e observações..." value={form.notes} onChange={(event) => updateField("notes", event.target.value)} />
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4" />
                Adicionar projeto
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-4 xl:grid-cols-4">
          {statusColumns.map((status) => (
            <Card key={status} className="min-h-[640px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{status}</CardTitle>
                  <Badge variant={statusVariant(status)}>{projects.filter((project) => project.status === status).length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                {projects
                  .filter((project) => project.status === status)
                  .map((project) => (
                    <div key={project.id} className="rounded-2xl border border-border bg-background/70 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.client}</p>
                          <h3 className="mt-2 text-base font-semibold">{project.name}</h3>
                        </div>
                        <Badge variant={statusVariant(project.status)}>{project.type}</Badge>
                      </div>
                      <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                        <p>Deadline: {new Date(project.deadline).toLocaleDateString("pt-BR")}</p>
                        <p>
                          Investimento:{" "}
                          {project.investment.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            maximumFractionDigits: 0
                          })}
                        </p>
                        <p>Owner: {project.owner}</p>
                      </div>
                      <p className="mt-4 text-sm">{project.notes}</p>
                      <div className="mt-4 grid gap-3 text-sm">
                        <div>
                          <p className="mb-2 flex items-center gap-2 text-muted-foreground">
                            <ImagePlus className="h-4 w-4" />
                            Referências
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.references.map((reference) => (
                              <span key={reference} className="rounded-full border border-border bg-secondary px-2 py-1 text-xs">
                                {reference}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 flex items-center gap-2 text-muted-foreground">
                            <FileStack className="h-4 w-4" />
                            Arquivos
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.presentations.map((presentation) => (
                              <span key={presentation} className="rounded-full border border-border bg-secondary px-2 py-1 text-xs">
                                {presentation}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
