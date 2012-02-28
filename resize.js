/*
 *
 *
 *
 *
 *
 */     
 
 // potential issues.  Setting css width on the container to the equivalent of the outerwidth.
 // this isn't wise considering potential padding or borders. Requires addition of box-sizing on resized element.
    
(function($) {  
  var $parent,
      days = 131,
      dayWidth,
      handleWidth = 0,
      $tooltip;
      
  $.fn.jResize = function( options ) {

    var settings = $.extend( { //I'd like to be able to define / overwrite some settings, class names for handles etc.

    }, options);
    return this.each(function() {

      // parent is the same for all, YET
      // each instance in the wrapped set - the container,
        $parent = $(this);
        addTooltip();

        $('.rContainer', this).each(function() {
          //handleWidth = $('.rContainer .lHandle').width();
          console.log('in rContainer each');
          var  $container      = $(this); // overwrite this in settings? 
          $container.prepend('<div class="lHandle"></div><div class="rHandle"></div>');
          rHandleBind($container);
          lHandleBind($container);
        });
    }); // return this
  }; // end fn
  
  var addTooltip = function() {
    $('body').append('<div class="rTooltip"></div>');
  }
  var showTooltip = function() {
    
  }
  
  var rHandleBind = function( $container) {    
    var $rtHandle = $container.find('.rHandle'); // var name from settings?
    
    $rtHandle.bind('mousedown.resize-handle', function(e) {
      
      $tooltip = $('.rTooltip');
      handleWidth = $('.rHandle').width();
      
      var parentWidth = $parent.width(), // seem static, but if window resized, and flexible container these change.
          parentRtOffset = $parent.offset().left + parentWidth,
          rtHandleOrigX = e.pageX,
          containerTop = $container.offset().top,
          containerWidth = $container.outerWidth(),
          containerRtOffset = $container.offset().left + containerWidth,  // getting page level pixel position of rt side of container.
          
          // determine the difference between the rightmost side of the 
          // container and where the user clicks on the handle
          // used to keep user from dragging outside of the parent container.
          rtHandlePixelOffset = containerRtOffset - rtHandleOrigX,
          
          // tooltip variables & dates
          tooltipTop = containerTop - $tooltip.outerHeight() - 10, // positioning 10px above container being resized
          tooltipLeft = containerRtOffset - ($tooltip.outerWidth()),
          containerRtPosition = $container.position().left + containerWidth,          
          dayWidth = parentWidth / days,
          startDay = moment([ 2012, 0, 18]),
          rightDate = (($container.position().left + containerWidth) / dayWidth),
          allocationDuration = Math.round(containerWidth / dayWidth);
          
          //console.log('parentWidth: ' + $parent.width() + ' daywidth: ' + dayWidth + ' borderWidth: ' + parentBorderWidth);
          
      // show the tooltip on mousedown
      $tooltip.addClass('rHtooltip').show().css({
        left: tooltipLeft,
        top: tooltipTop,
        'z-index': 999
      }).html( '<div>' + startDay.add('days', rightDate).format("MMMM Do YYYY") + " Length of Allocation: " + allocationDuration + ' Days');
        
      $(document).bind('mousemove.resize', function(v) {
        rtHandleNewX = v.pageX;
        containerNewWidth = rtHandleNewX - rtHandleOrigX + containerWidth;

        // keeps user from navigating rt handle outside of parent bounds, or compressing handles. May want to change that.
        if ( containerNewWidth >= handleWidth*2 && rtHandleNewX + rtHandlePixelOffset <= parentRtOffset) { 
          $container.css({
            width: containerNewWidth
          });
          
          containerRtOffset = $container.offset().left + containerNewWidth;

          var startDay = moment([ 2012, 0, 18]);
          var rightDate = (($container.position().left + containerNewWidth) / dayWidth);
          var allocationDuration = Math.round(containerNewWidth / dayWidth);
          
          $tooltip.css({
            left: containerRtOffset - ($tooltip.outerWidth())
          }).html( '<div>' + startDay.add('days', rightDate).format("MMMM Do YYYY") + " Length of Allocation: " + allocationDuration + ' Days');
          
        }
      });
      $(document).bind('mouseup.resize', function(v) {  // acting on doc level, when bound to parent, didn't work smoothly.
        $(document).unbind('.resize');
        
        var containerNewWidth = $container.outerWidth();
                newWidth = Math.round(Math.round((containerNewWidth)/dayWidth) * dayWidth);
                //var newWidth = $parent.width() - newLeft;
                
                //var rtContainerEdge = $container.position().left + containerNewWidth;
                //var newWidth = rtContainerEdge - newLeft;
                
                console.log(newWidth);
                
                $container.css('width', newWidth);
                
        // tooltip hide/dates mostly for dev.
        $tooltip//.hide()
        .removeClass('rHtooltip');
        var startDay = moment([ 2012, 0, 18]);
        var rightDate = (($container.position().left + containerNewWidth) / dayWidth);
        var allocationDuration = Math.round(containerNewWidth / dayWidth);
        
        $tooltip.css({
          left: containerRtOffset - ($tooltip.outerWidth())
        }).html( '<div>' + startDay.add('days', rightDate).format("MMMM Do YYYY") + " Length of Allocation: " + allocationDuration + ' Days');
      });

      return false;
    });
  };
  
  var lHandleBind = function( $container ) {
    var $lHandle = $container.find('.lHandle'), // var name from settings?
        containerNewWidth;        
        
    $lHandle.bind('mousedown.resize-handle', function(e) {
      $tooltip = $('.rTooltip');
      handleWidth = $('.lHandle').width();
      
      console.log('$parent.width()  ' + $parent.width());
      
      var parentWidth   = $parent.width(), // seem static, but if window resized, and flexible container these change.
          lHandleOrigX  = e.pageX,
          parentLftBorderWidth = $parent.css('border-left-width'),
          parentRtBorderWidth = $parent.css('border-right-width'),

          containerLtHandlePixelOffset = $container.offset().left,
          containerLeft  = $container.position().left,
          containerWidth = $container.outerWidth(),
          
          // tooltip dimensions & date
          containerTop  = $container.offset().top,
          tooltipTop    = containerTop - $tooltip.outerHeight() - 10, // positioning 10px above container being resized
          dayWidth      = parentWidth / days,
          startDay      = moment([ 2012, 0, 18]),
          leftDate      = ($container.position().left / dayWidth), // note anywhere where there is $container.position().left you need to account for the border
          allocationDuration = Math.round(containerWidth / dayWidth);
          
          console.log('containerLeft: ' + containerLeft + 'containerWidth without the -1 ' + $container.outerWidth() + 'containerWidth - adjusted by -1 px: ' + containerWidth);
          
        
      // tooltip on mousedown    
      $tooltip.addClass('lHtooltip').show().css({
        left: containerLtHandlePixelOffset,
        top: tooltipTop,
        'z-index': 999
      }).html( '<div>' + startDay.add('days', leftDate).format("MMMM Do YYYY") + " Length of Allocation: " + allocationDuration + ' Days');

      $(document).bind('mousemove.resize', function(v) {

        var lHandleNewX = v.pageX,
            containerNewWidth = (lHandleOrigX - lHandleNewX) + containerWidth,
            // because position.left() includes a border if there is one we need to subtract that border
            // so that the container is positioned to 0 within the parent element.
            containerNewLeft  = lHandleNewX - lHandleOrigX + containerLeft - parseInt(parentLftBorderWidth, 10); // working off of left position 
            
        if ( containerNewWidth >= handleWidth*2 && containerNewLeft >= 0 ) { 
          $container.css({
            width: containerNewWidth,
            left: containerNewLeft
          });
          
          
          var containerNewOffsetLeft = $container.offset().left;
          
          console.log('containerNewWidth ' + containerNewWidth + 'containerNewLeft ' + containerNewLeft);
          
          // var output = JST['backbone/templates/project/detail/allocation/tooltip'](
          //   {
          //     date: $container.position().left,
          //     days: containerNewWidth
          //   });
        
          
          var startDay = moment([ 2012, 0, 18]);
          var leftDate = ($container.position().left / dayWidth);
          var allocationDuration = Math.round(containerNewWidth / dayWidth);

          $tooltip.css({
            left: containerNewOffsetLeft
          }).html( '<div>' + startDay.add('days', leftDate).format("MMMM Do YYYY") + " Length of Allocation: " + allocationDuration + ' Days');
        }
      });

      $(document).bind('mouseup.resize', function(v) {
        $(document).unbind('.resize');
        
        // snap logic on mouse release, round and reset the left and width
                 var left = $container.css('left');
                 var containerNewWidth = $container.outerWidth();
                 //var newWidth = Math.round((containerNewWidth)/dayWidth) * dayWidth; // something is funky here.
                 //var newLeft = Math.round(parseInt($container.css('left'), 10)/dayWidth) * dayWidth;
                 
                 // newLeft:
                 // parsing the float to drop the px on the left amt.
                 // rounding the divisor of the left/dayWidth to get a rounded integer for the 'snap' logic
                 // multiplying the integer by the 'snap pixel amount'
                 // rounding this AGAIN as the dayWidth aka 'snap pixel amount' is also a float. 
                 // Don't want browsers rounding for us, so rounding to deal only in integers to fix for round errors in
                 // width and left.
                 
                 //var newLeft = Math.round(Math.round(parseFloat($container.css('left'), 10)/dayWidth) * dayWidth);
                 var newLeft = Math.round(Math.round(parseFloat($container.css('left'), 10)/dayWidth) * dayWidth);
                 // newWidth
                 // determine the right edge of the container on mouse release.
                 // subtract the newLeft amount from that amount
                 // set the remainder to the newWidth. 
                 // This assures there is no pixel fluctuation on the right side
                 // fixing the width respective of the end date selected.
                 
                 var rtContainerEdge = $container.position().left + containerNewWidth;
                 
                 // finding the newly sized to right edge of the container
                 // subtracting the rounded / snapped left value, and subtracting it from that rt edge location
                 // adjusting for the width of the left border, as $container.position().left gives a position that 
                 // included the left border NOT zero. And we want to reset that to zero.
                 
                 var newWidth = rtContainerEdge - newLeft - parseInt(parentLftBorderWidth, 10); 
                 console.log('parentLftBorderWidth: ' + parseInt(parentLftBorderWidth, 10));
                 // var newWidth = $parent.width() - newLeft;
                 //var newWidth = containerNewWidth - (left - newLeft);
                 
                 console.log("newLeft: " + newLeft + " rtContainerEdge: " + rtContainerEdge + " $parent.width()" + $parent.width() + "Round portion of newLeft: " + Math.round(parseFloat($container.css('left'), 10)/dayWidth));
                 
                 if (newWidth === 0) {
                   newWidth = handleWidth*2;
                   newLeft = newLeft - newWidth;
                   console.log('in if newWidth: ' + handleWidth + 'newLeft: ' + newLeft);
                 }
                 $container.css({
                   'left': newLeft,
                   'width': newWidth
                 });       
                 
        // always showing tooltip for dev.
        $tooltip//.hide()
        .removeClass('lHtooltip');
        
        // mostly for dev - to see what the date snaps to
        var startDay = moment([ 2012, 0, 18]);
        var leftDate = ($container.position().left / dayWidth);
        var allocationDuration = Math.round(containerNewWidth / dayWidth);

        $tooltip.css({
          left: $container.offset().left
        }).html( '<div>' + startDay.add('days', leftDate).format("MMMM Do YYYY") + " Length of Allocation: " + allocationDuration + ' Days');
      });
      return false;
    }); // lHandle bind
  }; // lHandleBind
})(jQuery);