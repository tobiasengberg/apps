import {config} from "../data/config.js";


export const applyStyling = () => {
    config.styling.forEach((item) => {
        let target = document.getElementById("8-7");
        target.style[item["8-7"][0][0]] = item["8-7"][0][1];
    })
}