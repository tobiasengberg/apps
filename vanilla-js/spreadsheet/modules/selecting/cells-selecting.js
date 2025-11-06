import {config} from "../data/config.js";

export const loadSelectingListeners = () => {

    document.addEventListener("keydown", (e) => {
        console.log(e.key);
        if(e.key === "Escape" && config.selection.length > 0) {
            config.selection.forEach((element) => {
                document.getElementById(element).classList.remove("selected");
            });
            config.selection.length = 0;
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
                selectRectangle = getSelectRectangle(100, 30);
                selectRectangle.setAttribute("id", "selectRectangle");
                document.getElementById("workArea").appendChild(selectRectangle);
            }
            selectRectangle = document.getElementById("selectRectangle");
            // selectRectangle.setAttribute("width", e.target.offsetWidth + "px");
            // selectRectangle.setAttribute("height", e.target.offsetHeight + "px");
            selectRectangle.style.top = e.target.offsetTop + "px";
            selectRectangle.style.left = e.target.offsetLeft + "px";

            document.getElementById("selectRectangle").addEventListener("mousedown", (e) => {
                if (e.target.id === "top-left-corner") {
                    console.log(e);
                    let selectRectangle = document.getElementById("selectRectangle");
                    selectRectangle.setAttribute("width", "200px");
                    selectRectangle.setAttribute("height", "60px");
                    selectRectangle.style.top = e.target.offsetTop - 120 + "px";
                    selectRectangle.style.left = e.target.offsetLeft - 300 + "px";
                } else if (e.target.id === "bottom-right-corner") {
                    console.log("expand right");
                }
            });
        }
    })
};

const getSelectRectangle = (width, height) => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", `calc(${width}px + 0px)`);
    svg.setAttribute("height", `calc(${height}px + 0px)`);
    let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute("cx", "0");
    circle1.setAttribute("cy", "0");
    circle1.setAttribute("r", "3px");
    circle1.setAttribute("id", "top-left-corner");
    circle1.style.cursor = "nwse-resize";
    // mouseMoveWhilstDown(circle1);
    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute("cx", "100%");
    circle2.setAttribute("cy", "100%");
    circle2.setAttribute("r", "3px");
    circle2.setAttribute("id", "bottom-right-corner");
    circle2.style.cursor = "nwse-resize";
    // mouseMoveWhilstDown(circle2);
    rectangle.setAttribute("preserveAspectRatio", "none");
    rectangle.setAttribute("fill", "transparent");
    rectangle.setAttribute("width", "100%");
    rectangle.setAttribute("height", "100%");
    rectangle.setAttribute("stroke", "red");
    rectangle.setAttribute("stroke-width", "1px");
    svg.appendChild(rectangle);
    svg.appendChild(circle1);
    svg.appendChild(circle2);
    return svg;
}