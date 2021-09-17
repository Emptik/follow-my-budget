import store from '../../store/main.js';

export default class CardView {
    constructor() {
        this.cardIncomeElement = document.querySelector('.card__value--income');
        this.cardExpenseElement = document.querySelector('.card__value--expense');
        this.cardExpensePercentageElement = document.querySelector('.card__percentage');
        this.expensePercentage = null;
    }

    calculatePercentage() {
        this.expensePercentage = (
            store.modules.form.totalExpense * 100
        ) / store.modules.form.totalIncome;
    }

    displayCard() {
        this.cardIncomeElement.textContent = `+ ${store.modules.form.totalIncome}`;
        this.cardExpenseElement.textContent = `- ${store.modules.form.totalExpense}`;
        this.cardExpensePercentageElement.textContent = `${Math.round(this.expensePercentage)} %`;
    }
}
