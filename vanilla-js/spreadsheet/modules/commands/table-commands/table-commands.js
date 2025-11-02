import {config} from "../../data/config.js";

export const tableCommands = {
    addRow: () => config.dimensions.rows++,
    addColumn: () => config.dimensions.columns++,
    addRowAbove: () => alterTableSize(true, (a, b) => a >= b, 1 ),
    addRowBelow: () => alterTableSize(true, (a, b) => a > b, 1 ),
    addColumnLeft: () => alterTableSize(false, (a, b) => a >= b, 1 ),
    addColumnRight: () => alterTableSize(false, (a, b) => a > b, 1 ),
    removeRowAbove: () => alterTableSize(true, (a, b) => a >= b, -1),
    removeRowBelow: () => alterTableSize(true, (a, b) => a > b, -1),
    removeColumnLeft: () => alterTableSize(false, (a, b) => a >= b, -1),
    removeColumnRight: () => alterTableSize(false, (a, b) => a > b, -1),
    mergeCells: () => mergeCells(),
    unmergeCells: () => unmergeCells(),
}

// parameter "comparison" is a function with two parameters and an operator of either ">" or ">="
const alterTableSize = (isRow, comparison, change) => {
    console.log(change);
    if(config.selection.length === 1) {
        isRow ? config.dimensions.rows = config.dimensions.rows + change : config.dimensions.columns = config.dimensions.columns + change;
        let newContent = [];
        config.content.map((item) => {
            if(comparison(isRow ? item.row : item.column, parseInt(config.selection[0].split("-")[isRow ? 0 : 1]))) {
                newContent.push({
                    value: item.value,
                    id: `${isRow ? item.row + change : item.row}-${isRow ? item.column : item.column + change}`,
                    column: isRow ? item.column : item.column + change,
                    row: isRow ? item.row + change : item.row,
                    style: item.style,

                });
            } else {
                newContent.push(item);
            }
        })
        config.content = [...newContent];
    }
}

const mergeCells = () => {
    let selection = [...config.selection];
    let lowestColumn = Math.min(...selection.map((item) => parseInt(item.split("-")[1])));
    let highestColumn = Math.max(...selection.map((item) => parseInt(item.split("-")[1])));
    let lowestRow = Math.min(...selection.map((item) => parseInt(item.split("-")[0])));
    let highestRow = Math.max(...selection.map((item) => parseInt(item.split("-")[0])));
    let origin = `${lowestRow}-${lowestColumn}`;
    let suppress = [...selection.filter((item) => item !== origin)];

    // Delete styling and content from suppressed cells
    suppress.forEach((item) => {
        delete config.styling[item];
        let remove = config.content.filter((entry) => entry.id === item);
        let target = config.content.findIndex((entry) => entry.id === origin);
        if(remove) config.content[target].value += ", " + remove[0].value;
    });
    config.content = config.content.filter((entry) => suppress.indexOf(entry.id) < 0);
    selection.forEach((item) => {
        let target = document.getElementById(item);
        target.classList.remove("selected");
    })
    config.mergeData.push(
        {
            origin: origin,
            spans: [highestRow - lowestRow + 1, highestColumn - lowestColumn + 1],
            suppress: suppress,
        }
    )
    config.selection.length = 0;
}

const unmergeCells = () => {
    if(config.selection.length !== 1) return;
    config.mergeData = config.mergeData.filter((item) => item.origin !== config.selection[0]);
}
