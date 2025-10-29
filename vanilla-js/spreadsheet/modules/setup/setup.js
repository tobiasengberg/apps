import {config} from "../data/config.js";
import {setupTable} from "./table-setup.js";
import {setupContent} from "./content-setup.js";

export const updateSheet = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    setupTable();
    setupContent();
}

export const updateContent = () => {
    localStorage.setItem("content", JSON.stringify(config.content));
    localStorage.setItem("dimensions", JSON.stringify(config.dimensions));
    setupContent();
}