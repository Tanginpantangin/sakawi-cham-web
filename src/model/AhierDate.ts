import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import Helper from "../utility/helper";

export interface AhierDate {
    date: number;
    ahierMonth: AhierMonth;
}

export interface AhierMonth {
    month: AhierMonthEnum;
    year: AhierYear;
}

export interface AhierYear {
    nasak: NasakEnum;
    ikasSarak: IkasSarakEnum;
    yearNumber?: number;
}

//TODO
export function addAhierDays(currentDate: AhierDate, addedDays: number) {
    let numberOfDays = Helper.getDayNumbersOfAhierMonth(currentDate.ahierMonth.year, currentDate.ahierMonth.month);
    let newDays = currentDate.date + addedDays;
    let newMonth = currentDate.ahierMonth.month;
    let newYear = currentDate.ahierMonth.year;

    let result: AhierDate = {
        date: 1,
        ahierMonth: {
            month: AhierMonthEnum.BilanSa,
            year: { nasak: NasakEnum.Takuh, ikasSarak: IkasSarakEnum.Liéh }
        }
    };

    if (newDays > numberOfDays) {
        if (currentDate.ahierMonth.month < Helper.getMonthNumbersOfAhierYear(currentDate.ahierMonth.year)) {
            newMonth = currentDate.ahierMonth.month + 1;
        } else {
            newMonth = 0;

            if (currentDate.ahierMonth.year.ikasSarak < 7) {
                newYear.ikasSarak = currentDate.ahierMonth.year.ikasSarak + 1;
            } else {
                newYear.ikasSarak = 0;
            }
        }

        result = {
            date: newDays - numberOfDays,
            ahierMonth: {month:newMonth, year: newYear}
        };

    } else if (newDays <= 0) {
        if (currentDate.ahierMonth.month > 0) {
            newMonth = currentDate.ahierMonth.month - 1;
        } else {
            let previousYear = addAhierYears(currentDate.ahierMonth.year, -1);
            newMonth = Helper.getMonthNumbersOfAhierYear(previousYear) - 1;

            if (currentDate.ahierMonth.year.ikasSarak > 0) {
                newYear.ikasSarak = currentDate.ahierMonth.year.ikasSarak - 1;
            } else {
                newYear.ikasSarak = 7;
            }
        }

        result = {
            date: Helper.getDayNumbersOfAhierMonth(currentDate.ahierMonth.year, currentDate.ahierMonth.month - 1) + newDays,
            ahierMonth: { month: newMonth,year: newYear}
        };
    }
    else {
        result = {
            date: newDays,
            ahierMonth: currentDate.ahierMonth
        };
    }

    return result;
}

export function addAhierMonths(currentMonth: AhierMonth, addedMonths: number) {
    let numberOfMonths = Helper.getMonthNumbersOfAhierYear(currentMonth.year);
    let newMonth = currentMonth.month + addedMonths;
    let quotient = Math.floor(newMonth / numberOfMonths);
    let remain = Helper.getMod(newMonth, numberOfMonths);

    let result: AhierMonth = {
        month: remain,
        year: addAhierYears(currentMonth.year, quotient)
    }

    return result;
}


export function addAhierYears(currentYear: AhierYear, addedYears: number) {
    let newNasak = (currentYear.nasak + addedYears) % 12;
    let remainNasak = Helper.getMod(newNasak, 12);

    let newIkasSarak = (currentYear.ikasSarak + addedYears) % 8;
    let remainIkasSarak = Helper.getMod(newIkasSarak, 8);

    let newYearNumber = (currentYear.yearNumber ?? 0) + addedYears;

    let result: AhierYear = {
        nasak: remainNasak,
        ikasSarak: remainIkasSarak,
        yearNumber: newYearNumber
    }

    return result;
}
