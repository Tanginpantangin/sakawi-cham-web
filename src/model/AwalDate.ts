import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";
import Helper from "../utility/helper";

export interface AwalDate {
    date: number;
    month: AwalMonthEnum;
    year: AwalYear;
}

export interface AwalMonth {
    month: AwalMonthEnum;
    year: AwalYear;
}

export interface AwalYear {
    ikasSarak: IkasSarakEnum;
    yearNumber?: number;
}


export function addAwalMonths(currentMonth: AwalMonth, addedMonths: number) {
    let newMonth = currentMonth.month + addedMonths;
    let quotient = Math.floor(newMonth / 12);
    let remain = Helper.getMod(newMonth, 12);

    let result: AwalMonth = {
        month: remain,
        year: addAwalYears(currentMonth.year, quotient)
    }

    return result;
}

export function addAwalYears(currentYear: AwalYear, addedYears: number) {
    let newIkasSarak = currentYear.ikasSarak + addedYears;
    let remain = Helper.getMod(newIkasSarak, 8);
    let newYearNumber = (currentYear.yearNumber ?? 0) + addedYears;

    let result: AwalYear = {
        ikasSarak: remain,
        yearNumber: newYearNumber
    }

    return result;
}