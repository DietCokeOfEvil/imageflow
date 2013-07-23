/** 
 * JQuery plugin that flows images nicely inside a container.  
 * Scaling preserves aspect ratio.
 * 
 * Author: Seth Davenport, http://www.sethdavenport.com
 *
 *  Copyright 2013 Seth Davenport
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($) {
    $.fn.extend({
        imageFlow: function(params) {
            params = $.extend({ heightHintPx: 100 }, params);
            
            var container = $(this);

            // The point of this plugin is to do the wrapping manually.
            container.css("white-space", "pre");
            container.css("line-height", "0");

            var containedImages = container.children('img');
            var currentWidth = 0;
            var previousRowItems = new Array();

            // Work out what the container's 'natural' width would be.
            container.css("width", "auto");
            var rowWidth = container.width();

            // Get rid of any text directly inside the image container, to 
            // prevent it from messing up the layout.
            container.contents().filter(function(){
                return this.nodeType === 3;
            }).remove();

            containedImages.each(function() {
                var image = $(this);

                // Decide how many images go in the current row using the height hint.
                image.css("display", "inline-block");
                image.css("width", "auto");
                image.css("height", params.heightHintPx);

                if (currentWidth + image.outerWidth(true) >= rowWidth) {
                    // Once we have a complete row, scale it further such that it
                    // occupies exactly the container's width.
                    
                    var percent = rowWidth / currentWidth;
                    var adjustedRowWidth = 0;

                    var outerheight = previousRowItems[0].outerHeight(true);
                    var adjustedOuterHeight = Math.round(outerheight * percent);

                    // Compensate for margins, border size, padding on the images.
                    var yBoxPadding = outerheight - previousRowItems[0].height();

                    for (j=0; j<previousRowItems.length-1; ++j) {
                        var item = previousRowItems[j];
                        item.css("width", "auto");
                        item.css("height", adjustedOuterHeight - yBoxPadding);
                        adjustedRowWidth += item.outerWidth(true);
                    }

                    // Make sure the last image in the row accounts for any
                    // accumulated rounding error.
                    var lastItem = previousRowItems[previousRowItems.length - 1];
                    var xBoxPadding = lastItem.outerWidth(true) - lastItem.width();

                    // Compensate for margins, border size, padding on the images.
                    lastItem.css("height", adjustedOuterHeight - xBoxPadding);
                    lastItem.css("width", rowWidth - adjustedRowWidth - xBoxPadding);
                    
                    image.before("\n");
                    currentWidth = 0;
                    previousRowItems = new Array();
                }

                currentWidth += image.outerWidth(true);
        
                previousRowItems.push(image);
            });
    
            // Constrain the container to the width we computed, so that
            // the image adjustments below don't cause it to resize.
            container.css("width", rowWidth);
            
            return $(this);
        }
    });
})(jQuery);
