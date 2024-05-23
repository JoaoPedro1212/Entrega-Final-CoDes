document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.querySelector('.time');
    const coinsElement = document.querySelector('.coins');

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    function updateCoins() {
        let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial
        coinsElement.textContent = `$${currentCoins.toFixed(2).replace('.', ',')}`;
    }

    // Inicializa o horário e o valor de dinheiro
    updateTime();
    updateCoins();

    // Atualiza o horário a cada segundo
    setInterval(updateTime, 1000);
});
