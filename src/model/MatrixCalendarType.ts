import { AhierMonthEnum } from "../enums/enum";
import { AhierYear } from "./AhierDate";
import { AwalMonth } from "./AwalDate";

export interface MatrixCalendarType {
    ahierYear: AhierYear;
    ahierMonth: AhierMonthEnum;
    dayNumbersOfAhierMonth: number;
    firstDayOfAhierMonth: number;
    dateOfGregoryCalendar: Date;
    //awalYear: AwalYear;
    awalMonth: AwalMonth;
    dayNumbersOfAwalMonth: number;
    firstDayOfAwalMonth: number;
}