import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
    AhierMonthEnum,
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
    sameDate
} from "../utils/dateFormat";
import { getToday } from "../utils/today";
import type { CountDownBarProps } from "./countDownBar";
import { DayDetailPanel } from "./dayDetailPanel";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";
import { MonthGregory } from "./monthGregory";
import { MonthNavigation } from "./monthNavigation";

interface MonthCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
    initialSelectedDate?: Date;
    areaLabel?: string;
    upcomingEvents?: CountDownBarProps[];
}

export const MonthCalendar = (props: MonthCalendarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
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
                    {selectedDate && (
                        <DayDetailPanel
                            day={selectedDate}
                            matrixSakawi={props.matrixSakawi}
                            areaLabel={props.areaLabel}
                            upcomingEvents={props.upcomingEvents}
                        />
                    )}
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
