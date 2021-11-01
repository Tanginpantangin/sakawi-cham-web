import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, displayIkasSarakName, displayMonthName, displayNasakName, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";
import Helper from "../utility/helper";
import { DayAhier } from "./dayAhier";

interface MonthAhierProps {
    ahierMonth: AhierMonth;
}

export const MonthAhier = (props: MonthAhierProps) => {
    //const [matrixCalender, setMatrixCalender] = useState<MatrixCalendarType>();
    const [ahierMonth, setAhierMonth] = useState(props.ahierMonth);
    let firstAhierDate: AhierDate = { date: 1, ahierMonth: props.ahierMonth };
    const [firstDateOfAhierMonth, setFirstDateOfAhierMonth] = useState<AhierDate>(firstAhierDate);
    const [firstDayOfAhierMonth, setFirstDayOfAhierMonth] = useState(0);

    let firstAwalDate: AwalDate = { date: 1, awalMonth: { month: 0, year: { ikasSarak: 0, yearNumber: 1400 } } };
    const [firstDateOfAwalMonth, setFirstDateOfAwalMonth] = useState<AwalDate>(firstAwalDate);
    const [firstDayOfAwalMonth, setFirstDayOfAwalMonth] = useState(0);

    const [firstDateOfGregoryMonth, setFirstDateOfGregoryMonth] = useState<Date>(new Date(2019, 3, 4));
    const [firstDayOfGregoryMonth, setFirstDayOfGregoryMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            // Build matrix Calendar
            let matrix = Helper.buildMatrixCalendar(2012);
            console.log('matrix: ' + JSON.stringify(matrix));
            /*let currentAhierMonth = matrix.filter(m => m.ahierMonth.month === ahierMonth.month
                && m.ahierMonth.year.yearNumber === ahierMonth.year.yearNumber)[0];
            //setMatrixCalender(currentAhierMonth);

            // Ahier Date
            let firstAhierDate: AhierDate = { date: 1, ahierMonth: currentAhierMonth.ahierMonth };
            setFirstDateOfAhierMonth(firstAhierDate);
            setFirstDayOfAhierMonth(currentAhierMonth?.firstDayOfAhierMonth);

            // Awal Date
            let firstAwalDate: AwalDate = { date: 1, awalMonth: currentAhierMonth.awalMonth };
            setFirstDateOfAwalMonth(firstAwalDate);
            setFirstDayOfAwalMonth(currentAhierMonth?.firstDayOfAwalMonth);

            // Gregory Date
            setFirstDateOfGregoryMonth(currentAhierMonth.dateOfGregoryCalendar);
            setFirstDayOfGregoryMonth(currentAhierMonth.dateOfGregoryCalendar.getDay());*/
        }

        init();
    }, [ahierMonth]);

    function handleGoToToday() {
        let ahierMonth: AhierMonth = { month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 } };
        setAhierMonth(ahierMonth);
    }

    function handleGoToPreviousMonth() {
        setAhierMonth(Helper.addAhierMonths(ahierMonth, -1));
    }

    function handleGoToNextMonth() {
        setAhierMonth(Helper.addAhierMonths(ahierMonth, 1));
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            let cellAhierDate = Helper.addAhierDays(firstDateOfAhierMonth, (count - firstDayOfAhierMonth));
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

            cells.push(<DayAhier key={`cell${weeks}-${days}`} dateAhier={dateAhier} dateAwal={dateAwal} dateGregory={GregoryDate}></DayAhier>);
            count++;
        }

        rows.push(<tr key={weeks}>{cells}</tr>)
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

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
                        <label className='bilan-title'>{displayMonthName(ahierMonth.month)}</label>
                        {' - '}<label className='bilan-title'>{displayNasakName(ahierMonth.year.nasak)}</label>
                        {'   '}<label className='ikasSarak-title'>{displayIkasSarakName(ahierMonth.year.ikasSarak)}</label>
                    </div>
                    <h5>{AhierMonthEnum[ahierMonth.month]} {`(${(ahierMonth.month + 1)})`} - {NasakEnum[ahierMonth.year.nasak]} {IkasSarakEnum[ahierMonth.year.ikasSarak]} - {ahierMonth.year.yearNumber}</h5>
                </Col>
                <Col md={2}></Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Table striped bordered hover style={tableStyle}>
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
