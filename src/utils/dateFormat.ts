import {
  AwalMonthEnum,
  displayAhierMonthName,
  displayAwalMonthName,
  displayNasakName,
  EventType,
  IkasSarakEnum,
  SakawiType
} from "../enums/enum";
import { AhierDate } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";
import Helper from "../utility/helper";

export interface CalendarDayEvent {
  eventType?: EventType;
  sakawiType?: SakawiType;
  latinName: string;
  akharThrahName?: string;
  vnName?: string;
  description?: string;
}

const eventTypes: EventType[] = [
  "AkaokThun",
  "RijaNagar",
  "KatePaleiHamuTanran",
  "KateAngaokBimong",
  "CaMbur",
  "Lakhah",
  "AwalNewYear",
  "TamaRicaowRamawan",
  "TalaihAekRamawan",
  "MukTrun",
  "OngTrun",
  "IkakWaha",
  "TalaihWaha",
  "YuerYang",
  "VietnameseLunarNewYear"
];

export function sameDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export function formatDateParam(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateParam(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  return parsed.getFullYear() === year
    && parsed.getMonth() === month - 1
    && parsed.getDate() === day
    ? parsed
    : undefined;
}

function getAhierDayPhase(dateAhier: AhierDate, dayCount: number) {
  if (dayCount === 30) {
    return dateAhier.date <= 15
      ? { value: dateAhier.date, phase: "bingun" as const }
      : { value: dateAhier.date - 15, phase: "klem" as const };
  }

  if (dateAhier.date <= 14) {
    return {
      value: dateAhier.date <= 5 ? dateAhier.date : dateAhier.date + 1,
      phase: "bingun" as const
    };
  }

  return { value: dateAhier.date - 14, phase: "klem" as const };
}

function getAwalDayPhase(dateAwal: AwalDate, dayCount: number) {
  if (dayCount === 30) {
    return dateAwal.date <= 15
      ? { value: dateAwal.date, phase: "bingun" as const }
      : { value: dateAwal.date - 15, phase: "klem" as const };
  }

  return dateAwal.date <= 14
    ? { value: dateAwal.date, phase: "bingun" as const }
    : { value: dateAwal.date - 14, phase: "klem" as const };
}

export function displayAhierDayPhaseParts(dateAhier: AhierDate, dayCount: number) {
  const { value, phase } = getAhierDayPhase(dateAhier, dayCount);
  const suffix = phase === "bingun" ? "\uAA43" : "\uAA4C";

  return {
    akharThrah: `${Helper.convertToChamDigitUnicode(value)}${suffix}`,
    latin: `${value} ${phase}`
  };
}

export function displayAwalDayPhaseParts(dateAwal: AwalDate, dayCount: number) {
  const { value, phase } = getAwalDayPhase(dateAwal, dayCount);
  const suffix = phase === "bingun" ? "\uAA43" : "\uAA4C";

  return {
    akharThrah: `${Helper.convertToChamDigitUnicode(value)}${suffix}`,
    latin: `${value} ${phase}`
  };
}

export function displayIkasSarakLatin(ikasSarak: IkasSarakEnum) {
  return IkasSarakEnum[ikasSarak].replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function displayAhierDateSummary(dateAhier: AhierDate, dayCount: number) {
  const month = displayAhierMonthName(dateAhier.ahierMonth.month);
  const nasak = displayNasakName(dateAhier.ahierMonth.year.nasak);
  const phase = displayAhierDayPhaseParts(dateAhier, dayCount);

  return {
    akharThrah: `${phase.akharThrah} ${month.akharThrahName}`,
    latin: `${phase.latin}, ${month.rumiName} ${dateAhier.ahierMonth.month + 1}, ${nasak.rumiName} ${displayIkasSarakLatin(dateAhier.ahierMonth.year.ikasSarak)} ${dateAhier.ahierMonth.year.yearNumber}`
  };
}

export function displayAwalDateSummary(dateAwal: AwalDate, dayCount: number) {
  const month = displayAwalMonthName(dateAwal.awalMonth.month);
  const phase = displayAwalDayPhaseParts(dateAwal, dayCount);

  return {
    akharThrah: `${phase.akharThrah} ${month.akharThrahName}`,
    latin: `${phase.latin}, ${month.rumiName} ${dateAwal.awalMonth.month + 1}, ${displayIkasSarakLatin(dateAwal.awalMonth.year.ikasSarak)} ${dateAwal.awalMonth.year.yearNumber ?? ""}`.trim()
  };
}

function rawEventsForDay(dateAhier: AhierDate, dateAwal: AwalDate, dateGregory: Date, ahierDayCount: number) {
  const result: string[] = [];

  if (Helper.isVietnameseLunarNewYear(dateGregory)) result.push("Tết Nguyên Đán");
  if (dateAhier.ahierMonth.month === 0 && dateAhier.date === 1) result.push("Akaok thun");

  if (dateAwal.awalMonth.month === AwalMonthEnum.Muharam && dateAwal.date === 1) {
    result.push("Thun birau Awal");
  }

  if (dateAhier.ahierMonth.month === 0 && dateGregory.getDay() === 4) {
    if (dateAwal.awalMonth.month === AwalMonthEnum.Ramadan) {
      if (dateAwal.date >= 16 && dateAhier.date <= 22) result.push("Rija Nagar");
    } else if (dateAhier.date >= 1 && dateAhier.date <= 7) {
      result.push("Rija Nagar");
    }
  }

  if (dateAhier.ahierMonth.month === 5 && dateAhier.date === ahierDayCount) result.push("Katé palei Hamu Tanran");
  if (dateAhier.ahierMonth.month === 6 && dateAhier.date === 1) result.push("Katé angaok bimong");
  if (dateAhier.ahierMonth.month === 8 && dateAhier.date === (ahierDayCount === 30 ? 16 : 15)) result.push("Ca-mbur");
  if (dateAwal.awalMonth.month === 8 && dateAwal.date === 1) result.push("Tamâ ricaow Ramâwan");
  if (dateAwal.awalMonth.month === 8 && dateAwal.date === 16) result.push("Muk trun");
  if (dateAwal.awalMonth.month === 8 && dateAwal.date === 21) result.push("Ong trun");
  if (dateAwal.awalMonth.month === 9 && dateAwal.date === 2) result.push("Talaih aek Ramâwan");
  if (dateAwal.awalMonth.month === 11 && dateAwal.date === 1) result.push("Ikak Waha");
  if (dateAwal.awalMonth.month === 11 && dateAwal.date === 11) result.push("Talaih Waha");
  if (dateAhier.ahierMonth.month === 3 && dateGregory.getDay() === 0 && dateAhier.date < 7) result.push("Yuer Yang");

  if ([2, 5, 7, 9, 10].includes(dateAhier.ahierMonth.month) && dateGregory.getDay() === 3) {
    const offset = ahierDayCount === 30 ? dateAhier.date - 15 : dateAhier.date - 14;
    if (offset > 0 && offset % 2 === 0) result.push("Lakhah");
  }

  return result;
}

function mapEventName(eventName: string): CalendarDayEvent {
  let eventType = eventTypes.find((type) => {
    const info = Helper.displayEventDay(type);
    return info?.latinName === eventName || info?.vnName === eventName;
  });

  if (!eventType) {
    if (eventName === "Rija Nagar") eventType = "RijaNagar";
    else if (eventName.includes("Hamu Tanran")) eventType = "KatePaleiHamuTanran";
    else if (eventName.includes("angaok bimong")) eventType = "KateAngaokBimong";
    else if (eventName.includes("Thun birau Awal")) eventType = "AwalNewYear";
    else if (eventName.includes("Ram") && !eventName.includes("Talaih")) eventType = "TamaRicaowRamawan";
    else if (eventName.includes("Talaih") && eventName.includes("Ram")) eventType = "TalaihAekRamawan";
    else if (eventName.includes("Lakhah")) eventType = "Lakhah";
  }

  const info = eventType ? Helper.displayEventDay(eventType) : undefined;

  return {
    eventType,
    sakawiType: info?.sakawiType as SakawiType | undefined,
    latinName: info?.latinName ?? eventName,
    akharThrahName: info?.akharThrahName,
    vnName: info?.vnName,
    description: info?.description
  };
}

export function getDayEvents(dateAhier: AhierDate, dateAwal: AwalDate, dateGregory: Date, ahierDayCount: number) {
  return rawEventsForDay(dateAhier, dateAwal, dateGregory, ahierDayCount).map(mapEventName);
}
