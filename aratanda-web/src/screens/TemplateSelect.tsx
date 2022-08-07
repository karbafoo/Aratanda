import { COLORS } from "../util/Colors";

export const TempalteSelect = () => {
    return (
        <div
            className="d-flex col start"
            style={{ height: "100%", overflow: "hidden" }}
        >
            <div
                className="d-flex col center"
                style={{
                    marginTop: "1vh",
                    overflow: "auto",
                }}
            >
                Test
            </div>
            <div className="d-flex" style={{ flex: 1 }}>
                <Boxy title="FreeStyle" />
                <Boxy title="Duo" />
                <Boxy title="Random" />
                <Boxy title="MORE TEMPLATES" />
            </div>
        </div>
    );
};

const Boxy = ({ title, disabled }: { title: string; disabled?: boolean }) => {
    return (
        <button
            style={{
                width: "10rem",
                height: "10rem",
                border: "2px solid " + COLORS.PINK,
                color: "white",
                backgroundColor: "transparent",
            }}
            className="d-flex col"
            disabled={disabled}
        >
            <div>{title}</div>
        </button>
    );
};
