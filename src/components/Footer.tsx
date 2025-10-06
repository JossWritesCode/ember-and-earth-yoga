export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3">
        <section aria-labelledby="address">
          <h2
            id="address"
            className="text-sm font-semibold tracking-wide uppercase text-gray-600"
          >
            Studio
          </h2>
          <p className="mt-2 text-gray-700">
            123 Lakeview Ave
            <br />
            Toronto, ON M5V 2T6
            <br />
            Canada
          </p>
          <p className="mt-2">Open daily 7:00–21:00</p>
        </section>
        <section aria-labelledby="social">
          <h2
            id="social"
            className="text-sm font-semibold tracking-wide uppercase text-gray-600"
          >
            Social
          </h2>
          <ul className="mt-2 space-y-1">
            <li>
              <a className="hover:underline" href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#" aria-label="YouTube">
                YouTube
              </a>
            </li>
          </ul>
        </section>
        <section aria-labelledby="contact">
          <h2
            id="contact"
            className="text-sm font-semibold tracking-wide uppercase text-gray-600"
          >
            Contact
          </h2>
          <p className="mt-2">
            <a className="hover:underline" href="mailto:hello@yogastudio.test">
              hello@yogastudio.test
            </a>
          </p>
          <p className="mt-1">
            <a className="hover:underline" href="tel:+14165550123">
              +1 (416) 555-0123
            </a>
          </p>
        </section>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Ember and Earth Yoga — Demo
      </div>
    </footer>
  );
}
