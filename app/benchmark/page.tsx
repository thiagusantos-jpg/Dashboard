import { DashboardHeader } from "@/components/dashboard/header";
import { AgencyBenchmark } from "@/components/dashboard/agency-benchmark";

export default function BenchmarkPage() {
  return (
    <div>
      <DashboardHeader
        title="Benchmark de Agências"
        description="Monitore agências concorrentes, clientes atendidos, posicionamento, presença digital e prêmios conquistados."
      />
      <AgencyBenchmark />
    </div>
  );
}
