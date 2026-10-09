import type { TechKey } from "@/components/ui/TechIcon";

export type MockupVariant = "erp" | "pos" | "web" | "agri" | "events" | "ai" | "inspection" | "jobs" | "shop";

export type Project = {
  slug: string;
  /** Display number ("01"…), derived from list order — never set by hand. */
  index: string;
  title: string;
  category: string;
  year: string;
  role: string;
  /** One-line problem statement used on cards. */
  summary: string;
  contribution: string;
  stack: { name: string; icon: TechKey }[];
  achievements: string[];
  links: { demo?: string; github?: string };
  /** Shown when links are absent, e.g. client confidentiality. */
  linkNote?: string;
  featured: boolean;
  /**
   * Visual: a real screenshot path (public/images/projects/…) if you have one,
   * otherwise the coded interface mockup is rendered.
   */
  image?: string;
  /** Width / height of `image`, so it is shown uncropped. Defaults to 16/10. */
  imageAspect?: number;
  mockup: MockupVariant;
  /** Hue used for the project's glow (0–360). */
  hue: number;

  detail: {
    overview: string;
    problem: string;
    solution: string;
    responsibilities: string[];
    features: { title: string; text: string }[];
    architecture: { layer: string; items: string[] }[];
    screens: { label: string; mockup: MockupVariant }[];
    challenges: { challenge: string; solution: string }[];
    outcome: string;
    outcomes: string[];
  };
};

