const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseCategoryInput = document.getElementById("expenseCategory");
const addExpenseButton = document.getElementById("addExpense");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function calculateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalDisplay.textContent = total.toFixed(2);
}

function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
      <span>${expense.name} (${expense.category}) - $${expense.amount}</span>
      <button class="delete-btn">X</button>
    `;

        li.querySelector("button").addEventListener("click", () => {
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
            calculateTotal();
        });

        expenseList.appendChild(li);
    });
}

addExpenseButton.addEventListener("click", () => {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    expenses.push({ name, amount, category });

    saveExpenses();
    renderExpenses();
    calculateTotal();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    expenseCategoryInput.value = "Food";
});

renderExpenses();
calculateTotal();
