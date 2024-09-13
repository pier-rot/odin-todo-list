import Todo from "./todo";
import TodoList from "./todoList";
import Project from "./project";
import { readProjects, saveProjects } from "./util/jsonUtils";

const todo1 = new Todo("todo1", "my desc", new Date(), [""], 2);
const todo2 = new Todo("todo2", "my desc", new Date(), [""], 2);
const todo3 = new Todo("todo3", "my desc", new Date(), [""], 2);
const tl = new TodoList([todo1, todo2, todo3]);
const project = new Project("my project", tl, new Date());
const project2 = new Project("project 2", tl, new Date());

let projectList = [project, project2];
// saveProjects(projectList,"localStorage");
console.log(readProjects("localStorage"));