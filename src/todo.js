import isArraysEqual from "./util/arrayEqual";

export default class Todo {
	constructor(name, desc, dueDate, reqs, priority, isDone = false) {
		this.name = name;
		this.desc = desc;
		this.dueDate = dueDate;
		this.reqs = reqs;
		this.priority = priority;
		this.isDone = isDone;
	}

	toggleStatus() {
		this.isDone = !this.isDone;
	};

    isEqual(other) {
        for(const key in this){
            if (this[key] instanceof Array) {
                if (!isArraysEqual(this[key], other[key])){
                    return false
                }
            }
            else if (this[key] != other[key]) {
                console.log(`${key} : ${this[key]} !== ${other[key]}`);
                return false;
            }
        }
        return true;

    }
};