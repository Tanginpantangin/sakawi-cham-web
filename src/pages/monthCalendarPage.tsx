import React, { useState } from "react";
import { Accordion, Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { CountDownBar, CountDownBarProps } from "../components/countDownBar";
import { MonthCalendar } from "../components/monthCalendar";
import { AreaType } from "../enums/enum";
import { Layout } from "../Layout";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";

export interface MonthCalendarPageProps {
    matrixSakawiNT: MatrixCalendarType[];
    matrixSakawiBT: MatrixCalendarType[];
    fullSakawiNT: FullCalendarType[];
    fullSakawiBT: FullCalendarType[];
}

export const MonthCalendarPage = (props: MonthCalendarPageProps) => {
    const [showWarning, setShowWarning] = useState(true);
    const [areaType, setAreaType] = useState<AreaType>('NinhThuan');
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
    const [fullSakawi, setFullSakawi] = useState<FullCalendarType[]>([]);
    const [nextEvents, setNextEvents] = useState<CountDownBarProps[]>([]);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        setLoading(true);

        function init() {
            setMatrixSakawi(areaType === "NinhThuan" ? props.matrixSakawiNT : props.matrixSakawiBT);
            setFullSakawi(areaType === "NinhThuan" ? props.fullSakawiNT : props.fullSakawiBT);

            const nextEvents = Helper.getNextEvents(areaType === "NinhThuan" ? props.fullSakawiNT : props.fullSakawiBT);
            setNextEvents(nextEvents);
        }

        init();
        setLoading(false);
    }, [areaType, props.fullSakawiBT, props.fullSakawiNT, props.matrixSakawiBT, props.matrixSakawiNT]);

    React.useEffect(() => {
        setTimeout(() => {
            setShowWarning(false);
        }, 30000);
    });

    if (loading) {
        return <Spinner animation="border" />
    }

    return (
        <Layout>
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
        </Layout>
    );
}