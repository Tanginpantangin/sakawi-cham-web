import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";
import { AwalMonthEnum, displayIkasSarakName, displayMonthName, displayNasakName, IkasSarakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { SakawiType } from "../pages/monthCalendarPage";
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
            <Col md={4}>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-start" }}>
                    <ButtonGroup aria-label="Type of calendar">
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAhier'} onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Cham</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAwal'} onClick={() => props.onSelectSakawiType('sakawiAwal')}>Lịch Awal</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiGregory'} onClick={() => props.onSelectSakawiType('sakawiGregory')}>Dương lịch</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
            <Col md={5} style={{ textAlign: "center" }}>
                {props.sakawiType === 'sakawiAhier' && props.currentAhierMonth &&
                    <>
                        <div className='bilan-title'>
                            {displayMonthName(props.currentAhierMonth.month).akharThrahName}
                            {' - '}{displayNasakName(props.currentAhierMonth.year.nasak).akharThrahName}
                            {'   '}<label className='ikasSarak-title'>{displayIkasSarakName(props.currentAhierMonth.year.ikasSarak)}</label>
                            {' - '}{Helper.convertToChamDigitUnicode(props.currentAhierMonth.year.yearNumber ?? 0)}
                        </div>
                        <div className='bilan-latin-title'>
                            {displayMonthName(props.currentAhierMonth.month).rumiName} {`(${(props.currentAhierMonth.month + 1)})`}
                            {' - '}{displayNasakName(props.currentAhierMonth.year.nasak).rumiName} {IkasSarakEnum[props.currentAhierMonth.year.ikasSarak]}
                            {' - '}{props.currentAhierMonth.year.yearNumber}
                        </div>
                    </>
                }
                {props.sakawiType === 'sakawiAwal' && props.currentAwalMonth &&
                    <>
                        <div className='bilan-latin-title'>
                            {AwalMonthEnum[props.currentAwalMonth.month]} {`(${(props.currentAwalMonth.month + 1)})`}
                            {' - '}{IkasSarakEnum[props.currentAwalMonth.year.ikasSarak]}
                            {' - '}{props.currentAwalMonth.year.yearNumber}
                        </div>
                        <br />
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
            <Col md={3}>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-end" }}>
                    <ButtonGroup aria-label="Third group" style={{ marginRight: ".75em" }}>
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