<script>
  import model from "../model/model";
  import Button from "./Button.svelte";

  let { outputs } = model;

  export let clearCanvas;
  export let switchAbout;

  let prediction, confidence;

  $: [prediction, confidence] = $outputs.reduce(
    (iMax, x, i, arr) => (x > iMax[1] ? [i, x] : iMax),
    [0, 0]
  );
</script>

<h3 id="credit">(Ibraheem Rodrigues Et Al.)</h3>
<h1>MNIST Explorer</h1>

<div id="controls">
  <div id="prediction">
    Prediction:
    <strong>
      {#if confidence < 0.7}
        Unsure
      {:else}
        {prediction}
      {/if}
    </strong>

    <br />

    Confidence: <strong>{(confidence * 100).toFixed(1)}%</strong>
  </div>

  <Button onclick={switchAbout}>About</Button>
  <Button onclick={clearCanvas} primaryStyle>Clear</Button>
</div>

<style>
  #controls {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  #prediction {
    display: inline;
    font-size: 1.5rem;
  }

  #credit {
    text-align: right;
  }
</style>
