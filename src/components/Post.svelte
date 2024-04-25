<script lang='ts'>
    import { getAuthorImageSrc, getAuthorName, getVoteCount, toggleEmojiDrawer, handleClickVote } from '../util';
    import {users, voteTypes, user, page, currentPost} from '../stores';
    import EmojiDrawer from './EmojiDrawer.svelte';

    export let post: any;

    const handleClickPost = () => {
    $page = "viewPost";
    $currentPost = post;
    const windowState = {
      title: post.title,
      url: `/viewPost/${post.id}`
    }
    window.history.pushState(windowState, post.title, windowState.url);
  }
</script>

<button class='post' on:click={handleClickPost}>
    <div class='author'>
        <img src={getAuthorImageSrc($users, post)} alt='author' />
        {getAuthorName($users, post)}
    </div>
    <h2>{post.title}</h2>
    <div class='content'>{post.content}</div>
    <div class="voteButtons">
        {#if post.showDrawer}
          <EmojiDrawer post={post} />
        {/if}
        <button class='emojiButton' on:click={e => toggleEmojiDrawer(e, post)}>:)</button>
        {#each $voteTypes as voteType}
        
          <button on:click={(e) => handleClickVote(e, voteType.name, post, $user)}>
            <img src={voteType.src} alt={voteType.name} />
            {getVoteCount(voteType, post)}
          </button>
        
      {/each}
      </div>
</button>

<style>
    .post {
    margin-bottom: 20px;
    padding: 10px;
    background: white;
    color: black;
    border-radius: 5px;
    border: 3px solid black;
    width: 100%;
    text-align: left;
  }

  .post:hover {
    background: #ccc;
    cursor: pointer;
  }

  .post h2 {
    margin-bottom: 20px;
  }  

  .voteButtons {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 20px;
    align-items: center;
  }

  .voteButtons .emojiButton {
    background: #333;
    color: white;
    border: 3px solid yellow;
    border-radius: 180px;
    padding: 10px;
    height: 32px;
    margin-right: 15px;
  }

  .voteButtons .emojiButton:hover {
    background: white;
    color: black;
  }

  .voteButtons button {
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: black;
  }

  .voteButtons button img {
    width: 25px;
    height: 25px;
  }

  .author {
    font-style: italic;
    color: blue;
    margin-bottom: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .author img {
    width: 64px;
    height: 64px;
    border-radius: 180px;
    margin-right: 10px;
  }
</style>