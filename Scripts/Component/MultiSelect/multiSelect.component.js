(function() {
    var Ctrl = function($filter) {
        var vm = this;
        vm.test = 'I am from component';
        vm.selectedData = [];
        vm.showDropdownbody = false;
        vm.txtFilter = '';
        vm.toggleDropdownBody = function() {
            vm.showDropdownbody = !vm.showDropdownbody;
        };
        vm.modifyDDL = function() {
            vm.showing = !vm.showing;
        };
        vm.selectedData = [];
        vm.toggleSelection = function(index) {
            vm.inputData[index].selected = !vm.inputData[index].selected;
            vm.buildSelectedList();
        };
        vm.filterList = function() {
            vm.inputData = $filter('searchFilter')(vm.inputData, vm.txtFilter, vm.valueField, vm.textField, '', false);
        };
        vm.filterList();
        vm.toggleAll = function(val) {
            for (var i = 0; i < vm.inputData.length; i++) {
                if (vm.inputData[i].shown) {
                    vm.inputData[i].selected = val;
                }
            }
            vm.buildSelectedList();
        };
        vm.buildSelectedList = function() {
            vm.selectedData = [];
            for (var i = 0; i < vm.inputData.length; i++) {
                if (vm.inputData[i].selected) {
                    vm.selectedData.push(angular.copy(vm.inputData[i]));
                }
            }
        };

    };
    angular.module('utilities')
        .component('multiSelect', {
            template: ['$templateCache', function ($templateCache) {
                return $templateCache.get('multiSelect.component.html');
            }],
            controllerAs: 'vm',
            bindings: {
                inputData: '=',
                backgroundColor: '=?',
                displayName: '=',
                textField: '=',
                valueField: '=',
                dropLeft: '=?',
                tooltipField: '=?',
                selectedData: '=',
                dropUp:'=?'
            },
            controller: ['$filter', Ctrl]
        })
        .filter('searchFilter', function() {
            return function(value, searchStr, prop, text, role, reverse) {
                var result = [];
                if (!reverse) {
                    prop = text;
                }
                if (value) {
                    for (var i = 0; i < value.length; i++) {
                        var val = value[i];
                        if (val.selected === undefined) {
                            val.selected = false;
                        }
                        if (val.shown === undefined || role === 'reset') {
                            val.shown = true;
                        }
                        if (searchStr === '') {
                            val.shown = true;
                            result.push(val);
                        } else {
                            if (val[prop] && val[prop].toString().toUpperCase().toString().indexOf(searchStr.toString().toUpperCase()) > -1) {
                                val.shown = true;
                                result.push(val);
                            } else {
                                val.shown = false;
                                result.push(val);
                            }
                        }
                    }
                }
                return result;
            };
        });
})();
