/**
 * selector
 * @param ngModel 绑定模型
 * @param dyList 传入数组
 * >带检索查询
 * >可以使用disabled禁用selector
 * TODO 关闭列表搜索框值未清空
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
            <div class="dy-selector-list" ng-show="isShowList" ng-if="selectorAble">
                <input type="text" ng-model="search" id="dy-selector-search"/>
                {{search}}
                <ul>
                    <li ng-repeat="item in dyList track by $index" ng-click="setItem(item)" ng-show="item.indexOf(search) != -1">
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
            var dyList = $scope.dyList
            $scope.isShowList = false
            $scope.search = ''
            $scope.setItem = function (item) {
                $scope.ngModel = item
                $scope.isShowList = false
                $scope.search = ''
                console.log($scope)
                // $scope.$apply()
            }
            $scope.showList = function () {
                $scope.isShowList = !$scope.isShowList
                $scope.search = ''
            }
        }
    }
})