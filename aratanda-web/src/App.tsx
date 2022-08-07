import React from "react";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import "./App.scss";
import { MixerScreen } from "./screens/Mixer";
import { COLORS } from "./util/Colors";
import { MainScreen } from "./screens/Main";
import { TempalteSelect } from "./screens/TemplateSelect";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
                        <Routes>
                            <Route path="/" element={<MainScreen />} />
                            <Route
                                path="/create"
                                element={<TempalteSelect />}
                            />
                            <Route
                                path="/create/:template"
                                element={<MixerScreen />}
                            />
                        </Routes>
                        <TempalteSelect />
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default App;
