"use client";
import CodeTabs from "../CodeTabs";
import ChartPlaceholder from "../common/ChartPlaceholder";

import type { ChartId } from "../../lib/constants";

interface ChartDetailViewProps {
  chartId: ChartId;
  chartTitle: string;
  snippets: Record<string, string>;
}


export default function ChartDetailView({ chartId, chartTitle, snippets }: ChartDetailViewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mt-2">{chartTitle}</h1>
        </div>
        <ChartPlaceholder chartId={chartId} title={chartTitle} />
      </section>

      <aside>
        <h3 className="font-medium mb-3">Örnek kullanım</h3>
        <CodeTabs snippets={snippets} />
      </aside>
    </div>
  );
}
