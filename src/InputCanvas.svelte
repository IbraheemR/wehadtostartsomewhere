<script>
  import P5Canvas from "./p5/P5Canvas.svelte";
  import model from "./model/model.js";

  let pixelShades = [];
  let adjustedPixelShades = [];
</script>

<P5Canvas
  setup={(p) => {
    p.createCanvas(280, 280);
    p.background(0);
  }}
  draw={(p) => {
    if (p.mouseIsPressed) {
      p.loadPixels();
      for (let i = 0; i < p.pixels.length; i += 4) {
        let pixCol = p.pixels[i + 1]; // Only sampling the green channel. Be warned about this if we change colors etc.
        pixelShades.push(pixCol);
      }
      p.updatePixels();

      // Possible optimisation to this using createGraphics?
      for (let i = 0; i < pixelShades.length; i += 100) {
        let average = 0;
        for (let j = 0; j < 100; j++) {
          average += pixelShades[i + j];
        }
        average = average / 100 / 255;
        adjustedPixelShades.push(p.round(average, 2));
      }

      model.inputs.set(adjustedPixelShades);

      adjustedPixelShades = [];
      pixelShades = [];

      p.stroke(255);
      p.strokeWeight(35);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }
  }}
/>
