import { Col, Row } from "react-bootstrap";
import { AwalMonthEnum, displayIkasSarakName } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import Helper from "../utility/helper";
import { SakawiType } from "./calendar";

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
}

export const DayDetails = (props: DayDetailsProps) => {
    let opacityValue = 1;
    if (props.sakawiType === "sakawiAhier") {
        if (JSON.stringify(props.dateAhier.ahierMonth) !== JSON.stringify(props.currentAhierMonth)) {
            opacityValue = 0.3;
        }
    } else if (props.sakawiType === "sakawiAwal") {
        if (JSON.stringify(props.dateAwal.awalMonth) !== JSON.stringify(props.currentAwalMonth)) {
            opacityValue = 0.3;
        }
    } else if (props.sakawiType === "sakawiGregory") {
        if (props.dateGregory.getMonth() !== props.currentGregoryMonth
            || props.dateGregory.getFullYear() !== props.currentGregoryYear) {
            opacityValue = 0.3;
        }
    }

    const tdStyle: React.CSSProperties = {
        opacity: opacityValue,
        backgroundColor: (props.dateGregory.toLocaleDateString() === new Date().toLocaleDateString()) ? '#FFEFBF' : ''
    }

    const GregoryDateStyle: React.CSSProperties = {
        fontSize: props.sakawiType === "sakawiGregory" ? "1.3rem" : "0.8rem",
        color: "black",
        paddingTop: "0.1rem",
        paddingBottom: "0.1rem",
        textAlign: "right"
    }

    const ahierDateStyle: React.CSSProperties = {
        fontSize: props.sakawiType === "sakawiAhier" ? "1.5rem" : "1rem",
        color: "#F15A25",
        paddingTop: "2rem",
        paddingBottom: "0.1rem",
        textAlign: "right"
    }

    const awalDateStyle: React.CSSProperties = {
        flexDirection: "row",
        fontSize: props.sakawiType === "sakawiAwal" ? "1.5rem" : "1rem",
        color: "#007A3D",
        paddingTop: "2rem",
        paddingBottom: "0.3rem",
        paddingRight: "0.3rem",
        alignSelf: "end"
    }

    const eventStyle: React.CSSProperties = {
        display: "block",
        fontSize: "0.8rem",
        color: "white",
        backgroundColor: "#3788d8",
        paddingLeft: "0.3rem",
        textAlign: "left",
        marginBottom: "0.1rem",
    }

    function displayGregoryDate(sakawiType: SakawiType, dateAhier: AhierDate, dateAwal: AwalDate, dateGregory: Date) {
        const monthGregogy = dateGregory.getMonth() + 1;

        if (dateGregory.getDate() === 1 ||
            (sakawiType === "sakawiAwal" && dateAwal.date === 1) ||
            (sakawiType === "sakawiAhier" && dateAhier.date === 1)) {
            return dateGregory.getDate() + "." + monthGregogy;
        } else {
            return dateGregory.getDate();
        }
    }

    function displayAhierDate(dateAhier: AhierDate) {
        const bingun = 'ꩃ';
        const klem = 'ꩌ';

        if (props.dayNumbersOfCurrentAhierMonth === 30) {
            if (dateAhier.date <= 15) {
                return Helper.convertToChamDigitUnicode(dateAhier.date) + bingun;
            } else {
                return Helper.convertToChamDigitUnicode(dateAhier.date - 15) + klem;
            }
        } else {
            if (dateAhier.date <= 14) {
                if (dateAhier.date <= 5) {
                    return Helper.convertToChamDigitUnicode(dateAhier.date) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAhier.date + 1) + bingun;
                }
            } else {
                return Helper.convertToChamDigitUnicode(dateAhier.date - 14) + klem;
            }
        }
    };

    function displayAwalDate(dateAwal: AwalDate) {
        const monthAwal = dateAwal.awalMonth.month + 1;
        const bingun = 'ꩃ';
        const klem = 'ꩌ';

        if (dateAwal.date === 1) {
            return (
                <>
                    <label style={{ margin: 0 }} >{Helper.convertToChamDigitUnicode(dateAwal.date) + bingun + "." + Helper.convertToChamDigitUnicode(monthAwal) + "."}</label>
                    <label style={{ margin: 0 }} className='ikasSarak-month-cell'>{displayIkasSarakName(dateAwal.awalMonth.year.ikasSarak)}</label>
                </>
            )
        } else {
            if (props.dayNumbersOfCurrentAwalMonth === 30) {
                if (dateAwal.date <= 15) {
                    return Helper.convertToChamDigitUnicode(dateAwal.date) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAwal.date - 15) + klem;
                }
            } else {
                if (dateAwal.date <= 14) {
                    return Helper.convertToChamDigitUnicode(dateAwal.date) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAwal.date - 14) + klem;
                }
            }
        }
    }

    function getEvents() {
        let result: string[] = [];

        if (props.dateAhier.ahierMonth.month === 0 && props.dateAhier.date === 1) {
            result.push('Akaok thun');
        }

        if (props.dateAhier.ahierMonth.month === 0 && props.dateGregory.getDay() === 4) {
            if (props.dateAwal.awalMonth.month !== AwalMonthEnum.Ramadan) {
                if (props.dateAhier.date < 7 || (props.dateAhier.date > 14 && props.dateAhier.date < 20)) {
                    result.push('Rija Nagar');
                }
            }
        }

        if (props.dateAhier.ahierMonth.month === 5 && props.dateAhier.date === 29) {
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
                <Col md={6}></Col>
                <Col style={GregoryDateStyle} md={6}>
                    {displayGregoryDate(props.sakawiType, props.dateAhier, props.dateAwal, props.dateGregory)}
                </Col>
            </Row>
            <Row>
                <Col md={12} style={{ minHeight: "10px", maxHeight: "25px" }}>
                    {getEvents().map((item, index) => { return <p key={index} style={eventStyle}>{item}</p> })}
                </Col>
            </Row>
            <Row>
                <Col style={awalDateStyle} md={6}>
                    {/* {props.dateAwal.date}.{props.dateAwal.awalMonth.month + 1}-{IkasSarakEnum[props.dateAwal.awalMonth.year.ikasSarak]} */}
                    {displayAwalDate(props.dateAwal)}
                </Col>
                <Col style={ahierDateStyle} md={6}>
                    {/* {props.dateAhier.date}.{props.dateAhier.ahierMonth.month + 1}.{NasakEnum[props.dateAhier.ahierMonth.year.nasak]}.{IkasSarakEnum[props.dateAhier.ahierMonth.year.ikasSarak]} */}
                    {displayAhierDate(props.dateAhier)}
                </Col>
            </Row>
        </td>
    );
}