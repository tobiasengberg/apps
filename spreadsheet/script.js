

const dimensions = {
  rows: 10,
  columns: 10,
}

const selection = [];

const content = { };

const setUpFullArea = () => {
  let toAdd = document.getElementById("setup");
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
  console.log("start");
  if (document.getElementById("workArea")) {
    document.getElementById("workArea").remove();
  }
  let targetArea = document.getElementById("setup");
  let toAdd = document.createElement("div");
  toAdd.setAttribute("id", "workArea");
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
    document.getElementById(`${key}`).innerText = content[key];
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
  })

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
    } else {
      selection.forEach((element) => {
        document.getElementById(element).style.backgroundColor = "lightblue";
      });
      selection.length = 0;
      selection.push(e.target.id);
      selectedElement.style.backgroundColor = "lightpink";
    }
  })
};

window.addEventListener("load", () => {
  setUpFullArea();
  setUpColumns();
  setUpRows();
  setUpWorkArea();
});