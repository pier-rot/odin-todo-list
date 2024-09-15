import TodoList from "./todoList";
import isValidString from "./util/isValidString";
import isArraysEqual from "./util/arrayEqual";
export default class Project {
	// Constructor
	// name must be a string,
	// todoList must be a todoList object
	constructor(name, todoList, dueDate) {
		if (isValidString(name)) {
			this.name = name;
		} else {
			throw new Error("Invalid name.");
		}

		if (todoList instanceof TodoList) {
			this.todoList = todoList;
		} else {
			throw new Error("todoList must be a TodoList object.");
		}

		if (dueDate instanceof Date) {
			this.dueDate = dueDate;
		} else {
			throw new Error("dueDate must be a Date object.");
		}
	}

	isEqual(other) {
		for (const key in this) {
			if (this[key] instanceof Array) {
				if (!isArraysEqual(this[key], other[key])) {
					return false;
				}
			} else if (this[key] instanceof TodoList) {
                if (!isArraysEqual(this[key].todos, other[key].todos)) {
                    return false;
                }
            } else if (this[key] != other[key]) {
				console.log(`${key} : ${this[key]} !== ${other[key]}`);
				return false;
			}
		}
		return true;
	}
}
