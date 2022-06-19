import React from "react";
import Provider from "./Context"

export default function App () {


    return (
        <Provider>
            <div id="page">
                <p>Theme: {theme}</p> <button onClick={toggleTheme}>Toggle</button>
                <p>Fontsize: {fontsize}</p> <button onClick={toggleFontSize}>Toggle</button>
                <p>Color: {color}</p> <button onClick={toggleColor}>Toggle</button>
            </div>
        </Provider>
    );
};