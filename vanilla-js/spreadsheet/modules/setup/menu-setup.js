import {tableMenu} from "../commands/table-commands/table-menu.js";
import {formatMenu} from "../commands/format-commands/format-menu.js";
import {config} from "../data/config.js";

export const loadMenu = () => {
    let menu = document.getElementById("menu");
    menu.innerText = "";
    config.tabChoice === "table-menu" ? menu.appendChild(tableMenu()) : menu.appendChild(formatMenu());
}