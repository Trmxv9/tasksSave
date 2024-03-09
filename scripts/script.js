document.addEventListener("DOMContentLoaded", () => {
    const task = document.getElementById("youtask");
    const saveTask = document.getElementById("saveTask");
    const tasks = document.getElementById("tasks");
    const deleteAll = document.getElementById("deleteAll");
    const title = document.getElementById("title");

    if (localStorage.getItem("tasks")) {
        title.classList.remove("hidden");
    }

    function scrollToBottom() {
        tasks.scrollTop = tasks.scrollHeight;
    }

    const updateTasks = () => {
        const takas = localStorage.getItem("tasks");


        if (takas) {
            tasks.innerHTML = takas;
            deleteAll.classList.remove("hidden");
            const checkTask = tasks.querySelectorAll(".fa-badge-check");
            const removeTask = tasks.querySelectorAll(".fa-eraser");
            title.classList.remove("hidden");

            checkTask.forEach((icon, index) => {
                icon.addEventListener("click", () => {
                    const taskText = icon.parentElement.querySelector("p");
                    taskText.classList.toggle("line-through");
                    localStorage.setItem("tasks", tasks.innerHTML);
                });
            });

            removeTask.forEach((icon, index) => {
                icon.addEventListener("click", () => {
                    const taskElement = icon.parentElement;
                    tasks.removeChild(taskElement);
                    localStorage.setItem("tasks", tasks.innerHTML);

                    if (tasks.innerHTML == "") {
                        localStorage.removeItem("tasks");
                        deleteAll.classList.add("hidden");
                        title.classList.add("hidden");
                    }
                });
            });
        }

    };

    updateTasks();

    saveTask.addEventListener("click", () => {
        const taskValue = task.value;

        if (taskValue) {
            const taskElement = document.createElement("div");
            taskElement.classList.add("flex", "gap-3", "items-center");

            const taskText = document.createElement("p");
            taskText.classList.add(
                "text-gray-300",
                "text-opcity-30",
                "text-lg"
            );
            taskText.innerText = taskValue;

            taskElement.appendChild(taskText);

            const checkTaskIcon = document.createElement("i");
            checkTaskIcon.classList.add(
                "fa-solid",
                "fa-badge-check",
                "text-sky-500",
                "text-[20px]",
                "hover:animate-pulse"
            );

            taskElement.appendChild(checkTaskIcon);

            const removeTaskIcon = document.createElement("i");
            removeTaskIcon.classList.add(
                "fa-regular",
                "fa-eraser",
                "text-red-600",
                "text-[20px]",
                "hover:animate-pulse"
            );

            taskElement.appendChild(removeTaskIcon);

            tasks.appendChild(taskElement);

            task.value = "";

            localStorage.setItem("tasks", tasks.innerHTML);
        }

        updateTasks();
    });

    task.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            saveTask.click();
            scrollToBottom();
        }
    });

    deleteAll.addEventListener("click", () => {
        deleteAll.classList.add("hidden");
        title.classList.add("hidden");
        tasks.innerHTML = "";
        localStorage.removeItem("tasks");
        updateTasks();

    })

});