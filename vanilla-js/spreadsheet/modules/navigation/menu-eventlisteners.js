import {tableCommands} from "../commands/table-commands/table-commands.js";
import {updateSheet} from "../setup/setup.js";
import {loadInspector} from "./menu-setup.js";
import {config} from "../data/config.js";
import {formatCommands} from "../commands/format-commands/format-commands.js";
import {chartCommands} from "../commands/chart-commands/chart-commands.js";

export const loadMenuEventListeners = () => {
    document.getElementById("inspector-main").addEventListener("click", (e) => {
        if(e.target.id === config.tabChoice) return;
        switch (config.tabChoice) {
            case "table-menu":
                tableCommands[e.target.id]();
                break;
            case "format-menu":
                formatCommands[e.target.id]();
                break;
            case "chart-menu":
                chartCommands[e.target.id]();
                break;
            default:
        }
        // let canRemove = doesRowContain();
        // console.log(messages[canRemove.message]);
        updateSheet();
    });
    document.getElementById("inspector").addEventListener("click", (e) => {
        switch (e.target.id) {
            case "menu-tab-table":
                config.tabChoice = "table-menu"
                break;
            case "menu-tab-format":
                config.tabChoice = "format-menu"
                break;
            case "menu-tab-chart":
                config.tabChoice = "chart-menu"
                break;
            default:
        }
        loadInspector();
    })
};