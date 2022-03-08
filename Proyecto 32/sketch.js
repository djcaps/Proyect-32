const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body; 
const Render = Matter.Render;

var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var score = 0;
var count = 0;
var gameState="play";
var particle;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //crea los objetos para dividir
  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //crea la primera fila de objetos plinko
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //crea la segunda fila de objetos plinko
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //crea la tercera fila de objetos plinko
  for (var j = 40; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }
  
  //crea la cuarta fila de objetos plinko
  for (var j = 15; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

 
    
}
 


function draw() {
  background("black");
  textSize(35)
  text("Puntuación : "+score,20,40);
  fill("white");
  if(gameState ==="end"){
    textSize(50);
    fill("red");
    text("GAME OVER",250,250);
  }

  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);
  Engine.update(engine);
  ground.display();

  
  //muestra los plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //muestra las divisiones
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  if(particle !=null){
       particle.display();
      if(particle.body.position.y > 760) {
        if(particle.body.position.x < 300) {
          score = score + 500;
        }
        if(particle.body.position.x > 300 && particle.body.position.x < 600  ) {
          score = score + 100;
        }
        if(particle.body.position.x > 600 && particle.body.position.x < 900 ) {
          score = score + 200;
        }
        particle = null;
        if( count >= 5) gameState = "end";
      } 
    }

       
    }



    function mousePressed(){
      if(gameState !=="end"){
        count++;
        particle=new Particle(mouseX, 10, 10, 10);  
      }
  }
     