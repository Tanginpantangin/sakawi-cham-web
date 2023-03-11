import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AhierMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { SakawiType } from "../pages/monthCalendarPage";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";
import { MonthGregory } from "./monthGregory";
import { MonthNavigation } from "./monthNavigation";

interface MonthCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
}

export const MonthCalendar = (props: MonthCalendarProps) => {
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

    function handleOnClickToCurrentMonth() {
        if (sakawiType === "sakawiAhier") {
            const currentAhierMonth = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonth) {
                setCurrentAhierMonthMatrix(currentAhierMonth);
            }
        } else if (sakawiType === "sakawiAwal") {
            const currentAwalMonth = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
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
        <Container>
            <Row>
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
                        />
                    }
                    {sakawiType === 'sakawiAwal' &&
                        <MonthAwal
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAwalMonthMatrix={currentAwalMonthMatrix}
                        />
                    }
                    {sakawiType === 'sakawiGregory' &&
                        <MonthGregory
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentGregoryMonth={currentGregoryMonth ?? 0}
                            currentGregoryYear={currentGregoryYear ?? new Date().getFullYear()}
                        />
                    }
                </Col>
            </Row>
        </Container>
    );
}