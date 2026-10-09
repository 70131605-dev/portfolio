import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  CircleAlert,
  BriefcaseBusiness,
  Code2,
  CodeXml,
  FlaskConical,
  Map as MapIcon,
  Compass,
  Layers,
  Lightbulb,
  Network,
  MonitorSmartphone,
  PenTool,
  Plug,
  Rocket,
  Trophy,
  Search,
  SearchCheck,
  ShieldCheck,
  Store,
  Monitor,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

export const overview: { label: string; value: string; detail: string; icon: LucideIcon }[] = [
  { label: "Role", value: "Software Engineer", detail: "Turning ideas into real-world applications.", icon: BriefcaseBusiness },
  { label: "Specialization", value: "Full-Stack Development", detail: "Frontend, backend, database and integrations.", icon: Code2 },
  { label: "Focus", value: "Web, Mobile & Business", detail: "From web platforms to ERP and POS systems.", icon: Layers },
  { label: "Status", value: "Open to Opportunities", detail: "Full-time, remote and freelance projects.", icon: Zap },
];

export const principles: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Build for users.", text: "I create interfaces that are intuitive, accessible and enjoyable to use.", icon: Users },
  { title: "Engineer for scale.", text: "I design systems that stay maintainable as products and teams grow.", icon: Network },
  { title: "Keep it maintainable.", text: "I write clean, structured code that is easy to read, test and extend.", icon: SearchCheck },
];

/** "My Journey" card in About. Keep the number honest — it is not computed. */
export const journey = {
  text: "From a BS in Computer Science to shipping client products at Robonex.",
  value: 10,
  suffix: "+",
  label: "Client projects delivered",
};

export const processSteps: { n: string; title: string; text: string; icon: LucideIcon }[] = [
  { n: "01", title: "Understand", text: "User needs, business goals and technical constraints.", icon: SearchCheck },
  { n: "02", title: "Plan", text: "Architecture, database structure and interface flows.", icon: MapIcon },
  { n: "03", title: "Design", text: "Intuitive, responsive interfaces and reusable components.", icon: PenTool },
  { n: "04", title: "Develop", text: "Frontend, back end, APIs and integrations.", icon: CodeXml },
  { n: "05", title: "Test", text: "Functionality, responsiveness, performance and edge cases.", icon: FlaskConical },
  { n: "06", title: "Launch", text: "Deploy, monitor and keep improving the product.", icon: Rocket },
];

export const strengths: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Full-Stack Development", text: "Frontend, back end and database built as one integrated system.", icon: Layers },
  { title: "Scalable Architecture", text: "Structures that stay maintainable as the product grows.", icon: Network },
  { title: "Business Software", text: "POS, booking and restaurant management systems for real clients.", icon: Store },
  { title: "Responsive UI", text: "Interfaces that work on desktop, tablet and mobile.", icon: Monitor },
  { title: "API Integration", text: "REST APIs, authentication and third-party services.", icon: Plug },
  { title: "Product Thinking", text: "Solving the business problem, not just shipping screens.", icon: Lightbulb },
];

/**
 * Short descriptions for repositories that have none on GitHub yet.
 * A description written on GitHub always takes priority over these.
 */
export const repoNotes: Record<string, string> = {
  "hot-spice-app": "Hot & Spicy restaurant system: ordering, POS, kitchen display and admin panel.",
  erp: "ERP management system for inventory, customers and reporting.",
  UniAssignments: "University coursework and practice projects in JavaScript.",
};

/** Shown in the Activity section only if GitHub can't be reached. */
export const pinnedRepos: { name: string; description: string; language: string; url: string }[] = [
  {
    name: "hot-spice-app",
    description: "Hot & Spicy restaurant system: ordering, POS, kitchen display and admin panel.",
    language: "TypeScript",
    url: "https://github.com/70131605-dev/hot-spice-app",
  },
];

/** Homepage case-study preview. Links to the project's full case study by slug. */
export const caseStudy = {
  slug: "pos-system",
  intro: "How I built a point of sale that keeps retail counters billing customers, even when the internet drops.",
  points: [
    { label: "Challenge", text: "Retail counters cannot stop billing customers when the internet goes down.", icon: CircleAlert },
    { label: "Solution", text: "A desktop POS that runs online and offline, built with a React interface, a PHP back end and a MySQL database.", icon: Lightbulb },
    { label: "My Role", text: "Developed the POS across the React interface, PHP back end and MySQL database.", icon: UserRound },
    { label: "Technologies", text: "React, PHP, MySQL", icon: Layers },
    { label: "Outcome", text: "In daily use at retail clients, keeping sales running through connection drops and syncing automatically when back online.", icon: Trophy },
  ] satisfies { label: string; text: string; icon: LucideIcon }[],
};
