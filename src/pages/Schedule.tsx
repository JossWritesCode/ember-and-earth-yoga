import ScheduleCalendar from "@/components/ScheduleCalendar";

export default function Schedule() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-bold">Weekly Schedule</h1>
        <p className="mt-1 text-gray-700">
          Click a class to book. All times local.
        </p>
        <div className="mt-6">
          <ScheduleCalendar />
        </div>
      </div>
    </section>
  );
}
