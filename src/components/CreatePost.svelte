<script lang='ts'>
  import { page, refresh, user } from "../stores";

  let title = '';
  let content = '';
  let disabled = false;

  const handleClickSubmit = async (e: { preventDefault: () => void; }) => {
    disabled = true;
    e.preventDefault();
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        post: {
          title,
          content,
          authorId: $user.id
        }
      })
    });
    const data = await res.json();
    title = '';
    content = '';
    $refresh = $refresh + 1;
    $page = 'posts';
  }
</script>

<div class="toolbar">
  <h1>Create Post</h1>
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
  <button type="submit" disabled={disabled}>Submit</button>
</form>

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

  input, textarea {
    padding: 5px;
  }
</style>