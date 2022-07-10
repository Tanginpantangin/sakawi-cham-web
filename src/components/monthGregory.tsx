import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from '../utility/helper';
import { SakawiType } from "./calendar";
import { DayDetails } from "./dayDetails";
import { MonthNavigation } from "./monthNavigation";

interface MonthGregoryProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[],
    currentGregoryMonth: number,
    currentGregoryYear: number,
    onSelectSakawiType: (type: SakawiType) => void
}

export const MonthGregory = (props: MonthGregoryProps) => {
    const [datesOfCurrentMonth, setDatesOfCurrentMonth] = useState<FullCalendarType[]>([]);
    const [currentGregoryMonth, setCurrentGregoryMonth] = useState(props.currentGregoryMonth);
    const [currentGregoryYear, setCurrentGregoryYear] = useState(props.currentGregoryYear);

    React.useEffect(() => {
        function init() {
            // Gregory Date
            const firstGregoryDate = new Date(currentGregoryYear, currentGregoryMonth, 1);

            // Get date list will be display at current month
            const firstDayOfCurrentGregoryMonthIndex = props.fullSakawi.findIndex(x =>
                x.dateGregory.getDate() === 1
                && x.dateGregory.getMonth() === currentGregoryMonth
                && x.dateGregory.getFullYear() === currentGregoryYear);
            const firstIndex = firstDayOfCurrentGregoryMonthIndex - firstGregoryDate.getDay();
            const lastIndex = firstIndex + 41; // 42 - 1 cells
            const datesOfCurrentMonth = props.fullSakawi.filter((item, index) => index >= firstIndex && index <= lastIndex);
            setDatesOfCurrentMonth(datesOfCurrentMonth);
        }

        init();
    }, [currentGregoryMonth, currentGregoryYear, props.fullSakawi]);

    function handleGoToToday() {
        setCurrentGregoryMonth(props.currentGregoryMonth);
        setCurrentGregoryYear(props.currentGregoryYear);
    }

    function handleGoToPreviousMonth() {
        if (currentGregoryMonth === 0) {
            setCurrentGregoryMonth(11);
            setCurrentGregoryYear(currentGregoryYear - 1);
        } else {
            setCurrentGregoryMonth(currentGregoryMonth - 1);
            setCurrentGregoryYear(currentGregoryYear);
        }
    }

    function handleGoToNextMonth() {
        if (currentGregoryMonth === 11) {
            setCurrentGregoryMonth(0);
            setCurrentGregoryYear(currentGregoryYear + 1);
        } else {
            setCurrentGregoryMonth(currentGregoryMonth + 1);
            setCurrentGregoryYear(currentGregoryYear);
        }
    }

    // draw Calendar Table
    let cells: JSX.Element[] = [];
    let rows: JSX.Element[] = [];

    datesOfCurrentMonth.forEach((item, index) => {
        const dayNumbersOfCurrentAhierMonth = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, item.dateAhier.ahierMonth);
        const dayNumbersOfCurrentAwalMonth = Helper.getDayNumbersOfAwalMonth(item.dateAwal.awalMonth.year, item.dateAwal.awalMonth.month);

        cells.push(
            <DayDetails
                sakawiType="sakawiGregory"
                key={`sakawiGregory-cell-${index}`}
                dateAhier={item.dateAhier}
                dateAwal={item.dateAwal}
                dateGregory={item.dateGregory}
                currentGregoryMonth={currentGregoryMonth}
                currentGregoryYear={currentGregoryYear}
                dayNumbersOfCurrentAhierMonth={dayNumbersOfCurrentAhierMonth}
                dayNumbersOfCurrentAwalMonth={dayNumbersOfCurrentAwalMonth}
            />
        );

        if ((index + 1) % 7 === 0) {
            rows.push(<tr key={`sakawiGregory-row-${index}`}>{cells}</tr>);
            cells = [];
        }
    })

    const dayNames = ["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"];
    const tableStyle: React.CSSProperties = {
        height: "400px",
        tableLayout: "fixed"
    }

    return (
        <Container>
            <Row>
                <MonthNavigation
                    sakawiType="sakawiGregory"
                    currentGregoryMonth={currentGregoryMonth}
                    currentGregoryYear={currentGregoryYear}
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
