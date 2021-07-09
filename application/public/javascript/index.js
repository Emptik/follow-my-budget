var budgetController = (function() {

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome) {
		if (totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		}
		else {
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function() {
		return this.percentage;
	};

	var Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var calculateTotal = function(type) {
		var sum = 0;
		datas.allItems[type].forEach(function(currentElement) {
			sum += currentElement.value;
		});
		datas.totals[type] = sum;
	};

	var datas = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	return {
		addItem: function(type, desc, val) {
			var newItem, ID;
			
			// Create new ID
			if (datas.allItems[type].length > 0) {
				ID = datas.allItems[type][datas.allItems[type].length - 1].id + 1;
			}
			else {
				ID = 0;
			}
			
			// Create new item (Type = inc or exp)
			if (type === "exp") {
				newItem = new Expense(ID, desc, val);
			}
			else if (type === "inc") {
				newItem = new Expense(ID, desc, val);
			}

			// Push new item into datas allItems exp or inc
			datas.allItems[type].push(newItem);

			// Return the new element 
			return newItem;
		},
		deleteItem: function(type, id) {
			var index, ids;

			ids = datas.allItems[type].map(function(current){
				return current.id;
			});

			index = ids.indexOf(id);

			if (index !== -1) {
				datas.allItems[type].splice(index, 1);
			}
		},
		calculateBudget: function() {
			calculateTotal('exp');
			calculateTotal('inc');
			datas.budget = datas.totals.inc - datas.totals.exp;
			if (datas.totals.inc > 0) {
				datas.percentage = Math.round((datas.totals.exp / datas.totals.inc) * 100);
			}
			else {
				datas.percentage = -1;
			}
		},
		calculatePercentages: function() {
			datas.allItems.exp.forEach(function(current){
				current.calcPercentage(datas.totals.inc);
			});
		},
		getPercentages: function() {
			var allPercentages = datas.allItems.exp.map(function(current){
				return current.getPercentage();
			});
			return allPercentages;
		},
		getBudget: function() {
			return {
				budget: datas.budget,
				totalInc: datas.totals.inc,
				totalExp: datas.totals.exp,
				percentage: datas.percentage
			};
		},
		show: function() {
			console.log(datas);
		}
	};
	
})();

var UIController = (function() {

	var domElements = {
		inputType: ".c-form__field--typeScript",
		inputDescription: ".c-form__field--descriptionScript",
		inputValue: ".c-form__field--valueScript",
		inputBtn: ".c-form__btn--script",
		incomeContainer: '.c-income__listScript',
		expensesContainer: '.c-expense__listScript',
		budgetLabel: '.c-budget__total--script',
		incomeLabel: '.c-budget__value--incomeScript',
		expensesLabel: '.c-budget__value--expenseScript',
		percentageLabel: '.c-budget__percentage--script',
		container: '.l-wrapper',
		expensesPercLabel: '.c-item__percentage',
		dateLabel: '.c-budget__date'
	};

	var formatNumber = function(number, type) {
		var numberSplit, integer, decimal, sign;
		number = Math.abs(number);
		number = number.toFixed(2);

		numberSplit = number.split('.');
		integer = numberSplit[0];

		if (integer.length > 3) {
			integer = integer.substr(0, integer.length - 3) + ',' + integer.substr(integer.length - 3, 3);
		}

		decimal = numberSplit[1];
		
		return (type === 'exp' ? '-' : '+') + ' ' + integer + '.' + decimal;
	};

	var nodeListForEach = function(list, callback) {
		for (var i = 0; i < list.length; i++) {
			callback(list[i], i);
		}
	};

	return {
		getInputDatas: function() {
			return {
				type: document.querySelector(domElements.inputType).value,
				description: document.querySelector(domElements.inputDescription).value,
				value: parseFloat(document.querySelector(domElements.inputValue).value) 
			};
		},
		
		addListItem: function(obj, type) {
			var html, newHtml, element;

			if (type === 'inc') {
				element = domElements.incomeContainer;
				html = '<div class="c-item" id="inc-%id%"><div class="c-item__container c-item__container--row c-item__container--spaceBetween c-item__container--itemsCenter"><span>%description%</span><div class="c-item__container c-item__container--row c-item__container--spaceBetween c-item__container--itemsCenter"><span class="c-item__value">%value%</span><button class="c-item__delete c-item__delete--active"><i class="c-item__icon far fa-times-circle"></i></button></div></div></div>';
			}
			else if (type === 'exp') {
				element = domElements.expensesContainer;
				html = '<div class="c-item" id="exp-%id%"><div class="c-item__container c-item__container--row c-item__container--spaceBetween c-item__container--itemsCenter"><span class="c-item__description">%description%</span><div class="c-item__container c-item__container--row c-item__container--spaceBetween c-item__container--itemsCenter"><span class="c-item__value">%value%</span><span class="c-item__percentage c-item__percentage--center"></span><button class="c-item__delete c-item__delete--active"><i class="c-item__icon far fa-times-circle"></i></button></div></div></div>';
			}

			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		deleteListItem: function(selectorID) {
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		// Empty datas from the input field
		clearFields: function() {
			var fields, fieldsArray;
			fields = document.querySelectorAll(domElements.inputDescription + ', ' + 
			domElements.inputValue);
			fieldsArray = Array.prototype.slice.call(fields);
			fieldsArray.forEach(function(currentValue, index, array) {
				currentValue.value = "";
			});
		},

		displayBudget: function(obj) {
			var type;
			obj.budget > 0 ? type = 'inc' : type = 'exp';
			document.querySelector(domElements.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(domElements.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(domElements.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

			if (obj.percentage > 0) {
				document.querySelector(domElements.percentageLabel).textContent = obj.percentage + '%';
			}
			else {
				document.querySelector(domElements.percentageLabel).textContent = '---';
			}
		},

		displayPercentages: function(percentages) {
			var fields = document.querySelectorAll(domElements.expensesPercLabel);
			
			nodeListForEach(fields, function(current, index) {

				if (percentages[index] > 0) {
					current.textContent = percentages[index] + '%';
				}
				else {
					current.textContent = '---';
				}
			});
		},
		
		displayMonth: function() {
			var date, year, month, months;
			date = new Date();

			months = ['January', 'February', 'March', 'April', 
			'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
			];

			month = date.getMonth();
			year = date.getFullYear();
			document.querySelector(domElements.dateLabel).textContent = months[month] + ' ' + year;

		},

		changedType:  function() {
			var fields = document.querySelectorAll(
				domElements.inputType + ',' +
				domElements.inputDescription + ',' +
				domElements.inputValue
			);
		},

		getDomElements: function() {
			return domElements;
		}
	};

})();

var controller = (function(budgetCtrl, UICtrl) {

	var setupEventListener = function() {
		var DOM = UICtrl.getDomElements();
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
		document.addEventListener("keypress", function(event) {
			if(event.keycode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
		document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
		document.addEventListener("submit", function(event){
			event.preventDefault();
		});
	};
	
	var updateBudget = function() {
		budgetCtrl.calculateBudget();
		var budget = budgetCtrl.getBudget();
		UICtrl.displayBudget(budget);
	};

	var updatePercentages = function() {
		budgetCtrl.calculatePercentages();
		var percentages = budgetCtrl.getPercentages();
		UICtrl.displayPercentages(percentages);
	};

	var ctrlAddItem = function() {
		var inputDatas, newItem;
		inputDatas = UICtrl.getInputDatas();

		if (inputDatas.description !== "" && !isNaN(inputDatas.value) && inputDatas.value > 0) 
		{
			newItem = budgetCtrl.addItem(inputDatas.type, inputDatas.description, inputDatas.value);
			UICtrl.addListItem(newItem, inputDatas.type);
			UICtrl.clearFields();
			updateBudget();
			updatePercentages();
		}	
	};

	var ctrlDeleteItem = function(event) {
		var itemID, splitID, type, ID;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {
			splitID = itemID.split('-');
			type = splitID[0];
			ID = parseInt(splitID[1]);
			budgetCtrl.deleteItem(type, ID);
			UICtrl.deleteListItem(itemID);
			updateBudget();
			updatePercentages();
		}
	};

	return {
		init: function() {
			UICtrl.displayMonth();
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1});
			setupEventListener();
		}
	};

})(budgetController, UIController);

controller.init();
