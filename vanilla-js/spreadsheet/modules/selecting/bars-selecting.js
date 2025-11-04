import {config} from "../data/config.js";

export const loadBarsListeners = () => {
    document.getElementById("columns-bar").addEventListener("click", (e) => {
        let column = e.target.id.split("column-")[1];
        config.selection.forEach((element) => {
            document.getElementById(element).classList.remove("selected");
        })
        config.selection.length = 0;
        for(let i = 0; i < config.dimensions.rows; i++) {
            let colId = `${i + 1}-${column}`;
            config.selection.push(colId);
            document.getElementById(colId).classList.add("selected");
        }
    });

    document.getElementById("rows-bar").addEventListener("click", (e) => {
        let row = e.target.id.split("row-")[1];
        config.selection.forEach((element) => {
            document.getElementById(element).classList.remove("selected");
        })
        config.selection.length = 0;
        for(let i = 0; i < config.dimensions.columns; i++) {
            let rowId = `${row}-${i + 1}`;
            config.selection.push(rowId);
            document.getElementById(rowId).classList.add("selected");
        }
    });
}