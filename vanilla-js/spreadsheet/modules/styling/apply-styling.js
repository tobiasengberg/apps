import {config} from "../data/config.js";


export const applyStyling = () => {
    let styledEntries = Object.keys(config.styling);
    styledEntries.forEach((item) => {
        let target = document.getElementById(item);
        let customStyles = config.styling[item];
        customStyles.forEach((style) => {
            target.style[style[0]] = style[1];
        })
    })
}