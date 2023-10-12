document.getElementById("addTransaction").addEventListener("click", () => {
    // Get the input values
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const transfer = document.getElementById("category").value;
    const receive = parseFloat(document.getElementById("amountReceive").value);
    const spend = parseFloat(document.getElementById("amountSpend").value);

    // Check if required fields are filled
    if (date && description && transfer && (!isNaN(receive) || !isNaN(spend)) ) {
        // Create a new row in the table
        const transactionList = document.getElementById("transactionList");
        const newRow = transactionList.insertRow(-1);

        // Add data to the new row
        const dateCell = newRow.insertCell(0);
        dateCell.textContent = date;

        const descriptionCell = newRow.insertCell(1);
        descriptionCell.textContent = description;

        const transferCell = newRow.insertCell(2);
        transferCell.textContent = transfer;

        const receiveCell = newRow.insertCell(3);
        if(!(isNaN(receive))){
            receiveCell.textContent = receive;
        }
        else{
            receiveCell.textContent = 0;
        }

        const spendCell = newRow.insertCell(4);
        if(!(isNaN(spend))){
            spendCell.textContent = spend;
        }
        else{
            spendCell.textContent = 0;
        }
        

        // Calculate and update the new balance
        const balanceAmount = document.getElementById("balanceAmount");
        const currentBalance = parseFloat(balanceAmount.textContent.replace("$", ""));
        const newBalance = currentBalance + receive - spend;
        balanceAmount.textContent = `$${newBalance.toFixed(2)}`;

        const balanceCell = newRow.insertCell(5);
        balanceCell.textContent = newBalance;

        // Clear the input fields
        clearInputFields();
    } else {
        alert("Please fill in all required fields with valid values. Required fields include Date, Description, Transfer, and either receive or spend.");
    }
});

function clearInputFields() {
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("amountReceive").value = "";
    document.getElementById("amountSpend").value = "";
    document.getElementById("balance").value = "";
}
