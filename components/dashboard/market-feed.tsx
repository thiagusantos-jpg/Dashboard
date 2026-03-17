"use client";

import { useMemo, useState } from "react";
import { Bookmark, Newspaper, RadioTower, Star } from "lucide-react";

import { SummaryCard } from "@/components/dashboard/summary-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { initialFeedItems, type FeedItem, type FeedTopic } from "@/lib/data";

const topics: Array<FeedTopic | "Todos"> = [
  "Todos",
  "Tendências de eventos",
  "Tecnologia para eventos",
  "Cases de sucesso",
  "Feiras e congressos",
  "Inovação em experiências"
];

export function MarketFeed() {
  const [topic, setTopic] = useState<FeedTopic | "Todos">("Todos");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    return initialFeedItems.filter((item) => topic === "Todos" || item.topic === topic);
  }, [topic]);

  function toggleFavorite(item: FeedItem) {
    setFavorites((current) => (current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]));
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 xl:grid-cols-4">
        <SummaryCard title="Fontes monitoradas" value="5" hint="Mundo do Marketing, Meio & Mensagem, ProXXIma, Event Marketer e BizBash" icon={RadioTower} />
        <SummaryCard title="Itens no feed" value={String(filteredItems.length)} hint="Volume no recorte atual" icon={Newspaper} />
        <SummaryCard title="Favoritos salvos" value={String(favorites.length)} hint="Curadoria interna" icon={Bookmark} />
        <Card className="border-primary/20 bg-primary/10">
          <CardHeader>
            <CardTitle>Filtro por tópico</CardTitle>
            <CardDescription>Recorte editorial para tendências, tecnologia e cases.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={topic} onChange={(event) => setTopic(event.target.value as FeedTopic | "Todos")}>
              {topics.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {filteredItems.map((item) => {
          const isFavorite = favorites.includes(item.id);
          return (
            <Card key={item.id} className="flex h-full flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <Badge variant="secondary">{item.topic}</Badge>
                  <button className={`rounded-full border p-2 transition-colors ${isFavorite ? "border-warning/30 bg-warning/10 text-warning" : "border-border text-muted-foreground"}`} onClick={() => toggleFavorite(item)}>
                    <Star className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>
                <CardTitle className="leading-snug">{item.title}</CardTitle>
                <CardDescription>
                  {item.source} • {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <p className="text-sm text-muted-foreground">{item.summary}</p>
                <div className="rounded-2xl border border-border bg-background/70 p-3 text-xs text-muted-foreground">
                  Estrutura pronta para conectar RSS reais via rota server-side e atualização periódica.
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
