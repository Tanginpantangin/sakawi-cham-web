import React from "react";
import { render, screen } from "@testing-library/react";
import { AhierMonthEnum, AwalMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { LanguageProvider, languageStorageKey } from "../i18n";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { DayDetailPanel, daysBetweenCalendarDates } from "./dayDetailPanel";
import type { CountDownBarProps } from "./countDownBar";

jest.mock("../utils/today", () => ({
  getToday: () => new Date(2026, 6, 29, 12, 0, 0)
}));

const eventAhierMonth: AhierMonth = {
  month: AhierMonthEnum.BilanSa,
  year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2026 }
};

const quietAhierMonth: AhierMonth = {
  month: AhierMonthEnum.BilanDua,
  year: { nasak: NasakEnum.Kabaw, ikasSarak: IkasSarakEnum.Hak, yearNumber: 2026 }
};

const eventAwalMonth: AwalMonth = {
  month: AwalMonthEnum.Muharam,
  year: { ikasSarak: IkasSarakEnum.Jim, yearNumber: 1448 }
};

const quietAwalMonth: AwalMonth = {
  month: AwalMonthEnum.Syafar,
  year: { ikasSarak: IkasSarakEnum.Dal, yearNumber: 1448 }
};

function matrixFor(ahierMonth: AhierMonth, awalMonth: AwalMonth): MatrixCalendarType[] {
  return [{
    ahierMonth,
    dayNumbersOfAhierMonth: 30,
    firstDayOfAhierMonth: 0,
    hasGuen: false,
    typeOfGuen: GuenTypeEnum.None,
    hasGuec: false,
    typeOfGuec: GuecTypeEnum.None,
    dateOfGregoryCalendar: new Date(2026, 6, 29),
    awalMonth,
    dayNumbersOfAwalMonth: 30,
    firstDayOfAwalMonth: 0
  }];
}

function dayFixture(options: {
  dateGregory?: Date;
  ahierDate?: number;
  ahierMonth?: AhierMonth;
  awalDate?: number;
  awalMonth?: AwalMonth;
} = {}): FullCalendarType {
  return {
    dateGregory: options.dateGregory ?? new Date(2026, 6, 29),
    dateAhier: {
      date: options.ahierDate ?? 1,
      ahierMonth: options.ahierMonth ?? eventAhierMonth
    },
    dateAwal: {
      date: options.awalDate ?? 1,
      awalMonth: options.awalMonth ?? eventAwalMonth
    }
  };
}

const defaultUpcomingEvents: CountDownBarProps[] = [
  { eventType: "AkaokThun" as const, eventDate: new Date(2026, 6, 29), sakawiType: "sakawiAhier" as const }
];

function renderPanel(day: FullCalendarType, language: "vi" | "en" = "en", upcomingEvents: CountDownBarProps[] = defaultUpcomingEvents) {
  window.localStorage.setItem(languageStorageKey, language);

  return render(
    <LanguageProvider>
      <DayDetailPanel
        day={day}
        matrixSakawi={matrixFor(day.dateAhier.ahierMonth, day.dateAwal.awalMonth)}
        areaLabel="Sakawi Ninh Thuận"
        upcomingEvents={upcomingEvents}
      />
    </LanguageProvider>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

test("renders Gregorian, Cham, Awal, region, and localized event details", () => {
  renderPanel(dayFixture());

  expect(screen.getByRole("heading", { name: /Date details/i })).toBeInTheDocument();
  expect(screen.getAllByText(/July 29, 2026/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Wednesday/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/July 2026/i)).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Cham Calendar/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Awal Calendar/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Sakawi Ninh Thuận/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Cham New Year/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Awal New Year/i)).toBeInTheDocument();
  expect(screen.getAllByText(/First day of the Cham calendar year/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Happening today/i).length).toBeGreaterThan(0);
});

test("renders a localized empty state and a future countdown for dates without events", () => {
  renderPanel(
    dayFixture({
      dateGregory: new Date(2026, 7, 2),
      ahierDate: 10,
      ahierMonth: quietAhierMonth,
      awalDate: 10,
      awalMonth: quietAwalMonth
    }),
    "en",
    [{ eventType: "TamaRicaowRamawan", eventDate: new Date(2026, 7, 2), sakawiType: "sakawiAwal" }]
  );

  expect(screen.getByText(/No events on this date/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Ramawan/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/4 day\(s\) remaining/i)).toBeInTheDocument();
});

test("renders Vietnamese labels and past countdown wording", () => {
  renderPanel(
    dayFixture({
      dateGregory: new Date(2026, 6, 27),
      ahierDate: 10,
      ahierMonth: quietAhierMonth,
      awalDate: 10,
      awalMonth: quietAwalMonth
    }),
    "vi",
    [{ eventType: "AkaokThun", eventDate: new Date(2026, 6, 27), sakawiType: "sakawiAhier" }]
  );

  expect(screen.getByRole("heading", { name: /Chi tiết ngày/i })).toBeInTheDocument();
  expect(screen.getByText(/Không có sự kiện trong ngày này/i)).toBeInTheDocument();
  expect(screen.getByText(/Đã qua 2 ngày/i)).toBeInTheDocument();
});

test("updates detail content when a different selected day is rendered", () => {
  const { rerender } = render(
    <LanguageProvider>
      <DayDetailPanel
        day={dayFixture()}
        matrixSakawi={matrixFor(eventAhierMonth, eventAwalMonth)}
        areaLabel="Sakawi Ninh Thuận"
      />
    </LanguageProvider>
  );

  expect(screen.getAllByText(/29 tháng 7, 2026/i).length).toBeGreaterThan(0);

  rerender(
    <LanguageProvider>
      <DayDetailPanel
        day={dayFixture({
          dateGregory: new Date(2026, 6, 30),
          ahierDate: 10,
          ahierMonth: quietAhierMonth,
          awalDate: 10,
          awalMonth: quietAwalMonth
        })}
        matrixSakawi={matrixFor(quietAhierMonth, quietAwalMonth)}
        areaLabel="Sakawi Ninh Thuận"
      />
    </LanguageProvider>
  );

  expect(screen.getAllByText(/30 tháng 7, 2026/i).length).toBeGreaterThan(0);
});

test("calculates countdown boundaries with controlled today", () => {
  expect(daysBetweenCalendarDates(new Date(2026, 6, 29))).toBe(0);
  expect(daysBetweenCalendarDates(new Date(2026, 7, 2))).toBe(4);
  expect(daysBetweenCalendarDates(new Date(2026, 6, 27))).toBe(-2);
  expect(daysBetweenCalendarDates(new Date(2027, 0, 1), new Date(2026, 11, 31))).toBe(1);
});
