import type { IconName } from "../components/Icon";

/**
 * Site-wide personal info. Edit this file to update your details everywhere.
 * Do NOT put passwords, API keys, or any private data here — everything in
 * this file is published on the website.
 */
export const site = {
  name: "Roel Delos Reyes",
  firstName: "Roel",
  initials: "RD",
  title: "IT Technical Support | Web & Systems Developer",
  valueStatement:
    "I keep computers and networks running smoothly, and I build the websites and custom systems that help businesses work smarter.",
  location: "Metro Manila, Philippines",
  availability: "Available for freelance projects",
  /** Year you started doing IT support (used for the "years of experience" counter). */
  supportSince: 2022,

  email: "roeldelosreyes0105@gmail.com",
  /** Leave empty ("") to hide the phone number on the site. Example: "+63 912 345 6789" */
  phone: "" as string,

  socials: [
    { label: "GitHub", icon: "github", url: "https://github.com/leorxdxd" },
    {
      label: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/roel-de-los-reyes-7a76412b6/",
    },
    // { label: "Facebook", icon: "facebook", url: "https://facebook.com/your-page" },
  ] as { label: string; icon: IconName; url: string }[],
};

/** Pages shown in the navigation, footer, and command palette. */
export const pages: { label: string; to: string; icon: IconName; description: string }[] = [
  { label: "Home", to: "/", icon: "home", description: "Overview" },
  { label: "About", to: "/about", icon: "user", description: "Background & skills" },
  { label: "Services", to: "/services", icon: "lifeBuoy", description: "What I can do for you" },
  { label: "Projects", to: "/projects", icon: "folder", description: "Systems & websites" },
  { label: "Demos", to: "/demos", icon: "film", description: "Watch the systems in action" },
  { label: "Contact", to: "/contact", icon: "mail", description: "Start a project" },
];
