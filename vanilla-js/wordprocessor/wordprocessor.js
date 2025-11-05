

window.addEventListener('load', () => {
    typing();
});

const typing = () => {
    let target = document.getElementById("setup");
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