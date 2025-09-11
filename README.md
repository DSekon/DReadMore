<p align="center">
  <img src="https://dreadmore.vercel.app/img/og.png"/>
</p>
<p align="center">
  <a href="https://github.com/DSekon/DReadMore/releases">
    <img src="https://badgen.net/github/release/DSekon/DReadMore" alt="Release version"/>
  </a>
</p>
<p align="center">
  <a href="https://dreadmore.vercel.app/get-started">Get Started</a> |
  <a href="https://dreadmore.vercel.app/documentation">Documentation</a> |
  <a href="https://dreadmore.vercel.app">Demo</a>
</p>
<!-- <p align="center">
	<a href="https://www.donationalerts.com/r/dsekon" target="_blank"><img src="https://vercel.app/assets/img/donationalerts.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 296px !important;" ></a>
</p> -->

# DReadMore
#### The plugin for collapsing and expanding long blocks of text. You can DISABLE it using CSS!

# Getting Started With DReadMore

## Installation

There are a few options on how to include/import DReadMore into your project:

### Install from NPM

We can install DReadMore from NPM:

```bash
$ npm install dreadmore
```

```javascript
import DReadMore from 'dreadmore';

const dreadmore = new DReadMore();
```

### Use DReadMore from CDN

We can use DReadMore from CDN:

```html
<script src="https://unpkg.com/dreadmore@2/dreadmore.min.js"></script>
```

### Download assets

If you want to use DReadMore assets locally, you can directly download them from [https://unpkg.com/dreadmore@2](https://unpkg.com/dreadmore@2).

## Add DReadMore HTML Layout

Weček: need to add basic DReadMore layout:

```html
<div class="dreadmore">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit recusandae quas eaque
    laudantiumquo, dolorem vitae quia cupiditate sit, exercitationem suscipit molestiae iste
    dolores eos facere mollitia voluptatibus nihil. Dicta ex blanditiis officiis beatae
    similique neque nostrum consequatur maiores quas!
</div>
<button type="button" data-drm-toggler>Show more</button>
```

## Add CSS Styles

We need to add basic DReadMore CSS:

```css
.dreadmore {
    min-height: 2px;
    overflow: hidden;
}

/* for a disabled toggler */
.dreadmore--disabled {
    display: none;
}
```

**1px min-height** = **1 visible line**.

## Initialize DReadMore

Finally, we need to initialize DReadMore in JS:

```javascript
const dreadmore = new DReadMore();
```

## What's next?

- Go to [Documentation](documentation) to learn more about DReadMore.
- If you have questions about DReadMore, ask them on [StackOverflow](https://stackoverflow.com) or [DReadMore Discussions](https://github.com/DSekon/DReadMore/discussions).

# Documentation

## DReadMore HTML Layout

```html
<div class="dreadmore">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit recusandae quas eaque
    laudantiumquo, dolorem vitae quia cupiditate sit, exercitationem suscipit molestiae iste
    dolores eos facere mollitia voluptatibus nihil. Dicta ex blanditiis officiis beatae
    similique neque nostrum consequatur maiores quas!
</div>
<button type="button" data-drm-toggler>Show more</button>
```

## Initialize DReadMore

`new DReadMore(drmContainer, parameters)` - initialize DReadMore with options:

- **drmContainer** - HTMLElement or string (with CSS Selector) of DReadMore container HTML element. Optional.
- **parameters** - object - object with DReadMore parameters. Optional.
- **Method returns initialized DReadMore instance.**

```javascript
const dreadmore = new DReadMore('.dreadmore', {
    moreText: 'Show more',
    lessText: 'Up'
});
```

## Parameters

- **initialExpand**
  - Type: Boolean
  - Default: false
  - Description: Set to **true** and the text will be expanded at the start.

- **isInitialExpandWhenUpdate**
  - Type: Boolean
  - Default: false
  - Description: Returns in the original state specified in startOpen when the screen is resized.

- **toggler** (new, v2.2.0)
  - Type: String
  - Default: ''
  - Description: The key that is specified in the button attribute (data-drm-toggler).
  - Example:
    ```javascript
    const dreadmore = new DReadMore({
        toggler: 'drmKeyToggler'
    });
    ```
    ```html
    <div class="dreadmore">
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Aspernatur laboriosam
        nobis incidunt quos repellat totam itaque!
    </div>

    <button type="button" data-drm-toggler="drmKeyToggler">
        Show more
    </button>
    ```

- **moreText**
  - Type: String
  - Default: 'Show&nbsp;more'
  - Description: The text of the button when the collapsed text.

- **lessText**
  - Type: String
  - Default: 'Close'
  - Description: The text of the button when the expanded text.

- **beforeToggle**
  - Type: Function
  - Default: ''
  - Description: beforeToggle called after a more or less link is clicked, but before the block is collapsed or expanded.
  - Example:
    ```javascript
    const dreadmore = new DReadMore({
        beforeToggle: function($element, expanded) {
            console.log($element, expanded)
        }
    });
    ```

- **afterToggle**
  - Type: Function
  - Default: ''
  - Description: afterToggle called after the block is collapsed or expanded.
  - Example:
    ```javascript
    const dreadmore = new DReadMore({
        afterToggle: function($element, expanded) {
            console.log($element, expanded)
        }
    });
    ```

## Methods

- **dreadmore.destroy()**
  - Description: Destroy DReadMore instance and detach all events listeners.
  - Example:
    ```javascript
    dreadmore.destroy();
    ```
    ```javascript
    dreadmore[1].destroy();
    ```

- **dreadmore.update()**
  - Description: Updates the DReadMore instance.
  - Example:
    ```javascript
    dreadmore.update();
    ```
    ```javascript
    window.addEventListener('resize', function() {
        dreadmore.forEach(function(item) {
            item.update();
        });
    });
    ```

## Additionally

You can disable in CSS:

```css
.dreadmore {
    min-height: 0px;
}
```