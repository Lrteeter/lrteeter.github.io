(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Car = Frogger.Car = function (options) {
    options.pos = options.position;
    options.vel = options.speed;
    options.path = 'img/car.png';
    options.radius = 40;
    options.size = 100;

    Frogger.MovingObject.call(this, options);
  };

  Frogger.Util.inherits(Car, Frogger.MovingObject);

  Car.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Frogger.Frog) {
      otherObject.relocate();
    }
  };
})();
