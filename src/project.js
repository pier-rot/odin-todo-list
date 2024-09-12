import TodoList from "./todoList";
import isValidString from "./util/isValidString";
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

        if (true) {
            this.dueDate = dueDate;
        } else {
            throw new Error("dueDate must be a Date object.");
        }
    }
};