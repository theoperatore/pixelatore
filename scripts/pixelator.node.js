/**
 *
 * Pixelator.js
 *
**/
    //initial pixelate scale
var blockSize = 1,

    //primary canvas context
    ctx = null,

    //primary canvas
    canvas = null,

    //what to draw: can be anything that is drawable by the canvas
    img = null,

    //bool set to true when the thing to draw is loaded
    isLoaded = false,

    //secondary canvas to draw smaller image to
    secondary = null,

    //secondary context
    sctx = null,

    //clear the canvas before drawing pixelated img
    clearBeforeDraw = true,

    //default callback on image load
    callback = function() { isLoaded = true; };


/**
 *
 * Initializes the image and drawing environment.
 *
**/
exports.init = function(primary, path, options) {
  options = options || {};

  //params & options
  canvas    = (primary.canvas) ? primary.canvas : primary;
  blockSize = (options['blockSize']) ? options['blockSize'] : blockSize;
  ctx       = (primary.canvas) ? primary: primary.getContext('2d');
  callback  = (options['callback']) ? options['callback'] : callback;

  //create temporary canvas
  secondary = document.createElement('canvas');
  secondary.width = canvas.width;
  secondary.height = canvas.height;
  sctx = secondary.getContext('2d');

  //handle image loading
  if (typeof path === 'string') {

    //load new image.
    img = new Image();
    img.addEventListener('load', function(ev) {
      isLoaded = true;
      callback(ev);
    });
    img.src = path || '';
  }
  else {
    img = path;
    isLoaded = true;
  }

  //turn off smoothing for pixelating effect
  if (ctx != null) {
    //turn off image smoothing
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }
  else {
    console.log('cannot turn off smoothing. context is null :', ctx);
  }
}

/**
 *
 * Draws the image based on either the passed in blockSize, or the stored value.
 *
**/
exports.draw = function(b) {
  if (canvas != null) {

    blockSize = b || blockSize;

    var width  = canvas.width * (blockSize * 0.01),
        height = canvas.height * (blockSize * 0.01);

    if (isLoaded && img != null) {
      sctx.clearRect(0,0, secondary.width, secondary.height);
      sctx.drawImage(img, 0,0, width, height);

      (clearBeforeDraw) ? ctx.clearRect(0,0, canvas.width, canvas.height) : '' ;
      ctx.drawImage(secondary, 0,0, width, height, 0,0, canvas.width, canvas.height);
    }
  }
  else  {
    console.log('canvas is null!', canvas);
  }
}
