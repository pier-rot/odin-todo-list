import Project from "./project";
import isArrayOf from "./util/isArrayOf";

export default class ProjectList {
    constructor(projects) {
        if (isArrayOf(projects, Project)) {
            this.projects = projects;
            this.isEmpty = projects.length == 0 ? true : false;
        } else {
            throw new Error("Either an empty array or an array of Project objects must be provided.");
        }
    }

    // remove project from the project list
    remove(project) {
        if (this.isEmpty) {
			this.projects = [];
			throw new Error(
				"You cannot remove from the todo list since it's empty."
			);
		}
		this.projects = this.projects.filter((elem) => {
			return !project.isEqual(elem);
		});
		this.updateEmpty();
    }
    // Add project to the list
    add(project) {
        if (!(project instanceof Project)){
            throw new Error("Only project objects can be added.");
        } else {
            this.projects.push(project);
        }
    }
    // update the isEmpty boolean
    updateEmpty() {
        this.isEmpty = this.projects.length == 0 ? true : false;
    }
}