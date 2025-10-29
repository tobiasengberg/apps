import {getSelectRectangle} from "./modules/graphics.js";
import {parseExpression} from "./modules/expression-parsing.js";
import {setupTable} from "./modules/setup/table-setup.js";
import { messages } from "./modules/messages.js";
import { tableCommands } from "./modules/commands/table-commands.js";
import {setupContent} from "./modules/setup/content-setup.js";
import {config} from "./modules/data/config.js";
import {loadEventListeners} from "./modules/eventlisteners/eventlisteners.js";

window.addEventListener("load", () => {
    let contentHistory = localStorage.getItem("content");
    if(contentHistory) {
        config.content = JSON.parse(contentHistory);
    }
    let dimensionsHistory = localStorage.getItem("dimensions");
    if(dimensionsHistory) {
        config.dimensions = JSON.parse(dimensionsHistory);
    }
    updateSheet();
    loadEventListeners();
});


const updateSheet = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    setupTable();
    setupContent();
}





