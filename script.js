const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const addButton = document.querySelector("button");
const expenseList = document.getElementById("expenseList");
const totalAmountSpan = document.getElementById("totalAmount");


//Load saved expenses or start with empty array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Display saved expenses on page load
expenses.forEach(function (expense) {
    addExpenseToList(expense.name, expense.amount);
});

updateTotal();

addButton.addEventListener("click", function () {
    const name = expenseNameInput.value;
    const amount = expenseAmountInput.value;

    if (name === "" || amount === "") {
        alert("please enter both name and amount");
        return;
    }

    expenses.push({ name, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));

    addExpenseToList(name, amount);
    updateTotal();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
});



function addExpenseToList(name, amount) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${amount}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";

    deleteButton.addEventListener("click", function () {
        expenseList.removeChild(li);

        expenses = expenses.filter(
            (expense) => !(expense.name === name && expense.amount === amount)
        );

        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateTotal();
    });

    li.appendChild(deleteButton);
    expenseList.appendChild(li);
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    totalAmountSpan.textContent = total;
}