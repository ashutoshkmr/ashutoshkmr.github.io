/*
 * Renders public/resume.pdf from the built /resume page, so the PDF can never
 * drift from src/data/profile.ts.
 *
 *   npm run build && npm run resume
 *
 * Steps: serve dist/ on a local port, print /resume with headless Chrome
 * (the same engine as the browser print dialog), then stamp PDF metadata
 * (author, subject, keywords) that Chrome does not write itself.
 *
 * Chrome is found via $CHROME_PATH or the usual install locations. Requires
 * Node ≥ 22.18 (imports the TypeScript profile directly).
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import { profile } from '../src/data/profile.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

if (!fs.existsSync(path.join(dist, 'resume', 'index.html'))) {
  console.error('dist/resume/index.html not found — run `npm run build` first.');
  process.exit(1);
}

/* ── Find a Chrome ──────────────────────────────────────────────────────── */

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  const candidates = {
    linux: [
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable',
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      // Playwright-managed Chromium, if one is installed.
      ...(fs.existsSync('/opt/pw-browsers')
        ? fs
            .readdirSync('/opt/pw-browsers')
            .filter((d) => d.startsWith('chromium-'))
            .map((d) => `/opt/pw-browsers/${d}/chrome-linux/chrome`)
        : []),
    ],
    darwin: [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ],
    win32: [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      `${process.env.LOCALAPPDATA ?? ''}\\Google\\Chrome\\Application\\chrome.exe`,
    ],
  }[process.platform] ?? [];

  const found = candidates.find((p) => fs.existsSync(p));
  if (!found) {
    console.error(
      'No Chrome/Chromium found. Install one or set CHROME_PATH to the binary.',
    );
    process.exit(1);
  }
  return found;
}

/* ── Serve dist/ ────────────────────────────────────────────────────────── */

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
  '.pdf': 'application/pdf', '.txt': 'text/plain', '.xml': 'application/xml',
  '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(dist, p);
  if (p.endsWith('/')) file = path.join(file, 'index.html');
  else if (!path.extname(file) && fs.existsSync(path.join(file, 'index.html')))
    file = path.join(file, 'index.html');

  if (!file.startsWith(dist) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

/* ── Print ──────────────────────────────────────────────────────────────── */

const chrome = findChrome();

// Chrome must run asynchronously: the file server above lives on this same
// event loop, and a synchronous exec would block it from ever responding.
async function printRoute(route) {
  const tmp = path.join(os.tmpdir(), `resume-${process.pid}-${route.replace(/\W/g, '')}.pdf`);
  const flags = [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    // Fast-forward timers/network so web fonts are settled before printing.
    '--virtual-time-budget=10000',
    `--print-to-pdf=${tmp}`,
  ];
  // Root (containers, CI images) cannot use the sandbox.
  if (typeof process.getuid === 'function' && process.getuid() === 0)
    flags.unshift('--no-sandbox');

  await new Promise((resolve, reject) => {
    const child = spawn(chrome, [...flags, `http://127.0.0.1:${port}${route}`], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    let stderr = '';
    child.stderr.on('data', (d) => (stderr += d));
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`Chrome took more than 60s to print ${route}.`));
    }, 60_000);
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0 && fs.existsSync(tmp)) resolve();
      else reject(new Error(`Chrome exited with ${code} on ${route}.\n${stderr.slice(-2000)}`));
    });
  });

  const bytes = fs.readFileSync(tmp);
  fs.rmSync(tmp);
  return bytes;
}

/* ── Metadata + write helpers ───────────────────────────────────────────── */

function write(name, bytes, note) {
  for (const out of [path.join(root, 'public', name), path.join(dist, name)]) {
    fs.writeFileSync(out, bytes);
    console.log(`wrote ${path.relative(root, out)} (${(bytes.length / 1024).toFixed(0)} KB${note ? `, ${note}` : ''})`);
  }
}

async function stamp(raw) {
  const doc = await PDFDocument.load(raw);
  doc.setTitle(`${profile.name} — Résumé`);
  doc.setAuthor(profile.name);
  doc.setSubject(`${profile.role} — résumé of ${profile.name}`);
  doc.setKeywords([profile.role, ...profile.stack.flatMap((g) => g.items)]);
  // Classic xref, no object streams: Chrome writes PDF 1.4 and the most
  // conservative ATS parsers cope with that best — don't upgrade it to 1.5.
  const bytes = await doc.save({ useObjectStreams: false });
  return { bytes, pages: doc.getPageCount() };
}

/* ── Produce all three artifacts ────────────────────────────────────────── */

const a4 = await stamp(await printRoute('/resume/'));
const letter = await stamp(await printRoute('/resume-letter/'));
server.close();

write('resume.pdf', a4.bytes, `A4, ${a4.pages} pages`);
write('resume-letter.pdf', letter.bytes, `US Letter, ${letter.pages} pages`);

const { buildResumeDocx } = await import('./resume-docx.mjs');
write('resume.docx', await buildResumeDocx(profile), 'US Letter');
