import isArrayOf from "./util/isArrayOf";
import Todo from "./todo";
export default class TodoList {
	constructor(todos) {
		if (isArrayOf(todos, Todo)) {
			this.todos = todos;
			this.isEmpty = todos.length == 0 ? true : false;
		} else {
            throw new Error("Invalid todo list"); 
        }
	}

	// Removes todo from the todo list.
	remove(todo) {
		if (this.isEmpty) {
			this.todos = [];
			throw new Error(
				"You cannot remove from the todo list since it's empty."
			);
		}
		this.todos = this.todos.filter((elem) => {
			return !todo.isEqual(elem);
		});
		this.updateEmpty();
	}

	// Add todo to the todo list.
	add(todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo);
            this.updateEmpty();
        } else {
            throw new Error(`${todo} is not a Todo object.`);
        }
	}

	updateEmpty() {
		this.isEmpty = this.todos.length == 0 ? true : false;
	}
}