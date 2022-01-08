# [DReadMore by DSekon](https://dreadmore.dsekon.com "DReadMore by DSekon")
<p align="center">
  <a href="https://github.com/DSekon/DReadMore/releases">
    <img src="https://badgen.net/github/release/DSekon/DReadMore" alt="Release version"/>
  </a>
</p>
<p align="center">
	<a href="https://www.buymeacoffee.com/DSekon" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 214px !important;" ></a>
</p>

#### The plugin for collapsing and expanding long blocks of text
### [Demo](https://dreadmore.dsekon.com "Demo")
## Getting Started With DReadMore
### Include Files To Website

After that we need to include DReadMore JS file to our website. In your html file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    ...
</head>
<body>
    ...
    <script src="path/to/DReadMore.min.js"></script>
</body>
</html>
```
### Add HTML Layout
Now, we need to add basic DReadMore layout:
```html
<div class="d-readmore">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit recusandae quas eaque
    laudantiumquo, dolorem vitae quia cupiditate sit, exercitationem suscipit molestiae iste
    dolores eos facere mollitia voluptatibus nihil. Dicta ex blanditiis officiis beatae
    similique neque nostrum consequatur maiores quas!
</div>
<button type="button"
        data-drm-toggler>Show more</button>
```

### Add CSS Styles
After that, we may need to set DReadMore min-height and overflow in your CSS file:
```css
.d-readmore {
    min-height: 2px;
    overflow: hidden;
}

/* for a disabled toggler */
.d-readmore--disabled {
    display: none;
}
```
Set a **min-height** based on lines, you could do so in CSS: **1px - 1 line**
## Documentation
### Options
Let's look on list of all available parameters:

| Parameter | Type | Default | Description |
| ------------- | ------------- | :------------- | ------------- |
| initialExpand | boolean | false | Set to <b>true</b> and the text will be expanded at the start |
| isInitialExpandWhenUpdate | boolean | false | Returns in the original state specified in startOpen when the screen is resized |
| moreText | string | 'Show&nbsp;more' | The text of the button when the collapsed text |
| lessText | string | 'Close' | The text of the button when the expanded text |

Example:

```javascript
const dreadmore = new DReadMore({
    initialExpand: true,
	isInitialExpandWhenUpdate: true,
    moreText: 'Show more',
    lessText: 'Up'
});
```

### Callbacks
After that we need to include DReadMore JS file to our website. In your html file:

```javascript
const dreadmore = new DReadMore({
    // beforeToggle called after a more or less link is clicked, 
    // but before the block is collapsed or expanded
    beforeToggle: function($element, expanded) {
        console.log($element, expanded)
    },

    // afterToggle called after the block is collapsed or expanded
    afterToggle: function($element, expanded) {
        console.log($element, expanded)
    }
});
```

### Destroy
If you really want to be that guy...
```javascript
dreadmore.destroy();
```

### Disable
Aaaaaand you can disable in CSS :D
```css
.d-readmore {
    min-height: 0px;
}
```
