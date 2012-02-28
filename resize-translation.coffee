$ = jQuery

# this is gross. 
window.$parent
window.days = 131
window.dayWidth
window.handleWidth = 0
window.$tooltip
  
$.fn.resizeMe  = (options) ->
  settings = $.extend {}, options
  
  @each ->
    $parent = $(@)
    addTooltip();
  
    $('.rContainer', this).each ->
      console.log 'in rContainer each'
      $container = $(@)
      $container.prepend('<div class="lHandle"></div><div class="rHandle"></div>')
      rHandleBind($container);
      lHandleBind($container);
      
addTooltip = -> 
  $('body').append('<div class="rtooltip"></div>')
    
rHandleBind = ( $container ) ->
  
lHandleBind = ( $container ) ->
