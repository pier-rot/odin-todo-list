import Todo from "./todo";
import TodoList from "./todoList";
import Project from "./project";
import { readProjects, saveProjects } from "./util/jsonUtils";

const todo1 = new Todo("todo1", "my desc", new Date(), ["req 1", "req 2"], 2);
const todo2 = new Todo("todo2", "my desc", new Date(), [""], 2);
const todo3 = new Todo("todo3", "my desc", new Date(), [""], 2);
const tl = new TodoList([todo1, todo2, todo3]);
const project = new Project("my project", tl, new Date());
const project2 = new Project("project 2", tl, new Date());

let projectList = [project, project2];
// saveProjects(projectList,"localStorage");
console.log(readProjects("localStorage"));

// function to make HTML from a todo
function makeHtmlTodo(todo) {
    const todoContent = document.createElement("div");
    todoContent.setAttribute("class", "todo-content");

    const sideBtnDiv = document.createElement("div");
    sideBtnDiv.setAttribute("class", "todo-side-buttons");
    todoContent.appendChild(sideBtnDiv);

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("class", "delTodoBtn");
    deleteBtn.innerText = "";
    deleteBtn.addEventListener("click",handleDeleteTodo);
    sideBtnDiv.appendChild(deleteBtn);

    const doneBtn = document.createElement("button");
    doneBtn.setAttribute("type", "button");
    doneBtn.setAttribute("class", "doneTodoBtn");
    doneBtn.innerText = "";
    doneBtn.addEventListener("click",handleDoneTodo);
    sideBtnDiv.appendChild(doneBtn);

    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todo");
    todoContent.appendChild(todoDiv);
    
    const nameHeader = document.createElement("h2");
    nameHeader.setAttribute("class", "todo-name");
    nameHeader.innerText = todo.name;
    todoDiv.appendChild(nameHeader);

    const descP = document.createElement("p");
    descP.setAttribute("class","todo-desc");
    descP.innerText = todo.desc;
    todoDiv.appendChild(descP);

    const dateP = document.createElement("p");
    dateP.setAttribute("class", "todo-date");
    dateP.innerText = dateToStr(todo.dueDate);
    todoDiv.appendChild(dateP);

    const priorityP = document.createElement("p");
    priorityP.setAttribute("class","todo-priority");
    priorityP.innerText = "priority : " + todo.priority;
    todoDiv.appendChild(priorityP);

    const reqsDiv = document.createElement("div");
    reqsDiv.setAttribute("class", "todo-requirements");
    todoDiv.appendChild(reqsDiv);
    for(let i = 0; i<todo.reqs.length; i++) {
        const req =  todo.reqs[i];
        const reqElem = document.createElement("input");
        reqElem.setAttribute("type", "checkbox");
        reqElem.setAttribute("class", "requirement");
        reqElem.setAttribute("name", `req-${i}`);
        reqsDiv.appendChild(reqElem);
        const reqLabel = document.createElement("label");
        reqLabel.innerText = req;
        reqLabel.setAttribute("for", `req-${i}`);
        reqsDiv.appendChild(reqLabel);
    }

    return todoContent;
};
// function to make HTML from todo list
function makeHtmlTodoList(todoList) {
    const todoListDiv = document.createElement("div");
    todoListDiv.setAttribute("class", "todo-list");

    for(let i = 0; i < todoList.todos.length; i++) {
        todoListDiv.appendChild(makeHtmlTodo(todoList.todos[i]));
    }

    return todoListDiv;
}

const todoContainer = document.querySelector("#todo-container");
todoContainer.appendChild(makeHtmlTodoList(tl));
// function to make HTML project tab from project

// event handler to delete a todo
function handleDeleteTodo(event) {

}

function handleDoneTodo(event) {

}

function dateToStr(dueDate) {

}