import { AreaType } from "../enums/enum";

export const calendarRegionStorageKey = "sakawi.calendar.region";

export function resolveSavedCalendarRegion(): AreaType {
  if (typeof window === "undefined") {
    return "NinhThuan";
  }

  return window.localStorage.getItem(calendarRegionStorageKey) === "BinhThuan"
    ? "BinhThuan"
    : "NinhThuan";
}

export function persistCalendarRegion(areaType: AreaType) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(calendarRegionStorageKey, areaType);
}
