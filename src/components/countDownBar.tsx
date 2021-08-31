import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { VariantType } from "../enums/enum";

export interface CountDownBarProps {
    dateName: string;
    variantType: VariantType;
    toDate: Date;
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
        if (!props.toDate) {
            return;
        }

        const now = new Date().getTime();
        const distance = props.toDate.getTime() - now;
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

    return (
        <ProgressBar variant={props.variantType.toString()} now={percent}
            label={`${props.dateName}: còn ${days} ngày - ${("0" + hours).slice(-2)}h${("0" + minutes).slice(-2)}'${("0" + seconds).slice(-2)}"`} />
    );
}