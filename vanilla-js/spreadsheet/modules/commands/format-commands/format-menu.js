export const formatMenu = () => {
    let newElement = document.createElement("div");
    newElement.setAttribute("id", "format-menu");
    formatButtons.forEach((button) => {
        let newButton = document.createElement("button");
        newButton.setAttribute("id", button[0]);
        newButton.innerText = button[1];
        newElement.appendChild(newButton);
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
    ["changeFontSize", "Change font size" ],
    ["addBorderAbove", "Add border above" ],
    ["addBorderBelow", "Add border below" ],
    ["clearFormatting", "Clear formatting" ],
    ["justifyLeft", "Justify left" ],
    ["justifyCenter", "Justify center" ],
    ["justifyRight", "Justify right" ],
]