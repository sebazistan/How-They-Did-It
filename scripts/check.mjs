// Safety check: runs before every build, so a broken edit can never go live (the site stays on its last good version).
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const problems = [];
const warnings = [];
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

const epDir = path.join(root, 'src/content/episodes');
const files = fs.readdirSync(epDir).filter((f) => f.endsWith('.json'));
if (!files.length) problems.push('No episodes found.');

for (const f of files) {
  const where = `Episode "${f.replace('.json', '')}"`;
  let ep;
  try {
    ep = read(path.join(epDir, f));
  } catch (e) {
    problems.push(`${where}: the file is damaged (not valid JSON).`);
    continue;
  }
  for (const k of ['titleEn', 'titleFr', 'summaryEn', 'summaryFr', 'publishedOn', 'coverImage']) {
    if (!ep[k]) problems.push(`${where}: "${k}" is empty.`);
  }
  if (!Number.isFinite(ep.number)) problems.push(`${where}: the episode number is missing.`);
  if (ep.coverImage && !fs.existsSync(path.join(root, 'public', ep.coverImage))) {
    problems.push(`${where}: the cover image file is missing (${ep.coverImage}).`);
  }
  if (ep.soundcloudUrl && !/^https:\/\/w\.soundcloud\.com\/player\//.test(ep.soundcloudUrl)) {
    problems.push(`${where}: the SoundCloud link must start with https://w.soundcloud.com/player/`);
  }
  if (ep.youtubeUrl && !/[\w-]{11}/.test(ep.youtubeUrl)) problems.push(`${where}: the YouTube link looks wrong.`);
  if (!ep.bodyEn) warnings.push(`${where}: English article text is empty.`);
  if (!ep.bodyFr) warnings.push(`${where}: French article text is empty.`);
  // Same text in both languages but nobody has flagged it: the exact slip this check exists to catch.
  if (ep.bodyEn && ep.bodyEn === ep.bodyFr && !ep.needsFrenchTranslation && !ep.needsEnglishTranslation) {
    warnings.push(`${where}: English and French text are identical. Tick "TRANSLATION NEEDED" if one is not translated yet.`);
  }
  if (ep.needsFrenchTranslation) warnings.push(`${where}: French translation still needed.`);
  if (ep.needsEnglishTranslation) warnings.push(`${where}: English translation still needed.`);
}

for (const name of ['pages', 'team', 'links']) {
  try {
    read(path.join(root, 'src/content', name + '.json'));
  } catch {
    problems.push(`src/content/${name}.json is missing or damaged.`);
  }
}
try {
  for (const m of read(path.join(root, 'src/content/team.json')).members) {
    if (m.photo && !fs.existsSync(path.join(root, 'public', m.photo))) problems.push(`Team photo missing for ${m.name} (${m.photo}).`);
  }
} catch {}

for (const w of warnings) console.warn('  note: ' + w);
if (problems.length) {
  console.error('\nSAFETY CHECK FAILED - the site was NOT built:\n' + problems.map((p) => '  - ' + p).join('\n') + '\n');
  process.exit(1);
}
console.log(`Safety check passed: ${files.length} episodes, ${warnings.length} note(s).`);
