const addTaskBtn = document.getElementById('add-task-btn');
const TaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemElems = [];


function Task(description) {
    this.description = description;
    this.completed = false;
}

const checker = (glock = TaskInput.value) => {
    if(glock == ''){
        alert('Вы не заполнили поле задачника, рекомендуется удалить таску!');
    }
    if(glock.length >= 50){
        alert('Слишком много символов, рекомендуется удалить таску!');
    }
}

const createTemplate = (task, index) => {
    return `
     <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick ="completeTask(${index})" class="btn-complete" type = "checkbox" ${task.completed ? 'checked' : ''}/>
                <button onclick ="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
    </div>
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);
    tasks = [...activeTasks, ...completedTasks];
}

const fillHTMLlist = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0){
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        })   
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHTMLlist();


const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHTMLlist();
}
addTaskBtn.addEventListener('click', () => {
    checker();
    tasks.push(new Task(TaskInput.value));
    updateLocal();
    fillHTMLlist();
    TaskInput.value = '';
})

const deleteTask = index => {
    todoItemElems[index].classList.add('delition');

    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHTMLlist();

    }, 500)    
}




