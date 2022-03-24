export declare type VariantType = 'primary' | 'info' | 'secondary' | 'success' | 'warning' | 'danger' | 'light' | 'link';
export declare type EventType = 'Akaok thun' | 'Rija Nagar' | 'Katé palei Hamu Tanran' | 'Katé angaok bimong' | 'Ca-mbur' | 'Tamâ ricaow Ramâwan' | 'Talaih aek Ramâwan' | 'Muk trun' | 'Ong trun' | 'Ikak Waha' | 'Talaih Waha' | 'Yuer Yang';

export enum MonthEnum {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

export enum DayEnum {
    Sunday = 0,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

export enum IkasSarakEnum {
    Liéh = 0,
    Hak,
    Jim,
    Jây,
    Dal,
    Bak,
    Waw,
    JimLuic
}

export enum NasakEnum {
    Takuh = 0,
    Kabaw,
    Rimaong,
    Tapay,
    InâGirai,
    UlaAnaih,
    Asaih,
    Pabaiy,
    Kra,
    Manuk,
    Asau,
    Pabuei
}

export enum AwalMonthEnum {
    Muharam = 0,
    Syafar,
    Rabiulawal,
    Rabiulakhir,
    Jamadilawal,
    Jamadilakhir,
    Rejab,
    Sykban,
    Ramadan,
    Syawal,
    Julkaejah,
    Julhiijaah
}

export enum AhierMonthEnum {
    BilanSa = 0,
    BilanDua,
    BilanKlau,
    BilanPak,
    BilanLima,
    BilanNem,
    BilanTajuh,
    BilanDalipan,
    BilanSalipan,
    BilanSapluh,
    BilanPuis,
    BilanMak,
    BilanBhang
}

export enum GuecTypeEnum {
    NoneGuec = -1,
    GuecByNormalRule,
    GuecByHareiButSukRule,
    GuecByRijaNagarRule,
    GuecByKateRamawanRule,
}

export function displayMonthName(month: AhierMonthEnum) {
    let result = '';

    switch (month) {
        case 0:
            result = 'ꨝꨪꨤꩆ ꨧꨩ';
            break;
        case 1:
            result = 'ꨝꨪꨤꩆ ꨕꨶꨩ';
            break;
        case 2:
            result = 'ꨝꨪꨤꩆ ꨆꨵꨮꨭ';
            break;
        case 3:
            result = 'ꨝꨪꨤꩆ ꨛꨩꩀ';
            break;
        case 4:
            result = 'ꨝꨪꨤꩆ ꨤꨪꨟꨩ';
            break;
        case 5:
            result = 'ꨝꨪꨤꩆ ꨘꩌ';
            break;
        case 6:
            result = 'ꨝꨪꨤꩆ ꨓꨎꨭꩍ';
            break;
        case 7:
            result = 'ꨝꨪꨤꩆ ꨕꨤꨪꨚꩆ';
            break;
        case 8:
            result = 'ꨝꨪꨤꩆ ꨧꨤꨪꨚꩆ';
            break;
        case 9:
            result = 'ꨝꨪꨤꩆ ꨧꨚꨵꨭꩍ';
            break;
        case 10:
            result = 'ꨝꨪꨤꩆ ꨚꨶꨪꩋ';
            break;
        case 11:
            result = 'ꨝꨪꨤꩆ ꨠꩀ';
            break;
        case 12:
            result = 'ꨝꨪꨤꩆ ꨞꩃ';
            break;
        default:
            break;
    }

    return result;
}

export function displayNasakName(nasak: NasakEnum) {
    let result = '';

    switch (nasak) {
        case 0:
            result = 'ꨓꨆꨭꩍ';
            break;
        case 1:
            result = 'ꨆꨝꨥ';
            break;
        case 2:
            result = 'ꨣꨪꨟꨯꨱꩃ';
            break;
        case 3:
            result = 'ꨓꨛꩈ';
            break;
        case 4:
            result = 'ꨁꨗꨩ ꨈꨪꨣꩈ';
            break;
        case 5:
            result = 'ꨂꨤꨩ ꨗꨰꩍ';
            break;
        case 6:
            result = 'ꨀꨧꨰꩍ';
            break;
        case 7:
            result = 'ꨚꨝꨰꩈ';
            break;
        case 8:
            result = 'ꨆꨴꨩ';
            break;
        case 9:
            result = 'ꨟꨗꨭꩀ';
            break;
        case 10:
            result = 'ꨀꨧꨮꨭ';
            break;
        case 11:
            result = 'ꨚꨝꨶꨬ';
            break;
        default:
            break;
    }

    return result;
}

export function displayIkasSarakName(ikasSarak: IkasSarakEnum) {
    let result = '';

    switch (ikasSarak) {
        case 0:
            result = '1';
            break;
        case 1:
            result = '5';
            break;
        case 2:
            result = '3';
            break;
        case 3:
            result = '7';
            break;
        case 4:
            result = '4';
            break;
        case 5:
            result = '2';
            break;
        case 6:
            result = '6';
            break;
        case 7:
            result = '3';
            break;
        default:
            break;
    }

    return result;
}

