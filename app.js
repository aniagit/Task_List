// define UI vars
const form = document.querySelector('#form');
const newTask = document.querySelector('#newtask');
const taskList = document.querySelector('#tasklist');
const clearTasks = document.getElementById('clear');
const find = document.getElementById('find');


loadEventListeners();

function loadEventListeners(){
    //get tasks from local storage
    document.addEventListener('DOMContentLoaded', getTasks);

    form.addEventListener('submit', addTask);
    clearTasks.addEventListener('click', removeAllTasks);
    taskList.addEventListener('click', removeTask);
    find.addEventListener('keyup', findTask);
}




function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        //create li
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));
        //add X to li
        const remove = document.createElement('button');
        remove.innerText= 'X';
        remove.className = 'remove';
        //add X to li
        li.appendChild(remove);
        //add li to ol
        taskList.appendChild(li);
    });
}

function addTask(e){
  if(newTask.value===''){
    alert('Add a task = Wpisz zadanie');
  } else {
    //create li
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newTask.value));
    //add X to li
    const remove = document.createElement('button');
    remove.innerText= 'X';
    remove.className = 'remove';
    //add X to li
    li.appendChild(remove);
    //add li to ol
    taskList.appendChild(li);
    //store tasks in local storage
    storeTasks(newTask.value);
    newTask.value='';
    e.preventDefault();
  }
};

function storeTasks(task){
    let tasks;
    if (localStorage.getItem('tasks')===null){
        tasks=[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


function removeAllTasks(e){
    //taskList.innerHTML= '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
  clearTasksFromLocalStorage();
};

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

function removeTask(e){
    if(e.target.classList.contains('remove')){
        if(confirm('Are you sure?')){
            e.target.parentElement.remove();
            //remove task from local storage
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }
};

function removeTaskFromLocalStorage(taskItem){
    let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent === task){
          tasks.splice(index, 1);
        }
      });
    
      localStorage.setItem('tasks', JSON.stringify(tasks));
}

function findTask(e){
    const search = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(search) != -1){
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    );
}