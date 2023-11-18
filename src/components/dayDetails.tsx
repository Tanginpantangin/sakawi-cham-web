import { Col, Row } from "react-bootstrap";
import { AwalMonthEnum, displayIkasSarakName, IkasSarakEnum, SakawiType } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import Helper from "../utility/helper";

interface DayDetailsProps {
    sakawiType: SakawiType;
    dateGregory: Date;
    dateAwal: AwalDate;
    dateAhier: AhierDate;
    currentAhierMonth?: AhierMonth;
    currentAwalMonth?: AwalMonth;
    currentGregoryMonth?: number;
    currentGregoryYear?: number;
    dayNumbersOfCurrentAhierMonth: number;
    dayNumbersOfCurrentAwalMonth: number;
    showLatinNumberDate: boolean;
}

export const DayDetails = (props: DayDetailsProps) => {
    let opacityValue = 1;
    let backgroundColor = '';

    if (props.dateGregory.toLocaleDateString() === new Date().toLocaleDateString()) {
        backgroundColor = '#FFEFBF';
    }

    if (props.sakawiType === "sakawiAhier") {
        if (JSON.stringify(props.dateAhier.ahierMonth) !== JSON.stringify(props.currentAhierMonth)) {
            backgroundColor = '#F2F2F2';
            opacityValue = 0.3;
        }
    } else if (props.sakawiType === "sakawiAwal") {
        if (JSON.stringify(props.dateAwal.awalMonth) !== JSON.stringify(props.currentAwalMonth)) {
            backgroundColor = '#F2F2F2';
            opacityValue = 0.3;
        }
    } else if (props.sakawiType === "sakawiGregory") {
        if (props.dateGregory.getMonth() !== props.currentGregoryMonth
            || props.dateGregory.getFullYear() !== props.currentGregoryYear) {
            backgroundColor = '#F2F2F2';
            opacityValue = 0.3;
        }
    }

    const tdStyle: React.CSSProperties = {
        opacity: opacityValue,
        backgroundColor: backgroundColor
    }

    let gregoryDateClass = 'gregory-date';
    let ahierDateClass = 'ahier-date';
    let awalDateClass = 'awal-date';
    let ikasSarakMonthCellClass = props.showLatinNumberDate ? '' : 'ikasSarak-month-cell';

    if (props.showLatinNumberDate) {
        ahierDateClass += ' display-latin-number';
        awalDateClass += ' display-latin-number';
    }

    switch (props.sakawiType) {
        case "sakawiGregory":
            gregoryDateClass += ' active'
            break;

        case "sakawiAhier":
            ahierDateClass += ' active'
            break;

        case "sakawiAwal":
            awalDateClass += ' active'
            ikasSarakMonthCellClass += ' active'
            break;

        default:
            break;
    }

    function displayGregoryDate(sakawiType: SakawiType, dateAhier: AhierDate, dateAwal: AwalDate, dateGregory: Date) {
        const monthGregogy = dateGregory.getMonth() + 1;

        if ((sakawiType === "sakawiAwal" && dateAwal.date === 1) || (sakawiType === "sakawiAhier" && dateAhier.date === 1)) {
            return dateGregory.getDate() + "." + monthGregogy;
        } else {
            return dateGregory.getDate();
        }
    }

    function displayAhierDate(dateAhier: AhierDate) {
        const monthAhier = dateAhier.ahierMonth.month + 1;
        const bingun = props.showLatinNumberDate ? '' : 'ꩃ';
        const klem = props.showLatinNumberDate ? '\'' : 'ꩌ';

        if (dateAhier.date === 1 && props.sakawiType !== 'sakawiAhier') {
            return (
                <label style={{ margin: 0 }} >{Helper.convertToChamDigitUnicode(dateAhier.date, props.showLatinNumberDate) + bingun + "." + Helper.convertToChamDigitUnicode(monthAhier, props.showLatinNumberDate)}</label>
            )
        } else {
            if (props.dayNumbersOfCurrentAhierMonth === 30) {
                if (dateAhier.date <= 15) {
                    return Helper.convertToChamDigitUnicode(dateAhier.date, props.showLatinNumberDate) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAhier.date - 15, props.showLatinNumberDate) + klem;
                }
            } else {
                if (dateAhier.date <= 14) {
                    if (dateAhier.date <= 5) {
                        return Helper.convertToChamDigitUnicode(dateAhier.date, props.showLatinNumberDate) + bingun;
                    } else {
                        return Helper.convertToChamDigitUnicode(dateAhier.date + 1, props.showLatinNumberDate) + bingun;
                    }
                } else {
                    return Helper.convertToChamDigitUnicode(dateAhier.date - 14, props.showLatinNumberDate) + klem;
                }
            }
        }
    };

    function displayAwalDate(dateAwal: AwalDate) {
        const monthAwal = dateAwal.awalMonth.month + 1;
        const bingun = props.showLatinNumberDate ? '' : 'ꩃ';
        const klem = props.showLatinNumberDate ? '\'' : 'ꩌ';

        if (dateAwal.date === 1 && props.sakawiType !== 'sakawiAwal') {
            return (
                <>
                    <label style={{ margin: 0 }} >{Helper.convertToChamDigitUnicode(dateAwal.date, props.showLatinNumberDate) + bingun + "." + Helper.convertToChamDigitUnicode(monthAwal, props.showLatinNumberDate) + "."}</label>
                    <label style={{ margin: 0 }} className={ikasSarakMonthCellClass}>
                        {props.showLatinNumberDate ? IkasSarakEnum[dateAwal.awalMonth.year.ikasSarak] : displayIkasSarakName(dateAwal.awalMonth.year.ikasSarak)}
                    </label>
                </>
            )
        } else {
            if (props.dayNumbersOfCurrentAwalMonth === 30) {
                if (dateAwal.date <= 15) {
                    return Helper.convertToChamDigitUnicode(dateAwal.date, props.showLatinNumberDate) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAwal.date - 15, props.showLatinNumberDate) + klem;
                }
            } else {
                if (dateAwal.date <= 14) {
                    return Helper.convertToChamDigitUnicode(dateAwal.date, props.showLatinNumberDate) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAwal.date - 14, props.showLatinNumberDate) + klem;
                }
            }
        }
    }

    function getEvents() {
        let result: string[] = [];

        if (props.dateAhier.ahierMonth.month === 0 && props.dateAhier.date === 1) {
            result.push('Akaok thun');
        }

        //TODO
        if (props.dateAhier.ahierMonth.month === 0 && props.dateGregory.getDay() === 4) {
            if (props.dateAwal.awalMonth.month === AwalMonthEnum.Ramadan) {
                // closet Thurday and after Muk Trun day
                if (props.dateAwal.date >= 16 && props.dateAhier.date <= 22) {
                    result.push('Rija Nagar');
                }
            } else {
                if (props.dateAhier.date >= 1 && props.dateAhier.date <= 7) {
                    result.push('Rija Nagar');
                }
            }
        }

        if (props.dateAhier.ahierMonth.month === 5 && props.dateAhier.date === props.dayNumbersOfCurrentAhierMonth) {
            result.push('Katé palei Hamu Tanran');
        }

        if (props.dateAhier.ahierMonth.month === 6 && props.dateAhier.date === 1) {
            result.push('Katé angaok bimong');
        }

        if (props.dayNumbersOfCurrentAhierMonth === 30) {
            if (props.dateAhier.ahierMonth.month === 8 && props.dateAhier.date === 16) {
                result.push('Ca-mbur');
            }
        } else {
            if (props.dateAhier.ahierMonth.month === 8 && props.dateAhier.date === 15) {
                result.push('Ca-mbur');
            }
        }

        if (props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 1) {
            result.push('Tamâ ricaow Ramâwan');
        }

        if (props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 16) {
            result.push('Muk trun');
        }

        if (props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 21) {
            result.push('Ong trun');
        }

        if (props.dateAwal.awalMonth.month === 9 && props.dateAwal.date === 2) {
            result.push('Talaih aek Ramâwan');
        }

        if (props.dateAwal.awalMonth.month === 11 && props.dateAwal.date === 1) {
            result.push('Ikak Waha');
        }

        if (props.dateAwal.awalMonth.month === 11 && props.dateAwal.date === 11) {
            result.push('Talaih Waha');
        }

        if (props.dateAhier.ahierMonth.month === 3 && props.dateGregory.getDay() === 0 && props.dateAhier.date < 7) {
            result.push('Yuer Yang');
        }

        // TODO: 
        // if (props.dateAhier.ahierMonth.month === 10 && props.dateGregory.getDay() === 2 && props.dateAhier.date <= 15) {
        //     result.push('Peh ba-mbeng Yang');
        // }

        if ((props.dateAhier.ahierMonth.month === 2
            || props.dateAhier.ahierMonth.month === 5
            || props.dateAhier.ahierMonth.month === 7
            || props.dateAhier.ahierMonth.month === 9
            || props.dateAhier.ahierMonth.month === 10) && props.dateGregory.getDay() === 3) {

            if (props.dayNumbersOfCurrentAhierMonth === 30) {
                if (props.dateAhier.date > 15 && (props.dateAhier.date - 15) % 2 === 0) {
                    result.push('♥️ Lakhah');
                }
            } else {
                if (props.dateAhier.date > 14 && (props.dateAhier.date - 14) % 2 === 0) {
                    result.push('♥️ Lakhah');
                }
            }
        }

        return result;
    }

    return (
        <td style={tdStyle}>
            <Row>
                <Col xs={6} sm={6} md={6}></Col>
                <Col className={gregoryDateClass} xs={6} sm={6} md={6}>
                    {displayGregoryDate(props.sakawiType, props.dateAhier, props.dateAwal, props.dateGregory)}
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={12} style={{ minHeight: "30px" }}>
                    {getEvents().map((item, index) => {
                        return <span key={index} className='event-name'>{item}</span>
                    })}
                </Col>
            </Row>
            <Row>
                <Col className={awalDateClass} xs={6} sm={6} md={6}>
                    {displayAwalDate(props.dateAwal)}
                </Col>
                <Col className={ahierDateClass} xs={6} sm={6} md={6}>
                    {displayAhierDate(props.dateAhier)}
                </Col>
            </Row>
        </td>
    );
}