(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var MovingObject = Frogger.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.game = options.game;
    this.path = options.path;
    this.radius = options.radius;
    this.size = options.size;
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    // if (this instanceof Frogger.Frog) {
    // var pos = this.pos
    // setTimeout(function() {
    //   this.pos = [1005, 700];
    //   console.log(this.pos);
    // }, 50);
    // setTimeout(function() {
    //   this.pos = pos;
    //   console.log(this.pos);
    // }, 100);
    // setTimeout(function() {
    //   this.pos = [1005, 700];
    //   console.log(this.pos);
    // }, 150);
    // setTimeout(function() {
    //   this.pos = pos;
    //   console.log(this.pos);
    // }, 200);
    // setTimeout(function() {
    //   this.pos = [500, 450];
    //   console.log(this.pos);
    // }, 250);
    // this.cars = [];
    // }
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fill();
    ctx.beginPath();
    image = new Image();
    image.src = this.path;
    ctx.drawImage(image, this.pos[0], this.pos[1], this.size, this.size);
    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    if (otherObject instanceof Frogger.Frog) {
      var centerDist = Frogger.Util.dist([this.pos[0] + 20, this.pos[1] + 30], otherObject.pos);
    } else{
      var centerDist = Frogger.Util.dist([this.pos[0] - 20, this.pos[1] - 30], otherObject.pos);
    }
    return centerDist < (this.radius + otherObject.radius);
  };

  var NORMAL_FRAME_TIME_DELTA = 1000/60;

  MovingObject.prototype.moveCar = function (timeDelta) {
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale;
    this.pos = [this.pos[0] + offsetX, this.pos[1]];
    if (this.game.isOutOfBoundsX(this.pos)) {
      this.remove();
    }
  };

  MovingObject.prototype.moveFrog = function (timeDelta) {
    var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0],
        offsetY = this.vel[0];

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.pos[0] >= 975) {
      this.pos = [this.pos[0] - offsetX - 3, this.pos[1]]
    }
    if (this.pos[0] <= 25) {
      this.pos = [this.pos[0] + offsetX + 3, this.pos[1]]
    }
    if (this.pos[1] >= 475) {
      this.pos = [this.pos[0], this.pos[1] - offsetY - 3]
    }
    if (this.pos[1] <= 0) {
      this.remove();
    }
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  };
})();
