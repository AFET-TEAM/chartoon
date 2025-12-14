"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import en from "../../locales/en.json";
import tr from "../../locales/tr.json";

type Locale = "en" | "tr";

type Messages = typeof en;

interface I18nContextValue {
	locale: Locale;
	setLocale: (l: Locale) => void;
	t: (key: string, vars?: Record<string, string | number>) => string;
	messages: Messages;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
	const [locale, setLocale] = useState<Locale>("tr");

	const messages = useMemo(() => (locale === "tr" ? tr : en), [locale]);

	function t(key: string, vars?: Record<string, string | number>) {
		const parts = key.split(".");
		let res: unknown = messages as unknown;
		for (const p of parts) {
			res = (res as Record<string, unknown>)?.[p];
			if (res == null) return key;
		}
		if (typeof res === "string") {
			if (vars) {
				Object.keys(vars).forEach((k) => {
					res = (res as string).replace(`{${k}}`, String(vars[k]));
				});
			}
			return res;
		}
		return String(res ?? key);
	}

	return (
		<I18nContext.Provider value={{ locale, setLocale, t, messages }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useTranslation() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useTranslation must be used within LocaleProvider");
	return ctx;
}

