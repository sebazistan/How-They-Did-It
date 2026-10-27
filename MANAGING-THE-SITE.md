# Managing the How They Did It site

## Adding a new episode (for the editor)
1. Open `https://www.canadianinvestigativejournalism.ca/keystatic` and sign in with GitHub (one-time setup, see below).
2. Click **Episodes** > **Create**.
3. Fill in the name (e.g. "Episode 9"), number, date, cover image, SoundCloud link, then the ENGLISH boxes and the FRANÇAIS boxes.
4. If one language is not ready, copy the text into both and tick **TRANSLATION NEEDED**. Visitors then see a clear notice, and the build lists it. Untick when done.
5. Click **Save**. The site updates itself in about a minute.

Article text is plain text: leave a blank line between paragraphs.

## What is NOT finished yet (needs the owner)
- **Web3Forms key** for the contact form: create a free form at web3forms.com, paste the key into `web3formsKey` in `src/i18n/ui.ts`. Until then the form opens the visitor's email app.
- **Browser editor login** (Keystatic on Cloudflare): needs a GitHub App and 3 settings in Cloudflare (`KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`). Not tested live yet.
- **Translations** for episodes 5, 7, 8 (French) and 6 (English).
- Cloudflare account, DNS cutover, and GitHub push.

## On your own computer
`npm install`, then `npm run dev` and open http://localhost:4321/keystatic. `npm run build` runs the safety check first.
