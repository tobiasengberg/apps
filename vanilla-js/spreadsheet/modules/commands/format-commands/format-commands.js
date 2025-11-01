import {config} from "../../data/config.js";

export const formatCommands = {
    changeTextColor: () => {
        document.getElementById(config.selection[0]).style.color = "purple";
        config.styling[config.selection[0]] = [["color", "purple"]];
    },


    changeFillColor: () => document.getElementById(config.selection[0]).style.backgroundColor = "yellow",
    toggleBoldText: () => {},
}