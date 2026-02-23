const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasklist = document.getElementById('taskList');

// Load tasks from localStorage on page load
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(taskText => createTaskElement(taskText));
    }
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    tasklist.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('.task-text').textContent;
        tasks.push(taskText);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a task element
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.innerHTML=  ` <span class = "task-text">${taskText}</span>
              <button class="delete-btn">Delete</button> 
              `;
    li.addEventListener('click',function(e)
      {
        if(e.target.tagName==='BUTTON')return;
        li.classList.toggle('completed');
        });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click',function(){
        tasklist.removeChild(li);
        saveTasks();
    });

    tasklist.appendChild(li);
}

function addTask(){
    const taskText = taskInput.value;

    if (taskText == ''){
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText);
    taskInput.value="";
    saveTasks();
}

addBtn.addEventListener('click',addTask);
taskInput.addEventListener('keypress',function (e)
{if (e.key == 'Enter'){addTask();}});

// Load tasks when page loads
window.addEventListener('DOMContentLoaded', loadTasks);