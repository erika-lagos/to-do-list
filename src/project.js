export default class Project {
    
    static lastId = 0;

    constructor(name, description, id = Project.lastId++, progress = 0, tasks = []) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.progress = progress;
        this.tasks = tasks;
        if (this.id >= Project.lastId) {
            Project.lastId = this.id + 1;
        }
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
        // this.calculateProgress();
    }

    addTasks(tasks) {
        this.tasks.push(...tasks);
    }

    removeTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(taskIndex,1);
    }

    getTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }
}