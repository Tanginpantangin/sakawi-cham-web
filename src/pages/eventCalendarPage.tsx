import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { EventCalendar } from "../components/eventCanlendar";
import { Layout } from "../Layout";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";

export declare type AreaType = 'NinhThuan' | 'BinhThuan';

export interface EventCalendarPageProps {
    matrixSakawiNT: MatrixCalendarType[];
    matrixSakawiBT: MatrixCalendarType[];
    fullSakawiNT: FullCalendarType[];
    fullSakawiBT: FullCalendarType[];
}

export const EventCalendarPage = (props: EventCalendarPageProps) => {
    const [areaType, setAreaType] = useState<AreaType>('NinhThuan');
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
    const [fullSakawi, setFullSakawi] = useState<FullCalendarType[]>([]);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        setLoading(true);
        function init() {
            setMatrixSakawi(areaType === "NinhThuan" ? props.matrixSakawiNT : props.matrixSakawiBT);
            setFullSakawi(areaType === "NinhThuan" ? props.fullSakawiNT : props.fullSakawiBT);
        }

        init();
        setLoading(false);
    }, [areaType, props.fullSakawiBT, props.fullSakawiNT, props.matrixSakawiBT, props.matrixSakawiNT]);

    if (loading) {
        return <Spinner animation="border" />
    }

    return (
        <Layout>
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={1}></Col>
                    <Col sm={12} md={12} lg={10}>
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
                    <Col sm={12} md={12} lg={1}></Col>
                </Row>
                {
                    matrixSakawi.length > 0 &&
                    <Row>
                        <Col sm={12} md={12} lg={1}></Col>
                        <Col sm={12} md={12} lg={10}>
                            <EventCalendar
                                matrixSakawi={matrixSakawi}
                                fullSakawi={fullSakawi}
                            />
                        </Col>
                        <Col sm={12} md={12} lg={1}></Col>
                    </Row>
                }
            </Container>
        </Layout>
    );
}