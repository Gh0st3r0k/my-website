import { locales, basePath, site, siteUrl } from "@/config/site";
// Static hosting cannot negotiate language on the server. Redirect before rendering
// the localized app, preserving query parameters and anchor targets.
const redirect = `(function(){var allowed=['en','sk','ru','uk'],saved='';try{var match=document.cookie.match(/(?:^|; )locale=([^;]*)/);saved=match?decodeURIComponent(match[1]):''}catch(e){}var languages=navigator.languages||[navigator.language];var locale=allowed.includes(saved)?saved:languages.map(function(l){return l.toLowerCase().split('-')[0]}).find(function(l){return allowed.includes(l)})||'en';location.replace(${JSON.stringify(basePath)}+'/'+locale+'/'+location.search+location.hash)})();`;
export const metadata = {
  title: site.name,
  alternates: {
    canonical: siteUrl("/en/"),
    languages: Object.fromEntries(
      locales.map((locale) => [locale, siteUrl(`/${locale}/`)]),
    ),
  },
};
export default function EntryPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <nav aria-label="Language">
        <a href={`${basePath}/en/`} lang="en">
          English
        </a>
        {" · "}
        <a href={`${basePath}/sk/`} lang="sk">
          Slovenčina
        </a>
        {" · "}
        <a href={`${basePath}/ru/`} lang="ru">
          Русский
        </a>
        {" · "}
        <a href={`${basePath}/uk/`} lang="uk">
          Українська
        </a>
      </nav>
    </>
  );
}
