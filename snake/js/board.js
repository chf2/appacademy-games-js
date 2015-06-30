(function() {
  if (typeof window.Snake !== 'object') {
    window.Snake = {};
  }

  var Board = Snake.Board = function($el) {
    this.apples = [];
    this.$el = $el;
    this.setupGrid();
    this.snake = new Snake.Snake(10);
    this.render();
  };

  Board.prototype.makeApples = function() {
    if (Math.random() > 0.8) {
      var i = Math.floor(20 * Math.random());
      var j = Math.floor(20 * Math.random());
      if (!this.checkIfApple(i, j) && !this.snake.checkIfSnake(i, j)) {
        this.apples.push([i, j]);
      }
    }
  };

  Board.prototype.checkIfApple = function(i, j) {
    var isApple = false;
    for (var k = 0; k < this.apples.length; k++) {
      if (this.apples[k][0] === i && this.apples[k][1] === j) {
        isApple = true;
      }
    }

    return isApple;
  };  

  Board.prototype.render = function() {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        if (this.snake.checkIfSnake(i, j)) {
          $('.cell').filter(function (){          
            return $(this).data('rowIdx') === i && $(this).data('colIdx') === j
          }).addClass('snake');
        } else if (this.checkIfApple(i, j)) {
          $('.cell').filter(function (){          
            return $(this).data('rowIdx') === i && $(this).data('colIdx') === j
          }).addClass('apple'); 
        } else {
          $('.cell').filter(function (){          
            return $(this).data('rowIdx') === i && $(this).data('colIdx') === j
          }).removeClass('snake');
        }
      }
    }
  };

  Board.prototype.setupGrid = function() {
    for (var i = 0; i < 20; i++) {
      $("<div>").addClass("row").addClass("row" + i).appendTo(this.$el);
      for (var j = 0; j < 20; j++) {
        $("<div>").addClass("cell").data({'rowIdx':i,'colIdx':j})
                  .appendTo($('.row' + i));
      }
    }
  };

})();
