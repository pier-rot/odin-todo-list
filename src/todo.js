import isArraysEqual from "./util/arrayEqual";
import isValidString from "./util/isValidString";
export default class Todo {
	constructor(name, desc, dueDate, reqs, priority, isDone = false) {
		// Check if name is a valid string
		if (isValidString(name)) {
			this.name = name;
		} else {
			throw new Error(`${name} is not a valid name.`);
		}
        // Check if desc is a valid description
		if (isValidString(desc)) {
			this.desc = desc;
		} else {
			throw new Error(`${desc} is not a valid description.`);
		}
        // Check if dueDate is a valid date.
		if (dueDate instanceof Date) {
			this.dueDate = dueDate;
		} else {
			throw new Error("the given date must be a Date object.")
		}
  
        // Check if reqs is an array.
		if (reqs instanceof Array) {
			this.reqs = reqs;
		} else {
			throw new Error(`${reqs} must be an array.`);
		}
        // Check if priority is a valid number between 1 and 5.
		if (typeof priority !== "number") {
			throw new Error(`${priority} must be a number.`);
		} else if (priority > 5 || priority < 1) {
			throw new Error(`${priority} must be between 1 and 5.`);
		} else {
			this.priority = priority;
		}
        // Check if isDone is a boolean.
        if (typeof isDone !== "boolean") {
            throw new Error(`${isDone} must be a boolean.`)
        } else {
		    this.isDone = isDone;
        }
	}

	toggleStatus() {
		this.isDone = !this.isDone;
	}

	isEqual(other) {
		for (const key in this) {
			if (this[key] instanceof Array) {
				if (!isArraysEqual(this[key], other[key])) {
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
