var pixelator = require('./pixelator.node.js'),
    canvas = document.getElementById('field'),
    range = document.getElementById('boxRange'),
    secondary = document.getElementById('secondary'),
    sctx = secondary.getContext('2d'),

    htmlImg = document.getElementById('htmlImg');

//setup and draw initial
//pixelator.init(canvas,/*'./assets/aeson-web.png'*/ 'http://lorempixel.com/900/600/animals', //{'callback': function() {

//  pixelator.draw();
//}});

var img = new Image();

//when the image is loaded...
img.addEventListener('load', function(ev) {
  //pixelator.draw();

  //drwa to secondary canvas
  //sctx.drawImage(img, 0,0);

  //set the secondary canvas, as the image for the pixelation
  //pixelator.init(canvas, secondary);
  //pixelator.draw();
});

//img.src = 'http://lorempixel.com/900/600/animals';

//pixelator.init(canvas, htmlImg);
//pixelator.draw();

sctx.beginPath();
sctx.fillStyle = '#80C54B';
sctx.arc(secondary.width/2, secondary.height/2, secondary.height/4, 0, 2*Math.PI, false);
sctx.fill();

var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle = '#000000';
ctx.arc(secondary.width/2, secondary.height/2, secondary.height/4, 0, 2*Math.PI, false);
pixelator.init(ctx, secondary);
pixelator.draw();
ctx.fill();


//add range event listener -- click on random part of range
range.addEventListener('change', function(ev) {

  pixelator.draw(this.value);

},false);

//event listener -- drag slider around
range.addEventListener('input', function(ev) {

  pixelator.draw(this.value);

},false);
