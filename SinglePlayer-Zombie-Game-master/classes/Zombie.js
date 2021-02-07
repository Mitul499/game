class Zombie {
    constructor() {
        this.zombie = createSprite(random(width/4,width*1.5), random(50,height-50));
        this.zombie.scale = 1.4;
        this.zombie.setCollider("rectangle",this.zombie.x,this.zombie.y,70,100);
        this.zombie.addAnimation("zom1",zombie1Walking);
    }

    alive() {
        // return true;
        console.log("Anything")
    }
}