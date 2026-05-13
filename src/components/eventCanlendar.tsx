import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { IkasSarakEnum, NasakEnum, SakawiType } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
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

    function getEventTypeColor(sakawiType?: SakawiType) {
        if (sakawiType === 'sakawiAhier') {
            return '#F15A25';
        }

        if (sakawiType === 'sakawiAwal') {
            return '#007A3D';
        }

        return '#2f80ed';
    }

    function renderRows(currentAhierYear: AhierYear) {
        const datesOfAhierYear = props.fullSakawi.filter(x => JSON.stringify(x.dateAhier.ahierMonth.year) === JSON.stringify(currentAhierYear));
        const nextEvents = Helper.getEventsInAhierYear(props.matrixSakawi, datesOfAhierYear);

        let rows: JSX.Element[] = [];
        nextEvents.forEach((item, index) => {
            rows.push(
                <tr key={`event-row-${index}`}>
                    <td className="event-date-cell" data-label="Ngày Dương lịch">{Helper.displayDateString(item.eventDate)}</td>
                    <td className="event-type-cell" data-label="">
                        <span style={{ backgroundColor: getEventTypeColor(Helper.displayEventDay(item.eventType)?.sakawiType as SakawiType | undefined) }} className='circle-event-type'></span>
                    </td>
                    <td className="event-name-cell" data-label="Sự kiện / Lễ hội">
                        <div className='event-cham-name'>
                            {Helper.displayEventDay(item.eventType)?.akharThrahName}
                        </div>
                        <span className="event-latin-name">{Helper.displayEventDay(item.eventType)?.latinName}</span>
                    </td>
                    <td className="event-vn-name-cell" data-label="Tên tiếng Việt">{Helper.displayEventDay(item.eventType)?.vnName}</td>
                </tr>);
        });

        return rows;
    }

    return (
        <Container className="event-calendar">
            <Row className="calendar-nav">
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
                <Col>
                    <div className="event-table-wrap">
                        <Table hover className="event-table">
                            <thead>
                                <tr>
                                    <th>Ngày Dương lịch</th>
                                    <th></th>
                                    <th colSpan={2}>Sự kiện / Lễ hội</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderRows(currentAhierYear)}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
