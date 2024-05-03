<script lang='ts'>
  import { voteTypes, user } from '../stores';
  import { handleClickVote } from '../util';
  //based copilot recommended prop post and now as i'm typing it gives me prop
  export let post;

  let disableButtons = false;
  //kappa

  const handleVote = async (e: any, voteType: any, post: any, user: any) => {
    disableButtons = true;
    handleClickVote(e, voteType, post, user);
    post.showDrawer = false;
    disableButtons = false;
  };
</script>

<div class='emojiDrawer'>
  {#each $voteTypes as voteType}
  <button disabled={disableButtons} on:click={(e) => handleVote(e, voteType.name, post, $user)}>
    <img src={$voteTypes.find((vt) => vt.name === voteType.name)?.src} alt={voteType.name} />
  </button>
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

  button {
    background: white;
      border: 1px solid black;
      border-radius: 5px;
      padding: 2.5px;
      display: flex;
  }


</style>
