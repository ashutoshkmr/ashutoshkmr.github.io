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
  /** Three to five bullets, strongest first. Lead with impact, not duties. */
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
    summary: 'Leading a small team of developers on a long-running education platform.',
    highlights: [
      'Interview engineering candidates, train new graduates, and run internal ' +
        'sessions on getting useful work out of AI tools.',
      'Own architecture, technical direction, and the AWS account behind the ' +
        'platform — infrastructure, deployments and cost.',
      'Cut the DynamoDB bill by 70% by ageing session data out of the hot table ' +
        'into object storage.',
      'Implemented LTI so partner institutions can launch the product from their ' +
        'own learning platforms.',
    ],
    tech: ['Rust', 'Node.js', 'TypeScript', 'AWS', 'DynamoDB', 'Microservices'],
    url: 'https://www.taazaa.com',
  },
  {
    company: 'Taazaa Inc',
    role: 'Senior Software Engineer',
    start: 'May 2021',
    end: 'Nov 2025',
    location: 'Noida, India',
    summary:
      'Two long-running client engagements: an education platform, and a ' +
      'connected medical device product.',
    highlights: [
      'Restructured a large codebase into maintainable packages and migrated it ' +
        'to TypeScript.',
      'Designed and built the authentication and authorisation layer.',
      'Built the real-time collaboration layer, putting multiple users on the ' +
        'same document simultaneously over WebSocket.',
      'Rewrote hot paths in a graphics-heavy front end, replacing linear scans ' +
        'with indexed lookups to keep interaction responsive under load.',
      'Delivered serverless APIs for a mobile application communicating with ' +
        'connected medical devices over Bluetooth.',
    ],
    tech: [
      'Node.js',
      'TypeScript',
      'AWS Lambda',
      'Serverless Framework',
      'WebSockets',
      'DynamoDB',
      'Vue.js',
    ],
  },
  {
    company: 'Taazaa Inc',
    role: 'Software Engineer',
    start: 'Jun 2020',
    end: 'May 2021',
    location: 'Noida, India',
    summary: 'First role at Taazaa, on client product teams.',
    highlights: [
      'Shipped product features end to end, moving between client codebases and ' +
        'stacks.',
      'Built serverless backends on AWS Lambda behind Vue front ends.',
    ],
    tech: ['Vue.js', 'AWS Lambda', 'Node.js', 'TypeScript'],
  },
  {
    company: 'Buildsys',
    role: 'Software Engineer',
    start: 'Jun 2018',
    end: 'Jun 2020',
    location: 'New Delhi, India',
    summary: 'Cloud-based software for the construction and real estate industries.',
    highlights: [
      'Built and maintained a multi-platform product for managing construction ' +
        'projects end to end.',
      'Worked across the whole surface — .NET backend, Angular web client, and ' +
        'Flutter mobile app.',
    ],
    tech: ['C#/.NET', 'ASP.NET Boilerplate', 'Angular', 'TypeScript', 'Flutter'],
    url: 'https://www.linkedin.com/company/buildsysinc',
  },
  {
    company: 'EventsMosaic',
    role: 'Web Development Intern',
    start: 'Feb 2016',
    end: 'Jan 2017',
    location: 'New Delhi, India',
    summary: 'Part-time internship taken alongside the degree.',
    highlights: [
      'Built the web platform for an events marketplace connecting users, ' +
        'organisers and vendors.',
    ],
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js'],
  },
];

const projects: Project[] = [
  {
    name: 'Open-source contributions',
    blurb:
      'Fixes and improvements landed upstream in serverless-bundle, Flutter, ' +
      'and FirebaseExtended/flutterfire.',
    year: 'Ongoing',
    tech: ['Dart', 'Node.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/ashutoshkmr' }],
    featured: true,
  },
  {
    name: 'Medicus',
    blurb:
      'Appointment management and scheduling for hospitals, built for the ' +
      'Ministry of Health and Family Welfare at Smart India Hackathon 2018. ' +
      'Surfaces treatment resources for people in remote areas and thins the ' +
      'queues at AIIMS and other government hospitals.',
    year: '2018',
    tech: ['MongoDB', 'Express', 'Angular', 'Node.js'],
  },
  {
    name: 'TRAAM',
    blurb:
      'Asset tracking and management for the Ministry of Defence — a 36-hour ' +
      'build at Smart India Hackathon 2017.',
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
    items: ['TypeScript', 'JavaScript', 'Rust', 'C#', 'Dart'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Microservices', 'ASP.NET Boilerplate'],
  },
  {
    title: 'Cloud',
    items: ['AWS Lambda', 'API Gateway', 'S3', 'Serverless Framework', 'Azure'],
  },
  { title: 'Frontend', items: ['Vue.js', 'React', 'Angular', 'Flutter', 'Canvas'] },
  { title: 'Data', items: ['DynamoDB', 'RDS', 'MongoDB', 'SQL', 'NoSQL'] },
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
  /**
   * The hero line. Deliberately a fragment, not a sentence, and deliberately
   * does not restate the job title rendered directly above it.
   */
  tagline: 'Distributed systems, mostly event-driven. Rust, Node.js, AWS.',

  /**
   * The <meta description> and link-preview text. Separate from `tagline`
   * because the hero reads best as a fragment, and a fragment makes a poor
   * search snippet. Aim for 120–155 characters.
   */
  seoDescription:
    'Lead Engineer building event-driven distributed systems in Rust and ' +
    'Node.js on AWS. Eight years across backend, cloud and mobile.',
  location: 'Noida, Uttar Pradesh, India',
  email: 'ashutoshkmr40@gmail.com',

  /**
   * Printed on the résumé only — never on the site itself. Both /resume and
   * /resume.pdf are publicly reachable, so this number is public once set.
   * null omits it.
   */
  phone: '+91 75319 44347' as string | null,

  /**
   * Two or three lines at the top of the résumé. Kept deliberately distinct
   * from `about` — anyone reading both should not see the same sentences twice.
   */
  summary:
    'Lead Engineer, eight years across backend, cloud and mobile. Currently own ' +
    'the architecture and AWS infrastructure behind an education platform — ' +
    'real-time collaboration, standards-based integrations, and the serverless ' +
    'services underneath.',

  /**
   * Shown as a pill at the top of the page. Set a string to show it, e.g.
   * 'Open to staff and principal engineering roles'. null hides it.
   */
  availability: 'Open to staff and principal engineering roles' as string | null,

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
    'Eight years of full-time engineering, the last six at Taazaa, where I have ' +
      'moved from engineer to lead. Most of that time has gone on services that ' +
      'talk to each other across a network, and on the coordination problems ' +
      'that come with that.',
    'Leading has mostly meant less time in the editor and more on design review, ' +
      'mentoring, and making sure the people around me are unblocked. I have ' +
      'shipped enough C#, Vue, Angular and Flutter over the years to be useful ' +
      'in most parts of a stack. Open source underpins nearly all of it, so I ' +
      'contribute back where I can — and I am looking to do more of it.',
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
