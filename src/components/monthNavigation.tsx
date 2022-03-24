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
    onSelectSakawiType: (type: SakawiType) => void
    onClickToday: () => void;
    onClickPreviousMonth: () => void;
    onClickNextMonth: () => void;
}

export const MonthNavigation = (props: MonthNavigationProps) => {
    // const [radioValue, setRadioValue] = useState('sakawiAhier');
    // const radioButtons = [
    //     { name: 'Lịch Chăm', value: 'sakawiAhier' },
    //     { name: 'Lịch Awal', value: 'sakawiAwal' },
    //     { name: 'Dương lịch', value: 'sakawiGregory' },
    // ];

    return (
        <>
            <Col md={4}>
                <ButtonToolbar aria-label="Toolbar with button groups" style={{ justifyContent: "flex-start" }}>
                    {/* <ButtonGroup>
                        {radioButtons.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant="secondary"
                                //variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => {
                                    props.onSelectSakawiType(e.currentTarget.value as SakawiType);
                                    setRadioValue(e.currentTarget.value);
                                }}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup> */}
                    <ButtonGroup aria-label="Type of calendar">
                        <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiAhier')}>Lịch Chăm</Button>
                        <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiAwal')}>Lịch Awal</Button>
                        <Button variant="secondary" onClick={() => props.onSelectSakawiType('sakawiGregory')}>Dương lịch</Button>
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
                    <>
                        <h2>
                            {AwalMonthEnum[props.currentAwalMonth.month]} {`(${(props.currentAwalMonth.month + 1)})`}
                            {' - '}{IkasSarakEnum[props.currentAwalMonth.year.ikasSarak]}
                            {' - '}{props.currentAwalMonth.year.yearNumber}
                        </h2>
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