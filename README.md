# Content Slider for Mithril on mobile and desktop

Handles series of pageable content. This code is a Mithril component wrapper around [HammerJS](http://hammerjs.github.io/), with additional features.

Version 0.1.3


## Features

* Pages can be swiped or dragged.
* Page content can be anything that can be shown with HTML: a single image, a full web page, and so on.
* Pages can be grouped, for instance for series of thumbnails that are shown a group at a time.
* Page content can be lazily loaded (see example code).
* The slider can be controlled with next/previous buttons and queried for state.


## Examples

* [Slider Examples](http://arthurclemens.github.io/mithril-slider/index.html)


## Installation

Either:

* Download or clone from Github
* `npm install mithril-slider`

For development:

* In the root directory: `npm install`


## Usage

	import slider from 'mithril-slider';

Call the slider as component, with (at least) parameters `pageData` and `page`:

    m.component(slider, {
		pageData: getPageData,
        page: createPage
    })

For parameter `pageData`, create a function to fetch page data:

	const getPageData = () => {
	    return m.request({
	        method: 'GET',
	        url: 'app/data/images.json',
	        background: false
	    });
	};

The function needs to return a promise (which `m.request` does).

The data can be anything, as long as a list is passed in the end. For example:

	[
	    "app/images/img/1.jpg",
		"app/images/img/2.jpg",
		...
	]

or

	[
		{
			"title": "Love Valley, Cappadocia",
			"image": "app/images/img/1.jpg"
		},
		...
	]

For parameter `page`, create a function that returns a Mithril object for each single list item:

	const createPage = (opts) => {
		const data = opts.data;
	    return m('.page', {
			style: {
				'background-image': 'url(' + data + ')'
			}
	    });
	};

This function will be called for all list items.


### Optimizing with lazy loading

The `createPage` function is called for all items in the list, so in the current form all images will get downloaded. For longer sliders this is not ideal, especially not on mobile.

We can optimize this by only loading the current, next and previous image:

	const createPage = (opts) => {
		const currentIndex = opts.currentIndex;
		const listIndex = opts.listIndex;
		const data = opts.data;
	    const style = (Math.abs(currentIndex - listIndex) < 2)
	        ? {
	              'background-image': 'url(' + data + ')'
	          }
	        : {};
	    return m('.page', {
	        style: style
	    });
	};


### Sliding multiple pages

When showing more than one "page", for instance a series of thumbnails, simply use parameter `groupBy`:

	const mySlider = m.component(slider, {
	    pageData: getPageData,
	    page: createPage,
	    groupBy: 3
	});

For responsive interfaces, the number of pages within a group should be set dynamically (for instance divide the window width by the number of items to show).

No additional HTML markup is created for groups.

Use CSS to set the proper page size for each element.




### Accessing the slider directly

The above example is fine for simply interacting with the slider (swiping/dragging). For more advanced functionality - for instance to conditionally show next/previous buttons - we need to access the slider instance.

By passing parameter `sliderController`, we can get a reference to the slider controller. The parameter is actually a function reference, and we can use `m.prop` to store the controller for later reference:

	let app = {};
	app.controller = () => {
	    return {
	        sliderController: m.prop()
	    };
	};
	app.view = (ctrl) => {
	    const mySlider = m.component(slider, {
	        pageData: getPageData,
	        page: page,
	        sliderController: ctrl.sliderController,
	        ...
	    });
		...
	};

Now we can access slider controller methods:

	const sliderController = ctrl.sliderController();
	const button = sliderController ? m('a.next', {
        class: sliderController.hasNext() ? 'enabled' : '',
        onclick: () => sliderController.goNext()
    }, 'Next') : null;
	


### Styles

With horizontal orientation and `position: absolute`, the page must have a width;
With vertical orientation and `position: absolute`, the page must have a height.



### Configuration parameters

| **Parameter** |  **Mandatory** | **Type** | **Default** | **Description** |
| ------------- | -------------- | -------- | ----------- | --------------- |
| **page** | required | Function :: ({data :: any, listIndex :: Number, currentIndex :: Number}) => Mithril Template or String | | Function that creates an page from data | 
| **pageData** | required | Function :: () => Promise | | Function that fetches a list of page data; should return a promise; after resolving `m.redraw` is called |
| **sliderController** | optional | Function :: () => Function | | Receives the slider controller function |
| **class** | optional | String |  | Extra CSS class appended to 'slider' |
| **duration** | optional | Number | 250 | Default transition duration in ms (when not dragging); when dragging, duration is dependent on dragging velocity, this setting is the maximum duration for slow drags |
| **orientation** | optional | String | 'horizontal' | Set to 'vertical' to create a vertically swiping page list |
| **groupBy** | optional | Number | | Number of items within a group | 
| **before** | optional | Mithril template or component | | Content shown before the pages; has class `before` |
| **after** | optional | Mithril template or component | | Content shown after the pages; has class `after` |
| **index** | optional | Number | 0 | Starting page index |
| **cancelDragFactor** | optional | Number | 1/5 | Fraction of page width below which the transition is cancelled |


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



## Size

Minified and gzipped: 1.8 Kb



## Dependencies

* [Mithril](https://www.npmjs.com/package/mithril)
* [HammerJS](http://hammerjs.github.io/)



## Licence

MIT

