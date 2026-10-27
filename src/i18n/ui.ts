export type Lang = 'en' | 'fr';

// Fixed interface words (menus, buttons). Page and article text lives in the editor, not here.
export const ui = {
  en: {
    htmlLang: 'en',
    home: 'Home',
    episodes: 'Episodes',
    interviews: 'Interviews',
    articles: 'Articles',
    videos: 'Videos',
    about: 'About',
    aboutUs: 'About Us',
    resources: 'Resources',
    contact: 'Contact',
    language: 'Language',
    startListening: 'Start listening',
    readMore: 'Read More',
    seeEpisode: 'See episode',
    seeAll: 'See all episodes',
    readArticle: 'Read Article',
    allEpisodes: '< All Episodes',
    by: 'By',
    hosts: 'The Hosts',
    visit: 'Visit website',
    episodesTitle: 'Episodes',
    interviewsTitle: 'Text Interviews',
    videosTitle: 'Videos',
    aboutTitle: 'About',
    resourcesTitle: 'Resources',
    contactTitle: 'Shoot us a message',
    getInTouch: 'Get in touch',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    send: 'Send message',
    sending: 'Sending...',
    sent: 'Thank you! Your message has been sent.',
    failed: 'Sorry, something went wrong. Please email us directly instead.',
    needsTranslation: 'This page has not been translated into English yet.',
    watchOn: 'Watch on YouTube',
    notFoundTitle: 'Page not found',
    notFoundText: 'Sorry, we could not find that page.',
    backHome: 'Back to home',
    skip: 'Skip to content',
    follow: 'Follow us',
  },
  fr: {
    htmlLang: 'fr-CA',
    home: 'Accueil',
    episodes: 'Épisodes',
    interviews: 'Entretiens',
    articles: 'Articles',
    videos: 'Vidéos',
    about: 'À propos',
    aboutUs: 'À propos',
    resources: 'Ressources',
    contact: 'Contact',
    language: 'Langue',
    startListening: 'Commencez à écouter',
    readMore: 'En savoir plus',
    seeEpisode: 'Voir l’épisode',
    seeAll: 'Voir tous les épisodes',
    readArticle: 'Lire l’article',
    allEpisodes: '< Tous les épisodes',
    by: 'Par',
    hosts: 'Les hôtes',
    visit: 'Visiter le site',
    episodesTitle: 'Épisodes',
    interviewsTitle: 'Entretiens',
    videosTitle: 'Vidéos',
    aboutTitle: 'À propos',
    resourcesTitle: 'Ressources',
    contactTitle: 'Envoyez-nous un message',
    getInTouch: 'Écrivez-nous',
    name: 'Votre nom',
    email: 'Votre courriel',
    message: 'Votre message',
    send: 'Envoyer',
    sending: 'Envoi en cours...',
    sent: 'Merci ! Votre message a été envoyé.',
    failed: 'Désolé, une erreur s’est produite. Veuillez plutôt nous écrire directement par courriel.',
    needsTranslation: 'Cette page n’a pas encore été traduite en français.',
    watchOn: 'Regarder sur YouTube',
    notFoundTitle: 'Page introuvable',
    notFoundText: 'Désolé, cette page est introuvable.',
    backHome: 'Retour à l’accueil',
    skip: 'Passer au contenu',
    follow: 'Suivez-nous',
  },
} as const;

export const siteName = 'How They Did It';
export const social = [
  { name: 'YouTube', url: 'https://www.youtube.com/@HowTheyDidItSeries' },
  { name: 'Spotify', url: 'https://open.spotify.com/show/0rHhFWUGGJ1M4TEXSOmAUy?si=78875fd42e864993' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@howtheydiditseries' },
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com/us/podcast/how-they-did-it/id1840292633' },
];
export const contactEmail = 'howtheydidit@gmail.com';
// Free key from web3forms.com (public by design). Messages are emailed to the address you register there.
export const web3formsKey = '';

/** Address of a page in a language. path is the English path without a leading slash: '', 'episodes', 'episode/episode-3'. */
export function localePath(lang: Lang, path = ''): string {
  const p = path.replace(/^\/+|\/+$/g, '');
  if (lang === 'fr') return p ? `/fr-ca/${p}` : '/fr-ca';
  return p ? `/${p}` : '/';
}
