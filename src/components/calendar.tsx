import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { ArabMonth, IkasSarak } from "../enums/enum";
import { CountDownBar } from "./countDownBar";
import { Month } from "./month";
import { MonthAwal } from "./monthAwal";

export const Calendar = () => {
    const [year] = useState(new Date().getFullYear());
    const [month] = useState(new Date().getMonth());

    const [yearAwal] = useState(IkasSarak.JimLuic);
    const [monthAwal] = useState(ArabMonth.Muharam);
    const [sakawiTyle] = useState(false);

    return (
        <>
            <Row>
                <Col md={12}>
                    <CountDownBar dateName={"Rija Nagar"} variantType='success' toDate={new Date(2022, 4, 28)} />
                    <CountDownBar dateName={"Katé"} variantType='info' toDate={new Date(2021, 10, 5)} />
                    <CountDownBar dateName={"Ramawan"} variantType='warning' toDate={new Date(2022, 4, 2)} />
                </Col>
            </Row>
            <br />
            <Row>
                {sakawiTyle && <Month year={year} month={month} />}
                <MonthAwal year={yearAwal} month={monthAwal} />
            </Row>
        </>
    );
}