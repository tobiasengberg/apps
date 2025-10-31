import {config} from "../../data/config.js";

export const formatCommands = {
    changeTextColor: () => {
        console.log("text color");
        document.getElementById(config.selection[0]).style.color = "purple"},
    changeFillColor: () => document.getElementById(config.selection[0]).style.backgroundColor = "yellow",
    toggleBoldText: () => {},
}