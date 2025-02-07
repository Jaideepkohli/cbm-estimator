document.getElementById('addRow').addEventListener('click', function () {
    const table = document.getElementById('inputTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    cell1.innerHTML = `
        <select class="unit">
            <option value="cms">cms</option>
            <option value="inches">inches</option>
        </select>
    `;
    cell2.innerHTML = `<input type="number" class="cartons" min="1" value="1">`;
    cell3.innerHTML = `<input type="number" class="length" step="0.1" required>`;
    cell4.innerHTML = `<input type="number" class="width" step="0.1" required>`;
    cell5.innerHTML = `<input type="number" class="height" step="0.1" required>`;
});

document.getElementById('calculate').addEventListener('click', function () {
    const rows = document.querySelectorAll('#inputTable tbody tr');
    let totalCBM = 0;

    rows.forEach(row => {
        const unit = row.querySelector('.unit').value;
        const cartons = parseFloat(row.querySelector('.cartons').value);
        const length = parseFloat(row.querySelector('.length').value);
        const width = parseFloat(row.querySelector('.width').value);
        const height = parseFloat(row.querySelector('.height').value);

        if (isNaN(cartons) || isNaN(length) || isNaN(width) || isNaN(height)) {
            alert('Please fill in all fields for all rows.');
            return;
        }

        // Convert dimensions to inches if the unit is "cms"
        const conversionFactor = (unit === 'cms') ? 0.393701 : 1;
        const lengthInches = length * conversionFactor;
        const widthInches = width * conversionFactor;
        const heightInches = height * conversionFactor;

        // Calculate CBM for the row
        const cbm = (lengthInches * widthInches * heightInches) / 61024;
        totalCBM += cbm * cartons;
    });

    document.getElementById('totalCBM').textContent = totalCBM.toFixed(2);
});