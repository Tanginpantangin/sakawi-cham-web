import { EventType, displayAhierMonthName, displayAwalMonthName } from "../enums/enum";
import { useLanguage } from "../i18n";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import type { CountDownBarProps } from "./countDownBar";
import { MAIN_EVENT_NAMES } from "../data/mainEvents";
import {
  CalendarDayEvent,
  displayAhierDayPhaseParts,
  displayAhierYearParts,
  displayAwalDayPhaseParts,
  displayAwalYearParts,
  formatDateParam,
  getDayEvents,
  sameDate
} from "../utils/dateFormat";
import { getToday } from "../utils/today";

interface DayDetailPanelProps {
  day: FullCalendarType;
  matrixSakawi: MatrixCalendarType[];
  areaLabel?: string;
  upcomingEvents?: CountDownBarProps[];
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysBetweenCalendarDates(target: Date, base = getToday()) {
  const targetDay = startOfDay(target);
  const baseDay = startOfDay(base);
  return Math.ceil((targetDay.getTime() - baseDay.getTime()) / 86400000);
}

function eventColorClass(eventType?: EventType, sakawiType?: string) {
  if (eventType === "VietnameseLunarNewYear" || sakawiType === "sakawiGregory") return "selected-event-gregory";
  if (eventType === "TamaRicaowRamawan" || eventType === "AwalNewYear" || sakawiType === "sakawiAwal") return "selected-event-awal";
  return "selected-event-ahier";
}

function eventCategory(copy: ReturnType<typeof getSiteCopy>, sakawiType?: string) {
  if (sakawiType === "sakawiAwal") return copy.calendar.systemAwal;
  if (sakawiType === "sakawiGregory") return copy.calendar.systemGregorian;
  return copy.calendar.systemCham;
}

export const DayDetailPanel = ({ day, matrixSakawi, areaLabel, upcomingEvents = [] }: DayDetailPanelProps) => {
  const { language } = useLanguage();
  const copy = getSiteCopy(language);
  const locale = language === "vi" ? "vi-VN" : "en-US";
  const ahierDayCount = Helper.getActualDayNumbersOfAhierMonth(matrixSakawi, day.dateAhier.ahierMonth);
  const awalDayCount = Helper.getDayNumbersOfAwalMonth(day.dateAwal.awalMonth.year, day.dateAwal.awalMonth.month);
  const ahierDay = displayAhierDayPhaseParts(day.dateAhier, ahierDayCount);
  const awalDay = displayAwalDayPhaseParts(day.dateAwal, awalDayCount);
  const ahierMonth = displayAhierMonthName(day.dateAhier.ahierMonth.month);
  const awalMonth = displayAwalMonthName(day.dateAwal.awalMonth.month);
  const ahierYear = displayAhierYearParts(day.dateAhier, false);
  const ahierYearLatin = displayAhierYearParts(day.dateAhier, true);
  const awalYear = displayAwalYearParts(day.dateAwal, false);
  const awalYearLatin = displayAwalYearParts(day.dateAwal, true);
  const dayEvents = getDayEvents(day.dateAhier, day.dateAwal, day.dateGregory, ahierDayCount);
  const selectedDateDiff = daysBetweenCalendarDates(day.dateGregory);
  const nextImportantEvent = upcomingEvents
    .filter((event) => MAIN_EVENT_NAMES[event.eventType])
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())[0];
  const maxUpcomingDays = Math.max(
    ...upcomingEvents.map((event) => Math.max(0, daysBetweenCalendarDates(event.eventDate))),
    1
  );

  function eventName(event: CalendarDayEvent | CountDownBarProps) {
    const eventType = event.eventType as EventType | undefined;
    if (!eventType) {
      return "latinName" in event ? event.latinName : "";
    }

    if (copy.events.names[eventType]) {
      return copy.events.names[eventType];
    }

    return "latinName" in event ? event.latinName : Helper.displayEventDay(eventType)?.latinName ?? eventType;
  }

  function eventDescription(event: CalendarDayEvent | CountDownBarProps) {
    const eventType = event.eventType as EventType | undefined;
    if (eventType && copy.events.descriptions[eventType]) {
      return copy.events.descriptions[eventType];
    }

    return "description" in event ? event.description : eventType ? Helper.displayEventDay(eventType)?.description : undefined;
  }

  function countdownText(days: number) {
    if (days === 0) return copy.calendar.countdownToday;
    if (days > 0) return copy.calendar.countdownFuture.replace("{count}", String(days));
    return copy.calendar.countdownPast.replace("{count}", String(Math.abs(days)));
  }

  function renderEventItem(event: CalendarDayEvent, index: number) {
    const colorClass = eventColorClass(event.eventType, event.sakawiType);
    const description = eventDescription(event);

    return (
      <li className={`selected-event-item ${colorClass}`} key={`${event.latinName}-${index}`}>
        <div className="selected-event-marker" aria-hidden="true"></div>
        <div className="selected-event-body">
          {event.akharThrahName && <span className="detail-cham selected-event-cham">{event.akharThrahName}</span>}
          <strong>{eventName(event)}</strong>
          <span className="selected-event-meta">
            {eventCategory(copy, event.sakawiType)} · {countdownText(selectedDateDiff)}
          </span>
          {description && <small>{description}</small>}
        </div>
      </li>
    );
  }

