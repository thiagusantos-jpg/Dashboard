import { DashboardHeader } from "@/components/dashboard/header";
import { EventsCalendar } from "@/components/dashboard/events-calendar";

export default function CalendarPage() {
  return (
    <div>
      <DashboardHeader
        title="Calendário de Eventos"
        description="Visualização mensal da operação com deadlines críticos, apresentações, briefings e datas de evento filtráveis por cliente."
      />
      <EventsCalendar />
    </div>
  );
}
