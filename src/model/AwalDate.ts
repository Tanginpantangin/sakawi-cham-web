import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";
import Helper from "../utility/helper";

export interface AwalDate {
    date: number;
    awalMonth: AwalMonth;
}

export interface AwalMonth {
    month: AwalMonthEnum;
    year: AwalYear;
}

export interface AwalYear {
    ikasSarak: IkasSarakEnum;
    yearNumber?: number;
}

export function addAwalDays(currentDate: AwalDate, addedDays: number) {
    let numberOfDays = Helper.getDayNumbersOfAwalMonth(currentDate.awalMonth.year, currentDate.awalMonth.month);
    let newDays = currentDate.date + addedDays;
    let newMonth = currentDate.awalMonth.month;
    let newYear = currentDate.awalMonth.year;

    let result: AwalDate = {
        date: 1,
        awalMonth: {
            month: AwalMonthEnum.Jamadilakhir,
            year: { ikasSarak: IkasSarakEnum.Liéh }
        }
    };

    if (newDays > numberOfDays) {
        if (currentDate.awalMonth.month < 11) {
            newMonth = currentDate.awalMonth.month + 1;
        } else {
            newMonth = 0;

            if (currentDate.awalMonth.year.ikasSarak < 7) {
                newYear.ikasSarak = currentDate.awalMonth.year.ikasSarak + 1;
            } else {
                newYear.ikasSarak = 0;
            }
        }

        result = {
            date: newDays - numberOfDays,
            awalMonth: {month:newMonth, year: newYear}
        };

    } else if (newDays <= 0) {
        if (currentDate.awalMonth.month > 0) {
            newMonth = currentDate.awalMonth.month - 1;
        } else {
            newMonth = 11;

            if (currentDate.awalMonth.year.ikasSarak > 0) {
                newYear.ikasSarak = currentDate.awalMonth.year.ikasSarak - 1;
            } else {
                newYear.ikasSarak = 7;
            }
        }

        result = {
            date: Helper.getDayNumbersOfAwalMonth(currentDate.awalMonth.year, currentDate.awalMonth.month - 1) + newDays,
            awalMonth: { month: newMonth,year: newYear}
        };
    }
    else {
        result = {
            date: newDays,
            awalMonth: currentDate.awalMonth
        };
    }

    return result;
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