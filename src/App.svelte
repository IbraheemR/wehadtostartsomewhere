<script>
  import InputCanvas from "./components/InputCanvas.svelte";
  import VisualisationCanvas from "./components/VisualisationCanvas.svelte";
  import TextInfo from "./components/TextInfo.svelte";

  let clearCanvas;
</script>

<main>
  <div class="visarea">
    <VisualisationCanvas />
  </div>

  <div class="infoarea">
    <TextInfo {clearCanvas} />
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
    grid-template-rows: 5fr auto 5fr;
    grid-template-columns: 1fr;
  }

  @media (orientation: landscape) {
    main {
      grid-template-areas: "info vis" "input vis";
      grid-template-rows: auto 1fr;
      grid-template-columns: 1fr 1fr;
    }
  }
  .visarea {
    grid-area: vis;
  }

  .infoarea {
    grid-area: info;
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
