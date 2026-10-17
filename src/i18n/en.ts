import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    title: "Mobin Arya — Product Engineer",
    description:
      "Prototype personal site for Mobin Arya, a product engineer working on interfaces, design systems, and AI-assisted tools.",
  },
  skip: "Skip to content",
  brand: "ARYA",
  header: {
    cta: "Say hello",
    menu: "Menu",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langLabel: "Language",
    navLabel: "Primary",
    menuTitle: "Menu",
  },
  nav: {
    about: "About",
    work: "Work",
    experience: "Experience",
    skills: "Skills",
    writing: "Notes",
    contact: "Contact",
  },
  hero: {
    kicker: "Product Engineer · Tehran",
    name: "Mobin Arya",
    value:
      "I design and ship the systems between a product idea and a durable interface — tools, design language, and the AI-assisted workflows around them.",
    availability: "Open to selected collaborations",
    reply: "Usually replies within 48 hours",
    ctaPrimary: "Start a conversation",
    ctaSecondary: "See selected work",
    identityLabel: "Identity card",
    identityStatus: "Available",
    identityMeta: "TEH · Remote",
    identityVersion: "v0.1",
    stats: [
      { value: "12 yrs", label: "Building product" },
      { value: "40+", label: "Shipped releases" },
      { value: "3", label: "Live products" },
    ],
  },
  about: {
    index: "01",
    title: "About",
    p1: "I work where product intent meets interface reality. Most of my time goes into making the next decision cheaper: clearer specs, reusable surfaces, and tools that keep a team aligned after the kickoff energy fades.",
    p2: "I am not interested in theatre demos. I care about systems that survive contact with users, edge cases, and the next three quarters of roadmap. This page is a prototype — the voice is mine, the facts are invented.",
    principles: [
      {
        title: "Clarity first",
        body: "If a screen or a spec cannot be explained in one pass, it is not ready. Ambiguity is expensive and it compounds.",
      },
      {
        title: "Systems over one-offs",
        body: "A component, a token, a decision log. Repeatable pieces beat heroic launches that nobody can extend.",
      },
      {
        title: "Learn in public, ship in private",
        body: "Explore quickly, then lock the interface contract. Speed without a durable edge is just churn.",
      },
    ],
  },
  work: {
    index: "02",
    title: "Selected work",
    lead: "Six invented projects. They exist to show how this site talks about product work — not as a real portfolio.",
    filters: {
      all: "All",
      product: "Product",
      interface: "Interface",
      ai: "AI",
    },
    empty: "Nothing in this lane yet.",
    detailProblem: "Problem",
    detailApproach: "Approach",
    detailOutcome: "Outcome",
    close: "Close details",
    projects: [
      {
        id: "northline",
        title: "Northline",
        year: "2025",
        role: "Product engineer",
        tags: ["product", "interface"],
        summary: "A notification system that treats attention as a scarce resource, not a dump of badges.",
        problem:
          "Teams were stacking alerts until nobody trusted the red dot. Critical events drowned in noise.",
        approach:
          "We ranked channels by reversibility and delay cost, then designed a digest surface with explicit mute contracts.",
        outcome:
          "Interrupt volume dropped, and on-call started using the same language as product for what is actually urgent.",
      },
      {
        id: "kaveh",
        title: "Kaveh Desk",
        year: "2024",
        role: "Lead interface",
        tags: ["product"],
        summary: "A remote-team kanban that keeps decisions next to the cards, not lost in chat.",
        problem:
          "Standups were theatre. The board showed status; the actual reasoning lived in five other tools.",
        approach:
          "Each card gained a decision trail and a lightweight owner contract. Filters were built around risk, not labels.",
        outcome:
          "Handoffs stopped requiring a meeting. New teammates could reconstruct why a card moved without asking.",
      },
      {
        id: "shade",
        title: "Shade Protocol",
        year: "2024",
        role: "Design engineer",
        tags: ["interface"],
        summary: "A dark design system tuned for dense product UI — contrast, focus, and quiet chrome.",
        problem:
          "The dark theme was a palette invert. Focus rings vanished, charts lied, and marketing pages leaked into the app.",
        approach:
          "Tokens were split by intent, not hue. We documented elevation, danger, and data ink as separate contracts.",
        outcome:
          "Product surfaces stopped looking like a landing page at night. Accessibility scores stopped being a surprise.",
      },
      {
        id: "nava",
        title: "Nava",
        year: "2023",
        role: "Product engineer",
        tags: ["ai", "product"],
        summary: "A meeting transcription tool that writes a decision log instead of a novel.",
        problem:
          "Transcripts were unread. People wanted the action, the owner, and the dissent — not 40 pages of speech.",
        approach:
          "The model was constrained to a schema: decision, open question, owner. The UI made edits cheaper than regeneration.",
        outcome:
          "Notes became an artifact teams actually opened the next morning. Hallucinated tasks were easy to reject.",
      },
      {
        id: "pulseboard",
        title: "Pulseboard",
        year: "2023",
        role: "Interface lead",
        tags: ["product", "interface"],
        summary: "A service-health dashboard that prefers signal over a wall of green.",
        problem:
          "Green-everywhere dashboards hid degrading SLOs until customers filed the ticket first.",
        approach:
          "We visualized burn and error budgets, not vanity uptime, and designed empty states for ‘nothing is wrong’.",
        outcome:
          "On-call stopped screenshotting Grafana into Slack. Product could read the same board without a decoder ring.",
      },
      {
        id: "paper",
        title: "Paper Trail",
        year: "2022",
        role: "Product engineer",
        tags: ["product", "ai"],
        summary: "An archive of product decisions searchable by constraint, not by meeting title.",
        problem:
          "Six-month-old choices were tribal knowledge. New hires re-litigated settled tradeoffs.",
        approach:
          "Decisions were captured as structured records with alternatives and a review date. Search was semantic, not keyword-only.",
        outcome:
          "Revisits became scheduled, not accidental. Specs linked back to the argument that produced them.",
      },
    ],
  },
  experience: {
    index: "03",
    title: "Path",
    lead: "A fictional timeline. Roles and companies are invented for this prototype.",
    items: [
      {
        title: "Staff Product Engineer",
        org: "Lumen Labs",
        period: "2022 — Now",
        kind: "work",
        body: "Own the interface layer between product strategy and engineering delivery. Set the system, not just the screens.",
      },
      {
        title: "Design Engineer",
        org: "Saffron Cloud",
        period: "2019 — 2022",
        kind: "work",
        body: "Turned a loose component folder into a versioned language. Partnered with PM on specs that could actually ship.",
      },
      {
        title: "Frontend Engineer",
        org: "Nava Studio",
        period: "2016 — 2019",
        kind: "work",
        body: "Shipped dense product surfaces and learned that visual polish without an interaction contract does not hold.",
      },
      {
        title: "Intern, Interfaces",
        org: "Rayan Labs",
        period: "2014 — 2016",
        kind: "work",
        body: "Prototyped internal tools, filed the bugs nobody wanted, and started writing down why a control existed.",
      },
      {
        title: "B.Sc. Computer Engineering",
        org: "Fictional Institute of Technology",
        period: "2010 — 2014",
        kind: "education",
        body: "Systems, compilers, and enough human-computer interaction to become suspicious of default UI patterns.",
      },
    ],
  },
  skills: {
    index: "04",
    title: "Skills",
    lead: "Weighted by how often they show up in real work — bars are a visual cue, not a fake percentage.",
    groups: [
      {
        title: "Product",
        items: [
          { name: "Roadmapping", level: 4 },
          { name: "Spec writing", level: 4 },
          { name: "Discovery", level: 3 },
          { name: "Experiment design", level: 3 },
          { name: "Stakeholder comms", level: 4 },
        ],
      },
      {
        title: "Engineering",
        items: [
          { name: "TypeScript", level: 4 },
          { name: "Design systems", level: 4 },
          { name: "Accessibility", level: 3 },
          { name: "Performance", level: 3 },
          { name: "Component APIs", level: 4 },
        ],
      },
      {
        title: "Interface",
        items: [
          { name: "Visual hierarchy", level: 4 },
          { name: "Interaction", level: 4 },
          { name: "Dark UI", level: 4 },
          { name: "Prototyping", level: 3 },
          { name: "Information architecture", level: 3 },
        ],
      },
      {
        title: "Tools",
        items: [
          { name: "Figma", level: 4 },
          { name: "Git", level: 4 },
          { name: "Vite", level: 3 },
          { name: "Linear", level: 3 },
          { name: "Cursor", level: 3 },
        ],
      },
    ],
  },
  writing: {
    index: "05",
    title: "Notes",
    lead: "Titles and excerpts only. Links do not go anywhere — this is not a blog.",
    prototypeNote: "Prototype link",
    notes: [
      {
        title: "Interface debt compounds in silence",
        date: "Mar 2026",
        read: "6 min",
        excerpt:
          "The cheapest bug is the one you never ship. The expensive one is a pattern the whole app copied before anyone named it.",
      },
      {
        title: "AI in the editor, not in the product theatre",
        date: "Jan 2026",
        read: "8 min",
        excerpt:
          "If the model cannot be constrained to a schema, it does not belong in a workflow that other people have to trust.",
      },
      {
        title: "Specs that survive contact with engineering",
        date: "Nov 2025",
        read: "5 min",
        excerpt:
          "A spec is a contract, not a pitch deck. Write the edge cases first and the hero path usually reveals itself.",
      },
    ],
  },
  contact: {
    index: "06",
    title: "Contact",
    lead: "For specific projects, not spam. This form is a prototype — nothing is sent or stored.",
    status: "Selected work only. No cold decks.",
    emailLabel: "Email",
    email: "hello@mobinarya.dev",
    socialLabel: "Elsewhere",
    social: [
      { name: "GitHub", href: "#" },
      { name: "LinkedIn", href: "#" },
      { name: "Dribbble", href: "#" },
    ],
    formTitle: "Leave a note",
    name: "Name",
    emailField: "Email",
    subject: "Subject",
    message: "Message",
    consent: "You may reply to this address",
    submit: "Send message",
    sending: "Sending…",
    success: "Recorded in this prototype. Nothing was transmitted.",
    subjects: [
      { value: "collab", label: "Collaboration" },
      { value: "speaking", label: "Speaking" },
      { value: "other", label: "Something else" },
    ],
    errors: {
      name: "Add a name.",
      email: "Add an email.",
      emailInvalid: "That email does not look valid.",
      subject: "Pick a subject.",
      message: "Add a message.",
      messageShort: "Give it at least 20 characters.",
      consent: "Confirm a reply is welcome.",
    },
  },
  footer: {
    blurb: "Product engineer. Prototype personal site. Invented facts, real structure.",
    navLabel: "On this page",
    socialLabel: "Elsewhere",
    langLabel: "Language",
    top: "Back to top",
    copyright: "© 2026 Mobin Arya",
    privacy: "Privacy",
    privacyNote:
      "This prototype stores only a language preference in localStorage. The contact form does not submit data.",
    prototype: "Prototype · Built as a design exercise",
  },
};
