import { fetch } from "fetch-h2";

async function isPositive(text: String): Promise<boolean> {
    const response = await fetch("http://text-processing.com/api/sentiment/", {
        method:"POST",
        body: `text=${text}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    const json = await response.json();
    return json.label === "pos";
}   // <TODO> see how the asynchronous computations are grouped here, in the async-await structure