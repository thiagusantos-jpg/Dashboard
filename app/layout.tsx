import type { ReactNode } from "react";
import type { Metadata } from "next";

import "@/app/globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";

export const metadata: Metadata = {
  title: "Dashboard de Gestão de Projetos | Live Marketing",
  description: "Dashboard operacional para portfólio, métricas, calendário, benchmark e mercado."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body>
        <div className="min-h-screen xl:grid xl:grid-cols-[320px_minmax(0,1fr)]">
          <Sidebar />
          <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 xl:px-10 xl:py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
