"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "../i18n/LocaleProvider";
import { ChartoonMapChart } from "chartoon"; 
import { useEffect, useRef } from "react";
import logo from "../assets/images/logo.png"
export default function Hero() {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !chartRef.current) {
      containerRef.current.style.position = "relative";
      chartRef.current = new ChartoonMapChart(containerRef.current, {
        region: "eu", // "tr" | "eu" | "uk"
        data: [
          { name: "France", value: 10 },
          { name: "Germany", value: 20 },
        ],
        tooltipVisible: true,
        color: "#d8e6ff",
        responsive: true, 
        width: 900,
        height: 600,
      } as any);
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
      chartRef.current = null;
    };
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 py-16">
      <div className="flex-1">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{t("hero.title")}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl">{t("hero.desc")}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/get-started"
            className="inline-flex items-center px-5 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-95 border border-neutral-200 dark:border-neutral-700"
          >
            {t("hero.cta_start")}
          </Link>
        </div>
      </div>

      <div className="flex-1">
{/* <div ref={containerRef} style={{ width: "100%", height: 600 , borderRadius: 12, maxHeight: "50%"}} /> */}
    <img src={logo.src} alt="Chartoon Logo" />
      </div>
    </section>
  );
}
