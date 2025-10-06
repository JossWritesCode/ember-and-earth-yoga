import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { EventClickArg } from "@fullcalendar/core";

import classes from "@/data/classes.json";
import { getCalApi } from "@calcom/embed-react"; // ⟵ use Cal directly

import { useMemo, useState, useEffect, useRef } from "react";

type YogaClass = {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string; // "HH:mm"
  name: string;
  instructor: string;
  level: string;
  durationMin: number;
};

const DOW: Record<YogaClass["day"], number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function dateForThisWeek(day: YogaClass["day"], time: string) {
  const now = new Date();
  const diffToMon = (now.getDay() + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMon);
  const d = new Date(monday);
  d.setDate(monday.getDate() + DOW[day]);
  const [h, m] = time.split(":").map(Number);
  d.setHours(h, m, 0, 0);
  return d;
}

const BOOKING_NAMESPACE = "ember-earth-yoga";
const bookingEventFor = (c: YogaClass) => `${BOOKING_NAMESPACE}/${c.id}`;
export default function ScheduleCalendar() {
  const calendarRef = useRef<FullCalendar>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "yoga" });
      cal("init", { origin: "https://cal.com" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { brand: "#3da792" },
          dark: { brand: "#3da792" },
        },
      });
    })();
  }, []);

  const events = useMemo(() => {
    return (classes as YogaClass[]).map((c) => {
      const start = dateForThisWeek(c.day, c.time);
      const end = new Date(start.getTime() + c.durationMin * 60000);
      return { id: c.id, title: c.name, start, end, extendedProps: c };
    });
  }, []);

  const [title, setTitle] = useState<string>("");

  // keep view in sync when resizing (defer to avoid flushSync warning)
  useEffect(() => {
    const api = calendarRef.current?.getApi?.();
    if (!api) return;
    queueMicrotask(() =>
      api.changeView(isMobile ? "listWeek" : "timeGridWeek")
    );
    setTitle(api.view?.title || "");
  }, [isMobile]);

  const onDatesSet = () => {
    const api = calendarRef.current?.getApi?.();
    setTitle(api?.view?.title || "");
  };

  const api = () => calendarRef.current?.getApi?.();
  const setView = (view: "timeGridDay" | "timeGridWeek" | "listWeek") =>
    api()?.changeView(view);
  const today = () => api()?.today();
  const prev = () => api()?.prev();
  const next = () => api()?.next();
  const currentView = calendarRef.current?.getApi?.()?.view?.type;

  const handleEventClick = async (info: EventClickArg) => {
    const c = info.event.extendedProps as YogaClass;
    const cal = await getCalApi({ namespace: "yoga" });
    cal("modal", {
      calLink: bookingEventFor(c), // e.g. "ember-earth-yoga/hatha-yoga"
      config: { layout: "month_view" },
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b">
        <div className="text-xl font-semibold">{title}</div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-xl border bg-gray-50 overflow-hidden">
            {isMobile ? (
              <>
                <button
                  type="button"
                  onClick={() => setView("timeGridDay")}
                  className={`px-3 py-1.5 text-sm font-medium hover:bg-white ${
                    currentView === "timeGridDay"
                      ? "bg-white text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  day
                </button>
                <button
                  type="button"
                  onClick={() => setView("listWeek")}
                  className={`px-3 py-1.5 text-sm font-medium hover:bg-white border-l ${
                    currentView === "listWeek"
                      ? "bg-white text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  list
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setView("timeGridWeek")}
                  className={`px-3 py-1.5 text-sm font-medium hover:bg-white ${
                    currentView === "timeGridWeek"
                      ? "bg-white text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  week
                </button>
                <button
                  type="button"
                  onClick={() => setView("listWeek")}
                  className={`px-3 py-1.5 text-sm font-medium hover:bg-white border-l ${
                    currentView === "listWeek"
                      ? "bg-white text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  list
                </button>
              </>
            )}
          </div>

          <div className="inline-flex items-center gap-2">
            <button
              type="button"
              onClick={today}
              className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800"
            >
              today
            </button>
            <div className="inline-flex overflow-hidden rounded-lg border">
              <button
                type="button"
                onClick={prev}
                className="px-3 py-1.5 text-sm bg-white hover:bg-gray-50"
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="px-3 py-1.5 text-sm bg-white hover:bg-gray-50 border-l"
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={false}
        initialView={isMobile ? "listWeek" : "timeGridWeek"}
        datesSet={onDatesSet}
        height="auto"
        contentHeight="auto"
        expandRows
        stickyHeaderDates
        slotMinTime="06:00:00"
        slotMaxTime="21:00:00"
        allDaySlot={false}
        nowIndicator
        events={events}
        views={{
          timeGridWeek: {
            dayHeaderFormat: { weekday: "short", day: "numeric" },
            slotLabelFormat: { hour: "numeric", minute: "2-digit" },
          },
          timeGridDay: {
            dayHeaderFormat: {
              weekday: "long",
              month: "short",
              day: "numeric",
            },
            slotLabelFormat: { hour: "numeric", minute: "2-digit" },
          },
          listWeek: {
            listDayFormat: {
              weekday: "short",
              month: "short",
              day: "numeric",
            },
            listDaySideFormat: false,
          },
        }}
        eventTimeFormat={{ hour: "numeric", minute: "2-digit" }}
        eventClick={handleEventClick}
        eventClassNames={() => [
          "!bg-brand-500",
          "!border-brand-600",
          "!text-white",
          isMobile ? "!text-[10px] !px-1 !py-0.5" : "",
          "cursor-pointer",
        ]}
        eventContent={(arg) => {
          const c = arg.event.extendedProps as YogaClass;
          return (
            <div
              className={
                isMobile
                  ? "text-[10px] leading-tight"
                  : "text-[11px] leading-tight"
              }
            >
              <div className="font-semibold truncate">{arg.event.title}</div>
              <div className="opacity-70 truncate">
                {c.instructor} • {c.level}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
