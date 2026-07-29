import { chamWeekdays } from "../data/weekdays";
import { useLanguage } from "../i18n";

export const CalendarWeekdayHeader = () => {
  const { language } = useLanguage();

  return (
    <>
      {chamWeekdays.map((dayName, index) => (
        <th
          className={index === 0 ? "day-name day-name-primary" : "day-name"}
          key={dayName.latin}
          scope="col"
          title={language === "vi" ? dayName.vietnamese : dayName.latin}
        >
          <span className="weekday-cham">{dayName.cham}</span>
          <span className="weekday-latin">{dayName.latin}</span>
        </th>
      ))}
    </>
  );
};
