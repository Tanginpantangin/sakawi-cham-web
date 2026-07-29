import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { EventCalendar } from "./eventCanlendar";
import { LanguageProvider, languageStorageKey } from "../i18n";
import { AhierMonthEnum, AwalMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth, AhierYear } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";

jest.mock("../utils/today", () => ({
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
  day(new Date(2026, 6, 30), AhierMonthEnum.BilanSa, 2, AwalMonthEnum.Syafar, 2)
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

beforeEach(() => {
  window.localStorage.setItem(languageStorageKey, "en");
});

function renderEvents(nextEvents = [
  { eventType: "AkaokThun" as const, eventDate: new Date(2026, 6, 29), sakawiType: "sakawiAhier" as const },
  { eventType: "RijaNagar" as const, eventDate: new Date(2026, 6, 30), sakawiType: "sakawiAhier" as const }
]) {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <EventCalendar
          matrixSakawi={matrix}
          fullSakawi={fullCalendar}
          nextEvents={nextEvents}
          areaType="NinhThuan"
          areaLabel="Sakawi Ninh Thuận"
        />
      </MemoryRouter>
    </LanguageProvider>
  );
}

test("renders the next important event summary and calendar action", () => {
  renderEvents();

  expect(screen.getByRole("heading", { name: /Next important event/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Cham New Year/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Happening today/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /Open in Monthly Calendar: Cham New Year/i })[0]).toHaveAttribute(
    "href",
    "/calendar?date=2026-07-29"
  );
});

test("renders upcoming, multiple same-day, descriptions, and past event text", () => {
  renderEvents();

  expect(screen.getByRole("heading", { name: /Upcoming events this year/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Awal New Year/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/First day of the Awal calendar year/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Happening tomorrow/i).length).toBeGreaterThan(0);
  expect(screen.getByRole("heading", { name: /Past events/i })).toBeInTheDocument();
  expect(screen.getAllByText(/2 day\(s\) ago/i).length).toBeGreaterThan(0);
});

test("renders empty states when no event data is available", () => {
  render(
    <LanguageProvider>
      <MemoryRouter>
        <EventCalendar
          matrixSakawi={[]}
          fullSakawi={[]}
          nextEvents={[]}
          areaType="NinhThuan"
          areaLabel="Sakawi Ninh Thuận"
        />
      </MemoryRouter>
    </LanguageProvider>
  );

  expect(screen.getAllByText(/No upcoming important events found/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/No upcoming events found for this year/i)).toBeInTheDocument();
  expect(screen.getByText(/No past events found for this year/i)).toBeInTheDocument();
});
