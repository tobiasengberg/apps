import {config} from "../../data/config.js";

export const formatCommands = {
    changeTextColor: () => alterStyling("color", "purple"),
    changeFillColor: () => alterStyling("backgroundColor", document.getElementById("color-picker").value),
    toggleBoldText: () => alterStyling("font-weight", "700"),
    increaseFontSize: () => alterStyling("font-size", "20px"),
    decreaseFontSize: () => alterStyling("font-size", "10px"),
    addBorderAbove: () => alterStyling("border-top", "1px solid black"),
    addBorderBelow: () => alterStyling("border-bottom", "1px solid black"),
    justifyLeft: () => alterStyling("text-align", "left"),
    justifyCenter: () => alterStyling("text-align", "center"),
    justifyRight: () => alterStyling("text-align", "right"),
    clearFormatting: () => config.selection.forEach(sel => delete config.styling[sel]),
}

const alterStyling = (kind, value) => {
    config.selection.forEach(sel => {
        if(config.styling.hasOwnProperty(sel)) {
            config.styling[sel].push([kind, value]);
        } else {
            config.styling[sel] = [[kind, value]];
        }
    });
}
