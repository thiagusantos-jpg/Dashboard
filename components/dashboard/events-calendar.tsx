"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { NotebookPen, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { initialCalendarItems, type CalendarCategory, type CalendarItem } from "@/lib/data";

const categoryMap: Record<CalendarCategory, { label: string; color: string }> = {
  deadline: { label: "Deadline crítico", color: "bg-rose-500" },
  evento: { label: "Evento do cliente", color: "bg-sky-500" },
  apresentacao: { label: "Apresentação", color: "bg-emerald-500" },
  briefing: { label: "Briefing", color: "bg-amber-500" }
};

export function EventsCalendar() {
  const [monthCursor, setMonthCursor] = useState(new Date("2026-03-01"));
  const [items, setItems] = useState<CalendarItem[]>(initialCalendarItems);
  const [activityFilter, setActivityFilter] = useState<CalendarCategory | "todos">("todos");
  const [clientFilter, setClientFilter] = useState("todos");
  const [form, setForm] = useState({
    title: "",
    client: "",
    date: "",
    category: "deadline" as CalendarCategory,
    notes: ""
  });

  const clients = useMemo(() => ["todos", ...new Set(items.map((item) => item.client))], [items]);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(monthCursor), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(monthCursor), { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
  }, [monthCursor]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = activityFilter === "todos" || item.category === activityFilter;
      const clientMatch = clientFilter === "todos" || item.client === clientFilter;
      return categoryMatch && clientMatch;
    });
  }, [activityFilter, clientFilter, items]);

  function handleAddItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title || !form.client || !form.date) return;

    setItems((current) => [{ id: `cal-${crypto.randomUUID()}`, ...form }, ...current]);
    setForm({ title: "", client: "", date: "", category: "deadline", notes: "" });
  }

  return (
    <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>{format(monthCursor, "MMMM 'de' yyyy", { locale: ptBR })}</CardTitle>
              <CardDescription>Visualização mensal com múltiplos itens por dia e codificação por cor.</CardDescription>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setMonthCursor((current) => addMonths(current, -1))}>
                Mês anterior
              </Button>
              <Button variant="secondary" onClick={() => setMonthCursor((current) => addMonths(current, 1))}>
                Próximo mês
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <Select value={activityFilter} onChange={(event) => setActivityFilter(event.target.value as CalendarCategory | "todos")}>
                <option value="todos">Todas as atividades</option>
                <option value="deadline">Deadlines críticos</option>
                <option value="evento">Eventos dos clientes</option>
                <option value="apresentacao">Apresentações</option>
                <option value="briefing">Briefings</option>
              </Select>
              <Select value={clientFilter} onChange={(event) => setClientFilter(event.target.value)}>
                {clients.map((client) => (
                  <option key={client} value={client}>
                    {client === "todos" ? "Todos os clientes" : client}
                  </option>
                ))}
              </Select>
            </div>
            <div className="mb-3 grid grid-cols-7 gap-3 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-3">
              {days.map((day) => {
                const dayItems = filteredItems.filter((item) => item.date === format(day, "yyyy-MM-dd"));
                return (
                  <div key={day.toISOString()} className={`min-h-[160px] rounded-2xl border p-3 ${isSameMonth(day, monthCursor) ? "border-border bg-background/70" : "border-border/60 bg-secondary/30 text-muted-foreground"}`}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-medium">{format(day, "d")}</span>
                      {dayItems.length > 0 ? <Badge variant="secondary">{dayItems.length}</Badge> : null}
                    </div>
                    <div className="grid gap-2">
                      {dayItems.map((item) => (
                        <div key={item.id} className="rounded-xl border border-border/80 bg-card/80 p-2 text-xs">
                          <div className="mb-1 flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${categoryMap[item.category].color}`} />
                            <span className="font-medium">{item.title}</span>
                          </div>
                          <p className="text-muted-foreground">{item.client}</p>
                          <p className="mt-1 text-[11px] text-muted-foreground">{item.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Legenda da operação</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {Object.values(categoryMap).map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-2 text-sm">
                <span className={`h-3 w-3 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Adicionar item ao calendário</CardTitle>
          <CardDescription>Inclua entregas, eventos, apresentações e reuniões com notas operacionais.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleAddItem}>
            <Input placeholder="Título do item" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} />
            <Input placeholder="Cliente" value={form.client} onChange={(event) => setForm((current) => ({ ...current, client: event.target.value }))} />
            <Input type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} />
            <Select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as CalendarCategory }))}>
              {Object.entries(categoryMap).map(([value, meta]) => (
                <option key={value} value={value}>
                  {meta.label}
                </option>
              ))}
            </Select>
            <Textarea placeholder="Notas do item" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))} />
            <Button type="submit">
              <Plus className="h-4 w-4" />
              Inserir no calendário
            </Button>
          </form>

          <div className="mt-6 grid gap-3">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <NotebookPen className="h-4 w-4" />
              Próximas notas relevantes
            </p>
            {filteredItems.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-background/70 p-3 text-sm">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-muted-foreground">{item.notes}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
