angular.module('WorldInsight').directive('complexPassword', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function(password) {
        var hasUpperCase = /[A-Z]/.test(password);
        var hasLowerCase = /[a-z]/.test(password);
        var hasNumbers = /\d/.test(password);
        var hasNonalphas = /\W/.test(password);
        var characterGroupCount = hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas;

        if ((password.length >= 8) && (characterGroupCount >= 4)) {
          ctrl.$setValidity('complexity', true);
          return password;
        }
        else {
          ctrl.$setValidity('complexity', false);
          return undefined;
        }

      });
    }
  }
});