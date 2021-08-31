import React, { useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, Col, Container, Row, Table } from "react-bootstrap";
import { AwalMonthEnum, IkasSarakEnum } from "../enums/enum";
import { addAwalMonths, AwalDate, AwalMonth, AwalYear } from "../model/AwalDate";
import Helper from '../utility/helper';
import { DayAwal } from "./dayAwal";

interface MonthAwalProps {
    year: AwalYear;
    month: AwalMonthEnum;
}

export const MonthAwal = (props: MonthAwalProps) => {
    const [year, setYear] = useState(props.year);
    const [month, setMonth] = useState(props.month);
    let firstDate: AwalDate = { date: 1, month: props.month, year: props.year };
    const [firstDateOfMonth, setFirstDateOfMonth] = useState<AwalDate>(firstDate);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    React.useEffect(() => {
        function init() {
            // Read Sakawi Takai Ciim
            let startDay = Number.parseInt(Helper.getStartDayByAwalMonth(year, month));
            setFirstDayOfMonth(startDay);

            let firstDate: AwalDate = { date: 1, month: month, year: year };
            setFirstDateOfMonth(firstDate);


        }

        init();
    }, [year, month]);



    function addDays(currentDate: AwalDate, addedDays: number) {
        let result: AwalDate = {
            date: 1,
            month: AwalMonthEnum.Jamadilakhir,
            year: { ikasSarak: IkasSarakEnum.Liéh }
        };

        let numberOfDays = Helper.getDayNumbersOfAwalMonth(currentDate.year, currentDate.month);
        let newDays = currentDate.date + addedDays;
        let newMonth = currentDate.month;
        let newYear = currentDate.year;

        if (newDays > numberOfDays) {
            if (currentDate.month < 11) {
                newMonth = currentDate.month + 1;
            } else {
                newMonth = 0;

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

                if (currentDate.year.ikasSarak > 0) {
                    newYear.ikasSarak = currentDate.year.ikasSarak - 1;
                } else {
                    newYear.ikasSarak = 7;
                }
            }

            result = {
                date: Helper.getDayNumbersOfAwalMonth(currentDate.year, currentDate.month - 1) + newDays,
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

        setMonth(AwalMonthEnum.Syafar);
        setYear({ ikasSarak: IkasSarakEnum.Hak });
    }

    function handleGoToPreviousMonth() {
        if (month > 0) {
            setMonth(month - 1);
        } else {
            setMonth(11);

            if (year.ikasSarak > 0) {
                setYear({ ikasSarak: year.ikasSarak - 1 });
            } else {
                setYear({ ikasSarak: 7 });
            }
        }
    }

    function handleGoToNextMonth() {
        if (month < 11) {
            setMonth(month + 1);
        } else {
            setMonth(0);

            if (year.ikasSarak < 7) {
                setYear({ ikasSarak: year.ikasSarak + 1 });
            } else {
                setYear({ ikasSarak: 0 });
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
            let dateAwal: AwalDate = {
                date: cellDate.date,
                month: cellDate.month,
                year: cellDate.year
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
                    <h2>{AwalMonthEnum[month]} {`(${(month + 1)})`} - {IkasSarakEnum[year.ikasSarak]}</h2>
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
