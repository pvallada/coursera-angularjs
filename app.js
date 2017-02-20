(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    }


    function FoundItemsDirectiveController() {
        var list = this;

        list.itemsFound = function () {
            if ( list.items != undefined && list.items.length > 0 ){
                return true;
            }
            else{
                return false;
            }
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";
        menu.getMatchedMenuItems = function () {
            if (menu.searchTerm === "") {
                menu.found = [];
            }
            else {
                var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
                promise.then(function (result) {
                menu.found = result;
            })
        }
        };
        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        service.getMatchedMenuItems = function(searchTerm){
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                var foundItems = [];
                // traverse the menu_items array
                for ( var index = 0; index < result.data.menu_items.length; index++){
                    if ( result.data.menu_items[index].description.search(searchTerm.toLowerCase()) != -1 ) {
                        foundItems.push(result.data.menu_items[index]);
                        console.log(result.data.menu_items[index].description);
                    }
                }
                // return processed items
                return foundItems;
            });
       };
    }

})();