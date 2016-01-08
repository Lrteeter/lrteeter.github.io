(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var Game = Frogger.Game = function () {
    this.cars = [];
    this.frog = {};
    this.addCars();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 500;
  Game.FPS = 32;
  Game.NUM_CARS = 3;

  var isOdd = function(x) { return x & 1; };

  Game.prototype.addCars = function () {
    for (var i = 0; i < Game.NUM_CARS; i++) {
      for (var j = 0; j < 6; j++) {
        if (isOdd(j)) {
          var position = [1000 - i*(Game.DIM_X / Game.NUM_CARS), carPositionParams[j][1]]
        } else {
          var position = [i*(Game.DIM_X / Game.NUM_CARS), carPositionParams[j][1]]
        }
        this.cars.push(new Frogger.Car({ game: this, position: position, speed: carSpeedParams[j] }));
      }
    }
  };

  Game.prototype.addFrog = function () {
    var frog = new Frogger.Frog({
      pos: [500, 450],
      game: this,
    });
    this.frog = frog;
    return frog;
  };

  Game.prototype.allObjects = function () {
    return [].concat(this.frog, this.cars);
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.allObjects().forEach(function (obj1) {
      game.allObjects().forEach(function (obj2) {
        if (obj1 == obj2) {
          return;
        }
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      });
    });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.frog.draw(ctx)
    this.cars.forEach(function (car) {
      car.draw(ctx);
    });
  };

  Game.prototype.isOutOfBoundsX = function (pos) {
    return (pos[0] < 0) || (pos[0] > Game.DIM_X);
  };

  Game.prototype.isOutOfBoundsY = function (pos) {
    return (pos[1] < 0) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function (delta) {
    this.frog.moveFrog(delta);
    this.cars.forEach(function (car) {
      car.moveCar(delta);
    })
  };

  var carPositionParams = [
    [0, 20],
    [1000, 80],
    [0, 135],
    [1000, 250],
    [0, 305],
    [1000, 365]
  ];

  SPEED = 4;
  var carSpeedParams = [];
  for (var k = 0; k < 6; k++) {
    if (isOdd(k)) {
      carSpeedParams.push([SPEED * -(Math.random() + 0.5), 0])
    } else {
      carSpeedParams.push([SPEED * (Math.random() + 0.5), 0])
    }
  }

  Game.prototype.remove = function (object) {
    if (object instanceof Frogger.Car) {
      var idx = this.cars.indexOf(object);
      if (this.cars[idx].vel[0] < 0) {
        var newPos = [1000, this.cars[idx].pos[1]];
      } else {
        var newPos = [0, this.cars[idx].pos[1]];
      }
      this.cars[idx] = new Frogger.Car({ game: this, position: newPos, speed: this.cars[idx].vel });
    } else {
      this.cars = [];
      this.pos = [500, 450];

      setTimeout(function(){
        var win = document.getElementById("win")
        win.style.animation = "blink 1s";
      }, 200);
    }
  };

  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  };

})();
