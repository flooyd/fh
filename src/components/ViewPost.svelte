<script lang='ts'>
  import { currentPost } from '../stores';
    import Comments from './Comments.svelte';
  import Post from './Post.svelte';
  
  const viewPost = true;
</script>

<div>
  <Post post={$currentPost} {viewPost} />
  <Comments post={$currentPost} />
</div>

<style>
</style>
