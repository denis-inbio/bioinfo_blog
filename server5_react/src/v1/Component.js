import React, { useContext } from "react";
import { context_theme } from "./App";

export default function Component () {
    const theme = useContext(context_theme);

    const style = {
        backgroundColor: "grey",
        color: theme === "dark" ? "#CCC" : "#333",
        padding: "2rem",
        margin: "2rem"
    };

    return (
        <div style={style}>Function theme</div>
    );
}