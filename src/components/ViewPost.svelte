<script lang="ts">
  import { onMount } from "svelte";
  import { currentPost, voteTypes, user, posts, fetchUrl } from "../stores";
  import Post from "./Post.svelte";
    import { fly } from "svelte/transition";

  const viewPost = true;
  let ready = false;

  onMount(() => {
    ready = true;
  });
</script>

{#if ready}
  <div transition:fly={{ x: -20 }}>
    <Post post={$currentPost} {viewPost} />
  </div>
{/if}

<style>
</style>
