"use client";

import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import LanguageDropdown from "./common/LanguageDropdown";
import NavLink from "./common/NavLink";
import { useTranslation } from "../i18n/LocaleProvider";
import { NAV_LINKS } from "../lib/constants";

export default function Header() {
  const { locale, setLocale, t } = useTranslation();

  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-extrabold text-lg">{t("header.title")}</Link>
          <div className="text-sm text-neutral-500">{t("header.version")}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <LanguageDropdown locale={locale} setLocale={setLocale} />
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
