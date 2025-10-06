import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 id="contact-heading" className="text-3xl font-bold">
          Contact Us
        </h1>
        <p className="mt-2 text-gray-700">
          Questions about classes or memberships? Send us a note.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
