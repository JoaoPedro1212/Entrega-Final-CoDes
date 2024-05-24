document.addEventListener('DOMContentLoaded', function() {
    function loadPurchasedItems() {
        const customContainer = document.querySelector('.custom-container');
        if (!customContainer) return;

        const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || {};
        customContainer.innerHTML = '';

        Object.keys(purchasedItems).forEach(item => {
            
            if (item === 'roupas 1') return;

            const customItem = document.createElement('div');
            customItem.className = 'custom-item';

            const itemType = item.includes('comida') ? 'comida' : 'roupas';
            const buttonText = itemType === 'comida' ? 'Comer' : 'Usar';
            const buttonAction = itemType === 'comida' ? `eatItem('${item}')` : `equipItem('${item}')`;

            customItem.innerHTML = `
                <img src="assets/polvo/${itemType}/${item}.png" alt="${item}">
                <p>${item} (${purchasedItems[item]})</p>
                <button onclick="${buttonAction}">${buttonText}</button>
            `;

            customContainer.appendChild(customItem);
        });
    }

    window.equipItem = function(item) {
        const petContainer = document.querySelector('.pet-container');
        if (petContainer) {
            const equippedItem = document.createElement('img');
            equippedItem.src = `assets/polvo/roupas/${item}.png`;
            equippedItem.className = 'equipped-item';
            petContainer.innerHTML = ''; // Limpa qualquer roupa anterior
            petContainer.appendChild(equippedItem);
        }
    };

    window.eatItem = function(item) {
        let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || {};
        if (purchasedItems[item] > 0) {
            purchasedItems[item]--;
            if (purchasedItems[item] === 0) {
                delete purchasedItems[item];
            }
            localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
            loadPurchasedItems();
        }
    };

    loadPurchasedItems();
});
