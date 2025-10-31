import {config} from "../data/config.js";
import {mergeCells, setupTable} from "./table-setup.js";
import {setupContent} from "./content-setup.js";
import {loadEventListeners} from "../eventlisteners/eventlisteners.js";
import {applyStyling} from "../styling/apply-styling.js";

export const updateSheet = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    setupTable();
    mergeCells();
    applyStyling();
    setupContent();
    loadEventListeners();
    console.log(config.selection);
}

export const updateContent = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    setupContent();
}