import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = new FormData(e.currentTarget);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
      website: "", // honeypot field (unused)
    };

    try {
      // Dummy endpoint (echoes the payload)
      const res = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
      setMessage(
        "Thanks! We received your message and will get back to you soon."
      );
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Sorry, something went wrong. Please try again later.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      aria-describedby="contact-help"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 resize-y"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 rounded bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>

      <p
        id="contact-help"
        className={`text-sm ${
          status === "error" ? "text-red-700" : "text-brand-700"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
