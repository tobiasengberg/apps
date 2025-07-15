

const dimensions = {
  rows: 10,
  columns: 10,
}

const setUpFullArea = () => {
  let toAdd = document.getElementById("setup");
  let workWidth = 100 * dimensions.columns;
  let workHeight = 30 * dimensions.rows;
  toAdd.style.width = workWidth + 30 + "px";
  toAdd.style.height = workHeight + 30 + "px";
  toAdd.style.backgroundColor = "lightblue";
  toAdd.style.display = "grid";
  toAdd.style.gridTemplateColumns = `30px ${workWidth}px`;
  toAdd.style.gridTemplateRows = `30px ${workHeight}px`;
}

const setUpColumns = () => {
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

const setUpRows = () => {
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

const setUpWorkArea = () => {
  let targetArea = document.getElementById("setup");
  let toAdd = document.createElement("div");
  toAdd.style.backgroundColor = "lightyellow";
  toAdd.style.gridColumn = "2";
  toAdd.style.gridRow = "2";
  toAdd.style.gridColumnEnd = "3";
  toAdd.style.gridRowEnd = "3";
  for(let i = 0; i < dimensions.rows; i++) {
    let toAddRow = document.createElement("div");
    toAddRow.style.width = `${100 * dimensions.columns}px`;
    toAddRow.style.height = "30px";
    toAddRow.style.display = "flex";
    toAddRow.style.flexDirection = "row";
    for(let j = 0; j < dimensions.columns; j++) {
      let toAddColumn = document.createElement("div");
      toAddColumn.style.width = "100px";
      toAddColumn.style.height = "30px";
      toAddRow.appendChild(toAddColumn);
    }
    toAdd.appendChild(toAddRow);
  }
  targetArea.appendChild(toAdd);
}

const setUp = () => {
  setUpFullArea();
  setUpColumns();
  setUpRows();
  setUpWorkArea();


}

window.addEventListener("load", setUp);

// document.getElementsByTagName("table")[0].addEventListener("click", (e) => {
//   e.target.innerHTML = `<input type="text" value=${e.target.innerText}></input>`;
// });
