import {buildElement} from "../../build-utilities/elements-building.js";
import {getButton} from "../commands.js";

export const formatMenu = () => {
    let newElement = document.createElement("div");
    newElement.setAttribute("id", "format-menu");
    formatButtons.forEach((button) => {

        newElement.appendChild(getButton(button));
    });
    let inputElement = document.createElement("input");
    inputElement.setAttribute("type", "color");
    inputElement.setAttribute("id", "color-picker");
    newElement.appendChild(inputElement);
    return newElement;
}

const formatButtons = [
    [ "changeTextColor", "Change text color" ],
    [ "changeFillColor", "Change fill color" ],
    ["toggleBoldText", "Bold" ],
    ["increaseFontSize", "Increase font size" ],
    ["decreaseFontSize", "Decrease font size" ],
    ["addBorderAbove", "Add border above" ],
    ["addBorderBelow", "Add border below" ],
    ["clearFormatting", "Clear formatting" ],
    ["justifyLeft", "Justify left", "justify-left.svg" ],
    ["justifyCenter", "Justify center", "justify.svg" ],
    ["justifyRight", "Justify right", "justify-right.svg"],
]

