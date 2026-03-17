# Live Marketing Dashboard

## Stack

- Next.js 15 com App Router e TypeScript.
- Tailwind CSS para layout, tokens visuais e tema escuro global.
- Componentes locais no estilo `shadcn/ui` em `components/ui`.
- `recharts` para gráficos de barras, linhas e pizza.
- `date-fns` para montagem do calendário mensal.
- `lucide-react` para ícones.

## Estrutura de pastas

- `app/`: rotas principais do dashboard (`/`, `/portfolio`, `/metrics`, `/calendar`, `/benchmark`, `/feed`).
- `components/dashboard/`: shell compartilhado e módulos de cada área.
- `components/ui/`: primitives reutilizáveis no padrão `shadcn/ui`.
- `lib/data.ts`: dados mockados tipados para projetos, métricas, calendário, benchmark e feed.
- `lib/utils.ts`: utilitário `cn` para composição de classes Tailwind.

## Convenções de componentes

- Componentes compartilhados ficam em `components/dashboard` e são separados por contexto de negócio.
- Primitives de interface ficam em `components/ui` com API simples e estilo consistente com o tema escuro.
- Páginas em `app/*/page.tsx` apenas compõem header + módulo principal.
- Componentes com estado local usam `"use client"` e guardam filtros, favoritos e formulários em memória.

## Decisões de setup

- O tema escuro é aplicado globalmente via variáveis CSS em `app/globals.css` e classe `dark` no `html`.
- A navegação lateral é fixa no desktop e vira barra horizontal no mobile para preservar acesso às seis seções.
- O projeto foi estruturado com dados mockados locais para permitir construção completa da interface sem depender de backend.
- O feed de mercado foi deixado preparado para futura conexão com RSS server-side, mas atualmente usa dados estáticos para a camada visual.
- Os componentes `ui` seguem a convenção do `shadcn/ui`, mas foram adicionados manualmente porque o ambiente atual não tem `node`, `npm` nem CLI disponível para instalação e geração automática.
- Não foi possível executar `npm install`, `next build` ou `next lint` neste ambiente porque `node` e `npm` não estão instalados no shell atual.
