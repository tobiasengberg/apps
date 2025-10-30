export const tableMenu = () => {
    let newElement = document.createElement("div");
    newElement.setAttribute("id", "table-menu");
    tableButtons.forEach((button) => {
        let newButton = document.createElement("button");
        newButton.setAttribute("id", button[0]);
        newButton.innerText = button[1];
        newElement.appendChild(newButton);
    })
    return newElement;
}

const tableButtons = [
    [ "addRow", "Add row" ],
    [ "addColumn", "Add column" ],
    [ "addRowAbove", "Add row above" ],
    [ "addRowBelow", "Add row below" ],
    [ "addColumnLeft", "Add column left" ],
    [ "addColumnRight", "Add column right" ],
    [ "removeRowAbove", "Remove row above" ],
    [ "removeRowBelow", "Remove row below" ],
    [ "removeColumnLeft", "Remove column left" ],
    [ "removeColumnRight", "Remove column right" ]
]