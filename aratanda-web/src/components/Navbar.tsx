import React from "react";
import { Link } from "react-router-dom";
import { COLORS } from "../util/Colors";

export const Navbar = () => {
    const [wallet, setWallet] = React.useState(
        "0x23581767a106ae21c074b2276d25e5c3e136a68b"
    );
    return (
        <div
            style={{
                width: "100%",
                backgroundColor: COLORS.PINK,
                boxShadow: "0 2px 4px 5px " + COLORS.PINK,
            }}
            className="d-flex"
        >
            <h1
                style={{
                    textAlign: "left",
                    padding: 8,
                    flex: 1,
                    color: "white",
                    textShadow: "2px 4px 1px " + COLORS.PURK,
                }}
            >
                Aratanda
            </h1>

            <div
                style={{
                    backgroundColor: COLORS.CRIMSON,
                    padding: 16,
                    margin: 8,
                    borderRadius: "3rem",
                    color: COLORS.LIGHTPINK,
                    overflow: "hidden",
                    textOverflow: "clip",
                    textShadow: "0 1px 1px #aaa",
                }}
            >
                {wallet ? (
                    <Link
                        style={{
                            display: "block",
                            fontSize: 10,
                            padding: 0,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                        to={"/create"}
                    >
                        CREATE
                    </Link>
                ) : null}
            </div>
            <div
                style={{
                    width: "10rem",
                    maxWidth: "15rem",
                    backgroundColor: COLORS.PURPLE,
                    padding: 16,
                    margin: 8,
                    borderRadius: "3rem",
                    color: COLORS.LIGHTPINK,
                    overflow: "hidden",
                    textOverflow: "clip",
                    textShadow: "0 1px 1px #aaa",
                }}
            >
                {wallet ? (
                    <div style={{ fontSize: 10 }}>{shortenAddress(wallet)}</div>
                ) : (
                    <div>CONNECT</div>
                )}
            </div>
            <div
                style={{
                    backgroundColor: COLORS.PURPLE,
                    width: "3rem",
                    height: "3rem",
                    margin: 8,
                    borderRadius: "50%",
                    color: COLORS.LIGHTPINK,
                    overflow: "hidden",
                    textOverflow: "clip",
                    textShadow: "0 1px 1px #aaa",
                    border: "1px solid " + COLORS.GREY,
                }}
                className="d-flex col"
            >
                {wallet ? (
                    <div style={{ fontSize: 10 }}>{`${10}🍬`}</div>
                ) : null}
            </div>
        </div>
    );
};

const shortenAddress = (a: string) => {
    return a.substring(0, 5) + "..." + a.substring(35, 40);
};
