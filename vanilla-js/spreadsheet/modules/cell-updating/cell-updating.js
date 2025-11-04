import {config} from "../data/config.js";
import {updateContent} from "../setup/setup.js";

export const loadCellListeners = () => {

    let target, newKey;
    document.getElementById("workArea").addEventListener("dblclick", (e) => {
        target = document.getElementById(e.target.id);
        if(!target) return;
        newKey = e.target.id;
        let isContent = config.content.filter(item => item.id === e.target.id);
        target.innerHTML = `<input id="cell-input" type="text" value=${isContent.length > 0 ? isContent[0].value : target.innerText}>`;
        target.firstChild.focus();
        target.firstChild.addEventListener("keydown", (e) => {
            console.log(e.key === "=" && e.target.value.length === 0);
        })
        target.firstChild.addEventListener("blur", updateCellValue);
    });

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
            updateContent();
        }
    }
}
