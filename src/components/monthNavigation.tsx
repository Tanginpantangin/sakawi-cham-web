import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";
import { AhierMonthEnum, AwalMonthEnum, displayIkasSarakName, displayMonthName, displayNasakName, IkasSarakEnum, NasakEnum } from "../enums/enum";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import Helper from "../utility/helper";
import { SakawiType } from "./calendar";

interface MonthNavigationProps {
    sakawiType: SakawiType;
    currentAhierMonth?: AhierMonth;
    currentAwalMonth?: AwalMonth;
    currentGregoryMonth?: number;
    currentGregoryYear?: number;
    onSelectSakawiType: (type: SakawiType) => void
    onClickToday: (type: SakawiType) => void;
    onClickPreviousMonth: (type: SakawiType) => void;
    onClickNextMonth: (type: SakawiType) => void;
}

export const MonthNavigation = (props: MonthNavigationProps) => {
    const currentGregoryMonth = props.currentGregoryMonth ? props.currentGregoryMonth + 1 : 1;

    return (
        <>
            <Col md={4}>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-start" }}>
                    <ButtonGroup aria-label="Type of calendar">
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAhier'} onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Chăm</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiAwal'} onClick={() => props.onSelectSakawiType('sakawiAwal')}>Lịch Arab</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === 'sakawiGregory'} onClick={() => props.onSelectSakawiType('sakawiGregory')}>Dương lịch</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
            <Col md={5} style={{ textAlign: "center" }}>
                {props.sakawiType === 'sakawiAhier' && props.currentAhierMonth &&
                    <>
                        <div>
                            <label className='bilan-title'>{displayMonthName(props.currentAhierMonth.month)}</label>
                            {' - '}<label className='bilan-title'>{displayNasakName(props.currentAhierMonth.year.nasak)}</label>
                            {' - '}<label className='ikasSarak-title'>{displayIkasSarakName(props.currentAhierMonth.year.ikasSarak)}</label>
                            {' - '}<label className='bilan-title'>{Helper.convertToChamDigitUnicode(props.currentAhierMonth.year.yearNumber ?? 0)}</label>
                        </div>
                        <h5>
                            {AhierMonthEnum[props.currentAhierMonth.month]} {`(${(props.currentAhierMonth.month + 1)})`}
                            {' - '}{NasakEnum[props.currentAhierMonth.year.nasak]} {IkasSarakEnum[props.currentAhierMonth.year.ikasSarak]}
                            {' - '}{props.currentAhierMonth.year.yearNumber}
                        </h5>
                    </>
                }
                {props.sakawiType === 'sakawiAwal' && props.currentAwalMonth &&
                    <h2>
                        {AwalMonthEnum[props.currentAwalMonth.month]} {`(${(props.currentAwalMonth.month + 1)})`}
                        {' - '}{IkasSarakEnum[props.currentAwalMonth.year.ikasSarak]}
                        {' - '}{props.currentAwalMonth.year.yearNumber}
                    </h2>
                }
                {props.sakawiType === 'sakawiGregory' &&
                    <h2>{`Tháng ${currentGregoryMonth} - Năm ${props.currentGregoryYear}`}</h2>
                }
            </Col>
            <Col md={3}>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-end" }}>
                    <ButtonGroup aria-label="Third group" style={{ marginRight: ".75em" }}>
                        <Button variant="secondary" onClick={() => props.onClickToday(props.sakawiType)}>Hôm nay</Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label="Navigate months">
                        <Button variant="secondary" className="fa fa-chevron-left" onClick={() => props.onClickPreviousMonth(props.sakawiType)} />
                        <Button variant="secondary" className="fa fa-chevron-right" onClick={() => props.onClickNextMonth(props.sakawiType)} />
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
        </>
    );
}