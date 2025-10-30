import {tableCommands} from "../commands/table-commands/table-commands.js";
import {updateSheet} from "../setup/setup.js";
import {loadMenu} from "../setup/menu-setup.js";

export const loadMenuEventListeners = () => {
    document.getElementById("menu").addEventListener("click", (e) => {
        let outcome = tableCommands[e.target.id]();
        // let canRemove = doesRowContain();
        // console.log(messages[canRemove.message]);
        updateSheet();
    });
    document.getElementById("menu-tabs").addEventListener("click", (e) => {
        e.target.id === "menu-tab-table" ? loadMenu(1) : loadMenu(2);
    })
};