justiflow
=========

JQuery plugin that flows images inside a container, scaling them so they are justified. Aspect ratio is maintained.

Have a bunch of images you want to display in a container?  The default layout isn't very nice:

This:

```html
<div style="border: dashed red 1px;">
    <img src="pics/1.jpg">
    ...
    <img src="pics/n.jpg">
</div>
```

Is yucky:

![Yuck](/docs/yuck.png)

Justiflow makes it nice:

```javascript
$(window).load(
        function() { 
            $('div').justiflow({heightHintPx: 100});
        });
```

![Nice](/docs/nice.png)

Justiflow can handle borders, padding, margins, etc:

![Nice](/docs/fancy.png)

[Complete example file](./docs/demo.html)
