(function() {
  var $, addTooltip, lHandleBind, rHandleBind;

  $ = jQuery;

  window.$parent;

  window.days = 131;

  window.dayWidth;

  window.handleWidth = 0;

  window.$tooltip;

  $.fn.resizeMe = function(options) {
    var settings;
    settings = $.extend({}, options);
    return this.each(function() {
      var $parent;
      $parent = $(this);
      addTooltip();
      return $('.rContainer', this).each(function() {
        var $container;
        console.log('in rContainer each');
        $container = $(this);
        $container.prepend('<div class="lHandle"></div><div class="rHandle"></div>');
        rHandleBind($container);
        return lHandleBind($container);
      });
    });
  };

  addTooltip = function() {
    return $('body').append('<div class="rtooltip"></div>');
  };

  rHandleBind = function($container) {};

  lHandleBind = function($container) {};

}).call(this);
