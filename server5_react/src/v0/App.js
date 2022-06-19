import React, { useState } from "react";
import Component_0 from "./Component_0";

export const context_theme = React.createContext();
export const context_fontsize = React.createContext();
export const context_color = React.createContext();

export default function App () {
    const [theme, liveset_theme] = useState("dark");
    const [fontsize, liveset_fontsize] = useState(12);
    const [color, liveset_color] = useState("blue");

    function toggleTheme () {
        if (theme === "dark") {
            liveset_theme("light");
        }
        else {
            liveset_theme("dark");
        }
    }

    function toggleFontSize () {
        if (fontsize === 12) {
            liveset_fontsize(16);
        }
        else {
            liveset_fontsize(12);
        }
    }

    function toggleColor () {
        if (color === "blue") {
            liveset_color("pink");
        }
        else {
            liveset_color("blue");
        }
    }

    return (
        <>
            <context_theme.Provider value={theme}>
                <context_fontsize.Provider value={fontsize}>
                    <context_color.Provider value={color}>
                        <div id="page">
                            <p>Theme: {theme}</p> <button onClick={toggleTheme}>Toggle</button>
                            <p>Fontsize: {fontsize}</p> <button onClick={toggleFontSize}>Toggle</button>
                            <p>Color: {color}</p> <button onClick={toggleColor}>Toggle</button>
                        </div>
                    </context_color.Provider>
                </context_fontsize.Provider>
            </context_theme.Provider>
        </>
    );
};