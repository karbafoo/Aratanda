import { COLORS } from "../util/Colors";
import { getIPFS } from "../util/IPFS";

export const NFT = ({
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
