(function () {
    'use strict';
  angular.module('mode1App', [])
      .controller('mod1Controller', function ($scope) {
          $scope.lunch = "";
          $scope.msg = "";
          $scope.displayMsg = function(){
              var itemCount = 0;
              var arrayOfStrings = $scope.lunch.split(',');
              var arrayLength = arrayOfStrings.length;
              for (var i = 0; i < arrayLength; i++) {
                  //ignore empty items
                  if ( !(arrayOfStrings[i].length === 0 || !arrayOfStrings[i].trim())){
                      itemCount++;
                  }
              }
              if ( itemCount > 0 && itemCount <= 3){
                  $scope.msg = "Enjoy!";
              }
              else if (itemCount > 3 ){
                  $scope.msg = "Too much!";
              }
              else {
                  $scope.msg = "Please enter data first";
              }
          };
      });
})();