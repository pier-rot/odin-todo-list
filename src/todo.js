export default class Todo {
    
    constructor(name, desc, dueDate, reqs, priority, isDone = false) {
        this.name = name;
        this.desc = desc;
        this.dueDate = dueDate;
        this.reqs = reqs;
        this.priority = priority;
        this.isDone = isDone;
    }
 

};