/*
Personal Expense Calculator

```
Concepts used:
- Variables
- Data types
- Conditions
- Loops
- Functions
- Arrays
- Objects
- DOM manipulation
- Event handling
```

*/

// Store total income

let totalIncome = 0;

// Store expenses in an array

let expenses = [];

// -----------------------------
// Add Income
// -----------------------------

const incomeForm =
document.getElementById("incomeForm");

incomeForm.addEventListener(
"submit",
function(event) {

```
    event.preventDefault();


    const income =
        Number(
            document.getElementById("income").value
        );


    if (income <= 0) {

        alert("Please enter a valid income.");

        return;
    }


    totalIncome += income;


    updateSummary();


    incomeForm.reset();

}
```

);

// -----------------------------
// Add Expense
// -----------------------------

const expenseForm =
document.getElementById("expenseForm");

expenseForm.addEventListener(
"submit",
function(event) {

```
    event.preventDefault();


    const expenseName =
        document
        .getElementById("expenseName")
        .value
        .trim();


    const expenseAmount =
        Number(
            document
            .getElementById("expenseAmount")
            .value
        );


    const category =
        document
        .getElementById("category")
        .value;


    if (expenseName === "") {

        alert("Please enter expense name.");

        return;
    }


    if (expenseAmount <= 0) {

        alert("Please enter a valid expense amount.");

        return;
    }


    if (category === "") {

        alert("Please select a category.");

        return;
    }


    // Create expense object

    const expense = {

        name: expenseName,

        amount: expenseAmount,

        category: category

    };


    // Add object to array

    expenses.push(expense);


    // Update page

    updateSummary();

    displayExpenses();

    displayCategorySummary();


    expenseForm.reset();

}
```

);

// -----------------------------
// Calculate Total Expenses
// -----------------------------

function calculateTotalExpenses() {

```
let total = 0;


for (let i = 0; i < expenses.length; i++) {

    total += expenses[i].amount;

}


return total;
```

}

// -----------------------------
// Update Summary
// -----------------------------

function updateSummary() {

```
const totalExpenses =
    calculateTotalExpenses();


const savings =
    totalIncome - totalExpenses;


document.getElementById("totalIncome")
    .innerText =
    "₹" + totalIncome.toFixed(2);


document.getElementById("totalExpense")
    .innerText =
    "₹" + totalExpenses.toFixed(2);


document.getElementById("savings")
    .innerText =
    "₹" + savings.toFixed(2);
```

}

// -----------------------------
// Display Expenses
// -----------------------------

function displayExpenses() {

```
const expenseList =
    document.getElementById("expenseList");


expenseList.innerHTML = "";


for (let i = 0; i < expenses.length; i++) {

    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>
            ${expenses[i].name}
        </td>

        <td> 
            ${expenses[i].category}
        </td>

        <td>
            ₹${expenses[i].amount.toFixed(2)}
        </td>

    `;


    expenseList.appendChild(row);

}
```

}

// -----------------------------
// Category-wise Summary
// -----------------------------

function displayCategorySummary() {

```
const categorySummary =
    document.getElementById(
        "categorySummary"
    );


categorySummary.innerHTML = "";


const categories = {};


// Calculate category totals

for (let i = 0; i < expenses.length; i++) {

    const category =
        expenses[i].category;


    const amount =
        expenses[i].amount;


    if (categories[category]) {

        categories[category] += amount;

    } else {

        categories[category] = amount;

    }

}


// Display category totals

for (const category in categories) {

    const div =
        document.createElement("div");


    div.className =
        "category-item";


    div.innerHTML = `

        <strong>
            ${category}
        </strong>

        <span>
            ₹${categories[category].toFixed(2)}
        </span>

    `;


    categorySummary.appendChild(div);

}
```

}

// -----------------------------
// Generate Report
// -----------------------------

function generateReport() {

```
const totalExpenses =
    calculateTotalExpenses();


const savings =
    totalIncome - totalExpenses;


const report =
    document.getElementById("report");


if (totalIncome === 0 &&
    totalExpenses === 0) {

    report.innerText =
        "Please add income and expenses first.";

    return;
}


let message = "";


message +=
    "Your total income is ₹" +
    totalIncome.toFixed(2) +
    ". ";


message +=
    "Your total expenses are ₹" +
    totalExpenses.toFixed(2) +
    ". ";


if (savings > 0) {

    message +=
        "You have saved ₹" +
        savings.toFixed(2) +
        ". Good job!";

} else if (savings === 0) {

    message +=
        "Your income and expenses are equal.";

} else {

    message +=
        "You have exceeded your income by ₹" +
        Math.abs(savings).toFixed(2) +
        ".";

}


report.innerText = message;
```

}
