import {tableCommands} from "../commands/table-commands/table-commands.js";
import {updateSheet} from "../setup/setup.js";
import {loadMenu} from "../setup/menu-setup.js";
import {config} from "../data/config.js";
import {formatCommands} from "../commands/format-commands/format-commands.js";

export const loadMenuEventListeners = () => {
    document.getElementById("menu").addEventListener("click", (e) => {
        let outcome = config.tabChoice === 1 ? tableCommands[e.target.id]() : formatCommands[e.target.id]();
        // let canRemove = doesRowContain();
        // console.log(messages[canRemove.message]);
        updateSheet();
    });
    document.getElementById("menu-tabs").addEventListener("click", (e) => {
        e.target.id === "menu-tab-table" ? config.tabChoice = 1 : config.tabChoice = 2 ;
        loadMenu();
    })
};