import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IkasSarakEnum, NasakEnum, SakawiType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import { formatDateParam } from "../utils/dateFormat";
import { YearNavigation } from "./yearNavigation";

interface EventCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
}

export const EventCalendar = (props: EventCalendarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const initialAhierYear: AhierYear = { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 };
    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');
    const [currentAhierYear, setCurrentAhierYear] = useState<AhierYear>(initialAhierYear);
    const [eventFilter, setEventFilter] = useState<"upcoming" | "all">("upcoming");

    React.useEffect(() => {
        const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
            Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
        if (currentAhierMonthMatrix) {
            setCurrentAhierYear(currentAhierMonthMatrix.ahierMonth.year);
        }
    }, [props.matrixSakawi]);

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
            setCurrentAhierYear(Helper.addAhierYears(currentAhierYear, -1));
        }
    }

    function handleOnClickNextYear() {
        if (sakawiType === "sakawiAhier") {
            setCurrentAhierYear(Helper.addAhierYears(currentAhierYear, 1));
        }
    }

    function getEventTypeColor(type?: SakawiType) {
        if (type === 'sakawiAhier') {
            return '#F15A25';
        }

        if (type === 'sakawiAwal') {
            return '#007A3D';
        }

        return '#2f80ed';
    }

    function getEvents(currentYear: AhierYear) {
        const datesOfAhierYear = props.fullSakawi.filter(x => JSON.stringify(x.dateAhier.ahierMonth.year) === JSON.stringify(currentYear));
        const events = Helper.getEventsInAhierYear(props.matrixSakawi, datesOfAhierYear)
            .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        return eventFilter === "all"
            ? events
            : events.filter((event) => event.eventDate >= startOfToday);
    }

    function daysRemaining(date: Date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86400000));
    }

    const events = getEvents(currentAhierYear);

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
                    <div className="event-filter-row">
                        <ButtonGroup aria-label={copy.events.title}>
                            <Button variant={eventFilter === "upcoming" ? "secondary" : "outline-secondary"} onClick={() => setEventFilter("upcoming")}>
                                {copy.events.upcoming}
                            </Button>
                            <Button variant={eventFilter === "all" ? "secondary" : "outline-secondary"} onClick={() => setEventFilter("all")}>
                                {copy.events.all}
                            </Button>
                        </ButtonGroup>
                    </div>
                    {events.length > 0 ? (
                        <div className="event-list">
                            {events.map((item, index) => {
                                const eventInfo = Helper.displayEventDay(item.eventType);
                                const eventType = eventInfo?.sakawiType as SakawiType | undefined;
                                const typeLabel = eventType === "sakawiAwal"
                                    ? copy.calendar.awalDate
                                    : eventType === "sakawiAhier"
                                        ? copy.calendar.chamDate
                                        : copy.events.event;

                                return (
                                    <article className="event-list-card" key={`${item.eventType}-${item.eventDate.toISOString()}-${index}`}>
                                        <span style={{ backgroundColor: getEventTypeColor(eventType) }} className='circle-event-type'></span>
                                        <div className="event-list-main">
                                            {eventInfo?.akharThrahName &&
                                                <div className='event-cham-name'>{eventInfo.akharThrahName}</div>
                                            }
                                            <h2>{eventInfo?.latinName ?? item.eventType}</h2>
                                            {eventInfo?.vnName && <p>{eventInfo.vnName}</p>}
                                            {eventInfo?.description && <small>{eventInfo.description}</small>}
                                        </div>
                                        <div className="event-list-meta">
                                            <span>{copy.events.date}: {Helper.displayDateString(item.eventDate)}</span>
                                            <span>{copy.events.category}: {typeLabel}</span>
                                            <span>{copy.events.daysRemaining}: {daysRemaining(item.eventDate)}</span>
                                            <Link to={`/calendar?date=${formatDateParam(item.eventDate)}`}>{copy.events.openCalendar}</Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="event-empty">{copy.events.noEvents}</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
