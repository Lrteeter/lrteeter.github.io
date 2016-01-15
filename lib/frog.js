(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Frog = Frogger.Frog = function (options) {
    this.game = options.game;
    options.vel = [0, 0];
    options.path = 'img/frog2.gif';
    options.radius = 15;
    options.size = 50;

    Frogger.MovingObject.call(this, options)
  };

  Frogger.Util.inherits(Frog, Frogger.MovingObject);

  Frog.prototype.relocate = function () {
    this.path = 'img/explosion.png';
    setTimeout(function(){
      this.path = 'img/frog2.gif';
      this.pos = [500, 450];
    }.bind(this), 150);
  };

  Frog.prototype.moveFrog = function (move) {

    var stepSize = 57;

    if (
        this.pos[0] + stepSize*move[0] < 975 &&
        this.pos[0] + stepSize*move[0] > -20 &&
        this.pos[1] + stepSize*move[1] < 475
       )
      {
        this.pos = [this.pos[0] + stepSize*move[0], this.pos[1] + stepSize*move[1]];
    }

    if (this.pos[1] <= 0) {
      this.game.remove(this);
    }

  };
})();
