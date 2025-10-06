import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  // Close menu on route change (accessibility + UX)
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
    };
  }, []);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    "px-3 py-2 rounded hover:bg-gray-100 aria-[current=page]:font-semibold" +
    (isActive ? " bg-gray-100" : "");

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6"
        aria-label="Primary"
        role="navigation"
      >
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-2.5 h-6 bg-brand-500 rounded"
            ></span>
            <span className="text-lg font-bold">Ember and Earth Yoga</span>
          </Link>

          <button
            className="sm:hidden p-2 rounded hover:bg-gray-100"
            aria-expanded={open}
            aria-controls="primary-menu"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              width="24"
              height="24"
              role="img"
              aria-hidden
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          <ul id="primary-menu" className="hidden sm:flex items-center gap-1">
            <li>
              <NavLink to="/" className={linkClasses} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/schedule" className={linkClasses}>
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink to="/trainers" className={linkClasses}>
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClasses}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className="ml-2 inline-flex items-center px-3 py-2 rounded bg-brand-500 text-white hover:bg-brand-600"
              >
                Book a Class
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile panel */}
        {open && (
          <ul className="sm:hidden pb-4 space-y-1" role="menu">
            <li>
              <NavLink to="/" className={linkClasses} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/schedule" className={linkClasses}>
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink to="/trainers" className={linkClasses}>
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClasses}>
                Contact
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
