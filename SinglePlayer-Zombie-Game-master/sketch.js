//IMPORTANT: GAME IS YET TO BE FINISHED

//declaring the variables as global variables
var boss,bossDyingImg,bossWalking,bossImg;
var player, playerImg,playerWalking, playerDyingImg, playerDeadImg;
var zombie1Img,zombie1Walking, zombie1DyingImg;
var zombies = [];
var pos;
var bullets;
var bulletGroup;
var score = 12;

//declaring gameStates
var gameState = "PLAY";

function preload() {
    //loading all the images
    playerImg = loadImage("Sprites/Player1/Still.png");
    playerWalking = loadAnimation("Sprites/Player1/Walking/1.png","Sprites/Player1/Walking/2.png","Sprites/Player1/Walking/3.png","Sprites/Player1/Walking/4.png","Sprites/Player1/Walking/5.png","Sprites/Player1/Walking/6.png","Sprites/Player1/Walking/7.png","Sprites/Player1/Walking/8.png");
    playerDyingImg = loadAnimation("Sprites/Player1/Dying/2.png","Sprites/Player1/Dying/3.png","Sprites/Player1/Dying/4.png","Sprites/Player1/Dying/5.png");
    playerDyingImg.frameDelay = 10;
    playerDeadImg = loadImage("Sprites/Player1/Dying/5.png");

    zombie1Img = loadImage("Sprites/Zombie1/Still.png");
    zombie1Walking = loadAnimation("Sprites/Zombie1/Walking/1.png","Sprites/Zombie1/Walking/2.png","Sprites/Zombie1/Walking/3.png","Sprites/Zombie1/Walking/4.png","Sprites/Zombie1/Walking/5.png","Sprites/Zombie1/Walking/6.png","Sprites/Zombie1/Walking/7.png","Sprites/Zombie1/Walking/8.png","Sprites/Zombie1/Walking/9.png","Sprites/Zombie1/Walking/10.png","Sprites/Zombie1/Walking/11.png","Sprites/Zombie1/Walking/13.png","Sprites/Zombie1/Walking/14.png");
    zombie1Walking.frameDelay = 6;
    zombie1DyingImg = loadAnimation("Sprites/Zombie1/Dying/1.png","Sprites/Zombie1/Dying/2.png","Sprites/Zombie1/Dying/3.png","Sprites/Zombie1/Dying/4.png","Sprites/Zombie1/Dying/5.png");

    bossImg = loadImage("Sprites/Boss/still.png");
    bossWalking = loadAnimation("Sprites/Boss/Walking/1.png","Sprites/Boss/Walking/2.png","Sprites/Boss/Walking/3.png","Sprites/Boss/Walking/4.png","Sprites/Boss/Walking/5.png","Sprites/Boss/Walking/6.png","Sprites/Boss/Walking/7.png","Sprites/Boss/Walking/8.png","Sprites/Boss/Walking/9.png","Sprites/Boss/Walking/10.png","Sprites/Boss/Walking/11.png");
    bossDyingImg = loadAnimation("Sprites/Boss/Dying/1.png","Sprites/Boss/Dying/2.png","Sprites/Boss/Dying/3.png","Sprites/Boss/Dying/4.png","Sprites/Boss/Dying/5.png");
}

function setup() {
    //canvas set for window's
    createCanvas(windowWidth,windowHeight);

    //creating the player sprite and giving it the image
    player = createSprite(width/6,height/2);
    player.addImage("plr1",playerImg);
    player.addAnimation("die",playerDyingImg);
    player.addImage("plr1dead",playerDeadImg);

    bulletGroup = new Group();
}

function draw() {
    //background color set to sandy
    background("#CAAA7A");

    if(gameState === "PLAY") {
        //movement controls
        if(keyDown(UP_ARROW) && player.position.y > 50) {
            player.position.y -= 10;
        }
        if(keyDown(DOWN_ARROW) && player.position.y < height-50) {
            player.position.y += 10;
        }
        if(keyDown(RIGHT_ARROW) && player.position.x < width*1.5) {
            player.position.x += 10;
        }
        if(keyDown(LEFT_ARROW) && player.position.x > 50) {
            player.position.x -= 10;
        }

        //creates a zombie every 150 framecount
        if(frameCount%150==0 && zombies.length < 15) {
            zombies.push(new Zombie());
        }

        //creates bullets everytime space bar is clicked
        if(keyDown("space")) {
            createBullet();
        }

        //AI applier
        checkIfNear(0);
        checkIfNear(1);
        checkIfNear(2);
        checkIfNear(3);
        checkIfNear(4);
        checkIfNear(5);
        checkIfNear(6);
        checkIfNear(7);
        checkIfNear(8);
        checkIfNear(9);
        checkIfNear(10);
        checkIfNear(11);
        checkIfNear(12);
        checkIfNear(13);
        checkIfNear(14);

        //zombie killing system
        checkHit(0);
        checkHit(1);
        checkHit(2);
        checkHit(3);
        checkHit(4);
        checkHit(5);
        checkHit(6);
        checkHit(7);
        checkHit(8);
        checkHit(9);
        checkHit(10);
        checkHit(11);
        checkHit(12);
        checkHit(13);
        checkHit(14);

        //player die condition
        playerDie(0);
        playerDie(1);
        playerDie(2);
        playerDie(3);
        playerDie(4);
        playerDie(5);
        playerDie(6);
        playerDie(7);
        playerDie(8);
        playerDie(9);
        playerDie(10);
        playerDie(11);
        playerDie(12);
        playerDie(13);
        playerDie(14);
    }
    //score displayer
    textSize(20);
    text("Score: "+score,player.position.x-20,player.position.y-(player.height/1.5))

    //made an easier variable for player's position
    pos = player.position;

    //adjusting the camera
    camera.position.x = player.position.x + width/3;
    camera.position.y = height/2;

    //draws all the sprites
    drawSprites();

    //to display position of the player (just for testing pusposes)
    // textSize(20);
    // text(pos.x + "," + pos.y,pos.x-50,pos.y-70);

    //makes sure that no zombie goes out of the screen
    nowhereToGo(0);
    nowhereToGo(1);
    nowhereToGo(2);
    nowhereToGo(3);
    nowhereToGo(4);
    nowhereToGo(5);
    nowhereToGo(6);
    nowhereToGo(7);
    nowhereToGo(8);
    nowhereToGo(9);
    nowhereToGo(10);
    nowhereToGo(11);
    nowhereToGo(12);
    nowhereToGo(13);
    nowhereToGo(14);

    if(score===15) {
          text("Congratulation! You Won!",player.position.x,height/2);
          gameState = "WON";
      }

    if(gameState === "WON" || gameState=== "LOST") {
        text("Press Space to restart",player.position.x,height/2+20)
        if(keyDown("space")) {
            restart();
        }
    }

    if(gameState === "LOST") {
        text("You Lost!",player.position.x,height/2);
    }

}