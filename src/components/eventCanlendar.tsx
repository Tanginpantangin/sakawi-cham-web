import React, { useEffect, useMemo, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
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
    getUpcomingMainEvents,
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
    featured?: boolean;
}

const EventCard = ({ event, headingLevel = 3, featured = false }: EventCardProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const locale = language === "vi" ? "vi-VN" : "en-US";
    const eventName = getEventDisplayName(copy, event);
    const description = getEventDescription(copy, event);
    const colorClass = getEventTypeColorClass(event.sakawiType);
    const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

    return (
        <article
            className={`event-list-card event-app-card ${colorClass} ${event.timing === "past" ? "event-card-past" : ""} ${featured ? "event-card-featured" : ""}`}
            aria-label={`${eventName}, ${countdownText(copy, event)}`}
        >
            <span className="circle-event-type" aria-hidden="true"></span>
            <div className="event-list-main">
                {event.info?.akharThrahName && <div className="event-cham-name">{event.info.akharThrahName}</div>}
                <HeadingTag>{eventName}</HeadingTag>
                {description && <p>{description}</p>}
                {event.calendarContext && (
                    <div className="event-calendar-context">
                        <span className="detail-cham">{event.calendarContext.akharThrah}</span>
                        <span>{event.calendarContext.latin}</span>
                    </div>
                )}
            </div>
            <div className="event-list-meta">
                <time dateTime={formatDateParam(event.eventDate)}>
                    {event.eventDate.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
                </time>
                <span>{eventCategory(copy, event.sakawiType)}</span>
                <strong className={`event-status event-status-${event.timing}`}>
                    {countdownText(copy, event)}
                </strong>
                <Link
                    to={`/calendar?date=${formatDateParam(event.eventDate)}`}
                    aria-label={`${copy.events.openCalendar}: ${eventName}`}
                >
                    {copy.events.openCalendar}
                </Link>
            </div>
        </article>
    );
};

export const EventCalendar = (props: EventCalendarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const [currentYear, setCurrentYear] = useState<AhierYear>(() => currentAhierYear(props.matrixSakawi) ?? fallbackAhierYear());

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
    const upcomingMainEvents = useMemo(
        () => getUpcomingMainEvents(props.nextEvents, props.matrixSakawi, props.fullSakawi),
        [props.fullSakawi, props.matrixSakawi, props.nextEvents]
    );
    const nextImportantEvent = upcomingMainEvents[0];
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
                            <EventCard event={event} key={`${event.eventType}-${event.eventDate.toISOString()}-${index}`} />
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
            <section className="event-summary-section" aria-labelledby="next-important-event-heading">
                <div className="section-heading-row">
                    <div>
                        <h2 id="next-important-event-heading">{copy.events.nextImportant}</h2>
                        <p>{copy.events.nextImportantDescription.replace("{region}", props.areaLabel)}</p>
                    </div>
                </div>
                {nextImportantEvent ? (
                    <EventCard event={nextImportantEvent} headingLevel={3} featured />
                ) : (
                    <p className="event-empty">{copy.events.noUpcomingEvents}</p>
                )}
            </section>

            <section className="event-section" aria-labelledby="upcoming-important-events-heading">
                <div className="section-heading-row">
                    <div>
                        <h2 id="upcoming-important-events-heading">{copy.events.upcoming}</h2>
                        <p>{copy.events.upcomingDescription}</p>
                    </div>
                </div>
                {upcomingMainEvents.length > 0 ? (
                    <div className="event-list event-main-list">
                        {upcomingMainEvents.map((event, index) => (
                            <EventCard event={event} key={`${event.eventType}-${event.eventDate.toISOString()}-${index}`} />
                        ))}
                    </div>
                ) : (
                    <p className="event-empty">{copy.events.noUpcomingEvents}</p>
                )}
            </section>

            <section className="event-year-section" aria-labelledby="event-year-heading">
                <div className="event-year-heading">
                    <div>
                        <p className="page-eyebrow">{props.areaLabel}</p>
                        <h2 id="event-year-heading">{copy.events.yearTitle.replace("{year}", String(currentYear.yearNumber))}</h2>
                        <p className="event-year-name">
                            <span className="detail-cham">{yearTitleCham(currentYear)}</span>
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
        </div>
    );
};
