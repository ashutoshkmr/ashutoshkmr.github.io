/* ────────────────────────────────────────────────────────────────────────────
 *  EDIT THIS FILE.
 *
 *  Every word on the site comes from here. Nothing else needs touching to
 *  change content — layout and styling live in src/components and src/styles.
 *
 *  Anything reading "TODO" is a placeholder. The build prints a warning
 *  listing them, so you cannot ship them by accident.
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

export type StackGroup = { title: string; items: string[] };

export type School = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

/*
 * The collections below are annotated (`: Job[]`) rather than `satisfies`-checked.
 * `satisfies` narrows to the literal shape, so the moment no entry happens to use
 * an optional field — `highlights`, say — that field disappears from the inferred
 * type and any component reading it stops compiling.
 */

/** Most recent first. */
const work: Job[] = [
  {
    company: 'Taazaa Inc',
    role: 'Lead Engineer',
    start: 'Nov 2025',
    end: 'Present',
    location: 'Noida, India',
    summary:
      'Leading engineering on end-to-end, fault-tolerant real-time cloud-native ' +
      'applications — architecture, technical direction, and the people doing ' +
      'the building.',
    tech: ['Rust', 'Node.js', 'TypeScript', 'AWS', 'Microservices'],
    url: 'https://www.taazaa.com',
  },
  {
    company: 'Taazaa Inc',
    role: 'Senior Software Engineer',
    start: 'May 2021',
    end: 'Nov 2025',
    location: 'Noida, India',
    summary:
      'Designed and shipped serverless backends and microservices for client ' +
      'product teams, working across the stack from the AWS infrastructure up ' +
      'to the Vue front ends consuming it.',
    tech: [
      'Node.js',
      'TypeScript',
      'Rust',
      'AWS Lambda',
      'Serverless',
      'Vue.js',
      'SQL',
      'NoSQL',
    ],
  },
  {
    company: 'Taazaa Inc',
    role: 'Software Engineer',
    start: 'Jun 2020',
    end: 'May 2021',
    location: 'Noida, India',
    summary:
      'Built product features end to end at a product engineering consultancy, ' +
      'moving between client codebases and stacks.',
    tech: ['Vue.js', 'AWS Lambda', 'Node.js', 'TypeScript'],
  },
  {
    company: 'Buildsys',
    role: 'Software Engineer',
    start: 'Jun 2018',
    end: 'Jun 2020',
    location: 'New Delhi, India',
    summary:
      'Multi-platform, cloud-based software for managing construction projects ' +
      'end to end. Worked across the .NET backend, the Angular web client and ' +
      'the Flutter mobile app.',
    tech: ['C#/.NET', 'ASP.NET Boilerplate', 'Angular', 'TypeScript', 'Flutter'],
  },
  {
    company: 'EventsMosaic',
    role: 'Web Developer',
    start: 'Feb 2016',
    end: 'Jan 2018',
    location: 'New Delhi, India',
    summary:
      'A one-stop platform for organising events, bridging users, organisers ' +
      'and vendors. First professional engineering work, alongside my degree.',
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js'],
  },
];

const projects: Project[] = [
  {
    name: 'Open-source contributions',
    blurb:
      'Upstream fixes and improvements to tools I build on — serverless-bundle, ' +
      'Flutter, and FirebaseExtended/flutterfire.',
    year: 'Ongoing',
    tech: ['Rust', 'Dart', 'Node.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/ashutoshkmr' }],
    featured: true,
  },
  {
    name: 'Medicus',
    blurb:
      'Appointment management and scheduling for hospitals, built in 36 hours ' +
      'at Smart India Hackathon 2018 for the Ministry of Health and Family ' +
      'Welfare. Aimed at people in remote areas — surfacing available treatment ' +
      'resources and thinning the crowds at AIIMS and other government hospitals.',
    year: '2018',
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js'],
  },
  {
    name: 'TRAAM',
    blurb:
      'Asset tracking and management system built in 36 hours at Smart India ' +
      'Hackathon 2017 for the Ministry of Defence.',
    year: '2017',
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js', 'Ionic/Cordova'],
  },
  {
    name: 'CrypTrace',
    blurb:
      'Cryptocurrency tracker following prices across 50+ markets in real time. ' +
      'Shipped as a hybrid Android app, then rebuilt as an installable PWA.',
    year: '2018',
    tech: ['React', 'Ionic', 'TypeScript', 'Socket.io', 'Chart.js'],
    links: [
      { label: 'Source', href: 'https://github.com/ashutoshkmr/cryptrace' },
      { label: 'PWA', href: 'https://github.com/ashutoshkmr/cryptrace-PWA' },
    ],
    archived: true,
  },
];

/** Keep this honest — list what you would be comfortable being interviewed on. */
const stack: StackGroup[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Rust', 'C#', 'Dart', 'SQL'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Microservices', 'ASP.NET Boilerplate'],
  },
  {
    title: 'Cloud',
    items: ['AWS Lambda', 'API Gateway', 'RDS', 'Serverless Framework', 'Azure'],
  },
  { title: 'Frontend', items: ['Vue.js', 'React', 'Angular', 'Flutter'] },
  { title: 'Data', items: ['PostgreSQL', 'MongoDB', 'SQL', 'NoSQL'] },
];

const education: School[] = [
  {
    school: 'NITRA Technical Campus, Ghaziabad',
    degree: 'B.Tech, Computer Science & Engineering',
    start: '2014',
    end: '2018',
  },
];

export const profile = {
  /* ── Identity ─────────────────────────────────────────────────────────── */
  name: 'Ashutosh Kumar',
  role: 'Lead Engineer',
  tagline:
    'I build fault-tolerant, real-time cloud-native systems — currently leading ' +
    'engineering at Taazaa, mostly in Rust, Node.js and AWS.',
  location: 'Noida, Uttar Pradesh, India',
  email: 'ashutoshkmr40@gmail.com',

  /**
   * Printed on the résumé only — never on the site itself. Both /resume and
   * /resume.pdf are publicly reachable, so this number is public once set.
   * null omits it.
   */
  phone: '+91 75319 44347' as string | null,

  /** Two or three lines at the top of the résumé. */
  summary:
    'Lead engineer with eight years building backend and cloud-native systems — ' +
    'real-time services, event-driven pipelines and the serverless infrastructure ' +
    'underneath them. Mostly Rust, Node.js and TypeScript on AWS.',

  /**
   * Shown as a pill at the top of the page. Set a string to show it, e.g.
   * 'Open to staff and principal engineering roles'. null hides it.
   */
  availability: null as string | null,

  /* ── Links ────────────────────────────────────────────────────────────── */
  social: {
    github: 'https://github.com/ashutoshkmr',
    linkedin: 'https://www.linkedin.com/in/ashutoshkmr40/',
    x: null as string | null,
    /** Path is relative to /public. */
    resume: '/resume.pdf',
  },

  /* ── About ────────────────────────────────────────────────────────────── */
  /** Each string is its own paragraph. */
  about: [
    'Eight years building backend and cloud-native systems, the last six at ' +
      'Taazaa, where I have moved from engineer to lead. Most of my work is ' +
      'distributed systems that have to stay correct under load and under ' +
      'failure — real-time services, event-driven pipelines, and the serverless ' +
      'infrastructure underneath them.',
    'These days that mostly means Rust, Node.js and TypeScript on AWS, though I ' +
      'have shipped enough C#, Vue, Angular and Flutter over the years to be ' +
      'useful most places in a stack. I contribute upstream when something I ' +
      'depend on needs fixing.',
  ],

  work,
  projects,
  stack,
  education,
};

export type Profile = typeof profile;

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
