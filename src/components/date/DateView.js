export default class DateView {
    constructor() {
        this.dateElement = document.querySelector('.date');
    }

    displayDate() {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentNumberMonth = date.getMonth();
        const months = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December',
        ];
        const currentMonth = months[currentNumberMonth];
        this.dateElement.textContent = `${currentMonth} ${currentYear}`;
    }
}
