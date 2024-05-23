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

    // codigo pra atualizar a barrinha
    function updateProgressBar(taskPercentage = 0) {
        let currentProgress = parseInt(progressBar.style.width);
        let newProgress = currentProgress + taskPercentage;
        progressBar.style.width = newProgress + '%';
        progressPercentage.textContent = newProgress + '%';
    }


    updateProgressBar(0); 


    // codigo do popup
    function initializeTaskEvent(task) {
        task.addEventListener('click', function() {
            currentTask = task;
            const taskDetails = task.getAttribute('data-details');
            popupDetails.textContent = taskDetails;
            popup.style.display = 'block';
        });
    }

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });


    completeTaskBtn.addEventListener('click', function() {
        if (currentTask) {
            const taskPercentage = parseInt(currentTask.getAttribute('data-percentage'));
            updateProgressBar(taskPercentage);
            updateCoins(taskPercentage);
            currentTask.remove();
            popup.style.display = 'none';
        }
    });

    const tasks = document.querySelectorAll('.task-button');
    tasks.forEach(task => {
        initializeTaskEvent(task);
    });
});
