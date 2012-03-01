$ = jQuery  


$.fn.resizeMe = ( method ) ->
  $parent = $(@)
  days = 131
  # window.days = 131
  # window.dayWidth
  # window.handleWidth = 0
  # window.$tooltip
  
  # defaults = 
  #   $parent: $(@)
  #   days: 131
  methods =
    init: ( options )-> 
      @resizeMe.settings = $.extend({}, @resizeMe.defaults, options)   
      @each -> 
        $element = $(@)
        element  = @
        console.log $element.width()
        methods.addTooltip()
        $('.rContainer', this).each ->      
          console.log 'in rContainer each'
          console.log $parent.width()
          
          $container = $(@)
          console.log $container
          $container.prepend('<div class="lHandle"></div><div class="rHandle"></div>')
          methods.rHandleBind( $container, options );
          methods.lHandleBind( $container, options );
    addTooltip: -> 
      $('body').append('<div class="rtooltip"></div>')
      console.log $parent.width()
        

    rHandleBind: ( $container, options ) ->
      $rightHandle = $container.find '.rHandle'
      $rightHandle.bind('mousedown.resize-handle', (e) ->
        methods.positionInit(e, options)
      )
    lHandleBind: ( $container, options ) ->

    # container widths, handle location / offsets, etc.
    # to be passed/used in drag 
    positionInit: ( event, options ) ->
      parentWidth = $parent.width()
      console.log parentWidth

    drag: ( event, context ) ->
  
  #Method calling logic
  if methods[method] 
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ))
  else if typeof method is 'object' || !method 
    return methods.init.apply( this, arguments )
  else
    $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );









