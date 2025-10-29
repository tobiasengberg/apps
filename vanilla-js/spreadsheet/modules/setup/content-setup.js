import {parseExpression} from "../expression-parsing.js";
import {config} from "../data/config.js";

export const setupContent = () => {
    for(let key in config.content) {
        let newContent = parseExpression(config.content[key]);
        let newTarget = document.getElementById(`${key}`);
        newTarget.innerText = newContent[0];
        newTarget.classList.add(newContent[1]);
    }
};