export const getSelectRectangle = () => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "calc(100% + 4px)");
    svg.setAttribute("height", "calc(100% + 4px)");
    let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectangle.setAttribute("preserveAspectRatio", "none");
    rectangle.setAttribute("fill-opacity", "0");
    rectangle.setAttribute("width", "100%");
    rectangle.setAttribute("height", "100%");
    rectangle.setAttribute("stroke", "red");
    rectangle.setAttribute("stroke-width", "2px");
    svg.appendChild(rectangle);
    return svg;
}