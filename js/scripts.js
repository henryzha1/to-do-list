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

function updateStrike(task) {
    if(task.crossed) {
        task.crossed = false;
    } else {
        task.crossed = true;
    }
}

function displayList(list) {
    if(document.querySelector("ol")) {
        document.querySelector("ol").remove();
    }
    const ol = document.createElement("ol");
    document.querySelector("form#add").after(ol);
    Object.keys(list.tasks).forEach(function(key) {
        let li = document.createElement("li");
        li.append(list.tasks[key].name);
        li.setAttribute("id", list.tasks[key].id);
        li.addEventListener("click", function() {
            updateStrike(list.tasks[key]);
            if(list.tasks[key].crossed) {
                li.style.textDecoration = "line-through";
            } else {
                li.removeAttribute("style");
            }
        });
        if(list.tasks[key].crossed) {
            li.style.textDecoration = "line-through";
        }

        document.querySelector("ol").append(li);
    });
}

window.addEventListener("load", function() {
    let list = new ToDoList();
    document.querySelector("form#add").addEventListener("submit", function(e) {
        e.preventDefault();

        const input = document.querySelector("#input").value;
        let task = new Task(input);
        list.addTask(task);

        displayList(list);
    });

    document.querySelector("form#delete").addEventListener(("submit"), function(e) {
        e.preventDefault();
        const input = parseInt(document.querySelector("#id").value);
        list.deleteTask(input);
        displayList(list);
    });


});