export const tableMenu = () => {
    let newElement = document.createElement("div");
    newElement.setAttribute("id", "table-menu");
    tableButtons.forEach((button) => {
        newElement.appendChild(getButton(button));
    })
    return newElement;
}

const tableButtons = [
    [ "addRow", "Add row" ],
    [ "addColumn", "Add column" ],
    [ "addRowAbove", "Add row above" ],
    [ "addRowBelow", "Add row below" ],
    [ "addColumnLeft", "Add column left", "column-insert-left.svg" ],
    [ "addColumnRight", "Add column right", "column-insert-right.svg" ],
    [ "removeRowAbove", "Remove row above" ],
    [ "removeRowBelow", "Remove row below" ],
    [ "removeColumnLeft", "Remove column left" ],
    [ "removeColumnRight", "Remove column right" ],
    [ "mergeCells", "Merge cells" ],
    [ "unmergeCells", "Unmerge cells" ],
]

const getButton = (button) => {
    let newButton = document.createElement("button");
    newButton.setAttribute("id", button[0]);
    if(button.length > 2) {
        let image = document.createElement("img");
        image.setAttribute("src", `/images/${button[2]}`);
        newButton.appendChild(image);
    } else {
        newButton.innerText = button[1];
    }
    return newButton;
}