justiflow
=========

JQuery plugin that flows images inside a container, scaling them so they are justified.  Aspect ratio is maintained.

Have a bunch of images you want to display in a container?  The default layout isn't very nice:

This:

    <div style="border: dashed red 1px; width: 650px;">
        <img src="pics/1.jpg">
        <img src="pics/2.jpg">
        <img src="pics/3.jpg">
        <img src="pics/4.jpg">
        <img src="pics/5.jpg">
        <img src="pics/6.jpg">
        <img src="pics/7.jpg">
        <img src="pics/1.jpg">
        <img src="pics/2.jpg">
        <img src="pics/3.jpg">
        <img src="pics/4.jpg">
    </div>

Is yucky:

![Yuck](/docs/yuck.png)

Justiflow makes it nice:

    $(window).load(
            function() { 
                $('div').justiflow({heightHintPx: 100});
            });
        
![Nice](/docs/nice.png)

Justiflow can handle borders, padding, margins, etc:

![Nice](/docs/fancy.png)

    
