<script>
  import P5Canvas from "../p5/P5Canvas.svelte";
  import model from "../model/model.js";

  let pRef;

  export const clearCanvas = () => {
    if (pRef) {
      pRef.background(255);
      model.inputs.set(new Array(784).fill(0));
    }
  };

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

  let pixelShades = [];
  let smallCanvas;
  let container;
</script>

<div bind:this={container}>
  <P5Canvas
    setup={(p) => {
      p.createCanvas(200, 200); // Resize canvas here @HAM
      smallCanvas = p.createGraphics(28, 28);
      p.pixelDensity(1);
      smallCanvas.pixelDensity(1);
      p.background(255); // Background colour @HAM
      pRef = p;
    }}
    draw={(p) => {
      if (p.mouseIsPressed && mouseOnScreen(p)) {
        smallCanvas.loadPixels();
        for (let i = 0; i < smallCanvas.pixels.length; i += 4) {
          let pixCol = smallCanvas.pixels[i + 1]; // Only sampling the green channel. Be warned about this if we change colors etc.
          pixelShades.push(1 - pixCol / 255);
        }
        smallCanvas.updatePixels();

        model.inputs.set(pixelShades);
        pixelShades = [];

        p.stroke(0);
        p.strokeWeight(p.height / 15);
        p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
        smallCanvas.image(p, 0, 0, 28, 28);
      }
    }}
  />
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
