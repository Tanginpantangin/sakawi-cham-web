import { Button, ButtonGroup, ButtonToolbar, Col } from "react-bootstrap";
import { AwalMonthEnum, displayAhierMonthName, displayAwalMonthName, displayIkasSarakName, displayNasakName, IkasSarakEnum, SakawiType } from "../enums/enum";
import { useLanguage } from "../i18n";
import { AhierMonth } from "../model/AhierDate";
import { AwalMonth } from "../model/AwalDate";
import { getSiteCopy } from "../siteContent";
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
    const { language } = useLanguage();
    const copy = getSiteCopy(language);
    const currentGregoryMonth = (props.currentGregoryMonth ?? 0) + 1;

    return (
        <>
            <Col xs={12} lg={4} className="calendar-nav-section calendar-nav-section-left">
                <ButtonToolbar aria-label={copy.calendar.legendTitle} className="calendar-nav-toolbar">
                    <ButtonGroup aria-label={copy.calendar.legendTitle} className="calendar-type-group">
                        <Button variant="outline-secondary" active={props.sakawiType === "sakawiAhier"} aria-pressed={props.sakawiType === "sakawiAhier"} onClick={() => props.onSelectSakawiType("sakawiAhier")}>{copy.calendar.systemCham}</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === "sakawiAwal"} aria-pressed={props.sakawiType === "sakawiAwal"} onClick={() => props.onSelectSakawiType("sakawiAwal")}>{copy.calendar.systemAwal}</Button>
                        <Button variant="outline-secondary" active={props.sakawiType === "sakawiGregory"} aria-pressed={props.sakawiType === "sakawiGregory"} onClick={() => props.onSelectSakawiType("sakawiGregory")}>{copy.calendar.systemGregorian}</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
            <Col xs={12} lg={5} className="calendar-nav-title">
                {props.sakawiType === "sakawiAhier" && props.currentAhierMonth &&
                    <>
                        <div className="bilan-title">
                            {displayAhierMonthName(props.currentAhierMonth.month).akharThrahName}
                            {" - "}{displayNasakName(props.currentAhierMonth.year.nasak).akharThrahName}
                            {"   "}<label className="ikasSarak-title">{displayIkasSarakName(props.currentAhierMonth.year.ikasSarak)}</label>
                            {" - "}{Helper.convertToChamDigitUnicode(props.currentAhierMonth.year.yearNumber ?? 0)}
                        </div>
                        <div className="bilan-latin-title">
                            {displayAhierMonthName(props.currentAhierMonth.month).rumiName} {`(${(props.currentAhierMonth.month + 1)})`}
                            {" - "}{displayNasakName(props.currentAhierMonth.year.nasak).rumiName} {IkasSarakEnum[props.currentAhierMonth.year.ikasSarak]}
                            {" - "}{props.currentAhierMonth.year.yearNumber}
                        </div>
                    </>
                }
                {props.sakawiType === "sakawiAwal" && props.currentAwalMonth &&
                    <>
                        <div className="bilan-title">
                            {displayAwalMonthName(props.currentAwalMonth.month).akharThrahName}
                            {" - "}<label className="ikasSarak-title">{displayIkasSarakName(props.currentAwalMonth.year.ikasSarak)}</label>
                            {" - "}{Helper.convertToChamDigitUnicode(props.currentAwalMonth.year.yearNumber ?? 0)}
                        </div>
                        <div className="bilan-latin-title">
                            {AwalMonthEnum[props.currentAwalMonth.month]} {`(${(props.currentAwalMonth.month + 1)})`}
                            {" - "}{IkasSarakEnum[props.currentAwalMonth.year.ikasSarak]}
                            {" - "}{props.currentAwalMonth.year.yearNumber}
                        </div>
                    </>
                }
                {props.sakawiType === "sakawiGregory" &&
                    <>
                        <div className="bilan-latin-title">
                            {`${copy.calendar.month} ${currentGregoryMonth} - ${props.currentGregoryYear}`}
                        </div>
                        <br />
                    </>
                }
            </Col>
            <Col xs={12} lg={3} className="calendar-nav-section calendar-nav-section-right">
                <ButtonToolbar aria-label={`${copy.calendar.previousMonth} / ${copy.calendar.nextMonth}`} className="calendar-nav-toolbar">
                    <ButtonGroup aria-label={copy.calendar.today} className="calendar-today-group">
                        <Button variant="secondary" aria-label={copy.calendar.today} onClick={props.onClickToday}>{copy.calendar.today}</Button>
                    </ButtonGroup>
                    <ButtonGroup aria-label={`${copy.calendar.previousMonth} / ${copy.calendar.nextMonth}`}>
                        <Button variant="secondary" className="fa fa-chevron-left" aria-label={copy.calendar.previousMonth} onClick={props.onClickPreviousMonth} />
                        <Button variant="secondary" className="fa fa-chevron-right" aria-label={copy.calendar.nextMonth} onClick={props.onClickNextMonth} />
                    </ButtonGroup>
                </ButtonToolbar>
            </Col>
        </>
    );
};
