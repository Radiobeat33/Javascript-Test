(function() {

    window.onload = function() {

        var checkingBalance = 0;
        var retirementBalance = 0;

        // Method that takes in an array of class selectors and callback functions, this function runs once the page has loaded (see below)
        var SetClickHandlers = {
            assign: function(arr) {
                arr.forEach(function(value, index) {
                    document.getElementById(arr[index][0]).addEventListener("click", function(){ arr[index][2](arr[index][1], arr[index][0]) });
                    Account.updateDisplay(arr[index][1]);
                });
            }
        };

        var Account = {
            deposit: function(amountElementId) {
                var amount = parseInt(document.getElementById(amountElementId).value);
                amountElementId === 'amount1' ? checkingBalance += amount : retirementBalance += amount + 10;
                Account.updateDisplay(amountElementId);
            },
            withdraw: function(amountElementId) {
                var amount = parseInt(document.getElementById(amountElementId).value);
                if (amountElementId === 'amount1' && amount <= checkingBalance) {
                    checkingBalance -= amount;
                } else if (amountElementId === 'amount2' && amount <= retirementBalance) {
                    retirementBalance -= amount;
                }
                Account.updateDisplay(amountElementId);
            },
            updateDisplay: function(amountElementId){
                var currentBalance;
                var currentBalanceElementId;
                if(amountElementId === 'amount1'){
                    currentBalance = checkingBalance;
                    currentBalanceElementId = 'checkingBalance';
                } else {
                    currentBalance = retirementBalance;
                    currentBalanceElementId = 'retirementBalance';
                }
                currentBalance <= 0 ? document.getElementById(currentBalanceElementId).classList.add("zero") : document.getElementById(currentBalanceElementId).classList.remove("zero");
                document.getElementById(currentBalanceElementId).innerHTML = '$' + currentBalance;
                document.getElementById(amountElementId).value = '';
            }
        };
        // Storage for all class selectors and their corresponding callback function
        var classAndCallbackStorage = [
            ["deposit1", "amount1", Account.deposit],
            ["deposit2", "amount2", Account.deposit],
            ["withdraw1", "amount1", Account.withdraw],
            ["withdraw2", "amount2", Account.withdraw]
        ];

        // invoking the assign method within setClickHandlers with the classAndCallbackStorage array passed in as an argument
        SetClickHandlers.assign(classAndCallbackStorage);

    }
}());



