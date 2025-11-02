import {updateSheet} from "./modules/setup/setup.js";
import {loadMenuEventListeners} from "./modules/eventlisteners/menu-eventlisteners.js";
import {loadMenu} from "./modules/setup/menu-setup.js";
import {loadConfigData} from "./modules/data/configStorage.js";

window.addEventListener("load", () => {
    loadConfigData();
    updateSheet();
    loadMenu();
    loadMenuEventListeners();
});








