document.addEventListener('DOMContentLoaded', function() {
    const coinsElement = document.querySelector('.coins');

    function updateCoins() {
        let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial
        coinsElement.textContent = `$${currentCoins.toFixed(2).replace('.', ',')}`;
    }

    // Inicializa o valor de dinheiro
    updateCoins();

    // Adiciona evento de clique aos itens da loja
    const shopItems = document.querySelectorAll('.shop-item');
    shopItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemPrice = parseFloat(item.getAttribute('data-price'));
            let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial

            if (currentCoins >= itemPrice) {
                currentCoins -= itemPrice;
                localStorage.setItem('coins', currentCoins);
                updateCoins();
                window.location.href = 'comprarealizada.html'; // Redireciona para a página de compra realizada
            } else {
                alert('Dinheiro insuficiente!');
            }
        });
    });
});
