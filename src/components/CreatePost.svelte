<script lang="ts">
  import { fly } from "svelte/transition";
  import { page, refresh, user, fetchUrl } from "../stores";
  import { onMount } from "svelte";

  export let post: any = null;
  export let isEdit = false;
  let title = post ? post.title : "";
  let content = post ? post.content : "";
  let disabled = false;
  let ready = false;

  onMount(() => {
    ready = true;
  });

  const handleClickSubmit = async (e: { preventDefault: () => void }) => {
    disabled = true;
    if(isEdit) {
      await editPost();
    } else {
      await createPost();
    }
    e.preventDefault();
  };

  const createPost = async () => {
    const res = await fetch(`${$fetchUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$user.token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          content,
          authorId: $user.id,
        },
      }),
    });
    const data = await res.json();
    title = "";
    content = "";
    $refresh = $refresh + 1;
    $page = "posts";
  }

  const editPost = async () => {
    const res = await fetch(`${$fetchUrl}/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$user.token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          content,
        },
      }),
    });
    const data = await res.json();
    title = "";
    content = "";
    $refresh = $refresh + 1;
    $page = "posts";
  }
</script>

{#if ready}
  <div transition:fly={{ x: -20 }}>
    <div class="toolbar">
      <h1>{isEdit ? 'Edit' : 'Create'}</h1>
    </div>
    <form on:submit={handleClickSubmit}>
      <label>
        Title
        <input type="text" bind:value={title} />
      </label>
      <label>
        Content
        <textarea bind:value={content}></textarea>
      </label>
      <button type="submit" {disabled}>Submit</button>
    </form>
  </div>
{/if}

<style>
  .toolbar {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-weight: bold;
  }

  input,
  textarea {
    padding: 5px;
  }
</style>
