<script>

  import HelloWorldDummy from "./HelloWorldDummy.svelte";
  import P5Canvas from "./p5/P5Canvas.svelte";

  export let model;

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


</script>

<main>
  <HelloWorldDummy {model} />

  <P5Canvas
    setup={(p) => {
      p.createCanvas(560, 560);
      p.background(0); 
    }}
    draw={(p) => {
      drawings.forEach(i => {
        p.stroke(0,255,0)
        p.strokeWeight(2)
        p.noFill()
        p.beginShape()
        i.forEach(j => {
        p.vertex(j.x,j.y)
        })
        p.endShape()
      });
      if(p.mouseIsPressed && mouseInside(p)){
        tempArr.push(p.createVector(p.mouseX,p.mouseY))
        drawings.pop()
        drawings.push(tempArr)

      }

    }}
    mouseClicked={(p) => {
      tempArr = []

    }}
    mouseReleased={(p) => {
      drawings.push(tempArr)

    }}
  />
</main>

<style>
</style>
