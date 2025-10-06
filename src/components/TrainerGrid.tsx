import trainers from "@/data/trainers.json";

type Trainer = {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  bio: string;
};

export default function TrainerGrid() {
  return (
    <section aria-labelledby="trainers-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 id="trainers-heading" className="text-2xl font-bold">
          Meet the Trainers
        </h2>
        <p className="mt-1 text-gray-700">
          Experienced, supportive, and here for your practice.
        </p>

        <ul className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {(trainers as Trainer[]).map((t) => (
            <li
              key={t.id}
              className="border rounded-xl overflow-hidden bg-white"
            >
              <img
                src={t.photo}
                alt={`${t.name}, ${t.specialty}`}
                className="w-full h-80 object-cover object-top"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="text-sm text-brand-700">{t.specialty}</p>
                <p className="mt-2 text-sm text-gray-700">{t.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
