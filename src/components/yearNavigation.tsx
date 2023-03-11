import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";
import { displayIkasSarakName, displayNasakName, IkasSarakEnum } from "../enums/enum";
import { AhierYear } from "../model/AhierDate";
import { AwalYear } from "../model/AwalDate";
import Helper from "../utility/helper";
import { SakawiType } from "../pages/monthCalendarPage";

interface YearNavigationProps {
    sakawiType: SakawiType;
    currentAhierYear?: AhierYear;
    currentAwalYear?: AwalYear;
    currentGregoryYear?: number;
    onSelectSakawiType: (type: SakawiType) => void
    onClickToday: (type: SakawiType) => void;
    onClickPreviousYear: (type: SakawiType) => void;
    onClickNextYear: (type: SakawiType) => void;
}

export const YearNavigation = (props: YearNavigationProps) => {
    return (
        <>
            <Col md={4}>
                {/* <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-start" }}>
                    <ButtonGroup aria-label="Type of calendar">
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAhier'} onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Chăm</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAwal'} onClick={() => props.onSelectSakawiType('sakawiAwal')}>Lịch Arab</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiGregory'} onClick={() => props.onSelectSakawiType('sakawiGregory')}>Dương lịch</Button>
                    </ButtonGroup>
                </ButtonToolbar> */}
            </Col>
            <Col md={5} style={{ textAlign: "center" }}>
                {props.sakawiType === 'sakawiAhier' && props.currentAhierYear &&
                    <>
                        <div>
                            <label className='bilan-title'>{displayNasakName(props.currentAhierYear.nasak).akharThrahName}</label>
                            {' - '}<label className='ikasSarak-title'>{displayIkasSarakName(props.currentAhierYear.ikasSarak)}</label>
                            {' - '}<label className='bilan-title'>{Helper.convertToChamDigitUnicode(props.currentAhierYear.yearNumber ?? 0)}</label>
                        </div>
                        <h5>
                            {displayNasakName(props.currentAhierYear.nasak).rumiName} {IkasSarakEnum[props.currentAhierYear.ikasSarak]}
                            {' - '}{props.currentAhierYear.yearNumber}
                        </h5>
                    </>
                }
                {props.sakawiType === 'sakawiAwal' && props.currentAwalYear &&
                    <h2>
                        {IkasSarakEnum[props.currentAwalYear.ikasSarak]}
                        {' - '}{props.currentAwalYear.yearNumber}
                    </h2>
                }
                {props.sakawiType === 'sakawiGregory' &&
                    <h2>{`Năm ${props.currentGregoryYear}`}</h2>
                }
            </Col>
            <Col md={3}>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-end" }}>
                    <ButtonGroup aria-label="Third group" style={{ marginRight: ".75em" }}>
                        <Button variant="secondary" onClick={() => props.onClickToday(props.sakawiType)}>Năm nay</Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label="Navigate months">
                        <Button variant="secondary" className="fa fa-chevron-left" onClick={() => props.onClickPreviousYear(props.sakawiType)} />
                        <Button variant="secondary" className="fa fa-chevron-right" onClick={() => props.onClickNextYear(props.sakawiType)} />
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
        </>
    );
}