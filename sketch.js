var trex;
var trexAnimation;
var trexStop;

var player;
var playerAnimation;
var playerCrash;

var road
var roadImg

var gameOver
var gameOverImg
var score = 0;

var gameState = 1;

var END = 0;
var PLAY = 1;
function preload(){
  trexImg = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexStop = loadAnimation("trex1.png");
  
  playerAnimation = loadAnimation
  ("mainPlayer1.png","mainPlayer2.png")
   playerCrash = loadAnimation("mainPlayer3.png");
  
  roadImg = loadImage("Road.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
 createCanvas(600,400)
  road = createSprite(200,200,600,600);
  road.addImage(roadImg)
  road.scale = 0.4
  
  
  player = createSprite(300,200,20,20);
  player.scale = 0.08
  player.addAnimation("cycling",playerAnimation)
  player.addAnimation("crashed",playerCrash)
  
  trex  = createSprite(0,Math.round(random(50,350)),20,20)
  trex.addAnimation("running",trexImg);
  trex.addAnimation("stop",trexStop);
  trex.scale = 0.8
  
  gameOver = createSprite(300,200,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8
  
}

function draw() {
  background("white")
  if (gameState == PLAY){
    player.changeAnimation("cycling",playerAnimation);
    
    road.velocityX = (-5 - score / 150)
  if(road.x < 0 ){
    road.x = width/2;
  }
  
    if(trex.x > 700 ){
    trex.x = 0;
    trex.y = Math.round(random(50,350));
  }
  player.y = mouseY;  
    
  trex.changeAnimation("running",trexImg) 
  trex.velocityX = (2 + score / 150);
  
  if(trex.isTouching(player)){
    gameState = END;
  }
    
    score =  score + Math.round(getFrameRate()/50);
    
    gameOver.visible = false;
    
  }
  
  if (gameState == END){
    player.changeAnimation("crashed",playerCrash)
    road.velocityX = 0;
    trex.velocityX = 0;
    trex.changeAnimation("stop",trexStop);
    
    gameOver.visible = true;
     
    if (keyWentDown("R")){
    reset();
  }
  
  }
 drawSprites();
  textSize(20);
  fill(255);
  text("score : " + score,500,50)
if (gameState == END){  
   textSize(30);
  fill(255);
   text("You got caught to press R to try again",60,250)
  }  
}
function reset(){
    gameState = PLAY;
    score = 0;
    trex.x = 0;
}