  return (
    <section
      className="selected-date-panel"
      aria-labelledby="selected-date-title"
      aria-live="polite"
      data-testid="day-detail-panel"
    >
      <div className="selected-date-heading">
        <div>
          <h2 id="selected-date-title">{copy.calendar.selectedDateTitle}</h2>
          <p>{copy.calendar.detailSubtitle}</p>
        </div>
        {areaLabel && <span className="selected-date-region">{areaLabel}</span>}
      </div>
      <div className="selected-date-primary">
        <time dateTime={formatDateParam(day.dateGregory)}>
          {day.dateGregory.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
        </time>
        <span>{day.dateGregory.toLocaleDateString(locale, { weekday: "long" })}</span>
      </div>
      <dl className="selected-date-grid">
        <div>
          <dt>{copy.calendar.gregorianDate}</dt>
          <dd>{day.dateGregory.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</dd>
        </div>
        <div>
          <dt>{copy.calendar.weekday}</dt>
          <dd>{day.dateGregory.toLocaleDateString(locale, { weekday: "long" })}</dd>
        </div>
        <div>
          <dt>{copy.calendar.gregorianMonthYear}</dt>
          <dd>{day.dateGregory.toLocaleDateString(locale, { year: "numeric", month: "long" })}</dd>
        </div>
      </dl>
      <div className="selected-date-cards">
        <article className="selected-calendar-card selected-calendar-card-ahier">
          <h3>{copy.calendar.systemCham}</h3>
          <dl>
            <div>
              <dt>{copy.calendar.day}</dt>
              <dd><span className="detail-cham">{ahierDay.akharThrah}</span><span>{ahierDay.latin}</span></dd>
            </div>
            <div>
              <dt>{copy.calendar.month}</dt>
              <dd><span className="detail-cham">{ahierMonth.akharThrahName}</span><span>{`${ahierMonth.rumiName} (${day.dateAhier.ahierMonth.month + 1})`}</span></dd>
            </div>
            <div>
              <dt>{copy.calendar.year}</dt>
              <dd><span className="detail-cham">{`${ahierYear.nasak} ${ahierYear.ikas} · ${ahierYear.year}`}</span><span>{`${ahierYearLatin.nasak} ${ahierYearLatin.ikas} · ${ahierYearLatin.year}`}</span></dd>
            </div>
          </dl>
        </article>
        <article className="selected-calendar-card selected-calendar-card-awal">
          <h3>{copy.calendar.systemAwal}</h3>
          <dl>
            <div>
              <dt>{copy.calendar.day}</dt>
              <dd><span className="detail-cham detail-awal">{awalDay.akharThrah}</span><span>{awalDay.latin}</span></dd>
            </div>
            <div>
              <dt>{copy.calendar.month}</dt>
              <dd><span className="detail-cham detail-awal">{awalMonth.akharThrahName}</span><span>{`${awalMonth.rumiName} (${day.dateAwal.awalMonth.month + 1})`}</span></dd>
            </div>
            <div>
              <dt>{copy.calendar.year}</dt>
              <dd><span className="detail-cham detail-awal">{[awalYear.ikas, awalYear.year].filter(Boolean).join(" · ")}</span><span>{[awalYearLatin.ikas, awalYearLatin.year].filter(Boolean).join(" · ")}</span></dd>
            </div>
          </dl>
        </article>
      </div>
      <div className="selected-date-events">
        <h3>{copy.calendar.events}</h3>
        {dayEvents.length > 0 ? (
          <ul className="selected-event-list">
            {dayEvents.map(renderEventItem)}
          </ul>
        ) : (
          <p className="selected-date-empty">{copy.calendar.emptyDayEvents}</p>
        )}
      </div>
      <div className="selected-date-countdown">
        <h3>{copy.calendar.countdownTitle}</h3>
        {nextImportantEvent ? (
          <article className={`selected-countdown-card ${eventColorClass(nextImportantEvent.eventType, nextImportantEvent.sakawiType)}`}>
            <div>
              <strong>{eventName(nextImportantEvent)}</strong>
              <span>{nextImportantEvent.eventDate.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</span>
              {eventDescription(nextImportantEvent) && <small>{eventDescription(nextImportantEvent)}</small>}
            </div>
            <span className="selected-countdown-days">
              {countdownText(daysBetweenCalendarDates(nextImportantEvent.eventDate))}
            </span>
            <div className="selected-countdown-track" aria-hidden="true">
              <span
                style={{
                  width: `${Math.max(0, Math.min(100, Math.round((daysBetweenCalendarDates(nextImportantEvent.eventDate) / maxUpcomingDays) * 100)))}%`
                }}
              ></span>
            </div>
          </article>
        ) : (
          <p className="selected-date-empty">{copy.calendar.countdownEmpty}</p>
        )}
      </div>
      {areaLabel && (
        <p className="selected-date-region-context">
          {copy.calendar.regionContext.replace("{region}", areaLabel)}
          {sameDate(day.dateGregory, getToday()) ? ` ${copy.calendar.today}` : ""}
        </p>
      )}
    </section>
  );
};
