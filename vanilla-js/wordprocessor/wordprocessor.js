

window.addEventListener('load', () => {
    document.querySelector("#menu-tab-document").addEventListener("click", pageSetup);
    document.querySelector("#menu-tab-margin").addEventListener("click", () => {
        const stylesheets = document.styleSheets[1].cssRules[0].style.getPropertyValue("--left-margin");
        console.log(stylesheets);
        document.styleSheets[1].cssRules[0].style.setProperty("--left-margin", parseInt(stylesheets.split('p')[0]) + 20 + "px");
    });
    document.querySelector("#menu-tab-indent").addEventListener("click", () => {
        state.currentStyle = "normal-indent";
        let current = document.querySelector(".workAreaCurrent");
        if (current) {
            current.classList.remove("normal");
            current.classList.add("normal-indent");
        }
    });
    document.querySelector("#menu-tab-bold").addEventListener("click", () => {
        let selected = document.getSelection();
        let range = selected.getRangeAt(0);
        let words = range.toString();
        console.log(range);
        let enclosing = document.createElement("span");
        enclosing.classList.add("bold");
        enclosing.innerHTML = words;
        let target = document.querySelector(".workAreaCurrent");
        target.appendChild(enclosing);
        //selected.insertAdjacentElement(range.collapse(), enclosing);
    })
    setUpWorkArea();
    typing();

});

const setUpWorkArea = () => {
    let target = document.querySelector("#setup");
    let workArea = document.createElement("div");
    workArea.setAttribute("id", "workArea");
    let text = document.createElement("p");
    text.classList.add("workAreaCurrent", state.currentStyle);
    text.innerHTML = "";
    workArea.appendChild(text);
    target.appendChild(workArea);
}

const state = {
    currentStyle: "normal",
}

const typing = () => {

    document.addEventListener('keydown', (e) => {
        let current = document.querySelector(".workAreaCurrent");
        switch (e.key) {
            case "Enter":
                let text = document.createElement("p");
                text.classList.add("workAreaCurrent", state.currentStyle);
                text.innerHTML = "";
                current.classList.remove("workAreaCurrent");
                current.parentElement.appendChild(text);
                break;
            case "Backspace":
                current.innerHTML = current.innerHTML.slice(0, -1);
                break;
            case "Meta":
            case "Control":
            case "Shift":
                break;
            default:
                current.innerHTML += e.key;
                break;
        }

    })
}

const pageSetup = () => {
    let target = document.querySelector("#workArea");
    target.classList.add("page-setup-a4");
}

const pageMargins = () => {
    let target = document.querySelector("#workArea");
    target.classList.add("page-setup-a4");
}