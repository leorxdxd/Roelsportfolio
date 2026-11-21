import type { IconName } from "../components/Icon";

/**
 * Text content for the About, Services, and Skills sections.
 * PRIVACY: use generic labels ("a private college", "a small business"),
 * never real client, school, or company names.
 */

export const about = {
  heading: "Reliable IT support with a developer's mindset",
  paragraphs: [
    "I'm an IT technical support professional based in Metro Manila. Day to day, I help people and offices keep their technology working: troubleshooting computers, setting up networks and printers, managing user accounts, and keeping systems maintained.",
    "As a freelancer, I also design and build custom systems and websites. Working on the support side means I build software that is practical, easy to use, and easy to maintain. I make tools that solve real problems without creating new ones.",
    "Whether you need a quick fix, a dependable IT partner, or a system built around the way you work, I focus on clear communication and solutions that last.",
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
        "Custom web systems and websites for schools, small businesses, and individuals.",
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

export const services: {
  icon: IconName;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    icon: "headset",
    title: "IT Technical Support",
    description:
      "Fast, friendly troubleshooting for the hardware and software your team uses every day.",
    points: ["Hardware & software fixes", "OS installs & setup", "Remote or on-site help"],
  },
  {
    icon: "dashboard",
    title: "Custom System Development",
    description:
      "Web-based systems built around your workflow, replacing spreadsheets and paperwork.",
    points: ["Ticketing & records systems", "Dashboards & reports", "User roles & access"],
  },
  {
    icon: "globe",
    title: "Website Development",
    description:
      "Clean, fast, mobile-friendly websites that make your business look professional online.",
    points: ["Business & portfolio sites", "Responsive design", "SEO basics & deployment"],
  },
  {
    icon: "wrench",
    title: "General IT Assistance",
    description:
      "A dependable go-to person for the everyday IT needs of a small office.",
    points: ["Network & Wi-Fi setup", "Email & account admin", "Backups & IT advice"],
  },
];

export const skills: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: "headset",
    title: "Support",
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
    icon: "network",
    title: "Networking",
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
    icon: "code",
    title: "Development",
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
