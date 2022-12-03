import React, { useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { SakawiType } from "./calendar";
import { YearNavigation } from "./yearNavigation";

interface EventCalendarProps {
    matrixSakawi: MatrixCalendarType[],
    fullSakawi: FullCalendarType[]
}

export const EventCalendar = (props: EventCalendarProps) => {
    const initialAhierYear: AhierYear = { nasak: NasakEnum.Pabuei, ikasSarak: IkasSarakEnum.JimLuic, yearNumber: 2019 };
    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');
    const [currentAhierYear, setCurrentAhierYear] = useState<AhierYear>(initialAhierYear);

    React.useEffect(() => {
        function init() {
            // Set current matrix item 
            const currentAhierMonthMatrix = props.matrixSakawi.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonthMatrix) {
                setCurrentAhierYear(currentAhierMonthMatrix.ahierMonth.year);
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
        }
    }

    function handleOnClickPreviousYear() {
        if (sakawiType === "sakawiAhier") {
            const newAhierYear = Helper.addAhierYears(currentAhierYear, -1);
            setCurrentAhierYear(newAhierYear);
        }
    }

    function handleOnClickNextYear() {
        if (sakawiType === "sakawiAhier") {
            const newAhierYear = Helper.addAhierYears(currentAhierYear, 1);
            setCurrentAhierYear(newAhierYear);
        }
    }

    let rows: JSX.Element[] = [];
    rows.push(
        <tr key={`sakawiAhier-row-`}>
            <td>{'BBB'}</td>
            <td>{'CCC'}</td>
        </tr>);

    return (
        <Container>
            <Row>
                {/* <MonthNavigation
                    sakawiType={sakawiType}
                    displayMonth={true}
                    displaySelectSakawiType={true}
                    currentAhierYear={currentAhierYear}
                    onClickCurrentBtn={handleOnClickToCurrentYear}
                    onClickPreviousBtn={handleOnClickPreviousYear}
                    onClickNextBtn={handleOnClickNextYear}
                    onSelectSakawiType={type => setSakawiType(type)}
                /> */}
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
                <Col md={12}>
                    EventCalendar
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th className="ahier-day-name" style={{ padding: "2px", textAlign: "center" }}>Col 1</th>
                                <th className="ahier-day-name" style={{ padding: "2px", textAlign: "center" }}>Col 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}