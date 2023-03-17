import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { EventCalendar } from "../components/eventCanlendar";
import { Layout } from "../Layout";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import Helper from "../utility/helper";

export declare type SakawiType = 'sakawiAwal' | 'sakawiAhier' | 'sakawiGregory';
export declare type AreaType = 'NinhThuan' | 'BinhThuan';

export const EventCalendarPage = () => {
    const [areaType, setAreaType] = useState<AreaType>('NinhThuan');
    const [matrixSakawi, setMatrixSakawi] = useState<MatrixCalendarType[]>([]);
    const [fullSakawi, setFullSakawi] = useState<FullCalendarType[]>([]);

    React.useEffect(() => {
        function init() {
            // Build matrix Calendar
            let matrix = Helper.buildMatrixCalendar(2046, areaType);
            setMatrixSakawi(matrix.matrixCalendar);
            setFullSakawi(matrix.fullCalendar);
        }

        init();
    }, [areaType]);

    return (
        <Layout>
            <Container>
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
                {
                    matrixSakawi.length > 0 &&
                    <Row>
                        <EventCalendar
                            matrixSakawi={matrixSakawi}
                            fullSakawi={fullSakawi}
                        />
                    </Row>
                }
            </Container>
        </Layout>
    );
}