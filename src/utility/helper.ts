import dataConfig from '../data/SakawiTakaiCiim.json';
import { AhierMonthEnum, AwalMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { addAhierYears, AhierYear } from "../model/AhierDate";
import { AwalDate, AwalYear } from '../model/AwalDate';
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { awalMonthArray, awalYearArray, firstDateOfSakawiAhier_Pabuei_JimLuic_2019, firstDateOfSakawiAwal_Lieh_1439, totalDaysOf8AwalYearCycle, yearNumberOfSakawiAwal_Lieh_1439 } from './constant';

export default class Helper {
    //#region Awal
    static getDayNumbersOfAwalMonth(year: AwalYear, month: AwalMonthEnum) {
        let numberOfDay = 0;

        // Tháng lẻ: (30 ngày), gồm: 1,3,5,7,9,11.
        // Tháng chẳn: (29 ngày), gồm: 2,4,6,8,10. 
        if (month === AwalMonthEnum.Muharam || month === AwalMonthEnum.Rabiulawal || month === AwalMonthEnum.Jamadilawal ||
            month === AwalMonthEnum.Rejab || month === AwalMonthEnum.Ramadan || month === AwalMonthEnum.Julkaejah) {
            numberOfDay = 30;
        } else if (month === AwalMonthEnum.Syafar || month === AwalMonthEnum.Rabiulakhir || month === AwalMonthEnum.Jamadilakhir ||
            month === AwalMonthEnum.Sykban || month === AwalMonthEnum.Syawal) {
            numberOfDay = 29;
        } else {
            // Riêng tháng 12: năm nhuận (thun "Nâh": Hak, Dal, Jim luic) 30 ngày, 
            // năm thường (thun "Wak") 29 ngày.
            if (year.ikasSarak === IkasSarakEnum.Hak || year.ikasSarak === IkasSarakEnum.Dal || year.ikasSarak === IkasSarakEnum.JimLuic) {
                numberOfDay = 30;
            } else {
                numberOfDay = 29;
            }
        }

        return numberOfDay;
    }

    static getStartDayByAwalMonth(year: AwalYear, month: AwalMonthEnum) {
        let yearName = IkasSarakEnum[year.ikasSarak];
        let yearItem = dataConfig.filter(x => x.ArabYear === yearName)[0];
        let result = '';

        switch (month) {
            case 0:
                result = yearItem['Month_01'];
                break;
            case 1:
                result = yearItem['Month_02'];
                break;
            case 2:
                result = yearItem['Month_03'];
                break;
            case 3:
                result = yearItem['Month_04'];
                break;
            case 4:
                result = yearItem['Month_05'];
                break;
            case 5:
                result = yearItem['Month_06'];
                break;
            case 6:
                result = yearItem['Month_07'];
                break;
            case 7:
                result = yearItem['Month_08'];
                break;
            case 8:
                result = yearItem['Month_09'];
                break;
            case 9:
                result = yearItem['Month_10'];
                break;
            case 10:
                result = yearItem['Month_11'];
                break;
            case 11:
                result = yearItem['Month_12'];
                break;
            default:
                break;
        }

        return result;
    }

    static getAwalDateByGregoryDate(date: Date) {
        let differenceInTime = date.getTime() - firstDateOfSakawiAwal_Lieh_1439.getTime();
        let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        let remain = Helper.getMod(differenceInDays, totalDaysOf8AwalYearCycle);
        let quotient = Math.floor(Math.abs(differenceInDays) / totalDaysOf8AwalYearCycle);

        let awalYearNumber = yearNumberOfSakawiAwal_Lieh_1439;
        let awalYear = IkasSarakEnum.Liéh;
        let awalMonth = AwalMonthEnum.Muharam;
        let awalDate = 0;
        let totalYears = 0;
        for (let i = 0; i < awalYearArray.length; i++) {
            totalYears += awalYearArray[i].numberOfDays;
            if (remain < totalYears) {
                awalYear = awalYearArray[i].name;

                //TODO
                if (differenceInDays > 0) {
                    awalYearNumber += (quotient * 8) + i;
                } else {
                    awalYearNumber -= (quotient * 8) + i;
                }
                let numberDaysOfCurrentYear = remain - (totalYears - awalYearArray[i].numberOfDays);

                let totalMonths = 0;
                for (let j = 0; j < awalMonthArray.length; j++) {
                    totalMonths += awalMonthArray[j].numberOfDays;
                    if (numberDaysOfCurrentYear < totalMonths) {
                        awalMonth = awalMonthArray[j].name;
                        let numberDaysOfCurrentMonth = numberDaysOfCurrentYear - (totalMonths - awalMonthArray[j].numberOfDays);
                        awalDate = numberDaysOfCurrentMonth + 1;
                        break;
                    }
                }
                break;
            }
        }

        let resultDate: AwalDate = {
            date: awalDate,
            month: awalMonth,
            year: { ikasSarak: awalYear, yearNumber: awalYearNumber }
        }

        return resultDate;
    }

    static getMod(n: number, m: number) {
        const remain = n % m;
        return Math.floor(remain >= 0 ? remain : remain + m);
    };
    //#endregion

    //#region Ahier
    static getDayNumbersOfAhierMonth(year: AhierYear, month: AhierMonthEnum) {
        let numberOfDay = 0;

        /*// Tháng lẻ: (30 ngày), gồm: 1,3,5,7,9,11.
        // Tháng chẳn: (29 ngày), gồm: 2,4,6,8,10. 
        if (month === AwalMonth.Muharam || month === AwalMonth.Rabiulawal || month === AwalMonth.Jamadilawal || 
            month === AwalMonth.Rejab || month === AwalMonth.Ramadan || month === AwalMonth.Julkaejah) {
            numberOfDay = 30;
        } else if (month === AwalMonth.Syafar || month === AwalMonth.Rabiulakhir || month === AwalMonth.Jamadilakhir || 
            month === AwalMonth.Sykban || month === AwalMonth.Syawal ) {
            numberOfDay = 29;
        } else {
            // Riêng tháng 12: năm nhuận (thun "Nâh": Hak, Dal, Jim luic) 30 ngày, 
            // năm thường (thun "Wak") 29 ngày.
            if (year === IkasSarak.Hak || year === IkasSarak.Dal ||year === IkasSarak.JimLuic) {
                numberOfDay =30;
            } else {
                numberOfDay = 29;
            }
        }*/

        return numberOfDay;
    }

    static getMonthNumbersOfAhierYear(year: AhierYear) {
        if (year.ikasSarak === IkasSarakEnum.Hak
            || year.ikasSarak === IkasSarakEnum.Dal
            || year.ikasSarak === IkasSarakEnum.JimLuic) {
            return 13;
        }
        return 12;
    }

    static getStartDayByAhierMonth(year: AhierYear, month: AhierMonthEnum) {
        let yearName = IkasSarakEnum[year.ikasSarak];
        let yearItem = dataConfig.filter(x => x.ArabYear === yearName)[0];
        let result = '';

        /*switch (month) {
            case 0:
                result = yearItem['Month_01'];
                break;
            case 1:
                result = yearItem['Month_02'];
                break;
            case 2:
                result = yearItem['Month_03'];
                break;
            case 3:
                result = yearItem['Month_04'];
                break;
            case 4:
                result = yearItem['Month_05'];
                break;
            case 5:
                result = yearItem['Month_06'];
                break;
            case 6:
                result = yearItem['Month_07'];
                break;
            case 7:
                result = yearItem['Month_08'];
                break;
            case 8:
                result = yearItem['Month_09'];
                break;
            case 9:
                result = yearItem['Month_10'];
                break;
            case 10:
                result = yearItem['Month_11'];
                break;
            case 11:
                result = yearItem['Month_12'];
                break;
            default:
                break;
        }*/

        return result;
    }
    //#endregion
    static addGregoryDays(date: Date, numberOfDays: number) {
        let newDt = new Date(date);
        newDt.setDate(date.getDate() + numberOfDays);
        return newDt;
    }

    static buildMatrixCalendar(toYearAhier: number) {
        let result: MatrixCalendarType[] = [];

        const startAhierYear: AhierYear = {
            nasak: NasakEnum.Pabuei,
            ikasSarak: IkasSarakEnum.Jim,
            yearNumber: 2019
        }
        const startAwalDate = Helper.getAwalDateByGregoryDate(firstDateOfSakawiAhier_Pabuei_JimLuic_2019)
        const numberOfAhierYear = toYearAhier - (startAhierYear.yearNumber ?? 0);

        for (let y = 0; y < numberOfAhierYear; y++) {
            const newYear = addAhierYears(startAhierYear, y);
            const numberOfAhierMonth = Helper.getMonthNumbersOfAhierYear(newYear);

            for (let m = 0; m < numberOfAhierMonth; m++) {
                const awalYear: AwalYear = {
                    ikasSarak: startAwalDate.year.ikasSarak,
                    yearNumber: startAwalDate.year.yearNumber
                }

                const dayNumbersOfAhierMonth = Helper.getDayNumbersOfAhierMonth(newYear, m);
                const newGregoryDate = Helper.addGregoryDays(firstDateOfSakawiAhier_Pabuei_JimLuic_2019, dayNumbersOfAhierMonth);

                let ahierMonthItem: MatrixCalendarType = {
                    ahierYear: newYear,
                    ahierMonth: m,
                    dayNumbersOfAhierMonth: dayNumbersOfAhierMonth,
                    firstDayOfAhierMonth: 5,
                    dateOfGregoryCalendar: newGregoryDate,
                    awalYear: awalYear,
                    awalMonth: startAwalDate.month,
                    dayNumbersOfAwalMonth: Helper.getDayNumbersOfAwalMonth(awalYear, m),
                    firstDayOfAwalMonth: 7
                }

                result.push(ahierMonthItem);
            }

        }

        return result;
    }
}