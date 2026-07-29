import React from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { SakawiType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import {
    CalendarDayEvent,
    displayAhierDate,
    displayAwalDateParts,
    displayAwalDayMonth,
    displayGregorianShort,
    getDayEvents,
    sameDate
} from "../utils/dateFormat";
import { getToday } from "../utils/today";

interface DayDetailsProps {
    sakawiType: SakawiType;
    dateGregory: Date;
    dateAwal: AwalDate;
    dateAhier: AhierDate;
    currentAhierMonth?: AhierMonth;
    currentAwalMonth?: AwalMonth;
    currentGregoryMonth?: number;
    currentGregoryYear?: number;
    dayNumbersOfCurrentAhierMonth: number;
    dayNumbersOfCurrentAwalMonth: number;
    showLatinNumberDate: boolean;
    selectedDate?: Date;
    onSelectDate: () => void;
}

function sameAhierMonth(a?: AhierMonth, b?: AhierMonth) {
    return !!a && !!b
        && a.month === b.month
        && a.year.yearNumber === b.year.yearNumber
        && a.year.nasak === b.year.nasak
        && a.year.ikasSarak === b.year.ikasSarak;
}

function sameAwalMonth(a?: AwalMonth, b?: AwalMonth) {
    return !!a && !!b
        && a.month === b.month
        && a.year.yearNumber === b.year.yearNumber
        && a.year.ikasSarak === b.year.ikasSarak;
}

function eventClassName(event: CalendarDayEvent) {
    if (event.sakawiType === "sakawiAwal") return "event-dot-inline event-dot-awal";
    if (event.sakawiType === "sakawiGregory") return "event-dot-inline event-dot-gregory";
    return "event-dot-inline event-dot-ahier";
}

export const DayDetails = (props: DayDetailsProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const today = sameDate(props.dateGregory, getToday());
    const isSelected = props.selectedDate ? sameDate(props.selectedDate, props.dateGregory) : false;
    const inactive = props.sakawiType === "sakawiAhier"
        ? !sameAhierMonth(props.dateAhier.ahierMonth, props.currentAhierMonth)
        : props.sakawiType === "sakawiAwal"
            ? !sameAwalMonth(props.dateAwal.awalMonth, props.currentAwalMonth)
            : props.dateGregory.getMonth() !== props.currentGregoryMonth
                || props.dateGregory.getFullYear() !== props.currentGregoryYear;

    const withAhierMonth = props.dateAhier.date === 1 && props.sakawiType !== "sakawiAhier";
    const withAwalMonth = props.dateAwal.date === 1 && props.sakawiType !== "sakawiAwal";
    const withGregoryMonth = (props.sakawiType === "sakawiAwal" && props.dateAwal.date === 1)
        || (props.sakawiType === "sakawiAhier" && props.dateAhier.date === 1);
    const awalDate = props.sakawiType === "sakawiAhier" && withAwalMonth
        ? { text: displayAwalDayMonth(props.dateAwal, props.dayNumbersOfCurrentAwalMonth, props.showLatinNumberDate) }
        : displayAwalDateParts(props.dateAwal, props.dayNumbersOfCurrentAwalMonth, props.showLatinNumberDate, withAwalMonth);
    const events = getDayEvents(
        props.dateAhier,
        props.dateAwal,
        props.dateGregory,
        props.dayNumbersOfCurrentAhierMonth
    );
    const visibleEvents = inactive ? [] : events.slice(0, 2);
    const hiddenEventCount = events.length - visibleEvents.length;

    let gregoryDateClass = "gregory-date";
    let ahierDateClass = "ahier-date";
    let awalDateClass = "awal-date";
    let ikasSarakMonthCellClass = props.showLatinNumberDate ? "" : "ikasSarak-month-cell";

    if (props.showLatinNumberDate) {
        ahierDateClass += " display-latin-number";
        awalDateClass += " display-latin-number";
    }

    if (props.sakawiType === "sakawiGregory") {
        gregoryDateClass += " active";
    } else if (props.sakawiType === "sakawiAhier") {
        ahierDateClass += " active";
    } else {
        awalDateClass += " active";
        ikasSarakMonthCellClass += " active";
    }

    function renderEventPopover(event: CalendarDayEvent, index: number) {
        const eventTypeLabel = event.sakawiType === "sakawiAwal"
            ? copy.calendar.systemAwal
            : event.sakawiType === "sakawiAhier"
                ? copy.calendar.systemCham
                : copy.calendar.systemGregorian;
        const eventTypeBadgeClass = event.sakawiType === "sakawiAwal"
            ? "event-type-badge-awal"
            : event.sakawiType === "sakawiAhier"
                ? "event-type-badge-ahier"
                : "event-type-badge-gregory";

        return (
            <Popover id={`calendar-event-popover-${props.dateGregory.getTime()}-${index}`} className="calendar-event-popover">
                <Popover.Title as="div">
                    {event.akharThrahName &&
                        <div className="event-popover-cham-name">{event.akharThrahName}</div>
                    }
                    <div>{event.latinName}</div>
                </Popover.Title>
                <Popover.Content>
                    {event.vnName &&
                        <div className="event-popover-vn-name">{event.vnName}</div>
                    }
                    <div className="event-popover-meta">
                        <span className={`event-type-badge ${eventTypeBadgeClass}`}>
                            {eventTypeLabel}
                        </span>
                        <span>{Helper.displayDateString(props.dateGregory)}</span>
                    </div>
                    {event.description &&
                        <div className="event-popover-description">{event.description}</div>
                    }
                </Popover.Content>
            </Popover>
        );
    }

    function renderMoreEventsPopover(allEvents: CalendarDayEvent[]) {
        return (
            <Popover id={`calendar-event-more-popover-${props.dateGregory.getTime()}`} className="calendar-event-popover calendar-event-more-popover">
                <Popover.Title as="div">
                    {`${allEvents.length} ${copy.calendar.events.toLocaleLowerCase(language === "vi" ? "vi-VN" : "en-US")} - ${Helper.displayDateString(props.dateGregory)}`}
                </Popover.Title>
                <Popover.Content>
                    {allEvents.map((event, index) =>
                        <div key={`more-event-${index}`} className="event-more-item">
                            {event.akharThrahName &&
                                <div className="event-popover-cham-name">{event.akharThrahName}</div>
                            }
                            <div className="event-more-title">{event.latinName}</div>
                            {event.vnName &&
                                <div className="event-more-description">{event.vnName}</div>
                            }
                        </div>
                    )}
                </Popover.Content>
            </Popover>
        );
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTableCellElement>) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            props.onSelectDate();
        }
    }

    function stopCellSelection(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
    }

    const cellClassNames = [
        "calendar-day",
        isSelected ? "calendar-day-selected" : "",
        today ? "calendar-day-today" : "",
        inactive ? "calendar-day-inactive" : ""
    ].filter(Boolean).join(" ");

    return (
        <td
            className={cellClassNames}
            role="button"
            tabIndex={0}
            aria-label={`${Helper.displayDateString(props.dateGregory)} - ${copy.calendar.viewDetails}`}
            aria-pressed={isSelected}
            aria-current={today ? "date" : undefined}
            data-testid={today ? "calendar-today-cell" : undefined}
            onClick={props.onSelectDate}
            onKeyDown={handleKeyDown}
        >
            <div className="calendar-day-grid">
                <div className={gregoryDateClass}>
                    {displayGregorianShort(props.dateGregory, withGregoryMonth)}
                </div>
                <div className="calendar-day-events" aria-label={events.length > 0 ? copy.calendar.events : undefined}>
                    {visibleEvents.map((item, index) => (
                        <OverlayTrigger
                            key={`${item.latinName}-${index}`}
                            trigger="click"
                            rootClose
                            placement="auto"
                            overlay={renderEventPopover(item, index)}
                        >
                            <button
                                type="button"
                                className="event-name event-name-button"
                                aria-label={`${item.latinName} - ${copy.calendar.events}`}
                                onClick={stopCellSelection}
                            >
                                <span className={eventClassName(item)} aria-hidden="true"></span>
                                <span className="event-name-text">{item.latinName}</span>
                            </button>
                        </OverlayTrigger>
                    ))}
                    {hiddenEventCount > 0 &&
                        <OverlayTrigger
                            trigger="click"
                            rootClose
                            placement="auto"
                            overlay={renderMoreEventsPopover(events)}
                        >
                            <button type="button" className="event-name event-name-button event-name-more" onClick={stopCellSelection}>
                                {copy.calendar.moreEvents.replace("{count}", String(hiddenEventCount))}
                            </button>
                        </OverlayTrigger>
                    }
                </div>
                <div className={awalDateClass}>
                    {"ikas" in awalDate && awalDate.ikas ? (
                        <>
                            {awalDate.prefix}
                            <span className={ikasSarakMonthCellClass}>{awalDate.ikas}</span>
                        </>
                    ) : awalDate.text}
                </div>
                <div className={ahierDateClass}>
                    {displayAhierDate(
                        props.dateAhier,
                        props.dayNumbersOfCurrentAhierMonth,
                        props.showLatinNumberDate,
                        withAhierMonth
                    )}
                </div>
            </div>
        </td>
    );
};
