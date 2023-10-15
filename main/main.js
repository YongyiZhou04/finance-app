// Store the currently selected account type
let selectedAccountType = "Bank";

//clicking through tabs
document.getElementById("bank").addEventListener("click", () => {
    selectedAccountType = "Bank";
});

document.getElementById("salary").addEventListener("click", () => {
    selectedAccountType = "Salary";
});

document.getElementById("life").addEventListener("click", () => {
    selectedAccountType = "Life";
});

document.getElementById("others").addEventListener("click", () => {
    selectedAccountType = "Others";
});

// Function to add a transaction
function addTransaction() {
    // Get the input values
    const date = document.getElementById(`date${selectedAccountType}`).value;
    const description = document.getElementById(`des${selectedAccountType}`).value;
    const transfer = document.getElementById(`transfer${selectedAccountType}`).value;
    const receive = parseFloat(document.getElementById(`receive${selectedAccountType}`).value);
    const spend = parseFloat(document.getElementById(`spend${selectedAccountType}`).value);

    // Check if required fields are filled
    if (date && description && transfer && (!isNaN(receive) || !isNaN(spend))) {
        // Create a new row in the table
        const transactionList = document.getElementById(`transactionList${selectedAccountType}`);
        const newRow = transactionList.insertRow(-1);

        // Add data to the new row
        const dateCell = newRow.insertCell(0);
        dateCell.textContent = date;
        if (transactionList.rows.length % 2 === 1) {
            dateCell.style.backgroundColor = "#CCE0DC";
        }

        const descriptionCell = newRow.insertCell(1);
        descriptionCell.textContent = description;
        if (transactionList.rows.length % 2 === 1) {
            descriptionCell.style.backgroundColor = "#CCE0DC";
        }

        const transferCell = newRow.insertCell(2);
        transferCell.textContent = transfer;
        if (transactionList.rows.length % 2 === 1) {
            transferCell.style.backgroundColor = "#CCE0DC";
        }

        const receiveCell = newRow.insertCell(3);
        var newRec = 0.0;
        if (!(isNaN(receive))) {
            newRec = receive;
        }
        receiveCell.textContent = newRec.toFixed(2);
        if (transactionList.rows.length % 2 === 1) {
            receiveCell.style.backgroundColor = "#CCE0DC";
        }

        var newSpend = 0.0;
        const spendCell = newRow.insertCell(4);
        if (!(isNaN(spend))) {
            newSpend = spend;
        }
        spendCell.textContent = newSpend.toFixed(2);
        if (transactionList.rows.length % 2 === 1) {
            spendCell.style.backgroundColor = "#CCE0DC";
        }

        // Calculate and update the new balance
        const balanceAmount = document.getElementById("balanceAmount");
        const currentBalance = parseFloat(balanceAmount.textContent.replace("$", ""));
        const newBalance = currentBalance + newRec - newSpend;
        balanceAmount.textContent = `$${newBalance.toFixed(2)}`;

        const balanceCell = newRow.insertCell(5);
        balanceCell.textContent = newBalance.toFixed(2);
        if (transactionList.rows.length % 2 === 1) {
            balanceCell.style.backgroundColor = "#CCE0DC";
        }

        // Clear the input fields
        clearInputFields();

        // // Sort the table by date after adding a new transaction
        // sortTableByDate();
    } else {
        alert("Please fill in all required fields with valid values. Required fields include Date, Description, Transfer, and either receive or spend.");
    }
}

// Event listener for clicking the "addTransaction" button
document.getElementById("addTransaction").addEventListener("click", addTransaction);

// Event listeners for Enter key press in input fields
document.getElementById("date").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});
document.getElementById("description").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});
document.getElementById("category").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});
document.getElementById("amountReceive").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});
document.getElementById("amountSpend").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});

// Function to clear input fields
function clearInputFields() {
    document.getElementById("date").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    document.getElementById("amountReceive").value = "";
    document.getElementById("amountSpend").value = "";
    document.getElementById("balance").value = "";
}