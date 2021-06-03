<script>


    import P5Canvas from "./p5/P5Canvas.svelte";

    var alpha = 0 , beta = 0;
    var boxSize;
    var Zindex = -1000;

  </script>
  
<P5Canvas
  setup={(p) => {
    p.createCanvas(1000, 1000, p.WEBGL);
    p.angleMode(p.DEGREES)
    boxSize = p.width/55
    //p.rectMode(p.CENTER)
  }}
  draw={(p) => {
    p.background(100,100,100)
    p.translate(0,0,Zindex)

    if(p.mouseIsPressed){
      let rotatorY = p.mouseX - p.pmouseX;  // Rotating of camera using the mouse
      let rotatorX = p.mouseY - p.pmouseY;
     
      alpha -= rotatorX;
      beta += rotatorY;

    }
    alpha= p.constrain(alpha,-90,90)
    p.rotateX(alpha);
    p.rotateY(beta);


    for(let i = 0; i < 28; i++){
      for(let j = 0; j < 28; j++){
        p.push();
        p.translate(-p.width/2,-p.height/2)
        p.translate(i*(boxSize*2),j*(boxSize*2),0)
        p.box(boxSize*1.5);
        p.pop();
      }
    }
    p.translate(0,0,250)
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 16; j++){
        p.push();
        p.translate(-7.5*boxSize,-15.5*boxSize,0)
        p.translate(i*(boxSize*2),j*(boxSize*2),0)
        p.box(boxSize*1.8);
        p.pop();
      }
    }
    p.translate(0,0,250)
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 2; j++){
        p.push();
        p.translate(-4.5*boxSize,-1.5*boxSize,0)
        p.translate(i*(boxSize*2),j*(boxSize*2),0)
        p.box(boxSize*1.8);
        p.pop();
      }
    }
  }}
  mouseWheel={(p,event) => {
    if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){ 
      event.preventDefault()
      Zindex -= event.delta*2
    }
  }}
/>
  