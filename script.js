document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded successfully!");

    const calculateBtn = document.getElementById('calculate');
    if (!calculateBtn) {
        console.error("Calculate button not found!");
        return;
    }

    calculateBtn.addEventListener('click', function () {
        console.log("Calculate button clicked!");

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

        let totalCBMElement = document.getElementById('totalCBM');
        if (totalCBMElement) {
            totalCBMElement.textContent = totalCBM.toFixed(2);
        } else {
            console.error("totalCBM element not found!");
        }

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
        let pickupCost = parseFloat(document.getElementById('pickupPrice').value) || 0;
        let clearanceCost = Number(document.getElementById('invoiceValue').value);
        let totalCost = shippingCost + pickupCost + clearanceCost;

        let shippingCostElement = document.getElementById('shippingCost');
        if (shippingCostElement) {
            shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
        } else {
            console.error("shippingCost element not found!");
        }

        document.getElementById('breakdownCBM').textContent = totalCBM.toFixed(2);
        document.getElementById('breakdownPickup').textContent = `$${pickupCost.toFixed(2)}`;
        document.getElementById('breakdownShipping').textContent = `$${shippingCost.toFixed(2)}`;
        document.getElementById('breakdownClearance').textContent = `$${clearanceCost.toFixed(2)}`;
        document.getElementById('breakdownTotal').textContent = `$${totalCost.toFixed(2)}`;
    });

    document.getElementById('addRow').addEventListener('click', function () {
        let newRow = document.querySelector('#inputTable tbody tr').cloneNode(true);
        newRow.querySelectorAll('input').forEach(input => input.value = '');
        newRow.querySelector('.unit').value = "cms"; // Reset unit selection
        document.querySelector('#inputTable tbody').appendChild(newRow);
    });
});
