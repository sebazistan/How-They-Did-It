import { marked } from 'marked';
import type { Lang } from '../i18n/ui';

export interface Episode {
  slug: string;
  label: string;
  number: number;
  publishedOn: string;
  byline: string;
  coverImage: string;
  soundcloudUrl: string;
  youtubeUrl: string;
  needsFrenchTranslation: boolean;
  needsEnglishTranslation: boolean;
  titleEn: string;
  summaryEn: string;
  bodyEn: string;
  photoCreditEn: string;
  titleFr: string;
  summaryFr: string;
  bodyFr: string;
  photoCreditFr: string;
}

const episodeFiles = import.meta.glob('../content/episodes/*.json', { eager: true, import: 'default' }) as Record<string, any>;

export function getEpisodes(): Episode[] {
  return Object.entries(episodeFiles)
    .map(([file, data]) => ({ ...data, slug: file.split('/').pop()!.replace(/\.json$/, '') }) as Episode)
    .sort((a, b) => b.number - a.number);
}

// Singleton files are read straight from JSON so the build never depends on the editor.
const singles = import.meta.glob('../content/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const single = (name: string) => singles[`../content/${name}.json`] ?? {};

export const pages = () => single('pages') as Record<string, string>;
export const team = () => (single('team').members ?? []) as Array<{ name: string; photo: string; roleEn: string; roleFr: string; bioEn: string; bioFr: string }>;
export const links = () => (single('links').links ?? []) as Array<{ name: string; url: string; descEn: string; descFr: string }>;

/** Pick the English or French version of a field: pick(obj, 'title', 'fr') reads obj.titleFr. */
export function pick<T extends Record<string, any>>(obj: T, base: string, lang: Lang): string {
  return (obj[base + (lang === 'fr' ? 'Fr' : 'En')] ?? '') as string;
}

export function needsTranslation(ep: Episode, lang: Lang): boolean {
  return lang === 'fr' ? !!ep.needsFrenchTranslation : !!ep.needsEnglishTranslation;
}

export function markdown(text: string): string {
  return marked.parse(text ?? '', { async: false, breaks: false }) as string;
}

export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function youtubeId(url: string): string | null {
  const m = url?.match(/(?:v=|embed\/|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
