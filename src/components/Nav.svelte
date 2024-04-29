<script lang='ts'>
  import { loginOrRegister, user, page, profileModalOpen } from '../stores';

  const handleClickLogin = () => {
    $loginOrRegister = 'login';
  }

  const handleClickUser = () => {
    $profileModalOpen = !$profileModalOpen;
  }

  const handleClickTitle = () => {
    window.history.pushState(window.location.pathname, '', '/');
    console.log(window.history.state);
    document.title = 'Forum House';
    $page = 'posts';
  }
</script>

<nav>
  <button class='title' on:click={handleClickTitle}>Forum House</button>
  {#if !$user}
  <button on:click={handleClickLogin}>Login</button>
  {/if}
  {#if $user}
  <button on:click={handleClickUser}>{$user.displayName}</button>
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

  .title {
    font-size: 25px;
    font-weight: bold;
    border: none;
  }
</style>