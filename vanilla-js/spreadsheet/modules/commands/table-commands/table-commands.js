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
    removeColumnRight: () => alterTableSize(false, (a, b) => a > b, -1)
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