import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierYear } from "../model/AhierDate";
import Helper from "../utility/helper";
import { DayAhier } from "./dayAhier";

interface MonthAhierProps {
    year: AhierYear;
    month: AhierMonthEnum;
}

export const MonthAhier = (props: MonthAhierProps) => {
    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(props.month);
    let firstDate: AhierDate = { date: 1, month: props.month, year: props.year };
    const [firstDateOfMonth, setFirstDateOfMonth] = useState<AhierDate>(firstDate);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            // Read Sakawi Takai Ciim
            let startDay = Number.parseInt(Helper.getStartDayByAhierMonth(year, month));
            setFirstDayOfMonth(startDay);

            let firstDate: AhierDate = { date: 1, month: month, year: year };
            setFirstDateOfMonth(firstDate);
        }

        //init();
    }, [year, month]);

    function addDays(currentDate: AhierDate, addedDays: number) {
        let result: AhierDate = {
            date: 1,
            month: AhierMonthEnum.BilanSa,
            year: { nasak: NasakEnum.Kabaw, ikasSarak: IkasSarakEnum.Hak }
        };

        let numberOfDays = Helper.getDayNumbersOfAhierMonth(currentDate.year, currentDate.month);
        let newDays = currentDate.date + addedDays;
        let newMonth = currentDate.month;
        let newYear = currentDate.year;

        if (newDays > numberOfDays) {
            if (currentDate.month < 11) {
                newMonth = currentDate.month + 1;
            } else {
                newMonth = 0;

                // Nasak
                if (currentDate.year.nasak < 11) {
                    newYear.nasak = currentDate.year.nasak + 1;
                } else {
                    newYear.nasak = 0;
                }

                // Ikas Sarak
                if (currentDate.year.ikasSarak < 7) {
                    newYear.ikasSarak = currentDate.year.ikasSarak + 1;
                } else {
                    newYear.ikasSarak = 0;
                }
            }

            result = {
                date: newDays - numberOfDays,
                month: newMonth,
                year: newYear
            };

        } else if (newDays <= 0) {
            if (currentDate.month > 0) {
                newMonth = currentDate.month - 1;
            } else {
                newMonth = 11;

                // Nasak
                if (currentDate.year.nasak > 0) {
                    newYear.nasak = currentDate.year.nasak - 1;
                } else {
                    newYear.nasak = 11;
                }

                // Ikas Sarak
                if (currentDate.year.ikasSarak > 0) {
                    newYear.ikasSarak = currentDate.year.ikasSarak - 1;
                } else {
                    newYear.ikasSarak = 7;
                }
            }

            result = {
                date: Helper.getDayNumbersOfAhierMonth(currentDate.year, currentDate.month - 1) + newDays,
                month: newMonth,
                year: newYear
            };
        }
        else {
            result = {
                date: newDays,
                month: currentDate.month,
                year: currentDate.year
            };
        }

        return result;
    }

    function handleGoToToday() {
        setMonth(AhierMonthEnum.BilanSa);
        setYear({ nasak: NasakEnum.Kabaw, ikasSarak: IkasSarakEnum.Hak });
    }

    function handleGoToPreviousMonth() {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);

            // Nasak
            if (year.nasak > 0) {
                setYear({ nasak: year.nasak - 1, ikasSarak: year.ikasSarak - 1 });
            } else {
                setYear({ nasak: 11, ikasSarak: year.ikasSarak - 1 });
            }

            // Ikas Sarak
            if (year.ikasSarak > 0) {
                setYear({ nasak: year.nasak - 1, ikasSarak: year.ikasSarak - 1 });
            } else {
                setYear({ nasak: year.nasak - 1, ikasSarak: 7 });
            }
        }
    }

    function handleGoToNextMonth() {
        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);

            // Nasak
            if (year.nasak < 11) {
                setYear({ nasak: year.nasak + 1, ikasSarak: year.ikasSarak + 1 });
            } else {
                setYear({ nasak: 0, ikasSarak: year.ikasSarak + 1 });
            }

            // Ikas Sarak
            if (year.ikasSarak < 7) {
                setYear({ nasak: year.nasak + 1, ikasSarak: year.ikasSarak + 1 });
            } else {
                setYear({ nasak: year.nasak + 1, ikasSarak: 0 });
            }
        }
    }

    // draw Calendar Table
    let count = 0;
    let rows = [];

    for (let weeks = 0; weeks < 6; weeks++) {
        let cells = []
        for (let days = 0; days < 7; days++) {
            let cellDate = addDays(firstDateOfMonth, (count - firstDayOfMonth + 1));
            let dateAhier: AhierDate = {
                date: cellDate.date,
                month: cellDate.month,
                year: cellDate.year
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
                    <h2>{AhierMonthEnum[month]} {`(${(month + 1)})`} - {NasakEnum[year.nasak]} {IkasSarakEnum[year.ikasSarak]}</h2>
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
