// the bullets creator
function createBullet() {
    bullets = createSprite(player.position.x,player.position.y,15,5);
    bullets.velocity.x = 8;
    bullets.life = 400;
    bulletGroup.add(bullets);
}

//the AI
function checkIfNear(zombInd) {
    if(zombies[zombInd] !== undefined) {
        if(pos.x-zombies[zombInd].zombie.position.x >-300 && pos.x-zombies[zombInd].zombie.position.x < 0 && pos.y-zombies[zombInd].zombie.position.y > -100 && pos.y-zombies[zombInd].zombie.position.y <0 && zombies[zombInd].zombie.position.y-pos.y <100 && zombies[zombInd].zombie.position.y-pos.y>0) {
            zombies[zombInd].zombie.velocity.x = -2;
        }

        if(pos.x-zombies[zombInd].zombie.position.x <300 && pos.x-zombies[zombInd].zombie.position.x > 0 && pos.y-zombies[zombInd].zombie.position.y > -100 && pos.y-zombies[zombInd].zombie.position.y <0 && zombies[zombInd].zombie.position.y-pos.y <100 && zombies[zombInd].zombie.position.y-pos.y>0) {
            zombies[zombInd].zombie.velocity.x = 2;
        }

        if(pos.y-zombies[zombInd].zombie.position.y >-300 && pos.y-zombies[zombInd].zombie.position.y < 0 && pos.x-zombies[zombInd].zombie.position.x > -100 && pos.x-zombies[zombInd].zombie.position.x <0 && zombies[zombInd].zombie.position.y-pos.x <100 && zombies[zombInd].zombie.position.x-pos.x>0) {
            zombies[zombInd].zombie.velocity.y = -2;
        }

        if(pos.y-zombies[zombInd].zombie.position.y <300 && pos.y-zombies[zombInd].zombie.position.y > 0 && pos.x-zombies[zombInd].zombie.position.x > -100 && pos.x-zombies[zombInd].zombie.position.x <0 && zombies[zombInd].zombie.position.y-pos.x <100 && zombies[zombInd].zombie.position.x-pos.x>0) {
            zombies[zombInd].zombie.velocity.y = 2;
        }
    }  
}

//the function to make sure that the zombies don't go out of the screen
function nowhereToGo(zombInd) {
    if(zombies[zombInd]!==undefined) {

        if(zombies[zombInd].zombie.alive === true) {
            if(zombies[zombInd].zombie.position.x > width*1.5)
                zombies[zombInd].zombie.position.x = width*1.5;
        
            if(zombies[zombInd].zombie.position.x < 0)
                zombies[zombInd].zombie.position.x = 0;

            if(zombies[zombInd].zombie.position.y > height-50)
                zombies[zombInd].zombie.position.y = height-50;

            if(zombies[zombInd].zombie.position.y < 50)
                zombies[zombInd].zombie.position.y = 50;
            }
        }
}

function checkHit(zombInd) {
    if(bulletGroup!==undefined && zombies[zombInd]!==undefined) {
        if(bulletGroup.collide(zombies[zombInd].zombie) && zombies[zombInd].zombie.removed === false) {
            console.log(zombies[zombInd].zombie);
            //zombies[zombInd].zombie.remove();
            zombies[zombInd].zombie.position.y = -100000;
            score++;
        }

        for(var i=0; i<bulletGroup.length; i++){
            if(bulletGroup.get(i)!==null && bulletGroup.get(i).collide(zombies[zombInd].zombie)){
                console.log(bulletGroup);
                bulletGroup.get(i).remove(i);
            }
        }
    }
}

function playerDie(zombInd) {
    if(zombies[zombInd]!== undefined) {
        if(zombies[zombInd].zombie.collide(player)) {
            gameState = "END";
            player.changeAnimation("die",playerDyingImg);
            setTimeout(()=>{
                player.changeImage("plr1dead",playerDeadImg);
                gameState = "LOST";
            },600);
            
            
        }
    }
}

function stopMoving(zombInd) {
    if(zombies[zombInd]!==undefined) {
        zombies[zombInd].zombie.velocity.x = 0;
        zombies[zombInd].zombie.velocity.y = 0;
    }
}

function checkZombieDeath(zombieInd) {
    if(zombies[zombieInd]!==undefined) {
        if(zombies[zombieInd].zombie.life===0){
            return true;
        }
    }
}

function restart() {
    for(var i = 0; i< zombies.length; i++) {
        zombies[i].zombie.remove();
    }

    player.position.x = width/6;
    player.position.y = height/2;

    gameState="PLAY";
    player.changeImage("plr1",playerImg);
    score = 0;
}