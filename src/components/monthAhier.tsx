import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { SakawiType } from "./calendar";
import { DayDetails } from "./dayDetails";
import { MonthNavigation } from "./monthNavigation";

interface MonthAhierProps {
    matrixSakawi: MatrixCalendarType[],
    currentAhierMonthMatrix: MatrixCalendarType,
    onSelectSakawiType: (type: SakawiType) => void
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
            let week = 0;
            if (firstDayOfAwalMonth < firstDayOfAhierMonth) {
                week = 7;
            }

            const cellAhierDate = Helper.addAhierDays(props.matrixSakawi, firstDateOfAhierMonth, count - firstDayOfAhierMonth);
            const dateAhier: AhierDate = {
                date: cellAhierDate.date,
                ahierMonth: cellAhierDate.ahierMonth
            }

            const cellAwalDate = Helper.addAwalDays(firstDateOfAwalMonth, count - firstDayOfAwalMonth - week);
            const dateAwal: AwalDate = {
                date: cellAwalDate.date,
                awalMonth: cellAwalDate.awalMonth
            }

            const GregoryDate = Helper.addGregoryDays(firstDateOfGregoryMonth, count - firstDayOfGregoryMonth);
            const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, cellAhierDate.ahierMonth);
            const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(dateAwal.awalMonth.year, dateAwal.awalMonth.month);

            cells.push(
                <DayDetails
                    sakawiType="sakawiAhier"
                    key={`sakawiAhier-cell-${weeks}-${days}`}
                    dateAhier={dateAhier}
                    dateAwal={dateAwal}
                    dateGregory={GregoryDate}
                    currentAhierMonth={currentAhierMonthMatrix.ahierMonth}
                    dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                    dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
                />
            );
            count++;
        }

        rows.push(<tr key={`sakawiAhier-row-${weeks}`}>{cells}</tr>)
    }

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    return (
        <Container>
            <Row>
                <MonthNavigation
                    sakawiType="sakawiAhier"
                    currentAhierMonth={currentAhierMonthMatrix.ahierMonth}
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
