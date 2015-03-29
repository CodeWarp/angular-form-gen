fg.directive('fgFormFields', function(fgUtils) {

    return {
        require: ['^?fgForm'],
        restrict: 'AE',
        templateUrl: 'angular-form-gen/form/form-fields/form-fields.ng.html',
        scope: {},
        link: function($scope, $element, $attrs, ctrls) {

            var fgForm = ctrls[0];

            $scope.isUsed = function(fieldSchema) {
                if (fieldSchema.useWhen) {
                    for (var key in fieldSchema.useWhen) {
                        var field = $scope.form.data[key];
                        var useWhen = fieldSchema.useWhen[key];

                        if (field === undefined) {
                            return false;
                        }
                        if (field !== undefined) {
                            if (Array.isArray(useWhen)) {
                                var inArray = false;
                                for (var i = 0; i < useWhen.length; i++) {
                                    if (testField(field, useWhen[i])){
                                        inArray = true;
                                    }
                                }
                                if (!inArray) {
                                    return false;
                                }
                            }
                            else if (!testField(field, useWhen)){
                                return false;
                            }
                        }
                    }
                }
                return true;
            };

            var testField = function(field, test) {
                return field === test;
            };

            $scope.$watch(function() {
                return fgForm.model;
            }, function(value) {
                $scope.form = value;
            });
        }
    };

});
