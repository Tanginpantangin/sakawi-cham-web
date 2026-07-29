import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
    AhierMonthEnum,
    displayAhierMonthName,
    displayAwalMonthName,
    GuecTypeEnum,
    GuenTypeEnum,
    IkasSarakEnum,
    NasakEnum,
    SakawiType
} from "../enums/enum";
import { useLanguage } from "../i18n";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import {
    displayAhierDayPhaseParts,
    displayAhierYearParts,
    displayAwalDayPhaseParts,
    displayAwalYearParts,
    getDayEvents,
    sameDate
} from "../utils/dateFormat";
import { getToday } from "../utils/today";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";
import { MonthGregory } from "./monthGregory";
import { MonthNavigation } from "./monthNavigation";

interface MonthCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
    initialSelectedDate?: Date;
    areaLabel?: string;
}

export const MonthCalendar = (props: MonthCalendarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const locale = language === "vi" ? "vi-VN" : "en-US";
    const initialAhierMonth: AhierMonth = { month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 } };
    const initialAwalMonth: AwalMonth = { month: 0, year: { ikasSarak: 0, yearNumber: 1400 } };
    const initialGregoryDate: Date = getToday();

    const initialMatrixCalendarType: MatrixCalendarType = {
        ahierMonth: initialAhierMonth,
        dayNumbersOfAhierMonth: 0,
        firstDayOfAhierMonth: 0,
        hasGuen: false,
        typeOfGuen: GuenTypeEnum.None,
        hasGuec: false,
        typeOfGuec: GuecTypeEnum.None,
        dateOfGregoryCalendar: initialGregoryDate,
        awalMonth: initialAwalMonth,
        dayNumbersOfAwalMonth: 0,
        firstDayOfAwalMonth: 0
    };

    const [sakawiType, setSakawiType] = useState<SakawiType>("sakawiAhier");
    const [currentAhierMonthMatrix, setCurrentAhierMonthMatrix] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    const [currentAwalMonthMatrix, setCurrentAwalMonthMatrix] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    const [currentGregoryMonth, setCurrentGregoryMonth] = useState(getToday().getMonth());
    const [currentGregoryYear, setCurrentGregoryYear] = useState(getToday().getFullYear());
    const [showLatinNumberDate, setShowLatinNumberDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState<FullCalendarType | undefined>();

    React.useEffect(() => {
        const now = getToday();
        const currentAhierMonthMatrix = props.matrixSakawi.find(m =>
            Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > now);
        if (currentAhierMonthMatrix) {
            setCurrentAhierMonthMatrix(currentAhierMonthMatrix);
        }

        const currentAwalMonthMatrix = props.matrixSakawi.find(m =>
            Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > now);
        if (currentAwalMonthMatrix) {
            setCurrentAwalMonthMatrix(currentAwalMonthMatrix);
        }
    }, [props.matrixSakawi]);

    React.useEffect(() => {
        if (!props.initialSelectedDate || props.fullSakawi.length === 0) {
            return;
        }

        const matchedDate = props.fullSakawi.find((item) => sameDate(item.dateGregory, props.initialSelectedDate as Date));
        if (matchedDate) {
            setSakawiType("sakawiGregory");
            setCurrentGregoryMonth(matchedDate.dateGregory.getMonth());
            setCurrentGregoryYear(matchedDate.dateGregory.getFullYear());
            setSelectedDate(matchedDate);
        }
    }, [props.fullSakawi, props.initialSelectedDate]);

    React.useEffect(() => {
        if (selectedDate || props.initialSelectedDate || props.fullSakawi.length === 0) {
            return;
        }

        const today = props.fullSakawi.find((item) => sameDate(item.dateGregory, getToday()));
        if (today) {
            setSelectedDate(today);
        }
    }, [props.fullSakawi, props.initialSelectedDate, selectedDate]);

    React.useEffect(() => {
        if (!selectedDate || props.fullSakawi.length === 0) {
            return;
        }

        const matchedDate = props.fullSakawi.find((item) => sameDate(item.dateGregory, selectedDate.dateGregory));
        if (matchedDate && matchedDate !== selectedDate) {
            setSelectedDate(matchedDate);
        }
    }, [props.fullSakawi, selectedDate]);

    function selectToday() {
        const today = props.fullSakawi.find((item) => sameDate(item.dateGregory, getToday()));
        if (today) {
            setSelectedDate(today);
        }
    }

    function handleOnClickToCurrentMonth() {
        const now = getToday();

        if (sakawiType === "sakawiAhier") {
            const currentAhierMonth = props.matrixSakawi.find(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) >= now);
            if (currentAhierMonth) {
                setCurrentAhierMonthMatrix(currentAhierMonth);
            }
        } else if (sakawiType === "sakawiAwal") {
            const currentAwalMonth = props.matrixSakawi.find(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) >= now);
            if (currentAwalMonth) {
                setCurrentAwalMonthMatrix(currentAwalMonth);
            }
        } else {
            setCurrentGregoryMonth(now.getMonth());
            setCurrentGregoryYear(now.getFullYear());
        }

        selectToday();
    }

    function handleOnClickPreviousMonth() {
        if (sakawiType === "sakawiAhier") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAhierMonthMatrix));
            if (index > 0) {
                setCurrentAhierMonthMatrix(props.matrixSakawi[index - 1]);
            }
        } else if (sakawiType === "sakawiAwal") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAwalMonthMatrix));
            if (index > 0) {
                setCurrentAwalMonthMatrix(props.matrixSakawi[index - 1]);
            }
        } else if (currentGregoryMonth === 0) {
            setCurrentGregoryMonth(11);
            setCurrentGregoryYear(currentGregoryYear - 1);
        } else {
            setCurrentGregoryMonth(currentGregoryMonth - 1);
            setCurrentGregoryYear(currentGregoryYear);
        }
    }

    function handleOnClickNextMonth() {
        if (sakawiType === "sakawiAhier") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAhierMonthMatrix));
            if (index >= 0 && index < props.matrixSakawi.length - 1) {
                setCurrentAhierMonthMatrix(props.matrixSakawi[index + 1]);
            }
        } else if (sakawiType === "sakawiAwal") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAwalMonthMatrix));
            if (index >= 0 && index < props.matrixSakawi.length - 1) {
                setCurrentAwalMonthMatrix(props.matrixSakawi[index + 1]);
            }
        } else if (currentGregoryMonth === 11) {
            setCurrentGregoryMonth(0);
            setCurrentGregoryYear(currentGregoryYear + 1);
        } else {
            setCurrentGregoryMonth(currentGregoryMonth + 1);
            setCurrentGregoryYear(currentGregoryYear);
        }
    }

    function renderSelectedDatePanel() {
        if (!selectedDate) {
            return null;
        }

        const ahierDayCount = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, selectedDate.dateAhier.ahierMonth);
        const awalDayCount = Helper.getDayNumbersOfAwalMonth(selectedDate.dateAwal.awalMonth.year, selectedDate.dateAwal.awalMonth.month);
        const ahierDay = displayAhierDayPhaseParts(selectedDate.dateAhier, ahierDayCount);
        const awalDay = displayAwalDayPhaseParts(selectedDate.dateAwal, awalDayCount);
        const ahierMonth = displayAhierMonthName(selectedDate.dateAhier.ahierMonth.month);
        const awalMonth = displayAwalMonthName(selectedDate.dateAwal.awalMonth.month);
        const ahierYear = displayAhierYearParts(selectedDate.dateAhier, false);
        const ahierYearLatin = displayAhierYearParts(selectedDate.dateAhier, true);
        const awalYear = displayAwalYearParts(selectedDate.dateAwal, false);
        const awalYearLatin = displayAwalYearParts(selectedDate.dateAwal, true);
        const dayEvents = getDayEvents(selectedDate.dateAhier, selectedDate.dateAwal, selectedDate.dateGregory, ahierDayCount);

        return (
            <section className="selected-date-panel" aria-labelledby="selected-date-title">
                <div className="selected-date-heading">
                    <div>
                        <h2 id="selected-date-title">{copy.calendar.selectedDateTitle}</h2>
                        <p>{copy.calendar.detailSubtitle}</p>
                    </div>
                    {props.areaLabel && <span className="selected-date-region">{props.areaLabel}</span>}
                </div>
                <dl className="selected-date-grid">
                    <div>
                        <dt>{copy.calendar.gregorianDate}</dt>
                        <dd>{selectedDate.dateGregory.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}</dd>
                    </div>
                    <div>
                        <dt>{copy.calendar.weekday}</dt>
                        <dd>{selectedDate.dateGregory.toLocaleDateString(locale, { weekday: "long" })}</dd>
                    </div>
                </dl>
                <div className="selected-date-cards">
                    <article className="selected-calendar-card selected-calendar-card-ahier">
                        <h3>{copy.calendar.systemCham}</h3>
                        <dl>
                            <div>
                                <dt>{copy.calendar.day}</dt>
                                <dd><span className="detail-cham">{ahierDay.akharThrah}</span><span>{ahierDay.latin}</span></dd>
                            </div>
                            <div>
                                <dt>{copy.calendar.month}</dt>
                                <dd><span className="detail-cham">{ahierMonth.akharThrahName}</span><span>{`${ahierMonth.rumiName} (${selectedDate.dateAhier.ahierMonth.month + 1})`}</span></dd>
                            </div>
                            <div>
                                <dt>{copy.calendar.year}</dt>
                                <dd><span className="detail-cham">{`${ahierYear.nasak} ${ahierYear.ikas} · ${ahierYear.year}`}</span><span>{`${ahierYearLatin.nasak} ${ahierYearLatin.ikas} · ${ahierYearLatin.year}`}</span></dd>
                            </div>
                        </dl>
                    </article>
                    <article className="selected-calendar-card selected-calendar-card-awal">
                        <h3>{copy.calendar.systemAwal}</h3>
                        <dl>
                            <div>
                                <dt>{copy.calendar.day}</dt>
                                <dd><span className="detail-cham detail-awal">{awalDay.akharThrah}</span><span>{awalDay.latin}</span></dd>
                            </div>
                            <div>
                                <dt>{copy.calendar.month}</dt>
                                <dd><span className="detail-cham detail-awal">{awalMonth.akharThrahName}</span><span>{`${awalMonth.rumiName} (${selectedDate.dateAwal.awalMonth.month + 1})`}</span></dd>
                            </div>
                            <div>
                                <dt>{copy.calendar.year}</dt>
                                <dd><span className="detail-cham detail-awal">{[awalYear.ikas, awalYear.year].filter(Boolean).join(" · ")}</span><span>{[awalYearLatin.ikas, awalYearLatin.year].filter(Boolean).join(" · ")}</span></dd>
                            </div>
                        </dl>
                    </article>
                </div>
                <div className="selected-date-events">
                    <h3>{copy.calendar.events}</h3>
                    {dayEvents.length > 0 ? (
                        <ul>
                            {dayEvents.map((event, index) => (
                                <li key={`${event.latinName}-${index}`}>
                                    {event.akharThrahName && <span className="detail-cham">{event.akharThrahName}</span>}
                                    <strong>{event.latinName}</strong>
                                    {event.vnName && <span>{event.vnName}</span>}
                                    {event.description && <small>{event.description}</small>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{copy.calendar.emptyDayEvents}</p>
                    )}
                </div>
            </section>
        );
    }

    return (
        <Container className="month-calendar">
            <Row className="calendar-control-row">
                <Col xs={12}>
                    <Form className="calendar-control-panel">
                        <div className="calendar-option">
                            <Form.Check
                                inline
                                type="checkbox"
                                label={copy.calendar.showLatinNumbers}
                                checked={showLatinNumberDate}
                                onChange={() => setShowLatinNumberDate(!showLatinNumberDate)}
                            />
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row className="calendar-nav">
                <MonthNavigation
                    sakawiType={sakawiType}
                    currentAhierMonth={currentAhierMonthMatrix.ahierMonth}
                    currentAwalMonth={currentAwalMonthMatrix.awalMonth}
                    currentGregoryMonth={currentGregoryMonth}
                    currentGregoryYear={currentGregoryYear}
                    onClickToday={handleOnClickToCurrentMonth}
                    onClickPreviousMonth={handleOnClickPreviousMonth}
                    onClickNextMonth={handleOnClickNextMonth}
                    onSelectSakawiType={type => setSakawiType(type)}
                />
            </Row>
            <Row>
                <Col md={12}>
                    {sakawiType === "sakawiAhier" &&
                        <MonthAhier
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAhierMonthMatrix={currentAhierMonthMatrix}
                            showLatinNumberDate={showLatinNumberDate}
                            selectedDate={selectedDate?.dateGregory}
                            onSelectDate={setSelectedDate}
                        />
                    }
                    {sakawiType === "sakawiAwal" &&
                        <MonthAwal
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAwalMonthMatrix={currentAwalMonthMatrix}
                            showLatinNumberDate={showLatinNumberDate}
                            selectedDate={selectedDate?.dateGregory}
                            onSelectDate={setSelectedDate}
                        />
                    }
                    {sakawiType === "sakawiGregory" &&
                        <MonthGregory
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentGregoryMonth={currentGregoryMonth ?? 0}
                            currentGregoryYear={currentGregoryYear ?? getToday().getFullYear()}
                            showLatinNumberDate={showLatinNumberDate}
                            selectedDate={selectedDate?.dateGregory}
                            onSelectDate={setSelectedDate}
                        />
                    }
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {renderSelectedDatePanel()}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="calendar-legend-strip" aria-label={copy.calendar.legendTitle}>
                        <span className="legend-chip"><span className="legend-dot legend-dot-ahier"></span>{copy.calendar.legendCham}</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-awal"></span>{copy.calendar.legendAwal}</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-gregory"></span>{copy.calendar.legendGregorian}</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-event"></span>{copy.calendar.legendEvent}</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-today"></span>{copy.calendar.legendToday}</span>
                    </div>
                    <div className="legend-title">{copy.calendar.legendTitle}</div>
                    <ul className="notice">
                        {copy.calendar.legendNotes.map((note) => (
                            <li key={note}>{note}</li>
                        ))}
                    </ul>
                    <br />
                </Col>
            </Row>
        </Container>
    );
};
