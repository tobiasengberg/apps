import {config} from "../data/config.js";
import {mergeCells, setupTable} from "./table-setup.js";
import {setupContent} from "./content-setup.js";
import {loadEventListeners} from "../eventlisteners/eventlisteners.js";
import {applyStyling} from "../styling/apply-styling.js";

export const updateSheet = () => {
    console.log("Before: " + config.styling);
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    localStorage.setItem("mergeData", JSON.stringify(config.mergeData));
    localStorage.setItem("styling", JSON.stringify(config.styling));
    console.log("After: " + config.styling);
    setupTable();
    mergeCells();
    applyStyling();
    setupContent();
    loadEventListeners();
}

export const updateContent = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    localStorage.setItem("mergeData", JSON.stringify(config.mergeData));
    localStorage.setItem("styling", JSON.stringify(config.styling));
    setupContent();
}