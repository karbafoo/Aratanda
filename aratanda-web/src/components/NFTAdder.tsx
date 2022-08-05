import React from "react";
import {
    Modal,
    Typography,
    Box,
    Input,
    InputAdornment,
    colors,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CHANNEL } from "../util/com";
import { getIPFS } from "../util/IPFS";
import { COLORS } from "../util/Colors";
export const NFTAdder = ({
    nft,
    onClose,
}: {
    nft: ZoraNFT | null;
    onClose: () => void;
}) => {
    const style = {
        backgroundColor: COLORS.PINK,
        border: "5px solid " + COLORS.GREY,
        boxShadow: "0 0 1rem 0.25rem " + COLORS.PURPLE,
        width: "75vw",
        minWidth: "20rem",
        marginTop: "10vh",
    };

    const onAdd = () => {
        const n = [];
        n[CHANNEL.Address] = "";
        n[CHANNEL.ID] = "";
        n[CHANNEL.CropStart] = "";
        n[CHANNEL.Start] = "";
        n[CHANNEL.End] = "";
        n[CHANNEL.Top] = "";
        n[CHANNEL.Left] = "";
        n[CHANNEL.Right] = "";
        n[CHANNEL.Bottom] = "";
    };
    return nft != null ? (
        <Modal
            open={nft != null}
            onClose={onClose}
            aria-labelledby="nft-adder"
            aria-describedby="modal-nft-adder"
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
                            id="nft-adder"
                            variant="h6"
                            component="h2"
                            onClick={onClose}
                            sx={{ color: "white" }}
                        >
                            Update Channel
                        </Typography>
                    </div>
                    <div style={{ width: "100%", minHeight: "40vh" }}>
                        <div
                            className="d-flex"
                            style={{
                                backgroundColor: COLORS.GREY,
                                padding: "2vh",
                            }}
                        >
                            <img
                                src={getIPFS(nft.image)}
                                style={{
                                    maxHeight: "20vh",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                        <div
                            className="d-flex start"
                            style={{
                                padding: 4,
                                borderTop: "3px solid " + COLORS.PURPLE,
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h2"
                                align="center"
                            >
                                Add
                            </Typography>
                        </div>
                    </div>
                </Box>
            </div>
        </Modal>
    ) : null;
};
