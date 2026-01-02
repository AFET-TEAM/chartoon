"use client";
import { useState } from "react";
import { useTranslation } from "../../i18n/LocaleProvider";
import CodeTabs from "../CodeTabs";
import ChartPlaceholder from "../common/ChartPlaceholder";

import type { ChartId } from "../../lib/constants";

interface ChartDetailViewProps {
  chartId: ChartId;
  chartTitle: string;
  snippets: Record<string, string>;
}


export default function ChartDetailView({ chartId, chartTitle, snippets }: ChartDetailViewProps) {
  const [mapRegion, setMapRegion] = useState<string>("tr");
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section>
        <div className="mb-4">
          <h1 className="text-3xl font-bold mt-2">{chartTitle}</h1>
          {chartId === "world" && (
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setMapRegion("tr")}
                className={`px-3 py-1 rounded text-sm ${mapRegion === "tr" ? "btn-primary" : "btn-outline"}`}
              >
                {t("getStarted.mapRegions.turkey")}
              </button>
              <button
                onClick={() => setMapRegion("eu")}
                className={`px-3 py-1 rounded text-sm ${mapRegion === "eu" ? "btn-primary" : "btn-outline"}`}
              >
                {t("getStarted.mapRegions.europe")}
              </button>
              <button
                onClick={() => setMapRegion("uk")}
                className={`px-3 py-1 rounded text-sm ${mapRegion === "uk" ? "btn-primary" : "btn-outline"}`}
              >
                {t("getStarted.mapRegions.uk")}
              </button>
            </div>
          )}
        </div>
        <ChartPlaceholder chartId={chartId} title={chartTitle} mapRegion={mapRegion} />
      </section>

      <aside>
        <h3 className="font-medium mb-3">Örnek kullanım</h3>
        <CodeTabs snippets={snippets} />
      </aside>
    </div>
  );
}
