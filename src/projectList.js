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

    updateEmpty() {
        this.isEmpty = this.projects.length == 0 ? true : false;
    }
}