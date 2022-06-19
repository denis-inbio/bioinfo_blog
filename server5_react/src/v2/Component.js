import React, { useContext } from "react";
import {context_theme} from "./App";

export default function Component () {
    const theme = useContext(context_theme);

    const style = {
        backgroundColor: "grey",
        color: theme === "dark" ? "#CCC" : "#333",
        padding: "2rem",
        margin: "2rem"
    };

    return (
        <>
            <div style={style}>Function theme</div>

            <div id="page">
                <p>Theme: {theme}</p> <button onClick={toggleTheme}>Toggle</button>
                <p>Fontsize: {fontsize}</p> <button onClick={toggleFontSize}>Toggle</button>
                <p>Color: {color}</p> <button onClick={toggleColor}>Toggle</button>
            </div>
        </>
    );
}