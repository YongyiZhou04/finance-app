import {updateChart} from '../plot/charts.js';

let dateFormat = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/([12][0-9][0-9][0-9])$/;
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

        if (!dateFormat.test(date)){
            alert("Please insert valid date: MM/DD/YYYY");
            return;
        }

        const transactionList = document.getElementById(`transactionList${accountType}`);

        //Find the correct row index
        let index = findSortedRowIndex(transactionList.rows, date);

        if (transactionList.rows.length != 0){
            index += 1;
        }

        console.log("index: " + index);

        // Create a new row in the table
        const newRow = transactionList.insertRow(index);

        // Map containing all new information later to be added to local storage
        let newEntry = new Map();

        // Add data to the new row if the format is correct
        const dateCell = newRow.insertCell(0);
        dateCell.textContent = date;
        dateCell.classList.add("cell1");

        // Adding to the newEntry map
        newEntry.set("date", date);

        if (transactionList.rows.length % 2 === 1) {
            dateCell.style.backgroundColor = "#CCE0DC";
        }

        const descriptionCell = newRow.insertCell(1);
        descriptionCell.textContent = description;
        descriptionCell.classList.add("cell2");

        // Adding to the newEntry map
        newEntry.set("description", description);

        if (transactionList.rows.length % 2 === 1) {
            descriptionCell.style.backgroundColor = "#CCE0DC";
        }

        const transferCell = newRow.insertCell(2);
        transferCell.textContent = transfer;
        transferCell.classList.add("cell3");

        // Adding to the newEntry map
        newEntry.set("transfer", transfer);

        if (transactionList.rows.length % 2 === 1) {
            transferCell.style.backgroundColor = "#CCE0DC";
        }

        const receiveCell = newRow.insertCell(3);
        var newRec = 0.0;
        if (!(isNaN(receive))) {
            newRec = receive;
        }
        receiveCell.textContent = newRec.toFixed(2);
        receiveCell.classList.add("cell4");

        // Adding to the newEntry map
        newEntry.set("receive", newRec.toFixed(2));

        if (transactionList.rows.length % 2 === 1) {
            receiveCell.style.backgroundColor = "#CCE0DC";
        }

        var newSpend = 0.0;
        const spendCell = newRow.insertCell(4);
        if (!(isNaN(spend))) {
            newSpend = spend;
        }
        spendCell.textContent = newSpend.toFixed(2);
        spendCell.classList.add("cell5");

        // Adding to the newEntry map
        newEntry.set("spend", newSpend.toFixed(2));

        if (transactionList.rows.length % 2 === 1) {
            spendCell.style.backgroundColor = "#CCE0DC";
        }

        // Calculate and update the new balance
        const balanceAmount = document.getElementById("balanceAmount");
        const currentBalance = parseFloat(balanceAmount.textContent.replace("$", ""));
        const newBalance = currentBalance + newRec - newSpend;
        balanceAmount.textContent = `$${newBalance.toFixed(2)}`;

        // Adding to the newEntry map
        newEntry.set("balance", newBalance.toFixed(2));

        const balanceCell = newRow.insertCell(5);
        categoryBalances[accountType] += newRec - newSpend;
        balanceCell.textContent = categoryBalances[accountType].toFixed(2);
        if (transactionList.rows.length % 2 === 1) {
            balanceCell.style.backgroundColor = "#CCE0DC";
        }

        //Update chart
        updateChart(date, newBalance);

        // Clear the input fields
        clearInputFields();

        //Add newEntry to local storage
        localStorage.setItem(newEntry.get("date"), newEntry)

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

// Function to recalculate the total balance based on the spend and receive cells of each row
function recalculateTotalBalance() {
    let totalBalance = 0;

    // Select all rows with the class "cell4" (Receive) and "cell5" (Spend)
    const receiveCells = document.querySelectorAll(".cell4");
    const spendCells = document.querySelectorAll(".cell5");

    // Iterate through each pair of receive and spend cells and update the total balance
    receiveCells.forEach((receiveCell, index) => {
        const receive = parseFloat(receiveCell.textContent) || 0; // Default to 0 if not a valid number
        const spend = parseFloat(spendCells[index].textContent) || 0; // Default to 0 if not a valid number
        totalBalance += receive - spend;
    });

    // Update the displayed total balance amount
    const balanceAmount = document.getElementById("balanceAmount");
    balanceAmount.textContent = `$${totalBalance.toFixed(2)}`;
}

// Variable to keep track of whether removal mode is active
let removeMode = false;

// Function to handle row selection
function toggleRowSelection(event) {
    const row = event.target.parentElement;

    if (removeMode) {
        // In removal mode, remove the row
        row.remove();
        updateChart(row.cells[0], 0, false);
    
        // Deselect the row after removal
        row.classList.remove("selected");
    } else {
        // Toggle row selection if not in removal mode
        row.classList.toggle("selected");
    }
}

// Function to toggle between two button modes
function toggleButtonMode() {
    const removeButton = document.getElementById("remove");

    if (removeMode) {
        recalculateTotalBalance();
        // Switch back to Add mode
        removeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="6.67188" y="12.231" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-45 6.67188 12.231)" fill="#C98989"/>
                <rect x="12.4297" y="30.9438" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-135 12.4297 30.9438)" fill="#C98989"/>
            </svg>
            <p>Remove</p>
        `;
        
    } else {
        // Switch to Delete mode
        removeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                <rect x="6.67188" y="12.231" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-45 6.67188 12.231)" fill="red"/>
                <rect x="12.4297" y="30.9438" width="8.14276" height="26.464" rx="4.07138" transform="rotate(-135 12.4297 30.9438)" fill="red"/>
            </svg>
            <p>DELETE</p>
        `;
    }

    // Toggle the mode
    removeMode = !removeMode;
}

// Add a click event listener to the remove button
document.getElementById("remove").addEventListener("click", toggleButtonMode);

// Add a click event listener to the tables to toggle row selection
const transactionLists = document.querySelectorAll(".transactionList");
for (const transactionList of transactionLists) {
    transactionList.addEventListener("click", toggleRowSelection);
}

function findSortedRowIndex(rows, date){
    let mid = Math.floor(rows.length / 2);
    let left = 0;
    let right = rows.length-1;
    while (left <= right) {
        if (dateComparator(date, rows[mid].cells[0].innerText) == 0) {
            return mid;
        } else if (dateComparator(date, rows[mid].cells[0].innerText) == 1) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    
        mid = Math.floor((right + left) / 2);
    }
    return mid;
}

function dateComparator(date1, date2){
    if ((date1.substr(6) + date1.substr(0,2) + date1.substr(3,5)) > (date2.substr(6) + date2.substr(0,2) + date2.substr(3,5))){
        return 1;
    } else if ((date1.substr(6) + date1.substr(0,2) + date1.substr(3,5)) < (date2.substr(6) + date2.substr(0,2) + date2.substr(3,5))){
        return -1;
    } else {
        return 0;
    }
}