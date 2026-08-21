/*
 * Builds resume.docx from profile.ts — same content, same company grouping as
 * the /resume page. Deliberately conservative Word output for ATS parsing:
 * single column, no tables, no text boxes, real bullet numbering, standard
 * heading levels, US Letter.
 */

import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  Tab,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx';

const INK = '14140F';
const MUTED = '45443C';
const FAINT = '6B6960';
const RULE = 'D6D3CA';

const FONT = 'Calibri';

/** Paragraph with a right tab stop at the margin, for "left text …… date". */
const rowWithDate = (leftRuns, date, opts = {}) =>
  new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    spacing: { before: opts.before ?? 0, after: opts.after ?? 40 },
    ...(opts.heading && { heading: opts.heading }),
    children: [
      ...leftRuns,
      new TextRun({ children: [new Tab()] }),
      new TextRun({ text: date, font: FONT, size: 18, color: FAINT }),
    ],
  });

const body = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: opts.after ?? 60 },
    children: [
      new TextRun({ text, font: FONT, size: opts.size ?? 21, color: opts.color ?? INK }),
    ],
  });

const sectionHeading = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 220, after: 90 },
    border: {
      bottom: { style: 'single', size: 4, color: RULE, space: 2 },
    },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: 19,
        bold: true,
        allCaps: true,
        color: FAINT,
        characterSpacing: 24,
      }),
    ],
  });

const techLine = (items) =>
  new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: 'Tech: ', font: FONT, size: 19, bold: true, color: FAINT }),
      new TextRun({ text: items.join(' · '), font: FONT, size: 19, color: MUTED }),
    ],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: 'resume-bullets', level: 0 },
    spacing: { after: 30 },
    children: [new TextRun({ text, font: FONT, size: 21, color: INK })],
  });

const link = (text, href) =>
  new ExternalHyperlink({
    link: href,
    children: [new TextRun({ text, font: FONT, size: 19, color: MUTED })],
  });

export async function buildResumeDocx(profile) {
  // Same company grouping as the /resume page: consecutive roles at one
  // employer read as progression, not separate jobs.
  const companies = [];
  for (const job of profile.work) {
    const current = companies.at(-1);
    if (current && current.company === job.company) current.roles.push(job);
    else companies.push({ company: job.company, location: job.location, roles: [job] });
  }
  const tenure = (c) => `${c.roles.at(-1).start} – ${c.roles[0].end}`;
  const techFor = (c) => [...new Set(c.roles.flatMap((r) => r.tech ?? []))];
  const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  const children = [
    /* ── Header ── */
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { after: 20 },
      children: [new TextRun({ text: profile.name, font: FONT, size: 52, bold: true, color: INK })],
    }),
    body(profile.role, { size: 25, color: MUTED, after: 90 }),
    new Paragraph({
      spacing: { after: 40 },
      children: [
        new TextRun({ text: `${profile.location}  ·  `, font: FONT, size: 19, color: MUTED }),
        link(profile.email, `mailto:${profile.email}`),
        ...(profile.phone
          ? [new TextRun({ text: `  ·  ${profile.phone}`, font: FONT, size: 19, color: MUTED })]
          : []),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        link(bare(profile.social.github), profile.social.github),
        new TextRun({ text: '  ·  ', font: FONT, size: 19, color: MUTED }),
        link(bare(profile.social.linkedin), profile.social.linkedin),
      ],
    }),

    /* ── Summary ── */
    sectionHeading('Summary'),
    body(profile.summary, { after: 80 }),

    /* ── Experience ── */
    sectionHeading('Experience'),
    ...companies.flatMap((c) => [
      rowWithDate(
        [new TextRun({ text: c.company, font: FONT, size: 23, bold: true, color: INK })],
        tenure(c),
        { before: 60 },
      ),
      ...(c.location ? [body(c.location, { size: 19, color: FAINT, after: 50 })] : []),
      ...c.roles.flatMap((role) => [
        c.roles.length > 1
          ? rowWithDate(
              [new TextRun({ text: role.role, font: FONT, size: 21, bold: true, color: INK })],
              `${role.start} – ${role.end}`,
              { before: 40 },
            )
          : new Paragraph({
              spacing: { before: 40, after: 40 },
              children: [new TextRun({ text: role.role, font: FONT, size: 21, bold: true, color: INK })],
            }),
        body(role.summary, { color: MUTED, after: 40 }),
        ...(role.highlights ?? []).map(bullet),
      ]),
      techLine(techFor(c)),
    ]),

    /* ── Skills ── */
    sectionHeading('Skills'),
    ...profile.stack.map(
      (group) =>
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: `${group.title}: `, font: FONT, size: 21, bold: true, color: INK }),
            new TextRun({ text: group.items.join(' · '), font: FONT, size: 21, color: MUTED }),
          ],
        }),
    ),

    /* ── Projects ── */
    sectionHeading('Projects'),
    ...profile.projects.flatMap((project) => [
      rowWithDate(
        [new TextRun({ text: project.name, font: FONT, size: 21, bold: true, color: INK })],
        project.year,
        { before: 40 },
      ),
      body(project.blurb, { color: MUTED, after: 30 }),
      techLine(project.tech),
    ]),

    /* ── Education ── */
    sectionHeading('Education'),
    ...profile.education.flatMap((school) => [
      rowWithDate(
        [new TextRun({ text: school.school, font: FONT, size: 21, bold: true, color: INK })],
        `${school.start} – ${school.end}`,
        { before: 40 },
      ),
      body(school.degree, { size: 19, color: MUTED }),
    ]),
  ];

  const doc = new Document({
    creator: profile.name,
    title: `${profile.name} — Résumé`,
    subject: `${profile.role} — résumé of ${profile.name}`,
    keywords: [profile.role, ...profile.stack.flatMap((g) => g.items)].join(', '),
    styles: {
      default: {
        document: { run: { font: FONT, size: 21, color: INK } },
      },
    },
    numbering: {
      config: [
        {
          reference: 'resume-bullets',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: { indent: { left: 360, hanging: 180 } },
              },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            // US Letter, in DXA (1440 = 1 inch).
            size: { width: 12240, height: 15840 },
            margin: { top: 720, bottom: 720, left: 864, right: 864 },
          },
        },
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}
