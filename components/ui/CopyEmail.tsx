"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Copies the address and confirms in place; falls back to a mailto link. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="group/btn inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line-2 bg-ink/[0.03] px-6 text-[15px] font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:bg-ink/[0.07]"
      aria-live="polite"
    >
      {copied ? <Check className="size-4 text-success" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      {copied ? "Email copied" : "Copy Email"}
    </button>
  );
}
