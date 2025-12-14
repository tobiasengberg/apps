import {updateSheet} from "./modules/setup/setup.js";
import {loadMenuEventListeners} from "./modules/navigation/menu-eventlisteners.js";
import {loadMenu} from "./modules/navigation/menu-setup.js";
import {loadConfigData} from "./modules/data/configStorage.js";

window.addEventListener("load", () => {
    loadMenu();
    loadMenuEventListeners();
    loadConfigData();
    updateSheet();
});








