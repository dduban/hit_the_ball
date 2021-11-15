var canvas = document.getElementById("gameCanva");
var ctx = canvas.getContext("2d");
var ballRadius = 16;
var x = canvas.width/2;
var y = canvas.height-33;
var dx = 4;
var dy = -4;
var paddleHeight = 30;
var paddleWidth = 207;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 8;
var brickColumnCount = 6;
var brickWidth = 120;
var brickHeight = 30;
var brickPadding = 35;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var counter = 0;
var lives = 3;
var wasTriggered = 0;
var b1x, b1y, b2x, b2y, b3x, b3y, b4x, b4y = 0;
var s1=0;
var s2=0;
var s3=0;
var s4=0;
var angle = 0;
var bonusCount = 3;
var background = new Image();
background.src = "img/bg.png";
  ctx.drawImage(background,0,0);
var animation;

const startGameBtn = document.querySelector('#startGameBtn');
const ui = document.querySelector('#ui');


var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}
function collisionDetection() {
  var ballsnd = new Audio("img/ballsnd.wav");
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          ballsnd.play();
          b.status = 0;
          if(c==0){
            score += 6;
          }
          else if(c==1){
            score += 5;
          }
          else if(c==2){
            score += 4;
          }
          else if(c==3){
            score += 3;
          }
          else if(c==4){
            score += 2;
          }
          else if(c==5){
            score += 1;
          }

          counter++;
          if(counter>=2){
            drawBonus(Math.random() * 300, Math.random() * 300);
          }
          if(counter == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }


  
}


function drawBall() {
  var ballImg = new Image();
  ballImg.src="img/ball.png";
  ctx.beginPath();
  ctx.drawImage(ballImg, x, y);
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 9;
  ctx.fill();
  ctx.closePath();

}
function drawPaddle() {
  var paddleImg = new Image();
  paddleImg.src="img/belka1.png";
  ctx.beginPath();
  ctx.drawImage(paddleImg, paddleX, canvas.height-paddleHeight-20);
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  var brickImg1 = new Image();
  var brickImg2 = new Image();
  var brickImg3 = new Image();
  var brickImg4 = new Image();
  var brickImg5 = new Image();
  var brickImg6 = new Image();
  brickImg1.src="img/d11.png";
  brickImg2.src="img/d21.png";
  brickImg3.src="img/d31.png";
  brickImg4.src="img/d41.png";
  brickImg5.src="img/d51.png";
  brickImg6.src="img/d61.png";
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        
        if(c==0) {
          ctx.drawImage(brickImg6, brickX, brickY);
        }
        else if(c==1) {
          ctx.drawImage(brickImg5, brickX, brickY);
        }
        else if(c==2) {
          ctx.drawImage(brickImg4, brickX, brickY);
        }
        else if(c==3) {
          ctx.drawImage(brickImg3, brickX, brickY);
        }
        else if(c==4) {
          ctx.drawImage(brickImg2, brickX, brickY);
        }
        else if(c==5) {
          ctx.drawImage(brickImg1, brickX, brickY);
        }
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = "22px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Wynik: "+score, 8, 20);
}
function drawLives() {
  ctx.font = "22px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Zycia: "+lives, canvas.width-80, 20);
}

function drawBonus() {

  var bonusPlusImg = new Image();
  var bonusMinusImg = new Image();
  bonusPlusImg.src="img/bplus.png";
  bonusMinusImg.src="img/bminus.png";

    if(counter>=0 && s1==0) {
        ctx.beginPath();
       
        if(b1g>=0.5) {
          ctx.drawImage(bonusPlusImg, b1x, b1y);
          points = 50;
        }
        else {
          ctx.drawImage(bonusMinusImg, b1x, b1y);
          points = -50;
        }
        ctx.fill();
        ctx.closePath();

        if(x > b1x && x < b1x+80 && y > b1y && y < b1y+80) {
          s1 = 1;
          score = score + points;
        }
    }

    if(counter>=2 && s2==0) {
        ctx.beginPath();
        if(b2g>=0.5) {
          ctx.drawImage(bonusPlusImg, b2x, b2y);
          points = 50;
        }
        else {
          ctx.drawImage(bonusMinusImg, b2x, b2y);
          points = -50;
        }
        ctx.fill();
        ctx.closePath();

        if(x > b2x && x < b2x+80 && y > b2y && y < b2y+80) {
          s2 = 1;
          score = score + points;
        }
    }

    if(counter>=4 && s3==0) {
        ctx.beginPath();
        if(b3g>=0.5) {
          ctx.drawImage(bonusPlusImg, b3x, b3y);
          points = 50;
        }
        else {
          ctx.drawImage(bonusMinusImg, b3x, b3y);
          points = -50;
        }
        ctx.fill();
        ctx.closePath();

        if(x > b3x && x < b3x+80 && y > b1y && y < b3y+80) {
          s3 = 1;
          score = score + points;
        }
    }

    if(counter>=6 && s4==0) {
        ctx.beginPath();
        if(b4g>=0.5) {
          ctx.drawImage(bonusPlusImg, b4x, b4y);
          points = 50;
        }
        else {
          ctx.drawImage(bonusMinusImg, b4x, b4y);
          points = -50;
        }
        ctx.fill();
        ctx.closePath();

        if(x > b4x && x < b4x+80 && y > b4y && y < b1y+80) {
          s4 = 1;
          score = score + points;
        }
    }



}

function generateCoords() {
    var min = Math.ceil(10);
    var max = Math.floor(100);
    b1x = Math.random() * 1280;
    b1y = Math.random() * 600;
    b2x = Math.random() * 1280;
    b2y = Math.random() * 600;
    b3x = Math.random() * 1280;
    b3y = Math.random() * 600;
    b4x = Math.random() * 1280;
    b4y = Math.random() * 600;
    p1 = Math.floor(Math.random() * (max - min + 1)) + min;
    p2 = Math.floor(Math.random() * (max - min + 1)) + min;
    p3 = Math.floor(Math.random() * (max - min + 1)) + min; 
    p4 = Math.floor(Math.random() * (max - min + 1)) + min;

    b1g = Math.random();
    b2g = Math.random();
    b3g = Math.random();
    b4g = Math.random();
}

function init() {
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

}


let animationId;

function draw() {

  animationId = requestAnimationFrame(draw);


  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(wasTriggered==0) {
    generateCoords();
    wasTriggered=1;
  }

  drawBonus();

  



  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius-20) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        cancelAnimationFrame(animationId);
        ui.style.display='flex';
        
      }
      else {
        x = canvas.width/2;
        y = canvas.height-35;
        dx = 4;
        dy = -4;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 3;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 3;
  }

  x += dx;
  y += dy;

}




startGameBtn.addEventListener('click', () => {
  init();
  draw();
  ui.style.display='none';

})

