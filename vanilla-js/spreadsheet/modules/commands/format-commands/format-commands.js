import {config} from "../../data/config.js";

export const formatCommands = {
    changeTextColor: () => alterStyling("color", "purple"),
    changeFillColor: () => alterStyling("backgroundColor", "yellow"),
    toggleBoldText: () => alterStyling("font-weight", "700"),
    changeFontSize: () => alterStyling("font-size", "20px"),
    addBorderAbove: () => alterStyling("border-top", "1px solid black"),
    addBorderBelow: () => alterStyling("border-bottom", "1px solid black"),
    justifyLeft: () => alterStyling("text-align", "left"),
    justifyCenter: () => alterStyling("text-align", "center"),
    justifyRight: () => alterStyling("text-align", "right"),
    clearFormatting: () => delete config.styling[config.selection[0]],
}

const alterStyling = (kind, value) => {
    if(config.styling.hasOwnProperty(config.selection[0])) {
        config.styling[config.selection[0]].push([kind, value]);
    } else {
        config.styling[config.selection[0]] = [[kind, value]];
    }
}