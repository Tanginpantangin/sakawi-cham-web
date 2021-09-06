import { Col, Row } from "react-bootstrap";
import { IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";

interface DayAhierProps {
    dateGregory: Date;
    dateAwal: AwalDate;
    dateAhier: AhierDate;
}

const GregoryDateStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    color: "black",
    paddingTop: "0.1rem",
    paddingBottom: "0.1rem",
}

const ahierDateStyle: React.CSSProperties = {
    fontSize: "0.7rem",
    color: "orange",
    paddingTop: "2rem",
    paddingBottom: "0.1rem",
}

const awalDateStyle: React.CSSProperties = {
    flexDirection: "row",
    fontSize: "0.7rem",
    color: "green",
    paddingTop: "2rem",
    paddingBottom: "0.1rem",
}

export const DayAhier = (props: DayAhierProps) => {
    return (
        <td>
            <Row>
                <Col md={6}></Col>
                <Col style={GregoryDateStyle} md={6}>
                    {props.dateGregory.getDate()}/{props.dateGregory.getMonth() + 1}/{props.dateGregory.getFullYear()}
                </Col>
            </Row>
            <Row>
                <Col md={6}></Col>
                <Col md={6}></Col>
            </Row>
            <Row>
                <Col style={awalDateStyle} md={6}>
                    {props.dateAwal.date}.{props.dateAwal.awalMonth.month + 1}-{IkasSarakEnum[props.dateAwal.awalMonth.year.ikasSarak]}
                </Col>
                <Col style={ahierDateStyle} md={6}>
                    {props.dateAhier.date}.{props.dateAhier.ahierMonth.month + 1}.{NasakEnum[props.dateAhier.ahierMonth.year.nasak]}-{IkasSarakEnum[props.dateAhier.ahierMonth.year.ikasSarak]}
                </Col>
            </Row>
        </td>
    );
}