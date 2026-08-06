import { useEffect, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import { EventType, SakawiType, VariantType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";

export interface CountDownBarProps {
    eventType: EventType;
    eventDate: Date;
    sakawiType?: SakawiType;
}

function startOfDay(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function variantForEvent(eventType: EventType): VariantType {
    switch (eventType) {
        case "AkaokThun":
            return "primary";
        case "AwalNewYear":
        case "TamaRicaowRamawan":
            return "success";
        case "RijaNagar":
        case "Lakhah":
            return "danger";
        case "VietnameseLunarNewYear":
            return "secondary";
        default:
            return "warning";
    }
}

export const CountDownBar = (props: CountDownBarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const [percent, setPercent] = useState(100);
    const [days, setDays] = useState(0);

    useEffect(() => {
        function init() {
            if (!props.eventDate) {
                return;
            }

            const now = new Date();
            const distance = props.eventDate.getTime() - now.getTime();
            const timeOfYear = 365 * 24 * 60 * 60 * 1000;
            setPercent(distance / timeOfYear * 100);
            setDays(Math.ceil((startOfDay(props.eventDate).getTime() - startOfDay(now).getTime()) / 86400000));
        }

        init();
        const timerId = setTimeout(init, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [props.eventDate]);

    const locale = language === "vi" ? "vi-VN" : "en-US";
    const dateStr = props.eventDate.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const displayEventName = copy.events.names[props.eventType]
        ?? Helper.displayEventDay(props.eventType)?.latinName
        ?? props.eventType;
    const countdown = days === 0
        ? copy.events.countdownToday
        : days === 1
            ? copy.events.countdownTomorrow
            : days > 0
                ? copy.events.countdownFuture.replace("{count}", String(days))
                : copy.events.countdownPast.replace("{count}", String(Math.abs(days)));

    return (
        <Row className="countdown-bar">
            <Col sm={6} md={12} lg={12}>
                <div className="countdown-bar-text">
                    <span className="countdown-event-name">{`${displayEventName}:`}</span>
                    <span>{` ${dateStr}`}</span>
                    <span>{` - ${countdown}`}</span>
                </div>
                <ProgressBar className="countdown-progress" variant={variantForEvent(props.eventType).toString()} now={percent} />
            </Col>
        </Row>
    );
};
