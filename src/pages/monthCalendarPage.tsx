import React, { useState } from "react";
import { Accordion, Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { CountDownBar, CountDownBarProps } from "../components/countDownBar";
import { MonthCalendar } from "../components/monthCalendar";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";

export declare type SakawiType = 'sakawiAwal' | 'sakawiAhier' | 'sakawiGregory';
export declare type AreaType = 'NinhThuan' | 'BinhThuan';

export const MonthCalendarPage = () => {
    const [showWarning, setShowWarning] = useState(true);
    const [areaType, setAreaType] = useState<AreaType>('NinhThuan');
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
    const [fullSakawi, setFullSakawi] = useState<FullCalendarType[]>([]);
    const [nextEvents, setNextEvents] = useState<CountDownBarProps[]>([]);

    React.useEffect(() => {
        function init() {
            // Build matrix Calendar
            let matrix = Helper.buildMatrixCalendar(2046, areaType);
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
    }, [areaType]);

    return (
        <Container>
            {showWarning &&
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Alert variant='info' onClose={() => setShowWarning(false)} dismissible>
                            <Alert.Heading>Lưu ý!</Alert.Heading>
                            - Ứng dụng đang trong quá trình phát triển nên còn những thiếu sót, rất mong nhận được nhiều góp ý để sản phẩm được hoàn thiện hơn.
                            <br />- Ứng dụng này chỉ mang tính chất tham khảo, Sakawi chính thức được Hội đồng Chức sắc phát hành từng năm.
                        </Alert>
                    </Col>
                </Row>
            }
            <Row>
                <Col md={4}>
                    <Form>
                        <div className="mb-3">
                            <Form.Check
                                inline
                                type={"radio"}
                                label={`Sakawi Ninh Thuận`}
                                checked={areaType === "NinhThuan"}
                                onChange={() => { setAreaType('NinhThuan') }}
                            />
                            <Form.Check
                                inline
                                type={"radio"}
                                label={`Sakawi Bình Thuận`}
                                checked={areaType === "BinhThuan"}
                                onChange={() => { setAreaType('BinhThuan') }}
                            />
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    [Các sự kiện sắp diễn ra]
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {nextEvents.map((item, index) =>
                                        <CountDownBar key={index} eventType={item.eventType} eventDate={item.eventDate} />
                                    )}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
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
            {/*{
                <Row>
                    <YearCalendar
                        matrixSakawi={matrixSakawi}
                        fullSakawi={fullSakawi}
                    />
                </Row>
            }*/}
        </Container>
    );
}