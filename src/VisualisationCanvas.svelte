<script>
    import P5Canvas from "./p5/P5Canvas.svelte";
    import data from "./model/model.js"
import { xlink_attr } from "svelte/internal";

    var inputs;
    data.inputs.subscribe(content => {
      inputs = content
    })

    
    var alpha = -30 , beta = 45;
    var boxSize;
    var Zindex = -1000;

    var middlePositionsGotten = false;
    var middlePositions = [];

    const gridSpacing = 400


    function mouseOnScreen(p){
      if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height){
        return true
      }
      return false
    }

  </script>
  
<P5Canvas
  setup={(p) => {
    p.createCanvas(850, 850, p.WEBGL); // Resize canvas elements here @HAM
    p.angleMode(p.DEGREES)
    boxSize = p.width/55
    //p.rectMode(p.CENTER)
  }}
  draw={(p) => {
    p.background(100,100,100)
    p.translate(0,0,Zindex)

    if(p.mouseIsPressed && mouseOnScreen(p)){
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
        p.stroke(0)
        let filler = 255 * (inputs[j*28 + i])
        p.fill(filler)
        p.translate(-p.width/2,-p.height/2)
        p.translate(i*(boxSize*2),j*(boxSize*2),0)
        p.box(boxSize*1.5);
        p.pop()


        if(filler == 255){
          p.push()
          p.stroke(p.random(0,255), p.random(0,255), p.random(0,255))
          p.strokeWeight(7)
          let position = p.random(middlePositions).copy()
          position.add(0,0,-gridSpacing)
          p.line((-p.width/2)+(i*(boxSize*2)),(-p.height/2)+(j*(boxSize*2)),0,-position.x,-position.y,-position.z)
          p.pop()
        }
      }
    }
    p.translate(0,0,gridSpacing)
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 16; j++){
        p.push();
        p.stroke(0)
        p.fill(p.random(0,255), p.random(0,255), p.random(0,255))
        let position = p.createVector((-7.5*boxSize)+(i*(boxSize*2)),(-15.5*boxSize)+(j*(boxSize*2)),0)
        p.translate(position.x,position.y,position.z)
        p.box(boxSize*1.8);
        p.pop();

        if(!middlePositionsGotten && middlePositions.length != 128){
          middlePositions.push(position)
        }
    }
  }
    p.translate(0,0,250)
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 2; j++){
        p.push();
        p.stroke(0)
        p.translate(-4.5*boxSize,-1.5*boxSize,0)
        p.translate(i*(boxSize*2),j*(boxSize*2),0)
        p.box(boxSize*1.8);
        p.pop();
      }
    }
  }}
  mouseWheel={(p,event) => {
    if(mouseOnScreen(p)){ 
      event.preventDefault()
      Zindex -= event.delta*2
    }
  }}
/>
  