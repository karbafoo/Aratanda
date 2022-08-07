import { Modal, Typography, Box, Input, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { COLORS } from "../util/Colors";
import { Loading } from "./Loading";
import { useGetCollectionNFTs } from "../hooks/Zora";
import { NFT } from "./NFT";
export const NFTLoader = ({
    open,
    onClose,
    onAdd,
}: {
    open: boolean;
    onClose: () => void;
    onAdd: (a: string) => void;
}) => {
    const [keyword, setKeyword] = React.useState("");
    const [loading, nfts] = useGetCollectionNFTs({
        address: keyword,
    });
    const style = {
        border: "1px solid red",
        boxShadow: "0 0 1rem 0.25rem #333",
        width: "75vw",
        minWidth: "20rem",
        marginTop: "10vh",
        backgroundColor: COLORS.PINK,
    };
    const onAddCollection = () => {
        onAdd(keyword);
        setKeyword("");
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="nft-loader"
            aria-describedby="modal-nft-loader"
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box sx={style}>
                    <div
                        style={{
                            width: "100%",
                            padding: 16,
                            fontSize: "2rem",
                            backgroundColor: COLORS.PURPLE,
                        }}
                    >
                        <Typography
                            id="nft-loader"
                            variant="h6"
                            component="h2"
                            onClick={onClose}
                            sx={{ color: "white" }}
                        >
                            NFT Finder
                        </Typography>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            padding: 16,
                        }}
                    >
                        <Input
                            placeholder="Enter collection name or address"
                            sx={{
                                width: "100%",
                                padding: 1,
                                borderRadius: "0.5rem",
                                border: "1px solid #232323",
                                outline: "none",
                            }}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            startAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                            overflow: "auto",
                            maxHeight: "50vh",
                            flex: 1,
                            width: "100%",
                            padding: 16,
                        }}
                    >
                        {loading ? (
                            <Loading />
                        ) : nfts && nfts.length ? (
                            nfts.map((n, i) => (
                                <NFT
                                    key={"nftl" + i}
                                    data={n}
                                    onNFTDragStart={() => {}}
                                    onNFTDragEnd={() => {}}
                                />
                            ))
                        ) : (
                            <Typography
                                variant="h6"
                                component="h2"
                                align="center"
                                color="secondary"
                            >
                                No Results <br /> <span>404</span>
                            </Typography>
                        )}
                    </div>
                    <br />
                    <div className="d-flex">
                        <button
                            style={{
                                backgroundColor: COLORS.PURPLE,
                                color: COLORS.PINK,
                                boxShadow: "0 0 4px 1px " + COLORS.PURPLE,
                                textShadow: "1px 0 1px #222",
                                borderColor: COLORS.PINK,
                                padding: 16,
                                fontSize: 16,
                                flex: 1,
                            }}
                            onClick={onAddCollection}
                        >
                            ADD COLLECTION
                        </button>
                    </div>
                </Box>
            </div>
        </Modal>
    );
};