const projectList: Omit<Project, "index">[] = [
  {
    slug: "hot-and-spicy",
    title: "Hot & Spicy Restaurant System",
    category: "Restaurant Platform",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "Online ordering website, admin panel, desktop POS, kitchen management and a mobile app in one restaurant system.",
    contribution:
      "Built the ordering website, admin dashboard, POS and kitchen display on one shared backend so orders flow from customer to kitchen in real time.",
    stack: [
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Node.js", icon: "node" },
      { name: "MySQL", icon: "mysql" },
    ],
    achievements: [
      "Real-time order flow across POS, kitchen and admin",
      "Online ordering, table booking and billing",
      "Menu, inventory, staff and sales analytics",
    ],
    links: { demo: "https://gray-dog-901682.hostingersite.com/site/" },
    featured: true,
    image: "/images/projects/hot-spicy.webp",
    imageAspect: 683 / 375,
    mockup: "pos",
    hue: 14,
    detail: {
      overview:
        "A complete restaurant management system for Hot & Spicy: customers order online, staff take orders on a desktop POS, the kitchen works from a live ticket display, and management runs menus, staff and reports from an admin panel — with a mobile app on the same backend.",
      problem:
        "Orders arrived from the counter, phone and delivery apps with no single view. The kitchen worked from paper tickets, menu changes had to be made in several places, and sales reports were assembled by hand.",
      solution:
        "One system with a shared order pipeline. Every order — online, POS or mobile — lands in the same queue, appears on the kitchen display instantly, and feeds billing and analytics automatically.",
      responsibilities: [
        "Customer ordering website and table booking",
        "Desktop POS for orders and billing",
        "Kitchen display with live ticket tracking",
        "Admin panel: menu, inventory, staff and reports",
        "Shared Node.js API and MySQL database",
      ],
      features: [
        { title: "POS system", text: "Fast order entry, billing and payment at the counter." },
        { title: "Kitchen display", text: "Live tickets from order to ready, so nothing gets lost." },
        { title: "Online ordering", text: "Customers order and book tables from the website or app." },
        { title: "Menu management", text: "Update items and prices once; every channel updates." },
        { title: "Orders & billing", text: "Every order tracked from placement to payment." },
        { title: "Analytics", text: "Sales, popular items and daily reports out of the box." },
      ],
      architecture: [
        { layer: "Clients", items: ["React website", "Desktop POS", "Kitchen display", "Mobile app"] },
        { layer: "API", items: ["Node.js", "Order pipeline", "Auth & roles"] },
        { layer: "Data", items: ["MySQL", "Orders & billing", "Menu & inventory"] },
      ],
      screens: [
        { label: "POS & ordering", mockup: "pos" },
        { label: "Admin dashboard", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Orders from several channels had to reach the kitchen instantly and in the right order.",
          solution: "Routed every channel through one order pipeline that pushes updates to the kitchen display in real time.",
        },
        {
          challenge: "Rush hours meant many orders at once on the POS.",
          solution: "Kept POS flows short and keyboard-friendly, and made order writes fast and safe to retry.",
        },
      ],
      outcome:
        "The restaurant runs from one system: orders reach the kitchen instantly, menu changes happen once, and daily sales are visible without manual reports.",
      outcomes: ["One order pipeline for all channels", "Paperless kitchen", "Live sales reporting"],
    },
  },
  {
    slug: "iramali-clothing-store",
    title: "IRAMALI Fashion Store",
    category: "E-Commerce Platform",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "Women's fashion store for ready-to-wear, unstitched fabric and custom printing, with an admin panel that runs the shop.",
    contribution:
      "Designed and built the storefront, product catalogue, wishlist and cart, secure checkout and the admin panel the team uses to run the shop.",
    stack: [
      { name: "React", icon: "react" },
      { name: "Firebase", icon: "firebase" },
      { name: "Node.js", icon: "node" },
    ],
    achievements: [
      "Luxury, editorial UI across desktop, tablet and mobile",
      "Ready-to-wear, unstitched fabric and custom printing",
      "Admin panel for products, orders and stock",
    ],
    links: { demo: "https://iramali.pk/" },
    featured: true,
    image: "/images/projects/iramali.webp",
    imageAspect: 1672 / 941,
    mockup: "shop",
    hue: 32,
    detail: {
      overview:
        "IRAMALI is a women's fashion brand selling ready-to-wear, unstitched fabric and custom printing. The website gives the collection a premium, editorial presentation, and an admin panel lets the team run the shop — products, orders and stock — without developer help.",
      problem:
        "The brand sold mostly through social media. Customers couldn't browse the full collection in one place, product details and prices lived in message threads, and the shopping experience didn't reflect the brand's premium positioning.",
      solution:
        "A responsive storefront with clear category navigation (Women, Men, Kids, Custom, New Arrivals), editorial hero sliders, best-seller showcases, a wishlist and cart, and a secure checkout flow — backed by Firebase for products, users and orders.",
      responsibilities: [
        "Luxury UI design and responsive frontend in React",
        "Product catalogue, categories and best-seller sections",
        "Wishlist, cart and secure shopping flow",
        "Admin panel for products, orders and stock",
        "Firebase integration for data, auth and storage",
        "Performance and image optimisation for a photo-heavy site",
      ],
      features: [
        { title: "Luxury UI design", text: "Editorial layouts, serif typography and generous imagery that match the brand." },
        { title: "Product catalogue", text: "Clothing, jewellery and lifestyle collections with clean category navigation." },
        { title: "Best sellers", text: "Highlighted products with prices, discounts and ratings." },
        { title: "Wishlist & cart", text: "Save favourites and build an order across sessions." },
        { title: "Responsive design", text: "A consistent experience on desktop, tablet and mobile." },
        { title: "Secure shopping flow", text: "Protected checkout with Firebase-backed users and orders." },
      ],
      architecture: [
        { layer: "Storefront", items: ["React", "Responsive layouts", "Optimised imagery"] },
        { layer: "Services", items: ["Node.js", "Order handling", "Discount codes"] },
        { layer: "Data", items: ["Firebase", "Auth", "Products & orders", "Storage"] },
      ],
      screens: [
        { label: "Storefront & bag", mockup: "shop" },
        { label: "Orders admin", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Large, high-quality fashion photos made pages slow on mobile.",
          solution: "Served responsive, modern-format images and lazy-loaded everything below the fold.",
        },
        {
          challenge: "A premium look risked hurting usability and speed.",
          solution: "Kept the editorial styling on a simple, consistent layout system so browsing stays fast and clear.",
        },
      ],
      outcome:
        "The brand now has a storefront that looks as premium as its products, with the full collection in one place and a smooth path from browsing to checkout on any device.",
      outcomes: ["Premium brand presentation", "Full collection online", "Smooth shopping on every device"],
    },
  },
  {
    slug: "humas-signature-salon",
    title: "Huma's Signature Salon",
    category: "Booking Platform",
    year: "2025",
    role: "Full-Stack Developer",
    summary: "Salon website with online appointment booking, an admin panel and a desktop POS app for the counter.",
    contribution:
      "Built the booking website, the admin panel for staff, services and customers, and the desktop POS used at the counter.",
    stack: [
      { name: "React", icon: "react" },
      { name: "PHP", icon: "php" },
      { name: "MySQL", icon: "mysql" },
    ],
    achievements: [
      "Online booking for services and stylists",
      "Staff, services, packages and memberships",
      "POS payments, customer history and reports",
    ],
    links: { demo: "https://humassignaturesalon.com/" },
    featured: true,
    image: "/images/projects/humas-salon.webp",
    imageAspect: 683 / 375,
    mockup: "events",
    hue: 30,
    detail: {
      overview:
        "A salon management system for Huma's Signature Salon: clients book appointments online, staff manage the day from an admin panel, and the counter takes payments on a desktop POS — all sharing one customer and booking database.",
      problem:
        "Appointments were taken by phone and written in a diary, double bookings happened, and there was no record of customer history, packages or daily revenue.",
      solution:
        "An online booking website tied to staff availability, an admin panel for services, staff, customers and packages, and a POS for payments — so every booking and sale is recorded in one place.",
      responsibilities: [
        "Booking website with service and stylist selection",
        "Admin panel: appointments, staff, services, customers",
        "Desktop POS for the counter",
        "Packages, memberships and customer history",
        "Reports and analytics",
      ],
      features: [
        { title: "Appointments & booking", text: "Clients book online against real staff availability." },
        { title: "Staff management", text: "Schedules, services and performance per stylist." },
        { title: "Services & packages", text: "Service menu, bundles and memberships." },
        { title: "Payments & POS", text: "Fast checkout at the counter." },
        { title: "Customer management", text: "Profiles with visit and purchase history." },
        { title: "Reports & analytics", text: "Bookings, revenue and popular services." },
      ],
      architecture: [
        { layer: "Clients", items: ["React booking site", "Admin panel", "Desktop POS"] },
        { layer: "API", items: ["PHP", "Availability checks", "Auth & roles"] },
        { layer: "Data", items: ["MySQL", "Appointments", "Customers & sales"] },
      ],
      screens: [
        { label: "Booking calendar", mockup: "events" },
        { label: "Admin dashboard", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Two clients could book the same stylist for the same slot.",
          solution: "Checked availability on the server and locked the slot when the booking was confirmed.",
        },
        {
          challenge: "Counter staff needed speed during busy hours.",
          solution: "Kept the POS to a few large, clear steps from service selection to payment.",
        },
      ],
      outcome:
        "The salon takes bookings around the clock without double bookings, and every appointment, payment and customer visit is recorded in one system.",
      outcomes: ["24/7 online booking", "No double bookings", "Complete customer history"],
    },
  },
  {
    slug: "erp-system",
    title: "ERP Management System",
    category: "Business Software",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "A centralized business management platform that simplifies operational workflows, reporting, customer management and internal processes.",
    contribution:
      "Designed scalable interfaces and connected business workflows through a structured frontend and backend architecture.",
    stack: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "node" },
      { name: "REST API", icon: "api" },
      { name: "MySQL", icon: "mysql" },
    ],
    achievements: [
      "Unified inventory, customers and reporting in one workspace",
      "Role-based access for admins, managers and staff",
      "Modular structure ready for new business modules",
    ],
    links: {},
    linkNote: "Client project — demo available on request",
    featured: false,
    mockup: "erp",
    hue: 248,
    detail: {
      overview:
        "A modular ERP platform built for growing businesses that had outgrown spreadsheets. It brings inventory, customers, purchasing and reporting into a single interface with consistent data underneath.",
      problem:
        "Operations were spread across disconnected spreadsheets, manual records and separate tools. Data was duplicated, reports were assembled by hand and nobody had a reliable, current view of stock or sales.",
      solution:
        "A centralized web platform with a shared data model and module-based navigation. Each module — inventory, customers, purchasing, reports — reads from the same source of truth, so a change in one place is reflected everywhere.",
      responsibilities: [
        "Full-stack development across interface, API and database",
        "UI architecture and reusable component library",
        "Relational database design and migrations",
        "REST API design, validation and authentication",
        "Role-based permissions and audit trails",
      ],
      features: [
        { title: "Inventory control", text: "Stock levels, movements and low-stock alerts across locations." },
        { title: "Customer records", text: "Profiles, history and balances in one searchable view." },
        { title: "Reporting", text: "Filterable sales, stock and activity reports with export." },
        { title: "Access control", text: "Roles and permissions scoped per module and action." },
      ],
      architecture: [
        { layer: "Client", items: ["React SPA", "Component library", "Form validation"] },
        { layer: "API", items: ["Node.js / Express", "REST endpoints", "JWT auth"] },
        { layer: "Domain", items: ["Inventory service", "Customer service", "Reporting service"] },
        { layer: "Data", items: ["MySQL", "Normalized schema", "Indexed reporting views"] },
      ],
      screens: [
        { label: "Operations dashboard", mockup: "erp" },
        { label: "Inventory module", mockup: "pos" },
      ],
      challenges: [
        {
          challenge: "Reports slowed down as transaction history grew.",
          solution: "Introduced indexed reporting views and paginated queries so large ranges stay responsive.",
        },
        {
          challenge: "Each module risked inventing its own UI patterns.",
          solution: "Built a shared component layer — tables, filters, forms — so new modules ship consistently.",
        },
      ],
      outcome:
        "Operational data now lives in one structured system. Teams work from the same numbers, reports no longer need manual assembly, and the module architecture gives a clean base for future features.",
      outcomes: ["Single source of truth for operations", "Faster, self-serve reporting", "Scalable base for new modules"],
    },
  },
  {
    slug: "pos-system",
    title: "POS Management System",
    category: "Retail Technology",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "A point-of-sale platform for marts, pharmacies, cafés and multi-branch stores — built to keep selling even when the connection drops.",
    contribution:
      "Built the sales flow, inventory sync and reporting layer with offline-first behaviour and multi-branch support.",
    stack: [
      { name: "React", icon: "react" },
      { name: "PHP", icon: "php" },
      { name: "MySQL", icon: "mysql" },
    ],
    achievements: [
      "Offline / online operation with background sync",
      "Inventory, sales processing and end-of-day reports",
      "Multi-branch stock and user management",
    ],
    links: {},
    linkNote: "Client project — demo available on request",
    featured: false,
    mockup: "pos",
    hue: 214,
    detail: {
      overview:
        "A retail POS designed around the cashier's speed. It handles product lookup, checkout, returns and receipts, while syncing stock and sales to a central back office across branches.",
      problem:
        "Retailers with several outlets lacked a consistent view of stock and sales. Connectivity was unreliable, so a cloud-only checkout would stop trading whenever the network failed.",
      solution:
        "An offline-capable checkout that queues transactions locally and syncs when back online, paired with a back-office dashboard for inventory, branches and reporting.",
      responsibilities: [
        "Checkout and cart flow optimized for keyboard and barcode input",
        "Offline queue and conflict-safe sync strategy",
        "Inventory and multi-branch data model",
        "Sales, stock and shift reporting",
      ],
      features: [
        { title: "Fast checkout", text: "Barcode scan, quick search, discounts and split payments." },
        { title: "Offline mode", text: "Sales continue without internet and sync automatically." },
        { title: "Multi-branch", text: "Per-branch stock, transfers and consolidated reports." },
        { title: "Reports", text: "Daily sales, top products and cashier shift summaries." },
      ],
      architecture: [
        { layer: "Client", items: ["React desktop app", "Local transaction queue", "Receipt printing"] },
        { layer: "API", items: ["PHP", "Sync endpoints", "Idempotent writes"] },
        { layer: "Domain", items: ["Sales", "Inventory", "Branches & users"] },
        { layer: "Data", items: ["MySQL", "Branch-scoped tables", "Audit log"] },
      ],
      screens: [
        { label: "Checkout", mockup: "pos" },
        { label: "Back-office dashboard", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Duplicate sales could appear when a queued transaction was retried.",
          solution: "Gave every transaction a client-generated ID and made sync writes idempotent.",
        },
        {
          challenge: "Cashiers needed speed more than visual richness.",
          solution: "Designed keyboard-first flows with large touch targets and minimal steps to payment.",
        },
      ],
      outcome:
        "Stores keep trading through outages, managers see stock and sales across branches in one place, and the checkout stays fast during peak hours.",
      outcomes: ["Resilient offline trading", "Consolidated multi-branch view", "Faster checkout flow"],
    },
  },
  {
    slug: "property-inspection-app",
    title: "Property Inspection App",
    category: "Mobile & Web",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "A platform connecting inspectors, clients and managers — field inspections on mobile, live status and reports on the web.",
    contribution:
      "Built the inspector mobile app, the manager dashboard and the sync layer that keeps both in step in real time.",
    stack: [
      { name: "React Native", icon: "react" },
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "node" },
      { name: "Firebase", icon: "firebase" },
    ],
    achievements: [
      "Room-by-room checklists with photo evidence",
      "Real-time status updates for managers and clients",
      "Inspection reports generated from field data",
    ],
    links: {},
    linkNote: "Client project — demo available on request",
    featured: false,
    mockup: "inspection",
    hue: 200,
    detail: {
      overview:
        "An inspection platform with two sides: a mobile app inspectors use on site, and a web dashboard where managers schedule work and clients follow progress and receive reports.",
      problem:
        "Inspections were recorded on paper and photos were sent separately over chat. Managers had no live view of where inspections stood, and turning notes into a client report took hours of manual work.",
      solution:
        "A mobile checklist app that captures findings and photos per room, synced to a shared backend. Managers see every inspection's status as it changes, and reports are assembled from the captured data.",
      responsibilities: [
        "React Native inspector app with offline-tolerant forms",
        "Manager and client web dashboard",
        "Real-time sync and status updates",
        "Report generation from inspection data",
        "Roles for inspectors, managers and clients",
      ],
      features: [
        { title: "Guided checklists", text: "Room-by-room items so every inspection follows the same standard." },
        { title: "Photo evidence", text: "Photos attached to the exact checklist item they document." },
        { title: "Live status", text: "Scheduled, in progress, issues found, report sent — visible to everyone involved." },
        { title: "Client reports", text: "Structured reports built from field data instead of retyped notes." },
      ],
      architecture: [
        { layer: "Mobile", items: ["React Native", "Offline queue", "Camera & uploads"] },
        { layer: "Web", items: ["React dashboard", "Scheduling", "Client portal"] },
        { layer: "API", items: ["Node.js", "Role-based access", "Report service"] },
        { layer: "Data", items: ["Firebase", "Realtime listeners", "File storage"] },
      ],
      screens: [
        { label: "Dashboard & field app", mockup: "inspection" },
        { label: "Inspection records", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Inspectors often worked in basements and new builds with weak signal.",
          solution: "Saved checklist progress and photos locally first, then synced in the background when connected.",
        },
        {
          challenge: "Large photo sets made uploads slow on mobile data.",
          solution: "Compressed images on the device before upload and uploaded them in parallel with retry.",
        },
      ],
      outcome:
        "Inspections are captured once, in a consistent format, and everyone involved sees progress as it happens — reports no longer depend on manual retyping.",
      outcomes: ["Consistent inspection standard", "Live progress for clients", "Faster report turnaround"],
    },
  },
  {
    slug: "smart-job-portal",
    title: "Smart Job Portal",
    category: "Web Application",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "A full-stack platform for job seekers and employers, with search, applications and tracking from first apply to offer.",
    contribution:
      "Built job search and filtering, the application flow, employer dashboards and the candidate tracking pipeline.",
    stack: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "node" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    achievements: [
      "Search and filters by role, location and experience",
      "One-click applications with saved profiles",
      "Application tracking for candidates and employers",
    ],
    links: {},
    featured: false,
    mockup: "jobs",
    hue: 168,
    detail: {
      overview:
        "A job portal with two audiences: candidates searching and applying for roles, and employers posting jobs and moving applicants through a hiring pipeline.",
      problem:
        "Candidates applied through scattered channels and rarely heard back, while employers managed applicants in inboxes and spreadsheets with no shared view of the pipeline.",
      solution:
        "One platform where candidates keep a reusable profile and track every application, and employers review, shortlist and schedule interviews from a single dashboard.",
      responsibilities: [
        "Search, filters and job listing pages",
        "Candidate profiles and application flow",
        "Employer dashboard and applicant pipeline",
        "Authentication and role-based access",
        "Email notifications on status changes",
      ],
      features: [
        { title: "Smart search", text: "Filter by role, skill, location, work type and experience." },
        { title: "Saved profiles", text: "Apply to roles without re-entering the same details." },
        { title: "Application tracker", text: "Applied, shortlisted, interview, offer — visible to the candidate." },
        { title: "Employer pipeline", text: "Review, shortlist and schedule interviews in one place." },
      ],
      architecture: [
        { layer: "Client", items: ["React", "Search & filter UI", "Dashboards"] },
        { layer: "API", items: ["Node.js / Express", "JWT auth", "Notification jobs"] },
        { layer: "Data", items: ["MongoDB", "Text indexes", "Application history"] },
      ],
      screens: [
        { label: "Job search & tracker", mockup: "jobs" },
        { label: "Employer dashboard", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Search slowed down as listings and filters grew.",
          solution: "Added text and compound indexes and moved filtering to the database instead of the client.",
        },
        {
          challenge: "Candidates didn't know where their applications stood.",
          solution: "Modelled each application as a status history and notified candidates on every change.",
        },
      ],
      outcome:
        "Candidates can see exactly where every application stands, and employers manage hiring from one pipeline instead of inboxes.",
      outcomes: ["Transparent application status", "Single hiring pipeline", "Faster candidate search"],
    },
  },
  {
    slug: "study-abroad-platform",
    title: "Study Abroad Platform",
    category: "Web Platform",
    year: "2024",
    role: "Frontend & Backend Developer",
    summary:
      "A modern education platform helping students explore destinations, universities and application services in one place.",
    contribution:
      "Designed and built the responsive site, destination content structure and lead-capture flow end to end.",
    stack: [
      { name: "Next.js", icon: "next" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "PHP", icon: "php" },
      { name: "MySQL", icon: "mysql" },
    ],
    achievements: [
      "SEO-ready, responsive marketing and content pages",
      "Structured destination and university content",
      "Consultation booking and lead management",
    ],
    links: {},
    linkNote: "Live link available on request",
    featured: false,
    mockup: "web",
    hue: 262,
    detail: {
      overview:
        "A content-rich platform for a study-abroad consultancy. Students compare destinations and universities, then book a consultation — while the team manages incoming leads from an admin panel.",
      problem:
        "Information was scattered across social posts and PDFs, and enquiries arrived through many channels with no follow-up process.",
      solution:
        "A fast, searchable website with structured destination pages and a single consultation form feeding a simple lead pipeline.",
      responsibilities: [
        "Information architecture and responsive UI",
        "Content model for destinations, universities and programs",
        "Lead capture and admin panel",
        "Performance and SEO optimization",
      ],
      features: [
        { title: "Destination guides", text: "Country pages with costs, intakes and requirements." },
        { title: "University explorer", text: "Filter programs by country, level and field." },
        { title: "Consultation booking", text: "One form that routes enquiries to the team." },
        { title: "Lead dashboard", text: "Track enquiries from first contact to application." },
      ],
      architecture: [
        { layer: "Client", items: ["Next.js", "Static generation", "Tailwind CSS"] },
        { layer: "API", items: ["PHP endpoints", "Form validation", "Email notifications"] },
        { layer: "Data", items: ["MySQL", "Content tables", "Lead records"] },
      ],
      screens: [
        { label: "Home & search", mockup: "web" },
        { label: "Lead dashboard", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Many content pages risked becoming slow and inconsistent.",
          solution: "Used templated, statically generated pages driven by structured data.",
        },
      ],
      outcome:
        "Students find answers without waiting for a reply, and the team works from one organized list of enquiries.",
      outcomes: ["Clearer student journey", "Centralized enquiries", "Fast, SEO-friendly pages"],
    },
  },
  {
    slug: "agriculture-platform",
    title: "Agriculture Farm Platform",
    category: "Business Platform",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "A digital platform supporting farm information, management workflows and day-to-day business operations.",
    contribution:
      "Modelled farm, crop and task data and built the dashboards field managers use to plan and record work.",
    stack: [
      { name: "React", icon: "react" },
      { name: "Express", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
    ],
    achievements: [
      "Field, crop and season tracking",
      "Task assignment for farm teams",
      "Expense and yield records per plot",
    ],
    links: {},
    featured: false,
    mockup: "agri",
    hue: 152,
    detail: {
      overview:
        "A farm operations platform that gives owners a structured record of fields, crops, tasks and costs across each season.",
      problem:
        "Farm records lived in notebooks and messages, making it hard to plan work, compare seasons or understand costs per field.",
      solution:
        "A web dashboard for managers plus simple, mobile-friendly forms for field staff, all writing to one shared dataset.",
      responsibilities: [
        "Data model for farms, plots, crops and seasons",
        "Task and activity workflows",
        "Dashboards and summaries",
        "Authentication and roles",
      ],
      features: [
        { title: "Plot registry", text: "Every field with crop, area and season history." },
        { title: "Task board", text: "Plan, assign and record field activities." },
        { title: "Costs & yield", text: "Track inputs and harvest per plot." },
        { title: "Season overview", text: "Compare activity and results over time." },
      ],
      architecture: [
        { layer: "Client", items: ["React", "Mobile-first forms"] },
        { layer: "API", items: ["Express", "Firebase Auth"] },
        { layer: "Data", items: ["MongoDB", "Plot & season collections"] },
      ],
      screens: [
        { label: "Farm overview", mockup: "agri" },
        { label: "Task records", mockup: "events" },
      ],
      challenges: [
        {
          challenge: "Field staff had limited time and patchy connectivity.",
          solution: "Kept forms short, mobile-first and tolerant of slow networks.",
        },
      ],
      outcome:
        "Owners can see what happened on each field and plan the next season from real records instead of memory.",
      outcomes: ["Structured farm records", "Clear task ownership", "Season-over-season insight"],
    },
  },
  {
    slug: "event-management",
    title: "Event Management System",
    category: "Management Software",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "A platform for organizing events, managing bookings and clients, and coordinating operational workflows.",
    contribution: "Built booking, scheduling and client management with a calendar-first interface.",
    stack: [
      { name: "Next.js", icon: "next" },
      { name: "Node.js", icon: "node" },
      { name: "PostgreSQL", icon: "postgres" },
    ],
    achievements: ["Calendar-based booking flow", "Client and vendor records", "Payment and status tracking"],
    links: {},
    featured: false,
    mockup: "events",
    hue: 286,
    detail: {
      overview:
        "An operations tool for event organizers covering bookings, schedules, clients and vendors in one place.",
      problem:
        "Bookings were tracked in chats and spreadsheets, causing double bookings and missed follow-ups.",
      solution:
        "A calendar-centred system where every booking carries its client, venue, vendors and payment status.",
      responsibilities: ["Booking and availability logic", "Calendar UI", "Client & vendor management", "Status workflows"],
      features: [
        { title: "Availability calendar", text: "See venues and dates at a glance and prevent clashes." },
        { title: "Booking records", text: "Client, package, vendors and notes per event." },
        { title: "Payment status", text: "Track deposits and balances." },
        { title: "Team view", text: "What's happening this week, for everyone." },
      ],
      architecture: [
        { layer: "Client", items: ["Next.js", "Calendar components"] },
        { layer: "API", items: ["Node.js", "Availability checks"] },
        { layer: "Data", items: ["PostgreSQL", "Booking constraints"] },
      ],
      screens: [
        { label: "Calendar", mockup: "events" },
        { label: "Bookings", mockup: "erp" },
      ],
      challenges: [
        {
          challenge: "Concurrent bookings could claim the same slot.",
          solution: "Enforced availability with database constraints rather than client checks alone.",
        },
      ],
      outcome: "Organizers manage events from a single calendar with clear status for every booking.",
      outcomes: ["No double bookings", "Organized client records", "Shared team visibility"],
    },
  },
  {
    slug: "ai-career-coach",
    title: "AI Career Coach",
    category: "AI Application",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "An AI-supported platform that helps users explore career paths, identify skill gaps and get personalized development recommendations.",
    contribution: "Built the conversational interface, profile model and recommendation flow on top of an LLM API.",
    stack: [
      { name: "Next.js", icon: "next" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Node.js", icon: "node" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    achievements: ["Conversational career guidance", "Skill-gap analysis from user profiles", "Personalized learning roadmaps"],
    links: {},
    featured: false,
    mockup: "ai",
    hue: 230,
    detail: {
      overview:
        "A career guidance app that turns a user's background and goals into concrete paths, skill gaps and learning steps.",
      problem:
        "Generic career advice rarely accounts for a person's actual skills, constraints and goals.",
      solution:
        "Structured profiles combined with an AI assistant that grounds its suggestions in the user's own data.",
      responsibilities: ["Chat interface and streaming responses", "Profile and goals model", "Prompt design and guardrails", "Roadmap generation"],
      features: [
        { title: "Career chat", text: "Ask questions and get context-aware guidance." },
        { title: "Skill gaps", text: "Compare current skills with target roles." },
        { title: "Roadmaps", text: "Step-by-step learning plans you can track." },
        { title: "Saved sessions", text: "Pick up where you left off." },
      ],
      architecture: [
        { layer: "Client", items: ["Next.js", "Streaming UI"] },
        { layer: "API", items: ["Node.js", "LLM provider", "Rate limiting"] },
        { layer: "Data", items: ["MongoDB", "Profiles & sessions"] },
      ],
      screens: [
        { label: "Coach chat", mockup: "ai" },
        { label: "Roadmap", mockup: "events" },
      ],
      challenges: [
        {
          challenge: "Responses drifted into generic advice.",
          solution: "Grounded prompts in structured profile data and constrained output formats.",
        },
      ],
      outcome: "Users leave each session with specific next steps tied to their own profile.",
      outcomes: ["Personalized guidance", "Actionable roadmaps", "Persistent progress"],
    },
  },
];

/** Order here is display order; numbering follows it automatically. */
export const projects: Project[] = projectList.map((p, i) => ({ ...p, index: String(i + 1).padStart(2, "0") }));

/** Shown in "Selected Work" on the homepage; everything is on /projects. */
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
