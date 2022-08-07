import React from "react";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import "./App.scss";
import { MixerScreen } from "./screens/Mixer";
import { COLORS } from "./util/Colors";

const theme = createTheme({
    typography: {
        fontFamily: [
            "PressStart2P",
            "Roboto",
            "Helvetica Neue",
            "Arial",
            "sans-serif",
        ].join(","),
    },
});
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Container
                    maxWidth="lg"
                    sx={{
                        border: "3px solid " + COLORS.PURPLE,
                        p: 4,
                        height: "100%",
                        backgroundColor: COLORS.PURK,
                    }}
                >
                    <Box sx={{ height: "100%" }}>
                        <MixerScreen />
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default App;
