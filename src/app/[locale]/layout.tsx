import { notFound } from "next/navigation";
import { isLocale, locales } from "@/config/site";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/cyrillic-400.css";
import "@fontsource/inter/cyrillic-ext-400.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/cyrillic-400.css";
import "@/styles/globals.css";
const themeInit = `(function(){var p='system';try{p=localStorage.getItem('appearance')||'system'}catch(e){}if(!['system','light','dark','contrast'].includes(p))p='system';var d=document.documentElement,m=matchMedia('(prefers-color-scheme: dark)');function apply(){d.dataset.theme=p==='system'?(m.matches?'dark':'light'):p}d.dataset.preference=p;apply();m.addEventListener('change',function(){p=d.dataset.preference;apply()})})();`;
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
