export const mainMenu = () => {
    menuOptions.forEach((option) => {
        let menuContainer = document.createElement("div");
        menuContainer.setAttribute("id", `${option}-menu`)
        let newOption = document.createElement("button");
        newOption.innerText = option;
        newOption.setAttribute("id", `${option}-btn`);
        newOption.classList.add("menu-btn");
        menuContainer.appendChild(newOption);
    })
}

const menuOptions = [
    "File", "View"
]