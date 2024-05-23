document.addEventListener('DOMContentLoaded', function() {
    const coinsElement = document.querySelector('.coins');

    function updateCoins() {
        let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial
        coinsElement.textContent = `$${currentCoins.toFixed(2).replace('.', ',')}`;
    }

    // Inicializa o valor de dinheiro
    updateCoins();

    // Função para abrir o modal de confirmação
    window.confirmPurchase = function(itemName, itemPrice) {
        document.getElementById('modal-text').innerText = `Você deseja comprar ${itemName} por ${itemPrice}?`;
        document.getElementById('purchase-modal').style.display = 'block';

        document.getElementById('confirm-button').onclick = function() {
            const price = parseFloat(itemPrice.replace(',', '.').replace('$', ''));
            let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial

            if (currentCoins >= price) {
                currentCoins -= price;
                localStorage.setItem('coins', currentCoins);
                updateCoins();
                window.location.href = 'comprarealizada.html'; // Redireciona para a página de compra realizada
            } else {
                alert('Dinheiro insuficiente!');
                closeModal();
            }
        };
    };

    // Função para fechar o modal
    window.closeModal = function() {
        document.getElementById('purchase-modal').style.display = 'none';
    };

    // Fecha o modal se o usuário clicar fora dele
    window.onclick = function(event) {
        var modal = document.getElementById('purchase-modal');
        if (event.target == modal) {
            closeModal();
        }
    };
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
