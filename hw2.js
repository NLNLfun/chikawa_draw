function generateCard(cardId, bitPosition) {
    const cardElement = document.getElementById(cardId);
    const table = document.createElement('table');
    let count = 0;

    for (let i = 1; i <= 63; i++) {
        let number = i;
        let position = 1;  
        let bit = 0;

        while (number > 0) {
            bit = number % 2;  
            number = Math.floor(number / 2);  

            // 目標位數 (bitPosition) 
            if (position === bitPosition && bit === 1) {
                if (count % 8 === 0) {  
                    var row = document.createElement('tr');
                    table.appendChild(row);
                }
                const cell = document.createElement('td');
                cell.textContent = i;
                row.appendChild(cell);
                count++;
                break;  
            }
            position++;  
        }
    }
    
    cardElement.appendChild(table);
}

window.onload = () => {
    const bitPositions = [1, 2, 3, 4, 5, 6];

    for (let i = 0; i < bitPositions.length; i++) {
        generateCard(`card${i + 1}`, bitPositions[i]);
    }
};
