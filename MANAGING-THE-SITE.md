# Managing the How They Did It site

## Adding a new episode (for the editor)
1. Open `https://www.canadianinvestigativejournalism.ca/keystatic` and sign in (Keystatic Cloud, see "One-time setup").
2. Click **Episodes**, then **Create**.
3. Fill in the name (for example "Episode 9"), number, date, cover image, SoundCloud link, then the ENGLISH boxes and the FRANÇAIS boxes.
4. If one language is not ready, copy the text into both and tick **TRANSLATION NEEDED**. Visitors then see a clear notice, and the build lists it. Untick when done.
5. Click **Save**. The site updates itself in about two minutes.

Article text is plain text: leave a blank line between paragraphs.

## One-time setup (owner)
- **Keystatic Cloud (browser editor).** Create a free account at https://keystatic.cloud, then a team and a project connected to the GitHub repo (branch `main`). Set the project's **Primary URL** to `https://www.canadianinvestigativejournalism.ca`, or sign-in is refused. The project key (`huzzah/how-they-did-it`) is already set in `cloud.project` in `keystatic.config.ts`. Free plan: up to 3 users per team. There are no roles: anyone invited can edit everything.
- **Contact form.** Create a free form at web3forms.com and paste its access key into `web3formsKey` in `src/i18n/ui.ts`. Until then the form opens the visitor's email app.

## Still to do
- French text for episodes 5, 7 and 8; English text for episode 6 (each is ticked TRANSLATION NEEDED).
- Move the domain from Webflow to Cloudflare (DNS is at Squarespace; there is no email on the domain).

## On your own computer
`npm install`, then `npm run dev` and open http://localhost:4321/keystatic. `npm run build` runs the safety check first, so a broken edit never goes live.

## Writing article text (the box rules)
- Leave a blank line between paragraphs.
- `**like this**` makes bold text, `*like this*` makes italics, `[words](https://address)` makes a link.
- Leave `**` pairs alone unless the text between them should be bold. A lone `**` shows up on the page as two asterisks.
- Stay on the **main** branch in the editor. The "New branch" button makes a private copy that does not appear on the site.
- A save takes about two minutes to appear on the site.

## Translations
Each episode has an ENGLISH set of boxes and a FRANÇAIS set. While one language still holds the other language's text, tick **TRANSLATION NEEDED** on that episode. Visitors see a yellow notice on that language's page, and the build prints a reminder. Untick it when the translation is in. Currently flagged: episodes 5, 7 and 8 (French) and episode 6 (English).

## Accounts (who owns what)
| What | Where | Notes |
|---|---|---|
| Domain `canadianinvestigativejournalism.ca` | Squarespace (registrar; DNS moves to Cloudflare) | Renew yearly. Do not transfer or delete. |
| Hosting and DNS | Cloudflare (free plan) | Worker `how-they-did-it`, builds from GitHub on every change. |
| Code and content | GitHub `sebazistan/How-They-Did-It` | Every change is saved here. It is also the backup. |
| Browser editor | Keystatic Cloud, project `huzzah/how-they-did-it` | Free for up to 3 users. No roles: invited users can edit everything. |
| Contact form | Web3Forms (not set up yet) | Key goes in `src/i18n/ui.ts`. |
| Old site | Webflow | Keep the plan until the new site has been live a few days, then cancel. Export form submissions first. |

Turn on two-step verification for Squarespace, Cloudflare, GitHub and Keystatic Cloud.

## Safety check messages
`npm run build` stops, and the live site stays on its last good version, when an episode is missing a title, summary, date or cover image, when a cover photo file is missing, or when a SoundCloud link does not start with `https://w.soundcloud.com/player/`. The message names the episode and the problem. Notes about translations are warnings and do not stop the build.
