import {config} from "../data/config.js";
import {setupTable} from "./table-setup.js";
import {setupContent} from "./content-setup.js";
import {loadEventListeners} from "../eventlisteners/eventlisteners.js";

export const updateSheet = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    console.log(config.content);
    setupTable();
    setupContent();
    loadEventListeners();
}

export const updateContent = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    console.log(config.content);
    setupContent();
}