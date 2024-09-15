import Todo from "./todo";
import TodoList from "./todoList";
import Project from "./project";
import ProjectList from "./projectList";
import dateToStr from "./util/dateToStr";
import { readProjects, saveProjects } from "./util/jsonUtils";

const todo1 = new Todo("todo1", "my desc", new Date(), ["req 1", "req 2"], 2);
const todo2 = new Todo("todo2", "my desc", new Date(), [""], 2);
const todo3 = new Todo("todo3", "my desc", new Date(), [""], 2);
const todo4 = new Todo("todo3", "my desc", new Date(), [""], 2);

const tl = new TodoList([todo1, todo2, todo3]);
const tl2 = new TodoList([todo1, todo2, todo3]);
const t2 = new TodoList([todo3]);
const date1 = new Date();
const project1 = new Project("project1",tl, date1);
const project2 = new Project("project2",tl2, date1);
const project3 = new Project("project3", t2, date1);

const defaultProjectList = new ProjectList([project1, project2, project3]);
saveProjects(defaultProjectList, "localStorage");
const projects = readProjects("localStorage");
let selectedProject;


function selectProject(project) {
    selectedProject = project;
}
// Makes a div from a Project object
function makeProjectTab(project) {
    if (!(project instanceof Project)) {
        throw new Error("Project tabs can only be made from project objects.")
    }
    const projectTab = document.createElement("div");
    projectTab.setAttribute("class", "project-tab");
    projectTab.addEventListener("click", (e) => {
        displayProject(project);
        selectProject(project);
    },true)

    // delete button
    const delBtn = document.createElement("button");
    delBtn.innerText = "";
    delBtn.setAttribute("type", "button");
    delBtn.setAttribute("class", "del-project-btn");
    delBtn.addEventListener("click", (e) => {
        projects.remove(project);
        if (selectedProject == project) {
            document.querySelector("#todo-container").innerHTML = "";
        }
        makeProjects();
        saveProjects(projects, "localStorage");
    }, true);
    projectTab.appendChild(delBtn);

    // project name
    const projectName = document.createElement("h2");
    projectName.innerText = project.name;
    projectName.setAttribute("class", "project-name-header");
    projectTab.appendChild(projectName);

    // project due date
    const date = document.createElement("p");
    date.innerText = dateToStr(project.dueDate);
    date.setAttribute("class", "project-due-date");
    projectTab.appendChild(date);

    return projectTab;
}
// make project tabs from the global projects variable
function makeProjects() {
    const projectsContainer = document.querySelector("#projects-container");
    projectsContainer.innerHTML = "";
    for(let i = 0; i < projects.projects.length; i++) {
        projectsContainer.appendChild(makeProjectTab(projects.projects[i]));
    };

    projectsContainer.appendChild(makeAddProjectButton());
}
makeProjects();
// select project tab
function displayProject(project) {
    const todoContainer = document.querySelector("#todo-container");
    todoContainer.innerHTML = "";
    const projectName = document.createElement("h2");
    projectName.innerText = project.name;
    todoContainer.appendChild(projectName)

    todoContainer.appendChild(makeTodoList(project.todoList));
}

// make div that holds a TodoList
function makeTodoList(todoList) {
    const todoListContainer = document.createElement("div");
    todoListContainer.setAttribute("class", "todo-list-container");

    for(let i = 0; i < todoList.todos.length; i++) {
        todoListContainer.appendChild(makeTodo(todoList.todos[i], todoList));
    }

    todoListContainer.appendChild(makeAddTodoButton());

    return todoListContainer;
}

// from a Todo object returns a todo div with all its content and buttons
function makeTodo(todo, todoList) {
    const todoTile = document.createElement("div");
    todoTile.setAttribute("class", "todo-tile");

    const btnContainer = document.createElement("div");
    btnContainer.setAttribute("class", "btn-container");
    todoTile.appendChild(btnContainer);

    const todoInfo = document.createElement("div");
    todoInfo.setAttribute("class", "todo-info");
    todoTile.appendChild(todoInfo);

    const delBtn = document.createElement("button");
    delBtn.setAttribute("type", "button");
    delBtn.innerText = "";
    btnContainer.appendChild(delBtn);
    delBtn.addEventListener("click", (e) => {
        todoList.remove(todo);
        displayProject(selectedProject);
    });

    const editBtn = document.createElement("button");
    editBtn.setAttribute("type", "button");
    editBtn.innerText = "";
    btnContainer.appendChild(editBtn);
    editBtn.addEventListener("click", null) // todo

    const todoName = document.createElement("p");
    todoName.innerText = todo.name;
    todoName.setAttribute("class", "todo-name");
    todoInfo.appendChild(todoName);

    const todoDesc = document.createElement("p");
    todoDesc.innerText = todo.desc;
    todoDesc.setAttribute("class", "todo-desc");
    todoInfo.appendChild(todoDesc);

    const todoDate = document.createElement("p");
    todoDate.inner = dateToStr(todo.dueDate);
    todoDate.setAttribute("class", "todo-date");
    todoInfo.appendChild(todoDate);
    
    const todoPriority = document.createElement("p");
    todoPriority.innerText = todo.priority;
    todoPriority.setAttribute("class", "todo-priority");
    todoInfo.appendChild(todoPriority)
    
    const reqsDiv = document.createElement("div");
    reqsDiv.setAttribute("class", "requirements");
    for(let i = 0; i < todo.reqs.length;i++) {
        const reqCheck = document.createElement("input");
        reqCheck.setAttribute("type", "checkbox");
        reqCheck.setAttribute("name", `req-${i}`);
        reqCheck.setAttribute("class", "req");

        const reqLabel = document.createElement("label");
        reqLabel.setAttribute("for", `req-${i}`);
        reqLabel.setAttribute("class", "req-label");
        reqLabel.innerText = todo.reqs[i];

        reqsDiv.appendChild(reqCheck);
        reqsDiv.appendChild(reqLabel);
    };
    todoInfo.appendChild(reqsDiv);


    return todoTile;
}


// returns the button dom element that allows to add a todo item
function makeAddTodoButton() {
    const addBtn = document.createElement("button");
    addBtn.innerText = "+";
    addBtn.setAttribute("id", "add-todo-btn");
    return addBtn;
}

// returns the button dom element that allows to add a project
function makeAddProjectButton() {
    const addBtn = document.createElement("button");
    addBtn.innerText = "+";
    addBtn.setAttribute("id", "add-project-btn");
    return addBtn;

}
// delete project

// make todo list from selected project