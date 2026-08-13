/* ────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE.
 *
 *  Every word on the site comes from here. Nothing else needs touching to
 *  change content — layout and styling live in src/components and src/styles.
 *
 *  Anything still reading "TODO" is a placeholder that needs your real details.
 *  The build prints a warning listing them, so you cannot ship them by accident.
 * ──────────────────────────────────────────────────────────────────────────── */

export type Link = { label: string; href: string };

export type Job = {
  company: string;
  role: string;
  /** Displayed verbatim, e.g. "2022" or "Jun 2017". */
  start: string;
  /** Use "Present" for the current role. */
  end: string;
  location?: string;
  summary: string;
  /** Two to four bullets. Lead with impact, not responsibilities. */
  highlights?: string[];
  tech?: string[];
  url?: string;
};

export type Project = {
  name: string;
  blurb: string;
  year: string;
  tech: string[];
  links?: Link[];
  /** Featured projects render first, with a heavier treatment. */
  featured?: boolean;
  /** Marks work that is no longer live / no longer maintained. */
  archived?: boolean;
};

export type Profile = typeof profile;

export const profile = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  name: 'Ashutosh Kumar',
  /** Shown under your name. Keep it to a few words. */
  role: 'TODO — your current title, e.g. Senior Software Engineer',
  /** One or two sentences. This is the first thing a recruiter reads. */
  tagline:
    'TODO — one line on what you build and what you are good at. ' +
    'Example: "I build backend systems that stay boring under load — ' +
    'currently payments infrastructure at Acme."',
  location: 'TODO — city, country',
  email: 'ashutoshkmr40@gmail.com',

  /** Set to null to hide the availability pill in the hero. */
  availability: 'TODO — e.g. "Open to senior backend roles"' as string | null,

  /* ── Links ────────────────────────────────────────────────────────────── */
  social: {
    github: 'https://github.com/ashutoshkmr',
    linkedin: 'https://www.linkedin.com/in/ashutoshkmr40/',
    /** Optional — set to null to hide. */
    x: null as string | null,
    /** Path is relative to /public. Replace the PDF with a current one. */
    resume: '/resume.pdf',
  },

  /* ── About ────────────────────────────────────────────────────────────── */
  /** Each string is its own paragraph. Two or three is plenty. */
  about: [
    'TODO — who you are professionally. What kind of problems you take on, ' +
      'what you have gotten good at over the years, and the kind of team you ' +
      'do your best work on.',
    'TODO — a second paragraph, optionally more personal: what you are ' +
      'learning right now, what you do away from the keyboard.',
  ],

  /* ── Work ─────────────────────────────────────────────────────────────── */
  /** Most recent first. */
  work: [
    {
      company: 'TODO — current company',
      role: 'TODO — your title',
      start: 'TODO',
      end: 'Present',
      location: 'TODO',
      summary:
        'TODO — one or two sentences on what the team owns and your part in it.',
      highlights: [
        'TODO — an outcome with a number attached, if you have one.',
        'TODO — something you built or led that you would happily be asked about.',
      ],
      tech: ['TODO', 'TODO'],
    },
    {
      company: 'Events Mosaic',
      role: 'Software Engineering Intern',
      start: 'Jun 2017',
      end: 'Jan 2018',
      location: 'Delhi, India',
      summary:
        'Early-stage startup digitising event vendors and their services. ' +
        'Worked across the web app and the Android release.',
      tech: ['Angular', 'Ionic', 'Node.js'],
      url: 'https://play.google.com/store/apps/details?id=org.mosaic.first.app',
    },
  ] satisfies Job[],

  /* ── Projects ─────────────────────────────────────────────────────────── */
  projects: [
    {
      name: 'TODO — your best recent project',
      blurb:
        'TODO — what it does and why it was interesting to build. One or two ' +
        'sentences. Lead with the problem, not the stack.',
      year: '2025',
      tech: ['TODO'],
      links: [{ label: 'Source', href: 'https://github.com/ashutoshkmr' }],
      featured: true,
    },
    {
      name: 'CrypTrace',
      blurb:
        'Hybrid mobile app tracking live prices for major cryptocurrencies ' +
        'across 50+ markets, with streaming updates and charting.',
      year: '2018',
      tech: ['Ionic', 'Angular', 'TypeScript', 'Socket.io', 'Chart.js'],
      links: [{ label: 'Source', href: 'https://github.com/ashutoshkmr/cryptrace' }],
      archived: true,
    },
    {
      name: 'CrypTrace PWA',
      blurb:
        'Progressive web app rebuild of CrypTrace — installable, offline-aware, ' +
        'and served without an app store.',
      year: '2018',
      tech: ['React', 'Service Workers', 'Firebase'],
      links: [
        { label: 'Source', href: 'https://github.com/ashutoshkmr/cryptrace-PWA' },
      ],
      archived: true,
    },
  ] satisfies Project[],

  /* ── Stack ────────────────────────────────────────────────────────────── */
  /** Keep this honest — list what you would be comfortable being interviewed on. */
  stack: [
    { title: 'Languages', items: ['TODO', 'TypeScript', 'JavaScript', 'Python'] },
    { title: 'Backend', items: ['TODO', 'Node.js', 'Express'] },
    { title: 'Frontend', items: ['TODO', 'React'] },
    { title: 'Data', items: ['TODO', 'PostgreSQL', 'MongoDB'] },
    { title: 'Infrastructure', items: ['TODO — e.g. Docker, AWS, CI/CD'] },
  ],

  /* ── Education ────────────────────────────────────────────────────────── */
  education: [
    {
      school: 'NITRA Technical Campus',
      degree: 'B.Tech, Computer Science & Engineering',
      start: '2014',
      end: '2018',
    },
  ],
};

/**
 * Walks the profile and collects the paths of any field still holding a
 * placeholder. Used at build time to warn before placeholders ship.
 */
export function findPlaceholders(value: unknown, path = ''): string[] {
  if (typeof value === 'string') {
    return value.includes('TODO') ? [path || '(root)'] : [];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => findPlaceholders(item, `${path}[${i}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      findPlaceholders(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}
