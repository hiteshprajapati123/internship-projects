const input = document.querySelector("input");
const addButton = document.querySelector(".add-Button");
const emptyImage = document.querySelector(".empty-image");
const todosHtml= document.querySelector(".todos");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filter = document.querySelector(".filter");
let filter = '';

showTodos();

function getTodoHtml(todo, index) {
    if(filter && filter != todo.status){
        return'';
    }
    let checked = todo.status == "completed" ? "checked" : "";
    return /* html */ `
    <li class="todo">
        <label for="${index}">
            <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>  
                <span class="${checked}">${todo.name}</span>
        </label>
        <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-time"></i></button>
    </li>
    `;
}

function showTodos() {
    if (todosJson.length == 0) {
        todosHtml.innerHTML = '';
        emptyImage.style.display = 'block' ;
    }
    else {
        todosHtml.innerHTML = todosJson.map(getTodoHtml).join('') ;
        emptyImage.style.display ='none' ;
    }
}

function addTodo(todo) {
    input.value = "";
    todosJson.unshift({  name: todo, status:"pending" });
    localStorage.setItem("todos" , JSON.stringify(todosJson));
    showtodos();
}

input.addEventListener("keyup", e => {
    let todo = input.value.trim();
    if(!todo || e.key != "Enter") {
        return;
    }
    addTodo(todo);
});


addButton.addEventListener("click", ()=>{
    let todo = input.value.trim();
    if(!todo) {
        return;
    }
    addTodo(todo);
});

function updateStatus(todo) {
    let todoName = todo.parentElement.lastElement;
    if(todo.checked){
        todoName.classList.add("checked");
        todosJson[todo.id].status = "completed";
    }else{
        todoName.classList.remove("checked");
        todosJson[todo.id].status = "pending";
    }
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
    const index = todo.dataset.index;
    todosJson.splice(index, 1);
    showTodos();
    localStorage.setItem("Todos", JSON.stringify(todosJson));

}

filter.forEach(function (el) {
    el.addEventListener("click", (e) => {
        if(el.classList.contains('active')){
            el.classList.remove('active');
        }else{
            filter.forEach(tag=> tag.classList.remove('active'));
            el.classList.add('active');
            filter = e.target.dataset.filter;
        }
        showTodos();
    });
});

deleteAllButton.addEventListener("click", () => {
    todosJson= [];
    localStorage.setItem("todos", JSON.stringify(todosJson));
    showTodos();
});