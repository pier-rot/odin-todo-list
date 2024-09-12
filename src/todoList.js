export default class TodoList {
    constructor(todos){
        this.todos = todos;
        this.isEmpty = (todos.length == 0) ? true : false;
    };

    // Removes todo from the todo list.
    remove(todo) {
        if (this.isEmpty) {
            this.todos = [];
            console.log("You cannot remove from the todo list since it's empty.")
        }
        this.todos = this.todos.filter(
            (elem) => {
                return !(todo.isEqual(elem));
            }
        );
        this.updateEmpty();
    }


    // Add todo to the todo list.
    add(todo) {
        this.todos.push(todo);
        this.updateEmpty();
    }

    updateEmpty() {
        this.isEmpty = (this.todos.length == 0) ? true : false;
    }
};