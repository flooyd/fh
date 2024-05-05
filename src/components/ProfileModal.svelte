<script>
  import {
    profileModalOpen,
    user,
    fetchUrl,
    refresh,
    page,
    currentPost,
  } from '../stores';

  let displayName = $user.displayName || '';
  let image = $user.image || '';
  let bio = $user.bio || '';
</script>

<button class='modal' on:click|stopPropagation>
  <form
    on:submit|preventDefault={async () => {
      const userObj = {
        displayName,
        image,
        bio,
        id: $user.id,
      };
      const res = await fetch(`${$fetchUrl}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${$user.token}`,
        },
        body: JSON.stringify({ user: userObj }),
      });

      const data = await res.json();
      $user = data.user;
      localStorage.setItem('user', JSON.stringify($user));
      $profileModalOpen = false;
      $refresh = $refresh + 1;
    }}
  >
    <h1>Edit Profile</h1>
    {#if image}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={image} alt='profile image' />
    {/if}
    <label for='displayName'>Display Name</label>
    <input type='text' id='displayName' bind:value={displayName} required />
    <label for='image'>Image</label>
    <input type='text' id='image' bind:value={image} />
    <label for='bio'>Bio</label>
    <textarea id='bio' bind:value={bio}></textarea>
    <button type='submit'>Save</button>
  </form>

  <form
    class='logout'
    on:submit|preventDefault={async () => {
      localStorage.removeItem('user');
      $user = null;
      $profileModalOpen = false;
      $page = 'posts';
      $currentPost = null;
      const windowState = {
        title: 'Forum House',
        url: '/',
      };
      window.history.pushState(windowState, 'Forum House', windowState.url);
    }}
  >
    <button type='submit'>Logout</button>
  </form>
</button>

<style>
  .modal {
    position: absolute;
    top: 71px;
    right: 25px;
    background: white;
    color: black;
    padding: 20px;
    border: 3px solid yellow;
    height: calc(100vh - 81px);
    overflow-y: auto;
    width: 350px;
    z-index: 5;
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-bottom: px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: baseline;
  }

  label {
    font-weight: bold;
  }

  input,
  textarea {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
  }

  button {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid black;
    background-color: #333;
    color: white;
  }

  button:hover {
    background-color: white;
    color: black;
    border-color: yellow;
  }

  .logout {
    margin-top: 10px;
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 180px;
  }
</style>
