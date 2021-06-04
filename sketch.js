//Declaring Variables
var alien,alienImage,alienGroup;
var monster,monsterImage,monsterGroup
var player,playerImage;
var bossAlien , bossAlienImage , bossAlienGroup;

var bgSound;
var shooterSound;

var bgImage;
var bulletImg;
var bulletGroup;

var badge1;
var badge2;
var badge3;
var gameOver;
var gameOverImg;
var restart;
var restartImg;

var score=0;
var play = 1;
var end = 0;
var gameState = play;

//------------------------------------------------------------------------------------------------------------------------------------------//

function preload(){
    // Declaring images for game
     alienImage = loadImage("alien.png");
     playerImage = loadImage("SpaceShip.png");
     bossAlienImage = loadImage("boss_alien.png");
     bgImage = loadImage("bgImage.jpg");
     bulletImg = loadImage("bulletImg.png");
     monsterImage = loadImage("monster.png");
     gameOverImg = loadImage("gameOver.jpg");
     restartImg = loadImage("restart.png");

    // Declaring Sound Files of the game
     bgSound = loadSound("bgm.mp3");
     shooterSound = loadSound("GunshotSound.mp3");


    }


// Declaring Groups and Player
function setup(){
    createCanvas(displayWidth , displayHeight);
    player = createSprite(displayWidth/2,displayHeight/2 + 100,100,50);
    player.addImage(playerImage);
    player.scale = 0.2;

    alienGroup = new Group();
    monsterGroup = new Group();
    bulletGroup = new Group();
    bossAlienGroup = new Group();

    gameOver = createSprite(displayWidth/2,displayHeight/2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3;
    gameOver.visible = false;

    restart = createSprite(displayWidth/2+100,displayHeight/2-100);
    restart.addImage(restartImg);
    restart.scale = 0.15;
    restart.visible = false;

    bgSound.play();
    bgSound.setLoop(true);

}

// Declaring Functions
function draw(){
    background(bgImage);

    textSize(25);
    fill("white");
    text("Score : "  + score,displayWidth-200,50);

    if(gameState == play){
        spawnAliens();
        spawnMonsters();
        spawnBossAliens();
        killMonsters();
        killAliens();
        killBossAliens();
        resetPlayer();
        if(alienGroup.isTouching(player) || monsterGroup.isTouching(player) || bossAlienGroup.isTouching(player)){
            gameState = end;
        }
    }
    else if(gameState == end){
        player.velocityX = 0;
        player.velocityY = 0;
        alienGroup.setVelocityYEach(0);
        monsterGroup.setVelocityYEach(0);
        bossAlienGroup.setVelocityEach(0);
        gameOver.visible = true;
        restart.visible = true;
        monsterGroup.setLifetimeEach(-1);
        alienGroup.setLifetimeEach(-1);
        bossAlienGroup.setLifetimeEach(-1);
        if(mousePressedOver(restart)){
            reset();
        }
    }




    drawSprites();

}


//Spawn Enemies
function spawnAliens(){
    if(frameCount % 100 == 0){
        aliens = createSprite(0,0,50,50);
        aliens.addImage(alienImage);
        aliens.scale = 0.21;
        aliens.x = Math.round(random(50,1150));
        aliens.velocityY = 3;
        aliens.lifetime = 200;
        alienGroup.add(aliens);
    }
}

function spawnMonsters(){
    if(frameCount % 160 == 0){
        monsters = createSprite(0,0,50,50);
        monsters.addImage(monsterImage);
        monsters.scale = 0.21;
        monsters.x = Math.round(random(50,1150));
        monsters.velocityY = 3;
        monsters.lifetime = 200;
        monsterGroup.add(monsters);
    }
}


function spawnBossAliens(){
    if(frameCount % 220 == 0){
        bossAliens = createSprite(0,0,50,50);
        bossAliens.addImage(bossAlienImage);
        bossAliens.scale = 0.21;
        bossAliens.x = Math.round(random(50,1150));
        bossAliens.velocityY = 3;
        bossAliens.lifetime = 200;
        bossAlienGroup.add(bossAliens);
    }
}




//Defines the movement of the players
function keyPressed(){
    if(keyCode == LEFT_ARROW){
        player.velocityX = -6;
    }

    if(keyCode == RIGHT_ARROW){
        player.velocityX = 6;
    }

    

    //Achievement 1 reward
    if(score > 250 && keyCode == LEFT_ARROW){
        player.velocityX = -10;
    }

    if(score > 250 && keyCode == RIGHT_ARROW){
        player.velocityX = 10;
    }




    // Achievement 2 reward
    if(score > 1000 && keyCode == LEFT_ARROW){
        player.velocityX = -13;
    }

    if(score > 1000 && keyCode == RIGHT_ARROW){
        player.velocityX = 13;
    }


    //KeyBind
    if(keyCode == 32){
        createBullet();
    }
}


//Spawn Bullets for shooting the aliens
function createBullet(){
    bullet = createSprite(displayWidth/2,displayHeight/2 + 100,50,10);
    bullet.addImage(bulletImg);
    bullet.x = player.x;
    bullet.velocityY = -6;
    bullet.lifetime = 100;
    bullet.scale = 0.1;
    bulletGroup.add(bullet);
    shooterSound.play();
}


// Function to kill enemies 
function killAliens(){
    if(bulletGroup.isTouching(alienGroup)){
        alienGroup.destroyEach();
        score = score+10;
    }
}

// Function to kill the other enemies
function killMonsters(){
    if(bulletGroup.isTouching(monsterGroup)){
        monsterGroup.destroyEach();
        score = score+20;
    }
}

// Function to kill the other enemies
function killBossAliens(){
    if(bulletGroup.isTouching(bossAlienGroup)){
        bossAlienGroup.destroyEach();
        score = score+50;
    }
}



function resetPlayer(){
    if(player.x <= 20 || player.x>= displayWidth-20 ){
        player.x=displayWidth/2 + 200;
    }
}

function reset(){
    gameState = play;
    score = 0;
    gameOver.visible = false;
    restart.visible = false;
    alienGroup.destroyEach();
    monsterGroup.destroyEach();
    bossAlienGroup.destroyEach();
}
