import { Col, Row } from "react-bootstrap";
import { displayIkasSarakName } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";
import Helper from "../utility/helper";

interface DayAhierProps {
    dateGregory: Date;
    dateAwal: AwalDate;
    dateAhier: AhierDate;
    currentAhierMonth: AhierMonth;
    dayNumbersOfCurrentAhierMonth: number;
    dayNumbersOfCurrentAwalMonth: number;
}

export const DayAhier = (props: DayAhierProps) => {
    const tdStyle: React.CSSProperties = {
        opacity: (props.dateAhier.ahierMonth !== props.currentAhierMonth) ? 0.3 : 1,
        backgroundColor: (props.dateGregory.toLocaleDateString() === new Date().toLocaleDateString()) ? '#FFEFBF' : ''
    }

    const GregoryDateStyle: React.CSSProperties = {
        fontSize: "0.8rem",
        color: "black",
        paddingTop: "0.1rem",
        paddingBottom: "0.1rem",
        textAlign: "right"
    }

    const ahierDateStyle: React.CSSProperties = {
        fontSize: "1.5rem",
        color: "#F15A25",
        paddingTop: "2rem",
        paddingBottom: "0.1rem",
        textAlign: "right"
    }

    const awalDateStyle: React.CSSProperties = {
        flexDirection: "row",
        fontSize: "1rem",
        color: "#007A3D",
        paddingTop: "2rem",
        paddingBottom: "0.3rem",
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

    function displayGregoryDate(dateGregory: Date) {
        const monthGregogy = dateGregory.getMonth() + 1;

        if (dateGregory.getDate() === 1) {
            return dateGregory.getDate() + "." + monthGregogy + "." + dateGregory.getFullYear();
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

    return (
        <td style={tdStyle}>
            <Row>
                <Col md={6}></Col>
                <Col style={GregoryDateStyle} md={6}>
                    {displayGregoryDate(props.dateGregory)}
                </Col>
            </Row>
            <Row>
                {/*TODO*/}
                <Col md={12} style={{ minHeight: "10px", maxHeight: "25px" }}>
                    {props.dateAhier.ahierMonth.month === 0 && props.dateAhier.date === 1 &&
                        <p style={eventStyle}>Akaok thun</p>
                    }
                    {props.dateAhier.ahierMonth.month === 0 && props.dateGregory.getDay() === 4 && props.dateAhier.date < 7 &&
                        <p style={eventStyle}>Rija Nagar</p>
                    }
                    {props.dateAhier.ahierMonth.month === 5 && props.dateAhier.date === 29 &&
                        <p style={eventStyle}>Katé palei Hamu Tanran</p>
                    }
                    {props.dateAhier.ahierMonth.month === 6 && props.dateAhier.date === 1 &&
                        <p style={eventStyle}>Katé angaok bimong</p>
                    }
                    {props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 1 &&
                        <p style={eventStyle}>Ramâwan</p>
                    }
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