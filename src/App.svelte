<script>
  import InputCanvas from "./components/InputCanvas.svelte";
  import VisualisationCanvas from "./components/VisualisationCanvas.svelte";
  import TextInfo from "./components/TextInfo.svelte";
  import Probabilities from "./components/Probabilities.svelte";

  let clearCanvas;
</script>

<main>
  <div class="visarea">
    <VisualisationCanvas />
  </div>

  <div class="infoarea">
    <TextInfo {clearCanvas} />
  </div>

  <div class="probsarea">
    <Probabilities />
  </div>

  <div class="inputarea">
    <InputCanvas bind:clearCanvas />
  </div>
</main>

<style>
  main {
    display: grid;

    width: 100%;
    height: 100%;

    grid-template-areas: "vis" "info" "input";
    grid-template-rows: 1fr auto 1fr;
    grid-template-columns: 1fr;
  }

  @media (orientation: landscape) {
    main {
      grid-template-areas: "info vis" "input vis" "probs vis";
      grid-template-rows: auto 200px 1fr;
      grid-template-columns: 1fr 1fr;
    }

    .probsarea {
      display: block !important;
    }
  }
  .visarea {
    grid-area: vis;
  }

  .infoarea {
    grid-area: info;
    padding: 0 1rem;
  }

  .probsarea {
    display: none;
    grid-area: probs;
    padding: 1rem;
  }

  .inputarea {
    grid-area: input;
    padding: 1rem;
  }

  main > div {
    /* HACK: theres an issue with the way we are doing canvas resizing. 
      This seems to fix for now.
    */
    overflow: hidden;
  }
</style>
