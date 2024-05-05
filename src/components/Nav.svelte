<script lang='ts'>
  import { loginOrRegister, user, page, profileModalOpen, currentPost } from '../stores';

  const handleClickLogin = () => {
    $loginOrRegister = 'login';
  };

  const handleClickUser = () => {
    $profileModalOpen = !$profileModalOpen;
  };

  const handleClickTitle = () => {
    if ($page === 'posts') return;
    window.history.pushState('posts', '', '/');
    $page = 'posts';
    $currentPost = null;
  };

  const handleClickUsers = () => {
    if ($page === 'users') return;
    window.history.pushState('users', '', '/users');
    $page = 'users';
  };
</script>

<nav>
  <button class='title' on:click={handleClickTitle}>Forum House</button>
  {#if !$user}
    <button on:click={handleClickLogin}>Login</button>
  {/if}
  {#if $user}
    <div>
      <button on:click={handleClickUsers}>Users</button>
      <button on:click={handleClickUser}>{$user.displayName}</button>
    </div>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border-bottom: 3px solid white;
    font-family: 'Quattrocento', serif;
  }

  button {
    font-family: 'Quattrocento', serif;
  }

  button:hover {
    background: yellow;
    color: black;
  }

  .title {
    font-size: 25px;
    font-weight: bold;
    border: none;
    background: #333;
    color: white;
  }
</style>
