import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { SakawiType } from "../pages/monthCalendarPage";
import { YearNavigation } from "./yearNavigation";

interface EventCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
}

export const EventCalendar = (props: EventCalendarProps) => {
    const initialAhierYear: AhierYear = { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 };
    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');
    const [currentAhierYear, setCurrentAhierYear] = useState<AhierYear>(initialAhierYear);

    React.useEffect(() => {
        function init() {
            // Set current matrix item 
            const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonthMatrix) {
                setCurrentAhierYear(currentAhierMonthMatrix.ahierMonth.year);
            }

            // TODO
            // const datesOfAhierYear = props.fullSakawi.filter(x => JSON.stringify(x.dateAhier.ahierMonth.year) === JSON.stringify(currentAhierMonthMatrix.ahierMonth.year));
            // const nextEvents = Helper.getEventsInAhierYear(props.matrixSakawi, datesOfAhierYear);
            // setEvents(nextEvents);
        }

        init();
    }, [props.fullSakawi, props.matrixSakawi]);

    function handleOnClickToCurrentYear() {
        if (sakawiType === "sakawiAhier") {
            const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonthMatrix) {
                setCurrentAhierYear(currentAhierMonthMatrix.ahierMonth.year);
            }
        }
    }

    function handleOnClickPreviousYear() {
        if (sakawiType === "sakawiAhier") {
            const newAhierYear = Helper.addAhierYears(currentAhierYear, -1);
            setCurrentAhierYear(newAhierYear);
        }
    }

    function handleOnClickNextYear() {
        if (sakawiType === "sakawiAhier") {
            const newAhierYear = Helper.addAhierYears(currentAhierYear, 1);
            setCurrentAhierYear(newAhierYear);
        }
    }

    function renderRows(currentAhierYear: AhierYear) {
        const datesOfAhierYear = props.fullSakawi.filter(x => JSON.stringify(x.dateAhier.ahierMonth.year) === JSON.stringify(currentAhierYear));
        const nextEvents = Helper.getEventsInAhierYear(props.matrixSakawi, datesOfAhierYear);

        let rows: JSX.Element[] = [];
        nextEvents.forEach((item, index) => {
            rows.push(
                <tr key={`event-row-${index}`}>
                    <td>{Helper.displayDateString(item.eventDate)}</td>
                    <td>{item.eventType.toString()}</td>
                </tr>);
        });

        return rows;
    }

    return (
        <Container>
            <Row>
                <YearNavigation
                    sakawiType={sakawiType}
                    currentAhierYear={currentAhierYear}
                    onClickToday={handleOnClickToCurrentYear}
                    onClickPreviousYear={handleOnClickPreviousYear}
                    onClickNextYear={handleOnClickNextYear}
                    onSelectSakawiType={type => setSakawiType(type)}
                />
            </Row>
            <Row>
                <Col md={2}></Col>
                <Col md={8}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ngày Dương lịch</th>
                                <th>Sự kiện / Lễ hội</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows(currentAhierYear)}
                        </tbody>
                    </Table>
                </Col>
                <Col md={2}></Col>
            </Row>
        </Container>
    );
}