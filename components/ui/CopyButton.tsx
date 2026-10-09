"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

/** Small "Copy" button that confirms in place. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* Clipboard blocked: the value is visible to copy by hand. */
        }
      }}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="inline-flex size-9 shrink-0 items-center justify-center gap-1.5 rounded-[10px] border border-line-2 text-[13px] sm:w-auto sm:px-3 text-fg-2 transition-all duration-300 hover:border-ink/25 hover:bg-ink/[0.05] hover:text-fg"
    >
      {copied ? <Check className="size-3.5 text-success" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      <span aria-live="polite" className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
