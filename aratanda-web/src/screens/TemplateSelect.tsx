import { Link } from "react-router-dom";
import { COLORS } from "../util/Colors";

export const TempalteSelect = () => {
    return (
        <div
            className="d-flex col"
            style={{
                height: "100%",
                overflow: "hidden",
                justifyContent: "center",
            }}
        >
            <div
                className="d-flex col center"
                style={{
                    margin: "5vh 0",
                    overflow: "auto",
                    fontSize: 24,
                    color: COLORS.PINK,
                }}
            >
                CHOOSE A TEMPLATE
            </div>
            <div className="d-flex">
                <Boxy title="FreeStyle" />
                <Boxy title="Duo" disabled />
                <Boxy title="Random" disabled />
                <Boxy title="MORE TEMPLATES" disabled />
            </div>
        </div>
    );
};

const Boxy = ({ title, disabled }: { title: string; disabled?: boolean }) => {
    return (
        <Link
            style={{
                width: "10rem",
                height: "10rem",
                border: "2px solid " + COLORS.PINK,
                color: !disabled ? "white" : COLORS.GREY,
                backgroundColor: "transparent",
                textDecoration: "none",
            }}
            className="d-flex col"
            to={"/create/freestyle"}
        >
            <div>{title}</div>
        </Link>
    );
};
