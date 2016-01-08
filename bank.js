(function() {

    "use strict";

    window.onload = function() {

        var checkingBalance = 0;
        var retirementBalance = 0;

        // Method that takes in an array of class selectors and callback functions, this function runs
        // once the page has loaded (see line 57) This modular setup gives you flexibility to add to the
        // elementIdAndCallbackStorage for future use.
        var SetClickHandlers = {
            assign: function(arr) {
                arr.forEach(function(value, index) {
                    document.getElementById(arr[index][0]).addEventListener("click", function(){ arr[index][2](arr[index][1]) });
                    Account.updateDisplay(arr[index][1]);
                });
            }
        };

        // Account object with refactored deposit, withdraw, and update method. These methods handle
        // both accounts while maintaining DRY standards.
        var Account = {
            deposit: function(amountElementId) {
                var amount = parseInt(document.getElementById(amountElementId).value);
                amountElementId === 'checkingAmount' ? checkingBalance += amount : retirementBalance += amount + 10;
                Account.updateDisplay(amountElementId);
            },
            withdraw: function(amountElementId) {
                var amount = parseInt(document.getElementById(amountElementId).value);
                if (amountElementId === 'checkingAmount' && amount <= checkingBalance) {
                    checkingBalance -= amount;
                } else if (amountElementId === 'retirementAmount' && amount <= retirementBalance) {
                    retirementBalance -= amount;
                }
                Account.updateDisplay(amountElementId);
            },
            updateDisplay: function(amountElementId){
                var currentBalance;
                var currentBalanceElementId;
                if(amountElementId === 'checkingAmount'){
                    currentBalance = checkingBalance;
                    currentBalanceElementId = 'checkingBalance';
                } else if (amountElementId === 'retirementAmount'){
                    currentBalance = retirementBalance;
                    currentBalanceElementId = 'retirementBalance';
                }
                currentBalance <= 0 ? document.getElementById(currentBalanceElementId).classList.add("zero") : document.getElementById(currentBalanceElementId).classList.remove("zero");
                document.getElementById(currentBalanceElementId).innerHTML = '$' + currentBalance;
                document.getElementById(amountElementId).value = '';
            }
        };

        // Array storage for all class selectors and their corresponding callback function. This makes setting up
        // a click handler much cleaner.
        var elementIdAndCallbackStorage = [
            ["checkingDeposit", "checkingAmount", Account.deposit],
            ["retirementDeposit", "retirementAmount", Account.deposit],
            ["checkingWithdraw", "checkingAmount", Account.withdraw],
            ["retirementWithdraw", "retirementAmount", Account.withdraw]
        ];

        // invoking the assign method within setClickHandlers with the elementIdAndCallbackStorage array passed
        // in as an argument. This happens once the page loads
        SetClickHandlers.assign(elementIdAndCallbackStorage);

    }
}());



