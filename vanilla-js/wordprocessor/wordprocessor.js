

window.addEventListener('load', () => {
    typing();
});

const typing = () => {
    let target = document.getElementById("setup");
    let workArea = document.createElement("div");
    workArea.setAttribute("id", "workArea");
    let text = document.createTextNode("Start typing");
    workArea.appendChild(text);
    target.appendChild(workArea);
    document.addEventListener('keydown', (e) => {
        text.textContent += e.key;
    })
}