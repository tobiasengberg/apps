import {tableCommands} from "../commands/table-commands/table-commands.js";
import {updateSheet} from "../setup/setup.js";
import {loadMenu} from "../setup/menu-setup.js";
import {config} from "../data/config.js";
import {formatCommands} from "../commands/format-commands/format-commands.js";

export const loadMenuEventListeners = () => {
    document.getElementById("menu").addEventListener("click", (e) => {
        console.log(e.target.id);
        if(e.target.id === config.tabChoice) return;
        let outcome = config.tabChoice === "table-menu" ? tableCommands[e.target.id]() : formatCommands[e.target.id]();
        // let canRemove = doesRowContain();
        // console.log(messages[canRemove.message]);
        updateSheet();
    });
    document.getElementById("menu-tabs").addEventListener("click", (e) => {
        e.target.id === "menu-tab-table" ? config.tabChoice = "table-menu" : config.tabChoice = "format-menu" ;
        loadMenu();
    })
};