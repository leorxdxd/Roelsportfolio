import type { IconName } from "../components/Icon";

/**
 * Text content for every page. Edit freely.
 * PRIVACY: use generic labels ("a private college", "a small business"),
 * never real client, school, or company names.
 */

export const about = {
  heading: "IT support professional. Systems builder.",
  lead: "I fix what's broken today and build the tools that prevent tomorrow's problems.",
  paragraphs: [
    "I'm an IT technical support professional based in Metro Manila. Day to day, I help people and offices keep their technology working: troubleshooting computers, setting up networks and printers, managing user accounts, and keeping systems maintained.",
    "As a freelancer, I also design and build custom systems and websites. Working on the support side means I see exactly where people struggle with technology, so I build software that is practical, easy to use, and easy to maintain.",
    "Whether you need a quick fix, a dependable IT partner, or a system built around the way you work, I focus on clear communication and solutions that last.",
  ],
  facts: [
    { icon: "mapPin" as IconName, label: "Based in", value: "Metro Manila, PH" },
    { icon: "monitor" as IconName, label: "Works", value: "Remote & on-site" },
    { icon: "briefcase" as IconName, label: "Focus", value: "IT support & custom systems" },
  ],
  experience: [
    {
      icon: "headset" as IconName,
      role: "IT Support & MIS Assistant",
      org: "A private college",
      period: "2022 – Present",
      detail:
        "Technical support for staff and students, email and account administration, network assistance, and website updates.",
    },
    {
      icon: "code" as IconName,
      role: "Freelance Web & Systems Developer",
      org: "Self-employed",
      period: "Ongoing",
      detail:
        "Custom web systems and websites for schools, small businesses, and individuals, from planning to deployment and support.",
    },
  ],
  education: [
    {
      icon: "graduation" as IconName,
      title: "BS Information Technology",
      detail: "Bachelor's degree",
    },
    {
      icon: "award" as IconName,
      title: "Internet Society training",
      detail: "Internet standards, protocols & networking · 2025",
    },
  ],
};

export const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "message",
    title: "Clear communication",
    text: "Plain-language updates, no jargon. You always know what's happening and why.",
  },
  {
    icon: "wrench",
    title: "Built to be maintained",
    text: "Clean, documented systems that are easy to update, support, and hand over.",
  },
  {
    icon: "shield",
    title: "Privacy-first",
    text: "Your data stays yours. I follow safe practices and never expose client information.",
  },
  {
    icon: "lifeBuoy",
    title: "Support after launch",
    text: "I come from IT support, so I don't disappear after go-live. Help is a message away.",
  },
];

export const services: {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
  points: string[];
  includes: string[];
  idealFor: string;
}[] = [
  {
    slug: "it-support",
    icon: "headset",
    title: "IT Technical Support",
    description:
      "Fast, friendly troubleshooting for the hardware and software your team uses every day.",
    points: ["Hardware & software fixes", "OS installs & setup", "Remote or on-site help"],
    includes: [
      "Diagnosing and fixing computer, laptop, and printer problems",
      "Windows installation, updates, drivers, and software setup",
      "Virus and malware cleanup, performance tune-ups",
      "Remote support sessions or on-site visits",
    ],
    idealFor: "Small offices, schools, and home users who need reliable, quick help.",
  },
  {
    slug: "custom-systems",
    icon: "dashboard",
    title: "Custom System Development",
    description:
      "Web-based systems built around your workflow, replacing spreadsheets, paperwork, and lost messages.",
    points: ["Ticketing & records systems", "Dashboards & reports", "User roles & access"],
    includes: [
      "Requirements gathering and workflow mapping",
      "Database design and secure user accounts with roles",
      "Dashboards, charts, and printable reports",
      "Deployment, training, documentation, and support",
    ],
    idealFor: "Teams that track requests, records, inventory, or approvals by hand.",
  },
  {
    slug: "websites",
    icon: "globe",
    title: "Website Development",
    description:
      "Clean, fast, mobile-friendly websites that make your business look professional online.",
    points: ["Business & portfolio sites", "Responsive design", "SEO basics & deployment"],
    includes: [
      "Modern, responsive design that works on every screen",
      "Contact forms, galleries, and service pages",
      "SEO basics, social-share previews, and fast loading",
      "Domain, hosting, and deployment setup",
    ],
    idealFor: "Small businesses and professionals who need a credible online presence.",
  },
  {
    slug: "it-assistance",
    icon: "wrench",
    title: "General IT Assistance",
    description: "A dependable go-to person for the everyday IT needs of a small office.",
    points: ["Network & Wi-Fi setup", "Email & account admin", "Backups & IT advice"],
    includes: [
      "Router, Wi-Fi, and small-office network setup",
      "Email, Microsoft 365, and Google Workspace accounts",
      "Backup setup and basic security hardening",
      "Advice on buying and upgrading equipment",
    ],
    idealFor: "Growing offices without a full-time IT staff member.",
  },
];

