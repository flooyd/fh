<script lang='ts'>
  import { fly } from 'svelte/transition';
  import { page, posts } from '../stores';
  import Post from './Post.svelte';
  import { onMount } from 'svelte';

  let ready = false;

  onMount(() => {
    ready = true;
  });

  const handleClickCreatePost = () => {
    window.history.pushState(`createPost`, '', `createPost`)
    console.log(window.history);
    $page = "createPost";
    document.title = 'Forum House - ' + 'Create Post';
  }
</script>

{#if ready}
  <div transition:fly={{ x: -20 }}>
    <div class='toolbar'>
      <h1>Posts</h1>
      <button on:click={() => handleClickCreatePost()}>Create Post</button>
    </div>
    <div>
      {#each $posts as post}
        <Post {post} />
      {/each}
    </div>
  </div>
{/if}

<style>
  .toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }
</style>
