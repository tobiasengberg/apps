import {getSelectRectangle} from "./modules/graphics.js";
import {parseExpression} from "./modules/expression-parsing.js";
import {setUpColumns, setUpFullArea, setUpRows} from "./modules/setUp.js";
import { messages } from "./modules/messages.js";

let dimensions = {
  rows: 10,
  columns: 10,
}

export const selection = [];

let content = {
  "5-6": 681
};


const updateSheet = () => {
  setUpFullArea(dimensions);
  setUpColumns(dimensions);
  setUpRows(dimensions);
  setUpWorkArea();
}

const commands = {
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

document.getElementById("menu").addEventListener("click", (e) => {
    let outcome = commands[e.target.id]();
    let canRemove = doesRowContain();
    console.log(messages[canRemove.message]);
    updateSheet();
});

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

const doesRowContain = () => {
    return { message: 412 };
}

const doesColumnContain = () => {
    return { message: 411 };
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

      document.addEventListener("keydown", (e) => {
          console.log(e.key);
          if(e.key === "Escape" && selection.length > 0) {
              selection.forEach((element) => {
                  document.getElementById(element).style.backgroundColor = "lightblue";
              });
              selection.length = 0;
          }
      })
      if(selection.length == 0) document.removeEventListener("keydown", (e) => {});
  })
};

window.addEventListener("load", () => {
  let contentHistory = localStorage.getItem("content");
  if(contentHistory) {
    content = JSON.parse(contentHistory);
  }
  let dimensionsHistory = localStorage.getItem("dimensions");
  if(dimensionsHistory) {
    dimensions = JSON.parse(dimensionsHistory);
  }
  updateSheet();
});