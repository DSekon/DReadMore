# dReadMore by DSekon
##### jQuery plugin for collapsing and expanding long blocks of text
## Getting Started With dReadmore.js
### Include Files To Website

After that we need to include dReadmore JS file to our website. In your html file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>
    ...
    <script src="path/to/dReadmore.min.js"></script>
</body>
</html>
```
### Add HTML Layout
Now, we need to add basic dReadmore layout:
```html
<div class="d-readmore-wrapp">
    <div class="d-readmore">Lorem Ipsum is simply dummy text of
    the printing and typesetting industry. Lorem Ipsum has been
    the industry's standard dummy text ever since the 1500s, when
    an unknown printer took a galley of type and scrambled it
    to make a type specimen book.</div>
    <span class="d-readmore_btn"></span>
</div>
```

### Add CSS Styles
After that, we may need to set dReadmore min-height and overflow in your CSS file:
```css
.d-readmore {
    min-height: 2px;
    overflow: hidden;
}
```
Set a **min-height** based on lines, you could do so in CSS: **1px - 1 line**
## Documentation
### Options
Let's look on list of all available parameters:

| Parameter | Type | Default | Description |
| ------------- | ------------- | :-------------: | ------------- |
| id | string | "d-readmore-" + i | Assigned to a text container.<br />i - it's a number in order |
| startOpen | boolean | false | Set to <b>true</b> and the text will be expanded at the start |
| moreText | string | "Show more" | The text of the button when the collapsed text |
| lessText | string | "Close" | The text of the button when the expanded text |
| duration | number | 250 | In <b>milliseconds</b>. The animation speed of expand and collapse |
| timing | string | "ease" | Tranisition timing function |
| returnInitialState | boolean | false | Returns in the original state specified in startOpen when the screen is resized |

Example:

```javascript
$(".d-readmore").dReadmore({
        id: 3,
        startOpen: true,
        moreText: "Down",
        lessText: "Up",
        duration: 300,
        timing: "cubic-bezier(0.42,0,0.58,1)"
    });
```

### Callbacks
After that we need to include dReadmore JS file to our website. In your html file:

```javascript
$(".d-readmore").dReadmore({
    // beforeToggle called after a more or less link is clicked, 
    // but before the block is collapsed or expanded
    beforeToggle: function($element, expanded) {
        if (!expanded) {
            console.log("true")
        }
    },

    // afterToggle called after the block is collapsed or expanded
    afterToggle: function($element, expanded) {
        if (expanded) {
            console.log("true")
        }
    }
});
```
### Destroy
If you really want to be that guy...
```javascript
$(".d-readmore").dReadmore('destroy');
```
