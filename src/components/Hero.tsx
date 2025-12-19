"use client";

import Link from "next/link";
import { useTranslation } from "../i18n/LocaleProvider";
import logo from "../assets/images/logo.png"
export default function Hero() {
  const { t } = useTranslation();



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
    <img src={logo.src} alt="Chartoon Logo" />
      </div>
    </section>
  );
}
