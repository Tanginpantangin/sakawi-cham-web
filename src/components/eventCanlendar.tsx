import React, { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { displayIkasSarakName, displayNasakName, IkasSarakEnum, SakawiType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import { formatDateParam } from "../utils/dateFormat";
import {
    currentAhierYear,
    getEventsForAhierYear,
    SakawiEventItem
} from "../utils/eventViewModel";
import { getToday } from "../utils/today";
import type { CountDownBarProps } from "./countDownBar";

interface EventCalendarProps {
    matrixSakawi: MatrixCalendarType[];
    fullSakawi: FullCalendarType[];
    nextEvents: CountDownBarProps[];
    areaType: "NinhThuan" | "BinhThuan";
    areaLabel: string;
}

function getEventTypeColorClass(type?: SakawiType) {
    if (type === "sakawiAwal") return "event-card-awal";
    if (type === "sakawiGregory") return "event-card-gregory";
    return "event-card-ahier";
}

function eventCategory(copy: ReturnType<typeof getSiteCopy>, type?: SakawiType) {
    if (type === "sakawiAwal") return copy.calendar.awalDate;
    if (type === "sakawiAhier") return copy.calendar.chamDate;
    return copy.events.event;
}

function fallbackAhierYear(): AhierYear {
    return { nasak: 11, ikasSarak: 7, yearNumber: 2019 };
}

export function getEventDisplayName(copy: ReturnType<typeof getSiteCopy>, event: SakawiEventItem) {
    return copy.events.names[event.eventType] ?? event.info?.latinName ?? event.eventType;
}

function getEventDescription(copy: ReturnType<typeof getSiteCopy>, event: SakawiEventItem) {
    return copy.events.descriptions[event.eventType] ?? event.info?.description;
}

function countdownText(copy: ReturnType<typeof getSiteCopy>, event: SakawiEventItem) {
    if (event.timing === "today") {
        return copy.events.countdownToday;
    }

    if (event.timing === "past") {
        return copy.events.countdownPast.replace("{count}", String(Math.abs(event.daysFromToday)));
    }

    if (event.daysFromToday === 1) {
        return copy.events.countdownTomorrow;
    }

    return copy.events.countdownFuture.replace("{count}", String(event.daysFromToday));
}

function yearTitle(year: AhierYear) {
    return `${displayNasakName(year.nasak).rumiName} ${IkasSarakEnum[year.ikasSarak]} - ${year.yearNumber}`;
}

function yearTitleCham(year: AhierYear) {
    return `${displayNasakName(year.nasak).akharThrahName} - ${displayIkasSarakName(year.ikasSarak)} - ${Helper.convertToChamDigitUnicode(year.yearNumber)}`;
}

interface EventCardProps {
    event: SakawiEventItem;
    headingLevel?: 2 | 3;
    onOpen: (event: SakawiEventItem) => void;
}

const EventCard = ({ event, headingLevel = 3, onOpen }: EventCardProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const eventName = getEventDisplayName(copy, event);
    const description = getEventDescription(copy, event);
    const colorClass = getEventTypeColorClass(event.sakawiType);
    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

    return (
        <button
            type="button"
            className={`event-list-card event-app-card ${colorClass} ${event.timing === "past" ? "event-card-past" : ""}`}
            aria-label={`${eventName}, ${countdownText(copy, event)}`}
            onClick={() => onOpen(event)}
        >
            <span className="circle-event-type" aria-hidden="true"></span>
            <div className="event-list-main">
                {event.info?.akharThrahName && <div className="event-cham-name">{event.info.akharThrahName}</div>}
                <HeadingTag>{eventName}</HeadingTag>
                {description && <p>{description}</p>}
            </div>
            <div className="event-list-meta">
                <strong className={`event-status event-status-${event.timing}`}>
                    {countdownText(copy, event)}
                </strong>
                <span className="event-card-action">{copy.actions.readMore}</span>
            </div>
        </button>
    );
};

export const EventCalendar = (props: EventCalendarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const [currentYear, setCurrentYear] = useState<AhierYear>(() => currentAhierYear(props.matrixSakawi) ?? fallbackAhierYear());
    const [selectedEvent, setSelectedEvent] = useState<SakawiEventItem | undefined>();
    const locale = language === "vi" ? "vi-VN" : "en-US";

    useEffect(() => {
        const nextCurrentYear = currentAhierYear(props.matrixSakawi);
        if (nextCurrentYear) {
            setCurrentYear(nextCurrentYear);
        }
    }, [props.matrixSakawi]);

    const yearlyEvents = useMemo(
        () => getEventsForAhierYear(props.matrixSakawi, props.fullSakawi, currentYear),
        [currentYear, props.fullSakawi, props.matrixSakawi]
    );
    const visibleUpcoming = yearlyEvents.upcoming;
    const visiblePast = yearlyEvents.past;

    function handleCurrentYear() {
        const nextCurrentYear = currentAhierYear(props.matrixSakawi, getToday());
        if (nextCurrentYear) {
            setCurrentYear(nextCurrentYear);
        }
    }

    function handlePreviousYear() {
        setCurrentYear(Helper.addAhierYears(currentYear, -1));
    }

    function handleNextYear() {
        setCurrentYear(Helper.addAhierYears(currentYear, 1));
    }

    function renderEventSection(id: string, title: string, description: string, events: SakawiEventItem[], emptyText: string) {
        return (
            <section className="event-section" aria-labelledby={`${id}-heading`}>
                <div className="section-heading-row">
                    <div>
                        <h2 id={`${id}-heading`}>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                {events.length > 0 ? (
                    <div className="event-list">
                        {events.map((event, index) => (
                            <EventCard event={event} onOpen={setSelectedEvent} key={`${event.eventType}-${event.eventDate.toISOString()}-${index}`} />
                        ))}
                    </div>
                ) : (
                    <p className="event-empty">{emptyText}</p>
                )}
            </section>
        );
    }

    return (
        <div className="event-calendar" data-region={props.areaType}>
            <section className="event-year-section" aria-labelledby="event-year-heading">
                <div className="event-year-heading">
                    <div className="event-year-title-group">
                        <p className="page-eyebrow">{props.areaLabel}</p>
                        <h2 id="event-year-heading">{copy.events.yearTitle.replace("{year}", String(currentYear.yearNumber))}</h2>
                        <p className="event-year-name">
                            <span className="event-year-name-cham">{yearTitleCham(currentYear)}</span>
                            <span>{yearTitle(currentYear)}</span>
                        </p>
                    </div>
                    <ButtonGroup aria-label={copy.events.yearNavigationLabel} className="event-year-actions">
                        <Button variant="outline-secondary" onClick={handlePreviousYear} aria-label={copy.events.previousYear}>
                            {copy.events.previous}
                        </Button>
                        <Button variant="secondary" onClick={handleCurrentYear} aria-label={copy.events.currentYear}>
                            {copy.events.currentYear}
                        </Button>
                        <Button variant="outline-secondary" onClick={handleNextYear} aria-label={copy.events.nextYear}>
                            {copy.events.next}
                        </Button>
                    </ButtonGroup>
                </div>

                {renderEventSection("year-upcoming-events", copy.events.yearUpcoming, copy.events.yearUpcomingDescription, visibleUpcoming, copy.events.noYearUpcomingEvents)}
                {renderEventSection("past-events", copy.events.past, copy.events.pastDescription, visiblePast, copy.events.noPastEvents)}
            </section>
            <Modal
                show={Boolean(selectedEvent)}
                onHide={() => setSelectedEvent(undefined)}
                centered
                scrollable
                dialogClassName="event-detail-dialog"
                aria-labelledby="event-detail-title"
            >
                {selectedEvent && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title id="event-detail-title">{getEventDisplayName(copy, selectedEvent)}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={`event-dialog-content ${getEventTypeColorClass(selectedEvent.sakawiType)}`}>
                                {selectedEvent.info?.akharThrahName && <div className="event-cham-name">{selectedEvent.info.akharThrahName}</div>}
                                {getEventDescription(copy, selectedEvent) && <p>{getEventDescription(copy, selectedEvent)}</p>}
                                <dl className="event-dialog-details">
                                    <div>
                                        <dt>{copy.events.date}</dt>
                                        <dd>
                                            <time dateTime={formatDateParam(selectedEvent.eventDate)}>
                                                {selectedEvent.eventDate.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
                                            </time>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>{copy.events.category}</dt>
                                        <dd>{eventCategory(copy, selectedEvent.sakawiType)}</dd>
                                    </div>
                                    <div>
                                        <dt>{copy.events.daysRemaining}</dt>
                                        <dd>
                                            <strong className={`event-status event-status-${selectedEvent.timing}`}>
                                                {countdownText(copy, selectedEvent)}
                                            </strong>
                                        </dd>
                                    </div>
                                    {selectedEvent.calendarContext && (
                                        <div>
                                            <dt>{eventCategory(copy, selectedEvent.sakawiType)}</dt>
                                            <dd>
                                                <span className="detail-cham">{selectedEvent.calendarContext.akharThrah}</span>
                                                <span>{selectedEvent.calendarContext.latin}</span>
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                                <Link
                                    className="download-button event-dialog-link"
                                    to={`/calendar?date=${formatDateParam(selectedEvent.eventDate)}`}
                                    onClick={() => setSelectedEvent(undefined)}
                                >
                                    {copy.events.openCalendar}
                                </Link>
                            </div>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </div>
    );
};
