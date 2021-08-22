import { AhierMonth, IkasSarak, Nasak } from "../enums/enum";

export interface AhierYear {
    nasak: Nasak;
    ikasSarak: IkasSarak;
}

export interface AhierDate {
    date: number;
    month: AhierMonth;
    year: AhierYear;
    yearNumber?: number;
}