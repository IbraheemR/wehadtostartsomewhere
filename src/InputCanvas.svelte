

<script>

    import P5Canvas from "./p5/P5Canvas.svelte";
    import model from "./model/model.js"
import { text } from "svelte/internal";

    function mouseInside(p){
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY< p.height){
      return true
  }
    else{
      return false
    }
  }

  let drawings = [];
  let tempArr = [];
  let pixelShades = []
  let adjustedPixelShades = []
</script>






<P5Canvas
setup={(p) => {
    p.createCanvas(280, 280);
    p.background(0); 
}}
draw={(p) => {
    p.loadPixels()
    for(let i = 0; i< p.pixels.length; i+=4){
      let pixCol = p.pixels[i+1] // Only sampling the green channel 
      pixelShades.push(pixCol)
    }
    p.updatePixels()
    for(let i = 0; i < pixelShades.length; i+=100){
      let average = 0
      for(let j = 0; j < 100; j++){
        average += pixelShades[i+j]
      }
      average = (average/100)/255
      adjustedPixelShades.push(p.round(average,2))
    }

    model.inputs.set(adjustedPixelShades)


    adjustedPixelShades = []
    pixelShades = []
    

    if (p.mouseIsPressed) {
    p.stroke(255);
    p.strokeWeight(35);
    p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);
    }

}}
mouseClicked={(p) => {
    tempArr = []

}}
mouseReleased={(p) => {
    drawings.push(tempArr)

}}
/>

