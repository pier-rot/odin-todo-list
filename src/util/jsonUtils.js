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

function fromJSONtoProjects(JSONString) {
  // Reads from JSONString and return an array of Project objects
};

function fromProjectsToJSON(projects) {
  // Write projects array to JSON
};