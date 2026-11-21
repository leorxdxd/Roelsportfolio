/**
 * Site-wide personal info. Edit this file to update your details everywhere.
 * Do NOT put passwords, API keys, or any private data here — everything in
 * this file is published on the website.
 */
export const site = {
  name: "Roel Delos Reyes",
  initials: "RD",
  title: "IT Technical Support | Web & Systems Developer",
  valueStatement:
    "I keep computers and networks running smoothly, and I build the websites and custom systems that help businesses work smarter.",
  location: "Metro Manila, Philippines",
  availability: "Available for freelance projects",

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
  ],
} as const;

export type SocialIcon = (typeof site.socials)[number]["icon"];
