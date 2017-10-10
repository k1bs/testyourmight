let p1 = new Player(1);
let p2 = new Player(2);
let game = new GameState(1);

let currentLevel = parseInt(localStorage.getItem('level'));
console.log(currentLevel);
if (currentLevel) {
  game.level = currentLevel;
}


$(function(){
  setMat();
  setBar();
  setText();
  keyStart();
  timer();
  console.log(p1.score);
})



// Keylogger function

function keyStart () {
  $(window).on('keydown.one', window, handlerOne);
  $(window).on('keydown.two', window, handlerTwo);
  $(window).keydown(function(e) {
    if (e.which === 88) {
      $(window).off('keydown.one');
      $('#bar-player-1').stop();
      p1.addScore($('#bar-player-1').height());
      checkLine(p1);
    }
  })
  $(window).keydown(function(e) {
    if (e.which === 222) {
      $(window).off('keydown.two')
      $('#bar-player-2').stop();
      p2.addScore($('#bar-player-2').height());
      checkLine(p2);
    }
  })
}

// Line checker function

function checkLine (player) {
  let line = game.height();
  let bar = `#bar-player-${player.number}`;
  if ($(bar).height() > line) {
    boardBreaker(player);
  }
}

// Keyhandler Player One

function handlerOne(event) {
  if (event.which === 65 || event.which === 90) {
      $('#bar-player-1').stop(true, false);
      $('#bar-player-1').height('+=50');
      $('#bar-player-1').animate({height: 0}, 200);
  }
}

// Keyhandler Player Two

function handlerTwo(event) {
  if (event.which === 190 || event.which === 191) {
      $('#bar-player-2').stop(true, false);
      $('#bar-player-2').height('+=50');
      $('#bar-player-2').animate({height: 0}, 200);
  }
}

// Game init

// Board breaker function

function boardBreaker(player) {
  let board = `#mat-player-${player.number}`;
  let broken = `url(./images/${game.level}broken.png)`;
  $(board).css('background-image', broken);
}

// Text setter function

function setText() {
  let header = $('h3');
  header.each(function(){
    $(this).text(game.matName());
  })
}

// Mat field setter function

function setMat() {
  let container = $('.material');
  let mat = `url(./images/${game.level}whole.png`;
  container.each(function() {
    $(this).css('background-image', mat);
  });
}

// Bar setter function

function setBar() {
  let toGain = $('.to-gain-bar');
  let excess = $('.excess-bar');
  toGain.each(function() {
    $(this).height(game.height());
  })
  excess.each(function() {
    $(this).height(246 - (game.height()));
  })
}

// Game Constructor function

function GameState(cachedLevel) {
  this.level = cachedLevel;
  this.height = function() {
    return Math.floor(250 - (123 / (this.level)));
  }
  this.next = function() {
    if (this.level !== 5) {
      this.level++;
      localStorage.setItem('level',this.level);
      setTimeout(function() {
        window.location.reload(true);
      }, 2000);
    } else if (this.level === 5) {
      setTimeout(function () {
        localStorage.removeItem('level')
        window.location.reload(true);
      })
    }
  }
  this.matName = function() {
    let mats = ['wood','stone','steel','ruby','diamond'];
    return mats[(this.level) - 1];
  }
}


// Player Constructor function

function Player(number) {
  this.number = number;
  this.score = 0;
  this.addScore = function(score) {
    return this.score += score;
  };
}

// EmptyBar Constructor function

function EmptyBar(level) {
  this.level = level;
  this.barHeight = function () {
    // Math for bar height by level. (look up ease functions?)
  }
}

// Timer decrement function

function timer() {
  let interval = setInterval(newText, 1000);
  function newText() {
    let currentTime = parseInt($('h1').html());
    let newTime = currentTime - 1;
    if (currentTime === 0) {
      clearInterval(interval);
      game.next();
    } else {
      let newTime = currentTime - 1;
      $('h1').text(newTime);
    }
  }
}




