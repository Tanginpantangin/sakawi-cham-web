import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";
import { AwalMonthEnum, displayAhierMonthName, displayAwalMonthName, displayIkasSarakName, displayNasakName, IkasSarakEnum, SakawiType } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import Helper from "../utility/helper";

interface MonthNavigationProps {
    sakawiType: SakawiType;
    currentAhierMonth?: AhierMonth;
    currentAwalMonth?: AwalMonth;
    currentGregoryMonth?: number;
    currentGregoryYear?: number;
    onSelectSakawiType: (type: SakawiType) => void
    onClickToday: () => void;
    onClickPreviousMonth: () => void;
    onClickNextMonth: () => void;
}

export const MonthNavigation = (props: MonthNavigationProps) => {
    const currentGregoryMonth = props.currentGregoryMonth ? props.currentGregoryMonth + 1 : 1;

    return (
        <>
            <Col xs={12} lg={4} className="calendar-nav-section calendar-nav-section-left">
                <ButtonToolbar aria-label="Toolbar with button groups" className="calendar-nav-toolbar">
                    <ButtonGroup aria-label="Type of calendar" className="calendar-type-group">
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAhier'} onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Cham</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAwal'} onClick={() => props.onSelectSakawiType('sakawiAwal')}>Lịch Awal</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiGregory'} onClick={() => props.onSelectSakawiType('sakawiGregory')}>Dương lịch</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
            <Col xs={12} lg={5} className="calendar-nav-title">
                {props.sakawiType === 'sakawiAhier' && props.currentAhierMonth &&
                    <>
                        <div className='bilan-title'>
                            {displayAhierMonthName(props.currentAhierMonth.month).akharThrahName}
                            {' - '}{displayNasakName(props.currentAhierMonth.year.nasak).akharThrahName}
                            {'   '}<label className='ikasSarak-title'>{displayIkasSarakName(props.currentAhierMonth.year.ikasSarak)}</label>
                            {' - '}{Helper.convertToChamDigitUnicode(props.currentAhierMonth.year.yearNumber ?? 0)}
                        </div>
                        <div className='bilan-latin-title'>
                            {displayAhierMonthName(props.currentAhierMonth.month).rumiName} {`(${(props.currentAhierMonth.month + 1)})`}
                            {' - '}{displayNasakName(props.currentAhierMonth.year.nasak).rumiName} {IkasSarakEnum[props.currentAhierMonth.year.ikasSarak]}
                            {' - '}{props.currentAhierMonth.year.yearNumber}
                        </div>
                    </>
                }
                {props.sakawiType === 'sakawiAwal' && props.currentAwalMonth &&
                    <>
                        <div className='bilan-title'>
                            {displayAwalMonthName(props.currentAwalMonth.month).akharThrahName}
                            {' - '}<label className='ikasSarak-title'>{displayIkasSarakName(props.currentAwalMonth.year.ikasSarak)}</label>
                            {' - '}{Helper.convertToChamDigitUnicode(props.currentAwalMonth.year.yearNumber ?? 0)}
                        </div>
                        <div className='bilan-latin-title'>
                            {AwalMonthEnum[props.currentAwalMonth.month]} {`(${(props.currentAwalMonth.month + 1)})`}
                            {' - '}{IkasSarakEnum[props.currentAwalMonth.year.ikasSarak]}
                            {' - '}{props.currentAwalMonth.year.yearNumber}
                        </div>
                    </>
                }
                {props.sakawiType === 'sakawiGregory' &&
                    <>
                        <div className='bilan-latin-title'>
                            {`Tháng ${currentGregoryMonth} - ${props.currentGregoryYear}`}
                        </div>
                        <br />
                    </>
                }
            </Col>
            <Col xs={12} lg={3} className="calendar-nav-section calendar-nav-section-right">
                <ButtonToolbar aria-label="Toolbar with button groups" className="calendar-nav-toolbar">
                    <ButtonGroup aria-label="Third group" className="calendar-today-group">
                        <Button variant="secondary" onClick={props.onClickToday}>Hôm nay</Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label="Navigate months">
                        <Button variant="secondary" className="fa fa-chevron-left" onClick={props.onClickPreviousMonth} />
                        <Button variant="secondary" className="fa fa-chevron-right" onClick={props.onClickNextMonth} />
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
        </>
    );
}
