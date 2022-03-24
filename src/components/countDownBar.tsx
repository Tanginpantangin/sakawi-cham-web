import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { EventType, VariantType } from "../enums/enum";

export interface CountDownBarProps {
    eventType: EventType;
    eventDate: Date;
}

export const CountDownBar = (props: CountDownBarProps) => {
    const [percent, setPercent] = useState(100);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

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
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
    }

    let dd = props.eventDate.getDate();
    let mm = props.eventDate.getMonth() + 1;
    const yyyy = props.eventDate.getFullYear();
    const ddStr = dd < 10 ? '0' + dd : dd;
    const mmStr = mm < 10 ? '0' + mm : mm;
    const dateStr = ddStr + '/' + mmStr + '/' + yyyy;

    let variantType: VariantType;
    switch (props.eventType) {
        case "Rija Nagar":
            variantType = 'success';
            break;
        case "Katé angaok bimong":
            variantType = 'info';
            break;
        case "Tamâ ricaow Ramâwan":
            variantType = 'warning';
            break;

        default:
            variantType = 'warning';
            break;
    }

    return (
        <Row>
            <Col md={12}>
                <div style={{ marginBottom: "0.1rem" }}>
                    <span style={{ fontWeight: "bold" }}>{`${props.eventType}:`}</span>
                    <span>{` ${dateStr}`}</span>
                    <span>{` - Còn: ${days} ngày ${("0" + hours).slice(-2)}h${("0" + minutes).slice(-2)}'${("0" + seconds).slice(-2)}"`}</span>
                </div>
                <ProgressBar style={{ height: "0.5rem", marginBottom: "5px" }} variant={variantType.toString()} now={percent} />
            </Col>
        </Row>
    );
}