import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { CountDownBar } from "./countDownBar";
import { Month } from "./month";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";

export declare type SakawiType = 'sakawiAwal' | 'sakawiAhier' | 'solarCalendar';

export const Calendar = () => {
    const [year] = useState(new Date().getFullYear());
    const [month] = useState(new Date().getMonth());
    const [sakawiType] = useState<SakawiType>('sakawiAwal');

    // Sakawi Awal
    let awalMonth: AwalMonth = { month: 0, year: {ikasSarak: IkasSarakEnum.Hak}};
    const [monthAwal] = useState(awalMonth);

    // Sakawi Ahier
    let ahierMonth: AhierMonth = {month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Kabaw, ikasSarak: IkasSarakEnum.Hak }};
    const [monthAhier] = useState(ahierMonth);

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
                {sakawiType === 'solarCalendar' && <Month year={year} month={month} />}
                {sakawiType === 'sakawiAwal' && <MonthAwal awalMonth={monthAwal} />}
                {sakawiType === 'sakawiAhier' && <MonthAhier ahierMonth={monthAhier} />}
            </Row>
        </>
    );
}