import React from "react";
import {
    Modal,
    Typography,
    Box,
    Input,
    InputAdornment,
    colors,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CHANNEL } from "../util/com";
import { getIPFS } from "../util/IPFS";
import { COLORS } from "../util/Colors";

const defaultN = [0, 0, 1, 0, 0, 0, 3e4, 0, 0, 100, 100];
export const NFTAdder = ({
    nft,
    onClose,
    onUpdate,
}: {
    nft: ZoraNFT | null;
    onClose: () => void;
    onUpdate: (channel: any[]) => void;
}) => {
    const [ne, setNE] = React.useState<any[]>(defaultN);
    const style = {
        backgroundColor: COLORS.PINK,
        border: "5px solid " + COLORS.GREY,
        boxShadow: "0 0 1rem 0.25rem " + COLORS.PURPLE,
        width: "75vw",
        minWidth: "20rem",
        marginTop: "10vh",
    };

    const onAdd = () => {
        const n = ne;
        n[CHANNEL.Address] = nft?.collectionAddress;
        n[CHANNEL.ID] = nft?.tokenId || 0;
        onUpdate(n);
        onClose();
    };
    const updateNE = (i: number, v: number) => {
        ne[i] = v;
        setNE([...ne]);
    };

    React.useEffect(() => {
        setNE(defaultN);
    }, [nft]);
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
                            className="d-flex col start"
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
                                Options
                            </Typography>
                            <br />
                            <div className="d-flex around">
                                <TextField
                                    sx={{ flex: 1, margin: "0 1rem" }}
                                    type="number"
                                    value={ne[CHANNEL.CropStart]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.CropStart,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Crop from here if its a video till *End*"
                                    label="Crop From (ms)"
                                    defaultValue={0}
                                />
                            </div>
                            <br />
                            <div className="d-flex around">
                                <TextField
                                    type="number"
                                    value={ne[CHANNEL.Start]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.Start,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Start showing at this time"
                                    label="Start (ms)"
                                    defaultValue={0}
                                />
                                <TextField
                                    type="number"
                                    value={ne[CHANNEL.End]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.End,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="End showing at this time (max 30s)"
                                    label="End (ms)"
                                    defaultValue={3e4}
                                />
                            </div>
                            <br />
                            <div className="d-flex around">
                                <TextField
                                    type="number"
                                    value={ne[CHANNEL.Top]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.Top,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Distance from top"
                                    label="Top (%px)"
                                    defaultValue={0}
                                />
                                <TextField
                                    type="number"
                                    value={ne[CHANNEL.Left]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.Left,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Distance from top"
                                    label="Left (%px)"
                                    defaultValue={0}
                                />
                            </div>
                            <br />
                            <div className="d-flex around">
                                <TextField
                                    type="number"
                                    value={ne[CHANNEL.Right]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.Right,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Distance from right"
                                    label="Right (%px)"
                                    defaultValue={100}
                                />
                                <TextField
                                    type="number"
                                    value={ne[CHANNEL.Bottom]}
                                    onChange={(e) =>
                                        updateNE(
                                            CHANNEL.Bottom,
                                            Number(e.target.value)
                                        )
                                    }
                                    placeholder="Distance from bottom"
                                    label="Bottom (%px)"
                                    defaultValue={100}
                                />
                            </div>
                            <br />
                            <div className="d-flex around">
                                <FormControlLabel
                                    label="Include Video"
                                    control={
                                        <Checkbox
                                            inputProps={{
                                                "aria-label": "controlled",
                                            }}
                                            checked={ne[CHANNEL.Video] > 0}
                                            onChange={(e) =>
                                                updateNE(
                                                    CHANNEL.Video,
                                                    Number(e.target.checked)
                                                )
                                            }
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label="Include Audio"
                                    control={
                                        <Checkbox
                                            inputProps={{
                                                "aria-label": "controlled",
                                            }}
                                            checked={ne[CHANNEL.Audio] > 0}
                                            onChange={(e) =>
                                                updateNE(
                                                    CHANNEL.Audio,
                                                    Number(e.target.checked)
                                                )
                                            }
                                        />
                                    }
                                />
                            </div>
                            <br />
                            <div className="d-flex">
                                <button
                                    style={{
                                        backgroundColor: COLORS.PURPLE,
                                        color: COLORS.PINK,
                                        boxShadow:
                                            "0 0 4px 1px " + COLORS.PURPLE,
                                        textShadow: "1px 0 1px #222",
                                        borderColor: COLORS.PINK,
                                        padding: 16,
                                        fontSize: 16,
                                        flex: 1,
                                    }}
                                    onClick={onAdd}
                                >
                                    ADD
                                </button>
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </Modal>
    ) : null;
};
