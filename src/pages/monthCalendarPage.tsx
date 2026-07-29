import React, { useState } from "react";
import { Accordion, Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CountDownBar, CountDownBarProps } from "../components/countDownBar";
import { MonthCalendar } from "../components/monthCalendar";
import { AreaType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { Layout } from "../Layout";
import { FullCalendarType } from "../model/FullCalendarType";
import { MatrixCalendarType } from "../model/MatrixCalendarType";
import { getSiteCopy } from "../siteContent";
import Helper from "../utility/helper";
import { persistCalendarRegion, resolveSavedCalendarRegion } from "../utils/calendarRegion";
import { parseDateParam } from "../utils/dateFormat";

export interface MonthCalendarPageProps {
    matrixSakawiNT: MatrixCalendarType[];
    matrixSakawiBT: MatrixCalendarType[];
    fullSakawiNT: FullCalendarType[];
    fullSakawiBT: FullCalendarType[];
}

export const MonthCalendarPage = (props: MonthCalendarPageProps) => {
    const location = useLocation();
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const initialSelectedDate = React.useMemo(
        () => parseDateParam(new URLSearchParams(location.search).get("date")),
        [location.search]
    );
    const [showWarning, setShowWarning] = useState(true);
    const [areaType, setAreaType] = useState<AreaType>(resolveSavedCalendarRegion);
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
        persistCalendarRegion(areaType);
        setLoading(false);
        
        // Cleanup function for asynchronous operations
        return () => {
            setLoading(false);
        };
    }, [areaType, props.fullSakawiBT, props.fullSakawiNT, props.matrixSakawiBT, props.matrixSakawiNT]);

    React.useEffect(() => {
        document.title = copy.metadata.calendarTitle;
        document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metadata.calendarDescription);
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy.metadata.calendarTitle);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.metadata.calendarDescription);
        document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", copy.metadata.calendarTitle);
        document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", copy.metadata.calendarDescription);
    }, [copy.metadata.calendarDescription, copy.metadata.calendarTitle]);

    React.useEffect(() => {
        const timerId = setTimeout(() => {
            setShowWarning(false);
        }, 30000);

        // Cleanup function for the timeout
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    if (loading) {
        return <Spinner animation="border" />
    }

    return (
        <Layout>
            <Container className="page-container calendar-page">
                <div className="calendar-page-heading">
                    <p className="page-eyebrow">{copy.shared.productName}</p>
                    <h1>{copy.calendar.title}</h1>
                    <p className="page-lede">{copy.calendar.lede}</p>
                </div>
                {showWarning &&
                    <Row>
                        <Col sm={12} md={12} lg={12}>
                            <Alert variant='info' onClose={() => setShowWarning(false)} dismissible>
                                <Alert.Heading>{copy.calendar.developmentTitle}</Alert.Heading>
                                - {copy.calendar.developmentBody}
                                <br />- {copy.calendar.referenceBody}
                            </Alert>
                        </Col>
                    </Row>
                }
                <Row>
                    <Col xs={12}>
                        <Form>
                            <Form.Label className="area-selector-label">{copy.calendar.regionLabel}</Form.Label>
                            <div className="area-selector mb-3" role="radiogroup" aria-label={copy.calendar.regionLabel}>
                                <Form.Check
                                    id="calendar-region-ninh-thuan"
                                    inline
                                    type={"radio"}
                                    label={copy.calendar.ninhThuan}
                                    name="calendar-region"
                                    checked={areaType === "NinhThuan"}
                                    onChange={() => { setAreaType('NinhThuan') }}
                                />
                                <Form.Check
                                    id="calendar-region-binh-thuan"
                                    inline
                                    type={"radio"}
                                    label={copy.calendar.binhThuan}
                                    name="calendar-region"
                                    checked={areaType === "BinhThuan"}
                                    onChange={() => { setAreaType('BinhThuan') }}
                                />
                            </div>
                            <p className="calendar-region-note">{copy.calendar.regionalWarning}</p>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Accordion defaultActiveKey="0">
                            <Card className="upcoming-events">
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        {copy.calendar.upcomingTitle}
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
                {
                    matrixSakawi.length > 0 &&
                    <Row>
                        <Col xs={12}>
                            <MonthCalendar
                                matrixSakawi={matrixSakawi}
                                fullSakawi={fullSakawi}
                                initialSelectedDate={initialSelectedDate}
                                areaLabel={areaType === "NinhThuan" ? copy.calendar.ninhThuan : copy.calendar.binhThuan}
                                upcomingEvents={nextEvents}
                            />
                        </Col>
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
