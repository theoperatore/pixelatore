# Pixelatore

Lightning speed pixelation of images rendered to a `<canvas>`.

Demo [here](http://anpetersen.me/pixelatore)

## Module or Module?

There are two ways to use *pixelatore*:

1. include *pixelatore* in a `<script>` tag.
2. using [browserify](http://browserify.org), require *pixelatore*.

## General Usage

```javascript
//tell THE PIXELATORE where and what to draw
pixelatore.init(whereToDraw, whatToDraw);

//tell THE PIXELATORE to draw it
pixelatore.draw();
```

Param *whereToDraw* needs to be any `<canvas>` element, or *the context obtained by `canvas.getContext('2d')`*

Param *whatToDraw* can be any image drawable by a [canvas](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Using_images#Getting_images_to_draw).


## Pixelate anything! ... thats an image ...

Simply provide the path or url of any image, as well as a `<canvas>` and let *pixelatore* do the rest.

Assuming the following setup (if you include *pixelatore* in a script instead of require it, then you have access to the global object *pixelatore* making these examples basically the same):
``` javascript
var pixelatore = require('./path/to/pixelatore.node.js'),
    canvas = document.getElementById('myCanvas');
```

Tell *pixelatore* where to draw and what to load
```javascript
pixelatore.init(canvas, 'http://lorempixel.com/500/500/animals');
pixelatore.draw(); //draw it...but PIXELATED!

```

### But I have my own image already loaded!
*pixelatore* is also smart enough to know if you give it an image resource instead of a path to an image to load.

Assuming the same setup as above with these differences:

``` javascript
var customImg = new Image();
customImg.src ='http://lorempixel.com/500/500/animals';
```

When the image is done doing it's thing, just tell *pixelatore.init* which image to draw where.

```javascript
pixelatore.init(canvas, customImg);
pixelatore.draw();
```

Cool, you made your own image using javascript. What about an html image? Since making an image using the `Image()` constructor is the same as loading an image via html `<img>`, just grab the image by id (or some other cool way), and tell pixelatore what to draw and where to draw.

```html
<!-- in your html -->
<img id='pImg' src='http://lorempixel.com/500/500/animals'>
```

Then in js assuming the same setup as above:

```javascript
var image = document.getElementById('pImg');

pixelatore.init(canvas, image);
pixelatore.draw();
```

**Even other canvases...**

As long as the image to draw is [drawable by the canvas](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial/Using_images#Getting_images_to_draw), you can pixelate it!

```javascript
//assuming <canvas> elements defined in html
var primary = document.getElementById('primaryCanvas'),
    secondary = document.getElementById('secondaryCanvas'),

    //need context to draw something on the secondary canvas
    sCtx = secondary.getContext('2d');

//draw an awesome green circle on the secondary canvas via the context
sCtx.beginPath();
sCtx.fillStyle = '#80C54B';
sCtx.arc(secondary.width/2, secondary.height/2, secondary.height/4, 0, 2*Math.PI, false);
sCtx.fill();

//use the secondary canvas as the image to pixelate
pixelatore.init(primary, secondary);
pixelatore.draw();
```

## Options

There are a few options that augment the *pixelatore*. All can be changed easily by passing in an object into the `init()` function:

```javascript
//begin the overriding!
var options = {

  //change pixelate scale to be larger
  'blockSize' : 2,

  //do not clear canvas before drawing
  'clearBeforeDraw' : false,

  //set a custom callback on image load
  'callback': function() {

    //image loaded
    alert('DALEKS HAVE NO CONCEPT OF DEFAULT VALUES!');

    // ... do something amazing ...
  }
};
```

Give the options to the *pixelatore*!

``` javascript
//feed the pixelatore...
pixelatore.init(canvas, 'path/to/image', options);
```

All options to be configured to your pleasure include:
### blockSize

Smaller values indicate more pixelation, up to a recommended value of 100.

Values greater than 100 actually 'zoom' the image when drawn to the final canvas.

default of 1;

-------------------------

### clearBeforeDraw

Boolean value to determine whether or not to clear the destination canvas before drawing the pixelated source.

default of `true`.

-------------------------

### callback

The callback function of loading an image.

*This function only gets called if the image needs to be loaded*

default behavior is to `var isLoaded = true`.  

-------------------------

## Things to know

Since *pixelatore* relies on scaling a draw image on the canvas, then drawing that canvas scaled larger, any scale value greater than 100 will effectively scale that image larger than the size of the canvas.

Scale values that are floats work too, but causes the image to not be correctly rendered onto the canvas. While using a float will not break anything, try to stick to integer values in order to get the best size.
