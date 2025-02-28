document.getElementById("calculate").addEventListener("click", function () {
    let totalCBM = 0;

    // Get all rows in the input table
    let rows = document.querySelectorAll("#inputTable tbody tr");

    // Iterate through each row to calculate CBM
    rows.forEach(row => {
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

        // Calculate CBM for the current row
        let cbm = (length * width * height * cartons) / 1000000;
        totalCBM += cbm;
    });

    // Ensure minimum CBM is 2
    let consideredCBM = totalCBM < 2 ? 2 : totalCBM;

    // Update Considered CBM in the UI
    let cbmElement = document.getElementById('breakdownCBM');
    if (cbmElement) {
        cbmElement.textContent = consideredCBM.toFixed(2); // Rounds to 2 decimal places
    } else {
        console.error("Element with ID 'breakdownCBM' not found.");
    }

    // Shipping rate calculation
    let rate;
    if (consideredCBM <= 5) {
        rate = 189;
    } else if (consideredCBM <= 10) {
        rate = 159;
    } else if (consideredCBM <= 15) {
        rate = 119;
    } else if (consideredCBM <= 25) {
        rate = 109;
    } else {
        rate = 89;
    }

    // Calculate shipping cost
    let shippingCost = consideredCBM * rate;

    // Get pickup and clearance costs
    let pickupCost = parseFloat(document.getElementById('pickupPrice').value) || 0;
    let clearanceCost = parseFloat(document.getElementById('invoiceValue').value) || 0;

    // Update the notes for Import and Export Clearance Cost based on the selected invoice value
    let invoiceValueElement = document.getElementById('invoiceValue');
    let invoiceNoteElement = document.getElementById('invoiceNote');
    if (invoiceValueElement && invoiceNoteElement) {
        let selectedOption = invoiceValueElement.options[invoiceValueElement.selectedIndex].text;
        invoiceNoteElement.textContent = selectedOption; // Set the note to the selected option text
    }

    // Calculate total cost
    let totalCost = shippingCost + pickupCost + clearanceCost;

    // Round costs to two decimal places
    document.getElementById("breakdownPickup").textContent = `$${pickupCost.toFixed(2)}`;
    document.getElementById("breakdownShipping").textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById("breakdownClearance").textContent = `$${clearanceCost.toFixed(2)}`;
    document.getElementById("breakdownTotal").textContent = `$${totalCost.toFixed(2)}`;
});

document.getElementById("addRow").addEventListener("click", function () {
    let table = document.getElementById("inputTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td><select class="unit" title="Select unit"><option value="cms">cms</option><option value="inches">inches</option></select></td>
        <td><input type="number" class="cartons" min="1" value="1" placeholder="Enter units" title="Enter units"></td>
        <td><input type="number" class="length" step="0.1" required placeholder="Enter length" title="Enter length"></td>
        <td><input type="number" class="width" step="0.1" required placeholder="Enter width" title="Enter width"></td>
        <td><input type="number" class="height" step="0.1" required placeholder="Enter height" title="Enter height"></td>
    `;
});

function copyBreakdown() {
    let breakdownText = document.getElementById("breakdownTable").innerText;
    navigator.clipboard.writeText(breakdownText).then(() => {
        alert("Breakdown copied!");
    });
}
