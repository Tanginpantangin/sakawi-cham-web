import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, displayIkasSarakName, displayMonthName, displayNasakName, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { DayAhier } from "./dayAhier";

interface MonthAhierProps {
    matrixSakawi: MatrixCalendarType[],
    currentAhierMonthMatrix: MatrixCalendarType
}

export const MonthAhier = (props: MonthAhierProps) => {
    const initialAhierMonth: AhierMonth = { month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 } };
    const initialAwalMonth: AwalMonth = { month: 0, year: { ikasSarak: 0, yearNumber: 1400 } };
    const initialAhierDate: AhierDate = { date: 1, ahierMonth: initialAhierMonth };
    const initialAwalDate: AwalDate = { date: 1, awalMonth: initialAwalMonth };
    const initialGregoryDate: Date = new Date();

    const [currentAhierMonthMatrix, setCurrentAhierMonthMatrix] = useState(props.currentAhierMonthMatrix);

    const [firstDateOfAhierMonth, setFirstDateOfAhierMonth] = useState<AhierDate>(initialAhierDate);
    const [firstDayOfAhierMonth, setFirstDayOfAhierMonth] = useState(0);

    const [firstDateOfAwalMonth, setFirstDateOfAwalMonth] = useState<AwalDate>(initialAwalDate);
    const [firstDayOfAwalMonth, setFirstDayOfAwalMonth] = useState(0);

    const [firstDateOfGregoryMonth, setFirstDateOfGregoryMonth] = useState<Date>(initialGregoryDate);
    const [firstDayOfGregoryMonth, setFirstDayOfGregoryMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            // Ahier Date
            const firstAhierDate: AhierDate = { date: 1, ahierMonth: currentAhierMonthMatrix.ahierMonth };
            setFirstDateOfAhierMonth(firstAhierDate);
            setFirstDayOfAhierMonth(currentAhierMonthMatrix.firstDayOfAhierMonth);

            // Awal Date
            const firstAwalDate: AwalDate = { date: 1, awalMonth: currentAhierMonthMatrix.awalMonth };
            setFirstDateOfAwalMonth(firstAwalDate);
            setFirstDayOfAwalMonth(currentAhierMonthMatrix.firstDayOfAwalMonth);

            // Gregory Date
            setFirstDateOfGregoryMonth(currentAhierMonthMatrix.dateOfGregoryCalendar);
            setFirstDayOfGregoryMonth(currentAhierMonthMatrix.dateOfGregoryCalendar.getDay());
        }

        init();
    }, [currentAhierMonthMatrix, props.currentAhierMonthMatrix]);

    function handleGoToToday() {
        setCurrentAhierMonthMatrix(props.currentAhierMonthMatrix);
    }

    function handleGoToPreviousMonth() {
        const index = props.matrixSakawi.findIndex(x => x === currentAhierMonthMatrix);
        setCurrentAhierMonthMatrix(props.matrixSakawi[index - 1]);
    }

    function handleGoToNextMonth() {
        const index = props.matrixSakawi.findIndex(x => x === currentAhierMonthMatrix);
        setCurrentAhierMonthMatrix(props.matrixSakawi[index + 1]);
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            let cellAhierDate = Helper.addAhierDays(props.matrixSakawi, firstDateOfAhierMonth, (count - firstDayOfAhierMonth));
            let dateAhier: AhierDate = {
                date: cellAhierDate.date,
                ahierMonth: cellAhierDate.ahierMonth
            }

            let week = 0;
            if (firstDayOfAwalMonth < firstDayOfAhierMonth) {
                week = 7;
            }

            let cellAwalDate = Helper.addAwalDays(firstDateOfAwalMonth, (count - firstDayOfAwalMonth - week));
            let dateAwal: AwalDate = {
                date: cellAwalDate.date,
                awalMonth: cellAwalDate.awalMonth
            }

            let GregoryDate = Helper.addGregoryDays(firstDateOfGregoryMonth, (count - firstDayOfGregoryMonth));

            cells.push(
                <DayAhier
                    key={`cell${weeks}-${days}`}
                    dateAhier={dateAhier}
                    dateAwal={dateAwal}
                    dateGregory={GregoryDate}
                    currentAhierMonth={currentAhierMonthMatrix.ahierMonth}
                />
            );
            count++;
        }

        rows.push(<tr key={weeks}>{cells}</tr>)
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    const currentAhierMonth = currentAhierMonthMatrix.ahierMonth;

    return (
        <Container>
            <Row>
                <Col md={4} style={{ textAlign: "left" }}>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" className="fa fa-chevron-left" onClick={handleGoToPreviousMonth} />
                            <Button variant="secondary" className="fa fa-chevron-right" onClick={handleGoToNextMonth} />
                        </ButtonGroup>
                        <ButtonGroup aria-label="Third group" style={{ marginLeft: ".75em" }}>
                            <Button variant="secondary" onClick={handleGoToToday}>Today</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col md={6} style={{ textAlign: "center" }}>
                    <div>
                        <label className='bilan-title'>{displayMonthName(currentAhierMonth.month)}</label>
                        {' - '}<label className='bilan-title'>{displayNasakName(currentAhierMonth.year.nasak)}</label>
                        {'   '}<label className='ikasSarak-title'>{displayIkasSarakName(currentAhierMonth.year.ikasSarak)}</label>
                    </div>
                    <h5>{AhierMonthEnum[currentAhierMonth.month]} {`(${(currentAhierMonth.month + 1)})`} - {NasakEnum[currentAhierMonth.year.nasak]} {IkasSarakEnum[currentAhierMonth.year.ikasSarak]} - {currentAhierMonth.year.yearNumber}</h5>
                </Col>
                <Col md={2}></Col>
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
