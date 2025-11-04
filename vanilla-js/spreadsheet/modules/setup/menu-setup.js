import {tableMenu} from "../commands/table-commands/table-menu.js";
import {formatMenu} from "../commands/format-commands/format-menu.js";
import {config} from "../data/config.js";
import {chartMenu} from "../commands/chart-commands/chart-menu.js";

export const loadMenu = () => {
    let menu = document.getElementById("menu");
    menu.innerText = "";
    switch (config.tabChoice) {
        case "table-menu":
            menu.appendChild(tableMenu());
            break;
        case "format-menu":
            menu.appendChild(formatMenu());
            break;
        case "chart-menu":
            menu.appendChild(chartMenu());
            break;
        default:
    }
}