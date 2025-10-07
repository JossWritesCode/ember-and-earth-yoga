import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // refs that define "inside"
  const panelRef = useRef<HTMLUListElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search, location.hash]);

  // Close when clicking/tapping outside the mobile panel
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const clickedInsidePanel = panelRef.current?.contains(target);
      const clickedToggle = toggleBtnRef.current?.contains(target);
      if (!clickedInsidePanel && !clickedToggle) {
        setOpen(false);
      }
    };

    // capture phase helps if something stops propagation
    document.addEventListener("pointerdown", onPointerDown, { capture: true });
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, {
        capture: true,
      });
  }, [open]);

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
          <Link
            to="/"
            className="inline-flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden
              className="inline-block w-2.5 h-6 bg-brand-500 rounded"
            />
            <span className="text-lg font-bold">Ember and Earth Yoga</span>
          </Link>

          <button
            ref={toggleBtnRef}
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
            {/* desktop links ... */}
          </ul>
        </div>

        {/* Mobile panel */}
        {open && (
          <ul ref={panelRef} className="sm:hidden pb-4 space-y-1" role="menu">
            <li>
              <NavLink
                to="/"
                className={linkClasses}
                end
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                Schedule
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/trainers"
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={linkClasses}
                onClick={() => setOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
