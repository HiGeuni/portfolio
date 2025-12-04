import { en, ko } from "./translations";

type Locale = "en" | "ko";
type Translations = typeof en;

let currentLocale = $state<Locale>("en");

export const t = new Proxy({} as Translations, {
	get(_, prop: keyof Translations) {
		return currentLocale === "ko" ? ko[prop] : en[prop];
	},
});

export const locale = {
	get current() {
		return currentLocale;
	},
	set(value: Locale) {
		currentLocale = value;
	},
	toggle() {
		currentLocale = currentLocale === "en" ? "ko" : "en";
	},
};
