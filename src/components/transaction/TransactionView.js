import store from '../../store/main.js';
import iconCancel from './images/cancel.svg';

export default class TransactionView {
    constructor() {
        this.incomeContainer = document.querySelector('.app__incomeTransaction');
        this.expensesContainer = document.querySelector('.app__expenseTransaction');
        this.targetedTransaction = null;
    }

    addEventHandler(transactionPropagator, cardPropagator) {
        const expenseElements = document.querySelectorAll('.transaction__delete');
        for (let index = 0; index < expenseElements.length; index += 1) {
            expenseElements[index].addEventListener('click', (event) => {
                this.removeTransaction(event, transactionPropagator, cardPropagator);
            });
        }
    }

    createTransaction() {
        const lastTransaction = store.modules.form.formData.slice(-1)[0];
        if (lastTransaction.type === 'inc') {
            const incomeTransaction = `
            <div class="transaction" id="${lastTransaction.id}">
                <div class="transaction__container transaction__container--row transaction__container--spaceBetween transaction__container--itemsCenter">
                    <span>${lastTransaction.description}</span>
                    <div class="transaction__container transaction__container--row transaction__container--spaceBetween transaction__container--itemsCenter">
                        <span class="transaction__value">${lastTransaction.value}</span>
                        <button class="transaction__delete transaction__delete--active">
                            <img class="transaction__icon" src="${iconCancel}" alt="Icon cancel">
                        </button>
                    </div>
                </div>
            </div>`;
            this.incomeContainer.insertAdjacentHTML('beforeend', incomeTransaction);
        } else {
            const expenseTransaction = `
            <div class="transaction" id="${lastTransaction.id}">
                <div class="transaction__container transaction__container--row transaction__container--spaceBetween transaction__container--itemsCenter">
                    <span class="transaction__description">${lastTransaction.description}</span>
                    <div class="transaction__container transaction__container--row transaction__container--spaceBetween transaction__container--itemsCenter">
                        <span class="transaction__value">${lastTransaction.value}</span>
                        <span class="transaction__percentage transaction__percentage--center"></span>
                        <button class="transaction__delete transaction__delete--active">
                            <img class="transaction__icon" src="${iconCancel}" alt="Icon cancel">
                        </button>
                    </div>
                </div>
            </div>`;
            this.expensesContainer.insertAdjacentHTML('beforeend', expenseTransaction);
        }
    }

    static addPercentage() {
        const domPercentages = document.querySelectorAll('.transaction__percentage');

        domPercentages.forEach((domElement) => {
            const domPercentage = domElement;
            const domExpenseId = domPercentage.parentElement.parentElement.parentElement.id;

            const expenseTransaction = store.modules.form.formData.find(
                (transaction) => transaction.id === Number(domExpenseId),
            );

            const expenseValue = expenseTransaction.value;
            const expensePercentage = (expenseValue * 100) / store.modules.form.totalIncome;
            domPercentage.textContent = `${Math.round(expensePercentage)} %`;
        });
    }

    removeTransaction(event, transactionPropagator, cardPropagator) {
        this.targetedTransaction = event.target
            .parentElement.parentElement
            .parentElement.parentElement;

        if (this.targetedTransaction.parentElement !== null) {
            this.targetedTransaction.parentElement.removeChild(this.targetedTransaction);

            const transaction = store.modules.form.formData.find(
                (element) => element.id === Number(this.targetedTransaction.id),
            );

            store.modules.form.callFormSetters(transaction);
            transactionPropagator();
            cardPropagator();
        }
    }
}
