import { AhierMonth } from "./AhierDate";
import { AwalMonth } from "./AwalDate";

export interface MatrixCalendarType {
    ahierMonth: AhierMonth;
    dayNumbersOfAhierMonth: number;
    firstDayOfAhierMonth: number;
    dateOfGregoryCalendar: Date;
    awalMonth: AwalMonth;
    dayNumbersOfAwalMonth: number;
    firstDayOfAwalMonth: number;
}