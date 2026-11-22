import type { IconName } from "../components/Icon";

/**
 * Text content for every page. Edit freely.
 * PRIVACY: use generic labels ("a private college", "a small business"),
 * never real client, school, or company names.
 */

export const about = {
  heading: "Software developer with an IT support background.",
  lead: "I build web applications and business systems, and I know the hardware and networks they run on.",
  paragraphs: [
    "I'm a software developer based in Metro Manila. I design and build web applications, internal systems and websites for clinics, property owners, schools and small businesses, from the first requirements and database design to deployment.",
    "I started in IT support and still work in it. Helping staff with computers, networks and accounts every day shows me where software gets in people's way, and I use that when I design a system: simple screens, clear steps and fewer support calls.",
    "I work mostly with TypeScript, React and Vite, with Supabase (PostgreSQL) for the database, sign-in and scheduled jobs. I also use PHP, MySQL and Node.js. I keep my projects documented so they are easy to maintain and hand over.",
  ],
  facts: [
    { icon: "mapPin" as IconName, label: "Based in", value: "Metro Manila, PH" },
    { icon: "monitor" as IconName, label: "Works", value: "Remote & on-site" },
    { icon: "code" as IconName, label: "Focus", value: "Web apps & business systems" },
  ],
  experience: [
    {
      icon: "code" as IconName,
      role: "Freelance Software Developer",
      org: "Self-employed",
      period: "Ongoing",
      detail:
        "Custom web systems and websites for schools, small businesses and individuals, from requirements to deployment and support.",
    },
    {
      icon: "headset" as IconName,
      role: "IT Support & MIS Assistant",
      org: "A private college",
      period: "2022 – Present",
      detail:
        "Technical support for staff and students, email and account administration, network support and website updates.",
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
    text: "Regular updates in plain language. You always know what is done and what comes next.",
  },
  {
    icon: "code",
    title: "Maintainable code",
    text: "Readable, documented code that is easy to update, support or hand over to another developer.",
  },
  {
    icon: "shield",
    title: "Careful with data",
    text: "Sample data in development and demos. Client information is never shared.",
  },
  {
    icon: "lifeBuoy",
    title: "Support after launch",
    text: "I stay available for fixes and changes after the system goes live.",
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
    slug: "custom-systems",
    icon: "dashboard",
    title: "Custom Business Systems",
    description:
      "Web-based systems for the work your team does every day, such as patient records, billing, inventory and requests.",
    points: ["Records, billing & inventory systems", "Dashboards & reports", "User roles & permissions"],
    includes: [
      "Requirements and workflow review",
      "Database design and secure user accounts with roles",
      "Dashboards, charts and printable reports",
      "Deployment, documentation and training",
    ],
    idealFor: "Teams that still track work in spreadsheets, paper forms or group chats.",
  },
  {
    slug: "websites",
    icon: "globe",
    title: "Websites",
    description: "Fast, responsive websites for businesses and professionals, built to be easy to update.",
    points: ["Business & portfolio sites", "Works on every screen size", "SEO basics & hosting"],
    includes: [
      "Responsive design and development",
      "Contact forms, galleries and service pages",
      "SEO basics, social share previews and fast loading",
      "Domain, hosting and deployment setup",
    ],
    idealFor: "Small businesses that need a credible site that is easy to maintain.",
  },
  {
    slug: "integrations",
    icon: "layers",
    title: "Integrations & Automation",
    description: "Connect the tools you already use and cut out repetitive manual work.",
    points: ["API integrations", "Data import & export", "Automated emails & reports"],
    includes: [
      "Connecting systems through REST APIs",
      "Email and text reminders that run on a schedule",
      "CSV and spreadsheet import and export",
      "Scheduled jobs and automatic reports with Supabase Edge Functions",
    ],
    idealFor: "Teams that copy data between apps by hand.",
  },
  {
    slug: "it-support",
    icon: "headset",
    title: "IT Support & Maintenance",
    description: "Hands-on support for the computers, networks and accounts your systems depend on.",
    points: ["Troubleshooting & setup", "Networks & Wi-Fi", "Updates, backups & accounts"],
    includes: [
      "Computer, printer and software troubleshooting",
      "Small-office network and Wi-Fi setup",
      "Email and account administration (Microsoft 365, Google Workspace)",
      "Backups, updates and basic security hardening",
    ],
    idealFor: "Offices without full-time IT staff, and clients who want one person for the software and the setup.",
  },
];

export const process: { icon: IconName; title: string; summary: string; details: string[] }[] = [
  {
    icon: "compass",
    title: "Discover",
    summary: "Understand the problem",
    details: [
      "A short call about what isn't working and what you need",
      "A review of your current process and tools",
      "Agreed goals and scope",
    ],
  },
  {
    icon: "clipboard",
    title: "Plan",
    summary: "Scope, timeline and quote",
    details: [
      "A written feature list in plain language",
      "A timeline and a fixed quote before work starts",
      "Wireframes or a system outline for custom builds",
    ],
  },
  {
    icon: "code",
    title: "Build",
    summary: "Develop and test",
    details: [
      "Work delivered in small steps you can review",
      "Testing with sample data, never real user information",
      "Your feedback applied as we go",
    ],
  },
  {
    icon: "rocket",
    title: "Launch & support",
    summary: "Deploy, train, maintain",
    details: [
      "Deployment on your hosting or devices",
      "Training and short documentation",
      "Fixes and improvements after launch",
    ],
  },
];

/** "Tools I build with" strip on the Home page. */
export const stack: { label: string; items: string[] }[] = [
  { label: "Front end", items: ["React", "TypeScript", "Vite", "JavaScript", "HTML & CSS", "Chart.js"] },
  { label: "Back end", items: ["Supabase", "Edge Functions", "Node.js", "PHP", "REST APIs"] },
  { label: "Databases", items: ["PostgreSQL", "MySQL", "Row Level Security"] },
  { label: "Tools", items: ["Git & GitHub", "Vitest", "Deno", "Netlify"] },
];

export const skills: { id: string; icon: IconName; title: string; blurb: string; items: string[] }[] = [
  {
    id: "development",
    icon: "code",
    title: "Development",
    blurb: "Front end, back end and databases.",
    items: [
      "HTML & CSS / SCSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vite",
      "Supabase",
      "PHP",
      "Python & Flask",
      "Node.js",
      "Java",
      "MySQL",
      "PostgreSQL",
      "REST APIs",
      "Git & GitHub",
    ],
  },
  {
    id: "networking",
    icon: "network",
    title: "Networking",
    blurb: "Small-office and campus networks.",
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
    id: "support",
    icon: "headset",
    title: "IT Support",
    blurb: "Day-to-day IT for staff and students.",
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
];

/** Default answers: edit them to match how you actually work and charge. */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How much does a project cost?",
    a: "It depends on the features. After a short call I send a written quote with a fixed price before any work starts.",
  },
  {
    q: "How long does a project take?",
    a: "A business website usually takes one to three weeks. Custom systems depend on the scope, and the plan includes a timeline.",
  },
  {
    q: "Can I update the system or website myself?",
    a: "Yes. You get short documentation and a walkthrough of the everyday tasks. I'm also available for changes after launch.",
  },
  {
    q: "Do you also do IT support?",
    a: "Yes. I do on-site support within Metro Manila and remote support anywhere.",
  },
  {
    q: "How do you handle data and privacy?",
    a: "I use sample data in development and demos, never share client information, and follow safe practices for passwords, backups and access.",
  },
];
