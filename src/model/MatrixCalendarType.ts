import { AhierMonthEnum, AwalMonthEnum } from "../enums/enum";
import { AhierYear } from "./AhierDate";
import { AwalYear } from "./AwalDate";

export interface MatrixCalendarType {
    ahierYear: AhierYear;
    ahierMonth: AhierMonthEnum;
    dayNumbersOfAhierMonth: number;
    firstDayOfAhierMonth: number;
    dateOfGregoryCalendar: Date;
    awalYear: AwalYear;
    awalMonth: AwalMonthEnum;
    dayNumbersOfAwalMonth: number;
    firstDayOfAwalMonth: number;
}