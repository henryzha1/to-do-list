function ToDoList() {
    this.tasks = {};
    this.currentId = 0;
}

ToDoList.prototype.addTask = function(task) {
    task.id = this.assignId();
    this.tasks[task.id] = task;
};

ToDoList.prototype.deleteTask = function(input) {
    if(input && input <= this.currentId) {
        delete this.tasks[input];
        for(let i = input + 1; i <= this.currentId; i++) {
            this.tasks[i].id -= 1;
            this.tasks[i - 1] = this.tasks[i];
            delete this.tasks[i];
        }
        this.currentId -= 1;
    }
}

ToDoList.prototype.assignId = function() {
    this.currentId += 1;
    return this.currentId;
}

function Task(name) {
    this.name = name;
    this.crossed = false;
}

function updateStrike(task, li) {
    if(task.crossed) {
        task.crossed = false;
        li.removeAttribute("style");
    } else {
        task.crossed = true;
        li.style.textDecoration = "line-through";
    }
    return li;
}

function updateList(task, option, currentId = 0) {
    if(option) {
        let li = document.createElement("li");
        const ol = document.querySelector("ol");
        li.append(task.name);
        li.setAttribute("id", task.id);
        li.addEventListener("click", function() {
            li = updateStrike(task, li);
        });
        ol.append(li);
    } else {
        document.getElementById(task.id).remove();
        for(let i = task.id + 1; i <= currentId; i++) {
            document.getElementById(i).id = i - 1;
        }
    }
}

window.addEventListener("load", function() {
    let list = new ToDoList();
    document.querySelector("form#add").addEventListener("submit", function(e) {
        e.preventDefault();

        const input = document.querySelector("#input").value;
        let task = new Task(input);
        list.addTask(task);

        updateList(task, 1);
    });

    document.querySelector("form#delete").addEventListener(("submit"), function(e) {
        e.preventDefault();

        const input = parseInt(document.querySelector("#id").value);
        const task = list.tasks[input];
        const id = list.currentId;
        list.deleteTask(input);
        
        updateList(task, 0, id);
    });


});