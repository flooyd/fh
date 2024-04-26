<script lang='ts'>
  import { fade } from 'svelte/transition';
  import {loginOrRegister, refresh, user, fetchUrl} from '../stores';

  let password = '';
  let displayName = '';
  let username = '';
  let switchText = '';
  let titleText = '';
  let errors: any[] = [];
  let disabled = false;

  const resetFields = () => {
    password = '';
    displayName = '';
    username = '';
  }

  const handleClickLogin = () => {
    if($loginOrRegister === 'login') {
      $loginOrRegister = 'register';
    } else {
      $loginOrRegister = 'login';
    }
    resetFields();
  }

  const handleClickClose = () => {
    $loginOrRegister = '';
    resetFields();
  }

  const handleClickSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    disabled = true;
    errors = [];
    const endpoint = $loginOrRegister === 'login' ? 'login' : 'register';
    try {
      const res = await fetch(`${$fetchUrl}/users/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username,
          password,
          displayName
        }
      })
    });
    const data = await res.json();
    if (data.message) {
      errors = data.message;
      if(typeof data.message === 'string') {
        errors = [errors];
      }
    } else {
      $user = data.user;
      localStorage.setItem('user', JSON.stringify(data.user));
      $loginOrRegister = '';
      resetFields();
      $refresh = $refresh + 1;
    }
  } catch (err) {
    console.error(err);
  }
}

$: switchText = $loginOrRegister === 'login' ? 'Register' : 'Login';
$: titleText = $loginOrRegister === 'login' ? 'Login' : 'Register';
</script>

<div class='loginModal'>
 <div class='title'>
  <h1>{titleText}</h1>
  <button on:click={handleClickLogin}>{switchText}</button>
  <button on:click={handleClickClose}>X</button>
 </div>
  <form>
    <input bind:value={username} type='text' placeholder='Username (used only to login)'/>
    {#if $loginOrRegister === 'register'}
    <input bind:value={displayName} type='text' placeholder='Display Name'/>
    {/if}
    <input bind:value={password} type='password' placeholder='Password'/>
    <button type='submit' on:click={handleClickSubmit} disabled={disabled}>Submit</button>
  </form>
  <div class='errors'>
    {#each errors as error}
      <p>{error}</p>
    {/each}
  </div>
</div>

<style>
  .loginModal {
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

  .title {
    display: flex;
    height: fit-content;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .errors {
    margin-top: 20px;
    color: red;
    font-weight: bold;
  }
</style>