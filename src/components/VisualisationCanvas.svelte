<script>
  import P5Canvas from "../p5/P5Canvas.svelte";
  import data from "../model/model.js";

  var inputs;
  data.inputs.subscribe((content) => {
    inputs = content;
  });

  var outputs;
  var mostProbableDigit;
  data.outputs.subscribe((content) => {
    outputs = content;
    mostProbableDigit = Math.max(...content);
  });

  var activations;
  data.activations.subscribe((content) => {
    activations = content;
  });

  var alpha = -30,
    beta = 45;
  var boxSize;
  var Zindex;

  var middlePositions = [];
  var randomChooser = [];
  var finalPositions = [];
  var randomChooser2 = [];

  var InputGridToMiddleSpacing;
  var MiddlegridToOutputSpacing;

  const gridSpacing = 400;

  function mouseOnScreen(p) {
    if (
      p.mouseX > 0 &&
      p.mouseX < p.width &&
      p.mouseY > 0 &&
      p.mouseY < p.height
    ) {
      return true;
    }
    return false;
  }

  let container;
</script>

<div bind:this={container}>
  <P5Canvas
    setup={(p) => {
      p.createCanvas(container.clientWidth, container.clientHeight, p.WEBGL);
      p.angleMode(p.DEGREES);
      boxSize = p.width/55;
      Zindex = -boxSize*40;
      InputGridToMiddleSpacing = boxSize*25;
      MiddlegridToOutputSpacing = boxSize*7.5;

      for(let i = 0; i < 28*28; i++){
        randomChooser.push(p.random())
      }
      for(let i = 0; i < 128; i++){
        randomChooser2.push(p.random())
      }
    }}
    draw={(p) => {
      p.background(100, 100, 100); // Background colour declaration
      p.translate(0, 0, Zindex);

      if (p.mouseIsPressed && mouseOnScreen(p)) {
        let rotatorY = p.mouseX - p.pmouseX; // Rotating of camera using the mouse
        let rotatorX = p.mouseY - p.pmouseY;

        alpha -= rotatorX;
        beta += rotatorY;
      }
      alpha = p.constrain(alpha, -90, 90);
      p.rotateX(alpha);
      p.rotateY(beta);

      for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
          p.push();
          p.stroke(255, 255, 255, 100); // Inputs grid, line colour
          let filler = 255 * inputs[j * 28 + i]; // Inputs array, box colour
          p.fill(filler);
          p.translate(-p.width / 2, -p.height / 2,0);
          p.translate(i * (boxSize * 2), j * (boxSize * 2), 0);
          p.box(boxSize * 1.5);
          p.pop();

          if (middlePositions.length == 128 && randomChooser[j + i*28] < 0.04) {// CHANGE 0.04 TO HIGHER FOR MORE LINES AND LOEWR FOR LESS LINES
            p.push();
            p.stroke(255, 255, 0); // Line between activations and inputs grid, line colour
            p.strokeWeight(3.5); // Line between activations and inputs grid, line thickness
            let position = middlePositions[Math.floor(p.map(i*j,0,28*28,0,128))].copy()
            position.add(0, 0, InputGridToMiddleSpacing);
            p.line(
              -p.width / 2 + i * (boxSize * 2),
              -p.height / 2 + j * (boxSize * 2),
              0,
              position.x,
              position.y,
              position.z
            );
            p.pop();
          }
        }
      }
      p.translate(0, 0, InputGridToMiddleSpacing);
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 16; j++) {
          p.push();
          p.stroke(0); // Activations grid, line colour
          p.fill(255, 0, 0, 255 * activations[j * 8 + i]); // Activations grid, box colour
          let position = p.createVector(i*2*boxSize,j*boxSize*2,0)
          p.translate(-p.width/2,-p.height/2,0)
          p.translate(position.x, position.y, position.z);
          p.translate(10*boxSize*2,6*boxSize*2,0);
          p.box(boxSize * 1.8);
          p.pop();
          let position3 = position.copy()
          if (middlePositions.length != 128) {
            position.add(-p.width/2,-p.height/2,0);
            position.add(10*boxSize*2,6*boxSize*2,0);

            middlePositions.push(position.copy());
          }
          if(finalPositions.length == 10 && randomChooser2[i*16 + j] < 0.05){ // CHANGE 0.05 TO HIGHER FOR MORE LINES AND LOEWR FOR LESS LINES
            p.push();

            p.stroke(0,0, 255); // Line between middle and outputs grid, line colour
            p.strokeWeight(3.5); // Line between middle and outputs grid, line thickness
            let position2 = finalPositions[Math.floor(p.map(i*j,0,8*16,0,10))].copy()
            position2.add(0, 0, MiddlegridToOutputSpacing);
            p.line(position3.x -p.width/2 + 10*boxSize*2,position3.y -p.height/2 + 6*boxSize*2,0,position2.x,position2.y,position2.z);

            p.pop();
          }
        }
      }
      p.translate(0, 0, MiddlegridToOutputSpacing);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
          p.push();
          p.stroke(0); // Outputs grid, line colour
          p.fill(0, 255, 0, 255 * outputs[j * 5 + i]); // Outputs grid, box colour
          var position2 = p.createVector(i*boxSize*2,j*boxSize*2,0);
          p.translate(position2.x,position2.y,position2.z);
          p.translate(-p.width/2,-p.height/2,0)
          p.translate(11.5*boxSize*2,13*boxSize*2,0);
          p.box(boxSize * 1.8);

          p.pop();
        }
        if(finalPositions.length != 10){
          position2.add(-p.width/2,-p.height/2,0);
          position2.add(11.5*boxSize*2,13*boxSize*2,0);
          finalPositions.push(position2.copy());
        }
      }
    }}
    mouseWheel={(p, event) => {
      if (mouseOnScreen(p)) {
        event.preventDefault();
        Zindex -= event.delta * 2;
      }
    }}
    windowResized={(p) => {
      p.resizeCanvas(container.clientWidth, container.clientHeight);
      boxSize = p.width/55;
      Zindex = -boxSize*25;
      InputGridToMiddleSpacing = boxSize*25;
      MiddlegridToOutputSpacing = boxSize*7.5;
      middlePositions = []
      finalPositions = []
    }}
  />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
