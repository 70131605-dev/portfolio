# Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide

```bash
npm run dev     # http://localhost:3000
npm run build   # production build (all routes are static)
npm run lint    # type-check
```

## Make it yours

All content lives in `data/`. You shouldn't need to touch components to personalise the site.

| File | What it controls |
| --- | --- |
| `data/site.ts` | Name, title, email, domain, socials, resume path, portrait, GitHub username, hero stats, highlight numbers |
| `data/experience.ts` | Career timeline (newest first) |
| `data/projects.ts` | Project cards, the homepage case study (first project), and every `/projects/[slug]` page |
| `data/skills.ts` | Skill groups and chips |
| `data/content.ts` | Overview cards, principles, process steps, strengths, pinned repos |

Before deploying:

1. **`data/site.ts`**: replace every `TODO` (domain, email, GitHub and LinkedIn URLs).
2. **`public/resume.pdf`**: replace the placeholder with your CV.
3. **Portrait**: `public/images/portrait-cutout.webp` (background-removed, shown large in the hero), `portrait.jpg` (link-preview image, and the framed hero fallback when `portraitCutout` is null) and `avatar.jpg` (square face crop for the contact card). Set both `portraitCutout` and `portrait` to null to show the initials instead.
4. **Screenshots (optional)**: add images under `public/images/projects/` and set `image` on a project. Until then, coded interface mockups are shown.
5. **Live GitHub data (optional)**: set `githubUsername`. The Activity section then shows real repositories, languages and a contribution graph, revalidated hourly. Set `GITHUB_TOKEN` to raise API rate limits. If no username is set, the section shows only data derived from this repo and never shows invented numbers.
6. **Numbers**: `heroStats` and `highlights` are plain values. Keep them accurate.

## Structure

```
app/            routes, metadata, OG image, sitemap, robots, project detail page
sections/       one file per homepage section
components/     layout (navbar, footer, cursor, loader), ui primitives, mockups, ProjectCard
data/           all editable content
lib/            GitHub fetcher, tiny syntax highlighter, utils
```

## Themes

Dark and light (warm) themes, switched from the navbar (sun/moon button).

- First visit follows the OS setting; an explicit choice is saved in `localStorage` and applied before first paint (no flash).
- All colours are CSS variables in `app/globals.css` (`:root` = dark, `[data-theme="light"]` = light). Tailwind utilities such as `bg-bg`, `text-fg`, `border-line`, `bg-ink/[0.04]` and `bg-brand` resolve to them, so a palette change never touches components.
- Project mockups and code windows intentionally stay dark in both themes, like real screenshots.

## Accessibility & motion

- Semantic landmarks, skip link, and labelled sections. Visible focus rings and keyboard-operable mobile menu (Escape closes it).
- `prefers-reduced-motion` disables the intro loader, parallax, custom cursor, particles and count-ups. Reveal animations fall back to fades.
- The custom cursor only mounts on fine-pointer devices.
