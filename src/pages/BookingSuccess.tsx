import { Link } from "react-router-dom";

export default function BookingSuccess() {
  return (
    <section className="py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100">
          <svg aria-hidden width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </span>
        <h1 className="mt-4 text-3xl font-bold">You’re booked!</h1>
        <p className="mt-2 text-gray-700">
          This is a demo checkout page. Your spot has been <em>pretend</em>{" "}
          reserved. See you on the mat!
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            to="/schedule"
            className="px-4 py-2 rounded bg-brand-500 text-white hover:bg-brand-600"
          >
            Back to Schedule
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
