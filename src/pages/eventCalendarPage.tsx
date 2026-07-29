import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { EventCalendar } from "../components/eventCanlendar";
import { useLanguage } from "../i18n";
import { Layout } from "../Layout";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";

export declare type AreaType = 'NinhThuan' | 'BinhThuan';

export interface EventCalendarPageProps {
    matrixSakawiNT: MatrixCalendarType[];
    matrixSakawiBT: MatrixCalendarType[];
    fullSakawiNT: FullCalendarType[];
    fullSakawiBT: FullCalendarType[];
}

export const EventCalendarPage = (props: EventCalendarPageProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const [areaType, setAreaType] = useState<AreaType>('NinhThuan');
    const [matrixSakawi, setMatrixSakawi] = useState(props.matrixSakawiNT);
    const [fullSakawi, setFullSakawi] = useState(props.fullSakawiNT);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        setMatrixSakawi(areaType === "NinhThuan" ? props.matrixSakawiNT : props.matrixSakawiBT);
        setFullSakawi(areaType === "NinhThuan" ? props.fullSakawiNT : props.fullSakawiBT);
    }, [areaType, props.fullSakawiBT, props.fullSakawiNT, props.matrixSakawiBT, props.matrixSakawiNT]);

    React.useEffect(() => {
        document.title = copy.metadata.eventsTitle;
        document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metadata.eventsDescription);
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy.metadata.eventsTitle);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.metadata.eventsDescription);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", copy.metadata.eventsTitle);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", copy.metadata.eventsDescription);
    }, [copy.metadata.eventsDescription, copy.metadata.eventsTitle]);

    if (loading) {
        return <Spinner animation="border" />
    }

    function handleOnchangeArea(areaType: AreaType) {
        setLoading(true);
        setAreaType(areaType);
        setMatrixSakawi(areaType === "NinhThuan" ? props.matrixSakawiNT : props.matrixSakawiBT);
        setFullSakawi(areaType === "NinhThuan" ? props.fullSakawiNT : props.fullSakawiBT);

        setLoading(false);
    }

    return (
        <Layout>
            <Container className="page-container event-page">
                <div className="calendar-page-heading">
                    <p className="page-eyebrow">{copy.shared.productName}</p>
                    <h1>{copy.events.title}</h1>
                    <p className="page-lede">{copy.events.lede}</p>
                </div>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <Form.Label className="area-selector-label">{copy.events.regionLabel}</Form.Label>
                            <div className="area-selector mb-3">
                                <Form.Check
                                    inline
                                    type={"radio"}
                                    label={copy.events.ninhThuan}
                                    checked={areaType === "NinhThuan"}
                                    onChange={() => { handleOnchangeArea('NinhThuan') }}
                                />
                                <Form.Check
                                    inline
                                    type={"radio"}
                                    label={copy.events.binhThuan}
                                    checked={areaType === "BinhThuan"}
                                    onChange={() => { handleOnchangeArea('BinhThuan') }}
                                />
                            </div>
                        </Form>
                    </Col>
                </Row>
                {
                    matrixSakawi.length > 0 &&
                    <Row>
                        <Col xs={12}>
                            <EventCalendar
                                matrixSakawi={matrixSakawi}
                                fullSakawi={fullSakawi}
                            />
                        </Col>
                    </Row>
                }
            </Container>
        </Layout>
    );
}
