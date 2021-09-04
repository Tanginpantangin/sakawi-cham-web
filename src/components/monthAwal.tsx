import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";
import { addAwalDays, addAwalMonths, AwalDate, AwalMonth } from "../model/AwalDate";
import Helper from '../utility/helper';
import { DayAwal } from "./dayAwal";

interface MonthAwalProps {
    awalMonth: AwalMonth;
}

export const MonthAwal = (props: MonthAwalProps) => {
    const [awalMonth, setAwalMonth] = useState(props.awalMonth);
    let firstDate: AwalDate = { date: 1, awalMonth: props.awalMonth};
    const [firstDateOfMonth, setFirstDateOfMonth] = useState<AwalDate>(firstDate);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            // Read Sakawi Takai Ciim
            let startDay = Number.parseInt(Helper.getStartDayByAwalMonth(awalMonth.year, awalMonth.month));
            //setFirstDayOfMonth(startDay);

            let firstDate: AwalDate = { date: 1, awalMonth: awalMonth };
            //setFirstDateOfMonth(firstDate);
        }

        init();
    }, [awalMonth]);

    function handleGoToToday() {
        /*let result = Helper.getAwalDateByGregoryDate(new Date(2016, 9, 2));
        console.log('2016, 9, 2 => ', JSON.stringify(result));*/

        /*let startAhierYear: AhierYear = {
            nasak: Nasak.Pabuei,
            ikasSarak: IkasSarak.Jim,
            yearNumber: 2019
        }

        let newYear = addAhierYears(startAhierYear, -1);
        console.log('new year: ' + JSON.stringify(newYear))*/

        /*let matrix = Helper.buildMatrixCalendar(2020);
        console.log('matrix: ' + JSON.stringify(matrix))*/

        const awalMonth: AwalMonth = { month: 0, year: { ikasSarak: IkasSarakEnum.Liéh, yearNumber: 2020 } };
        let newMonth = addAwalMonths(awalMonth, -13);
        console.log('addAwalMonths : ' + JSON.stringify(newMonth))

        setAwalMonth({month: 0, year: {ikasSarak: IkasSarakEnum.Liéh}});
    }

    function handleGoToPreviousMonth() {
        setAwalMonth(addAwalMonths(awalMonth, -1));
    }

    function handleGoToNextMonth() {
        setAwalMonth(addAwalMonths(awalMonth, 1));
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            let cellDate = addAwalDays(firstDateOfMonth, (count - firstDayOfMonth + 1));
            let dateAwal: AwalDate = {
                date: cellDate.date,
                awalMonth: cellDate.awalMonth,
            }

            cells.push(<DayAwal key={`cell${weeks}-${days}`} dateAwal={dateAwal}></DayAwal>);
            count++
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
                <Col md={5} style={{ textAlign: "center" }}>
                    <h2>{AwalMonthEnum[awalMonth.month]} {`(${(awalMonth.month + 1)})`} - {IkasSarakEnum[awalMonth.year.ikasSarak]}</h2>
                </Col>
                <Col md={3}></Col>
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
