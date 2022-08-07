import { Box } from "@mui/system";
import React from "react";
import { Loading } from "../components/Loading";
import { NFT } from "../components/NFT";
import { NFTAdder } from "../components/NFTAdder";
import { NFTLoader } from "../components/NFTLoader";
import { GetCompile } from "../hooks/Compiler";
import { useGetCollectionNFTs } from "../hooks/Zora";
import { COLORS } from "../util/Colors";
import { CHANNEL } from "../util/com";
import { GetCompiledVid } from "../util/http";
import { getIPFS } from "../util/IPFS";
export const MixerScreen = () => {
    const [channels, setChannels] = React.useState<any[][]>([[], [], [], []]);
    const [channelNFTs, setChannelNFTs] = React.useState<ZoraNFT[]>([]);
    const [dNFT, setdNFT] = React.useState<ZoraNFT | null>(null);
    const [dsNFT, setdsNFT] = React.useState<ZoraNFT | null>(null);
    const [dsChannel, setdsChannel] = React.useState<number | null>(null);
    const [currentVId, setCurrentVid] = React.useState<string>("");
    const onNFTDrop = (i: number) => {
        setdsNFT(dNFT);
        setdsChannel(i);
    };
    const onNFTDragStart = (i: ZoraNFT) => {
        setdNFT(i);
        setdsChannel(null);
    };
    const onNFTDragEnd = () => {
        setdNFT(null);
    };
    const onUpdateChannel = (c: any[]) => {
        if (dsChannel != null && dsNFT != null) {
            const cc = JSON.parse(JSON.stringify(channels));
            cc[dsChannel] = c;
            setChannels([...cc]);
            const cn = JSON.parse(JSON.stringify(channelNFTs));
            cn[dsChannel] = dsNFT;
            setChannelNFTs([...cn]);
        }
    };
    const onCloseAdder = () => {
        setdsNFT(null);
        setdsChannel(null);
    };
    const onCompileGigaNFT = async () => {
        console.log("onCompileGigaNFT");
        try {
            const res = await GetCompile(channels);
            setCurrentVid(res.name || "");
            console.log("res", res);
        } catch (err) {
            console.log("onCompileGigaNFT error", err);
        }
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
                    <GigaNFT onCompile={onCompileGigaNFT} vid={currentVId} />
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
                        nft={channelNFTs[i]}
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
    nft,
    index,
    onNFTDrop,
}: {
    channel: number[];
    nft: ZoraNFT | null;
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
                border: "1px solid " + COLORS.PINK,
                borderTopWidth: 4,
                width: "100%",
                padding: 8,
                flex: 1,
                position: "relative",
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            {nft ? (
                <ChannelCard nft={nft} c={channel} />
            ) : (
                <div style={{ color: COLORS.PINK }}>EMPTY</div>
            )}
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: COLORS.PINK,
                    border: "1px solid white",
                    boxShadow: "2px 2px 4px 0px " + COLORS.PINK,
                    color: COLORS.PURPLE,
                    padding: 4,
                }}
            >
                {index + 1}
            </span>
        </div>
    );
};

const ChannelCard = ({ nft, c }: { nft: ZoraNFT; c: any[] }) => {
    const sStyle = {
        marginTop: 4,
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "80%",
    };
    const l = (c[CHANNEL.Start] / 3e4) * 100;
    const r = 100 - (c[CHANNEL.End] / 3e4) * 100;

    return (
        <div
            className="d-flex start"
            style={{
                border: "1px solid " + COLORS.GREY,
                minWidth: "auto",
                backgroundColor: COLORS.PINK,
                boxShadow: "2px 2px 4px 0px " + COLORS.GREY,
                position: "absolute",
                left: l + "%",
                right: r + "%",
                width: "auto",
            }}
        >
            <div
                style={{
                    minWidth: "5rem",
                    width: "5rem",
                    height: "100%",
                }}
            >
                <img
                    src={getIPFS(nft.image)}
                    style={{ width: "100%", objectFit: "contain" }}
                />
            </div>
            <div
                style={{
                    flex: 1,
                    maxWidth: "70%", //TODO FIX flex max width
                    height: "100%",
                    padding: "0 1rem",
                    fontSize: 10,
                }}
                className="d-flex start col"
            >
                <div style={sStyle}>ID: {c[CHANNEL.ID]}</div>
                <div style={{ whiteSpace: "nowrap", ...sStyle }}>
                    Token: {c[CHANNEL.Address]}
                </div>
                <div style={sStyle}>
                    Video: {c[CHANNEL.Video] ? "✔️" : "❌"}
                </div>
                <div style={sStyle}>
                    Audio: {c[CHANNEL.Audio] ? "✔️" : "❌"}
                </div>
            </div>
        </div>
    );
};

const GigaNFT = ({
    onCompile,
    vid,
}: {
    onCompile: () => void;
    vid: string;
}) => {
    const videoRef = React.useRef(null);
    React.useEffect(() => {
        //@ts-ignore
        videoRef.current?.load();
    }, [vid]);
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
                <button
                    onClick={onCompile}
                    style={{
                        backgroundColor: COLORS.PINK,
                        color: COLORS.PURPLE,
                        boxShadow: "0 0 4px 1px " + COLORS.PINK,
                        textShadow: "1px 0 1px #222",
                        borderColor: COLORS.PURPLE,
                    }}
                >
                    REPLAY
                </button>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    width: "100%",
                    backgroundColor: COLORS.PINK,
                    borderBottom: "1px solid black",
                }}
            >
                <video
                    ref={videoRef}
                    style={{
                        width: "100%",
                        height: "340px",
                        objectFit: "contain",
                    }}
                    controls
                >
                    <source src={GetCompiledVid(vid)} type="video/mp4" />
                </video>
            </div>
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
    const [nftList, setNFTList] = React.useState<string[]>([
        "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    ]);
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

    const onAddCollection = (a: string) => {
        setNFTList([...[...nftList, a]]);
        setActiveAddress(a);
        onLoaderClose();
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
                height: "400px",
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
                {loading ? (
                    <Loading />
                ) : (
                    nftList.map((a, i) => (
                        <TabItem
                            key={"lnftlist" + i}
                            address={a}
                            style={{
                                ...isActive(a),
                            }}
                            onClick={() => setActiveAddress(a)}
                        />
                    ))
                )}
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

            <NFTLoader
                open={loaderOpen}
                onClose={onLoaderClose}
                onAdd={onAddCollection}
            />
        </div>
    );
};
const TabItem = ({
    address,
    onClick,
    style,
}: {
    address: string;
    onClick?: () => void;
    style?: any;
}) => {
    return (
        <div
            onClick={onClick}
            style={{
                ...style,
            }}
            className="tab-item"
        >
            {address}
        </div>
    );
};
