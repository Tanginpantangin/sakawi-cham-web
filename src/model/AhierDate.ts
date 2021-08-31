import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";

export interface AhierDate {
    date: number;
    month: AhierMonthEnum;
    year: AhierYear;
}
export interface AhierYear {
    nasak: NasakEnum;
    ikasSarak: IkasSarakEnum;
    yearNumber?: number;
}

export function addAhierYears(currentYear: AhierYear, addedYears: number) {
    let newNasak = (currentYear.nasak + addedYears) % 12;
    let newIkasSarak = (currentYear.ikasSarak + addedYears) % 8;
    let newYearNumber = (currentYear.yearNumber ?? 0) + addedYears;

    let result: AhierYear = {
        nasak: newNasak,
        ikasSarak: newIkasSarak,
        yearNumber: newYearNumber
    }

    return result;
}
