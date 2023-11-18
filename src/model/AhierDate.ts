import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";

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
    yearNumber: number;
}