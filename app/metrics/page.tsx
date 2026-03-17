import { DashboardHeader } from "@/components/dashboard/header";
import { MetricsDashboard } from "@/components/dashboard/metrics-dashboard";

export default function MetricsPage() {
  return (
    <div>
      <DashboardHeader
        title="Métricas de Negócio"
        description="Analytics de volume, receita, conversão comercial, mix de clientes e principais contas por faturamento."
      />
      <MetricsDashboard />
    </div>
  );
}
