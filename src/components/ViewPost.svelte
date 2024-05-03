<script lang="ts">
  import { onMount } from "svelte";
  import { currentPost, voteTypes, user, posts, fetchUrl } from "../stores";
  import Post from "./Post.svelte";
  import { fly } from "svelte/transition";

  const viewPost = true;
</script>

<div>
  <Post post={$currentPost} {viewPost} />
</div>

<style>
</style>
