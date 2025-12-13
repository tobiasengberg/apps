import {config} from "../data/config.js";
import {mergeCells, setupTable} from "./table-setup.js";
import {setupContent} from "./content-setup.js";
import {applyStyling} from "../styling/apply-styling.js";
import {loadBarsListeners} from "../selecting/bars-selecting.js";
import {loadCellListeners} from "../cell-updating/cell-updating.js";
import {loadSelectingListeners} from "../selecting/cells-selecting.js";

export const updateSheet = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    localStorage.setItem("mergeData", JSON.stringify(config.mergeData));
    localStorage.setItem("styling", JSON.stringify(config.styling));
    setupTable();
    mergeCells();
    applyStyling();
    setupContent();
    loadBarsListeners();
    loadCellListeners();
    loadSelectingListeners();
}

export const updateContent = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    localStorage.setItem("mergeData", JSON.stringify(config.mergeData));
    localStorage.setItem("styling", JSON.stringify(config.styling));
    setupContent();
}