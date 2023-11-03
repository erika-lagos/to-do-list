import Task from './task';
import Project from './project';

const projects = [
    // new Project('Project 1', 'Una descripcion'),
    // new Project('Project 2', 'la descripcion', 1, 0, [
    // new Task('Hacer la cama', 'Asegurar que las sabanas estan limpias'),
    // new Task('hacer de comer', 'Checar la lista del super'),
    // new Task('estudiar javascript', 'Necesitamos un trabajo'),
    // new Task('ir al soccer', 'Llevarle jugo a sebastian')])
];

const unassignedTasks = [
    // new Task('estudiar javascript', 'Necesitamos un trabajo'),
    // new Task('ir al soccer', 'Llevarle jugo a sebastian')
];

let activeProject;

function loadStorage() {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    storedProjects?.forEach(parseProject);
    parseTasks(JSON.parse(localStorage.getItem('tasks')));
}

function storeData() {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('tasks', JSON.stringify(unassignedTasks));
}

function parseProject(projectString) {
    const project = new Project(projectString.name, projectString.description, projectString.id, projectString.progress);
    projectString.tasks?.forEach(task => {
        project.addTask(new Task(task.name, task.description, task.id, task.isComplete));
    });
    projects.push(project);
}

function parseTasks(tasks) {
    tasks?.forEach(task => {
        unassignedTasks.push(new Task(task.name, task.description, task.id, task.isComplete));
    });
}

function addProject(project) {
    projects.push(project);
    storeData();
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

function replaceProject(data) {
    const modifiedProject = getProject(data.id);
    modifiedProject.name = data.name;
    modifiedProject.description = data.description;
    storeData();
    return modifiedProject;
}

function removeProject(id) {
    const projectIndex = projects.findIndex(project => project.id === id);
    projects.splice(projectIndex,1);
    if (activeProject.id === id) {
        activeProject = undefined;
    }
    storeData();
}

function getAllTasks() {
    //TO-DO
    console.log('Pendong functionality to see all tasks');
    // return tasks;
}

function addTask(newTask) {
    if (activeProject) {
        activeProject.addTask(newTask);
    } else {
        unassignedTasks.push(newTask);
    }
    storeData();
}

function removeTask(id) {
    if (activeProject) {
        activeProject.removeTask(id);
    } else {
        const taskIndex = unassignedTasks.findIndex(task => task.id === id);
        unassignedTasks.splice(taskIndex,1);
    }
    storeData();
}

function replaceTask(taskData) {
    const modifiedTask = activeProject ? 
        activeProject.getTask(taskData.id) : 
        unassignedTasks.find(task => task.id === taskData.id);
    modifiedTask.name = taskData.name;
    modifiedTask.description = taskData.description;
    storeData();
    return modifiedTask;
}

loadStorage();

export {
    getProjects,
    setActiveProject,
    getProject,
    replaceProject,
    addProject,
    removeProject,
    getAllTasks,
    addTask,
    removeTask,
    replaceTask
};