import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { AhierMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum, SakawiType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import {
    displayAhierDateSummary,
    displayAwalDateSummary,
    getDayEvents,
    sameDate
} from "../utils/dateFormat";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";
import { MonthGregory } from "./monthGregory";
import { MonthNavigation } from "./monthNavigation";

interface MonthCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
    initialSelectedDate?: Date;
}

export const MonthCalendar = (props: MonthCalendarProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const initialAhierMonth: AhierMonth = { month: AhierMonthEnum.BilanSa, year: { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 } };
    const initialAwalMonth: AwalMonth = { month: 0, year: { ikasSarak: 0, yearNumber: 1400 } };
    const initialGregoryDate: Date = new Date();

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
    }

    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');
    const [currentAhierMonthMatrix, setCurrentAhierMonthMatrix] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    const [currentAwalMonthMatrix, setCurrentAwalMonthMatrix] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    const [currentGregoryMonth, setCurrentGregoryMonth] = useState(new Date().getMonth());
    const [currentGregoryYear, setCurrentGregoryYear] = useState(new Date().getFullYear());
    const [showLatinNumberDate, setShowLatinNumberDate] = useState(false);
    const [selectedDate, setSelectedDate] = useState<FullCalendarType | undefined>();

    React.useEffect(() => {
        function init() {
            // Set current matrix item 
            const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonthMatrix) {
                setCurrentAhierMonthMatrix(currentAhierMonthMatrix);
            }

            const currentAwalMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
            if (currentAwalMonthMatrix) {
                setCurrentAwalMonthMatrix(currentAwalMonthMatrix);
            }
        }

        init();
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

    function handleOnClickToCurrentMonth() {
        if (sakawiType === "sakawiAhier") {
            const currentAhierMonth = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) >= new Date())[0];
            if (currentAhierMonth) {
                setCurrentAhierMonthMatrix(currentAhierMonth);
            }
        } else if (sakawiType === "sakawiAwal") {
            const currentAwalMonth = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) >= new Date())[0];
            if (currentAwalMonth) {
                setCurrentAwalMonthMatrix(currentAwalMonth);
            }
        } else {
            setCurrentGregoryMonth(new Date().getMonth());
            setCurrentGregoryYear(new Date().getFullYear());
        }
    }

    function handleOnClickPreviousMonth() {
        if (sakawiType === "sakawiAhier") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAhierMonthMatrix));
            setCurrentAhierMonthMatrix(props.matrixSakawi[index - 1]);
        } else if (sakawiType === "sakawiAwal") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAwalMonthMatrix));
            setCurrentAwalMonthMatrix(props.matrixSakawi[index - 1]);
        } else {
            if (currentGregoryMonth === 0) {
                setCurrentGregoryMonth(11);
                setCurrentGregoryYear(currentGregoryYear - 1);
            } else {
                setCurrentGregoryMonth(currentGregoryMonth - 1);
                setCurrentGregoryYear(currentGregoryYear);
            }
        }
    }

    function handleOnClickNextMonth() {
        if (sakawiType === "sakawiAhier") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAhierMonthMatrix));
            setCurrentAhierMonthMatrix(props.matrixSakawi[index + 1]);
        } else if (sakawiType === "sakawiAwal") {
            const index = props.matrixSakawi.findIndex(x => JSON.stringify(x) === JSON.stringify(currentAwalMonthMatrix));
            setCurrentAwalMonthMatrix(props.matrixSakawi[index + 1]);
        } else {
            if (currentGregoryMonth === 11) {
                setCurrentGregoryMonth(0);
                setCurrentGregoryYear(currentGregoryYear + 1);
            } else {
                setCurrentGregoryMonth(currentGregoryMonth + 1);
                setCurrentGregoryYear(currentGregoryYear);
            }
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
                                type={"checkbox"}
                                label={`Hiển thị ngày bằng số latin`}
                                checked={showLatinNumberDate}
                                onChange={() => setShowLatinNumberDate(!showLatinNumberDate)}
                            />
                        </div>
                    </Form>
                </Col>
            </Row>
            {selectedDate &&
                <Row>
                    <Col md={12}>
                        <section className="selected-date-panel" aria-labelledby="selected-date-title">
                            <h2 id="selected-date-title">{copy.calendar.selectedDateTitle}</h2>
                            {(() => {
                                const ahierDayCount = Helper.getActualDayNumbersOfAhierMonth(props.matrixSakawi, selectedDate.dateAhier.ahierMonth);
                                const awalDayCount = Helper.getDayNumbersOfAwalMonth(selectedDate.dateAwal.awalMonth.year, selectedDate.dateAwal.awalMonth.month);
                                const dayEvents = getDayEvents(selectedDate.dateAhier, selectedDate.dateAwal, selectedDate.dateGregory, ahierDayCount);
                                const ahierDate = displayAhierDateSummary(selectedDate.dateAhier, ahierDayCount);
                                const awalDate = displayAwalDateSummary(selectedDate.dateAwal, awalDayCount);

                                return (
                                    <>
                                        <dl className="selected-date-grid">
                                            <div>
                                                <dt>{copy.calendar.gregorianDate}</dt>
                                                <dd>{selectedDate.dateGregory.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.calendar.weekday}</dt>
                                                <dd>{selectedDate.dateGregory.toLocaleDateString(language === "vi" ? "vi-VN" : "en-US", { weekday: "long" })}</dd>
                                            </div>
                                            <div>
                                                <dt>{copy.calendar.chamDate}</dt>
                                                <dd><span className="detail-cham">{ahierDate.akharThrah}</span><span>{ahierDate.latin}</span></dd>
                                            </div>
                                            <div>
                                                <dt>{copy.calendar.awalDate}</dt>
                                                <dd><span className="detail-cham detail-awal">{awalDate.akharThrah}</span><span>{awalDate.latin}</span></dd>
                                            </div>
                                        </dl>
                                        <div className="selected-date-events">
                                            <h3>{copy.calendar.events}</h3>
                                            {dayEvents.length > 0 ? (
                                                <ul>
                                                    {dayEvents.map((event, index) => (
                                                        <li key={`${event.latinName}-${index}`}>
                                                            <strong>{event.latinName}</strong>
                                                            {event.vnName && <span>{event.vnName}</span>}
                                                            {event.description && <small>{event.description}</small>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>{copy.calendar.noEvents}</p>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </section>
                    </Col>
                </Row>
            }
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
                    {sakawiType === 'sakawiAhier' &&
                        <MonthAhier
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAhierMonthMatrix={currentAhierMonthMatrix}
                            showLatinNumberDate={showLatinNumberDate}
                            selectedDate={selectedDate?.dateGregory}
                            onSelectDate={setSelectedDate}
                        />
                    }
                    {sakawiType === 'sakawiAwal' &&
                        <MonthAwal
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAwalMonthMatrix={currentAwalMonthMatrix}
                            showLatinNumberDate={showLatinNumberDate}
                            selectedDate={selectedDate?.dateGregory}
                            onSelectDate={setSelectedDate}
                        />
                    }
                    {sakawiType === 'sakawiGregory' &&
                        <MonthGregory
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentGregoryMonth={currentGregoryMonth ?? 0}
                            currentGregoryYear={currentGregoryYear ?? new Date().getFullYear()}
                            showLatinNumberDate={showLatinNumberDate}
                            selectedDate={selectedDate?.dateGregory}
                            onSelectDate={setSelectedDate}
                        />
                    }
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="calendar-legend-strip">
                        <span className="legend-chip"><span className="legend-dot legend-dot-ahier"></span>Lịch Cham</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-awal"></span>Lịch Awal</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-event"></span>Sự kiện</span>
                        <span className="legend-chip"><span className="legend-dot legend-dot-today"></span>Hôm nay</span>
                    </div>
                    <div className="legend-title">Chú thích:</div>
                    <ul className="notice">
                        <li><span className="ahier-date">꩑ꩃ / ꩑ꩌ</span> [bingun/klem]: ngày trước/sau trăng rằm của lịch Cham</li>
                        <li><span className="awal-date">꩑ꩃ / ꩑ꩌ</span> [bingun/klem]: ngày trước/sau trăng rằm của lịch Awal</li>
                        <li>1: ngày Dương lịch</li>
                        <li>Các tháng thiếu (29 ngày) của lịch Cham, không có ngày <span className="ahier-date">꩖ꩃ</span> [6 bingun], mà từ <span className="ahier-date">꩕ꩃ</span> [5 bingun] tới <span className="ahier-date">꩗ꩃ</span> [7 bingun]</li>
                    </ul>
                    <br />
                </Col>
            </Row>
        </Container >
    );
}
