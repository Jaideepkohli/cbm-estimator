document.getElementById('calculate').addEventListener('click', function () {
    let totalCBM = 0;
    
    document.querySelectorAll('#inputTable tbody tr').forEach(row => {
        let unit = row.querySelector('.unit').value;
        let cartons = parseFloat(row.querySelector('.cartons').value) || 0;
        let length = parseFloat(row.querySelector('.length').value) || 0;
        let width = parseFloat(row.querySelector('.width').value) || 0;
        let height = parseFloat(row.querySelector('.height').value) || 0;

        // Convert inches to cm if selected
        if (unit === 'inches') {
            length *= 2.54;
            width *= 2.54;
            height *= 2.54;
        }

        let cbm = (length * width * height * cartons) / 1000000;
        totalCBM += cbm;
    });

    // Ensure minimum CBM is 2
    totalCBM = totalCBM < 2 ? 2 : totalCBM;

    // **Fix: Update Considered CBM in the UI**
    let cbmElement = document.getElementById('breakdownCBM');
    if (cbmElement) {
        cbmElement.textContent = totalCBM.toFixed(2); // Rounds to 2 decimal places
    } else {
        console.error("Element with ID 'breakdownCBM' not found.");
    }

    // Shipping cost calculation
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
    let clearanceCost = parseFloat(document.getElementById('invoiceValue').value) || 0;
    let totalCost = shippingCost + pickupCost + clearanceCost;

    // **Fix: Ensure values are rounded and formatted**
    document.getElementById("breakdownPickup").textContent = `$${Math.ceil(pickupCost)}`;
    document.getElementById("breakdownShipping").textContent = `$${Math.ceil(shippingCost)}`;
    document.getElementById("breakdownClearance").textContent = `$${Math.ceil(clearanceCost)}`;
    document.getElementById("breakdownTotal").textContent = `$${Math.ceil(totalCost)}`;
});
