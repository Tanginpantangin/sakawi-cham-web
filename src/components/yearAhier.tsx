import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";

interface YearAhierProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentAhierYear: AhierYear
}


interface MonthsPerYear {
    month: string,
    datesOfMonth: FullCalendarType[]
}

export const YearAhier = (props: YearAhierProps) => {
    const [datesOfCurrentYear, setDatesOfCurrentYear] = useState<FullCalendarType[]>([]);

    React.useEffect(() => {
        function init() {
            // Get date list will be display at current month
            const firstIndex = props.fullSakawi.findIndex(x => JSON.stringify(x.dateAhier.ahierMonth.year) === JSON.stringify(props.currentAhierYear));
            const lastIndex = props.fullSakawi.map(x => x.dateAhier.ahierMonth.year.yearNumber).lastIndexOf(props.currentAhierYear.yearNumber);
            const datesOfCurrentYear = props.fullSakawi.filter((item, index) => index >= firstIndex && index <= lastIndex);
            setDatesOfCurrentYear(datesOfCurrentYear);
            //console.log('datesOfCurrentYear', JSON.stringify(datesOfCurrentYear));
            const lastMonth = lastIndex !== -1 ? props.fullSakawi[lastIndex].dateAhier.ahierMonth.month : 0;
            console.log('lastIndex', lastIndex);
            console.log('lastMonth', lastMonth);
        }

        init();
    }, [props.currentAhierYear, props.fullSakawi]);

    // draw Calendar Table
    let cells: JSX.Element[] = [];
    let rows: JSX.Element[] = [];

    /*datesOfCurrentYear.forEach((item, index) => {
        const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, item.dateAhier.ahierMonth);
        const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(item.dateAwal.awalMonth.year, item.dateAwal.awalMonth.month);

        cells.push(
            <DayDetails
                sakawiType="sakawiAhier"
                key={`sakawiAhier-cell-${index}`}
                dateAhier={item.dateAhier}
                dateAwal={item.dateAwal}
                dateGregory={item.dateGregory}
                currentAhierMonth={props.currentAhierMonthMatrix.ahierMonth}
                currentAwalMonth={props.currentAhierMonthMatrix.awalMonth}
                dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
            />
        );

        if ((index + 1) % 7 === 0) {
            rows.push(<tr key={`sakawiAhier-row-${index}`}>{cells}</tr>);
            cells = [];
        }
    })*/

    const dayOfWeekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayNames = [];
    for (let index = 0; index < 6; index++) {
        dayNames.push(...dayOfWeekNames);
    }
    console.log('dayNames', JSON.stringify(dayNames));

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