import React, { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";
import { CountDownBar, CountDownBarProps } from "./countDownBar";
import { MonthCalendar } from "./monthCalendar";

export declare type SakawiType = 'sakawiAwal' | 'sakawiAhier' | 'sakawiGregory';

export const Calendar = () => {
    const [showWarning, setShowWarning] = useState(true);
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
    const [fullSakawi, setFullSakawi] = useState<FullCalendarType[]>([]);
    const [nextEvents, setNextEvents] = useState<CountDownBarProps[]>([]);

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

            const nextEvents = Helper.getNextEvents(matrix.fullCalendar);
            setNextEvents(nextEvents);
        }

        init();
    }, []);

    return (
        <>
            {showWarning &&
                <Row>
                    <Col md={12}>
                        <Alert variant='info' onClose={() => setShowWarning(false)} dismissible>
                            <Alert.Heading>L??u ??!</Alert.Heading>
                            - ???ng d???ng ??ang trong qu?? tr??nh ph??t tri???n n??n kh??ng tr??nh kh???i nh???ng thi???u s??t, r???t mong nh???n ???????c nhi???u g??p ?? ????? s???n ph???m ???????c ho??n thi???n h??n.
                            <br />- ???ng d???ng n??y ch??? mang t??nh ch???t tham kh???o, Sakawi ch??nh th???c ???????c H???i ?????ng Ch???c s???c ph??t h??nh t???ng n??m.
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={12}>
                    {nextEvents.map((item, index) =>
                        <CountDownBar key={index} eventType={item.eventType} eventDate={item.eventDate} />
                    )}
                </Col>
            </Row>
            <br />
            {
                matrixSakawi.length > 0 &&
                <Row>
                    <MonthCalendar
                        matrixSakawi={matrixSakawi}
                        fullSakawi={fullSakawi}
                    />
                </Row>
            }
        </>
    );
}