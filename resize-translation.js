(function() {
  var $;

  $ = jQuery;

  $.fn.resizeMe = function(method) {
    var $parent, days, methods;
    $parent = $(this);
    days = 131;
    methods = {
      init: function(options) {
        this.resizeMe.settings = $.extend({}, this.resizeMe.defaults, options);
        return this.each(function() {
          var $element, element;
          $element = $(this);
          element = this;
          console.log($element.width());
          methods.addTooltip();
          return $('.rContainer', this).each(function() {
            var $container;
            console.log('in rContainer each');
            console.log($parent.width());
            $container = $(this);
            console.log($container);
            $container.prepend('<div class="lHandle"></div><div class="rHandle"></div>');
            methods.rHandleBind($container, options);
            return methods.lHandleBind($container, options);
          });
        });
      },
      addTooltip: function() {
        $('body').append('<div class="rtooltip"></div>');
        return console.log($parent.width());
      },
      rHandleBind: function($container, options) {
        var $rightHandle;
        $rightHandle = $container.find('.rHandle');
        return $rightHandle.bind('mousedown.resize-handle', function(e) {
          return methods.positionInit(e, options);
        });
      },
      lHandleBind: function($container, options) {},
      positionInit: function(event, options) {
        var parentWidth;
        parentWidth = $parent.width();
        return console.log(parentWidth);
      },
      drag: function(event, context) {}
    };
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      return $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }
  };

}).call(this);
