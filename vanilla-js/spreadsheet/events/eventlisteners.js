import {config} from "../modules/data/config.js";
import {reRender} from "../script.js";
import {
    addOrRemoveSelected, addSingleSelected,
    handleKeyDown, handleRectangleChange,
    removePreviouslySelected, removeSelectRectangle,
    selectAllInColumn,
    selectAllInRow, setSelectRectangle
} from "../modules/selecting/cells-selecting.js";
import {getTabChoice} from "../modules/navigation/inspector.js";
import {runCommand} from "../modules/commands/commands.js";

export const eventListeners = {}

export const loadEventListeners = () => {

    document.querySelector("#columns-bar").addEventListener("click", (e) => {
        let column = e.target.id.split("column-")[1];
        removePreviouslySelected();
        removeSelectRectangle();
        selectAllInColumn(column);
        eventListeners.columnsBar = true;
    });

    document.querySelector("#rows-bar").addEventListener("click", (e) => {
        let row = e.target.id.split("row-")[1];
        removePreviouslySelected();
        removeSelectRectangle();
        selectAllInRow(row);
        eventListeners.rowsBar = true;
    });

    document.querySelector("#inspector-main").addEventListener("click", (e) => {
        eventListeners.inspectorMain = true;
        if(e.target.id === config.tabChoice) return;
        runCommand(e.target.id);
        reRender(1);
    });

    document.querySelector("#inspector-tabs").addEventListener("click", (e) => {
        eventListeners.inspectorTabs = true;
        if(e.target.id === "inspector-tabs") return;
        config.tabChoice = getTabChoice(e.target.id);
        reRender();
    })

    document.getElementById("workArea").addEventListener("click", (e) => {
        eventListeners.columnsBar = true;
        if(e.target.id === "workArea") return;
        if(!eventListeners.keyDownOnSelect) {
            eventListeners.keyDownOnSelect = true;
            document.addEventListener("keydown", handleKeyDown);
        }

        if(e.getModifierState("Meta")){
            let added = addOrRemoveSelected(e.target.id);
            added ? setSelectRectangle(e) : removeSelectRectangle();
            if(config.selection.length === 0) {
                document.removeEventListener("keydown", handleKeyDown);
                eventListeners.keyDownOnSelect = false;
            }
        } else if (config.selection.length === 1 && document.querySelector(".selected").id === e.target.id) {
            const updateCellValue = (e) => {
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
                    config.selection.length = 0;
                    eventListeners.blurEvent = false;
                    reRender(1);
                }
            }

            let target = document.getElementById(e.target.id);
            let newKey = e.target.id;
            let isContent = config.content.filter(item => item.id === e.target.id);
            target.innerHTML = `<input id="cell-input" type="text" value=${isContent.length > 0 ? isContent[0].value : target.innerText}>`;
            target.firstChild.focus();
            target.firstChild.setSelectionRange(isContent[0].value.length, isContent[0].value.length)
            if(!eventListeners.blurEvent) {
                eventListeners.blurEvent = true;
                target.firstChild.addEventListener("blur", updateCellValue);
            }
            target.firstChild.addEventListener("keydown", (e) => {
                console.log(e.key === "=" && e.target.value.length === 0);
                if(e.key === "Enter") {
                    target.firstChild.blur();
                }
            })
            target.firstChild.addEventListener("blur", updateCellValue);
        }
        else {
            removePreviouslySelected();
            addSingleSelected(e.target.id);
            setSelectRectangle(e);
        }
        if(!eventListeners.selectRectangle) {
            eventListeners.selectRectangle = true;
            document.getElementById("selectRectangle").addEventListener("mousedown", handleRectangleChange);
        }
    })
}
