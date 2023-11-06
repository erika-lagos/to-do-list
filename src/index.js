import Task from './task';
import Project from './project';
import EditView from './editView';
import TaskView from './taskView';
import * as userState from './userState';
import * as pubSub from './pubSub';
import * as sidebarView from './sidebarView';
import * as homeView from './homeView';
import './style.css';

const projectView = new EditView('Delete Project', 'Save Project', 'Name your project', 'Describe your project');
const taskView = new TaskView('Delete Task', 'Save Task', 'Name your task', 'Describe your task');

function showAllTasks() {
    const allTasks = userState.getAllTasks();
    homeView.renderTaskList(allTasks, 'All Tasks');
    userState.setActiveProject(undefined);
}

function showTodayTasks() {
    const tasks = userState.getUpcomingTasks(1);
    homeView.renderTaskList(tasks, 'Tasks for today');
    userState.setActiveProject(undefined);
}

function showUpcomingTasks() {
    const tasks = userState.getUpcomingTasks(7);
    homeView.renderTaskList(tasks, 'Tasks for the next week');
    userState.setActiveProject(undefined);
}

function createProject() {
    projectView.show();
}

function saveProject(data) {
    if (data.id !== undefined && data.id !== null) {  
        const modifiedProject = userState.replaceProject(data);
        sidebarView.replaceProject(modifiedProject);
        homeView.replaceProject(modifiedProject);
    } else {
        const project = new Project(data.name, data.description, data.dueDate);
        userState.addProject(project);
        sidebarView.addProject(project);
    }
}

function deleteProject(projectId) {
    console.log('delete project is called');
    userState.removeProject(projectId);
    sidebarView.removeProject(projectId);
    homeView.clear();
}

function editProject(project) {
    projectView.show(project);
}

function createTask() {
    taskView.show();
}

function saveTask(data) {
    if (data.id !== undefined && data.id !== null) {  
        const modifiedTask = userState.replaceTask(data);
        homeView.replaceTask(modifiedTask);
    } else {
        const task = new Task(data.name, data.description, data.dueDate, data.highPriority);
        userState.addTask(task);
        homeView.addTask(task);
    }
}

function deleteTask(taskId) {
    userState.removeTask(taskId);
    homeView.removeTask(taskId);
}

function editTask(task) {
    taskView.show(task);
}

function showProject(projectId) {
    const activeProject = userState.getProject(projectId);
    userState.setActiveProject(activeProject);
    homeView.renderProject(activeProject);
}

function createHeader(event) {
    //TODO: implement this functionality
    console.log('Create header functionality pending')
}

function addEventListeners() {
    pubSub.subscribe('New Task', createTask);
    pubSub.subscribe('New Header', createHeader);
    pubSub.subscribe('Save Task', saveTask);
    pubSub.subscribe('Delete Task', deleteTask);
    pubSub.subscribe('Edit Task', editTask);
    pubSub.subscribe('Show Project', showProject);
    pubSub.subscribe('New Project', createProject);
    pubSub.subscribe('Save Project', saveProject);
    pubSub.subscribe('Edit Project', editProject);
    pubSub.subscribe('Delete Project', deleteProject);
    pubSub.subscribe('All Tasks', showAllTasks);
    pubSub.subscribe('Today Tasks', showTodayTasks);
    pubSub.subscribe('Upcoming', showUpcomingTasks);
}

function loadContent() {
    sidebarView.render(userState.getProjects());
    homeView.render();
    addEventListeners();
}

window.addEventListener('load', loadContent);
