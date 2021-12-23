import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, AwalMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { SakawiType } from "./calendar";
import { DayDetails } from "./dayDetails";

interface MonthAwalProps {
    matrixSakawi: MatrixCalendarType[],
    currentAwalMonthMatrix: MatrixCalendarType,
    onSelectSakawiType: (type: SakawiType) => void
}

export const MonthAwal = (props: MonthAwalProps) => {
    const initialAhierMonth: AhierMonth = { month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 } };
    const initialAwalMonth: AwalMonth = { month: 0, year: { ikasSarak: 0, yearNumber: 1400 } };
    const initialAhierDate: AhierDate = { date: 1, ahierMonth: initialAhierMonth };
    const initialAwalDate: AwalDate = { date: 1, awalMonth: initialAwalMonth };
    const initialGregoryDate: Date = new Date();

    const [currentAwalMonthMatrix, setCurrentAwalMonthMatrix] = useState(props.currentAwalMonthMatrix);

    const [firstDateOfAhierMonth, setFirstDateOfAhierMonth] = useState<AhierDate>(initialAhierDate);
    const [firstDayOfAhierMonth, setFirstDayOfAhierMonth] = useState(0);

    const [firstDateOfAwalMonth, setFirstDateOfAwalMonth] = useState<AwalDate>(initialAwalDate);
    const [firstDayOfAwalMonth, setFirstDayOfAwalMonth] = useState(0);

    const [firstDateOfGregoryMonth, setFirstDateOfGregoryMonth] = useState<Date>(initialGregoryDate);
    //const [firstDayOfGregoryMonth, setFirstDayOfGregoryMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            //console.log('props.currentAwalMonthMatrix', JSON.stringify(props.currentAwalMonthMatrix));

            // Ahier Date
            const firstAhierDate: AhierDate = { date: 1, ahierMonth: currentAwalMonthMatrix.ahierMonth };
            setFirstDateOfAhierMonth(firstAhierDate);
            setFirstDayOfAhierMonth(currentAwalMonthMatrix.firstDayOfAhierMonth);

            // Awal Date
            const firstAwalDate: AwalDate = { date: 1, awalMonth: currentAwalMonthMatrix.awalMonth };
            setFirstDateOfAwalMonth(firstAwalDate);
            setFirstDayOfAwalMonth(currentAwalMonthMatrix.firstDayOfAwalMonth);

            // Gregory Date
            setFirstDateOfGregoryMonth(currentAwalMonthMatrix.dateOfGregoryCalendar);
            //setFirstDayOfGregoryMonth(currentAwalMonthMatrix.dateOfGregoryCalendar.getDay());
        }

        init();
    }, [currentAwalMonthMatrix, props.currentAwalMonthMatrix]);


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
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            // let week = 0;
            // if (firstDayOfAwalMonth < firstDayOfAhierMonth) {
            //     week = 7;
            // }

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
                    sakawiType="sakawiAwal"
                    key={`sakawiAwal-cell-${weeks}-${days}`}
                    dateAhier={dateAhier}
                    dateAwal={dateAwal}
                    dateGregory={GregoryDate}
                    currentAhierMonth={currentAwalMonthMatrix.ahierMonth}
                    currentAwalMonth={currentAwalMonthMatrix.awalMonth}
                    dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                    dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
                />
            );
            count++;
        }

        rows.push(<tr key={`sakawiAwal-row-${weeks}`}>{cells}</tr>)
    }

    const dayNames = ["Adit", "Thom", "Angar", "But", "Jip", "Suk", "Sanacar"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    const currentAwalMonth = currentAwalMonthMatrix.awalMonth;

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-start" }}>
                        <ButtonGroup aria-label="Type of calendar">
                            <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Chăm</Button>
                            <Button variant="secondary">Lịch Awal</Button>
                            <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiGregory')}>Dương lịch</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col md={5} style={{ textAlign: "center" }}>
                    <h2>{AwalMonthEnum[currentAwalMonth.month]} {`(${(currentAwalMonth.month + 1)})`} - {IkasSarakEnum[currentAwalMonth.year.ikasSarak]} - {currentAwalMonth.year.yearNumber}</h2>
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
