var bg, bgImg
var bottomGround
var topGround
var PLAY=1
var END= 0
var gameState=PLAY
var score= 0


function preload(){
bgImg = loadImage("assets/bg.png")

kiteImg = loadImage("assets/kite2.png");



obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

gameOverImg = loadImage("assets/Gameover1.png")
restartImg = loadImage("assets/restart.png")

}

function setup(){

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating kite     
kite= createSprite(100,200,20,50);
kite.addImage(kiteImg);
kite.scale = 0.2;


gameOver= createSprite(220,200);
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;
gameOver.visible=false;

restart= createSprite(220,260);
restart.addImage(restartImg);
restart.scale=0.5;
restart.visible=false;

topObstaclesGroup=new Group();
bottomObstaclesGroup=new Group();
barsGroup=new Group();
}

function draw() {
  
  background("black");
        if (gameState===PLAY){
           //making the kite fly
           if(keyDown("space")) {
            kite.velocityY = -6 ;
            
          }

          //adding gravity
           kite.velocityY = kite.velocityY + 2;

           Bar();
           spawnObstaclesBottom();
           spawnObstaclesTop();
           if (topObstaclesGroup.isTouching(kite)||bottomObstaclesGroup.isTouching(kite)||kite.isTouching(bottomGround)||
           kite.isTouching(topGround)){
             gameState = END;
           }
        }
   
        if (gameState=== END){
          gameOver.visible = true;
          gameOver.depth=gameOver.depth+1;

          restart.visible = true;
          restart.depth=restart.depth+1;
          kite.velocityX=0;
          kite.velocityY=0;
          topObstaclesGroup.setVelocityXEach(0);
          bottomObstaclesGroup.setVelocityXEach(0);
          barsGroup.setVelocityXEach(0);
          topObstaclesGroup.setLifetimeEach(-1);
          bottomObstaclesGroup.setLifetimeEach(-1);
          kite.y=200;
          if (mousePressedOver(restart)){
            console.log("end state :)")
            reset();
          }
        }
        drawSprites();
        Score();
}

function spawnObstaclesTop(){
  if (World.frameCount % 60 ===0){
    obstacleTop= createSprite(400,50,40,50)
    
    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));

    //generate random top obstacles
    var rand = Math.round(random(1,2));

  if(rand===1){
    obstacleTop.addImage(obsTop1)
  }
  else if(rand===2){
    obstacleTop.addImage(obsTop2)
  }
  obstacleTop.scale=0.1;
  obstacleTop.velocityX= -4
  obstacleTop.lifeTime=100;
  kite.depth=kite.depth+1;
  topObstaclesGroup.add(obstacleTop);
  }
}

function spawnObstaclesBottom(){
  if (World.frameCount % 60 ===0){
    obstacleBottom= createSprite(400,350,40,50)

    //generate random top obstacles
    var rand = Math.round(random(1,3));

  if(rand===1){
    obstacleBottom.addImage(obsBottom1)
  }
  else if(rand===2){
    obstacleBottom.addImage(obsBottom2)
  }
  else if(rand===3){
    obstacleBottom.addImage(obsBottom3)
  }


  obstacleBottom.scale=0.08;
  obstacleBottom.velocityX= -4
  obstacleBottom.lifeTime= 100;
  kite.depth=kite.depth+1;
  bottomObstaclesGroup.add(obstacleBottom);
  }
}


  function Bar() 
  {
          if(World.frameCount % 60 === 0)
          {
            var bar = createSprite(400,200,10,800);
           bar.velocityX = -6
           bar.depth = kite.depth;
           bar.lifetime = 70;
           bar.visible = false;
           barsGroup.add(bar);
          }
 }

function reset(){
  gameState= PLAY;
  gameOver.visible=false;
  restart.visible=false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  score=0;
}

function Score(){
  if(kite.isTouching(barsGroup)){
    score=score+1;
  }
  textSize(30);
  fill("purple");
  text("Score: "+ score,250,50);
}