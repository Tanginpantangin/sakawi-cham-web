import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { DayDetails } from "./dayDetails";

interface MonthGregoryProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentGregoryMonth: number,
    currentGregoryYear: number
}

export const MonthGregory = (props: MonthGregoryProps) => {
    const [datesOfCurrentMonth, setDatesOfCurrentMonth] = useState<FullCalendarType[]>([]);

    React.useEffect(() => {
        function init() {
            // Gregory Date
            const firstGregoryDate = new Date(props.currentGregoryYear, props.currentGregoryMonth, 1);

            // Get date list will be display at current month
            const firstDayOfCurrentGregoryMonthIndex = props.fullSakawi.findIndex(x =>
                x.dateGregory.getDate() === 1
                && x.dateGregory.getMonth() === props.currentGregoryMonth
                && x.dateGregory.getFullYear() === props.currentGregoryYear);
            const firstIndex = firstDayOfCurrentGregoryMonthIndex - firstGregoryDate.getDay();
            const lastIndex = firstIndex + 41; // 42 - 1 cells
            const datesOfCurrentMonth = props.fullSakawi.filter((item, index) => index >= firstIndex && index <= lastIndex);
            setDatesOfCurrentMonth(datesOfCurrentMonth);
        }

        init();
    }, [props.currentGregoryMonth, props.currentGregoryYear, props.fullSakawi]);

    // draw Calendar Table
    let cells: JSX.Element[] = [];
    let rows: JSX.Element[] = [];

    datesOfCurrentMonth.forEach((item, index) => {
        const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, item.dateAhier.ahierMonth);
        const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(item.dateAwal.awalMonth.year, item.dateAwal.awalMonth.month);

        cells.push(
            <DayDetails
                sakawiType="sakawiGregory"
                key={`sakawiGregory-cell-${index}`}
                dateAhier={item.dateAhier}
                dateAwal={item.dateAwal}
                dateGregory={item.dateGregory}
                currentGregoryMonth={props.currentGregoryMonth}
                currentGregoryYear={props.currentGregoryYear}
                dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
            />
        );

        if ((index + 1) % 7 === 0) {
            rows.push(<tr key={`sakawiGregory-row-${index}`}>{cells}</tr>);
            cells = [];
        }
    })

    const dayNames = ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    return (
        <Table bordered hover style={tableStyle}>
            <thead>
                <tr>
                    {dayNames.map((d, index) =>
                        <th style={{ padding: "2px", textAlign: "center" }} key={index}>{d}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    );
}
