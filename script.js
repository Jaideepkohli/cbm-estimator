document.getElementById('calculate').addEventListener('click', function () {
    let totalCBM = 0;
    document.querySelectorAll('#inputTable tbody tr').forEach(row => {
        let unit = row.querySelector('.unit').value;
        let cartons = parseFloat(row.querySelector('.cartons').value) || 0;
        let length = parseFloat(row.querySelector('.length').value) || 0;
        let width = parseFloat(row.querySelector('.width').value) || 0;
        let height = parseFloat(row.querySelector('.height').value) || 0;
        
        if (unit === 'inches') {
            length *= 2.54;
            width *= 2.54;
            height *= 2.54;
        }
        
        let cbm = (length * width * height * cartons) / 1000000;
        totalCBM += cbm;
    });
    
    totalCBM = totalCBM < 2 ? 2 : totalCBM;
    document.getElementById('totalCBM').textContent = totalCBM.toFixed(2);
    
    let rate;
    if (totalCBM <= 5) {
        rate = 189;
    } else if (totalCBM <= 10) {
        rate = 159;
    } else if (totalCBM <= 15) {
        rate = 119;
    } else if (totalCBM <= 25) {
        rate = 109;
    } else {
        rate = 89;
    }
    
    let shippingCost = totalCBM * rate;
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('breakdownCBM').textContent = totalCBM.toFixed(2);
    document.getElementById('breakdownRate').textContent = `$${rate}`;
    document.getElementById('breakdownTotal').textContent = `$${shippingCost.toFixed(2)}`;
});

document.getElementById('addRow').addEventListener('click', function () {
    let newRow = document.querySelector('#inputTable tbody tr').cloneNode(true);
    newRow.querySelectorAll('input').forEach(input => input.value = '');
    document.querySelector('#inputTable tbody').appendChild(newRow);
});