export const process: { icon: IconName; title: string; summary: string; details: string[] }[] = [
  {
    icon: "compass",
    title: "Discover",
    summary: "Understand the problem",
    details: [
      "A short call or chat about what's not working and what you need",
      "I map your current workflow and pain points",
      "We agree on goals and what success looks like",
    ],
  },
  {
    icon: "clipboard",
    title: "Plan",
    summary: "Scope, timeline, quote",
    details: [
      "A clear list of features or tasks, in plain language",
      "A realistic timeline and a fixed quote before work starts",
      "Wireframes or a system outline for custom builds",
    ],
  },
  {
    icon: "code",
    title: "Build",
    summary: "Develop & test",
    details: [
      "Development in small steps with regular previews",
      "Testing with sample data, never real user information",
      "Your feedback is built in along the way",
    ],
  },
  {
    icon: "rocket",
    title: "Launch & support",
    summary: "Deploy, train, maintain",
    details: [
      "Deployment and setup on your hosting or devices",
      "Hands-on training and simple documentation",
      "Ongoing support and improvements after launch",
    ],
  },
];

export const skills: { id: string; icon: IconName; title: string; blurb: string; items: string[] }[] = [
  {
    id: "support",
    icon: "headset",
    title: "Support",
    blurb: "Keeping people productive and their devices healthy.",
    items: [
      "Hardware troubleshooting",
      "Software troubleshooting",
      "Windows installation & setup",
      "Microsoft 365 / Google Workspace",
      "User account management",
      "Printer & peripheral setup",
      "Remote support",
      "Help desk & ticketing",
      "Technical documentation",
    ],
  },
  {
    id: "networking",
    icon: "network",
    title: "Networking",
    blurb: "Reliable connections for small offices and campuses.",
    items: [
      "LAN & Wi-Fi setup",
      "TCP/IP fundamentals",
      "DNS & DHCP",
      "Router & switch configuration",
      "Network cabling",
      "Connectivity troubleshooting",
      "Basic network security",
    ],
  },
  {
    id: "development",
    icon: "code",
    title: "Development",
    blurb: "Building the web apps and systems that run the work.",
    items: [
      "HTML & CSS / SCSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Python & Flask",
      "Java",
      "MySQL",
      "PostgreSQL",
      "REST APIs",
      "Git & GitHub",
    ],
  },
];

/** Default answers: edit them to match how you actually work and charge. */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How much does a custom system or website cost?",
    a: "It depends on the features you need. After a short conversation about your goals, I'll send a clear, fixed quote before any work starts, with no surprise charges.",
  },
  {
    q: "How long does a project take?",
    a: "A simple business website is usually done in one to three weeks. Custom systems depend on scope; I'll give you a realistic timeline in the plan.",
  },
  {
    q: "Do you offer on-site IT support?",
    a: "Yes, within Metro Manila. I also provide remote support anywhere, which is often the fastest way to fix software and account issues.",
  },
  {
    q: "Will I be able to update the system or website myself?",
    a: "Yes. I hand over simple documentation and walk you through the day-to-day tasks. I'm also available for updates and support after launch.",
  },
  {
    q: "How do you handle my data and privacy?",
    a: "Carefully. I use sample data for development and demos, never share client information, and follow safe practices for passwords, backups, and access.",
  },
];
