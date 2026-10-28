# Managing the How They Did It site

## Adding a new episode (for the editor)
1. Open `https://www.canadianinvestigativejournalism.ca/keystatic` and sign in (Keystatic Cloud, see "One-time setup").
2. Click **Episodes**, then **Create**.
3. Fill in the name (for example "Episode 9"), number, date, cover image, SoundCloud link, then the ENGLISH boxes and the FRANÇAIS boxes.
4. If one language is not ready, copy the text into both and tick **TRANSLATION NEEDED**. Visitors then see a clear notice, and the build lists it. Untick when done.
5. Click **Save**. The site updates itself in about two minutes.

Article text is plain text: leave a blank line between paragraphs.

## One-time setup (owner)
- **Keystatic Cloud (browser editor).** Create a free account at https://keystatic.cloud, then a team and a project connected to the GitHub repo (branch `main`). Set the project's **Primary URL** to `https://www.canadianinvestigativejournalism.ca`, or sign-in is refused. Copy the project key (format `team/project`) into `cloud.project` in `keystatic.config.ts`. Free plan: up to 3 users per team. There are no roles: anyone invited can edit everything.
- **Contact form.** Create a free form at web3forms.com and paste its access key into `web3formsKey` in `src/i18n/ui.ts`. Until then the form opens the visitor's email app.

## Still to do
- French text for episodes 5, 7 and 8; English text for episode 6 (each is ticked TRANSLATION NEEDED).
- Move the domain from Webflow to Cloudflare (DNS is at Squarespace; there is no email on the domain).

## On your own computer
`npm install`, then `npm run dev` and open http://localhost:4321/keystatic. `npm run build` runs the safety check first, so a broken edit never goes live.
