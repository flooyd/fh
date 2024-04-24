<script>
  import { voteTypes } from "../stores";
  //based copilot recommended prop post and now as i'm typing it gives me prop
  export let post;
  //kappa
</script>

<div class="emojiDrawer">
  {#each $voteTypes as voteType}
    <img src={voteType.src} alt={voteType.name} title={voteType.name} />
  {/each}
</div>

<style>
  .emojiDrawer {
    position: absolute;
    width: 200px;
    height: 100px;
    border: 3px solid #333;
    border-radius: 5px;
    bottom: 0px;
    left: 42px;
    background: white;
    box-shadow: 3px 3px 10px 0px #333;
    display: flex;
    gap: 5px;
    padding: 5px;
    flex-wrap: wrap;
  }

  img {
    width: 32px;
    height: 32px;
  }


</style>
