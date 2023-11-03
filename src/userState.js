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
    storedProjects?.forEach(project => projects.push(parseProject(project)));
    unassignedTasks.push(...parseTasks(JSON.parse(localStorage.getItem('tasks'))));
}

function storeData() {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('tasks', JSON.stringify(unassignedTasks));
}

function parseProject(projectString) {
    const project = new Project(
        projectString.name, 
        projectString.description, 
        projectString.dueDate ? new Date(projectString.dueDate) : undefined, 
        projectString.id, 
        projectString.progress);
    project.addTasks(parseTasks(projectString.tasks));
    return project;
}

function parseTasks(taskStrings) {
    const tasks = [];
    taskStrings?.forEach(taskStr => {
        tasks.push(new Task(
            taskStr.name, 
            taskStr.description, 
            taskStr.dueDate ? new Date(taskStr.dueDate) : undefined, 
            taskStr.projectId, 
            taskStr.id, 
            taskStr.isComplete));
    });
    return tasks;
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
    modifiedProject.dueDate = data.dueDate;
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
    const tasks = [];
    tasks.push(...unassignedTasks);
    projects.forEach(project => {
        tasks.push(...project.getTasks());
    });
    return tasks;
}

function getTask(id) {
    const allTasks = getAllTasks();
    return allTasks.find(task => task.id === id);
}

function addTask(newTask) {
    if (activeProject) {
        newTask.setProjectId(activeProject.id);
        activeProject.addTask(newTask);
    } else {
        unassignedTasks.push(newTask);
    }
    storeData();
}

function removeTask(id) {
    const task = getTask(id);
    if (task.projectId) {
        const project = getProject(task.projectId);
        project.removeTask(id);
    } else {
        const taskIndex = unassignedTasks.findIndex(task => task.id === id);
        unassignedTasks.splice(taskIndex,1);
    }
    storeData();
}

function replaceTask(taskData) {
    const task = getTask(taskData.id);
    task.name = taskData.name;
    task.description = taskData.description;
    task.dueDate = taskData.dueDate;
    storeData();
    return task;
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