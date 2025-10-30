import {tableCommands} from "../commands/table-commands.js";
import {updateSheet} from "../setup/setup.js";

export const loadMenuEventListeners = () => {
    document.getElementById("menu").addEventListener("click", (e) => {
        let outcome = tableCommands[e.target.id]();
        // let canRemove = doesRowContain();
        // console.log(messages[canRemove.message]);
        updateSheet();
    });
};