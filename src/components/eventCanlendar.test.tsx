import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

const defaultNextEvents = [
  { eventType: "AkaokThun" as const, eventDate: new Date(2026, 6, 29), sakawiType: "sakawiAhier" as const },
  { eventType: "RijaNagar" as const, eventDate: new Date(2026, 6, 30), sakawiType: "sakawiAhier" as const }
];

type RenderEventsOptions = {
  nextEvents?: typeof defaultNextEvents;
  areaType?: "NinhThuan" | "BinhThuan";
  areaLabel?: string;
};

beforeEach(() => {
  window.localStorage.setItem(languageStorageKey, "en");
});

function renderEvents({
  nextEvents = defaultNextEvents,
  areaType = "NinhThuan",
  areaLabel = "Sakawi Ninh Thuận"
}: RenderEventsOptions = {}) {
  return render(
    <LanguageProvider>
      <MemoryRouter>
        <EventCalendar
          matrixSakawi={matrix}
          fullSakawi={fullCalendar}
          nextEvents={nextEvents}
          areaType={areaType}
          areaLabel={areaLabel}
        />
      </MemoryRouter>
    </LanguageProvider>
  );
}

test("uses a centered Events year heading group with the Akhar Takai Cham year line", () => {
  const { container, unmount } = renderEvents();

  const headingGroup = container.querySelector(".event-year-title-group");
  expect(headingGroup).toBeInTheDocument();
  expect(headingGroup).toContainElement(screen.getByText("Sakawi Ninh Thuận"));
  expect(headingGroup).toContainElement(screen.getByRole("heading", { name: /Events in 2019/i }));

  const chamYearLine = headingGroup?.querySelector(".event-year-name-cham");
  expect(chamYearLine).toBeInTheDocument();
  expect(chamYearLine).toHaveTextContent(/ - /);
  expect(chamYearLine?.textContent).toMatch(/[\uAA50-\uAA59]/);
  expect(chamYearLine?.textContent).toContain("꩒꩐꩑꩙");

  const latinYearLine = within(headingGroup as HTMLElement).getByText(/Pabuei JimLuic - 2019/i);
  expect(latinYearLine).not.toHaveClass("event-year-name-cham");

  const firstEventCard = container.querySelector(".event-list-card");
  expect(firstEventCard).toBeInTheDocument();
  expect(firstEventCard).not.toHaveClass("event-year-title-group");
  expect(firstEventCard).not.toHaveClass("event-year-name-cham");

  fireEvent.click(screen.getByRole("button", { name: /Next year/i }));
  const nextChamYearLine = container.querySelector(".event-year-name-cham");
  expect(nextChamYearLine).toHaveTextContent(/ - /);
  expect(nextChamYearLine?.textContent).toMatch(/[\uAA50-\uAA59]/);
  expect(nextChamYearLine?.textContent).toContain("꩒꩐꩒꩐");

  unmount();

  const binhThuanRender = renderEvents({
    areaType: "BinhThuan",
    areaLabel: "Sakawi Bình Thuận"
  });
  const binhThuanHeadingGroup = binhThuanRender.container.querySelector(".event-year-title-group");
  expect(binhThuanHeadingGroup).toContainElement(screen.getByText("Sakawi Bình Thuận"));
  expect(binhThuanHeadingGroup?.querySelector(".event-year-name-cham")).toHaveTextContent(/ - /);
});

test("renders yearly timeline cards and opens event details in a dialog", () => {
  renderEvents();

  expect(screen.getByRole("heading", { name: /Events in 2019/i })).toBeInTheDocument();
  expect(screen.getAllByText(/Cham New Year/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Happening today/i).length).toBeGreaterThan(0);

  const chamNewYearCard = screen.getByRole("button", { name: /Cham New Year, Happening today/i });
  expect(chamNewYearCard.querySelector(".event-cham-name")?.textContent).toBeTruthy();
  expect(within(chamNewYearCard).getByRole("heading", { name: /Cham New Year/i })).toBeInTheDocument();
  expect(within(chamNewYearCard).getByText(/First day of the Cham calendar year/i)).toBeInTheDocument();
  expect(within(chamNewYearCard).getByText(/Happening today/i)).toBeInTheDocument();
  expect(within(chamNewYearCard).getByText(/Read more/i)).toBeInTheDocument();
  expect(within(chamNewYearCard).queryByText(/Bilan sa/i)).not.toBeInTheDocument();
  expect(within(chamNewYearCard).queryByText(/July 29, 2026/i)).not.toBeInTheDocument();
  expect(within(chamNewYearCard).queryByText(/^Cham Calendar$/i)).not.toBeInTheDocument();

  fireEvent.click(chamNewYearCard);
  const dialog = screen.getByRole("dialog", { name: /Cham New Year/i });
  expect(dialog).toBeInTheDocument();
  expect(within(dialog).getByText(/July 29, 2026/i)).toBeInTheDocument();
  expect(within(dialog).getAllByText(/Cham Calendar/i).length).toBeGreaterThan(0);
  expect(within(dialog).getByText(/Bilan sa/i)).toBeInTheDocument();
  expect(within(dialog).getByRole("link", { name: /Open in Monthly Calendar/i })).toHaveAttribute(
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

  expect(screen.getByText(/No upcoming events found for this year/i)).toBeInTheDocument();
  expect(screen.getByText(/No past events found for this year/i)).toBeInTheDocument();
});
