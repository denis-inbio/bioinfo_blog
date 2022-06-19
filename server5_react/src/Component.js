import React, { useContext } from "react";
import Provider, {context_theme, context_color, context_fontsize} from "./Context";
import Context from "./Context";

export default function Component () {
    const theme = useContext(context_theme);
    const color = useContext(context_color);
    const fontsize = useContext(context_fontsize);

    const style = {
        backgroundColor: "grey",
        color: theme === "dark" ? "#CCC" : "#333",
        padding: "2rem",
        margin: "2rem"
    };

    return (
        <Provider>
            <div style={style}>Function theme</div>
        </Provider>
    );
}