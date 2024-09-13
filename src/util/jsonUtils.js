import isArrayOf from "./isArrayOf";
import Project from "../project";
function storageAvailable(type) {
  // type = "localStorage" || "sessionStorage"
	let storage;
	try {
		storage = window[type];
		const x = "__storage_test__";
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	} catch (e) {
		return (
			e instanceof DOMException &&
			e.name === "QuotaExceededError" &&
			// acknowledge QuotaExceededError only if there's something already stored
			storage &&
			storage.length !== 0
		);
	}
}

// Reads from localStorage and returns an array of Project objects
function readProjects(storage) {
};

// Writes projects to storage
function saveProjects(projects, storage) {

  // Check if storage is available
  if (!storageAvailable(storage)) {
    throw new Error(`${storage} is not an available storage.`)
  }
  // Check if projects is an array an array of Project objects
  if (!(isArrayOf(projects, Project))) {
    throw new Error(`${projects} is not an array.`);
  }
  // Sets the "projects" item to the JSON String of projects
  window[storage].setItem("projects", JSON.stringify(projects));
};

export {readProjects, saveProjects};