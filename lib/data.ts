export type ProjectStatus = "Em andamento" | "Em briefing" | "Concluído" | "Backlog";
export type ProjectType = "Key Visual" | "Identidade" | "Arquitetura 3D" | "Estande";

export type Project = {
  id: string;
  name: string;
  client: string;
  type: ProjectType;
  status: ProjectStatus;
  deadline: string;
  investment: number;
  owner: string;
  notes: string;
  references: string[];
  presentations: string[];
};

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    name: "Roadshow Imersivo 2026",
    client: "Ambev",
    type: "Estande",
    status: "Em andamento",
    deadline: "2026-04-02",
    investment: 285000,
    owner: "Time Criação",
    notes: "Aprovação de cenografia na sexta. Prioridade para captação de fornecedores LED.",
    references: ["Paleta neon industrial", "Moodboard ativações sensoriais"],
    presentations: ["Kickoff deck v2.pdf", "Proposta cenografia.pptx"]
  },
  {
    id: "proj-2",
    name: "Convenção de Vendas FY26",
    client: "Nestlé",
    type: "Arquitetura 3D",
    status: "Em briefing",
    deadline: "2026-03-28",
    investment: 118000,
    owner: "Planejamento",
    notes: "Cliente quer fluxo modular para 4 plenárias simultâneas.",
    references: ["Benchmark pavilhão modular"],
    presentations: ["Briefing inicial.pdf"]
  },
  {
    id: "proj-3",
    name: "Lançamento Linha Premium",
    client: "Natura",
    type: "Key Visual",
    status: "Concluído",
    deadline: "2026-02-18",
    investment: 76000,
    owner: "Design",
    notes: "Projeto entregue e aprovado com desdobramentos para digital signage.",
    references: ["Fotografia botanical premium"],
    presentations: ["Entrega final.zip"]
  },
  {
    id: "proj-4",
    name: "Feira Internacional de Mobilidade",
    client: "BYD",
    type: "Identidade",
    status: "Backlog",
    deadline: "2026-05-17",
    investment: 154000,
    owner: "Novos Negócios",
    notes: "Oportunidade aguardando definição de budget.",
    references: ["Direção visual clean-tech"],
    presentations: ["Escopo preliminar.docx"]
  }
];

export const monthlyProjects = [
  { label: "Jan", projetos: 8, receita: 180000, conversao: 33 },
  { label: "Fev", projetos: 11, receita: 245000, conversao: 39 },
  { label: "Mar", projetos: 14, receita: 310000, conversao: 44 },
  { label: "Abr", projetos: 10, receita: 268000, conversao: 37 },
  { label: "Mai", projetos: 16, receita: 356000, conversao: 48 },
  { label: "Jun", projetos: 18, receita: 402000, conversao: 53 }
];

export const revenueByService = [
  { name: "Key Visual", receita: 210000 },
  { name: "Arquitetura 3D", receita: 342000 },
  { name: "Identidade Visual", receita: 155000 },
  { name: "Materiais Impressos", receita: 98000 }
];

export const clientMix = [
  { name: "Recorrentes", value: 64 },
  { name: "Novos", value: 36 }
];

export const topClients = [
  { client: "Ambev", faturamento: 420000 },
  { client: "Natura", faturamento: 310000 },
  { client: "Nestlé", faturamento: 284000 },
  { client: "BYD", faturamento: 250000 },
  { client: "Heineken", faturamento: 214000 }
];

export type CalendarCategory = "deadline" | "evento" | "apresentacao" | "briefing";

export type CalendarItem = {
  id: string;
  title: string;
  client: string;
  date: string;
  category: CalendarCategory;
  notes: string;
};

export const initialCalendarItems: CalendarItem[] = [
  {
    id: "cal-1",
    title: "Entrega final KV roadshow",
    client: "Ambev",
    date: "2026-03-20",
    category: "deadline",
    notes: "Checar assets 4K e formatos para painel principal."
  },
  {
    id: "cal-2",
    title: "Evento cliente premium",
    client: "Natura",
    date: "2026-03-22",
    category: "evento",
    notes: "Acompanhamento de montagem in loco."
  },
  {
    id: "cal-3",
    title: "Apresentação proposta convenção",
    client: "Nestlé",
    date: "2026-03-25",
    category: "apresentacao",
    notes: "Versão final precisa incluir budget faseado."
  },
  {
    id: "cal-4",
    title: "Reunião de briefing feira",
    client: "BYD",
    date: "2026-03-26",
    category: "briefing",
    notes: "Levantar necessidades de área interativa."
  }
];

