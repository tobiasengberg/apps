import {getSelectRectangle} from "./modules/graphics.js";

let dimensions = {
  rows: 10,
  columns: 10,
}

export const selection = [];

let content = {
  "5-6": 681
};

const parseExpression = (expression) => {
  if(/^[0-9]*$/.test(expression)) return [expression, "number"];
  if(expression.substring(0,4) == "SUM(") {
    let values = expression.substring(4,expression.length -1).split(':');
    let col = /^[A-Z]+/.exec(values[0]);
    return [col, "sum"];
  }
  return [expression, "text"];
}

const updateSheet = () => {
  setUpFullArea();
  setUpColumns();
  setUpRows();
  setUpWorkArea();
}

document.getElementById("addRow").addEventListener("click", () => {
  dimensions.rows++;
  updateSheet();
});

document.getElementById("addColumn").addEventListener("click", () => {
  dimensions.columns++;
  updateSheet();
})

document.getElementById("addRowAbove").addEventListener("click", () => {
  if(selection.length === 1) {
    dimensions.rows++;
    console.log(selection);
    let newContent = {};
    for(let key in content) {
      let [row, column] = key.split("-");
      if(parseInt(row) >= selection[0].split("-")[0]) {
        newContent[`${parseInt(row) + 1}-${column}`] = content[`${parseInt(row)}-${column}`];
      } else {
        newContent[key] = content[key];
      }
    }
    content = {...newContent};
    updateSheet();
  }
});

document.getElementById("addRowBelow").addEventListener("click", () => {
  if(selection.length === 1) {
    dimensions.rows++;
    console.log(selection);
    let newContent = {};
    for(let key in content) {
      let [row, column] = key.split("-");
      if(parseInt(row) > selection[0].split("-")[0]) {
        newContent[`${parseInt(row) + 1}-${column}`] = content[`${parseInt(row)}-${column}`];
      } else {
        newContent[key] = content[key];
      }
    }
    content = {...newContent};
    updateSheet();
  }
})

document.getElementById("addColumnLeft").addEventListener("click", () => {
  if(selection.length === 1) {
    dimensions.columns++;
    let newContent = {};
    for(let key in content) {
      let [row, column] = key.split("-");
      if(parseInt(column) >= selection[0].split("-")[1]) {
        newContent[`${row}-${parseInt(column) + 1}`] = content[`${row}-${parseInt(column)}`];
      } else {
        newContent[key] = content[key];
      }
    }
    content = {...newContent};
    updateSheet();
  }
});

document.getElementById("addColumnRight").addEventListener("click", () => {
  if(selection.length === 1) {
    dimensions.columns++;
    let newContent = {};
    for(let key in content) {
      let [row, column] = key.split("-");
      if(parseInt(column) > selection[0].split("-")[1]) {
        newContent[`${row}-${parseInt(column) + 1}`] = content[`${row}-${parseInt(column)}`];
      } else {
        newContent[key] = content[key];
      }
    }
    content = {...newContent};
    updateSheet();
  }
})

const setUpFullArea = () => {
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
  localStorage.setItem("content", JSON.stringify(content));
  localStorage.setItem("dimensions", JSON.stringify(dimensions));
  if (document.getElementById("workArea")) {
    document.getElementById("workArea").remove();
  }
  let targetArea = document.getElementById("setup");
  let toAdd = document.createElement("div");
  toAdd.setAttribute("id", "workArea");
  toAdd.style.width = `${100 * dimensions.columns}px`;
  toAdd.style.height = `${30 * dimensions.rows}px`;
  toAdd.style.backgroundColor = "lightblue";
  toAdd.style.gridColumn = "2";
  toAdd.style.gridRow = "2";
  toAdd.style.gridColumnEnd = "3";
  toAdd.style.gridRowEnd = "3";
  for(let i = 0; i < dimensions.rows; i++) {
    let toAddRow = document.createElement("div");
    toAddRow.style.width = `${100 * dimensions.columns}px`;
    toAddRow.style.height = "30px";
    toAddRow.style.display = "flex";
    toAddRow.style.border = "none";
    toAddRow.style.flexDirection = "row";
    for(let j = 0; j < dimensions.columns; j++) {
      let toAddColumn = document.createElement("div");
      toAddColumn.style.width = "100px";
      toAddColumn.style.height = "30px";
      toAddColumn.setAttribute("id", `${i + 1}-${j + 1}`);
      toAddRow.appendChild(toAddColumn);
    }
    toAdd.appendChild(toAddRow);
  }
  targetArea.appendChild(toAdd);
  for(let key in content) {
    let newContent = parseExpression(content[key]);
    let newTarget = document.getElementById(`${key}`);
    newTarget.innerText = newContent[0];
    newTarget.setAttribute("class", newContent[1]);
  }
  document.getElementById("workArea").addEventListener("dblclick", (e) => {
    let target = document.getElementById(e.target.id);
    if(!target) return;
    let newKey = e.target.id;
    target.innerHTML = `<input type="text" value=${target.innerText}>`;
    target.firstChild.focus();
    target.firstChild.addEventListener("blur", (e) => {
      if(e.target.value === "") {
        if (newKey in content) {
          delete content[newKey];
        }
        target.removeChild(target.firstChild);
      } else {
        content[newKey] = e.target.value;
        setUpWorkArea();
      }
    })
  });

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && selection.length > 0) {
      selection.forEach((element) => {
        document.getElementById(element).style.backgroundColor = "lightblue";
      });
      selection.length = 0;
    }
  })

  document.getElementById("workArea").addEventListener("mousedown", (e) => {
    console.log(e);
    if (e.target.nodeName === "circle") {
      console.log("circle");
    }
  });

  //Select one or more boxes
  document.getElementById("workArea").addEventListener("click", (e) => {
    let selectedElement = document.getElementById(e.target.id);
    if(!selectedElement) return;
    if(e.getModifierState("Meta")){
      if(selection.includes(e.target.id)) {
        selection.splice(selection.indexOf(e.target.id), 1);
        selectedElement.style.backgroundColor = "lightblue";
        return;
      }
      selection.push(e.target.id);
      selectedElement.style.backgroundColor = "lightpink";
      if(document.getElementById("selectRectangle")) {
        document.getElementById("selectRectangle").remove();
      }
    } else {
      selection.forEach((element) => {
        document.getElementById(element).style.backgroundColor = "lightblue";
      });
      selection.length = 0;
      selection.push(e.target.id);
      selectedElement.style.backgroundColor = "lightpink";

      if(!document.getElementById("selectRectangle")) {
        let selectRectangle = getSelectRectangle();
        selectRectangle.setAttribute("id", "selectRectangle");
        document.getElementById("workArea").appendChild(selectRectangle);
      }
      let selectRectangle = document.getElementById("selectRectangle");
      selectRectangle.setAttribute("width", e.target.offsetWidth + "px");
      selectRectangle.setAttribute("height", e.target.offsetHeight + "px");
      selectRectangle.style.top = e.target.offsetTop + "px";
      selectRectangle.style.left = e.target.offsetLeft + "px";
    }
  })
};

window.addEventListener("load", () => {
  const trial = {
    "foo": [23, () => 34 + 67]
  }
  trial.foo[0] = trial.foo[1]();
  console.log(trial.foo[0]);
  let contentHistory = localStorage.getItem("content");
  if(contentHistory) {
    content = JSON.parse(contentHistory);
  }
  let dimensionsHistory = localStorage.getItem("dimensions");
  if(dimensionsHistory) {
    dimensions = JSON.parse(dimensionsHistory);
  }
  console.log(content);
  updateSheet();
});