import { Col, Row } from "react-bootstrap";
import { ArabMonth, IkasSarak } from "../enums/enum";

interface DayAwalProps {
    date: number;
    month: ArabMonth;
    year: IkasSarak;
}

const divStyle: React.CSSProperties ={
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
                    {props.date}.{props.month + 1}.{IkasSarak[props.year]}
                </Col>
                <Col md={4}></Col>
            </Row>
        </td>
    );
}