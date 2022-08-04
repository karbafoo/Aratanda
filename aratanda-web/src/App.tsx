import React from "react";
import { Box, Container } from "@mui/material";
import "./App.scss";
import { MixerScreen } from "./screens/Mixer";

const App = () => {
    return (
        <div className="App">
            <Container
                maxWidth="lg"
                sx={{ border: "3px solid red", p: 4, height: "100%" }}
            >
                <Box sx={{ height: "100%" }}>
                    <MixerScreen />
                </Box>
            </Container>
        </div>
    );
};

export default App;
