import {config} from "../data/config.js";

export const setupTable = () => {
    setupFullArea();
    setupColumnsBar();
    setupRowsBar();
    setupWorkArea();
}

export const setupFullArea = () => {
    let toAdd = document.getElementById("setup");
    toAdd.replaceChildren();
    let workWidth = 100 * config.dimensions.columns;
    let workHeight = 30 * config.dimensions.rows;
    toAdd.style.width = workWidth + 30 + "px";
    toAdd.style.height = workHeight + 30 + "px";
    toAdd.style.gridTemplateColumns = `30px ${workWidth}px`;
    toAdd.style.gridTemplateRows = `30px ${workHeight}px`;
}

export const setupColumnsBar = () => {
    let targetArea = document.getElementById("setup");
    let toAdd = document.createElement("div");
    toAdd.setAttribute("id", "columns-bar");
    toAdd.style.gridTemplateColumns = `repeat(${config.dimensions.columns}, 100px)`;
    for(let i = 0; i < config.dimensions.columns; i++) {
        let toAddColumn = document.createElement("div");
        toAddColumn.innerText = String.fromCharCode(65 + i);
        toAdd.appendChild(toAddColumn);
    }
    targetArea.appendChild(toAdd);
}

export const setupRowsBar = () => {
    let targetArea = document.getElementById("setup");
    let toAdd = document.createElement("div");
    toAdd.setAttribute("id", "rows-bar");
    toAdd.style.gridTemplateRows = `repeat(${config.dimensions.rows}, 30px)`;
    for(let i = 0; i < config.dimensions.rows; i++) {
        let toAddRow = document.createElement("div");
        toAddRow.innerText = i + 1 + "";
        toAdd.appendChild(toAddRow);
    }
    targetArea.appendChild(toAdd);
}

export const setupWorkArea = () => {
    if (document.getElementById("workArea")) {
        document.getElementById("workArea").remove();
    }
    let targetArea = document.getElementById("setup");
    let toAdd = document.createElement("div");
    toAdd.setAttribute("id", "workArea");
    toAdd.style.gridTemplateColumns = `repeat(${config.dimensions.columns}, 100px)`;
    toAdd.style.width = `${100 * config.dimensions.columns}px`;
    toAdd.style.height = `${30 * config.dimensions.rows}px`;
    for(let i = 0; i < config.dimensions.rows; i++) {

        for(let j = 0; j < config.dimensions.columns; j++) {
            let toAddColumn = document.createElement("div");
            toAddColumn.setAttribute("class", "sheet-column");
            toAddColumn.setAttribute("id", `${i + 1}-${j + 1}`);
            toAddColumn.style.width = "100px";
            toAdd.appendChild(toAddColumn);
        }
    }
    targetArea.appendChild(toAdd);
}

const doesRowContain = () => {
    return { message: 412 };
}

const doesColumnContain = () => {
    return { message: 411 };
}