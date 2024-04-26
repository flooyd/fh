<script lang='ts'>
  import { onMount } from 'svelte';
  import LoginModal from './components/LoginModal.svelte';
  import Nav from './components/Nav.svelte';
  import Posts from './components/Posts.svelte';
  import {
    page,
    loginOrRegister,
    user,
    currentPost,
    posts,
    voteTypes,
    profileModalOpen,
    users,
    refresh,
    fetchUrl,
  } from './stores';
  import CreatePost from './components/CreatePost.svelte';
  import ViewPost from './components/ViewPost.svelte';
  import ProfileModal from './components/ProfileModal.svelte';

  let ready = false;

  if (localStorage.getItem('user')) {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      $user = JSON.parse(userFromStorage);
    }
  }

  console.log(window.location);
  //if window.location.href includes 'onrender' then set fetchUrl to 'https://fhnest.onrender.com/'
  if (window.location.href.includes('vercel')) {
    $fetchUrl = 'https://fhnest.onrender.com/';
  }

  const fetchUsers = async () => {
    console.log('token', $user.token)
    const res = await fetch(`${$fetchUrl}/users`, {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    const data = await res.json();
    $users = data;
  };

  const fetchPostsAndVotes = async () => {
    const postsRes = await fetch(`${$fetchUrl}/posts`);
    const postsData = await postsRes.json();
    await getVotes(postsData);
  };

  const fetchVoteTypes = async () => {
    const voteTypesRes = await fetch(`${$fetchUrl}/voteTypes`);
    const voteTypesData = await voteTypesRes.json();
    $voteTypes = voteTypesData;
  }

  const init = async () => {
    if(!$user) return;
    await fetchVoteTypes();
    await fetchPostsAndVotes();
    await fetchUsers();
  }

  onMount(async () => {
    await init();
    if (window.location.pathname.includes('/viewPost/')) {
      const postId = window.location.pathname.split('/viewPost/')[1];
      $currentPost = $posts.find((post: any) => post.id === parseInt(postId));
      $page = 'viewPost';
    }

    ready = true;
  });

  const getVotes = async (postsData: any) => {
    for (let post of postsData) {
      const res = await fetch(`${$fetchUrl}/votes/posts/${post.id}`);
      const data = await res.json();
      post.votes = data.votes;
    }

    $posts = postsData;
    console.log($posts);
  };

  $: $refresh ? init() : null;
</script>

{#if ready}
  <Nav />
  <main>
    {#if $loginOrRegister === 'login' || $loginOrRegister === 'register'}
      <LoginModal />
    {/if}
    {#if $profileModalOpen}
      <ProfileModal />
    {/if}
    {#if $page === 'createPost'}
      <CreatePost />
    {/if}
    {#if $page === 'posts' && $user}
      <Posts />
    {/if}
    {#if $page === 'viewPost' && $currentPost}
      <ViewPost />
    {/if}
  </main>
{/if}

<style>
  main {
    background: #333;
    color: white;
    font-family: 'Quattrocento Sans', sans-serif;
    padding: 20px;
    height: calc(100vh - 61px);
    overflow-y: auto;
  }
</style>
