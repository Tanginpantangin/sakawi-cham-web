import { Col, Row } from "react-bootstrap";
import { IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";

interface DayAhierProps {
    date?: Date;
    dateAwal?: AwalDate;
    dateAhier: AhierDate;
}

const divStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row-reverse",
    fontSize: "0.8rem",
    color: "red",
    paddingTop: "2rem",
    paddingBottom: "0.1rem",
}

export const DayAhier = (props: DayAhierProps) => {
    return (
        <td>
            <Row>
                <Col md={4}></Col>
                <Col md={4}></Col>
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}></Col>
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col style={divStyle} md={4}>
                    {props.dateAhier.date}.{props.dateAhier.ahierMonth.month + 1}.{NasakEnum[props.dateAhier.ahierMonth.year.nasak]}-{IkasSarakEnum[props.dateAhier.ahierMonth.year.ikasSarak]}
                </Col>
            </Row>
        </td>
    );
}