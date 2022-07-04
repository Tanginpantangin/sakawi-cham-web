import { GuecTypeEnum, GuenTypeEnum } from "../enums/enum";
import { AhierMonth } from "./AhierDate";
import { AwalMonth } from "./AwalDate";

export interface MatrixCalendarType {
    ahierMonth: AhierMonth;
    dayNumbersOfAhierMonth: number;
    firstDayOfAhierMonth: number;
    hasGuen?: boolean;
    typeOfGuen: GuenTypeEnum;
    hasGuec?: boolean;
    typeOfGuec: GuecTypeEnum;
    dateOfGregoryCalendar: Date;
    awalMonth: AwalMonth;
    dayNumbersOfAwalMonth: number;
    firstDayOfAwalMonth: number;
}