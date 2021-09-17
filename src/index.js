import './index.scss';
import DateView from './components/Date/DateView.js';
import FormView from './components/Form/FormView.js';
import TransactionView from './components/Transaction/TransactionView.js';
import BudgetView from './components/Budget/BudgetView.js';
import CardView from './components/Card/CardView.js';

console.log('bbb');

const initBudget = () => {
    const budget = new BudgetView();
    BudgetView.calculateBudget();
    budget.displayBudget();
};

const initDate = () => {
    const date = new DateView();
    date.displayDate();
};

const initCard = () => {
    const card = new CardView();
    card.calculatePercentage();
    card.displayCard();
};

const cardPropagator = () => {
    initCard();
};

const transactionPropagator = () => {
    TransactionView.addPercentage();
    initBudget();
};

const initTransaction = () => {
    const transaction = new TransactionView();
    transaction.createTransaction();
    TransactionView.addPercentage();
    transaction.addEventHandler(transactionPropagator, cardPropagator);
};

const formPropagator = () => {
    initTransaction();
    initCard();
    initBudget();
};

const initForm = () => {
    const form = new FormView();
    form.addEventHandler(formPropagator);
};

initDate();
initForm();
