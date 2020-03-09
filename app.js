/*DEFINE UI VARS*/
const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const  taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//LOAD ALL EVENT LISTENER

loadEventListeners();

 function loadEventListeners(){
     document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask);
    taskList.addEventListener('click',remove);
    clearBtn.addEventListener('click',clear);
    filter.addEventListener('keyup',filterTasks);
 }

 function getTasks() {
     let tasks;
     if (localStorage.getItem('tasks')== null){
         tasks = [];
     }
     else
     {
         tasks= JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach(function(task) {
         const li = document.createElement('li');
         li.className = "collection-items";
         li.appendChild(document.createTextNode(task));

         const link = document.createElement('a');
         link.className = "delete-item secondary-content";

         link.innerHTML = '<i class="fa fa-remove"></i>';
         li.appendChild(link);

         taskList.appendChild(li);
     });


 }

function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }

        const li = document.createElement('li');
        li.className ="collection-items";
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className ="delete-item secondary-content";

        link.innerHTML = '<i class="fa fa-remove"></i>' ;
        li.appendChild(link);

        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        //clear input
    taskInput.value = '';

    e.preventDefault();
}

function storeTaskInLocalStorage(task){
     let tasks;
     if (localStorage.getItem('tasks')== null){
         tasks = [];
     }
     else
     {
         tasks= JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks',JSON.stringify(tasks));
}

function remove(e){
     if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure')){
            e.target.parentElement.parentElement.remove();
        }
     }
        //remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
     e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')== null){
        tasks = [];
    }
    else
    {
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
           if(taskItem.textContent==task){
               tasks.splice(index,1);
           }

           localStorage.setItem('tasks',JSON.stringify(tasks));
        }


    );

}

function clear() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
     localStorage.clear();
}

    function filterTasks(e) {
        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-items').forEach
        (function (task) {
                const item = task.firstChild.textContent;
                if (item.toLowerCase().indexOf(text)) {
                    task.style.display = 'block';
                }
                else {
                task.style.display = 'none';
                }


            }
        );

    }
