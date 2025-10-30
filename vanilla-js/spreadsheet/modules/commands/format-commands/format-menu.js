export const formatMenu = () => {
    let newElement = document.createElement("div");
    newElement.setAttribute("id", "format-menu");
    formatButtons.forEach((button) => {
        let newButton = document.createElement("button");
        newButton.setAttribute("id", button[0]);
        newButton.innerText = button[1];
        newElement.appendChild(newButton);
    })
    return newElement;
}

const formatButtons = [
    [ "changeTextColor", "Change text color" ],
    [ "changeFillColor", "Change fill color" ],
    ["toggleBoldText", "Bold" ],
]