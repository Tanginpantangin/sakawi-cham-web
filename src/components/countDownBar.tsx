import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { EventType, VariantType } from "../enums/enum";
import { SakawiType } from "../pages/monthCalendarPage";
import Helper from "../utility/helper";

export interface CountDownBarProps {
    eventType: EventType;
    eventDate: Date;
    sakawiType?: SakawiType;
}

export const CountDownBar = (props: CountDownBarProps) => {
    const [percent, setPercent] = useState(100);
    const [days, setDays] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            init();
        }, 1000);
    });

    function init() {
        if (!props.eventDate) {
            return;
        }

        const now = new Date().getTime();
        const distance = props.eventDate.getTime() - now;
        const timeOfYear = 365 * 24 * 60 * 60 * 1000;
        const percent = distance / timeOfYear * 100;
        setPercent(percent);

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        setDays(days);
    }

    const dateStr = Helper.displayDateString(props.eventDate);

    let variantType: VariantType;
    let displayEventName = '';
    switch (props.eventType) {
        case "AkaokThun":
            variantType = 'primary';
            displayEventName = 'Năm mới';
            break;
        case "RijaNagar":
            variantType = 'danger';
            displayEventName = 'Rija Nagar';
            break;
        case "KateAngaokBimong":
            variantType = 'warning';
            displayEventName = 'Katé';
            break;
        case "TamaRicaowRamawan":
            variantType = 'success';
            displayEventName = 'Ramâwan';
            break;
        default:
            variantType = 'warning';
            displayEventName = props.eventType;
            break;
    }

    return (
        <Row>
            <Col sm={6} md={12} lg={12}>
                <div style={{ marginBottom: "0.1rem" }}>
                    <span style={{ fontWeight: "bold" }}>{`${displayEventName}:`}</span>
                    <span>{` ${dateStr}`}</span>
                    <span>{` - Còn: ${days} ngày`}</span>
                </div>
                <ProgressBar style={{ height: "0.3rem", marginBottom: "5px" }} variant={variantType.toString()} now={percent} />
            </Col>
        </Row>
    );
}