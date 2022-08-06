import { Box } from "@mui/system";
import React from "react";
import { NFTAdder } from "../components/NFTAdder";
import { NFTLoader } from "../components/NFTLoader";
import { useGetCollectionNFTs } from "../hooks/Zora";
import { COLORS } from "../util/Colors";
import { getIPFS } from "../util/IPFS";
export const MixerScreen = () => {
    const [channels, setChannels] = React.useState<any[][]>([[], [], [], []]);
    const [channelNFTs, setChannelNFTs] = React.useState<ZoraNFT[]>([]);
    const [dNFT, setdNFT] = React.useState<ZoraNFT | null>(null);
    const [dsNFT, setdsNFT] = React.useState<ZoraNFT | null>(null);
    const [dsChannel, setdsChannel] = React.useState<number | null>(null);

    const onNFTDrop = (i: number) => {
        console.log("onNFTDrop", i, dNFT);
        setdsNFT(dNFT);
        setdsChannel(i);
    };
    const onNFTDragStart = (i: ZoraNFT) => {
        setdNFT(i);
        console.log("onNFTDragStart", i);
    };
    const onNFTDragEnd = () => {
        console.log("onNFTDragEnd", null);
        setdNFT(null);
    };
    const onUpdateChannel = (c: any[]) => {
        console.log("update channel ", dsChannel, c);
        if (dsChannel != null && dsNFT != null) {
            const cc = channels;
            cc[dsChannel] = c;
            setChannels([...cc]);
            const cn = channelNFTs;
            cn[dsChannel] = dsNFT;
            setChannelNFTs([...cn]);
        }
    };
    const onCloseAdder = () => {
        setdsNFT(null);
        setdsChannel(null);
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
            <NFTAdder
                nft={dsNFT}
                onClose={onCloseAdder}
                onUpdate={onUpdateChannel}
            />
        </div>
    );
};

const Ruler = () => {
    const canRef = React.useRef(null);
    const [range, setRange] = React.useState([0, 30 * 1e3]);

    const drawLine = (x: number, i: number) => {
        //@ts-ignore
        const ctx = canRef?.current?.getContext("2d");

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
                border: "1px solid " + COLORS.PINK,
                height: "100%",
                width: "100%",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    padding: 8,
                    borderBottom: "1px solid black",
                    backgroundColor: COLORS.PURPLE,
                }}
            >
                <h3
                    style={{
                        fontSize: 14,
                        flex: 1,
                        textAlign: "left",
                        color: "white",
                    }}
                >
                    Product
                </h3>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    width: "100%",
                    backgroundColor: COLORS.PINK,
                    borderBottom: "1px solid black",
                }}
            ></div>
        </div>
    );
};
const NFTSelect = ({
    onNFTDragStart,
    onNFTDragEnd,
}: {
    onNFTDragStart: (i: ZoraNFT) => void;
    onNFTDragEnd: (i: ZoraNFT) => void;
}) => {
    const [loaderOpen, setLoaderOpen] = React.useState(false);
    const [activeAddress, setActiveAddress] = React.useState(
        "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
    const [loading, nfts] = useGetCollectionNFTs({
        address: activeAddress,
    });

    const onLoaderOpen = () => {
        setLoaderOpen(true);
    };
    const onLoaderClose = () => {
        setLoaderOpen(false);
    };

    const isActive = (addr: string) => {
        return addr === activeAddress
            ? { backgroundColor: COLORS.PINK, borderBottom: "none", zIndex: 8 }
            : { backgroundColor: COLORS.GREY };
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
                    borderBottom: "1px solid black",
                    backgroundColor: COLORS.PURPLE,
                }}
            >
                <h3
                    style={{
                        fontSize: 14,
                        flex: 1,
                        textAlign: "left",
                        color: "white",
                    }}
                >
                    NFT Select
                </h3>
                <button
                    onClick={onLoaderOpen}
                    style={{
                        backgroundColor: COLORS.PINK,
                        color: COLORS.PURPLE,
                        boxShadow: "0 0 4px 1px " + COLORS.PINK,
                        textShadow: "1px 0 1px #222",
                        borderColor: COLORS.PURPLE,
                    }}
                >
                    ADD
                </button>
            </div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    backgroundColor: COLORS.PINK,
                    borderBottom: "1px solid black",
                }}
            >
                <TabItem
                    address="0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                    style={{
                        ...isActive(
                            "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                        ),
                    }}
                />
                <TabItem
                    address="0x5F4849089942618b6c64A0459a1D764Dc43BfcD7"
                    style={{
                        marginLeft: -12,
                        ...isActive(
                            "0x5F4849089942618b6c64A0459a1D764Dc43BfcD7"
                        ),
                    }}
                />
            </div>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    overflow: "auto",
                    flex: 1,
                    width: "100%",
                    backgroundColor: COLORS.PINK,
                }}
            >
                {nfts.map((n, i) => (
                    <NFT
                        key={"nft" + i}
                        data={n}
                        onNFTDragStart={() => onNFTDragStart(n)}
                        onNFTDragEnd={() => onNFTDragEnd(n)}
                    />
                ))}
            </div>

            <NFTLoader open={loaderOpen} onClose={onLoaderClose} />
        </div>
    );
};
const NFT = ({
    data,
    onNFTDragStart,
    onNFTDragEnd,
}: {
    data: ZoraNFT;
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
                margin: "0.25vw",
                width: "6rem",
                minWidth: "6rem",
                height: "6rem",
                border: " 1px solid white",
                backgroundColor: "grey",
                cursor: "pointer",
                position: "relative",
                boxShadow: "1px 1px 4px 2px " + COLORS.PURPLE,
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            draggable
        >
            <img
                src={getIPFS(data.image)}
                style={{ width: "100%", objectFit: "contain" }}
            />
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: "0.1rem",
                    paddingRight: "0.375rem",
                    boxShadow: "1px 1px 2px 0 black",
                    backgroundColor: "crimson",
                    color: "white",
                    border: " 1px solid white",
                    fontSize: "0.5rem",
                    borderBottomRightRadius: "1rem",
                    textAlign: "left",
                }}
            >
                {data?.tokenId || ""}
            </span>
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
