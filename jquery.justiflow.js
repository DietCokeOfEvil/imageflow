/**
 * JQuery plugin that flows children nicely inside a container.  Child elements
 * are converted to inline-block and scaled so the layout is justified on both
 * edges.  Scaling preserves aspect ratio.
 *
 * Author: Seth Davenport, http://www.sethdavenport.com
 *
 *  Copyright 2013 Seth Davenport
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function($) {
    "use strict";
    
    $.fn.extend({
        justiflow: function(params) {
            params = $.extend({ heightHintPx: 100 }, params);

            var container = $(this);

            // The point of this plugin is to do the wrapping manually.
            container.css("white-space", "pre");
            container.css("line-height", "0");

            var tiles = container.children();
            var currentWidth = 0;
            var previousRowItems = [];

            // Work out what the container's 'natural' width would be.
            container.css("width", "auto");
            var rowWidth = container.width();

            // Constrain the container to the width we computed, so that
            // the image adjustments below don't cause it to resize.
            container.css("width", rowWidth);

            // Get rid of any text directly inside the image container, to
            // prevent it from messing up the layout.
            container.contents().filter(function(){
                return this.nodeType === 3;
            }).remove();

            tiles.each(function() {
                var tile = $(this);

                // Save the item's original aspect ratio for future
                // calculations.
                if (!tile.data('jquery.imageflow.aspect-ratio')) {
                    tile.data(
                        'jquery.imageflow.aspect-ratio',
                        tile.width() / tile.height());
                }

                // Do a preliminary scale using the heigh hint directly.  This
                // is so I can estimate how many items to put in each row.
                tile.css("display", "inline-block");
                tile.css("height",  params.heightHintPx);
                tile.css("width",   params.heightHintPx * tile.data('jquery.imageflow.aspect-ratio'));

                // Once I have a complete row, scale it further such that it
                // occupies exactly the container's width.
                if (currentWidth + tile.outerWidth(true) >= rowWidth) {
                    var percent = rowWidth / currentWidth;
                    var adjustedRowWidth = 0;

                    var outerheight = previousRowItems[0].outerHeight(true);
                    var adjustedOuterHeight = outerheight * percent;

                    // Compensate for margins, border size, padding on the images.
                    var yBoxPadding = outerheight - previousRowItems[0].height();

                    if (previousRowItems.length > 0) {
                        for (var j=0; j<previousRowItems.length-1; ++j) {
                            var item = previousRowItems[j];
                            var newHeight = adjustedOuterHeight - yBoxPadding;

                            item.css("height", newHeight);
                            item.css("width", newHeight * item.data('jquery.imageflow.aspect-ratio'));
                            adjustedRowWidth += item.outerWidth(true);
                        }
                    }

                    // Make sure the last image in the row accounts for any
                    // accumulated rounding error.
                    var lastItem = previousRowItems[previousRowItems.length - 1];
                    var xBoxPadding = lastItem.outerWidth(true) - lastItem.width();

                    // Compensate for margins, border size, padding on the images.
                    lastItem.css("height", adjustedOuterHeight - yBoxPadding);
                    lastItem.css("width", rowWidth - adjustedRowWidth - xBoxPadding);

                    tile.before("\n");
                    currentWidth = 0;
                    previousRowItems = [];
                }

                currentWidth += tile.outerWidth(true);

                previousRowItems.push(tile);
            });

            return $(this);
        }
    });
})(jQuery);
