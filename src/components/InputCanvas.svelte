<script>
  import P5Canvas from "../p5/P5Canvas.svelte";
  import model from "../model/model.js";

  export const clearCanvas = (p2) => {
    hiddenCanvas.background(0);
    model.inputs.set(new Array(784).fill(0));
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

  let pixelShades = Array(28 * 28).fill(0);
  let outputCanvas, hiddenCanvas;
  let container;
</script>

<h2>Draw a digit:</h2>
<div bind:this={container}>
  <P5Canvas
    setup={(p) => {
      p.createCanvas(200, 200); // Resize canvas here @HAM
      hiddenCanvas = p.createGraphics(200, 200);
      outputCanvas = p.createGraphics(28, 28);
      outputCanvas.pixelDensity(1);

      clearCanvas();
    }}
    draw={(p) => {
      if (p.mouseIsPressed && mouseOnScreen(p)) {
        // Draw on hidden canvas
        hiddenCanvas.stroke(255);
        hiddenCanvas.strokeWeight(p.height / 15);
        hiddenCanvas.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

        // Downscale to output size & grab values from array
        outputCanvas.image(hiddenCanvas, 0, 0, 28, 28);
        outputCanvas.loadPixels();
        for (let i = 0; i < pixelShades.length; i++) {
          let pixCol = outputCanvas.pixels[i * 4];
          pixelShades[i] = pixCol / 255;
        }
        outputCanvas.updatePixels();

        model.inputs.set(pixelShades);
      }

      // Draw user graphics on shown canvas

      p.image(hiddenCanvas, 0, 0);

      p.noFill();
      p.stroke(50);
      p.strokeWeight(2);
      p.rect(p.width * 0.2, p.height * 0.1, p.width * 0.6, p.height * 0.8);

      p.filter(p.INVERT);
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

  h2 {
    font-weight: bold;
  }
</style>
