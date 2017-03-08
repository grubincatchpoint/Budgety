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
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };
})();

//UI CONTROLLER
var UIController = (function() {

var DOMstrings = {
  inputType: '.add__type',
  inputDescription: '.add__description',
  inputValue: '.add__value',
  inputBtn: '.add__btn'
};

  return {
    getinput: function() {
      return {
      type: document.querySelector(DOMstrings.inputType).value, //inc or exp
      description: document.querySelector(DOMstrings.inputDescription).value,
      value: document.querySelector(DOMstrings.inputValue).value,
      };
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
    // 1. Get input data
    var input = UICtrl.getinput();
    console.log(input);

    //2. Add item to budget controller

    //3. Add item to UI

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
