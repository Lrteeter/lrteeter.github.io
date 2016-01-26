(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var GameView = Frogger.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.frog = this.game.addFrog();
  };

  GameView.prototype.bindKeyHandlers = function (frog) {
    var frog = frog || this.frog
    document.onkeydown = function(e) {
      e = e || window.event;
      switch(e.which || e.keyCode) {
        case 37: // left
          e.preventDefault();
          frog.moveFrog([-1,  0]);
          break;
        case 38: // up
          e.preventDefault();
          frog.moveFrog([0, -1]);
          break;
        case 39: // right
          e.preventDefault();
          frog.moveFrog([1,  0]);
          break;
        case 40: // down
          e.preventDefault();
          frog.moveFrog([0,  1]);
          break;
        default: return;
      }
    };
  };

  var unbindKeyHandlers = GameView.unbindKeyHandlers = function () {
    document.onkeydown = function(e) {
      e = e || window.event;
      switch(e.which || e.keyCode) {
        case 37: // left
          e.preventDefault();
          break;
        case 38: // up
          e.preventDefault();
          break;
        case 39: // right
          e.preventDefault();
          break;
        case 40: // down
          e.preventDefault();
          break;
        default: return;
      }
    };
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  };

  GameView.prototype.animate = function(time){
    var timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
})();
