app.directive('emitLastRepeaterElement', function() {
    return function(scope) {
        if (scope.$last){
            scope.$emit('LastRepeaterElement');
        }
    };
});/**
 * Created by Isma-il on 9/10/2016.
 */
