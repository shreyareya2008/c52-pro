var score =0;
var rocket,aestroid, bullet, backBoard,blast;

var rocketImg,aestroid, blastImg, backBoardImg;

var aestroidGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
 rocketImg = loadImage("rocket.png")
 blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  aestroidImg = loadImage("aestroid.png")
  
  backBoardImg= loadImage("bg.png")
}
function setup() {
  createCanvas(800, 600);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)

  rocket= createSprite(100, height/2, 50,50);
  rocket.addImage(rocketImg)
  rocket.scale=0.5
  
  bulletGroup = createGroup();   
  
  aestroidGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
  
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    rocket.y=mouseY  

    if (frameCount % 80 === 0) {
      drawaestroid();
    }

    

    if(keyDown("space")){
      shootBullet();
    }

    if (aestroidGroup.collide(backBoard)){
      handleGameover(aestroidGroup);
    }
   
    
    if(aestroidGroup.collide(bulletGroup)){
      handleaestroidCollision(aestroidGroup);
    }

    

    drawSprites();
  }
    
  
}

function drawaestroid(){
  aestroid = createSprite(800,random(20,780),40,40);
   aestroid.addImage("aestroidImg",aestroidImg);
  aestroid.scale = 0.5;
  aestroid.velocityX = -8;
  aestroid.lifetime = 400;
  aestroidGroup.add(aestroid);
}


function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= rocket.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleaestroidCollision(aestroidGroup){
    if (life > 0) {
       score=score+1;
    }

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
   blast.addImage("blastImg",blastImg)
   blast.scale=0.3
   blast.life=20
    bulletGroup.destroyEach();
    aestroidGroup.destroyEach();
}

function handleGameover(aestroidGroup){
  
    life=life-1;
    aestroidGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
     
    }
  
}
