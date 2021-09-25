import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";

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