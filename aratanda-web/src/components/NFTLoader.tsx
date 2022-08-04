import { Modal, Typography, Box, Input, InputAdornment } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
export const NFTLoader = ({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) => {
    const [keyword, setKeyword] = React.useState("");
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
                            backgroundColor: "#232323",
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
                        />{" "}
                    </div>
                    <div style={{ width: "100%", minHeight: "40vh" }}>
                        <Typography
                            variant="h6"
                            component="h2"
                            align="center"
                            color="secondary"
                        >
                            No Results <br /> <span>404</span>
                        </Typography>
                    </div>
                </Box>
            </div>
        </Modal>
    );
};
