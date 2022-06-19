import React from "react";
import Provider from "./Context"
import Component from "./Component";

export default function App () {
    return (
        <Provider>
            <Component />
        </Provider>
    );
};