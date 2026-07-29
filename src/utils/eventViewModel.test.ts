import { AhierMonthEnum, AwalMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth, AhierYear } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import {
  currentAhierYear,
  daysFromDate,
  eventTiming,
  getEventsForAhierYear,
  getUpcomingMainEvents,
  toEventItem
} from "./eventViewModel";

jest.mock("./today", () => ({
  getToday: () => new Date(2026, 6, 29, 12, 0, 0)
}));

const year: AhierYear = {
  nasak: NasakEnum.Pabuei,
  ikasSarak: IkasSarakEnum.JimLuic,
  yearNumber: 2019
};

function ahierMonth(month: AhierMonthEnum): AhierMonth {
  return { month, year };
}

function awalMonth(month: AwalMonthEnum): AwalMonth {
  return { month, year: { ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 1400 } };
}

function day(date: Date, ahierMonthValue: AhierMonthEnum, ahierDate: number, awalMonthValue: AwalMonthEnum, awalDate: number): FullCalendarType {
  return {
    dateGregory: date,
    dateAhier: { date: ahierDate, ahierMonth: ahierMonth(ahierMonthValue) },
    dateAwal: { date: awalDate, awalMonth: awalMonth(awalMonthValue) }
  };
}

const fullCalendar: FullCalendarType[] = [
  day(new Date(2026, 6, 27), AhierMonthEnum.BilanTajuh, 1, AwalMonthEnum.Syafar, 4),
  day(new Date(2026, 6, 29), AhierMonthEnum.BilanSa, 1, AwalMonthEnum.Muharam, 1),
  day(new Date(2026, 6, 30), AhierMonthEnum.BilanSa, 2, AwalMonthEnum.Syafar, 2),
  day(new Date(2026, 7, 3), AhierMonthEnum.BilanDua, 3, AwalMonthEnum.Ramadan, 1)
];

const matrix: MatrixCalendarType[] = [
  {
    ahierMonth: ahierMonth(AhierMonthEnum.BilanSa),
    dayNumbersOfAhierMonth: 30,
    firstDayOfAhierMonth: 3,
    typeOfGuen: GuenTypeEnum.None,
    typeOfGuec: GuecTypeEnum.None,
    dateOfGregoryCalendar: new Date(2026, 6, 29),
    awalMonth: awalMonth(AwalMonthEnum.Muharam),
    dayNumbersOfAwalMonth: 30,
    firstDayOfAwalMonth: 3
  },
  {
    ahierMonth: ahierMonth(AhierMonthEnum.BilanDua),
    dayNumbersOfAhierMonth: 29,
    firstDayOfAhierMonth: 5,
    typeOfGuen: GuenTypeEnum.None,
    typeOfGuec: GuecTypeEnum.None,
    dateOfGregoryCalendar: new Date(2026, 7, 1),
    awalMonth: awalMonth(AwalMonthEnum.Ramadan),
    dayNumbersOfAwalMonth: 30,
    firstDayOfAwalMonth: 5
  },
  {
    ahierMonth: ahierMonth(AhierMonthEnum.BilanTajuh),
    dayNumbersOfAhierMonth: 30,
    firstDayOfAhierMonth: 1,
    typeOfGuen: GuenTypeEnum.None,
    typeOfGuec: GuecTypeEnum.None,
    dateOfGregoryCalendar: new Date(2026, 6, 27),
    awalMonth: awalMonth(AwalMonthEnum.Syafar),
    dayNumbersOfAwalMonth: 30,
    firstDayOfAwalMonth: 1
  }
];

test("calculates future, today, and past countdown boundaries", () => {
  const today = new Date(2026, 6, 29, 12, 0, 0);

  expect(daysFromDate(new Date(2026, 6, 27), today)).toBe(-2);
  expect(daysFromDate(new Date(2026, 6, 29), today)).toBe(0);
  expect(daysFromDate(new Date(2026, 6, 30), today)).toBe(1);
  expect(eventTiming(-1)).toBe("past");
  expect(eventTiming(0)).toBe("today");
  expect(eventTiming(1)).toBe("future");
});

test("identifies the current Ahier year from the active matrix month", () => {
  expect(currentAhierYear(matrix, new Date(2026, 6, 29))?.yearNumber).toBe(2019);
});

test("builds a chronological year event list with multiple events on the same date", () => {
  const events = getEventsForAhierYear(matrix, fullCalendar, year, new Date(2026, 6, 29));

  expect(events.all.map((event) => event.eventType)).toEqual([
    "KateAngaokBimong",
    "AkaokThun",
    "AwalNewYear",
    "RijaNagar",
    "TamaRicaowRamawan"
  ]);
  expect(events.upcoming.map((event) => event.eventType)).toEqual([
    "AkaokThun",
    "AwalNewYear",
    "RijaNagar",
    "TamaRicaowRamawan"
  ]);
  expect(events.past.map((event) => event.eventType)).toEqual(["KateAngaokBimong"]);
});

test("adds Cham or Awal calendar context to event items", () => {
  const chamEvent = toEventItem({ eventType: "AkaokThun", eventDate: new Date(2026, 6, 29), sakawiType: "sakawiAhier" }, matrix, fullCalendar);
  const awalEvent = toEventItem({ eventType: "AwalNewYear", eventDate: new Date(2026, 6, 29), sakawiType: "sakawiAwal" }, matrix, fullCalendar);

  expect(chamEvent.calendarContext?.latin).toMatch(/Bilan sa 1/);
  expect(awalEvent.calendarContext?.latin).toMatch(/Bilan sa 1/);
});

test("filters and sorts upcoming main events while preserving supported metadata", () => {
  const upcoming = getUpcomingMainEvents(
    [
      { eventType: "Lakhah", eventDate: new Date(2026, 6, 30), sakawiType: "sakawiAhier" },
      { eventType: "TamaRicaowRamawan", eventDate: new Date(2026, 7, 3), sakawiType: "sakawiAwal" },
      { eventType: "AkaokThun", eventDate: new Date(2026, 6, 29), sakawiType: "sakawiAhier" }
    ],
    matrix,
    fullCalendar
  );

  expect(upcoming.map((event) => event.eventType)).toEqual(["AkaokThun", "TamaRicaowRamawan"]);
  expect(upcoming[0].timing).toBe("today");
  expect(upcoming[1].daysFromToday).toBe(5);
});
