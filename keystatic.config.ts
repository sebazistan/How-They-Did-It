import { config, fields, collection, singleton } from '@keystatic/core';

const note =
  'Plain text. Leave a blank line between paragraphs. Optional: **bold**, *italic*, [link text](https://address), "## Heading", and "- " for bullet lists.';

export default config({
  // On the live site the editor saves straight to GitHub. On your own computer (npm run dev) it saves to local files.
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: { owner: 'sebazistan', name: 'How-They-Did-It' } }
    : { kind: 'local' },
  ui: { brand: { name: 'How They Did It' } },
  collections: {
    episodes: collection({
      label: 'Episodes (add a new one here)',
      slugField: 'label',
      path: 'src/content/episodes/*',
      format: { data: 'json' },
      columns: ['number', 'titleEn', 'publishedOn'],
      schema: {
        label: fields.slug({
          name: {
            label: 'Episode name',
            description: 'Example: Episode 9. This also sets the web address (/episode/episode-9).',
          },
        }),
        number: fields.integer({
          label: 'Episode number',
          description: 'Used for ordering. Newest = highest number.',
          validation: { isRequired: true },
        }),
        publishedOn: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
        byline: fields.text({
          label: 'Written by (names only)',
          description: 'Example: Levon Enns-Kutcy and Chris Arsenault',
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/episodes',
          publicPath: '/images/episodes/',
          validation: { isRequired: true },
        }),
        soundcloudUrl: fields.text({
          label: 'SoundCloud player link',
          description: 'Paste the https://w.soundcloud.com/player/... address (SoundCloud: Share > Embed, the src="..." part).',
        }),
        youtubeUrl: fields.text({
          label: 'YouTube link (optional)',
          description: 'Example: https://www.youtube.com/watch?v=XXXXXXXXXXX',
        }),

        needsFrenchTranslation: fields.checkbox({
          label: '⚠ FRENCH TRANSLATION NEEDED',
          description:
            'Tick this while the French boxes below still hold English text. French visitors see a notice. Untick when the French is done.',
          defaultValue: false,
        }),
        needsEnglishTranslation: fields.checkbox({
          label: '⚠ ENGLISH TRANSLATION NEEDED',
          description:
            'Tick this while the English boxes below still hold French text. English visitors see a notice. Untick when done.',
          defaultValue: false,
        }),

        titleEn: fields.text({ label: 'ENGLISH - Title', validation: { isRequired: true } }),
        summaryEn: fields.text({ label: 'ENGLISH - Short summary', multiline: true, validation: { isRequired: true } }),
        bodyEn: fields.text({ label: 'ENGLISH - Article text', description: note, multiline: true }),
        photoCreditEn: fields.text({ label: 'ENGLISH - Photo caption / credit', multiline: true }),

        titleFr: fields.text({ label: 'FRANÇAIS - Titre', validation: { isRequired: true } }),
        summaryFr: fields.text({ label: 'FRANÇAIS - Court résumé', multiline: true, validation: { isRequired: true } }),
        bodyFr: fields.text({ label: 'FRANÇAIS - Texte de l’article', description: note, multiline: true }),
        photoCreditFr: fields.text({ label: 'FRANÇAIS - Légende / crédit photo', multiline: true }),
      },
    }),
  },
  singletons: {
    pages: singleton({
      label: 'Page texts (English / Français)',
      path: 'src/content/pages',
      format: { data: 'json' },
      schema: {
        homeAboutEn: fields.text({ label: 'Home - About blurb (EN)', multiline: true }),
        homeAboutFr: fields.text({ label: 'Accueil - À propos (FR)', multiline: true }),
        teamHeadingEn: fields.text({ label: 'Home - Team heading (EN)' }),
        teamHeadingFr: fields.text({ label: 'Accueil - Titre équipe (FR)' }),
        teamIntroEn: fields.text({ label: 'Home - Team intro (EN)', multiline: true }),
        teamIntroFr: fields.text({ label: 'Accueil - Intro équipe (FR)', multiline: true }),
        episodesIntroEn: fields.text({ label: 'Episodes page intro (EN)', multiline: true }),
        episodesIntroFr: fields.text({ label: 'Épisodes - intro (FR)', multiline: true }),
        interviewsIntroEn: fields.text({ label: 'Interviews page intro (EN)', multiline: true }),
        interviewsIntroFr: fields.text({ label: 'Entretiens - intro (FR)', multiline: true }),
        interviewsTitleFr: fields.text({ label: 'Entretiens - titre (FR)' }),
        videosTitleFr: fields.text({ label: 'Vidéos - titre (FR)' }),
        aboutIntroEn: fields.text({ label: 'About page text (EN)', description: note, multiline: true }),
        aboutIntroFr: fields.text({ label: 'À propos - texte (FR)', description: note, multiline: true }),
        contactHeadingFr: fields.text({ label: 'Contact - titre (FR)' }),
        contactIntroEn: fields.text({ label: 'Contact intro (EN)', multiline: true }),
        contactIntroFr: fields.text({ label: 'Contact - intro (FR)', multiline: true }),
      },
    }),
    team: singleton({
      label: 'Team members',
      path: 'src/content/team',
      format: { data: 'json' },
      schema: {
        members: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            photo: fields.image({ label: 'Photo', directory: 'public/images/site', publicPath: '/images/site/' }),
            roleEn: fields.text({ label: 'Role (EN)', multiline: true }),
            roleFr: fields.text({ label: 'Rôle (FR)', multiline: true }),
            bioEn: fields.text({ label: 'Bio (EN)', multiline: true }),
            bioFr: fields.text({ label: 'Bio (FR)', multiline: true }),
          }),
          { label: 'People', itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),
    links: singleton({
      label: 'Resources (links page)',
      path: 'src/content/links',
      format: { data: 'json' },
      schema: {
        links: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            url: fields.url({ label: 'Website address' }),
            descEn: fields.text({ label: 'Description (EN)', multiline: true }),
            descFr: fields.text({ label: 'Description (FR)', multiline: true }),
          }),
          { label: 'Links', itemLabel: (p) => p.fields.name.value },
        ),
      },
    }),
  },
});
