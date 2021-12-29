import React, { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
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
        dateOfGregoryCalendar: initialGregoryDate,
        awalMonth: initialAwalMonth,
        dayNumbersOfAwalMonth: 0,
        firstDayOfAwalMonth: 0
    }

    const [showWarning, setShowWarning] = useState(true);
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
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
            setMatrixSakawi(matrix);
            console.log('matrix', JSON.stringify(matrix));

            // Set current matrix item 
            const currentAhierMonth = matrix.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];
            if (currentAhierMonth) {
                setCurrentAhierMonth(currentAhierMonth);
            }

            const currentAwalMonth = matrix.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
            if (currentAwalMonth) {
                setCurrentAwalMonth(currentAwalMonth);
            }

            const currentGregoryMonth = matrix.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAwalMonth) > new Date())[0];
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
                            - Ứng dụng đang trong quá trình phát triển, rất mong nhận được góp ý từ người dùng để sản phẩm được hoàn thiện hơn.
                            <br />- Sakawi năm hiện tại được tính theo Sakawi của Hội đồng Chức sắc phát hành.
                            Sakawi các năm tiếp theo chỉ mang tính chất tham khảo.
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={12}>
                    <CountDownBar dateName={"Rija Nagar"} variantType='success' toDate={new Date(2022, 4, 5)} />
                    <CountDownBar dateName={"Katé"} variantType='info' toDate={new Date(2022, 9, 5)} />
                    <CountDownBar dateName={"Ramâwan"} variantType='warning' toDate={new Date(2022, 3, 2)} />
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