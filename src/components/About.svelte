<script>
  import Button from "./Button.svelte";

  export let switchAbout
</script>

<div>
    Content goes here.
    <Button buttonClass="about" onclick={switchAbout}>Exit</Button>
</div>

<style>
    div {
        min-height: 100%;
        min-width: 100%;
        position: fixed;
        background-color: rgb(52,51,58);
        color: #fff;
    }
</style>