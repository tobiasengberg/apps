import {config} from "../data/config.js";
import {tableCommands} from "./table-commands/table-commands.js";
import {formatCommands} from "./format-commands/format-commands.js";
import {chartCommands} from "./chart-commands/chart-commands.js";

export const runCommand = (id) => {
    switch (config.tabChoice) {
        case "table-menu":
            tableCommands[id]();
            break;
        case "format-menu":
            formatCommands[id]();
            break;
        case "chart-menu":
            chartCommands[id]();
            break;
        default:
    }
}