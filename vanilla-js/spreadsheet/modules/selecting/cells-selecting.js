
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