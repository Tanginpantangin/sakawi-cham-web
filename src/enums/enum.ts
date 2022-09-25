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
    None = -1,
    GuecByNormalRule,
    GuecByHareiButSukRule,
    GuecByRijaNagarRule,
    GuecByKateRamawanRule,
}

export enum GuenTypeEnum {
    None = -1,
    GuenByNormalRule
}

export function displayMonthName(month: AhierMonthEnum) {
    let _akharThrahName = '';
    let _rumiName = '';

    switch (month) {
        case 0:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨧꨩ';
            _rumiName = 'Bilan sa';
            break;
        case 1:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨕꨶꨩ';
            _rumiName = 'Bilan dua';
            break;
        case 2:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨆꨵꨮꨭ';
            _rumiName = 'Bilan klau';
            break;
        case 3:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨛꨩꩀ';
            _rumiName = 'Bilan pak';
            break;
        case 4:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨤꨪꨟꨩ';
            _rumiName = 'Bilan limâ';
            break;
        case 5:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨗꨮꩌ';
            _rumiName = 'Bilan nem';
            break;
        case 6:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨓꨎꨭꩍ';
            _rumiName = 'Bilan tajuh';
            break;
        case 7:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨕꨤꨪꨚꩆ';
            _rumiName = 'Bilan dalipan';
            break;
        case 8:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨧꨤꨪꨚꩆ';
            _rumiName = 'Bilan salipan';
            break;
        case 9:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨧꨚꨵꨭꩍ';
            _rumiName = 'Bilan sapluh';
            break;
        case 10:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨚꨶꨪꩋ';
            _rumiName = 'Bilan puis';
            break;
        case 11:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨠꩀ';
            _rumiName = 'Bilan mak';
            break;
        case 12:
            _akharThrahName = 'ꨝꨪꨤꩆ ꨞꩃ';
            _rumiName = 'Bilan bhang';
            break;
        default:
            break;
    }

    return {
        akharThrahName: _akharThrahName,
        rumiName: _rumiName
    }
}

export function displayNasakName(nasak: NasakEnum) {
    let _akharThrahName = '';
    let _rumiName = '';

    switch (nasak) {
        case 0:
            _akharThrahName = 'ꨓꨆꨭꩍ';
            _rumiName = 'Takuh';
            break;
        case 1:
            _akharThrahName = 'ꨆꨝꨥ';
            _rumiName = 'Kabaw';
            break;
        case 2:
            _akharThrahName = 'ꨣꨪꨟꨯꨱꩃ';
            _rumiName = 'Rimaong';
            break;
        case 3:
            _akharThrahName = 'ꨓꨛꩈ';
            _rumiName = 'Tapay';
            break;
        case 4:
            _akharThrahName = 'ꨁꨗꨩ ꨈꨪꨣꩈ';
            _rumiName = 'Inâ Giray';
            break;
        case 5:
            _akharThrahName = 'ꨂꨤꨩ ꨗꨰꩍ';
            _rumiName = 'Ula naih';
            break;
        case 6:
            _akharThrahName = 'ꨀꨧꨰꩍ';
            _rumiName = 'Asaih';
            break;
        case 7:
            _akharThrahName = 'ꨚꨝꨰꩈ';
            _rumiName = 'Pabaiy';
            break;
        case 8:
            _akharThrahName = 'ꨆꨴꨩ';
            _rumiName = 'Kra';
            break;
        case 9:
            _akharThrahName = 'ꨟꨗꨭꩀ';
            _rumiName = 'Mânuk';
            break;
        case 10:
            _akharThrahName = 'ꨀꨧꨮꨭ';
            _rumiName = 'Asau';
            break;
        case 11:
            _akharThrahName = 'ꨚꨝꨶꨬ';
            _rumiName = 'Pabuei';
            break;
        default:
            break;
    }

    return {
        akharThrahName: _akharThrahName,
        rumiName: _rumiName
    }
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

