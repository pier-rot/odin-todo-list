import Todo from "./todo";
import TodoList from "./todoList";
import Project from "./project";

const todo1 = new Todo("todo1", "my desc", "date", [""], 2);
const todo2 = new Todo("todo2", "my desc", "date", [""], 2);
const todo3 = new Todo("todo3", "my desc", "date", [""], 2);
const tl = new TodoList([todo1, todo2, todo3]);
const project = new Project("my project", tl, "date");