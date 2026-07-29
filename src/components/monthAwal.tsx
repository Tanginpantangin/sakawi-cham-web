import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { CalendarWeekdayHeader } from "./calendarWeekdays";
import { DayDetails } from "./dayDetails";

interface MonthAwalProps {
    matrixSakawi: MatrixCalendarType[];
    fullSakawi: FullCalendarType[];
    currentAwalMonthMatrix: MatrixCalendarType;
    showLatinNumberDate: boolean;
    selectedDate?: Date;
    onSelectDate: (day: FullCalendarType) => void;
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
                showLatinNumberDate={props.showLatinNumberDate}
                selectedDate={props.selectedDate}
                onSelectDate={() => props.onSelectDate(item)}
            />
        );

        if ((index + 1) % 7 === 0) {
            rows.push(<tr key={`sakawiAwal-row-${index}`}>{cells}</tr>);
            cells = [];
        }
    })

    return (
        <div className="calendar-table-wrap">
            <Table bordered hover className="calendar-table">
                <thead>
                    <tr>
                        <CalendarWeekdayHeader />
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>
        </div>
    );
}
