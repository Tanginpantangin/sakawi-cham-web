import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";
import { AwalMonthEnum, displayIkasSarakName, displayMonthName, displayNasakName, IkasSarakEnum } from "../enums/enum";
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
                        <div>
                            <label className='bilan-title'>{displayMonthName(props.currentAhierMonth.month).akharThrahName}</label>
                            {' - '}<label className='bilan-title'>{displayNasakName(props.currentAhierMonth.year.nasak).akharThrahName}</label>
                            {'   '}<label className='ikasSarak-title'>{displayIkasSarakName(props.currentAhierMonth.year.ikasSarak)}</label>
                            {' - '}<label className='bilan-title'>{Helper.convertToChamDigitUnicode(props.currentAhierMonth.year.yearNumber ?? 0)}</label>
                        </div>
                        <h5>
                            {displayMonthName(props.currentAhierMonth.month).rumiName} {`(${(props.currentAhierMonth.month + 1)})`}
                            {' - '}{displayNasakName(props.currentAhierMonth.year.nasak).rumiName} {IkasSarakEnum[props.currentAhierMonth.year.ikasSarak]}
                            {' - '}{props.currentAhierMonth.year.yearNumber}
                        </h5>
                    </>
                }
                {props.sakawiType === 'sakawiAwal' && props.currentAwalMonth &&
                    <h5>
                        {AwalMonthEnum[props.currentAwalMonth.month]} {`(${(props.currentAwalMonth.month + 1)})`}
                        {' - '}{IkasSarakEnum[props.currentAwalMonth.year.ikasSarak]}
                        {' - '}{props.currentAwalMonth.year.yearNumber}
                    </h5>
                }
                {props.sakawiType === 'sakawiGregory' &&
                    <h5>{`Tháng ${currentGregoryMonth} - ${props.currentGregoryYear}`}</h5>
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