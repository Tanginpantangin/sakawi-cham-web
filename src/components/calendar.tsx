import React, { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { AhierMonthEnum, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { CountDownBar } from "./countDownBar";
import { Month } from "./month";
import { MonthAhier } from "./monthAhier";
import { MonthAwal } from "./monthAwal";

export declare type SakawiType = 'sakawiAwal' | 'sakawiAhier' | 'solarCalendar';

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
    const [year] = useState(new Date().getFullYear());
    const [month] = useState(new Date().getMonth());
    const [sakawiType, setSakawiType] = useState<SakawiType>('sakawiAhier');

    // Sakawi Awal
    let awalMonth: AwalMonth = { month: 0, year: { ikasSarak: IkasSarakEnum.Hak } };
    const [monthAwal] = useState(awalMonth);

    React.useEffect(() => {
        function init() {
            // Build matrix Calendar
            let matrix = Helper.buildMatrixCalendar(2046);
            setMatrixSakawi(matrix);
            //console.log('matrix', JSON.stringify(matrix));

            // Current matrix item 
            const currentAhierMonth = matrix.filter(m =>
                Helper.addGregoryDays(m.dateOfGregoryCalendar, m.dayNumbersOfAhierMonth) > new Date())[0];

            if (currentAhierMonth) {
                setCurrentAhierMonth(currentAhierMonth);
            }
        }

        init();
    }, []);

    function onSelectSakawiType(type: SakawiType) {
        setSakawiType(type);
    }

    return (
        <>
            {showWarning &&
                <Row>
                    <Col md={12}>
                        <Alert variant='danger' onClose={() => setShowWarning(false)} dismissible>
                            <Alert.Heading>Lưu ý!</Alert.Heading>
                            Sakawi năm hiện tại được tính theo Sakawi của Hội đồng chức sắc phát hành.
                            Sakawi các năm tiếp theo chỉ mang tính chất tham khảo.
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={12}>
                    <CountDownBar dateName={"Rija Nagar"} variantType='success' toDate={new Date(2022, 4, 28)} />
                    <CountDownBar dateName={"Katé"} variantType='info' toDate={new Date(2021, 9, 5)} />
                    <CountDownBar dateName={"Ramawan"} variantType='warning' toDate={new Date(2022, 4, 2)} />
                </Col>
            </Row>
            <br />
            {matrixSakawi.length > 0 &&
                <Row>
                    {sakawiType === 'solarCalendar' && <Month year={year} month={month} />}
                    {sakawiType === 'sakawiAwal' &&
                        <MonthAwal
                            awalMonth={monthAwal}
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
                </Row>}
        </>
    );
}