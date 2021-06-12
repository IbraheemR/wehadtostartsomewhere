<script>
  import Button from "./Button.svelte";

  export let show;
</script>

<div class="blur" class:show>
  <section>
    <div class="right">
      <Button onclick={() => (show = false)} primaryStyle>Exit</Button>
    </div>
  </section>
</div>

<style>
  .blur {
    position: fixed;

    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    display: none;

    background: rgba(1, 1, 1, 0.7);

    justify-content: center;
    align-items: center;
  }

  .blur.show {
    display: flex;
  }

  section {
    width: 90vmin;
    max-width: 1000px;
    height: 90vmin;

    padding: 1rem;

    background: var(--theme-bg);
  }

  .right {
    float: right;
  }
</style>
