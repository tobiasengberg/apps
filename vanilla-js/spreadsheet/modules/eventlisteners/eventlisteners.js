import {tableCommands} from "../commands/table-commands.js";
import {config} from "../data/config.js";
import {updateContent, updateSheet} from "../setup/setup.js";
import {getSelectRectangle} from "../graphics.js";

export const loadEventListeners = () => {
    document.getElementById("menu").addEventListener("click", (e) => {
        let outcome = tableCommands[e.target.id]();
        // let canRemove = doesRowContain();
        // console.log(messages[canRemove.message]);
        updateSheet();
    });

    document.getElementById("workArea").addEventListener("dblclick", (e) => {
        console.log(e);
        let target = document.getElementById(e.target.id);
        if(!target) return;
        let newKey = e.target.id;
        target.innerHTML = `<input type="text" value=${target.innerText}>`;
        target.firstChild.focus();
        const getValue = (e) => {
            if(e.target.value === "") {
                if (newKey in config.content) {
                    delete config.content[newKey];
                }
                target.removeChild(target.firstChild);
            } else {
                config.content[newKey] = e.target.value;
                updateContent();
            }
        }
        target.firstChild.addEventListener("blur", getValue);
    });

    /*document.getElementById("workArea").addEventListener("mousedown", (e) => {
        console.log(e);
        if (e.target.nodeName === "circle") {
            console.log("circle");
        }
    });
*/
    document.getElementById("workArea").addEventListener("click", (e) => {
        console.log(e.target.id);
        let selectedElement = document.getElementById(e.target.id);
        if(!selectedElement) return;
        if(e.getModifierState("Meta")){
            if(config.selection.includes(e.target.id)) {
                config.selection.splice(config.selection.indexOf(e.target.id), 1);
                selectedElement.style.backgroundColor = "lightblue";
                return;
            }
            config.selection.push(e.target.id);
            selectedElement.style.backgroundColor = "lightpink";
            if(document.getElementById("selectRectangle")) {
                document.getElementById("selectRectangle").remove();
            }
        } else {
            config.selection.forEach((element) => {
                document.getElementById(element).style.backgroundColor = "lightblue";
            });
            config.selection.length = 0;
            config.selection.push(e.target.id);
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
            if(e.key === "Escape" && config.selection.length > 0) {
                config.selection.forEach((element) => {
                    document.getElementById(element).style.backgroundColor = "lightblue";
                });
                config.selection.length = 0;
            }
        })
        if(config.selection.length == 0) document.removeEventListener("keydown", (e) => {});
    })
}