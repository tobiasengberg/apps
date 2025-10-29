import {config} from "./modules/data/config.js";
import {loadEventListeners} from "./modules/eventlisteners/eventlisteners.js";
import {updateSheet} from "./modules/setup/setup.js";

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
});








