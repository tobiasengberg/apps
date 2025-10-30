import {tableMenu} from "../commands/table-commands/table-menu.js";

export const loadMenu = () => {
    let menu = document.getElementById("menu");
    menu.appendChild(tableMenu());
}