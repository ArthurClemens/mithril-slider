# Content Slider for Mithril on mobile and desktop

Handles series of pageable content. This code is a Mithril component wrapper around [HammerJS](http://hammerjs.github.io/), with additional features.

Compatible with Mithril 1.0.



## Examples

[Examples](https://github.com/ArthurClemens/mithril-slider/tree/master/packages/examples)



## Features

* Elements can be swiped or dragged.
* Content can be anything that can be shown with HTML: a single image, a card, and so on.
* Elements can be grouped, for instance for series of thumbnails that are shown a group at a time.
* Elements content can be lazily loaded (see example code).
* The slider can be controlled with next/previous buttons and queried for state.
* Right-to-left language support, using mirrored transitions.



## Installation

### As npm module:

~~~bash
npm install --save mithril-slider
~~~

### Or download from Github

* `git clone https://github.com/ArthurClemens/mithril-slider.git`
* `cd mithril-slider`
* Install Lerna globally: `npm install -g lerna`
* `npm install`
* `lerna init`
* `lerna bootstrap`

To build the source:

* `cd packages/mithril-slider`
* `npm run build`

To run the examples:

* `cd packages/examples`
* `npm run dev`
* Open browser at [localhost:3000](http://localhost:3000/)



## Usage

~~~javascript
import { slider } from 'mithril-slider';
~~~

Slider panel contents is called a "page". Call the slider as component, with (at least) options `pageData` and `page`:

~~~javascript
m(slider, {
  pageData,
  page
})
~~~

For option `pageData`, create a function to fetch page data:

~~~javascript
const getPageData = () =>
  m.request({
    method: 'GET',
    url: 'app/data/images.json',
    background: false
  });
~~~

The function needs to return a promise (which `m.request` does).

The data can be anything, as long as a list is passed in the end. For example:

~~~json
[
  "images/1.jpg",
  "images/2.jpg"
]
~~~

or

~~~json
[
  {
    "title": "Love Valley, Cappadocia",
    "image": "images/1.jpg"
  },
]
~~~

For option `page`, create a function that returns a Mithril object for each single data item:

~~~javascript
const page = opts =>
  m('.page', {
    style: {
      backgroundImage: `url(${opts.data})`
    }
  });
~~~

This function will be called for all list items.


### Optimizing with lazy loading

The `page` function is called for all items in the list, so in the current form all images will get downloaded. For longer sliders this is not ideal, especially not on mobile.

We can optimize this by only loading the current, next and previous image:

~~~javascript
const page = opts => {
  const currentIndex = opts.currentIndex;
  const listIndex = opts.listIndex;
  const data = opts.data;
  const style = (Math.abs(currentIndex - listIndex) < 2)
    ? { backgroundImage: `url(${data})` }
    : null;
  return m('.page', {
    style: style
  });
};
~~~


### Sliding multiple pages

When showing more than one "page", for instance a series of thumbnails, use option `groupBy`:

~~~javascript
const mySlider = m(slider, {
  pageData,
  page,
  groupBy: 3
});
~~~

For responsive interfaces, the number of pages within a group may be set dynamically (for instance divide the window width by the number of items to show).

No additional HTML markup is created for groups.

Use CSS to set the proper page size for each element.



### Slider controls

The above example is fine for simply interacting with the slider (swiping/dragging). For more advanced functionality - for instance to conditionally show next/previous buttons - we need to access the slider instance.

By passing option `sliderController`, we can get a reference to the slider controller. The option is actually a function reference, and we can use `m.prop` to store the controller for later reference:

~~~javascript
const app = {
  view: vnode => {
    const mySlider = m(slider, {
      pageData,
      page,
      sliderController: ctrl => vnode.state.sliderController = ctrl,
      ...
    });
  }
};
~~~

Now we can access slider controller methods:

~~~javascript
const sliderController = vnode.state.sliderController;
const nextButton = m("a.next", {
  class: sliderController.hasNext()
    ? "enabled"
    : "disabled",
  onclick: () => sliderController.goNext()
}, "Next")
~~~


### Styling

Note: With horizontal orientation and `position: absolute`, the page must have a width;
with vertical orientation and `position: absolute`, the page must have a height.

There is very little CSS involved. The simplest approach is to link to the CSS file `dist/mithril-slider.css`, or copy the few lines to your own project.

Alternatively, Mithril Slider comes with a JavaScript based CSS object that is prepared for [j2c](https://github.com/pygy/j2c), but does not import j2c itself. In the examples the CSS object is used to add styles to head:

~~~javascript
import { css } from "mithril-slider";
import { addStyle } from "../app/styler";
addStyle("slider", css);
~~~



### Configuration options

| **Parameter** |  **Mandatory** | **Type** | **Default** | **Description** |
| ------------- | -------------- | -------- | ----------- | --------------- |
| **page** | required | Function :: ({data :: any, listIndex :: Number, currentIndex :: Number}) => Mithril Template or String | | Function that creates an page from data |
| **pageData** | required | Function :: () => Promise | | Function that fetches a list of page data; should return a promise; after resolving `m.redraw` is called |
| **sliderController** | optional | Function :: () => Function | | Receives the slider controller function |
| **class** | optional | String |  | Extra CSS class appended to 'slider' |
| **duration** | optional | Number | 200 | Default transition duration in ms (when not dragging); when dragging, duration is dependent on dragging velocity, this setting is the maximum duration for slow drags |
| **orientation** | optional | String | 'horizontal' | Either 'horizontal', 'vertical' or 'all'; translates to HammerJS's `direction` |
| **rtl** | optional | Boolean | `false` | Right-to-left language support (for instance Arabic and Hebrew); set to true to mirror transitions |
| **pageOffsetX** | optional | Number | 0 | The offset when the page element is displayed with an x offset relative to the slider container |
| **pageOffsetY** | optional | Number | 0 | The offset when the page element is displayed with an y offset relative to the slider container |
| **groupBy** | optional | Number | | Number of items within a group |
| **before** | optional | Mithril template or component | | Content shown before the pages; has class `before` |
| **after** | optional | Mithril template or component | | Content shown after the pages; has class `after` |
| **index** | optional | Number | 0 | Starting page index |
| **cancelDragFactor** | optional | Number | 1/5 | Fraction of page width below which the transition is cancelled |
| **getState**  | optional | Function(state {Object}) | | Callback function that accepts the slider state (Object with properties `index` {Number}, `hasNext` {Booleam}, `hasPrevious` {Boolean}, `pageEl` {HTMLElement}) |


### Slider controller methods

| **Method** |  **Type** | **Description** |
| ---------- | --------- | --------------- |
| **index** | index() => Number | The current page (index of the page list) |
| **hasNext** | hasNext() => Boolean | True if the current page has a next page  |
| **hasPrevious** | hasPrevious() => Boolean | True if the current page has a previous page  |
| **goTo** | goTo(index :: Number, duration :: Number) | Change the current page to the given index; transition duration is optional |
| **goCurrent** | goCurrent(duration :: Number) | Go to current page; useful after resize; transition duration is optional |
| **goNext** | goNext(duration :: Number) | Change the current page to the next index; if no next index exists, index is unchanged; transition duration is optional |
| **goPrevious** | goPrevious(duration :: Number) | Change the current page to the previous index; if no previous index exists, index is unchanged; transition duration is optional |



## CSS classes

| **Element**          | **Key**       |  **Class** |
| -------------------- | ------------- | ---------- |
| slider               | slider        | `mithril-slider`   |
| content              | content       | `mithril-slider__content`  |
| before               | before        | `mithril-slider__before`   |
| after                | after         | `mithril-slider__after`    |



## Size

Minified and gzipped: 1.8 Kb



## Dependencies

* [Mithril 0.2](https://www.npmjs.com/package/mithril)
* [HammerJS](http://hammerjs.github.io/)



## Licence

MIT
