import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { EventType, SakawiType, VariantType } from "../enums/enum";
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
        const timerId = setTimeout(() => {
            init();
        }, 1000);

        // Cleanup function for the timeout
        return () => {
            clearTimeout(timerId);
        };
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
            displayEventName = 'Năm mới Chăm lịch';
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
        case "VietnameseLunarNewYear":
            variantType = 'secondary';
            displayEventName = 'Tết Nguyên Đán';
            break;
        default:
            variantType = 'warning';
            displayEventName = props.eventType;
            break;
    }

    return (
        <Row className="countdown-bar">
            <Col sm={6} md={12} lg={12}>
                <div className="countdown-bar-text">
                    <span className="countdown-event-name">{`${displayEventName}:`}</span>
                    <span>{` ${dateStr}`}</span>
                    <span>{` - Còn: ${days} ngày`}</span>
                </div>
                <ProgressBar className="countdown-progress" variant={variantType.toString()} now={percent} />
            </Col>
        </Row>
    );
}
