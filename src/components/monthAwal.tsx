import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { SakawiType } from "./calendar";
import { DayDetails } from "./dayDetails";
import { MonthNavigation } from "./monthNavigation";

interface MonthAwalProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentAwalMonthMatrix: MatrixCalendarType,
    onSelectSakawiType: (type: SakawiType) => void
}

export const MonthAwal = (props: MonthAwalProps) => {
    const [datesOfCurrentMonth, setDatesOfCurrentMonth] = useState<FullCalendarType[]>([]);
    const [currentAwalMonthMatrix, setCurrentAwalMonthMatrix] = useState(props.currentAwalMonthMatrix);

    React.useEffect(() => {
        function init() {
            // Get date list will be display at current month
            const firstDayOfCurrentAwalMonthIndex = props.fullSakawi.findIndex(x => x.dateAwal.date === 1 && JSON.stringify(x.dateAwal.awalMonth) === JSON.stringify(currentAwalMonthMatrix.awalMonth)); //TODO
            const firstIndex = firstDayOfCurrentAwalMonthIndex - currentAwalMonthMatrix.firstDayOfAwalMonth;
            const lastIndex = firstIndex + 41; // 42 - 1 cells
            const datesOfCurrentMonth = props.fullSakawi.filter((item, index) => index >= firstIndex && index <= lastIndex);
            setDatesOfCurrentMonth(datesOfCurrentMonth);
        }

        init();
    }, [currentAwalMonthMatrix, props.currentAwalMonthMatrix, props.fullSakawi, props.matrixSakawi]);


    function handleGoToToday() {
        setCurrentAwalMonthMatrix(props.currentAwalMonthMatrix);
    }

    function handleGoToPreviousMonth() {
        const index = props.matrixSakawi.findIndex(x => x === currentAwalMonthMatrix);
        setCurrentAwalMonthMatrix(props.matrixSakawi[index - 1]);
    }

    function handleGoToNextMonth() {
        const index = props.matrixSakawi.findIndex(x => x === currentAwalMonthMatrix);
        setCurrentAwalMonthMatrix(props.matrixSakawi[index + 1]);
    }

    // draw Calendar Table
    //let count = 0;
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
                currentAhierMonth={currentAwalMonthMatrix.ahierMonth}
                currentAwalMonth={currentAwalMonthMatrix.awalMonth}
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
        <Container>
            <Row>
                <MonthNavigation
                    sakawiType="sakawiAwal"
                    currentAwalMonth={currentAwalMonthMatrix.awalMonth}
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
