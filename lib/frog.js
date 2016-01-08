(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Frog = Frogger.Frog = function (options) {
    options.vel = [0, 0];
    options.path = 'img/frog2.gif';
    options.radius = 15;
    options.size = 50;

    Frogger.MovingObject.call(this, options)
  };

  Frogger.Util.inherits(Frog, Frogger.MovingObject);

  Frog.prototype.relocate = function () {
    this.pos = [500, 450];
  };

  Frog.prototype.power = function (move) {
    this.pos[0] += 57*move[0];
    this.pos[1] += 57*move[1];
  };
})();
