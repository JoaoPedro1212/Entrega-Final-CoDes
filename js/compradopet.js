document.addEventListener('DOMContentLoaded', function() {
    const coinsElement = document.querySelector('.coins');
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || {};

    function updateCoins() {
        let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial
        coinsElement.textContent = `$${currentCoins.toFixed(2).replace('.', ',')}`;
    }

    // 
    updateCoins();

    window.confirmPurchase = function(itemName, itemPrice, isFood = false) {
        document.getElementById('modal-text').innerText = `Você deseja comprar ${itemName} por ${itemPrice}?`;
        document.getElementById('purchase-modal').style.display = 'block';

        
        document.getElementById('confirm-button').onclick = null;
        document.getElementById('confirm-button').onclick = function() {
            const price = parseFloat(itemPrice.replace(',', '.').replace('$', ''));
            let currentCoins = parseFloat(localStorage.getItem('coins') || '27.35'); // Valor inicial

            if (currentCoins >= price) {
                currentCoins -= price;
                localStorage.setItem('coins', currentCoins.toFixed(2));
                updateCoins();

                if (!isFood) {
                    if (!purchasedItems[itemName]) {
                        purchasedItems[itemName] = 1;
                        document.querySelector(`[onclick="confirmPurchase('${itemName}', '${itemPrice}', ${isFood})"]`).style.display = 'none';
                    }
                } else {
                    purchasedItems[itemName] = (purchasedItems[itemName] || 0) + 1;
                }

                localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
                window.location.href = 'comprarealizada.html';
            } else {
                alert('Dinheiro insuficiente!');
                closeModal();
            }
        };
    };

    window.closeModal = function() {
        document.getElementById('purchase-modal').style.display = 'none';
    };

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
