/**
 *
 * Pixelator.js
 *
**/
var pixelator = {

  //default block scaling size
  blockSize : 1,

  //primary canvas context
  ctx : null,

  //primary canvas
  canvas : null,

  //what to draw: can be anything that is drawable by the canvas
  img : null,

  //bool set to true when the thing to draw is loaded
  isLoaded : false,

  //secondary canvas to draw smaller image to
  secondary : null,

  //secondary context
  sctx : null,

  //clear the canvas before drawing pixelated img
  clearBeforeDraw : true,

  //default callback on image load
  callback : function() { isLoaded = true; },

  //Handles setting the canvas, img and other inital vars
  init : function(primary, path, options) {
    options = options || {};

    //params & options
    this.canvas    = (primary.canvas) ? primary.canvas : primary;
    this.blockSize = (options['blockSize']) ? options['blockSize'] : this.blockSize;
    this.ctx       = (primary.canvas) ? primary: primary.getContext('2d');
    this.callback  = (options['callback']) ? options['callback'] : this.callback;

    console.log(this.callback, options['callback']);

    //create temporary canvas
    this.secondary = document.createElement('canvas');
    this.secondary.width = this.canvas.width;
    this.secondary.height = this.canvas.height;
    this.sctx = this.secondary.getContext('2d');

    //handle image loading
    if (typeof path === 'string') {
      var that = this;

      //load new image.
      this.img = new Image();
      this.img.addEventListener('load', function(ev) {
        that.isLoaded = true;
        that.callback(ev);
      });
      this.img.src = path || '';
    }
    else {
      this.img = path;
      this.isLoaded = true;
    }

    //turn off smoothing for pixelating effect
    if (this.ctx != null) {
      //turn off image smoothing
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.webkitImageSmoothingEnabled = false;
      this.ctx.imageSmoothingEnabled = false;
    }
    else {
      console.log('cannot turn off smoothing. context is null :', this.ctx);
    }

  },

  draw : function(b) {
    if (this.canvas != null) {

      this.blockSize = b || this.blockSize;

      var width  = this.canvas.width * (this.blockSize * 0.01),
          height = this.canvas.height * (this.blockSize * 0.01);

      if (this.isLoaded) {
        this.sctx.clearRect(0,0, this.secondary.width, this.secondary.height);
        this.sctx.drawImage(this.img, 0,0, width, height);

        (this.clearBeforeDraw) ? this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height) : '' ;
        this.ctx.drawImage(this.secondary, 0,0, width, height, 0,0, this.canvas.width, this.canvas.height);
      }
      else {
        console.log('not loaded:', this.isLoaded, " : ", this.img);
      }
    }
    else  {
      console.log('this canvas is null!', this.canvas);
    }
  }
}
