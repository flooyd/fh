<script lang="ts">
  import {
    getAuthorImageSrc,
    getAuthorName,
    getVoteCount,
    toggleEmojiDrawer,
    handleClickVote,
    deletePost,
  } from "../util";
  import { users, voteTypes, user, page, currentPost } from "../stores";
  import EmojiDrawer from "./EmojiDrawer.svelte";

  export let post: any;
  export let viewPost = false;
  let disableButtons = false;

  const handleClickPost = () => {
    if(viewPost) return;
    window.history.pushState(`/viewPost/${post.id}`, '', `/viewPost/${post.id}`)
    console.log(window.history);
    $page = "viewPost";
    $currentPost = post;
    document.title = 'Forum House - ' + post.title;
  };

  const handleClickDelete = async (e: { stopPropagation: () => void; }) => {
    disableButtons = true;
    e.stopPropagation();
    await deletePost(post);
    disableButtons = false;
  };

  const getStyle = () => {
    if (viewPost) {
      return 'cursor: default';
    }
    return {};
  };

  const handleVote = async (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }, voteType: string, post: any, user: any) => {
    disableButtons = true;
    await handleClickVote(e, voteType, post, user, disableButtons);
    disableButtons = false;
  }
</script>

<button class="post" on:click={handleClickPost} style={`${getStyle()}`}>
  <div class="author">
    <img src={getAuthorImageSrc($users, post)} alt="author" />
    {getAuthorName($users, post)}
  </div>
  <h2>{post.title}</h2>
  <div class="content">{post.content}</div>
  <div class="voteButtons">
    {#if post.showDrawer}
      <EmojiDrawer {post} />
    {/if}
    <button class="emojiButton" on:click={(e) => toggleEmojiDrawer(e, post)}
      >:)</button
    >
    {#each $voteTypes as voteType}
      <button disabled={disableButtons} on:click={(e) => handleVote(e, voteType.name, post, $user)}>
        <img src={voteType.src} alt={voteType.name} />
        {getVoteCount(voteType, post)}
      </button>
    {/each}
  </div>
  {#if $user && $user.id === post.authorId}
    <button class="deleteButton" on:click={handleClickDelete}>🗑️</button>
  {/if}
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
    position: relative;
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
    width: 75px;
    height: 75px;
    border-radius: 180px;
    margin-right: 10px;
  }

  .deleteButton {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: white;
    font-size: 25px;
    border-color: black;
  }

  .deleteButton:hover {
    background: red;
    color: white;
    border-color: black;
  }
</style>
