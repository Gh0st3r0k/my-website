import en from "./en.json";
import sk from "./sk.json";
import ru from "./ru.json";
import uk from "./uk.json";
import type { Locale } from "@/config/site";
export type MessageKey = keyof typeof en;
export type Dictionary = Record<MessageKey, string>;
const dictionaries: Record<Locale, Dictionary> = { en, sk, ru, uk };
export const messages = (locale: Locale) => dictionaries[locale];
