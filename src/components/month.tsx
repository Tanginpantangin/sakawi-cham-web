import React from "react";
import { useState } from "react";
import { Container, Row, Col, Table, ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import { Months } from "../enums/enum";
import { Day } from "./day";

interface MonthProps {
    year: number;
    month: number;
}

export const Month = (props: MonthProps) => {
    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(props.month);
    const [firstDateOfMonth, setFirstDateOfMonth] = useState(new Date());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            const firstDate = new Date(year, month, 1);
            setFirstDateOfMonth(firstDate);
            setFirstDayOfMonth(firstDate.getDay());
        }

        init();
    }, [year, month]);

    function addDays(date: Date, numberOfDays: number) {
        let newDt = new Date(date);
        newDt.setDate(date.getDate() + numberOfDays);
        return newDt;
    }

    function handleGoToToday() {
        const nowDate = new Date();
        setMonth(nowDate.getMonth());
        setYear(nowDate.getFullYear());
    }

    function handleGoToPreviousMonth() {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);
            setYear(year - 1);
        }
    }

    function handleGoToNextMonth() {
        if (month + 1 < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);
            setYear(year + 1);
        }
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            let cellDate = addDays(firstDateOfMonth, (count - firstDayOfMonth));
            cells.push(<Day key={`cell${weeks}-${days}`} date={cellDate}></Day>);
            count++
        }

        rows.push(<tr key={weeks}>{cells}</tr>)
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout:"fixed"
    }

    return (
        <Container>
            <Row>
                <Col md={4} style={{textAlign:"left"}}>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="secondary" className="fa fa-chevron-left" onClick={handleGoToPreviousMonth}/>
                            <Button variant="secondary" className="fa fa-chevron-right" onClick={handleGoToNextMonth}/>
                        </ButtonGroup>
                        <ButtonGroup aria-label="Third group" style={{marginLeft: ".75em"}}>
                            <Button variant="secondary" onClick={handleGoToToday}>Today</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col md={4} style={{textAlign:"center"}}>
                    <h2>{Months[month]} {year}</h2>
                </Col>
                <Col md={4}></Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Table striped bordered hover style={tableStyle}>
                        <thead>
                            <tr>
                                {dayNames.map((d, index) =>
                                    <th style={{ padding: "2px", textAlign: "center"}} key={index}>{d}</th>
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
