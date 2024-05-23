document.addEventListener('DOMContentLoaded', function () {
    const tasks = document.querySelectorAll('.task');
    const progressBar = document.querySelector('.progress');
    let currentProgress = parseInt(progressBar.style.width, 10);

    tasks.forEach(task => {
        task.addEventListener('click', function () {
            if (!task.classList.contains('completed')) {
                task.classList.add('completed');
                const taskPercentage = parseInt(task.getAttribute('data-percentage'), 10);
                currentProgress += taskPercentage;
                if (currentProgress > 100) currentProgress = 100;
                progressBar.style.width = currentProgress + '%';
            }
        });
    });
});
