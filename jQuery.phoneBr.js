(function($){
    $.fn.phoneBr = function (options) {

      $.fn.phoneBr.defaults = {
        numberSeparator: '-',
        areaCodeSparatorStart: '(',
        areaCodeSparatorEnd: ')',
      };
      options = $.extend({}, $.fn.phoneBr.defaults, options);
      
      var phoneBr = function(e) {

        var key = e.which || e.charCode || e.keyCode || 0;
        var validKeys = ( key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));
       
        if (!validKeys) return; 
        
        var $element = $(e.target);
        var rawElement = ($element.length) ? $element[0] : null;
        var number = ($element.length) ? $element.val() : null;
        var caretStart = (rawElement) ? rawElement.selectionStart: null;
        var caretEnd = (rawElement) ? rawElement.selectionEnd: null;
        
        if (!number) return;
     
        number = number.replace(/\D/g,'');
        var len = number.length;
        if (number.length > 11) {
          number = number.slice(-11);
          caretStart = caretStart - 1;
          caretEnd = caretEnd - 1;
        }
     
        len = number.length;
        var formatedPhone = number;
        
        if (len >= 5) {
          
          formatedPhone = [
            formatedPhone.slice(0, -4),
            options.numberSeparator,
            formatedPhone.slice(-4)
          ].join('');

          caretStart = (caretStart === len) ? caretStart + 1 : caretStart;
          caretEnd = (caretEnd === len) ? caretEnd + 1 : caretEnd;
        }

        if (len === 10 || len === 11) {
          
          formatedPhone = [
            options.areaCodeSparatorStart, 
            formatedPhone.substring(0, 2),
            options.areaCodeSparatorEnd,
            formatedPhone.substring(2)
          ].join('');

          caretStart = (caretStart === len + 1) ? caretStart + 3 : caretStart;
          caretEnd = (caretEnd === len + 1) ? caretEnd + 3 : caretEnd;
        }

        $element.val(formatedPhone);
        rawElement.setSelectionRange(caretStart, caretEnd);
      }
      
      this.keyup(phoneBr);
      this.keypress(phoneBr);
      this.blur(phoneBr);
      
      return this;
    };
  })(jQuery);
