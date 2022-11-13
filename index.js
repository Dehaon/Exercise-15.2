const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
];

putTask(tasks);

const createTaskForm = document.querySelector('.create-task-block');
    createTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // console.log(event.target.taskName.value);
        const newTaskText = `${event.target.taskName.value.trim()}`;
        const newTask = {
            id: `${Date.now()}`,
            completed: false,
            text: newTaskText
        }
        // console.log(newTask.text);
        const sameName = tasks.some((task) => {
            return task.text === newTask.text
            });
        // console.log('Proverka 1', sameName);

        if (sameName) {
            createTaskError('Задача с таким названием уже существует.');
            return;
        } else if (newTask.text === '') {
            createTaskError('Название задачи не должно быть пустым.');
            return;
        } else {
            removeTaskError();
            tasks.push(newTask);
            const taskList = document.querySelector('.tasks-list');
            taskList.innerHTML = '';
            putTask(tasks);
        }
    });

function removeTaskError() {
    const createTaskForm = document.querySelector('.create-task-block');
    const foundError = createTaskForm.querySelectorAll('.error-message-block')
    foundError.forEach(error => error.remove());
}

function createTaskError(text) {
    removeTaskError();
    const createTaskForm = document.querySelector('.create-task-block');
    const taskError = document.createElement('span');
        taskError.className = 'error-message-block';
        taskError.textContent = text;        
        createTaskForm.append(taskError);
}

function putTask(taskInfo) {
    const taskList = document.querySelector('.tasks-list');
    taskInfo.forEach((task) => {
        const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.dataset.taskId = `${task.id}`;
            taskList.append(taskItem);
        const taskItem_mainContainer = document.createElement('div');
            taskItem_mainContainer.className = 'task-item__main-container';
            taskItem.append(taskItem_mainContainer);
        const taskItem_mainContent = document.createElement('div');
            taskItem_mainContent.className = 'task-item__main-content';
            taskItem_mainContainer.append(taskItem_mainContent);
        const checkboxForm = document.createElement('form');
            checkboxForm.className = 'checkbox-form'
            taskItem_mainContent.append(checkboxForm);
        const checkboxFormInput = document.createElement('input');
            checkboxFormInput.className = 'checkbox-form__checkbox';
            checkboxFormInput.type = 'checkbox';
            checkboxFormInput.id = `task-${task.id}`;
            checkboxForm.append(checkboxFormInput);
        const checkboxFormLabel = document.createElement('label');
            checkboxFormLabel.htmlFor = `task-${task.id}`;
            checkboxForm.append(checkboxFormLabel);
        const taskItem_text = document.createElement('span');
            taskItem_text.className = 'task-item__text';
            taskItem_text.textContent = `${task.text}`;
            taskItem_mainContent.append(taskItem_text);
        const deleteButton = document.createElement('button');
            deleteButton.classList.add('task-item__delete-button')
            deleteButton.classList.add('default-button');
            deleteButton.classList.add('delete-button');    
            deleteButton.dataset.deleteTaskId = '5';
            deleteButton.textContent = 'Удалить';
            taskItem_mainContainer.append(deleteButton);
    });
}