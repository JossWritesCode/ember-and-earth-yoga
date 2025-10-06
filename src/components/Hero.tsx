import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid gap-8 sm:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Find your calm. Build your strength.
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Breath-led classes for every body, from gentle restorative to power
            flow.
          </p>
          <div className="mt-6">
            <Link
              to="/schedule"
              className="inline-flex items-center px-5 py-3 rounded-lg bg-brand-500 text-white hover:bg-brand-600"
            >
              Book a Class
            </Link>
          </div>
        </div>
        <div className="relative">
          <picture>
            <source srcSet="/photos/yoga-hero.avif" type="image/avif" />
            <source srcSet="/photos/yoga-hero.webp" type="image/webp" />
            <img
              src="/hero.png"
              alt="Person practicing yoga in a bright studio"
              className="w-full h-64 sm:h-[22rem] object-cover rounded-xl shadow"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
