import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { SakawiType } from "./calendar";
import { DayDetails } from "./dayDetails";

interface MonthGregoryProps {
    matrixSakawi: MatrixCalendarType[],
    currentGregoryMonthMatrix: MatrixCalendarType,
    onSelectSakawiType: (type: SakawiType) => void
}

export const MonthGregory = (props: MonthGregoryProps) => {
    const initialAhierMonth: AhierMonth = { month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 } };
    const initialAwalMonth: AwalMonth = { month: 0, year: { ikasSarak: 0, yearNumber: 1400 } };
    const initialAhierDate: AhierDate = { date: 1, ahierMonth: initialAhierMonth };
    const initialAwalDate: AwalDate = { date: 1, awalMonth: initialAwalMonth };
    const initialGregoryDate: Date = new Date();

    const [currentGregoryMonthMatrix, setCurrentGregoryMonthMatrix] = useState(props.currentGregoryMonthMatrix);

    const [firstDateOfAhierMonth, setFirstDateOfAhierMonth] = useState<AhierDate>(initialAhierDate);
    const [firstDayOfAhierMonth, setFirstDayOfAhierMonth] = useState(0);

    const [firstDateOfAwalMonth, setFirstDateOfAwalMonth] = useState<AwalDate>(initialAwalDate);
    const [firstDayOfAwalMonth, setFirstDayOfAwalMonth] = useState(0);

    const [firstDateOfGregoryMonth, setFirstDateOfGregoryMonth] = useState<Date>(initialGregoryDate);

    React.useEffect(() => {
        function init() {
            // Ahier Date
            const firstAhierDate: AhierDate = { date: 1, ahierMonth: currentGregoryMonthMatrix.ahierMonth };
            setFirstDateOfAhierMonth(firstAhierDate);
            setFirstDayOfAhierMonth(currentGregoryMonthMatrix.firstDayOfAhierMonth);

            // Awal Date
            const firstAwalDate: AwalDate = { date: 1, awalMonth: currentGregoryMonthMatrix.awalMonth };
            setFirstDateOfAwalMonth(firstAwalDate);
            setFirstDayOfAwalMonth(currentGregoryMonthMatrix.firstDayOfAwalMonth);

            // Gregory Date
            setFirstDateOfGregoryMonth(currentGregoryMonthMatrix.dateOfGregoryCalendar);
            //setFirstDayOfGregoryMonth(currentGregoryMonthMatrix.dateOfGregoryCalendar.getDay());
        }

        init();
    }, [currentGregoryMonthMatrix, props.currentGregoryMonthMatrix]);

    function handleGoToToday() {
        setCurrentGregoryMonthMatrix(props.currentGregoryMonthMatrix);
    }

    function handleGoToPreviousMonth() {
        const index = props.matrixSakawi.findIndex(x => x === currentGregoryMonthMatrix);
        setCurrentGregoryMonthMatrix(props.matrixSakawi[index - 1]);
    }

    function handleGoToNextMonth() {
        const index = props.matrixSakawi.findIndex(x => x === currentGregoryMonthMatrix);
        setCurrentGregoryMonthMatrix(props.matrixSakawi[index + 1]);
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            const daysGap = Helper.getAhierAwalDaysGap(firstDayOfAhierMonth, firstDayOfAwalMonth);

            const cellAwalDate = Helper.addAwalDays(firstDateOfAwalMonth, (count - firstDayOfAwalMonth));
            const dateAwal: AwalDate = {
                date: cellAwalDate.date,
                awalMonth: cellAwalDate.awalMonth
            }

            const cellAhierDate = Helper.addAhierDays(props.matrixSakawi, firstDateOfAhierMonth, (count + daysGap));
            const dateAhier: AhierDate = {
                date: cellAhierDate.date,
                ahierMonth: cellAhierDate.ahierMonth
            }

            const GregoryDate = Helper.addGregoryDays(firstDateOfGregoryMonth, (count + daysGap));
            const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, cellAhierDate.ahierMonth);
            const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(dateAwal.awalMonth.year, dateAwal.awalMonth.month);

            cells.push(
                <DayDetails
                    sakawiType="sakawiGregory"
                    key={`sakawiGregory-cell-${weeks}-${days}`}
                    dateAhier={dateAhier}
                    dateAwal={dateAwal}
                    dateGregory={GregoryDate}
                    currentAhierMonth={currentGregoryMonthMatrix.ahierMonth}
                    currentAwalMonth={currentGregoryMonthMatrix.awalMonth}
                    dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                    dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
                />
            );
            count++;
        }

        rows.push(<tr key={`sakawiGregory-row-${weeks}`}>{cells}</tr>)
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup aria-label="Type of calendar">
                            <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Chăm</Button>
                            <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiAwal')}>Lịch Awal</Button>
                            <Button variant="secondary">Dương lịch</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col md={5} style={{ textAlign: "center" }}>
                    <h2>{currentGregoryMonthMatrix.dateOfGregoryCalendar.getMonth} {currentGregoryMonthMatrix.dateOfGregoryCalendar.setFullYear}</h2>
                </Col>
                <Col md={3} style={{ textAlign: "left" }}>
                    <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-end" }}>
                        <ButtonGroup aria-label="Third group" style={{ marginRight: ".75em" }}>
                            <Button variant="secondary" onClick={handleGoToToday}>Hôm nay</Button>
                        </ButtonGroup>
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" className="fa fa-chevron-left" onClick={handleGoToPreviousMonth} />
                            <Button variant="secondary" className="fa fa-chevron-right" onClick={handleGoToNextMonth} />
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
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
