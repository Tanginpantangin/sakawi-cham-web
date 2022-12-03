import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { EventType, VariantType } from "../enums/enum";
import { SakawiType } from "./calendar";

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

    let dd = props.eventDate.getDate();
    let mm = props.eventDate.getMonth() + 1;
    const yyyy = props.eventDate.getFullYear();
    const ddStr = dd < 10 ? '0' + dd : dd;
    const mmStr = mm < 10 ? '0' + mm : mm;
    const dateStr = ddStr + '/' + mmStr + '/' + yyyy;

    let variantType: VariantType;
    let displayEventName = '';
    switch (props.eventType) {
        case "Akaok thun":
            variantType = 'primary';
            displayEventName = 'Năm mới';
            break;
        case "Rija Nagar":
            variantType = 'danger';
            displayEventName = props.eventType;
            break;
        case "Katé angaok bimong":
            variantType = 'warning';
            displayEventName = 'Katé';
            break;
        case "Tamâ ricaow Ramâwan":
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