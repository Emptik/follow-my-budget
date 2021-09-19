import store from '../../store/main.js';

export default class BudgetView {
    constructor() {
        this.budgetElement = document.querySelector('.budget');
    }

    static calculateBudget() {
        store.modules.budget.setBudget(
            store.modules.form.totalIncome, store.modules.form.totalExpense,
        );
    }

    displayBudget() {
        this.budgetElement.textContent = store.modules.budget.budget;
    }
}
