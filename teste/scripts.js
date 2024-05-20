// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const feedPetButton = document.getElementById('feedPetButton');
    const hungerSpan = document.getElementById('hunger');
    const petImage = document.getElementById('petImage');

    let hunger = 0;
    const tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Concluir';
            removeButton.onclick = () => {
                tasks.splice(index, 1);
                renderTasks();
                addMoney(10);
            };
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    function addMoney(amount) {
        hunger -= amount / 10;
        if (hunger < 0) hunger = 0;
        updateHunger();
    }

    function updateHunger() {
        hungerSpan.textContent = hunger;
        if (hunger > 5) {
            petImage.src = 'sad-pet.png';
        } else {
            petImage.src = 'happy-pet.png';
        }
    }

    addTaskButton.onclick = () => {
        const task = taskInput.value;
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            renderTasks();
        }
    };

    feedPetButton.onclick = () => {
        hunger -= 2;
        if (hunger < 0) hunger = 0;
        updateHunger();
    };

    // Simulate pet getting hungry over time
    setInterval(() => {
        hunger += 1;
        updateHunger();
    }, 60000); // Hunger increases every minute

    renderTasks();
});
