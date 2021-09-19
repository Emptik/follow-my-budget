// Webpack Assets
import './index.scss';
import '@fortawesome/fontawesome-free/js/regular.min.js';
import '@fortawesome/fontawesome-free/js/solid.min.js';
import '@fortawesome/fontawesome-free/js/fontawesome.min.js';

// Components
import DateView from './components/date/DateView.js';
import FormView from './components/form/FormView.js';
import TransactionView from './components/transaction/TransactionView.js';
import BudgetView from './components/budget/BudgetView.js';
import CardView from './components/card/CardView.js';

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
