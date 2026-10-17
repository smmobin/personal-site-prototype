export type Lang = "en" | "fa";

export type NavKey =
  | "about"
  | "work"
  | "experience"
  | "skills"
  | "writing"
  | "contact";

export type WorkTag = "product" | "interface" | "ai";

export interface Project {
  id: string;
  title: string;
  year: string;
  role: string;
  tags: WorkTag[];
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
}

export interface ExperienceItem {
  title: string;
  org: string;
  period: string;
  kind: "work" | "education";
  body: string;
}

export interface SkillItem {
  name: string;
  level: 1 | 2 | 3 | 4;
}

export interface SkillGroup {
  title: string;
  items: SkillItem[];
}

export interface Note {
  title: string;
  date: string;
  read: string;
  excerpt: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  skip: string;
  brand: string;
  header: {
    cta: string;
    menu: string;
    menuOpen: string;
    menuClose: string;
    langLabel: string;
    navLabel: string;
    menuTitle: string;
  };
  nav: Record<NavKey, string>;
  hero: {
    kicker: string;
    name: string;
    value: string;
    availability: string;
    reply: string;
    ctaPrimary: string;
    ctaSecondary: string;
    identityLabel: string;
    identityStatus: string;
    identityMeta: string;
    identityVersion: string;
    stats: Array<{ value: string; label: string }>;
  };
  about: {
    index: string;
    title: string;
    p1: string;
    p2: string;
    principles: Array<{ title: string; body: string }>;
  };
  work: {
    index: string;
    title: string;
    lead: string;
    filters: Record<"all" | WorkTag, string>;
    empty: string;
    detailProblem: string;
    detailApproach: string;
    detailOutcome: string;
    close: string;
    projects: Project[];
  };
  experience: {
    index: string;
    title: string;
    lead: string;
    items: ExperienceItem[];
  };
  skills: {
    index: string;
    title: string;
    lead: string;
    groups: SkillGroup[];
  };
  writing: {
    index: string;
    title: string;
    lead: string;
    prototypeNote: string;
    notes: Note[];
  };
  contact: {
    index: string;
    title: string;
    lead: string;
    status: string;
    emailLabel: string;
    email: string;
    socialLabel: string;
    social: Array<{ name: string; href: string }>;
    formTitle: string;
    name: string;
    emailField: string;
    subject: string;
    message: string;
    consent: string;
    submit: string;
    sending: string;
    success: string;
    subjects: Array<{ value: string; label: string }>;
    errors: {
      name: string;
      email: string;
      emailInvalid: string;
      subject: string;
      message: string;
      messageShort: string;
      consent: string;
    };
  };
  footer: {
    blurb: string;
    navLabel: string;
    socialLabel: string;
    langLabel: string;
    top: string;
    copyright: string;
    privacy: string;
    privacyNote: string;
    prototype: string;
  };
}
