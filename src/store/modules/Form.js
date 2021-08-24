class Form {
    constructor() {
        this.formData = [];
        this.totalIncome = 0;
        this.totalExpense = 0;
    }

    setFormData(transaction) {
        const transactionInFormData = this.formData.find(
            (element) => element.id === transaction.id,
        );

        if (transactionInFormData === undefined) {
            // Add transaction
            this.formData.push(transaction);
        } else {
            // Remove transaction
            this.formData.splice(
                this.formData.indexOf(transactionInFormData), 1,
            );
        }
    }

    setTotalIncome(incomeTransaction) {
        if (!this.formData.find((element) => element.id === incomeTransaction.id)) {
            // Add income value
            this.totalIncome += incomeTransaction.value;
        } else {
            // Remove income value
            this.totalIncome -= incomeTransaction.value;
        }
    }

    setTotalExpense(expenseTransaction) {
        if (this.formData.find((element) => element.id === expenseTransaction.id) === undefined) {
            // Add expense value
            this.totalExpense += expenseTransaction.value;
        } else {
            // Remove expense value
            this.totalExpense -= expenseTransaction.value;
        }
    }

    callFormSetters(transaction) {
        switch (transaction.type) {
            case 'inc':
                this.setTotalIncome(transaction);
                break;
            case 'exp':
                this.setTotalExpense(transaction);
                break;
            default:
                break;
        }
        this.setFormData(transaction);
    }
}

export default new Form();
