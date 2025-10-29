import { dimensions, content, selection } from "../../script.js";

export const tableCommands = {
    addRow: () => dimensions.rows++,
    addColumn: () => dimensions.columns++,
    addRowAbove: () => alterTableSize(true, (a, b) => a >= b, 1 ),
    addRowBelow: () => alterTableSize(true, (a, b) => a > b, 1 ),
    addColumnLeft: () => alterTableSize(false, (a, b) => a >= b, 1 ),
    addColumnRight: () => alterTableSize(false, (a, b) => a > b, 1 ),
    removeRowAbove: () => alterTableSize(true, (a, b) => a >= b, -1),
    removeRowBelow: () => alterTableSize(true, (a, b) => a > b, -1),
    removeColumnLeft: () => alterTableSize(false, (a, b) => a >= b, -1),
    removeColumnRight: () => alterTableSize(false, (a, b) => a > b, -1)
}

// parameter "comparison" is a function with two parameters and an operator of either ">" or ">="
const alterTableSize = (isRow, comparison, change) => {
    if(selection.length === 1) {
        isRow ? dimensions.rows = dimensions.rows + change : dimensions.columns = dimensions.columns + change;
        let newContent = {};
        for(let key in content) {
            let [row, column] = key.split("-");
            if(comparison(parseInt(isRow ? row : column), selection[0].split("-")[isRow ? 0 : 1])) {
                newContent[`${isRow ? parseInt(row) + change : row}-${isRow ? column : parseInt(column) + change}`] = content[`${row}-${column}`];
            } else {
                newContent[key] = content[key];
            }
        }
        content = {...newContent};
    }
}