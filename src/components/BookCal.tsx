import { useEffect, useCallback } from "react";
import { getCalApi } from "@calcom/embed-react";

type Props = {
  /** e.g. "bailey/30min" or "yourname/15min" (handle only, no https://) */
  event: string;
  className?: string;
  label?: string;
  prefill?: { name?: string; email?: string };
};

export default function BookCal({
  event,
  className,
  label = "Book Now",
  prefill,
}: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "yoga" });
      cal("init", { origin: "https://cal.com" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { brand: "#3da792" },
          dark: { brand: "#3da792" },
        },
      });
    })();
  }, []);

  const onClick = useCallback(async () => {
    const cal = await getCalApi({ namespace: "yoga" });

    // (Optional) Instant open on first click if you also call this once in useEffect:
    // cal("preload", { calLink: event });

    console.log("[BookCal] opening", { calLink: event });
    cal("modal", {
      calLink: event, // e.g. "ember-earth-yoga/vinyasa-flow"
      config: {
        layout: "month_view",
        // Redirects: configure in Cal.com event settings (“Redirect on booking”)
        ...(prefill?.name && { name: prefill.name }),
        ...(prefill?.email && { email: prefill.email }),
        // You can also prefill other fields via config, e.g. metadata or location
      },
    });
  }, [event, prefill]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ??
        "inline-flex px-3 py-2 rounded bg-brand-500 text-white hover:bg-brand-600"
      }
    >
      {label}
    </button>
  );
}
