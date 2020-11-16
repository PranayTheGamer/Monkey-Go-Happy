
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground;
var PLAY = 0;
var END = 1;
var gamestate=PLAY

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  monkey = createSprite(30,220,10,10);
  monkey.addAnimation("runner",monkey_running);
  monkey.scale=0.13;
  ground = createSprite(250,260,500,10);
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  score = 0;
}


function draw() {
  background("white")
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(ground);
  if(gamestate===PLAY){
   banana1();
   rocks();
    if(keyDown("space") && monkey.y === 215.09){
      monkey.velocityY=-13;
    }
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      score = score+1;
    }
    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      gamestate = END;
    }
  }
  if(gamestate === END){
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    if(keyWentDown("space")){
      reset();
    }
  }
  drawSprites();
  text("score: "+score,400,100);
}

function banana1(){
  if(frameCount%100==0){
    banana = createSprite(500,140,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 100;
    foodGroup.add(banana);
  }
}
function rocks(){
  if(frameCount%100 === 0){
  obstacle = createSprite(500,240,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15;
  obstacle.velocityX=-6;
  obstacle.lifetime=100;
  obstacleGroup.add(obstacle);
  }
}
function reset(){
  gamestate = PLAY;
  score = 0
}
