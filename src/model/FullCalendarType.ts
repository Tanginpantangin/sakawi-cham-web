import { GuecTypeEnum, GuenTypeEnum } from "../enums/enum";
import { AhierDate } from "./AhierDate";
import { AwalDate } from "./AwalDate";

export interface FullCalendarType {
    dateGregory: Date;
    dateAwal: AwalDate;
    dateAhier: AhierDate;
    hasGuen?: boolean;
    typeOfGuen?: GuenTypeEnum;
    hasGuec?: boolean;
    typeOfGuec?: GuecTypeEnum;
}