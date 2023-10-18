const categoryBalances = {
    "Bank": 0,
    "Salary": 0,
    "Life": 0,
    "Others": 0,
};

// Store the currently selected account type
let accountType = "Bank";

//clicking through tabs
document.getElementById("bank").addEventListener("click", () => {
    accountType = "Bank";
    switchTab(accountType);
});

document.getElementById("salary").addEventListener("click", () => {
    accountType = "Salary";
    switchTab(accountType);
});

document.getElementById("life").addEventListener("click", () => {
    accountType = "Life";
    switchTab(accountType);
});

document.getElementById("others").addEventListener("click", () => {
    accountType = "Others";
    switchTab(accountType);
});

switchTab(accountType);

const tabButtons = document.querySelectorAll(".tablinks");

tabButtons.forEach(tabButton => {
    tabButton.addEventListener("mouseover", () => {
        if (tabButton.id !== accountType.toLowerCase()) {
            tabButton.style.backgroundColor = "#76a3a6";
        }
    });

    tabButton.addEventListener("mouseout", () => {
        if (tabButton.id !== accountType.toLowerCase()) {
            tabButton.style.backgroundColor = "#8EBBBD"; // Or reset it to another value if needed
        }
    });
});

function switchTab(accountType) {
    // Hide all tables
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (table.id !== "in") {
            table.style.display = 'none';
        }
    });

    // Show the selected table
    const selectedTable = document.getElementById(`transactionList${accountType}`);
    
    selectedTable.style.display = 'table'; // Display the table


    // Remove the "selected-tab" class from all tab buttons
    const tabButtons = document.querySelectorAll(".tablinks");
    tabButtons.forEach(button => {
        button.style.backgroundColor = "#8EBBBD";
    });

    // Add the "selected-tab" class to the clicked tab button
    document.getElementById(accountType.toLowerCase()).style.backgroundColor = "#6AA7AA";
}

// Function to add a transaction
function addTransaction() {
    // Get the input values
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const transfer = document.getElementById("category").value;
    const receive = parseFloat(document.getElementById("amountReceive").value);
    const spend = parseFloat(document.getElementById("amountSpent").value);

    // Check if required fields are filled
    if (date && description && transfer && (!isNaN(receive) || !isNaN(spend))) {
        // Create a new row in the table
        const transactionList = document.getElementById(`transactionList${accountType}`);
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
        categoryBalances[accountType] += newRec - newSpend;
        balanceCell.textContent = categoryBalances[accountType].toFixed(2);
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
document.getElementById("amountSpent").addEventListener("keydown", (event) => {
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
    document.getElementById("amountSpent").value = "";
}

// Variable to keep track of whether removal mode is active
let removeMode = false;

// Variable to keep track of the total balance
let totalBalance = 0;

// Function to handle row selection
function toggleRowSelection(event) {
    if (removeMode) {
        // In removal mode
        const row = event.target.parentElement;
        if (row.classList.contains("selected")) {
            row.classList.remove("selected");
            // Update total balance when a row is deselected
            const balanceCell = row.querySelector(".balance-cell");
            const balance = parseFloat(balanceCell.textContent);
            totalBalance += balance;
        } else {
            row.classList.add("selected");
            // Update total balance when a row is selected
            const balanceCell = row.querySelector(".balance-cell");
            const balance = parseFloat(balanceCell.textContent);
            totalBalance -= balance;
        }
    }
}

// Add a click event listener to the "Remove" button
document.getElementById("remove").addEventListener("click", function () {
    if (removeMode) {
        // In removal mode, remove selected rows and update balance
        const selectedRows = document.querySelectorAll(".transactionList .selected");
        for (const row of selectedRows) {
            row.remove();
        }

        // Update the displayed balance amount
        const balanceAmount = document.getElementById("balanceAmount");
        balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;

        // Exit removal mode and reset the button
        removeMode = false;
        this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="6.67188" y="12.231" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-45 6.67188 12.231)" fill="#C98989"/>
                <rect x="12.4297" y="30.9438" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-135 12.4297 30.9438)" fill="#C98989"/>
            </svg>
            <p>Remove</p>
        `;
    } else {
        // Enter removal mode
        removeMode = true;
        this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="6.67188" y="12.231" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-45 6.67188 12.231)" fill="red"/>
                <rect x="12.4297" y="30.9438" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-135 12.4297 30.9438)" fill="red"/>
            </svg>
            <p>Delete</p>
        `;
    }
});

// Add a click event listener to the tables to toggle row selection
const transactionLists = document.querySelectorAll(".transactionList");
for (const transactionList of transactionLists) {
    transactionList.addEventListener("click", toggleRowSelection);
}
