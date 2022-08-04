import { colors } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NFTLoader } from "../components/NFTLoader";
export const MixerScreen = () => {
    const [channels, setChannels] = React.useState([[], [], [], []]);
    const [dNFT, setdNFT] = React.useState<number | null>(null);

    const onNFTDrop = (i: number) => {
        console.log("onNFTDrop", i);
    };
    const onNFTDragStart = (i: number) => {
        setdNFT(i);
        console.log("onNFTDragStart", i);
    };
    const onNFTDragEnd = () => {
        console.log("onNFTDragEnd", null);
        setdNFT(null);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    height: "50vh",
                }}
            >
                <Box
                    sx={{
                        height: "400px",
                        width: "50%",
                        backgroundColor: "green",
                    }}
                >
                    <NFTSelect
                        onNFTDragStart={onNFTDragStart}
                        onNFTDragEnd={onNFTDragEnd}
                    />
                </Box>
                <Box
                    sx={{
                        height: "400px",
                        width: "50%",
                        backgroundColor: "red",
                    }}
                >
                    <GigaNFT />
                </Box>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    border: "1px solid green",
                }}
            >
                <Ruler />
                {channels.map((c, i) => (
                    <Channel
                        key={i + "c"}
                        channel={c}
                        index={i}
                        onNFTDrop={onNFTDrop}
                    />
                ))}
            </div>
        </div>
    );
};

const Ruler = () => {
    const canRef = React.useRef(null);
    const [range, setRange] = React.useState([0, 30 * 1e3]);

    const drawLine = (x: number, i: number) => {
        //@ts-ignore
        const ctx = canRef?.current?.getContext("2d");
        console.log(
            "canRef?.current?.clientWidth",
            //@ts-ignore
            canRef?.current?.clientWidth
        );

        ctx.beginPath(); // Start a new path
        ctx.strokeStyle = "black";
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 5);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.font = "8px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = "center";
        ctx.fillText(i.toString(), x, 12);
    };
    React.useEffect(() => {
        let dpi = window.devicePixelRatio;
        //@ts-ignore
        const canvas: Element = canRef.current;
        let style_height = +getComputedStyle(canvas)
            .getPropertyValue("height")
            .slice(0, -2);
        //get CSS width
        let style_width = +getComputedStyle(canvas)
            .getPropertyValue("width")
            .slice(0, -2);
        //scale the canvas
        canvas.setAttribute("height", (style_height * dpi).toString());
        canvas.setAttribute("width", (style_width * dpi).toString());

        const w = canvas.clientWidth - 10;
        let interv = w / 30;
        for (let i = 0; i <= 30; i++) {
            drawLine(i * interv + 5, i);
        }
    }, []);
    return (
        <canvas
            ref={canRef}
            //@ts-ignore
            width={canRef?.current?.clientWidth}
            style={{
                backgroundColor: "white",
                objectFit: "contain",
                height: "1rem",
            }}
        ></canvas>
    );
};
const Channel = ({
    channel,
    index,
    onNFTDrop,
}: {
    channel: number[];
    index: number;
    onNFTDrop: (i: number) => void;
}) => {
    const onDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        onNFTDrop(index);
    };
    const onDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
    };
    return (
        <div
            className="channel"
            style={{
                border: "1px solid red",
                width: "100%",
                padding: 8,
                flex: 1,
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            CHANNEL
        </div>
    );
};
const GigaNFT = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black",
                height: "100%",
                width: "100%",
            }}
        >
            {" "}
        </div>
    );
};
const NFTSelect = ({
    onNFTDragStart,
    onNFTDragEnd,
}: {
    onNFTDragStart: (i: number) => void;
    onNFTDragEnd: (i: number) => void;
}) => {
    const [loaderOpen, setLoaderOpen] = React.useState(false);
    const onLoaderOpen = () => {
        setLoaderOpen(true);
    };
    const onLoaderClose = () => {
        setLoaderOpen(false);
    };
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid black",
                height: "100%",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    padding: 8,
                    border: "1px solid black",
                }}
            >
                <h3 style={{ fontSize: 14, flex: 1, textAlign: "left" }}>
                    NFT Select
                </h3>
                <button onClick={onLoaderOpen}>ADD</button>
            </div>
            <div style={{ display: "flex", width: "100%" }}>
                <TabItem address="0x5F4849089942618b6c64A0459a1D764Dc43BfcD7" />
                <TabItem
                    address="0x5F4849089942618b6c64A0459a1D764Dc43BfcD7"
                    style={{ marginLeft: -18 }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    backgroundColor: "yellow",
                }}
            >
                <NFT
                    onNFTDragStart={() => onNFTDragStart(0)}
                    onNFTDragEnd={() => onNFTDragEnd(0)}
                />
            </div>

            <NFTLoader open={loaderOpen} onClose={onLoaderClose} />
        </div>
    );
};
const NFT = ({
    onNFTDragStart,
    onNFTDragEnd,
}: {
    onNFTDragStart: () => void;
    onNFTDragEnd: () => void;
}) => {
    const onDragStart = (e: React.DragEvent<HTMLElement>) => {
        onNFTDragStart();
    };
    const onDragEnd = (e: React.DragEvent<HTMLElement>) => {
        onNFTDragEnd();
    };

    return (
        <div
            style={{
                width: "5rem",
                height: "4rem",
                border: "1px solid cyan",
                backgroundColor: "grey",
                cursor: "pointer",
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            draggable
        >
            NFT
        </div>
    );
};
const TabItem = ({ address, style }: { address: string; style?: any }) => {
    return (
        <div
            style={{
                ...style,
            }}
            className="tab-item"
        >
            {address}
        </div>
    );
};
