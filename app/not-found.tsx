import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[80dvh] place-items-center pt-24 text-center">
      <div>
        <p className="font-mono text-[13px] text-accent-3">404</p>
        <h1 className="mt-4 text-[44px] font-semibold tracking-[-0.04em] sm:text-[60px]">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] text-fg-2">
          The link may be outdated, or the project has moved. Everything else is one click away.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/" arrow="right">
            Back home
          </Button>
          <Button href="/#projects" variant="secondary">
            View projects
          </Button>
        </div>
      </div>
    </section>
  );
}
