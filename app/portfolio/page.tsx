import { DashboardHeader } from "@/components/dashboard/header";
import { ProjectPortfolio } from "@/components/dashboard/project-portfolio";

export default function PortfolioPage() {
  return (
    <div>
      <DashboardHeader
        title="Portfólio de Projetos"
        description="Gestão visual do pipeline de live marketing com kanban, cadastro de novos jobs, investimento, anexos e notas."
      />
      <ProjectPortfolio />
    </div>
  );
}
