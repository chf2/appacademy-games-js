(function() {
  if (typeof window.Snake !== "object") {
    window.Snake = {};
  }

  var View = Snake.View = function($el) {
    this.$el = $el;
    this.board = new Snake.Board($el);
    this.constructKeyBindings();
    this.step;
    setInterval(this.step.bind(this), 500);
  };

  View.prototype.constructKeyBindings = function() {
    $('body').on('keypress', function(event) {
      this.handleKeyEvent(event);
    }.bind(this));
  };

  View.prototype.step = function() {
    var movedTo = this.board.snake.move();
    if (this.board.checkIfApple(movedTo[0], movedTo[1])) {
      

    }
    this.board.makeApples();
    this.board.render();
  };

  View.prototype.handleKeyEvent = function(event) {
    var code = event.keyCode;
    switch (code) {
      case 97:
        this.board.snake.turn("W");
        break;
      case 119:
        this.board.snake.turn("N");
        break;
      case 100:
        this.board.snake.turn("E");
        break;
      case 115:
        this.board.snake.turn("S");
        break;
      default:
    }
  };
})();
