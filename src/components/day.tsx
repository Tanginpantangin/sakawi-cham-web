import { AhierDate } from "../model/AhierDate";
import { AwalDate } from "../model/AwalDate";

interface DayProps {
    date: Date;
    dateAwal?: AwalDate;
    dateAhier?: AhierDate;
}

const divStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row-reverse",
    fontSize: "0.8rem"
}

export const Day = (props: DayProps) => {
    return (
        <td>
            <div style={divStyle}>
                {props.date.getDate()}.{props.date.getMonth() + 1}
            </div>
            <div>

            </div>
        </td>
    );
}