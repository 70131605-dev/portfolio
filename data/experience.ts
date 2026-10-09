import type { TechKey } from "@/components/ui/TechIcon";

export type Experience = {
  kind: "work" | "education";
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  /** e.g. "DHA Rahbar, Lahore · On-site". Optional for education. */
  location?: string;
  summary: string;
  achievements: string[];
  stack?: { name: string; icon: TechKey }[];
};

/** Newest first. Add roles or degrees as objects in this array. */
export const experience: Experience[] = [
  {
    kind: "work",
    role: "Software Engineer",
    company: "Robonex",
    start: "03/2025",
    end: "Present",
    location: "DHA Rahbar, Lahore · On-site",
    summary:
      "Building full-stack web, mobile and desktop products for real clients, from the interface to the database, both independently and as part of a team.",
    achievements: [
      "Delivered multiple client projects across web, mobile and desktop.",
      "Built features end to end with React and React Native interfaces and Node.js, Express.js and PHP back ends.",
      "Worked across MySQL, MongoDB and Firebase data layers.",
      "Developed desktop POS apps that run online and offline for retail and restaurant clients.",
      "Designed REST APIs connecting websites, admin panels, mobile and desktop apps to a shared back end.",
      "Managed code with Git and GitHub and tested APIs with Postman.",
    ],
    stack: [
      { name: "React", icon: "react" },
      { name: "React Native", icon: "react" },
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    kind: "education",
    role: "BS Computer Science",
    company: "University of Lahore",
    start: "2022",
    end: "2026",
    location: "Lahore",
    summary: "Four-year undergraduate degree in computer science.",
    achievements: [
      "Core study in data structures, algorithms, databases, software engineering and web development.",
      "Built academic and freelance projects alongside the degree, leading into professional work at Robonex.",
    ],
  },
];
