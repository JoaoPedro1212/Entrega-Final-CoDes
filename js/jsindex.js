document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.progress');
    const timeElement = document.querySelector('.time');
    const coinsElement = document.querySelector('.coins');

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

    // Inicializa o horário e o valor de dinheiro
    updateTime();
    updateCoins();

    // Atualiza o horário a cada segundo
    setInterval(updateTime, 1000);

    // Lógica para remover tarefas e atualizar a barra de progresso e o valor de dinheiro
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', function() {
            const taskPercentage = parseInt(task.getAttribute('data-percentage'));
            let currentProgress = parseInt(progressBar.style.width);
            progressBar.style.width = (currentProgress + taskPercentage) + '%';
            updateCoins(taskPercentage);
            task.remove();
        });
    });
});
