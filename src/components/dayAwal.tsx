import { Col, Row } from "react-bootstrap";
import { IkasSarakEnum } from "../enums/enum";
import { AhierDate } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";

interface DayAwalProps {
    date?: Date;
    dateAwal: AwalDate;
    dateAhier?: AhierDate;
}

const divStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    fontSize: "0.8rem",
    color: "green",
    paddingTop: "2rem",
    paddingBottom: "0.1rem",
}

export const DayAwal = (props: DayAwalProps) => {
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
                <Col style={divStyle} md={4}>
                    {props.dateAwal.date}.{props.dateAwal.awalMonth.month + 1}.{IkasSarakEnum[props.dateAwal.awalMonth.year.ikasSarak]}
                </Col>
                <Col md={4}></Col>
            </Row>
        </td>
    );
}