import Task from './task';
import Project from './project';

const projects = [
    new Project('Project 1', 'Una descripcion'),
    new Project('Project 2', 'la descripcion')
    // new Task('Hacer la cama', 'Asegurar que las sabanas estan limpias'),
    // new Task('hacer de comer', 'Checar la lista del super'),
    // new Task('estudiar javascript', 'Necesitamos un trabajo'),
    // new Task('ir al soccer', 'Llevarle jugo a sebastian')
];

let activeProject;

function loadStorage() {
    console.log('load storage is being called');
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    if (storedProjects !== undefined && storedProjects !== null) {
        storedProjects.forEach(parseProject);
    }
}

function populateStorage() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function parseProject(projectString) {
    const project = new Project(projectString.name, projectString.description, projectString.id, projectString.progress);
    if (projectString.tasks) {
        projectString.tasks.forEach(task => {
            project.addTask(new Task(task.name, task.description, task.id, task.isComplete));
        });
    }
    addProject(project);
}

function addProject(project) {
    projects.push(project);
    populateStorage();
}

function getProjects() {
    return projects;
}

function setActiveProject(project) {
    activeProject = project;
}

function getProject(projectId) {
    return projects.find(project => project.id === projectId);
}

function getAllTasks() {
    //TO-DO
    console.log('Pendong functionality to see all tasks');
    // return tasks;
}

function addTask(newTask) {
    //TO-DO
    // tasks.push(newTask);
    // storeTasks();
}

function removeTask(id) {
    //TO-DO
    // const taskIndex = tasks.findIndex(task => task.id === id);
    // tasks.splice(taskIndex,1);
    // storeTasks();
}

function replaceTask(taskData) {
    // const oldTask = tasks.find(task => task.id === taskData.id);
    // oldTask.name = taskData.name;
    // oldTask.description = taskData.description;
    // storeTasks();
    // return oldTask;
}

loadStorage();

export {
    getProjects,
    setActiveProject,
    getProject,
    getAllTasks,
    addTask,
    removeTask,
    replaceTask
};