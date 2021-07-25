import { ArabMonth, IkasSarak } from "../enums/enum";

export interface ArabDate {
    date: number;
    month: ArabMonth;
    year: IkasSarak;
}