import {tableCommands} from "../commands/table-commands/table-commands.js";
import {config} from "../data/config.js";
import {updateContent, updateSheet} from "../setup/setup.js";
import {getSelectRectangle} from "../graphics.js";

export const loadEventListeners = () => {

    document.addEventListener("keydown", (e) => {
        console.log(e.key);
        if(e.key === "Escape" && config.selection.length > 0) {
            config.selection.forEach((element) => {
                document.getElementById(element).classList.remove("selected");
            });
            config.selection.length = 0;
        }
    });

    document.getElementById("workArea").addEventListener("dblclick", (e) => {
        let target = document.getElementById(e.target.id);
        if(!target) return;
        let newKey = e.target.id;
        target.innerHTML = `<input type="text" value=${target.innerText}>`;
        target.firstChild.focus();
        const getValue = (e) => {
            if(e.target.value === "") {
                config.content = [...config.content.filter((item) => item.id !== newKey)];
                target.removeChild(target.firstChild);
            } else {
                let item = config.content.filter((item) => item.id === newKey);
                if(item.length === 0) {
                    config.content.push({
                        value: e.target.value,
                        id: newKey,
                        column: parseInt(newKey.split("-")[1]),
                        row: parseInt(newKey.split("-")[0]),
                        style: []
                    });
                } else {
                    item[0].value = e.target.value;
                }
                updateContent();
            }
        }
        target.firstChild.addEventListener("blur", getValue);
    });

    document.getElementById("workArea").addEventListener("mousedown", (e) => {
        if (e.target.nodeName === "circle") {
            console.log("circle");
        }
    });

    document.getElementById("workArea").addEventListener("click", (e) => {
        let selectedElement = document.getElementById(e.target.id);


        let selectRectangle;
        if(!selectedElement) return;
        if(e.getModifierState("Meta")){
            if(config.selection.includes(e.target.id)) {
                config.selection.splice(config.selection.indexOf(e.target.id), 1);
                selectedElement.classList.remove("selected");
                return;
            }
            config.selection.push(e.target.id);
            selectedElement.classList.add("selected");
            if(document.getElementById("selectRectangle")) {
                document.getElementById("selectRectangle").remove();
            }
        } else {
            config.selection.forEach((element) => {
                document.getElementById(element).classList.remove("selected");
            });
            config.selection.length = 0;
            config.selection.push(e.target.id);
            selectedElement.classList.add("selected");

            if(!document.getElementById("selectRectangle")) {
                selectRectangle = getSelectRectangle();
                selectRectangle.setAttribute("id", "selectRectangle");
                document.getElementById("workArea").appendChild(selectRectangle);
            }
            selectRectangle = document.getElementById("selectRectangle");
            selectRectangle.setAttribute("width", e.target.offsetWidth + "px");
            selectRectangle.setAttribute("height", e.target.offsetHeight + "px");
            selectRectangle.style.top = e.target.offsetTop + "px";
            selectRectangle.style.left = e.target.offsetLeft + "px";
        }
    })
}