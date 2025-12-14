import {updateSheet} from "./modules/setup/setup.js";
import {loadMenuEventListeners} from "./modules/navigation/menu-eventlisteners.js";
import {loadInspector, loadMenu} from "./modules/navigation/menu-setup.js";
import {loadConfigData} from "./modules/data/configStorage.js";

window.addEventListener("load", () => {
    loadMenu();
    loadInspector();
    loadMenuEventListeners();
    loadConfigData();
    updateSheet();
});








