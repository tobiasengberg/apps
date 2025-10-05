import {selection} from "../script.js";

export const getSelectRectangle = () => {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "calc(100% + 4px)");
    svg.setAttribute("height", "calc(100% + 4px)");
    let rectangle = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    let circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute("cx", "0");
    circle1.setAttribute("cy", "0");
    circle1.setAttribute("r", "3px");
    circle1.style.cursor = "nwse-resize";
    // mouseMoveWhilstDown(circle1);
    let circle2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle2.setAttribute("cx", "100%");
    circle2.setAttribute("cy", "100%");
    circle2.setAttribute("r", "3px");
    circle2.style.cursor = "nwse-resize";
    // mouseMoveWhilstDown(circle2);
    rectangle.setAttribute("preserveAspectRatio", "none");
    rectangle.setAttribute("fill-opacity", "0");
    rectangle.setAttribute("width", "100%");
    rectangle.setAttribute("height", "100%");
    rectangle.setAttribute("stroke", "red");
    rectangle.setAttribute("stroke-width", "1px");
    svg.appendChild(rectangle);
    svg.appendChild(circle1);
    svg.appendChild(circle2);
    return svg;
}

// const mouseMoveWhilstDown = (target) => {
//     var endMove = function () {
//         window.removeEventListener('mousemove', whileMove);
//         window.removeEventListener('mouseup', endMove);
//         document.getElementById("workArea").removeEventListener("mouseout", endMove);
//     };
//
//     var whileMove = (e) => {
//         destination.x = e.clientX;
//         destination.y = e.clientY;
//         console.log(destination);
//         console.log(origin);
//     }
//
//     let origin = {x: 0, y: 0};
//     let destination = {x: 0, y: 0};
//     target.addEventListener('mousedown', function (event) {
//         event.stopPropagation(); // remove if you do want it to propagate ..
//         origin.x = event.clientX;
//         origin.y = event.clientY;
//
//         window.addEventListener('mousemove', whileMove);
//         window.addEventListener('mouseup', endMove);
//         document.getElementById("workArea").addEventListener("mouseout", endMove);
//     });
// }