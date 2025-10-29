import {getSelectRectangle} from "./modules/graphics.js";
import {parseExpression} from "./modules/expression-parsing.js";
import {setUpColumns, setUpFullArea, setUpRows} from "./modules/setUp.js";
import { messages } from "./modules/messages.js";

export let dimensions = {
  rows: 10,
  columns: 10,
}



export const selection = [];

export let content = {
  "5-6": 681
};

const updateSheet = () => {
  setUpFullArea(dimensions);
  setUpColumns(dimensions);
  setUpRows(dimensions);
  setUpWorkArea();
}



document.getElementById("menu").addEventListener("click", (e) => {
    let outcome = tableCommands[e.target.id]();
    let canRemove = doesRowContain();
    console.log(messages[canRemove.message]);
    updateSheet();
});



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
  for(let i = 0; i < dimensions.rows; i++) {
    let toAddRow = document.createElement("div");
    toAddRow.setAttribute("class", "sheet-row");
    toAddRow.style.width = `${100 * dimensions.columns}px`;
    for(let j = 0; j < dimensions.columns; j++) {
      let toAddColumn = document.createElement("div");
      toAddColumn.setAttribute("class", "sheet-column");
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
    newTarget.classList.add(newContent[1]);
  }

  document.getElementById("workArea").addEventListener("dblclick", (e) => {
      console.log(e);
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