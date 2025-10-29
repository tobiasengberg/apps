import {config} from "../data/config.js";

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
    removeColumnRight: () => alterTableSize(false, (a, b) => a > b, -1)
}

// parameter "comparison" is a function with two parameters and an operator of either ">" or ">="
const alterTableSize = (isRow, comparison, change) => {
    if(config.selection.length === 1) {
        isRow ? config.dimensions.rows = config.dimensions.rows + change : config.dimensions.columns = config.dimensions.columns + change;
        let newContent = {};
        for(let key in config.content) {
            let [row, column] = key.split("-");
            if(comparison(parseInt(isRow ? row : column), config.selection[0].split("-")[isRow ? 0 : 1])) {
                newContent[`${isRow ? parseInt(row) + change : row}-${isRow ? column : parseInt(column) + change}`] = config.content[`${row}-${column}`];
            } else {
                newContent[key] = config.content[key];
            }
        }
        config.content = {...newContent};
    }
}