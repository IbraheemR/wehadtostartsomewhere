<script>
  import P5Canvas from "./p5/P5Canvas.svelte";
  import model from "./model/model.js";

  let pixelShades = [];
  let smallCanvas;
</script>

<P5Canvas
  setup={(p) => {
    p.createCanvas(280,280); // Resize canvas here @HAM
    smallCanvas = p.createGraphics(28,28);
    p.pixelDensity(1);
    smallCanvas.pixelDensity(1);
    p.background(0);
  }}
  draw={(p) => {

    if (p.mouseIsPressed) {
      smallCanvas.loadPixels();
      for (let i = 0; i < smallCanvas.pixels.length; i += 4) {
        let pixCol = smallCanvas.pixels[i + 1]; // Only sampling the green channel. Be warned about this if we change colors etc.
        pixelShades.push(pixCol);
      }
      smallCanvas.updatePixels();
      
      model.inputs.set(pixelShades);
      pixelShades = [];
      
      p.stroke(255);
      p.strokeWeight(p.height/15);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
      smallCanvas.image(p,0,0,28,28)
    }
  }}
/>
