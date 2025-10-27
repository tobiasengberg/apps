export const setUpFullArea = (dimensions) => {
    let toAdd = document.getElementById("setup");
    toAdd.replaceChildren();
    let workWidth = 100 * dimensions.columns;
    let workHeight = 30 * dimensions.rows;
    toAdd.style.width = workWidth + 30 + "px";
    toAdd.style.height = workHeight + 30 + "px";
    toAdd.style.backgroundColor = "lightyellow";
    toAdd.style.display = "grid";
    toAdd.style.gridTemplateColumns = `30px ${workWidth}px`;
    toAdd.style.gridTemplateRows = `30px ${workHeight}px`;
}

export const setUpColumns = (dimensions) => {
    let targetArea = document.getElementById("setup");
    let toAdd = document.createElement("div");
    toAdd.style.backgroundColor = "lightgreen";
    toAdd.style.gridColumn = "2";
    toAdd.style.gridRow = "1";
    toAdd.style.gridRowEnd = "2";
    toAdd.style.display = "grid";
    toAdd.style.gridTemplateColumns = `repeat(${dimensions.columns}, 100px)`;
    for(let i = 0; i < dimensions.columns; i++) {
        let toAddColumn = document.createElement("div");
        toAddColumn.innerText = String.fromCharCode(65 + i);
        toAdd.appendChild(toAddColumn);
    }
    targetArea.appendChild(toAdd);
}

export const setUpRows = (dimensions) => {
    let targetArea = document.getElementById("setup");
    let toAdd = document.createElement("div");
    toAdd.style.backgroundColor = "lightgreen";
    toAdd.style.gridColumn = "1";
    toAdd.style.gridRow = "2";
    toAdd.style.gridColumnEnd = "2";
    toAdd.style.display = "grid";
    toAdd.style.gridTemplateRows = `repeat(${dimensions.rows}, 30px)`;
    for(let i = 0; i < dimensions.rows; i++) {
        let toAddRow = document.createElement("div");
        toAddRow.innerText = i + 1 + "";
        toAdd.appendChild(toAddRow);
    }
    targetArea.appendChild(toAdd);
}