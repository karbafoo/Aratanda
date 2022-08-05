import React from "react";
import { Modal, Typography, Box, Input, InputAdornment } from "@mui/material";
export const NFTAdder = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const style = {
        backgroundColor: "white",
        border: "1px solid red",
        boxShadow: "0 0 1rem 0.25rem #333",
        width: "75vw",
        minWidth: "20rem",
        marginTop: "10vh",
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="nft-publisher"
            aria-describedby="modal-nft-publisher"
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
                            backgroundColor: "#232323",
                        }}
                    >
                        <Typography
                            id="nft-publisher"
                            variant="h6"
                            component="h2"
                            onClick={onClose}
                            sx={{ color: "white" }}
                        >
                            Publish Your Giga NFT
                        </Typography>
                    </div>
                    <div style={{ width: "100%", minHeight: "40vh" }}></div>
                </Box>
            </div>
        </Modal>
    );
};
