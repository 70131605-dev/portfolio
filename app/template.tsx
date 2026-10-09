/**
 * Re-mounts on every navigation, replaying a short CSS fade/slide.
 * CSS rather than JS so the first paint never waits for hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
