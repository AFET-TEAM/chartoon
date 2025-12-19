import { useEffect, useRef } from "react";
import type { ChartId } from "../../lib/constants";
import {
  ChartoonBarChart,
  ChartoonBasicLineChart,
  ChartoonPieChart,
  ChartoonMapChart,
  ChartoonBulletChart,
} from "chartoon";

interface ChartPlaceholderProps {
  chartId: ChartId;
  title: string;
  height?: string;
}

export default function ChartPlaceholder({
  chartId,
  title,
  height = "h-80",
}: ChartPlaceholderProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear any existing content
    mountRef.current.innerHTML = "";

    let chart: any = null;
    let resizeObserver: ResizeObserver | null = null;
    let onWindowResize: (() => void) | null = null;

    const mountEl = mountRef.current;

    try {
      switch (chartId) {
        case "bar": {
          const createBar = () => {
            if (!mountEl) return;
            // reset container before (re)creating
            mountEl.innerHTML = "";
            const rect = mountEl.getBoundingClientRect();
            const width = Math.max(300, Math.min(700, Math.round(rect.width)));
            const height = Math.max(200, Math.min(320, Math.round(rect.height)));
            chart = new (ChartoonBarChart as any)(mountEl, {
              data: [{ title: "Series 1", data: [{ label: "A", value: 30 }, { label: "B", value: 55 }] }],
              width,
              height,
              colors: ["#1976d2"],
              responsive: true,
            });
          };

          // initial create
          createBar();

          // observe for size changes and recreate chart when needed
          if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
              createBar();
            });
            resizeObserver.observe(mountEl);
          } else {
            onWindowResize = () => createBar();
            window.addEventListener("resize", onWindowResize);
          }

          break;
        }

        case "line": {
          chart = new (ChartoonBasicLineChart as any)(mountEl, {
            data: [
              { title: "Jan", data: [{ label: "A", value: 30 }, { label: "B", value: 50 }] },
              { title: "Feb", data: [{ label: "A", value: 40 }, { label: "B", value: 60 }] },
            ],
            width: 720,
            height: 320,
            colors: ["#1976d2", "#60a5fa"],
            responsive: true,
          });
          break;
        }

        case "pie": {
          // Chartoon Pie expects grouped data: [{ title, data: [{ label, value }] }]
          chart = new (ChartoonPieChart as any)(mountEl, {
            data: [{ title: "Series 1", data: [{ label: "A", value: 30 }, { label: "B", value: 70 }] }],
            width: 320,
            height: 320,
            tooltipVisible: true,
          });
          break;
        }

        case "world": {
          const createWorld = () => {
            if (!mountEl) return;
            mountEl.innerHTML = "";
            const rect = mountEl.getBoundingClientRect();
            const width = Math.max(320, Math.min(900, Math.round(rect.width)));
            const height = Math.max(240, Math.min(600, Math.round(rect.height || Math.round(width * 0.6))));

            chart = new (ChartoonMapChart as any)(mountEl, {
              region: "uk",
              width,
              height,
              responsive: true,
            });
          };

          // initial create
          createWorld();

          // observe for size changes
          if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
              createWorld();
            });
            resizeObserver.observe(mountEl);
          } else {
            onWindowResize = () => createWorld();
            window.addEventListener("resize", onWindowResize);
          }

          break;
        }

        case "bullet": {
          chart = new (ChartoonBulletChart as any)(mountEl, {
            data: [{ title: "Revenue", ranges: [100, 200, 300], measures: [220], markers: [250] }],
            width: 800,
            height: 240,
          });
          break;
        }

        default: {
          // no-op; keep placeholder
        }
      }
    } catch (e) {
      // If chart instantiation fails, leave placeholder text
      // eslint-disable-next-line no-console
      console.error("Chart mount error:", e);
    }

    return () => {
      if (mountEl) mountEl.innerHTML = "";
      if (resizeObserver) resizeObserver.disconnect();
      if (onWindowResize) window.removeEventListener("resize", onWindowResize);
      chart = null;
    };
  }, [chartId]);

  return (
    <div
      className={`w-full ${height} rounded-md bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center`}
      data-chart-detail={chartId}
    >
      {chartId === "get-started" ? (
        <span className="text-neutral-500">{title} will render here</span>
      ) : (
        <div ref={mountRef} className="w-full h-full" />
      )}
    </div>
  );
}
