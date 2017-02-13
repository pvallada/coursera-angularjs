(function () {
    'use strict';
  angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuyCtrl = this;

        toBuyCtrl.itemName = "";
        toBuyCtrl.itemQuantity = "";

        toBuyCtrl.addItem = function () {
            ShoppingListCheckOffService.addItemtoBuy(toBuyCtrl.itemName, toBuyCtrl.itemQuantity);
        }
        toBuyCtrl.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeToBuyItem(itemIndex);
        };
        toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();
    }


    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var bougthListCtrl = this;

        bougthListCtrl.items = ShoppingListCheckOffService.getBoughtItems();
        bougthListCtrl.removeItem = function (itemIndex) {
            ShoppingListCheckOffService.removeBoughtItem(itemIndex);
        };
    }


    function ShoppingListCheckOffService() {
        var service = this;

        // List of items to buy
        var toBuy = [ {name:'Cookies', quantity:5}, {name: 'bottle of juice', quantity:3},{name: 'Candy', quantity:8}, {name: 'Package of milk', quantity:3},{name: 'Flour', quantity:7}];
        // List of bought items
        var bought = [];

        // function to add items to buy
        service.addItemtoBuy = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            toBuy.push(item);
        };

        service.removeToBuyItem = function (itemIndex) {
            // get the item before deleting it
            var item = toBuy[itemIndex];
            // remove the item from to buy list
            toBuy.splice(itemIndex, 1);
            // call the service to add item to the bought list
            service.addItemtoBoughtList(item.name,item.quantity);
        };

        // function to return the list of items to buy
        service.getToBuyItems = function () {
            return toBuy;
        };

        // function to add items that were bought
        service.addItemtoBoughtList = function (itemName, quantity) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            bought.push(item);
        };
        service.removeBoughtItem = function (itemIdex) {
            bought.splice(itemIdex, 1);
        };
        // function to return the list of bought items
        service.getBoughtItems = function () {
            return bought;
        };
    }

})();