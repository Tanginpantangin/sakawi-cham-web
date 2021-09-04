import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { addAhierDays, addAhierMonths, AhierDate, AhierMonth } from "../model/AhierDate";
import Helper from "../utility/helper";
import { DayAhier } from "./dayAhier";

interface MonthAhierProps {
    ahierMonth: AhierMonth;
}

export const MonthAhier = (props: MonthAhierProps) => {
    const [ahierMonth, setAhierMonth] = useState(props.ahierMonth);
    let firstDate: AhierDate = { date: 1, ahierMonth: props.ahierMonth };
    const [firstDateOfMonth, setFirstDateOfMonth] = useState<AhierDate>(firstDate);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            // Read Sakawi Takai Ciim
            let startDay = Number.parseInt(Helper.getStartDayByAhierMonth(ahierMonth.year, ahierMonth.month));
            //setFirstDayOfMonth(startDay);

            let firstDate: AhierDate = { date: 1, ahierMonth: ahierMonth };
            //setFirstDateOfMonth(firstDate);
        }

        init();
    }, [ahierMonth]);

    function handleGoToToday() {
        setAhierMonth({month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Takuh, ikasSarak: IkasSarakEnum.Liéh }});
    }

    function handleGoToPreviousMonth() {
        setAhierMonth(addAhierMonths(ahierMonth, -1));
    }

    function handleGoToNextMonth() {
        setAhierMonth(addAhierMonths(ahierMonth, 1));
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            let cellDate = addAhierDays(firstDateOfMonth, (count - firstDayOfMonth + 1));
            let dateAhier: AhierDate = {
                date: cellDate.date,
                ahierMonth: cellDate.ahierMonth
            }
            cells.push(<DayAhier key={`cell${weeks}-${days}`} dateAhier={dateAhier}></DayAhier>);
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
                    <h2>{AhierMonthEnum[ahierMonth.month]} {`(${(ahierMonth.month + 1)})`} - {NasakEnum[ahierMonth.year.nasak]} {IkasSarakEnum[ahierMonth.year.ikasSarak]}</h2>
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
