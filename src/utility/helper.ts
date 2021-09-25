import dataConfig from '../data/SakawiTakaiCiim.json';
import { AhierMonthEnum, AwalMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth, AhierYear } from "../model/AhierDate";
import { AwalDate, AwalMonth, AwalYear } from '../model/AwalDate';
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { awalMonthArray, awalYearArray, firstDateOfSakawiAhier_Pabuei_JimLuic_2019, firstDateOfSakawiAwal_Lieh_1439, totalDaysOf8AwalYearCycle, yearNumberOfSakawiAwal_Lieh_1439 } from './constant';

export default class Helper {
    //#region Awal
    static addAwalDays(currentDate: AwalDate, addedDays: number) {
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
            awalMonth: { month: awalMonth, year: { ikasSarak: awalYear, yearNumber: awalYearNumber } }
        }

        return resultDate;
    }    
    //#endregion

    //#region Ahier
    //TODO
    static addAhierDays(currentDate: AhierDate, addedDays: number) {
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
                let previousYear = Helper.addAhierYears(currentDate.ahierMonth.year, -1);
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

    static addAhierMonths(currentMonth: AhierMonth, addedMonths: number) {
        let numberOfMonths = Helper.getMonthNumbersOfAhierYear(currentMonth.year);
        let newMonth = currentMonth.month + addedMonths;
        let quotient = Math.floor(newMonth / numberOfMonths);
        let remain = Helper.getMod(newMonth, numberOfMonths);

        let result: AhierMonth = {
            month: remain,
            year: Helper.addAhierYears(currentMonth.year, quotient)
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

    static getDayNumbersOfAhierMonth(year: AhierYear, month: AhierMonthEnum) {
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
        newDt.setDate(date.getDate() + numberOfDays);
        return newDt;
    }
    //#endregion

    static buildMatrixCalendar(toYearAhier: number) {
        let result: MatrixCalendarType[] = [];

        const startAhierYear: AhierYear = {
            nasak: NasakEnum.Pabuei,
            ikasSarak: IkasSarakEnum.JimLuic,
            yearNumber: 2019
        }

        const numberOfAhierYear = toYearAhier - (startAhierYear.yearNumber ?? 0);
        let newGregoryDate = firstDateOfSakawiAhier_Pabuei_JimLuic_2019;

        for (let y = 0; y < numberOfAhierYear; y++) {
            const ahierYear = Helper.addAhierYears(startAhierYear, y);
            const numberOfAhierMonth = Helper.getMonthNumbersOfAhierYear(ahierYear);
            let addedGregoryDays = 0;

            for (let m = 0; m < numberOfAhierMonth; m++) {
                const ahierMonth: AhierMonth = { month: m, year: ahierYear };
                const dayNumbersOfAhierMonth = Helper.getDayNumbersOfAhierMonth(ahierYear, m);
                const firstDayOfAhierMonth = newGregoryDate.getDay();

                const awalDate = Helper.getAwalDateByGregoryDate(newGregoryDate);
                const awalMonth = Helper.addAwalMonths(awalDate.awalMonth, 1);
                const dayNumbersOfAwalMonth = Helper.getDayNumbersOfAwalMonth(awalMonth.year, awalMonth.month);
                const firstDayOfAwalMonth = Number.parseInt(Helper.getStartDayByAwalMonth(awalMonth.year, awalMonth.month)) - 1; // Sunday is 0 

                let ahierMonthItem: MatrixCalendarType = {
                    ahierMonth: ahierMonth,
                    dayNumbersOfAhierMonth: dayNumbersOfAhierMonth,
                    firstDayOfAhierMonth: firstDayOfAhierMonth,
                    dateOfGregoryCalendar: newGregoryDate,
                    awalMonth: awalMonth,
                    dayNumbersOfAwalMonth: dayNumbersOfAwalMonth,
                    firstDayOfAwalMonth: firstDayOfAwalMonth
                }

                result.push(ahierMonthItem);

                addedGregoryDays += dayNumbersOfAhierMonth;
                newGregoryDate = Helper.addGregoryDays(firstDateOfSakawiAhier_Pabuei_JimLuic_2019, addedGregoryDays);
            }
        }

        return result;
    }

    static getMod(n: number, m: number) {
        const remain = n % m;
        return Math.floor(remain >= 0 ? remain : remain + m);
    };
}