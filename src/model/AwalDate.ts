import { AwalMonth, IkasSarak } from "../enums/enum";

export interface AwalDate {
    date: number;
    month: AwalMonth;
    year: IkasSarak;
    yearNumber?: number;
}