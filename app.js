//BUDGET CONTROLLER
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItems: {
      expense: [],
      income: []
    },
    totals: {
      expense: 0,
      income: 0
    }
  };
  return{
    addItem: function(type, des, val) {
      var newItem, ID;
      // Create new ID
      if(!data.allItems[type]){
        console.log(type);
      }
      if (data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      //Create new item based on inc or exp type
      if (type === 'expense'){
        newItem = new Expense(ID, des, val);
      } else if (type === 'income') {
        newItem = new Income(ID, des, val);
      }
      // Push it into data structure
      data.allItems[type].push(newItem);
      // Return new Element
      return newItem;
    },
    testing: function() {
      console.log(data);
    }
  };
})();

//UI CONTROLLER
var UIController = (function() {

var DOMstrings = {
  inputType: '.add__type',
  inputDescription: '.add__description',
  inputValue: '.add__value',
  inputBtn: '.add__btn',
  incomeContainer: '.income__list',
  expensesContainer: '.expenses__list'
};

  return {
    getInput: function() {
      return {
      type: document.querySelector(DOMstrings.inputType).value, //inc or exp
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      // Create HTML string with placeholder text
      if (type === 'income'){
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"> </i></button> </div> </div> </div>';
      } else if (type === 'expense') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      // Replace placeholder text with some actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert the HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

  document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
};

  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get input data
    input = UICtrl.getInput();
    //2. Add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    //3. Add item to UI
    UICtrl.addListItem(newItem, input.type);
    //4. Calculate budget

    //5. Display budget

    };
    return {
      init: function() {
        setupEventListeners();
      }
    };
})(budgetController, UIController);

controller.init();
