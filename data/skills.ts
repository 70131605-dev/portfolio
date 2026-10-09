import type { TechKey } from "@/components/ui/TechIcon";

export type SkillGroup = {
  title: string;
  items: { name: string; icon: TechKey }[];
  /** Icon columns inside the card on wide screens. */
  cols: 1 | 2 | 3;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Engineering",
    cols: 3,
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "next" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Redux", icon: "redux" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
    ],
  },
  {
    title: "Backend Engineering",
    cols: 2,
    items: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "REST APIs", icon: "api" },
      { name: "JWT Auth", icon: "jwt" },
      { name: "API Integration", icon: "integration" },
    ],
  },
  {
    title: "Data & Cloud",
    cols: 2,
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
      { name: "Cloudinary", icon: "cloudinary" },
    ],
  },
  {
    title: "Mobile & Desktop",
    cols: 1,
    items: [
      { name: "React Native", icon: "react" },
      { name: "Electron", icon: "electron" },
    ],
  },
  {
    title: "Tools & Workflow",
    cols: 2,
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Vite", icon: "vite" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];

/** Core stack shown in the hero for the 10-second scan. */
export const coreStack: { name: string; icon: TechKey }[] = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "node" },
  { name: "PHP", icon: "php" },
  { name: "React Native", icon: "react" },
];
