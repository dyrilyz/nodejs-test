/**
 * selector
 * @param ngModel 绑定模型
 * @param dyList 传入数组
 * >带检索查询
 * >可以使用disabled禁用selector
 * TODO 事件委托
 */
angular.module('directive.selector', []).directive('dySelector', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            ngModel: '=',
            dyList: '=',
        },
        template: `
        <div class="dy-selector">
            <div class="dy-selector-value" ng-bind="ngModel" ng-class="{'dy-selector-able':selectorAble}" ng-click="showList()"></div>
            <div class="dy-selector-list" ng-show="selectorAble && isShowList">
                <input type="text" ng-model="keyWord" id="dy-selector-search"/>
                <ul>
                    <li ng-repeat="item in dyList track by $index" ng-click="setItem(item)" ng-show="item.indexOf(keyWord) != -1">
                        <span ng-bind="item"></span>
                    </li>
                </ul>
            </div>
        </div>`,
        link: function ($scope, $element, $attr) {
            if ($attr.disabled != '' && $attr.disabled != 'disabled') {
                $scope.selectorAble = true
            } else {
                $scope.selectorAble = false
            }
            console.log(window)
        },
        controller: function ($scope) {
            $scope.isShowList = false
            $scope.keyWord = ''
            $scope.setItem = function (item) {
                $scope.ngModel = item
                $scope.isShowList = false
                $scope.keyWord = ''
            }
            $scope.showList = function () {
                $scope.isShowList = !$scope.isShowList
                $scope.keyWord = ''
            }
        }
    }
})