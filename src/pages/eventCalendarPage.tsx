import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { EventCalendar } from "../components/eventCanlendar";
import { AreaType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { Layout } from "../Layout";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import { persistCalendarRegion, resolveSavedCalendarRegion } from "../utils/calendarRegion";

export interface EventCalendarPageProps {
    matrixSakawiNT: MatrixCalendarType[];
    matrixSakawiBT: MatrixCalendarType[];
    fullSakawiNT: FullCalendarType[];
    fullSakawiBT: FullCalendarType[];
}

export const EventCalendarPage = (props: EventCalendarPageProps) => {
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const [areaType, setAreaType] = useState<AreaType>(resolveSavedCalendarRegion);

    const matrixSakawi = areaType === "NinhThuan" ? props.matrixSakawiNT : props.matrixSakawiBT;
    const fullSakawi = areaType === "NinhThuan" ? props.fullSakawiNT : props.fullSakawiBT;
    const nextEvents = React.useMemo(() => Helper.getNextEvents(fullSakawi), [fullSakawi]);

    React.useEffect(() => {
        document.title = copy.metadata.eventsTitle;
        document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metadata.eventsDescription);
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy.metadata.eventsTitle);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.metadata.eventsDescription);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", copy.metadata.eventsTitle);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", copy.metadata.eventsDescription);
    }, [copy.metadata.eventsDescription, copy.metadata.eventsTitle]);

    React.useEffect(() => {
        persistCalendarRegion(areaType);
    }, [areaType]);

    function handleRegionChange(nextAreaType: AreaType) {
        setAreaType(nextAreaType);
    }

    return (
        <Layout>
            <Container className="page-container event-page">
                <h1 className="sr-only">{copy.events.title}</h1>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <Form.Label className="area-selector-label">{copy.events.regionLabel}</Form.Label>
                            <div className="area-selector mb-2" role="radiogroup" aria-label={copy.events.regionLabel}>
                                <Form.Check
                                    id="events-region-ninh-thuan"
                                    inline
                                    type={"radio"}
                                    label={copy.events.ninhThuan}
                                    name="events-region"
                                    checked={areaType === "NinhThuan"}
                                    onChange={() => { handleRegionChange('NinhThuan') }}
                                />
                                <Form.Check
                                    id="events-region-binh-thuan"
                                    inline
                                    type={"radio"}
                                    label={copy.events.binhThuan}
                                    name="events-region"
                                    checked={areaType === "BinhThuan"}
                                    onChange={() => { handleRegionChange('BinhThuan') }}
                                />
                            </div>
                            <p className="calendar-region-note">{copy.events.regionNote}</p>
                        </Form>
                    </Col>
                </Row>
                {
                    matrixSakawi.length > 0 ? (
                    <Row>
                        <Col xs={12}>
                            <EventCalendar
                                matrixSakawi={matrixSakawi}
                                fullSakawi={fullSakawi}
                                nextEvents={nextEvents}
                                areaType={areaType}
                                areaLabel={areaType === "NinhThuan" ? copy.events.ninhThuan : copy.events.binhThuan}
                            />
                        </Col>
                    </Row>
                    ) : (
                        <Spinner animation="border" />
                    )
                }
            </Container>
        </Layout>
    );
}
