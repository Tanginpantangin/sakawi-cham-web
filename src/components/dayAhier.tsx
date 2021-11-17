import { Col, Row } from "react-bootstrap";
import { IkasSarakEnum } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";
import Helper from "../utility/helper";

interface DayAhierProps {
    dateGregory: Date;
    dateAwal: AwalDate;
    dateAhier: AhierDate;
    currentAhierMonth: AhierMonth;
    dayNumbersOfCurrentAhierMonth: number;
}

export const DayAhier = (props: DayAhierProps) => {
    const tdStyle: React.CSSProperties = {
        opacity: (props.dateAhier.ahierMonth !== props.currentAhierMonth) ? 0.3 : 1
    }

    const GregoryDateStyle: React.CSSProperties = {
        fontSize: "0.7rem",
        color: "black",
        paddingTop: "0.1rem",
        paddingBottom: "0.1rem",
        textAlign: "right"
    }

    const ahierDateStyle: React.CSSProperties = {
        fontSize: "1.3rem",
        color: "orange",
        paddingTop: "2rem",
        paddingBottom: "0.1rem",
        textAlign: "right"
    }

    const awalDateStyle: React.CSSProperties = {
        flexDirection: "row",
        fontSize: "0.7rem",
        color: "green",
        paddingTop: "2rem",
        paddingBottom: "0.1rem",
        textAlign: "left"
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

        if (dateAwal.date === 1) {
            return dateAwal.date + "." + monthAwal + "." + IkasSarakEnum[dateAwal.awalMonth.year.ikasSarak];
        } else {
            return dateAwal.date;
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
                <Col md={6}></Col>
                <Col md={6}></Col>
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