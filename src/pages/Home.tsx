import Hero from "@/components/Hero";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Hero />
      <section aria-labelledby="why" className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 id="why" className="text-2xl font-bold">
            Why Ember and Earth Yoga?
          </h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-3">
            <li className="border rounded-xl p-5">
              <h3 className="font-semibold">Inclusive Classes</h3>
              <p className="mt-1 text-gray-700">
                From beginner Hatha to Power Flow, find your level and pace.
              </p>
            </li>
            <li className="border rounded-xl p-5">
              <h3 className="font-semibold">Thoughtful Trainers</h3>
              <p className="mt-1 text-gray-700">
                Certified instructors who prioritize alignment and breath.
              </p>
            </li>
            <li className="border rounded-xl p-5">
              <h3 className="font-semibold">Flexible Schedule</h3>
              <p className="mt-1 text-gray-700">
                Weekday and weekend options to keep your practice consistent.
              </p>
            </li>
          </ul>
          <div className="mt-8">
            <Link
              to="/schedule"
              className="inline-flex px-5 py-3 rounded-lg bg-brand-500 text-white hover:bg-brand-600"
            >
              See Schedule
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
