import {tableMenu} from "../commands/table-commands/table-menu.js";
import {formatMenu} from "../commands/format-commands/format-menu.js";

export const loadMenu = (tabChoice) => {
    let menu = document.getElementById("menu");
    menu.innerText = "";
    tabChoice === 1 ? menu.appendChild(tableMenu()) : menu.appendChild(formatMenu());
}