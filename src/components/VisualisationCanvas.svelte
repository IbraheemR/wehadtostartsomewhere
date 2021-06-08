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
  var Zindex = -500;

  var middlePositionsGotten = false;
  var middlePositions = [];

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
      boxSize = p.width / 55;
    }}
    draw={(p) => {
      p.background(100, 100, 100); // Bakground colour declaration
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
          p.translate(-p.width / 2, -p.height / 2);
          p.translate(i * (boxSize * 2), j * (boxSize * 2), 0);
          p.box(boxSize * 1.5);
          p.pop();

          if (filler == 255) {
            p.push();
            p.stroke(255, 255, 0); // Line between activations and inputs grid, line colour
            p.strokeWeight(3.5); // Line between activations and inputs grid, line thickness
            let position = p.random(middlePositions).copy();
            position.add(0, 0, -gridSpacing);
            p.line(
              -p.width / 2 + i * (boxSize * 2),
              -p.height / 2 + j * (boxSize * 2),
              0,
              -position.x,
              -position.y,
              -position.z
            );
            p.pop();
          }
        }
      }
      p.translate(0, 0, gridSpacing);
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 16; j++) {
          p.push();
          p.stroke(0); // Activations grid, line colour
          p.fill(255, 0, 0, 255 * activations[j * 8 + i]); // Activations grid, box colour
          let position = p.createVector(
            -7.5 * boxSize + i * (boxSize * 2),
            -15.5 * boxSize + j * (boxSize * 2),
            0
          );
          p.translate(position.x, position.y, position.z);
          p.box(boxSize * 1.8);
          p.pop();

          if (!middlePositionsGotten && middlePositions.length != 128) {
            middlePositions.push(position);
          }
        }
      }
      p.translate(0, 0, 100);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
          p.push();
          p.stroke(0); // Outputs grid, line colour
          p.fill(0, 255, 0, 255 * outputs[j * 5 + i]); // Outputs grid, box colour
          p.translate(-4.5 * boxSize, -1.5 * boxSize, 0);
          p.translate(i * (boxSize * 2), j * (boxSize * 2), 0);
          p.box(boxSize * 1.8);
          p.pop();
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
