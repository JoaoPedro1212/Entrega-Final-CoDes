document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.progress');
    const progressPercentage = document.querySelector('.percentage');
    const timeElement = document.querySelector('.time');
    const coinsElement = document.querySelector('.coins');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const popupDetails = document.querySelector('.popup-details');
    const completeTaskBtn = document.getElementById('complete-task-btn');

    let currentTask = null;

    // Atualiza o horário na página
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    // Atualiza o valor de dinheiro na página
    function updateCoins(taskPercentage = 0) {
        let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial
        currentCoins += taskPercentage;
        localStorage.setItem('coins', currentCoins);
        coinsElement.textContent = `$${currentCoins.toFixed(2).replace('.', ',')}`;
    }

    // Atualiza a barra de progresso e a porcentagem
    function updateProgressBar(taskPercentage = 0) {
        let currentProgress = parseInt(progressBar.style.width);
        let newProgress = currentProgress + taskPercentage;
        progressBar.style.width = newProgress + '%';
        progressPercentage.textContent = newProgress + '%';
    }

    // Inicializa o horário e o valor de dinheiro
    updateTime();
    updateCoins();
    updateProgressBar(0); // Inicializa a barra de progresso com 0%

    // Atualiza o horário a cada segundo
    setInterval(updateTime, 1000);

    // Lógica para abrir o pop-up com os detalhes da tarefa
    function initializeTaskEvent(task) {
        task.addEventListener('click', function() {
            currentTask = task;
            const taskDetails = task.getAttribute('data-details');
            popupDetails.textContent = taskDetails;
            popup.style.display = 'block';
        });
    }

    // Fechar o pop-up ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Fechar o pop-up ao clicar fora do conteúdo
    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    // Concluir a tarefa e atualizar progresso
    completeTaskBtn.addEventListener('click', function() {
        if (currentTask) {
            const taskPercentage = parseInt(currentTask.getAttribute('data-percentage'));
            updateProgressBar(taskPercentage);
            updateCoins(taskPercentage);
            currentTask.remove();
            popup.style.display = 'none';
        }
    });

    // Inicializa eventos para tarefas existentes
    const tasks = document.querySelectorAll('.task-button');
    tasks.forEach(task => {
        initializeTaskEvent(task);
    });
});
