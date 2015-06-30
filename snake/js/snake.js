(function () {
  if (typeof window.Snake !== 'object') {
    window.Snake = {};
  }

  var Snake = window.Snake.Snake = function(mid) {
    this.dir = "E";
    this.segments = [[mid, mid - 4],
                     [mid, mid - 3],
                     [mid, mid - 2], 
                     [mid, mid - 1], 
                     [mid, mid]];
    this.boardSize = mid*2;
  };

  Snake.DIR = {"N" : [-1,0],
               "E" : [0,1],
               "S" : [1,0],
               "W" : [0,-1]
               };

  Snake.prototype.checkIfSnake = function(i, j) {
    var segs = this.segments;
    var isSnake = false;
    for (var k = 0; k < segs.length; k++) {
      if (segs[k][0] === i && segs[k][1] === j) {
        isSnake = true;
      }
    }

    return isSnake;
  };             

  Snake.prototype.move = function () {
    var movingSegment = this.segments.shift();
    var newPosition = this.plus(movingSegment, this.dir);
    if (this.checkIfSnake(newPosition[0], newPosition[1])) {
      alert("You lost!");
      this.segments = [];
      // TO DO -- ACTUAL GAME ENDING HERE
    } else {
      this.segments.push(newPosition);
    }

    return newPosition;
  };

  Snake.prototype.plus = function(position, direction) {
    var newPosition = this.segments[this.segments.length-1].slice();
    newPosition[0] += Snake.DIR[direction][0];
    newPosition[1] += Snake.DIR[direction][1];
    if (newPosition[0] > this.boardSize - 1) {
      newPosition[0] = 0;
    } else if (newPosition[0] < 0) {
      newPosition[0] = this.boardSize - 1;
    } else if (newPosition[1] > this.boardSize - 1) {
      newPosition[1] = 0;
    } else if (newPosition[1] < 0) {
      newPosition[1] = this.boardSize - 1;
    }
    return newPosition;
  };

  Snake.prototype.turn = function(direction) {
      if (Snake.DIR[direction][0] !== Snake.DIR[this.dir][0] && 
            Snake.DIR[direction][1] !== Snake.DIR[this.dir][1]) {
        this.dir = direction;
      }
  };

})();
