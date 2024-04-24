<script>
  import { user } from "../stores";

  let displayName = $user.displayName || '';
  let image = $user.image || '';
  let bio = $user.bio || '';
</script>

<form
  class="modal"
  on:submit|preventDefault={async () => {
    const userObj = {
      displayName,
      image,
      bio,
      id: $user.id
    };
    const res = await fetch(`http://localhost:3000/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${$user.token}`
      },
      body: JSON.stringify({ user: userObj }),
    });

    const data = await res.json();
    $user = data.user;
    localStorage.setItem("user", JSON.stringify(data.user));
    
  }}
>
  <h1>Edit Profile</h1>
  {#if image}
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={image} alt="profile image" />
  {/if}
  <label for="displayName">Display Name</label>
  <input type="text" id="displayName" bind:value={displayName} required />
  <label for="image">Image</label>
  <input type="text" id="image" bind:value={image} required />
  <label for="bio">Bio</label>
  <textarea id="bio" bind:value={bio} required></textarea>
  <button type="submit">Save</button>
</form>

<style>
  .modal {
    position: absolute;
    top: 64px;
    right: 25px;
    background: white;
    color: black;
    padding: 20px;
    border: 3px solid yellow;
    height: calc(100vh - 74px);
    width: 300px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
</style>
