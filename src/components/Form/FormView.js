import store from '../../store/main.js';

export default class FormView {
    constructor() {
        this.formElements = {
            inputs: {
                type: document.querySelector('.form__field--type'),
                description: document.querySelector('.form__field--description'),
                value: document.querySelector('.form__field--value'),
                submit: document.querySelector('.form__submit'),
            },
            errors: {
                description: document.querySelector('.form__error--description'),
                value: document.querySelector('.form__error--value'),
            },
        };
        this.transaction = null;
        this.formPropagator = null;
    }

    addEventHandler(formPropagator) {
        this.formElements.inputs.submit.addEventListener('click', (event) => {
            this.formPropagator = formPropagator;
            this.checkFormData();
            event.preventDefault();
        });
        this.formElements.inputs.description.addEventListener('focus', () => {
            this.formElements.errors.description.classList.add('form__error--display');
        });
        this.formElements.inputs.value.addEventListener('focus', () => {
            this.formElements.errors.value.classList.add('form__error--display');
        });
    }

    checkFormData() {
        const validationForm = { description: null, value: null };

        // Check input description
        if (
            this.formElements.inputs
                .description.value.length < 1 || this.formElements.inputs
                .description.value.length > 80
        ) {
            validationForm.description = false;
            this.formElements.errors.description.classList.remove('form__error--display');
        } else {
            validationForm.description = true;
        }

        // Check input value
        if (Number(this.formElements.inputs.value.value) <= 0) {
            validationForm.value = false;
            this.formElements.errors.value.classList.remove('form__error--display');
        } else {
            validationForm.value = true;
        }

        // Check validation form
        if (validationForm.description === true && validationForm.value === true) {
            this.createId();
        }
    }

    createId() {
        let id = null;
        if (this.transaction === null) {
            id = 1;
        } else {
            id = this.transaction.id + 1;
        }
        this.addTransaction(id);
    }

    addTransaction(id) {
        this.transaction = {
            id,
            type: this.formElements.inputs.type.value,
            description: this.formElements.inputs.description.value,
            value: parseFloat(this.formElements.inputs.value.value),
        };
        store.modules.form.callFormSetters(this.transaction);
        this.formPropagator();
        this.clearFields();
    }

    clearFields() {
        this.formElements.inputs.description.value = '';
        this.formElements.inputs.value.value = '';
    }
}
