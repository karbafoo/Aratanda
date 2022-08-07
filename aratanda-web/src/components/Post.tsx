import { COLORS } from "../util/Colors";
import { GetCompiledVid } from "../util/http";

export const Post = ({ post }: { post: GigaPost }) => {
    return (
        <div
            style={{
                marginTop: "1vh",
                width: "50vw",
                height: "50vh",
                minHeight: "50vh",
                border: "3px solid " + COLORS.GREY,
                backgroundColor: COLORS.PINK,
            }}
            className="d-flex col"
        >
            <div
                style={{
                    width: "100%",
                    backgroundColor: COLORS.PINK,
                    height: "40vh",
                }}
                className="d-flex col"
            >
                <video
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                    controls
                >
                    <source src={GetCompiledVid("")} type="video/mp4" />
                </video>
            </div>
            <div
                style={{
                    width: "100%",
                    backgroundColor: COLORS.PURPLE,
                    color: "white",
                    flex: 1,
                }}
                className="d-flex col"
            >
                <div className="d-flex start" style={{ padding: 8 }}>
                    <div className="d-flex start"> POST {post.id} </div>
                    <div
                        className="d-flex  start"
                        style={{ padding: "0 0.5rem", fontSize: 12 }}
                    >
                        <div className="d-flex start">
                            {23} <span style={{ fontSize: 22 }}>♡</span>
                        </div>
                        <div className="d-flex start">
                            {11}
                            <span style={{ fontSize: 22 }}>💬</span>
                        </div>
                    </div>
                </div>
                <div
                    className="d-flex col start"
                    style={{ color: COLORS.GREY, padding: 4, fontSize: 11 }}
                >
                    <div className="d-flex start">description</div>
                    <div className="d-flex start">owners</div>
                </div>
            </div>
        </div>
    );
};
