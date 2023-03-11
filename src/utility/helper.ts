import { AreaType } from '../pages/monthCalendarPage';
import { CountDownBarProps } from '../components/countDownBar';
import sakawiTakaiCiimConfig from '../data/SakawiTakaiCiim.json';
import { AhierMonthEnum, AwalMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth, AhierYear } from "../model/AhierDate";
import { AwalDate, AwalMonth, AwalYear } from '../model/AwalDate';
import { FullCalendarType } from '../model/FullCalendarType';
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { awalMonthArray, awalYearArray, firstDateOfSakawiAhier_InaGirai_Lieh_1988, firstDateOfSakawiAwal_Lieh_1407, totalDaysOf8AwalYearCycle, yearNumberOfSakawiAwal_Lieh_1407 } from './constant';

export default class Helper {
    //#region Awal
    static addAwalDays(currentDate: AwalDate, addedDays: number) {
        let numberOfDays = Helper.getDayNumbersOfAwalMonth(currentDate.awalMonth.year, currentDate.awalMonth.month);
        let newDays = currentDate.date + addedDays;
        let result: AwalDate = {
            date: 1,
            awalMonth: {
                month: AwalMonthEnum.Jamadilakhir,
                year: { ikasSarak: IkasSarakEnum.Liéh }
            }
        };

        if (newDays > numberOfDays) {
            const nextMonth = Helper.addAwalMonths(currentDate.awalMonth, 1);
            result = {
                date: newDays - numberOfDays,
                awalMonth: nextMonth
            };

        } else if (newDays <= 0) {
            const previousMonth = Helper.addAwalMonths(currentDate.awalMonth, -1);
            result = {
                date: Helper.getDayNumbersOfAwalMonth(previousMonth.year, previousMonth.month) + newDays,
                awalMonth: previousMonth
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

    static addAwalMonths(currentMonth: AwalMonth, addedMonths: number) {
        let newMonth = currentMonth.month + addedMonths;
        let quotient = Math.floor(newMonth / 12);
        let remain = Helper.getMod(newMonth, 12);

        let result: AwalMonth = {
            month: remain,
            year: Helper.addAwalYears(currentMonth.year, quotient)
        }

        return result;
    }

    static addAwalYears(currentYear: AwalYear, addedYears: number) {
        let newIkasSarak = currentYear.ikasSarak + addedYears;
        let remain = Helper.getMod(newIkasSarak, 8);
        let newYearNumber = (currentYear.yearNumber ?? 0) + addedYears;

        let result: AwalYear = {
            ikasSarak: remain,
            yearNumber: newYearNumber
        }

        return result;
    }

    static getDayNumbersOfAwalMonth(year: AwalYear, month: AwalMonthEnum) {
        let numberOfDay = 0;

        if (month === AwalMonthEnum.Muharam || month === AwalMonthEnum.Rabiulawal || month === AwalMonthEnum.Jamadilawal ||
            month === AwalMonthEnum.Rejab || month === AwalMonthEnum.Ramadan || month === AwalMonthEnum.Julkaejah) {
            // Tháng lẻ: (30 ngày), gồm: 1,3,5,7,9,11.
            numberOfDay = 30;
        } else if (month === AwalMonthEnum.Syafar || month === AwalMonthEnum.Rabiulakhir || month === AwalMonthEnum.Jamadilakhir ||
            month === AwalMonthEnum.Sykban || month === AwalMonthEnum.Syawal) {
            // Tháng chẳn: (29 ngày), gồm: 2,4,6,8,10. 
            numberOfDay = 29;
        } else {
            // Riêng tháng 12: 
            if (year.ikasSarak === IkasSarakEnum.Hak || year.ikasSarak === IkasSarakEnum.Dal || year.ikasSarak === IkasSarakEnum.JimLuic) {
                // năm nhuận (thun "Nâh": Hak, Dal, Jim luic): 30 ngày
                numberOfDay = 30;
            } else {
                // năm thường (thun "Wak"): 29 ngày
                numberOfDay = 29;
            }
        }

        return numberOfDay;
    }

    static getStartDayByAwalMonth(year: AwalYear, month: AwalMonthEnum) {
        let yearName = IkasSarakEnum[year.ikasSarak];
        let yearItem = sakawiTakaiCiimConfig.filter(x => x.ArabYear === yearName)[0];
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
        let differenceInTime = date.getTime() - firstDateOfSakawiAwal_Lieh_1407.getTime();
        let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        let remain = Helper.getMod(differenceInDays, totalDaysOf8AwalYearCycle);
        let quotient = Math.floor(Math.abs(differenceInDays) / totalDaysOf8AwalYearCycle);

        let awalYearNumber = yearNumberOfSakawiAwal_Lieh_1407;
        let awalYear = IkasSarakEnum.Liéh;
        let awalMonth = AwalMonthEnum.Muharam;
        let awalDate = 0;
        let totalYears = 0;
        for (let i = 0; i < awalYearArray.length; i++) {
            totalYears += awalYearArray[i].numberOfDays;
            if (remain < totalYears) {
                awalYear = awalYearArray[i].name;

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
            awalMonth: { month: awalMonth, year: { ikasSarak: awalYear, yearNumber: awalYearNumber } }
        }

        return resultDate;
    }
    //#endregion

    //#region Ahier
    static addAhierDays(maxtrixCalendar: MatrixCalendarType[], currentDate: AhierDate, addedDays: number) {
        const numberOfDays = Helper.getActualDayNumbersOfAhierMonth(maxtrixCalendar, currentDate.ahierMonth);
        const newDays = currentDate.date + addedDays;

        let result: AhierDate = {
            date: 1,
            ahierMonth: {
                month: AhierMonthEnum.BilanSa,
                year: { nasak: NasakEnum.Takuh, ikasSarak: IkasSarakEnum.Liéh }
            }
        };

        if (newDays > numberOfDays) {
            const nextMonth = Helper.addAhierMonths(currentDate.ahierMonth, 1);
            result = {
                date: newDays - numberOfDays,
                ahierMonth: nextMonth
            };
        } else if (newDays <= 0) {
            const previousMonth = Helper.addAhierMonths(currentDate.ahierMonth, -1);
            const dayNumberOfPreviousMonth = Helper.getActualDayNumbersOfAhierMonth(maxtrixCalendar, previousMonth);
            result = {
                date: dayNumberOfPreviousMonth + newDays,
                ahierMonth: previousMonth
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

    static addAhierMonths(currentMonth: AhierMonth, addedMonths: number) {
        const numberOfMonths = Helper.getMonthNumbersOfAhierYear(currentMonth.year);
        const newMonth = currentMonth.month + addedMonths;
        let result: AhierMonth = {
            month: currentMonth.month,
            year: currentMonth.year
        }

        if (newMonth > numberOfMonths - 1) {
            const nextYear = Helper.addAhierYears(currentMonth.year, 1);
            result = {
                month: newMonth - numberOfMonths,
                year: nextYear
            }
        } else if (newMonth < 0) {
            const previousYear = Helper.addAhierYears(currentMonth.year, -1);
            const numberOfMonthsOfPreviousYear = Helper.getMonthNumbersOfAhierYear(previousYear);

            result = {
                month: numberOfMonthsOfPreviousYear + newMonth,
                year: previousYear
            }
        } else {
            result = {
                month: newMonth,
                year: currentMonth.year
            }
        }

        return result;
    }

    static addAhierYears(currentYear: AhierYear, addedYears: number) {
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

    static getExpectedDayNumbersOfAhierMonth(year: AhierYear, month: AhierMonthEnum) {
        let numberOfDay = 0;
        if (month === AhierMonthEnum.BilanSa || month === AhierMonthEnum.BilanKlau || month === AhierMonthEnum.BilanLima ||
            month === AhierMonthEnum.BilanTajuh || month === AhierMonthEnum.BilanSalipan || month === AhierMonthEnum.BilanPuis) {
            // Tháng lẻ - "bilan tapak": (30 ngày), gồm: 1,3,5,7,9,11.
            numberOfDay = 30;
        } else if (month === AhierMonthEnum.BilanDua || month === AhierMonthEnum.BilanPak || month === AhierMonthEnum.BilanNem ||
            month === AhierMonthEnum.BilanDalipan || month === AhierMonthEnum.BilanSapluh) {
            // Tháng chẳn - "bilan u" : (29 ngày), gồm: 2,4,6,8,10. 
            numberOfDay = 29;
        } else if (month === AhierMonthEnum.BilanMak) {
            // Tháng 12:  
            if (year.ikasSarak === IkasSarakEnum.Hak || year.ikasSarak === IkasSarakEnum.Dal || year.ikasSarak === IkasSarakEnum.JimLuic) {
                // năm nhuận (thun "Nâh": Hak, Dal, Jim luic): 30 ngày
                numberOfDay = 30;
            } else {
                // năm thường (thun "Wak"): 29 ngày
                numberOfDay = 29;
            }
        } else if (month === AhierMonthEnum.BilanBhang) {
            if (year.ikasSarak === IkasSarakEnum.Hak || year.ikasSarak === IkasSarakEnum.Dal || year.ikasSarak === IkasSarakEnum.JimLuic) {
                // năm nhuận (thun "Nâh": Hak, Dal, Jim luic): 29 ngày
                numberOfDay = 29;
            }
        }

        return numberOfDay;
    }

    static getActualDayNumbersOfAhierMonth(maxtrixCalendar: MatrixCalendarType[], ahierMonth: AhierMonth) {
        const index = maxtrixCalendar.findIndex(x => JSON.stringify(x.ahierMonth) === JSON.stringify(ahierMonth));
        if (index !== -1) {
            return maxtrixCalendar[index].dayNumbersOfAhierMonth;
        } else {
            return 0;
        }
    }

    static getMonthNumbersOfAhierYear(year: AhierYear) {
        if (year.ikasSarak === IkasSarakEnum.Hak
            || year.ikasSarak === IkasSarakEnum.Dal
            || year.ikasSarak === IkasSarakEnum.JimLuic) {
            return 13;
        }
        return 12;
    }
    //#endregion

    //#region Gregory
    static addGregoryDays(date: Date, numberOfDays: number) {
        let newDt = new Date(date);
        newDt.setDate(newDt.getDate() + numberOfDays);
        return newDt;
    }
    //#endregion

    static buildMatrixCalendar(toYearAhier: number, areaType: AreaType) {
        let matrixCalendar: MatrixCalendarType[] = [];
        let fullCalendar: FullCalendarType[] = [];

        // Choose thun 1988 as a root
        const startAhierYear: AhierYear = {
            nasak: NasakEnum.InâGirai,
            ikasSarak: IkasSarakEnum.Liéh,
            yearNumber: 1988
        }

        // TO-TEST
        // const startAhierYear: AhierYear = {
        //     nasak: NasakEnum.Rimaong,
        //     ikasSarak: IkasSarakEnum.Jim,
        //     yearNumber: 2022
        // }

        const numberOfAhierYear = toYearAhier - (startAhierYear.yearNumber ?? 0);
        let newGregoryDate = firstDateOfSakawiAhier_InaGirai_Lieh_1988;
        //let newGregoryDate = new Date(2022, 3, 30);//16/04/1988

        for (let y = 0; y < numberOfAhierYear; y++) {
            const ahierYear = Helper.addAhierYears(startAhierYear, y);
            const matrixPerYear = Helper.renderMatrixPerYear(ahierYear, newGregoryDate);
            const validMatrix = Helper.applyGuenGuecRules(matrixPerYear, areaType);
            matrixCalendar.push(...validMatrix);

            const calendarDetails = Helper.renderCalendarDetails(validMatrix);
            fullCalendar.push(...calendarDetails);

            const lastMonthItem = validMatrix[validMatrix.length - 1];
            newGregoryDate = Helper.addGregoryDays(lastMonthItem.dateOfGregoryCalendar, lastMonthItem.dayNumbersOfAhierMonth);
        }

        return {
            matrixCalendar,
            fullCalendar
        };
    }

    static renderMatrixPerYear(ahierYear: AhierYear, firstGregoryDate: Date) {
        let matrixPerYear: MatrixCalendarType[] = [];
        let newGregoryDate = firstGregoryDate;
        let addedGregoryDays = 0;
        const numberOfAhierMonth = Helper.getMonthNumbersOfAhierYear(ahierYear);

        for (let m = 0; m < numberOfAhierMonth; m++) {
            const ahierMonth: AhierMonth = { month: m, year: ahierYear };
            const dayNumbersOfAhierMonth = Helper.getExpectedDayNumbersOfAhierMonth(ahierYear, m);
            const firstDayOfAhierMonth = newGregoryDate.getDay();

            const awalDate = Helper.getAwalDateByGregoryDate(newGregoryDate);
            const awalMonth = Helper.addAwalMonths(awalDate.awalMonth, 1);
            const dayNumbersOfAwalMonth = Helper.getDayNumbersOfAwalMonth(awalMonth.year, awalMonth.month);
            const firstDayOfAwalMonth = Number.parseInt(Helper.getStartDayByAwalMonth(awalMonth.year, awalMonth.month)) - 1; // Sunday is 0 

            let ahierMonthItem: MatrixCalendarType = {
                ahierMonth: ahierMonth,
                dayNumbersOfAhierMonth: dayNumbersOfAhierMonth,
                hasGuen: false,
                typeOfGuen: GuenTypeEnum.None,
                hasGuec: false,
                typeOfGuec: GuecTypeEnum.None,
                firstDayOfAhierMonth: firstDayOfAhierMonth,
                dateOfGregoryCalendar: newGregoryDate,
                awalMonth: awalMonth,
                dayNumbersOfAwalMonth: dayNumbersOfAwalMonth,
                firstDayOfAwalMonth: firstDayOfAwalMonth
            }

            matrixPerYear.push(ahierMonthItem);

            addedGregoryDays += dayNumbersOfAhierMonth;
            newGregoryDate = Helper.addGregoryDays(firstGregoryDate, addedGregoryDays);
        }

        return matrixPerYear;
    }

    static applyGuenGuecRules(matrixPerYear: MatrixCalendarType[], areaType: AreaType) {
        let monthGuen = -1;
        let monthGuec = -1;
        let guecTypeInNextYear = GuecTypeEnum.None;
        let hasGuenRuleInNextYear = false;

        // Check validations and fix in current year
        for (let index = 0; index < matrixPerYear.length; index++) {
            const element = matrixPerYear[index];

            // Guen
            if (monthGuen === -1 && Helper.checkIsGuenToAddDay(element.firstDayOfAhierMonth, element.firstDayOfAwalMonth)) {
                if (areaType === 'BinhThuan' || (areaType === 'NinhThuan' && index >= 11)) {
                    monthGuen = index;
                    matrixPerYear[monthGuen - 1].dayNumbersOfAhierMonth += 1;
                    matrixPerYear[monthGuen - 1].hasGuen = true;
                    matrixPerYear[monthGuen - 1].typeOfGuen = GuenTypeEnum.GuenByNormalRule;
                }
            }

            if (monthGuen !== -1 && index >= monthGuen) {
                const newDate = Helper.addGregoryDays(matrixPerYear[index].dateOfGregoryCalendar, 1);
                matrixPerYear[index].dateOfGregoryCalendar = newDate;
                matrixPerYear[index].firstDayOfAhierMonth = newDate.getDay();
            }

            // Guec
            if (monthGuec === -1 && Helper.checkIsGuecToMinusDay(element.firstDayOfAhierMonth, element.firstDayOfAwalMonth)) {
                monthGuec = index;
                matrixPerYear[monthGuec - 1].dayNumbersOfAhierMonth -= 1;
                matrixPerYear[monthGuec - 1].hasGuec = true;
                matrixPerYear[monthGuec - 1].typeOfGuec = GuecTypeEnum.GuecByNormalRule;
            }

            if (monthGuec !== -1 && index >= monthGuec) {
                const newDate = Helper.addGregoryDays(matrixPerYear[index].dateOfGregoryCalendar, -1);
                matrixPerYear[index].dateOfGregoryCalendar = newDate;
                matrixPerYear[index].firstDayOfAhierMonth = newDate.getDay();
            }
        }

        // Check validations in next year to fix current year
        const lastMonthOfCurrentYear = matrixPerYear[matrixPerYear.length - 1];
        const firstGregoryDateOfNextYear = Helper.addGregoryDays(lastMonthOfCurrentYear.dateOfGregoryCalendar, lastMonthOfCurrentYear.dayNumbersOfAhierMonth);
        guecTypeInNextYear = Helper.checkHasGuecRuleInNextYear(lastMonthOfCurrentYear.ahierMonth.year, firstGregoryDateOfNextYear);
        hasGuenRuleInNextYear = Helper.checkHasGuenRuleInNextYear(lastMonthOfCurrentYear.ahierMonth.year, firstGregoryDateOfNextYear);

        if (guecTypeInNextYear !== GuecTypeEnum.None) {
            // Bilan Mak (12)
            matrixPerYear[11].dayNumbersOfAhierMonth -= 1;
            matrixPerYear[11].hasGuec = true;
            matrixPerYear[11].typeOfGuec = guecTypeInNextYear;

            // Bilan Bhang (13)
            const newDate = Helper.addGregoryDays(matrixPerYear[12].dateOfGregoryCalendar, -1);
            matrixPerYear[12].dateOfGregoryCalendar = newDate;
            matrixPerYear[12].firstDayOfAhierMonth = newDate.getDay();
        } else if (hasGuenRuleInNextYear) {
            // Bilan (12) or (13)
            if (Helper.getAhierAwalDaysGap(lastMonthOfCurrentYear.firstDayOfAhierMonth, lastMonthOfCurrentYear.firstDayOfAwalMonth) === 2) {
                lastMonthOfCurrentYear.dayNumbersOfAhierMonth += 1;
                lastMonthOfCurrentYear.hasGuen = true;
                lastMonthOfCurrentYear.typeOfGuen = GuenTypeEnum.GuenByNormalRule;
            }
        }

        return [...matrixPerYear];
    }

    static renderCalendarDetails(matrixPerYear: MatrixCalendarType[]) {
        let fullCalendar: FullCalendarType[] = [];

        for (let index = 0; index < matrixPerYear.length; index++) {
            const element = matrixPerYear[index];
            const firstDateOfAhierMonth: AhierDate = { date: 1, ahierMonth: element.ahierMonth };
            const firstDateOfAwalMonth: AwalDate = { date: 1, awalMonth: element.awalMonth };
            const firstDateOfGregoryMonth = element.dateOfGregoryCalendar;
            const daysGap = Helper.getAhierAwalDaysGap(element.firstDayOfAhierMonth, element.firstDayOfAwalMonth);

            for (let days = 0; days < element.dayNumbersOfAhierMonth; days++) {
                const addedAhierDate = Helper.addAhierDays(matrixPerYear, firstDateOfAhierMonth, days);
                const dateAhier: AhierDate = {
                    date: addedAhierDate.date,
                    ahierMonth: addedAhierDate.ahierMonth
                }

                const addedAwalDate = Helper.addAwalDays(firstDateOfAwalMonth, days - daysGap);
                const dateAwal: AwalDate = {
                    date: addedAwalDate.date,
                    awalMonth: addedAwalDate.awalMonth
                }

                const dateGregory = Helper.addGregoryDays(firstDateOfGregoryMonth, days);

                let monthDetailsCalendar: FullCalendarType = {
                    dateAhier: dateAhier,
                    dateAwal: dateAwal,
                    dateGregory: dateGregory,
                    typeOfGuen: days === element.dayNumbersOfAhierMonth - 1 ? element.typeOfGuen : undefined,
                    typeOfGuec: days === element.dayNumbersOfAhierMonth - 1 ? element.typeOfGuec : undefined,
                    hasGuen: days === element.dayNumbersOfAhierMonth - 1 ? element.hasGuen : undefined,
                    hasGuec: days === element.dayNumbersOfAhierMonth - 1 ? element.hasGuec : undefined
                }

                fullCalendar.push(monthDetailsCalendar);
            }
        }

        return fullCalendar;
    }

    static checkIsGuenToAddDay(firstDayOfAhierMonth: number, firstDayOfAwalMonth: number) {
        const daysGap = Helper.getAhierAwalDaysGap(firstDayOfAhierMonth, firstDayOfAwalMonth);
        return daysGap > 2;
    }

    static checkIsGuecToMinusDay(firstDayOfAhierMonth: number, firstDayOfAwalMonth: number) {
        return firstDayOfAhierMonth === firstDayOfAwalMonth;
    }

    static checkHasGuecRuleInNextYear(currentYear: AhierYear, firstGregoryDateNextYear: Date) {
        let result = GuecTypeEnum.None;

        const nextAhierYear = Helper.addAhierYears(currentYear, 1);
        const matrixNextYear = Helper.renderMatrixPerYear(nextAhierYear, firstGregoryDateNextYear);
        const firstMonth = matrixNextYear[0];
        const isKateRamawanConflict = matrixNextYear.some(x =>
            x.ahierMonth.month === AhierMonthEnum.BilanTajuh &&
            x.awalMonth.month === AwalMonthEnum.Ramadan &&
            Helper.getAhierAwalDaysGap(x.firstDayOfAhierMonth, x.firstDayOfAwalMonth) === 1);
        const hasNormalGuec = matrixNextYear.some(item => Helper.checkIsGuecToMinusDay(item.firstDayOfAhierMonth, item.firstDayOfAwalMonth));

        if (hasNormalGuec) {
            result = GuecTypeEnum.GuecByNormalRule;
        } else if (nextAhierYear.ikasSarak === IkasSarakEnum.Liéh) {
            if (firstMonth.firstDayOfAhierMonth === 4 && firstMonth.firstDayOfAwalMonth === 5) {
                result = GuecTypeEnum.GuecByHareiButSukRule;
            } else if (isKateRamawanConflict) {
                result = GuecTypeEnum.GuecByKateRamawanRule;
            }
        } else if (firstMonth.firstDayOfAhierMonth === 5 && firstMonth.firstDayOfAwalMonth === 6) {
            result = GuecTypeEnum.GuecByRijaNagarRule;
        }

        return result;
    }

    static checkHasGuenRuleInNextYear(currentYear: AhierYear, firstGregoryDateNextYear: Date) {
        const nextAhierYear = Helper.addAhierYears(currentYear, 1);
        const matrixNextYear = Helper.renderMatrixPerYear(nextAhierYear, firstGregoryDateNextYear);

        return matrixNextYear.some(item => Helper.checkIsGuenToAddDay(item.firstDayOfAhierMonth, item.firstDayOfAwalMonth));
    }

    static getMod(n: number, m: number) {
        const remain = n % m;
        return Math.floor(remain >= 0 ? remain : remain + m);
    };

    static getAhierAwalDaysGap(firstDayOfAhierMonth: number, firstDayOfAwalMonth: number) {
        let daysGap = 0;

        if (firstDayOfAhierMonth < firstDayOfAwalMonth) {
            daysGap = firstDayOfAwalMonth - firstDayOfAhierMonth;
        } else if (firstDayOfAhierMonth > firstDayOfAwalMonth) {
            daysGap = firstDayOfAwalMonth + (6 - firstDayOfAhierMonth) + 1; // Sunday is 0
        }

        return daysGap;
    }

    static convertToChamDigitUnicode(latinNumber: number) {
        const ChamDigitArr = ['꩐', '꩑', '꩒', '꩓', '꩔', '꩕', '꩖', '꩗', '꩘', '꩙'];
        const EnglishDigits = '0123456789';
        const reg = new RegExp('[' + EnglishDigits + ']', 'g');

        return latinNumber.toString().replace(reg, function (c) {
            return ChamDigitArr[EnglishDigits.indexOf(c)]
        });
    }

    static getNextEvents(fullCalendar: FullCalendarType[]) {
        let result: CountDownBarProps[] = [];
        let addedAkaokThun = false;
        let addedRijaNagar = false;
        //let addedKateHamuTanran = false;
        let addedKate = false;
        let addedRamawan = false;
        // let addedMukTrun = false;
        // let addedOngTrun = false;
        // let addedTalaihRamawan = false;
        // let addedIkakWaha = false;
        // let addedTalaihWaha = false;
        // let addedYuerYang = false;

        fullCalendar.forEach(function (item, index) {
            if (item.dateGregory < new Date()) {
                return;
            }

            let eventGregoryDate = item.dateGregory;

            if (!addedAkaokThun && item.dateAhier.ahierMonth.month === 0 && item.dateAhier.date === 1) {
                result.push({ eventType: 'Akaok thun', eventDate: eventGregoryDate });
                addedAkaokThun = true;
            }

            if (!addedRijaNagar && item.dateAhier.ahierMonth.month === 0 && eventGregoryDate.getDay() === 4) {
                if (item.dateAwal.awalMonth.month !== AwalMonthEnum.Ramadan) {
                    if (item.dateAhier.date < 7 || (item.dateAhier.date > 14 && item.dateAhier.date < 20)) {
                        result.push({ eventType: 'Rija Nagar', eventDate: eventGregoryDate });
                        addedRijaNagar = true;
                    }
                }
            }

            /*if (!addedKateHamuTanran && item.dateAhier.ahierMonth.month === 5 && item.dateAhier.date === 29) {
                result.push({ eventType: 'Katé palei Hamu Tanran', eventDate: eventGregoryDate });
                addedKateHamuTanran = true;
            }*/

            if (!addedKate && item.dateAhier.ahierMonth.month === 6 && item.dateAhier.date === 1) {
                result.push({ eventType: 'Katé angaok bimong', eventDate: eventGregoryDate });
                addedKate = true;
            }

            /*if (item.dayNumbersOfCurrentAhierMonth === 30) {
                if (item.dateAhier.ahierMonth.month === 8 && item.dateAhier.date === 16) {
                    result.push('Ca-mbur');
                }
            } else {
                if (item.dateAhier.ahierMonth.month === 8 && item.dateAhier.date === 15) {
                    result.push('Ca-mbur');
                }
            }*/

            if (!addedRamawan && item.dateAwal.awalMonth.month === 8 && item.dateAwal.date === 1) {
                result.push({ eventType: 'Tamâ ricaow Ramâwan', eventDate: eventGregoryDate });
                addedRamawan = true;
            }

            /*if (!addedMukTrun && item.dateAwal.awalMonth.month === 8 && item.dateAwal.date === 16) {
                result.push({ eventType: 'Muk trun', eventDate: eventGregoryDate });
                addedMukTrun = true;
            }

            if (!addedOngTrun && item.dateAwal.awalMonth.month === 8 && item.dateAwal.date === 21) {
                result.push({ eventType: 'Ong trun', eventDate: eventGregoryDate });
                addedOngTrun = true;
            }

            if (!addedTalaihRamawan && item.dateAwal.awalMonth.month === 9 && item.dateAwal.date === 2) {
                result.push({ eventType: 'Talaih aek Ramâwan', eventDate: eventGregoryDate });
                addedTalaihRamawan = true;
            }

            if (!addedIkakWaha && item.dateAwal.awalMonth.month === 11 && item.dateAwal.date === 1) {
                result.push({ eventType: 'Ikak Waha', eventDate: eventGregoryDate });
                addedIkakWaha = true;
            }

            if (!addedTalaihWaha && item.dateAwal.awalMonth.month === 11 && item.dateAwal.date === 11) {
                result.push({ eventType: 'Talaih Waha', eventDate: eventGregoryDate });
                addedTalaihWaha = true;
            }

            if (!addedYuerYang && item.dateAhier.ahierMonth.month === 3 && eventGregoryDate.getDay() === 0 && item.dateAhier.date < 7) {
                result.push({ eventType: 'Yuer Yang', eventDate: eventGregoryDate });
                addedYuerYang = true;
            }*/

            // Break loop: just look up in a year later (30 days x 13 months)
            if (eventGregoryDate > Helper.addGregoryDays(new Date(), 390)) {
                return;
            }
        });

        return result;
    }

    static getEventsInAhierYear(maxtrixCalendar: MatrixCalendarType[], fullCalendar: FullCalendarType[]) {
        let result: CountDownBarProps[] = [];

        fullCalendar.forEach(function (item, index) {
            let eventGregoryDate = item.dateGregory;

            if (item.dateAhier.ahierMonth.month === 0 && item.dateAhier.date === 1) {
                result.push({ eventType: 'Akaok thun', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
            }

            if (item.dateAhier.ahierMonth.month === 0 && eventGregoryDate.getDay() === 4) {
                if (item.dateAwal.awalMonth.month !== AwalMonthEnum.Ramadan) {
                    if (item.dateAhier.date < 7 || (item.dateAhier.date > 14 && item.dateAhier.date < 20)) {
                        result.push({ eventType: 'Rija Nagar', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
                    }
                }
            }

            if (item.dateAhier.ahierMonth.month === 5 && item.dateAhier.date === 29) {
                result.push({ eventType: 'Katé palei Hamu Tanran', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
            }

            if (item.dateAhier.ahierMonth.month === 6 && item.dateAhier.date === 1) {
                result.push({ eventType: 'Katé angaok bimong', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
            }

            const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(maxtrixCalendar, item.dateAhier.ahierMonth);
            if (dayNumbersOfCurrentAhierMonth === 30) {
                if (item.dateAhier.ahierMonth.month === 8 && item.dateAhier.date === 16) {
                    result.push({ eventType: 'Ca-mbur', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
                }
            } else {
                if (item.dateAhier.ahierMonth.month === 8 && item.dateAhier.date === 15) {
                    result.push({ eventType: 'Ca-mbur', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
                }
            }

            if (item.dateAwal.awalMonth.month === 8 && item.dateAwal.date === 1) {
                result.push({ eventType: 'Tamâ ricaow Ramâwan', sakawiType: 'sakawiAwal', eventDate: eventGregoryDate });
            }

            if (item.dateAwal.awalMonth.month === 8 && item.dateAwal.date === 16) {
                result.push({ eventType: 'Muk trun', sakawiType: 'sakawiAwal', eventDate: eventGregoryDate });
            }

            if (item.dateAwal.awalMonth.month === 8 && item.dateAwal.date === 21) {
                result.push({ eventType: 'Ong trun', sakawiType: 'sakawiAwal', eventDate: eventGregoryDate });
            }

            if (item.dateAwal.awalMonth.month === 9 && item.dateAwal.date === 2) {
                result.push({ eventType: 'Talaih aek Ramâwan', sakawiType: 'sakawiAwal', eventDate: eventGregoryDate });
            }

            if (item.dateAwal.awalMonth.month === 11 && item.dateAwal.date === 1) {
                result.push({ eventType: 'Ikak Waha', sakawiType: 'sakawiAwal', eventDate: eventGregoryDate });
            }

            if (item.dateAwal.awalMonth.month === 11 && item.dateAwal.date === 11) {
                result.push({ eventType: 'Talaih Waha', sakawiType: 'sakawiAwal', eventDate: eventGregoryDate });
            }

            if (item.dateAhier.ahierMonth.month === 3 && eventGregoryDate.getDay() === 0 && item.dateAhier.date < 7) {
                result.push({ eventType: 'Yuer Yang', sakawiType: 'sakawiAhier', eventDate: eventGregoryDate });
            }
        });

        return result;
    }

    static displayDateString(date: Date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        const ddStr = dd < 10 ? '0' + dd : dd;
        const mmStr = mm < 10 ? '0' + mm : mm;
        return ddStr + '/' + mmStr + '/' + yyyy;
    }
}