

window.addEventListener('load', () => {
    document.querySelector("#menu-tab-document").addEventListener("click", pageSetup);
    document.querySelector("#menu-tab-margin").addEventListener("click", () => {
        const stylesheets = document.styleSheets[1].cssRules[0].style.getPropertyValue("--left-margin");
        console.log(stylesheets);
        document.styleSheets[1].cssRules[0].style.setProperty("--left-margin", parseInt(stylesheets.split('p')[0]) + 20 + "px");
    });
    typing();

});

const typing = () => {
    let target = document.querySelector("#setup");
    let workArea = document.createElement("div");
    workArea.setAttribute("id", "workArea");
    let text = document.createElement("span");
    text.innerHTML = "";
    workArea.appendChild(text);
    target.appendChild(workArea);
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "Enter":
                text.innerHTML += "<br/>";
                break;
            case "Backspace":
                text.innerHTML = text.innerHTML.slice(0, -1);
                break;
            case "Meta":
            case "Control":
            case "Shift":
                break;
            default:
                text.innerHTML += e.key;
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