export type Agency = {
  id: string;
  name: string;
  segment: string;
  recentProjects: string;
  clients: string[];
  instagram: string;
  linkedin: string;
  behance: string;
  awards: number;
  positioning: string;
};

export const initialAgencies: Agency[] = [
  {
    id: "ag-1",
    name: "TSBetc",
    segment: "Eventos corporativos",
    recentProjects: "Convenções, ativações B2B, estandes premium",
    clients: ["Samsung", "Natura", "SAP"],
    instagram: "@tsbetc",
    linkedin: "/company/tsbetc",
    behance: "Portfólio ativo",
    awards: 6,
    positioning: "Alta entrega criativa com foco em grandes contas"
  },
  {
    id: "ag-2",
    name: "Sherpa42",
    segment: "Brand experience",
    recentProjects: "Experiências imersivas, festivais de marca",
    clients: ["Google", "Heineken"],
    instagram: "@sherpa42",
    linkedin: "/company/sherpa42",
    behance: "Seleção enxuta",
    awards: 4,
    positioning: "Narrativa experiencial e inovação digital"
  },
  {
    id: "ag-3",
    name: ".be comunica",
    segment: "Feiras e ativações",
    recentProjects: "Trade marketing e congressos",
    clients: ["Bayer", "BYD"],
    instagram: "@becomunica",
    linkedin: "/company/becomunica",
    behance: "Portfólio setorial",
    awards: 3,
    positioning: "Execução veloz com presença em feiras técnicas"
  },
  {
    id: "ag-4",
    name: "Confeti",
    segment: "Lançamentos e conteúdo",
    recentProjects: "Lançamentos de produto e press events",
    clients: ["L'Oréal", "Ambev"],
    instagram: "@confeti.ag",
    linkedin: "/company/confeti",
    behance: "Cases visuais fortes",
    awards: 5,
    positioning: "Visual premium com forte repercussão social"
  }
];

export type FeedTopic =
  | "Tendências de eventos"
  | "Tecnologia para eventos"
  | "Cases de sucesso"
  | "Feiras e congressos"
  | "Inovação em experiências";

export type FeedItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  summary: string;
  topic: FeedTopic;
};

export const initialFeedItems: FeedItem[] = [
  {
    id: "feed-1",
    title: "Marcas ampliam ativações sensoriais em convenções proprietárias",
    source: "Meio & Mensagem",
    publishedAt: "2026-03-15",
    summary: "Adoção de cenários imersivos e conteúdo modular cresce em convenções corporativas.",
    topic: "Inovação em experiências"
  },
  {
    id: "feed-2",
    title: "Como a IA está entrando no planejamento de eventos presenciais",
    source: "ProXXIma",
    publishedAt: "2026-03-14",
    summary: "Ferramentas de IA apoiam previsões de fluxo, personalização e operação ao vivo.",
    topic: "Tecnologia para eventos"
  },
  {
    id: "feed-3",
    title: "Feiras setoriais retomam protagonismo no calendário B2B",
    source: "Mundo do Marketing",
    publishedAt: "2026-03-13",
    summary: "Congressos e feiras especializadas seguem relevantes para geração de pipeline e relacionamento.",
    topic: "Feiras e congressos"
  },
  {
    id: "feed-4",
    title: "Case internacional mostra como medir engajamento em brand experience",
    source: "Event Marketer",
    publishedAt: "2026-03-12",
    summary: "A combinação de CRM, RFID e social listening melhora a leitura de ROI em ativações.",
    topic: "Cases de sucesso"
  },
  {
    id: "feed-5",
    title: "BizBash destaca formatos híbridos menores e mais premium",
    source: "BizBash",
    publishedAt: "2026-03-11",
    summary: "Eventos compactos, cenografia refinada e experiências personalizadas seguem em alta.",
    topic: "Tendências de eventos"
  }
];
