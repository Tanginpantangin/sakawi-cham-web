import React from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { VariantType } from "../enums/enum";
import { CountDownBar } from "./countDownBar";
import { Month } from "./month";

export const Calendar = () => {
    const [year] = useState(new Date().getFullYear());
    const [month] = useState(new Date().getMonth());

    return (
        <>
            <Row>
                <Col md={12}>
                    <CountDownBar dateName={"Rija Nagar"} variantType={VariantType.success} toDate={new Date(2022, 4, 28)} />
                    <CountDownBar dateName={"Katé"} variantType={VariantType.info} toDate={new Date(2021, 10, 5)} />
                    <CountDownBar dateName={"Ramawan"} variantType={VariantType.warning} toDate={new Date(2022, 4, 2)} />
                </Col>
            </Row>
            <br />
            <Row>
                <Month year={year} month={month} />
            </Row>
        </>
    );
}