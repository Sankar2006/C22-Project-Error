var Engine = Matter.Engine;
var World = Matter.World;
var Bodies =  Matter.Bodies;

var engine,world;
var ground;

 var boxes = [];
var gSlider;
 
 
function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
 
    
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40, 365);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
    var options = {
        isStatic: true
    }  
    ground = Bodies.rectangle(200,380,400,10,options);
    World.add(world, ground);

}
 
function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, 10, 10 ) );
    }
}
 
function draw() {
     background(51);
    var fVal = gSlider.value();
 
    for(var i = 0; i<boxes.length; i++){
        boxes[i].show();
    }
    rectMode(CENTER);
    fill("blue"); 
    rect(ground.position.x, ground.position.y, 10, 10);
    text("gravity"+ fVal, 160, 370);
}
 



function Box(x, y, w, h, options) {
    
    // add options such as friction and restitution. Experiment with the values
    var options = {
    friction: 0.5,
    restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x,y,width,height,options);
    this.width = width;
    this.height = height;

    World.add(world, this.body);

    this.show = function () {
   var pos = this.body.position;
   var angle = this.body.angle;
   push();
   translate(pos.x, pos.y);
   rotate(angle);
   rectMode(CENTER);
   rect(0,0,this.width,this.height);
   pop();
    }
}