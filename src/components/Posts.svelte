<script lang='ts'>
  import { page, posts } from "../stores";
  import Post from "./Post.svelte";
</script>

<div class="toolbar">
  <h1>Posts</h1>
  <button on:click={() => $page = "createPost"}>Create Post</button>
</div>

{#each $posts as post}
  <Post {post} />
{/each}

<style>
  .toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }
</style>