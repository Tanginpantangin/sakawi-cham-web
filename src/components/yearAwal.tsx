import { useState } from "react";
import { Table } from "react-bootstrap";
import { AwalYear } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";

interface YearAwalProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentAwalYear: AwalYear
}

export const YearAwal = (props: YearAwalProps) => {
    const [datesOfCurrentMonth, setDatesOfCurrentMonth] = useState<FullCalendarType[]>([]);

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    // draw Calendar Table
    let cells: JSX.Element[] = [];
    let rows: JSX.Element[] = [];

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