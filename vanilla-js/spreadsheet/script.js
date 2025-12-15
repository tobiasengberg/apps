import {loadMenuEventListeners} from "./events/eventlisteners.js";
import {loadInspector, loadMenu} from "./modules/navigation/menu-setup.js";
import {loadConfigData} from "./modules/data/configStorage.js";
import {config} from "./modules/data/config.js";
import {mergeCells, setupTable} from "./modules/setup/table-setup.js";
import {applyStyling} from "./modules/styling/apply-styling.js";
import {setupContent} from "./modules/setup/content-setup.js";
import {loadBarsListeners} from "./events/eventlisteners.js";
import {loadCellListeners} from "./events/eventlisteners.js";
import {loadSelectingListeners} from "./events/eventlisteners.js";

window.addEventListener("load", () => {
    program();
});

export const program = () => {
    loadMenu();
    loadInspector();
    loadConfigData();
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    localStorage.setItem("mergeData", JSON.stringify(config.mergeData));
    localStorage.setItem("styling", JSON.stringify(config.styling));
    setupTable();
    mergeCells();
    applyStyling();
    setupContent();
    loadMenuEventListeners();  // "inspector", "inspector-main"
    loadBarsListeners();       // "columns-bar". "rows-bar"
    loadCellListeners();       // "workArea"
    loadSelectingListeners();  // "workArea"
}






