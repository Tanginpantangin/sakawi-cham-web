import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IkasSarakEnum, NasakEnum, SakawiType } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";
import { AwalYear } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { YearAhier } from "./yearAhier";
import { YearAwal } from "./yearAwal";
import { YearGregory } from "./yearGregory";
import { YearNavigation } from "./yearNavigation";

interface YearCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
}

export const YearCalendar = (props: YearCalendarProps) => {
    const initialAhierYear: AhierYear = { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 };
    const initialAwalYear: AwalYear = { ikasSarak: 0, yearNumber: 1400 };

    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');
    const [currentAhierYear, setCurrentAhierYear] = useState<AhierYear>(initialAhierYear);
    const [currentAwalYear, setCurrentAwalYear] = useState<AwalYear>(initialAwalYear);
    const [currentGregoryYear, setCurrentGregoryYear] = useState(new Date().getFullYear());

    React.useEffect(() => {
        function init() {
            // Set current matrix item 
            const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonthMatrix) {
                setCurrentAhierYear(currentAhierMonthMatrix.ahierMonth.year);
            }

            const currentAwalMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
            if (currentAwalMonthMatrix) {
                setCurrentAwalYear(currentAwalMonthMatrix.awalMonth.year);
            }
        }

        init();
    }, [props.matrixSakawi]);

    function handleOnClickToCurrentYear() {
        if (sakawiType === "sakawiAhier") {
            const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonthMatrix) {
                setCurrentAhierYear(currentAhierMonthMatrix.ahierMonth.year);
            }
        } else if (sakawiType === "sakawiAwal") {
            const currentAwalMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
            if (currentAwalMonthMatrix) {
                setCurrentAwalYear(currentAwalMonthMatrix.awalMonth.year);
            }
        } else {
            setCurrentGregoryYear(new Date().getFullYear());
        }
    }

    function handleOnClickPreviousYear() {
        if (sakawiType === "sakawiAhier") {
            const newAhierYear = Helper.addAhierYears(currentAhierYear, -1);
            setCurrentAhierYear(newAhierYear);
        } else if (sakawiType === "sakawiAwal") {
            const newAwalYear = Helper.addAwalYears(currentAwalYear, -1);
            setCurrentAwalYear(newAwalYear);
        } else {
            setCurrentGregoryYear(currentGregoryYear - 1);
        }
    }

    function handleOnClickNextYear() {
        if (sakawiType === "sakawiAhier") {
            const newAhierYear = Helper.addAhierYears(currentAhierYear, 1);
            setCurrentAhierYear(newAhierYear);
        } else if (sakawiType === "sakawiAwal") {
            const newAwalYear = Helper.addAwalYears(currentAwalYear, 1);
            setCurrentAwalYear(newAwalYear);
        } else {
            setCurrentGregoryYear(currentGregoryYear + 1);
        }
    }

    return (
        <Container>
            <Row>
                <YearNavigation
                    sakawiType={sakawiType}
                    currentAhierYear={currentAhierYear}
                    currentAwalYear={currentAwalYear}
                    currentGregoryYear={currentGregoryYear}
                    onClickToday={handleOnClickToCurrentYear}
                    onClickPreviousYear={handleOnClickPreviousYear}
                    onClickNextYear={handleOnClickNextYear}
                    onSelectSakawiType={type => setSakawiType(type)}
                />
            </Row>
            <Row>
                <Col md={12}>
                    {sakawiType === 'sakawiAhier' &&
                        <YearAhier
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAhierYear={currentAhierYear}
                        />
                    }
                    {sakawiType === 'sakawiAwal' &&
                        <YearAwal
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentAwalYear={currentAwalYear}
                        />
                    }
                    {sakawiType === 'sakawiGregory' &&
                        <YearGregory
                            matrixSakawi={props.matrixSakawi}
                            fullSakawi={props.fullSakawi}
                            currentGregoryYear={currentGregoryYear ?? new Date().getFullYear()}
                        />
                    }
                </Col>
            </Row>
        </Container>
    );
}