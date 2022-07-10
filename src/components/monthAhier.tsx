import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { SakawiType } from "./calendar";
import { DayDetails } from "./dayDetails";
import { MonthNavigation } from "./monthNavigation";

interface MonthAhierProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentAhierMonthMatrix: MatrixCalendarType,
    onSelectSakawiType: (type: SakawiType) => void
}

export const MonthAhier = (props: MonthAhierProps) => {
    const [datesOfCurrentMonth, setDatesOfCurrentMonth] = useState<FullCalendarType[]>([]);
    const [currentAhierMonthMatrix, setCurrentAhierMonthMatrix] = useState(props.currentAhierMonthMatrix);

    React.useEffect(() => {
        function init() {
            // Get date list will be display at current month
            const firstDayOfCurrentAhierMonthIndex = props.fullSakawi.findIndex(x => x.dateAhier.date === 1 && JSON.stringify(x.dateAhier.ahierMonth) === JSON.stringify(currentAhierMonthMatrix.ahierMonth));
            const firstIndex = firstDayOfCurrentAhierMonthIndex - currentAhierMonthMatrix.firstDayOfAhierMonth;
            const lastIndex = firstIndex + 41; // 42 - 1 cells
            const datesOfCurrentMonth = props.fullSakawi.filter((item, index) => index >= firstIndex && index <= lastIndex);
            setDatesOfCurrentMonth(datesOfCurrentMonth);
        }

        init();
    }, [currentAhierMonthMatrix.ahierMonth, currentAhierMonthMatrix.firstDayOfAhierMonth, props.fullSakawi]);

    function handleGoToToday() {
        setCurrentAhierMonthMatrix(props.currentAhierMonthMatrix);
    }

    function handleGoToPreviousMonth() {
        const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAhierMonthMatrix));
        setCurrentAhierMonthMatrix(props.matrixSakawi[index - 1]);
    }

    function handleGoToNextMonth() {
        const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAhierMonthMatrix));
        setCurrentAhierMonthMatrix(props.matrixSakawi[index + 1]);
    }

    // draw Calendar Table
    let cells: JSX.Element[] = [];
    let rows: JSX.Element[] = [];

    datesOfCurrentMonth.forEach((item, index) => {
        const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, item.dateAhier.ahierMonth);
        const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(item.dateAwal.awalMonth.year, item.dateAwal.awalMonth.month);

        cells.push(
            <DayDetails
                sakawiType="sakawiAhier"
                key={`sakawiAhier-cell-${index}`}
                dateAhier={item.dateAhier}
                dateAwal={item.dateAwal}
                dateGregory={item.dateGregory}
                currentAhierMonth={currentAhierMonthMatrix.ahierMonth}
                currentAwalMonth={currentAhierMonthMatrix.awalMonth}
                dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
            />
        );

        if ((index + 1) % 7 === 0) {
            rows.push(<tr key={`sakawiAhier-row-${index}`}>{cells}</tr>);
            cells = [];
        }
    })

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    return (
        <Container>
            <Row>
                <MonthNavigation
                    sakawiType="sakawiAhier"
                    currentAhierMonth={currentAhierMonthMatrix.ahierMonth}
                    onClickToday={handleGoToToday}
                    onClickPreviousMonth={handleGoToPreviousMonth}
                    onClickNextMonth={handleGoToNextMonth}
                    onSelectSakawiType={type => props.onSelectSakawiType(type)}
                />
            </Row>
            <Row>
                <Col md={12}>
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
                </Col>
            </Row>
        </Container>
    );
}
