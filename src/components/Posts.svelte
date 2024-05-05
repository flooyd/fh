<script lang='ts'>
  import { page, posts } from '../stores';
  import Post from './Post.svelte';

  const handleClickCreatePost = () => {
    window.history.pushState(`createPost`, '', `createPost`);
    $page = 'createPost';
    document.title = 'Forum House - ' + 'Create Post';
  };
</script>

<div>
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

<style>
  .toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }

  button {
    border-width: 1px;
  }
</style>
