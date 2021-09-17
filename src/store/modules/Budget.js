class Budget {
    constructor() {
        this.budget = 0;
    }

    setBudget(totalIncome, totalExpense) {
        this.budget = totalIncome - totalExpense;
    }
}

export default new Budget();
