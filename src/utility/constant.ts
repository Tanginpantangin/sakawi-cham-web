import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";

export const firstDateOfSakawiAwal_Lieh_1439 = new Date(2017, 8, 22);//22/09/2017
export const yearNumberOfSakawiAwal_Lieh_1439 = 1439;
export const firstDateOfSakawiAwal_Hak_1440 = new Date(2018, 8, 11);
export const firstDateOfSakawiAhier_Pabuei_JimLuic_2019 = new Date(2019, 3, 4);//04/04/2019
export const totalDaysOf8AwalYearCycle = 2835;

export const awalYearArray: { no: number; name: IkasSarakEnum; numberOfDays: number }[] = [
    { no: 1, name: IkasSarakEnum.Liéh, numberOfDays: 354 },
    { no: 2, name: IkasSarakEnum.Hak, numberOfDays: 355 },
    { no: 3, name: IkasSarakEnum.Jim, numberOfDays: 354 },
    { no: 4, name: IkasSarakEnum.Jây, numberOfDays: 354 },
    { no: 5, name: IkasSarakEnum.Dal, numberOfDays: 355 },
    { no: 6, name: IkasSarakEnum.Bak, numberOfDays: 354 },
    { no: 7, name: IkasSarakEnum.Waw, numberOfDays: 354 },
    { no: 8, name: IkasSarakEnum.JimLuic, numberOfDays: 355 }
];

export const awalMonthArray: { no: number; name: AwalMonthEnum; numberOfDays: number }[] = [
    { no: 1, name: AwalMonthEnum.Muharam, numberOfDays: 30 },
    { no: 2, name: AwalMonthEnum.Syafar, numberOfDays: 29 },
    { no: 3, name: AwalMonthEnum.Rabiulawal, numberOfDays: 30 },
    { no: 4, name: AwalMonthEnum.Rabiulakhir, numberOfDays: 29 },
    { no: 5, name: AwalMonthEnum.Jamadilawal, numberOfDays: 30 },
    { no: 6, name: AwalMonthEnum.Jamadilakhir, numberOfDays: 29 },
    { no: 7, name: AwalMonthEnum.Rejab, numberOfDays: 30 },
    { no: 8, name: AwalMonthEnum.Sykban, numberOfDays: 29 },
    { no: 9, name: AwalMonthEnum.Ramadan, numberOfDays: 30 },
    { no: 10, name: AwalMonthEnum.Syawal, numberOfDays: 29 },
    { no: 11, name: AwalMonthEnum.Julkaejah, numberOfDays: 30 },
    { no: 12, name: AwalMonthEnum.Julhiijaah, numberOfDays: 30 }
]