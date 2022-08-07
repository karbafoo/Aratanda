import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { COLORS } from "../util/Colors";

export const MainScreen = () => {
    return (
        <div
            className="d-flex col start"
            style={{ height: "100%", overflow: "hidden" }}
        >
            <Navbar />
            <div
                className="d-flex col center"
                style={{
                    marginTop: "1vh",
                    overflow: "auto",
                    justifyContent: "flex-start",
                }}
            >
                {new Array(30).fill(0).map((_, i) => (
                    <Post key={i} post={{ id: i }} />
                ))}
            </div>
        </div>
    );
};
