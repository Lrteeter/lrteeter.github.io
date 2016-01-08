(function () {
  if (typeof Frogger === "undefined") {
    window.Frogger = {};
  }

  var GameView = Frogger.GameView = function (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.frog = this.game.addFrog();
  };

  GameView.prototype.bindKeyHandlers = function () {
    var frog = this.frog;
    document.onkeydown = function(e) {
      e.preventDefault();
      e = e || window.event;
      switch(e.which || e.keyCode) {
        case 37: // left
          frog.power([-1,  0]);
          break;
        case 38: // up
          frog.power([0, -1]);
          break;
        case 39: // right
          frog.power([1,  0]);
          break;
        case 40: // down
          frog.power([0,  1]);
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
