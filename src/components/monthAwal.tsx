import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { DayDetails } from "./dayDetails";

interface MonthAwalProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentAwalMonthMatrix: MatrixCalendarType
}

export const MonthAwal = (props: MonthAwalProps) => {
    const [datesOfCurrentMonth, setDatesOfCurrentMonth] = useState<FullCalendarType[]>([]);

    React.useEffect(() => {
        function init() {
            // Get date list will be display at current month
            const firstDayOfCurrentAwalMonthIndex = props.fullSakawi.findIndex(x => x.dateAwal.date === 1
                && JSON.stringify(x.dateAwal.awalMonth) === JSON.stringify(props.currentAwalMonthMatrix.awalMonth));
            const firstIndex = firstDayOfCurrentAwalMonthIndex - props.currentAwalMonthMatrix.firstDayOfAwalMonth;
            const lastIndex = firstIndex + 41; // 42 - 1 cells
            const datesOfCurrentMonth = props.fullSakawi.filter((item, index) => index >= firstIndex && index <= lastIndex);
            setDatesOfCurrentMonth(datesOfCurrentMonth);
        }

        init();
    }, [props.currentAwalMonthMatrix.awalMonth, props.currentAwalMonthMatrix.firstDayOfAwalMonth, props.fullSakawi]);

    // draw Calendar Table
    let cells: JSX.Element[] = [];
    let rows: JSX.Element[] = [];

    datesOfCurrentMonth.forEach((item, index) => {
        const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, item.dateAhier.ahierMonth);
        const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(item.dateAwal.awalMonth.year, item.dateAwal.awalMonth.month);

        cells.push(
            <DayDetails
                sakawiType="sakawiAwal"
                key={`sakawiAwal-cell-${index}`}
                dateAhier={item.dateAhier}
                dateAwal={item.dateAwal}
                dateGregory={item.dateGregory}
                currentAhierMonth={props.currentAwalMonthMatrix.ahierMonth}
                currentAwalMonth={props.currentAwalMonthMatrix.awalMonth}
                dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
            />
        );

        if ((index + 1) % 7 === 0) {
            rows.push(<tr key={`sakawiAwal-row-${index}`}>{cells}</tr>);
            cells = [];
        }
    })

    const dayNames = ["Adit", "Thom", "Angar", "But", "Jip", "Suk", "Sanacar"]
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    return (
        <Table bordered hover style={tableStyle}>
            <thead>
                <tr>
                    {dayNames.map((d, index) =>
                        <th className="day-name" key={index}>{d}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}
