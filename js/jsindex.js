document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.progress');
    const timeElement = document.querySelector('.time');
    const coinsElement = document.querySelector('.coins');



    // Lógica para remover tarefas e atualizar a barra de progresso e o valor de dinheiro
    function initializeTaskEvent(task) {
        task.addEventListener('click', function() {
            const taskPercentage = parseInt(task.getAttribute('data-percentage'));
            let currentProgress = parseInt(progressBar.style.width);
            progressBar.style.width = (currentProgress + taskPercentage) + '%';
            updateCoins(taskPercentage);
            task.remove();
        });
    }

    // Inicializa eventos para tarefas existentes
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        initializeTaskEvent(task);
    });

    // Inicializa eventos para novas tarefas adicionadas do localStorage
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tasksContainer = document.getElementById('tasks-container');

    tarefas.forEach(tarefa => {
        const taskElement = document.createElement('section');
        taskElement.classList.add('task');
        taskElement.setAttribute('data-percentage', '10'); // Ajuste conforme necessário

        taskElement.innerHTML = `
            <span class="percentage">10%</span> <!-- Ajuste conforme necessário -->
            <span class="task-name">${tarefa.titulo}</span>
            <span class="task-check">✔️</span>
        `;

        tasksContainer.appendChild(taskElement);
        initializeTaskEvent(taskElement);
    });
});
