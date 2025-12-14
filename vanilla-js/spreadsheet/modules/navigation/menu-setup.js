import {tableMenu} from "../commands/table-commands/table-menu.js";
import {formatMenu} from "../commands/format-commands/format-menu.js";
import {config} from "../data/config.js";
import {chartMenu} from "../commands/chart-commands/chart-menu.js";

export const loadMenu = () => {
    let menu = document.getElementById("inspector");
    menu.replaceChildren(getMenuChoice(config.tabChoice));
}

const getMenuChoice = (choice) => {
    switch (config.tabChoice) {
        case "table-menu": return tableMenu();
        case "format-menu": return formatMenu();
        case "chart-menu": return chartMenu();
        default:
    }
}