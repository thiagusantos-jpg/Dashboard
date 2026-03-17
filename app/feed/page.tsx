import { DashboardHeader } from "@/components/dashboard/header";
import { MarketFeed } from "@/components/dashboard/market-feed";

export default function FeedPage() {
  return (
    <div>
      <DashboardHeader
        title="Feed de Mercado"
        description="Consolide sinais de live marketing, eventos corporativos e brand experience em um feed temático com favoritos."
      />
      <MarketFeed />
    </div>
  );
}
