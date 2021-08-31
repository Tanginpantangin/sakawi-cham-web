import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { IkasSarakEnum } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";

interface MatrixCalendarProp {
    ahierYear: AhierYear;
}

export const MatrixCalendar = (props: MatrixCalendarProp) => {
    const [ahierYear, setAhierYear] = useState(props.ahierYear);
    const [numberOfMonths, setNumberOfMonths] = useState(12);

    React.useEffect(() => {
        function init() {
            let numberOfMonths = getNumberOfMonthsInAhierYear(ahierYear);
            setNumberOfMonths(numberOfMonths);
        }

        init();
    }, [ahierYear]);

    function getNumberOfMonthsInAhierYear(year: AhierYear) {
        let result = 12;
        const ikasSarak = year.ikasSarak;

        if (ikasSarak === IkasSarakEnum.Hak || ikasSarak === IkasSarakEnum.Dal || ikasSarak === IkasSarakEnum.JimLuic) {
            result = 13;
        }

        return result;
    }

    return (
        <Container>

        </Container>
    );
}