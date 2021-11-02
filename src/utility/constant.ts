import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";

export const firstDateOfSakawiAwal_Lieh_1407 = new Date(1986, 8, 5);//05/09/1986
export const yearNumberOfSakawiAwal_Lieh_1407 = 1407;
export const firstDateOfSakawiAhier_InaGirai_Lieh_1988 = new Date(1988, 3, 16);//16/04/1988
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