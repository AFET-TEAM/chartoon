import { useEffect, useRef } from "react";
import type { ChartId } from "../../lib/constants";
import {
  ChartoonBarChart,
  ChartoonBasicLineChart,
  ChartoonPieChart,
  ChartoonMapChart,
  ChartoonBulletChart,
  ChartoonRadarChart,
} from "chartoon";

interface ChartPlaceholderProps {
  chartId: ChartId;
  title: string;
  height?: string;
  mapRegion?: string;
}

export default function ChartPlaceholder({
  chartId,
  title,
  height = "h-80",
  mapRegion = "tr",
}: ChartPlaceholderProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Clear any existing content
    mountRef.current.innerHTML = "";

    let chart = null;
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
            chart = new (ChartoonBarChart)(mountEl, {
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
          chart = new (ChartoonBasicLineChart)(mountEl, {
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

        case "area": {
          const areaData = [
            { title: "Jan", data: [{ label: "A", value: 30 }, { label: "B", value: 50 }, { label: "C", value: 40 }] },
            { title: "Feb", data: [{ label: "A", value: 40 }, { label: "B", value: 60 }, { label: "C", value: 55 }] },
            { title: "Mar", data: [{ label: "A", value: 35 }, { label: "B", value: 55 }, { label: "C", value: 50 }] },
            { title: "Apr", data: [{ label: "A", value: 50 }, { label: "B", value: 70 }, { label: "C", value: 65 }] },
          ];

          chart = new (ChartoonBasicLineChart)(mountEl, {
            data: areaData,
            width: 720,
            height: 320,
            colors: ["#1976d2", "#60a5fa", "#ef4444"],
            responsive: true,
            type: "area",
          });
          break;
        }

        case "pie": {
          // Chartoon Pie expects grouped data: [{ title, data: [{ label, value }] }]
          new (ChartoonPieChart)(mountEl, {
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

            chart = new (ChartoonMapChart)(mountEl, {
              region: mapRegion,
              width,
              height,
              responsive: true,
              tooltipVisible: true,
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
          const createBullet = () => {
            if (!mountEl) return;
            mountEl.innerHTML = "";
            const rect = mountEl.getBoundingClientRect();
            const width = Math.max(400, Math.min(800, Math.round(rect.width)));
            const height = Math.max(200, Math.min(400, Math.round(rect.height)));

            const bulletData = [
              {
                title: "Gelir",
                subtitle: "2024 Q4",
                ranges: [150, 225, 300],
                measures: [220, 270],
                markers: [250],
              },
              {
                title: "Kar",
                subtitle: "2024 Q4",
                ranges: [20, 50, 100],
                measures: [35, 60],
                markers: [70],
              },
              {
                title: "Müşteri Memnuniyeti",
                subtitle: "Puan",
                ranges: [60, 80, 100],
                measures: [75, 90],
                markers: [85],
              },
            ];

            chart = new ChartoonBulletChart(mountEl, {
              data: bulletData,
              margin: { top: 20, right: 40, bottom: 20, left: 120 },
              width,
              height,
              responsive: true,
            });
          };

          // initial create
          createBullet();

          // observe for size changes
          if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
              createBullet();
            });
            resizeObserver.observe(mountEl);
          } else {
            onWindowResize = () => createBullet();
            window.addEventListener("resize", onWindowResize);
          }

          break;
        }

        case "radar": {
          const createRadar = () => {
            if (!mountEl) return;
            mountEl.innerHTML = "";
            const rect = mountEl.getBoundingClientRect();
            const width = Math.max(400, Math.min(600, Math.round(rect.width)));
            const height = Math.max(300, Math.min(400, Math.round(rect.height)));

            chart = new (ChartoonRadarChart)(mountEl, {
              data: [
                {
                  title: "Frontend",
                  data: [
                    { label: "Performance", value: 85 },
                    { label: "Accessibility", value: 70 },
                    { label: "SEO", value: 90 },
                    { label: "Best Practices", value: 80 },
                    { label: "UX", value: 88 },
                  ],
                },
                {
                  title: "Backend",
                  data: [
                    { label: "Performance", value: 78 },
                    { label: "Accessibility", value: 60 },
                    { label: "SEO", value: 65 },
                    { label: "Best Practices", value: 92 },
                    { label: "UX", value: 70 },
                  ],
                },
                {
                  title: "DevOps",
                  data: [
                    { label: "Performance", value: 90 },
                    { label: "Accessibility", value: 55 },
                    { label: "SEO", value: 50 },
                    { label: "Best Practices", value: 88 },
                    { label: "UX", value: 60 },
                  ],
                },
              ],
              width,
              height,
              responsive: true,
              colors: ["#ef4444", "#000000", "#3b82f6"],
              levels: 5,
              maxValue: 100,
              areaOpacity: 0.35,
              strokeWidth: 1,
              circleConfig: {
                radius: 4,
              },
            });
          };

          // initial create
          createRadar();

          // observe for size changes
          if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(() => {
              createRadar();
            });
            resizeObserver.observe(mountEl);
          } else {
            onWindowResize = () => createRadar();
            window.addEventListener("resize", onWindowResize);
          }

          break;
        }

        default: {
          // no-op; keep placeholder
        }
      }
    } catch (e) {
      // If chart instantiation fails, leave placeholder text
      console.error("Chart mount error:", e);
    }

    return () => {
      if (mountEl) mountEl.innerHTML = "";
      if (resizeObserver) resizeObserver.disconnect();
      if (onWindowResize) window.removeEventListener("resize", onWindowResize);
      chart = null;
    };
  }, [chartId, mapRegion]);

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
