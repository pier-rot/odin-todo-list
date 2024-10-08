import isArrayOf from "./isArrayOf";
import Project from "../project";
import Todo from "../todo";
import TodoList from "../todoList";
import ProjectList from "../projectList";
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

// Returns a Project object which was parsed from a JS Object parsed from JSON
function getProjectFromObj(obj) {
  return new Project(obj.name, getTodoListFromObj(obj.todoList), new Date(obj.dueDate));

}

// Returns a TodoList object which was parsed from a JS Object parsed from JSON
function getTodoListFromObj(obj) {
  const todos = [];
  const nrOfTodos = obj.todos.length;

  for(let i = 0; i<nrOfTodos; i++) {
    todos.push(getTodoFromObj(obj.todos[i]));
  }
  return new TodoList(todos);
}

// Returns a Todo object which was parsed from a JS Object parsed from JSON
function getTodoFromObj(obj) {
  return new Todo(obj.name, obj.desc, new Date(obj.dueDate), obj.reqs, obj.priority, obj.isDone);
}

// Returns an array of Project objects made from str which is a string that stores projects data in JSON format
function getProjectsFromJSON(str) {
  const obj = JSON.parse(str);
  const arr = [];
  for (let i = 0; i < obj.projects.length;i++) {
    arr.push(getProjectFromObj(obj.projects[i]));
  }
  return new ProjectList(arr);
}

// Reads from localStorage and returns a ProjectList object
function readProjects(storage) {
  if (!storageAvailable(storage)) {throw new Error(`${storage} is not an available storage.`);};
  return (window[storage].getItem("projects") === null) ? [] : getProjectsFromJSON(window[storage].getItem("projects"));
};

// Writes projects to storage
function saveProjects(projects, storage) {

  // Check if storage is available
  if (!storageAvailable(storage)) {
    throw new Error(`${storage} is not an available storage.`)
  }
  // Check if projects is an array an array of Project objects
  if (!(projects instanceof ProjectList)) {
    throw new Error(`${projects} is not a ProjectList object.`);
  }
  // Sets the "projects" item to the JSON String of projects
  window[storage].setItem("projects", JSON.stringify(projects));
};

export {readProjects, saveProjects};