import { displayAhierDateSummary, displayAwalDateSummary, sameDate } from "./dateFormat";
import type { CountDownBarProps } from "../components/countDownBar";
import { EventType, SakawiType } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { MAIN_EVENT_NAMES } from "../data/mainEvents";
import Helper from "../utility/helper";
import { getToday } from "./today";

export type EventTiming = "past" | "today" | "future";

export interface SakawiEventItem extends CountDownBarProps {
  daysFromToday: number;
  timing: EventTiming;
  isMainEvent: boolean;
  info: ReturnType<typeof Helper.displayEventDay>;
  day?: FullCalendarType;
  calendarContext?: {
    akharThrah: string;
    latin: string;
  };
}

export function startOfCalendarDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function daysFromDate(targetDate: Date, baseDate: Date = getToday()) {
  const target = startOfCalendarDay(targetDate);
  const base = startOfCalendarDay(baseDate);
  return Math.ceil((target.getTime() - base.getTime()) / 86400000);
}

export function eventTiming(daysFromToday: number): EventTiming {
  if (daysFromToday < 0) return "past";
  if (daysFromToday === 0) return "today";
  return "future";
}

export function currentAhierYear(matrix: MatrixCalendarType[], today: Date = getToday()): AhierYear | undefined {
  return matrix.find((month) =>
    Helper.addGregoryDays(month.dateOfGregoryCalendar, month.dayNumbersOfAhierMonth) > today
  )?.ahierMonth.year;
}

export function isSameAhierYear(left: AhierYear, right: AhierYear) {
  return left.yearNumber === right.yearNumber
    && left.nasak === right.nasak
    && left.ikasSarak === right.ikasSarak;
}

function findCalendarDay(fullCalendar: FullCalendarType[], eventDate: Date) {
  return fullCalendar.find((day) => sameDate(day.dateGregory, eventDate));
}

function resolveSakawiType(event: CountDownBarProps, info: ReturnType<typeof Helper.displayEventDay>) {
  return event.sakawiType ?? info?.sakawiType as SakawiType | undefined;
}

function calendarContextForEvent(
  event: CountDownBarProps,
  matrix: MatrixCalendarType[],
  fullCalendar: FullCalendarType[],
  info: ReturnType<typeof Helper.displayEventDay>
) {
  const day = findCalendarDay(fullCalendar, event.eventDate);
  const sakawiType = resolveSakawiType(event, info);

  if (!day) {
    return undefined;
  }

  if (sakawiType === "sakawiAwal") {
    const dayCount = Helper.getDayNumbersOfAwalMonth(day.dateAwal.awalMonth.year, day.dateAwal.awalMonth.month);
    return displayAwalDateSummary(day.dateAwal, dayCount);
  }

  if (sakawiType === "sakawiAhier") {
    const dayCount = Helper.getActualDayNumbersOfAhierMonth(matrix, day.dateAhier.ahierMonth);
    return displayAhierDateSummary(day.dateAhier, dayCount);
  }

  return undefined;
}

export function toEventItem(
  event: CountDownBarProps,
  matrix: MatrixCalendarType[],
  fullCalendar: FullCalendarType[],
  today: Date = getToday()
): SakawiEventItem {
  const info = Helper.displayEventDay(event.eventType);
  const days = daysFromDate(event.eventDate, today);
  const sakawiType = resolveSakawiType(event, info);

  return {
    ...event,
    sakawiType,
    info,
    daysFromToday: days,
    timing: eventTiming(days),
    isMainEvent: Boolean(MAIN_EVENT_NAMES[event.eventType]),
    day: findCalendarDay(fullCalendar, event.eventDate),
    calendarContext: calendarContextForEvent(event, matrix, fullCalendar, info)
  };
}

export function getEventsForAhierYear(
  matrix: MatrixCalendarType[],
  fullCalendar: FullCalendarType[],
  year: AhierYear,
  today: Date = getToday()
) {
  const datesInYear = fullCalendar.filter((day) => isSameAhierYear(day.dateAhier.ahierMonth.year, year));
  const events = Helper.getEventsInAhierYear(matrix, datesInYear)
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())
    .map((event) => toEventItem(event, matrix, fullCalendar, today));

  return {
    all: events,
    upcoming: events.filter((event) => event.timing !== "past"),
    past: events.filter((event) => event.timing === "past")
  };
}

export function getUpcomingMainEvents(
  events: CountDownBarProps[],
  matrix: MatrixCalendarType[],
  fullCalendar: FullCalendarType[],
  today: Date = getToday()
) {
  return events
    .filter((event) => MAIN_EVENT_NAMES[event.eventType as EventType])
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())
    .map((event) => toEventItem(event, matrix, fullCalendar, today));
}
