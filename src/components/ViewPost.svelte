<script lang='ts'>
  import { currentPost } from '../stores';
  import Post from './Post.svelte';
  
  const viewPost = true;
</script>

<div>
  <Post post={$currentPost} {viewPost} />
</div>

<style>
</style>
