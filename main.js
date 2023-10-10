// Add your JavaScript code here
document.getElementById("addTransaction").addEventListener("click", () => {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amountReceive").value);

    if (description && !isNaN(amount)) {
        addTransaction(description, amount);
        clearInputFields();
    }
});

function addTransaction(description, amount) {
    const transactionList = document.getElementById("transactionList");
    const listItem = document.createElement("li");
    listItem.textContent = `${description}: $${amount.toFixed(2)}`;
    transactionList.appendChild(listItem);

    // Update the account balance
    const balanceAmount = document.getElementById("balanceAmount");
    const currentBalance = parseFloat(balanceAmount.textContent.replace("$", ""));
    const newBalance = currentBalance + amount;
    balanceAmount.textContent = `$${newBalance.toFixed(2)}`;
}

function clearInputFields() {
    document.getElementById("description").value = "";
    document.getElementById("amountReceive").value = "";
}
