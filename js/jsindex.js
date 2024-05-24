document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.progress');
    const timeElement = document.querySelector('.time');
    const coinsElement = document.querySelector('.coins');

    
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    
    function updateCoins(taskPercentage = 0) {
        let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); 
        currentCoins += taskPercentage;
        localStorage.setItem('coins', currentCoins);
        coinsElement.textContent = `$${currentCoins.toFixed(2).replace('.', ',')}`;
    }

    
    updateTime();
    updateCoins();

    
    setInterval(updateTime, 1000);

    
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
