import { OverlayTrigger, Popover } from "react-bootstrap";
import { AwalMonthEnum, displayIkasSarakName, EventType, IkasSarakEnum, SakawiType } from "../enums/enum";
import { AhierDate, AhierMonth } from "../model/AhierDate";
import { AwalDate, AwalMonth } from "../model/AwalDate";
import Helper from "../utility/helper";

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
}

interface CalendarDayEvent {
    eventType?: EventType;
    sakawiType?: SakawiType;
    latinName: string;
    akharThrahName?: string;
    vnName?: string;
    description?: string;
}

const EVENT_TYPES: EventType[] = [
    'AkaokThun',
    'RijaNagar',
    'KatePaleiHamuTanran',
    'KateAngaokBimong',
    'CaMbur',
    'TamaRicaowRamawan',
    'TalaihAekRamawan',
    'MukTrun',
    'OngTrun',
    'IkakWaha',
    'TalaihWaha',
    'YuerYang',
    'VietnameseLunarNewYear'
];

export const DayDetails = (props: DayDetailsProps) => {
    let opacityValue = 1;
    let backgroundColor = '';

    if (props.dateGregory.toLocaleDateString() === new Date().toLocaleDateString()) {
        backgroundColor = '#FFEFBF';
    }

    if (props.sakawiType === "sakawiAhier") {
        if (JSON.stringify(props.dateAhier.ahierMonth) !== JSON.stringify(props.currentAhierMonth)) {
            backgroundColor = '#F2F2F2';
            opacityValue = 0.3;
        }
    } else if (props.sakawiType === "sakawiAwal") {
        if (JSON.stringify(props.dateAwal.awalMonth) !== JSON.stringify(props.currentAwalMonth)) {
            backgroundColor = '#F2F2F2';
            opacityValue = 0.3;
        }
    } else if (props.sakawiType === "sakawiGregory") {
        if (props.dateGregory.getMonth() !== props.currentGregoryMonth
            || props.dateGregory.getFullYear() !== props.currentGregoryYear) {
            backgroundColor = '#F2F2F2';
            opacityValue = 0.3;
        }
    }

    const tdStyle: React.CSSProperties = {
        opacity: opacityValue,
        backgroundColor: backgroundColor
    }

    let gregoryDateClass = 'gregory-date';
    let ahierDateClass = 'ahier-date';
    let awalDateClass = 'awal-date';
    let ikasSarakMonthCellClass = props.showLatinNumberDate ? '' : 'ikasSarak-month-cell';

    if (props.showLatinNumberDate) {
        ahierDateClass += ' display-latin-number';
        awalDateClass += ' display-latin-number';
    }

    switch (props.sakawiType) {
        case "sakawiGregory":
            gregoryDateClass += ' active'
            break;

        case "sakawiAhier":
            ahierDateClass += ' active'
            break;

        case "sakawiAwal":
            awalDateClass += ' active'
            ikasSarakMonthCellClass += ' active'
            break;

        default:
            break;
    }

    function displayGregoryDate(sakawiType: SakawiType, dateAhier: AhierDate, dateAwal: AwalDate, dateGregory: Date) {
        const monthGregogy = dateGregory.getMonth() + 1;

        if ((sakawiType === "sakawiAwal" && dateAwal.date === 1) || (sakawiType === "sakawiAhier" && dateAhier.date === 1)) {
            return dateGregory.getDate() + "." + monthGregogy;
        } else {
            return dateGregory.getDate();
        }
    }

    function displayAhierDate(dateAhier: AhierDate) {
        const monthAhier = dateAhier.ahierMonth.month + 1;
        const bingun = props.showLatinNumberDate ? '' : 'ꩃ';
        const klem = props.showLatinNumberDate ? '\'' : 'ꩌ';

        if (dateAhier.date === 1 && props.sakawiType !== 'sakawiAhier') {
            return (
                <label style={{ margin: 0 }} >{Helper.convertToChamDigitUnicode(dateAhier.date, props.showLatinNumberDate) + bingun + "." + Helper.convertToChamDigitUnicode(monthAhier, props.showLatinNumberDate)}</label>
            )
        } else {
            if (props.dayNumbersOfCurrentAhierMonth === 30) {
                if (dateAhier.date <= 15) {
                    return Helper.convertToChamDigitUnicode(dateAhier.date, props.showLatinNumberDate) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAhier.date - 15, props.showLatinNumberDate) + klem;
                }
            } else {
                if (dateAhier.date <= 14) {
                    if (dateAhier.date <= 5) {
                        return Helper.convertToChamDigitUnicode(dateAhier.date, props.showLatinNumberDate) + bingun;
                    } else {
                        return Helper.convertToChamDigitUnicode(dateAhier.date + 1, props.showLatinNumberDate) + bingun;
                    }
                } else {
                    return Helper.convertToChamDigitUnicode(dateAhier.date - 14, props.showLatinNumberDate) + klem;
                }
            }
        }
    };

    function displayAwalDate(dateAwal: AwalDate) {
        const monthAwal = dateAwal.awalMonth.month + 1;
        const bingun = props.showLatinNumberDate ? '' : 'ꩃ';
        const klem = props.showLatinNumberDate ? '\'' : 'ꩌ';

        if (dateAwal.date === 1 && props.sakawiType !== 'sakawiAwal') {
            return (
                <>
                    <label style={{ margin: 0 }} >{Helper.convertToChamDigitUnicode(dateAwal.date, props.showLatinNumberDate) + bingun + "." + Helper.convertToChamDigitUnicode(monthAwal, props.showLatinNumberDate) + "."}</label>
                    <label style={{ margin: 0 }} className={ikasSarakMonthCellClass}>
                        {props.showLatinNumberDate ? IkasSarakEnum[dateAwal.awalMonth.year.ikasSarak] : displayIkasSarakName(dateAwal.awalMonth.year.ikasSarak)}
                    </label>
                </>
            )
        } else {
            if (props.dayNumbersOfCurrentAwalMonth === 30) {
                if (dateAwal.date <= 15) {
                    return Helper.convertToChamDigitUnicode(dateAwal.date, props.showLatinNumberDate) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAwal.date - 15, props.showLatinNumberDate) + klem;
                }
            } else {
                if (dateAwal.date <= 14) {
                    return Helper.convertToChamDigitUnicode(dateAwal.date, props.showLatinNumberDate) + bingun;
                } else {
                    return Helper.convertToChamDigitUnicode(dateAwal.date - 14, props.showLatinNumberDate) + klem;
                }
            }
        }
    }

    function getEvents() {
        let result: string[] = [];

        if (Helper.isVietnameseLunarNewYear(props.dateGregory)) {
            result.push('Tết Nguyên Đán');
        }

        if (props.dateAhier.ahierMonth.month === 0 && props.dateAhier.date === 1) {
            result.push('Akaok thun');
        }

        //TODO
        if (props.dateAhier.ahierMonth.month === 0 && props.dateGregory.getDay() === 4) {
            if (props.dateAwal.awalMonth.month === AwalMonthEnum.Ramadan) {
                // closet Thurday and after Muk Trun day
                if (props.dateAwal.date >= 16 && props.dateAhier.date <= 22) {
                    result.push('Rija Nagar');
                }
            } else {
                if (props.dateAhier.date >= 1 && props.dateAhier.date <= 7) {
                    result.push('Rija Nagar');
                }
            }
        }

        if (props.dateAhier.ahierMonth.month === 5 && props.dateAhier.date === props.dayNumbersOfCurrentAhierMonth) {
            result.push('Katé palei Hamu Tanran');
        }

        if (props.dateAhier.ahierMonth.month === 6 && props.dateAhier.date === 1) {
            result.push('Katé angaok bimong');
        }

        if (props.dayNumbersOfCurrentAhierMonth === 30) {
            if (props.dateAhier.ahierMonth.month === 8 && props.dateAhier.date === 16) {
                result.push('Ca-mbur');
            }
        } else {
            if (props.dateAhier.ahierMonth.month === 8 && props.dateAhier.date === 15) {
                result.push('Ca-mbur');
            }
        }

        if (props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 1) {
            result.push('Tamâ ricaow Ramâwan');
        }

        if (props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 16) {
            result.push('Muk trun');
        }

        if (props.dateAwal.awalMonth.month === 8 && props.dateAwal.date === 21) {
            result.push('Ong trun');
        }

        if (props.dateAwal.awalMonth.month === 9 && props.dateAwal.date === 2) {
            result.push('Talaih aek Ramâwan');
        }

        if (props.dateAwal.awalMonth.month === 11 && props.dateAwal.date === 1) {
            result.push('Ikak Waha');
        }

        if (props.dateAwal.awalMonth.month === 11 && props.dateAwal.date === 11) {
            result.push('Talaih Waha');
        }

        if (props.dateAhier.ahierMonth.month === 3 && props.dateGregory.getDay() === 0 && props.dateAhier.date < 7) {
            result.push('Yuer Yang');
        }

        // TODO: 
        // if (props.dateAhier.ahierMonth.month === 10 && props.dateGregory.getDay() === 2 && props.dateAhier.date <= 15) {
        //     result.push('Peh ba-mbeng Yang');
        // }

        if ((props.dateAhier.ahierMonth.month === 2
            || props.dateAhier.ahierMonth.month === 5
            || props.dateAhier.ahierMonth.month === 7
            || props.dateAhier.ahierMonth.month === 9
            || props.dateAhier.ahierMonth.month === 10) && props.dateGregory.getDay() === 3) {

            if (props.dayNumbersOfCurrentAhierMonth === 30) {
                if (props.dateAhier.date > 15 && (props.dateAhier.date - 15) % 2 === 0) {
                    result.push('♥️ Lakhah');
                }
            } else {
                if (props.dateAhier.date > 14 && (props.dateAhier.date - 14) % 2 === 0) {
                    result.push('♥️ Lakhah');
                }
            }
        }

        return result;
    }

    function mapEventName(eventName: string): CalendarDayEvent {
        let eventType = EVENT_TYPES.find(type => {
            const eventInfo = Helper.displayEventDay(type);
            return eventInfo?.latinName === eventName || eventInfo?.vnName === eventName;
        });

        if (!eventType) {
            if (eventName === 'Rija Nagar') {
                eventType = 'RijaNagar';
            } else if (eventName.indexOf('Hamu Tanran') >= 0) {
                eventType = 'KatePaleiHamuTanran';
            } else if (eventName.indexOf('angaok bimong') >= 0) {
                eventType = 'KateAngaokBimong';
            } else if (eventName.indexOf('Ram') >= 0 && eventName.indexOf('Talaih') < 0) {
                eventType = 'TamaRicaowRamawan';
            } else if (eventName.indexOf('Talaih') >= 0 && eventName.indexOf('Ram') >= 0) {
                eventType = 'TalaihAekRamawan';
            }
        }

        if (eventType) {
            const eventInfo = Helper.displayEventDay(eventType);

            return {
                eventType,
                sakawiType: eventInfo?.sakawiType as SakawiType | undefined,
                latinName: eventInfo?.latinName ?? eventName,
                akharThrahName: eventInfo?.akharThrahName,
                vnName: eventInfo?.vnName,
                description: eventInfo?.description
            };
        }

        return {
            latinName: eventName.replace('â™¥ï¸ ', ''),
            description: eventName.indexOf('Lakhah') >= 0 ? 'Ngày Lakhah theo lịch Cham' : undefined
        };
    }

    function renderEventPopover(event: CalendarDayEvent, index: number) {
        const eventTypeLabel = event.sakawiType === 'sakawiAwal' ? 'Lịch Awal' : event.sakawiType === 'sakawiAhier' ? 'Lịch Cham' : 'Sự kiện';
        const eventTypeBadgeClass = event.sakawiType === 'sakawiAwal'
            ? 'event-type-badge-awal'
            : event.sakawiType === 'sakawiAhier'
                ? 'event-type-badge-ahier'
                : 'event-type-badge-gregory';

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

    function renderMoreEventsPopover(events: CalendarDayEvent[]) {
        return (
            <Popover id={`calendar-event-more-popover-${props.dateGregory.getTime()}`} className="calendar-event-popover calendar-event-more-popover">
                <Popover.Title as="div">
                    {`${events.length} sự kiện - ${Helper.displayDateString(props.dateGregory)}`}
                </Popover.Title>
                <Popover.Content>
                    {events.map((event, index) =>
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

    const events = getEvents().map(mapEventName);
    const visibleEvents = events.slice(0, 2);
    const hiddenEventCount = events.length - visibleEvents.length;

    return (
        <td className="calendar-day" style={tdStyle}>
            <div className="calendar-day-grid">
                <div className={gregoryDateClass}>
                    {displayGregoryDate(props.sakawiType, props.dateAhier, props.dateAwal, props.dateGregory)}
                </div>
                <div className="calendar-day-events">
                    {visibleEvents.map((item, index) => {
                        return (
                            <OverlayTrigger
                                key={index}
                                trigger="click"
                                rootClose
                                placement="auto"
                                overlay={renderEventPopover(item, index)}
                            >
                                <button
                                    type="button"
                                    className="event-name event-name-button"
                                >
                                    {item.latinName}
                                </button>
                            </OverlayTrigger>
                        )
                    })}
                    {hiddenEventCount > 0 &&
                        <OverlayTrigger
                            trigger="click"
                            rootClose
                            placement="auto"
                            overlay={renderMoreEventsPopover(events)}
                        >
                            <button type="button" className="event-name event-name-button event-name-more">{`+${hiddenEventCount} more`}</button>
                        </OverlayTrigger>
                    }
                </div>
                <div className={awalDateClass}>
                    {displayAwalDate(props.dateAwal)}
                </div>
                <div className={ahierDateClass}>
                    {displayAhierDate(props.dateAhier)}
                </div>
            </div>
        </td>
    );
}
