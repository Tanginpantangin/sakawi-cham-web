import React, { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { AhierMonthEnum, GuecTypeEnum, GuenTypeEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { CountDownBar } from "./countDownBar";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";
import { MonthGregory } from "./monthGregory";

export declare type SakawiType = 'sakawiAwal' | 'sakawiAhier' | 'sakawiGregory';

export const Calendar = () => {
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

    const [showWarning, setShowWarning] = useState(true);
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
    const [fullSakawi, setFullSakawi] = useState<FullCalendarType[]>([]);
    const [currentAhierMonth, setCurrentAhierMonth] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    const [currentAwalMonth, setCurrentAwalMonth] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    const [currentGregoryMonth, setCurrentGregoryMonth] = useState<MatrixCalendarType>(initialMatrixCalendarType);
    // const [year] = useState(new Date().getFullYear());
    // const [month] = useState(new Date().getMonth());
    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');

    React.useEffect(() => {
        function init() {
            // Build matrix Calendar
            let matrix = Helper.buildMatrixCalendar(2046);
            //let matrix = Helper.buildMatrixCalendar(2023);
            setMatrixSakawi(matrix.matrixCalendar);
            //console.log('matrixCalendar', JSON.stringify(matrix.matrixCalendar));
            setFullSakawi(matrix.fullCalendar);
            //console.log('fullCalendar', JSON.stringify(matrix.fullCalendar));

            //TO-TEST
            /*const addedAwalMonth = Helper.addAwalMonths({ month: AwalMonthEnum.Julhiijaah, year: { ikasSarak: IkasSarakEnum.Dal, yearNumber: 1443 } }, 1);
            console.log('addedAwalMonth', JSON.stringify(addedAwalMonth));*/

            /*const firstDateOfAwalMonth: AwalDate = { date: 1, awalMonth: { month: AwalMonthEnum.Julhiijaah, year: { ikasSarak: IkasSarakEnum.Dal, yearNumber: 1443 } } };
            const addedAwalDate = Helper.addAwalDays(firstDateOfAwalMonth, 27);
            console.log('fullCalfirstDateOfAwalMonthendar', JSON.stringify(firstDateOfAwalMonth));
            console.log('addedAwalDate', JSON.stringify(addedAwalDate));*/

            // Set current matrix item 
            const currentAhierMonth = matrix.matrixCalendar.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonth) {
                setCurrentAhierMonth(currentAhierMonth);
            }

            const currentAwalMonth = matrix.matrixCalendar.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
            if (currentAwalMonth) {
                setCurrentAwalMonth(currentAwalMonth);
            }

            const currentGregoryMonth = matrix.matrixCalendar.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];//TODO
            if (currentGregoryMonth) {
                setCurrentGregoryMonth(currentGregoryMonth);
            }
        }

        init();
    }, [sakawiType]);

    function onSelectSakawiType(type: SakawiType) {
        setSakawiType(type);
    }

    return (
        <>
            {showWarning &&
                <Row>
                    <Col md={12}>
                        <Alert variant='info' onClose={() => setShowWarning(false)} dismissible>
                            <Alert.Heading>Lưu ý!</Alert.Heading>
                            - Ứng dụng đang trong quá trình phát triển nên còn nhiều thiếu sót, rất mong nhận được nhiều góp ý để sản phẩm được hoàn thiện hơn.
                            <br />- Ứng dụng này chỉ mang tính chất tham khảo, Sakawi chính thức được Hội đồng Chức sắc phát hành từng năm.
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={12}>
                    <CountDownBar eventType="Rija Nagar" eventDate={new Date(2022, 4, 5)} />
                    <CountDownBar eventType="Katé angaok bimong" eventDate={new Date(2022, 9, 24)} />
                    <CountDownBar eventType="Tamâ ricaow Ramâwan" eventDate={new Date(2022, 3, 2)} />
                </Col>
            </Row>
            <br />
            {
                matrixSakawi.length > 0 &&
                <Row>
                    {sakawiType === 'sakawiGregory' &&
                        <MonthGregory
                            matrixSakawi={matrixSakawi}
                            currentGregoryMonthMatrix={currentGregoryMonth}
                            onSelectSakawiType={onSelectSakawiType}
                        />
                    }
                    {sakawiType === 'sakawiAwal' &&
                        <MonthAwal
                            matrixSakawi={matrixSakawi}
                            fullSakawi={fullSakawi}
                            currentAwalMonthMatrix={currentAwalMonth}
                            onSelectSakawiType={onSelectSakawiType}
                        />
                    }
                    {sakawiType === 'sakawiAhier' &&
                        <MonthAhier
                            matrixSakawi={matrixSakawi}
                            currentAhierMonthMatrix={currentAhierMonth}
                            onSelectSakawiType={onSelectSakawiType}
                        />
                    }
                </Row>
            }
        </>
    );
}