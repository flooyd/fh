<script lang="ts">
  import { onMount } from "svelte";
  import LoginModal from "./components/LoginModal.svelte";
  import Nav from "./components/Nav.svelte";
  import Posts from "./components/Posts.svelte";
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
  } from "./stores";
  import CreatePost from "./components/CreatePost.svelte";
  import ViewPost from "./components/ViewPost.svelte";
  import ProfileModal from "./components/ProfileModal.svelte";
    import Users from "./components/Users.svelte";

  let ready = false;

  if (localStorage.getItem("user")) {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      $user = JSON.parse(userFromStorage);
    }
  }

  if (window.location.href.includes("vercel")) {
    $fetchUrl = "https://fhnest.onrender.com";
  }

  const fetchUsers = async () => {
    const res = await fetch(`${$fetchUrl}/users`, {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    const data = await res.json();
    $users = data;
  };

  const fetchPosts = async () => {
    const postsRes = await fetch(`${$fetchUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    const postsData = await postsRes.json();
    postsData.forEach((post: any) => {
      post.votes = [];
    });
    $posts = postsData;
  };

  const fetchVoteTypes = async () => {
    const voteTypesRes = await fetch(`${$fetchUrl}/voteTypes`);
    const voteTypesData = await voteTypesRes.json();
    $voteTypes = voteTypesData;
  };

  const init = async () => {
    if (!$user) return;
    await fetchPosts();
    await fetchUsers();
    await fetchVoteTypes();
    await getVotes($posts);
    ready = true;
    
    if (window.location.pathname.includes("/viewPost/")) {
      const postId = window.location.pathname.split("/viewPost/")[1];
      $currentPost = $posts.find((post: any) => post.id === parseInt(postId));
      $page = "viewPost";
    } else {
      window.history.replaceState("posts", "", "/");
    }
  };

  onMount(async () => {
    await init();
    ready = true;
  });

  const getVotes = async (postsData: any) => {
    for (let post of postsData) {
      const res = await fetch(`${$fetchUrl}/votes/posts/${post.id}`);
      const data = await res.json();
      post.votes = data.votes;
    }

    $posts = postsData;
  };

  $: $refresh ? init() : null;

  window.onpopstate = (e) => {
    if (!e.state) return;
    if (e.state === "posts") {
      $page = "posts";
      document.title = "Forum House";
    }
    if (e.state.includes("viewPost")) {
      const postId = e.state.split("/viewPost/")[1];
      $currentPost = $posts.find((post: any) => post.id === parseInt(postId));
      $page = "viewPost";
      document.title = "Forum House - " + $currentPost.title;
    }
    if (e.state === "createPost") {
      $page = "createPost";
      document.title = "Forum House - Create Post";
    }
    if (e.state.includes("editPost")) {
      const postId = e.state.split("/editPost/")[1];
      $currentPost = $posts.find((post: any) => post.id === parseInt(postId));
      $page = "editPost";
      document.title = "Forum House - Edit Post";
    }
  };
</script>

<Nav />
<main>
  {#if !ready}
    <h1>Loading...</h1>
  {/if}
  {#if ready}
    {#if $loginOrRegister === "login" || $loginOrRegister === "register"}
      <LoginModal />
    {/if}
    {#if $profileModalOpen}
      <ProfileModal />
    {/if}
    {#if $page === "createPost"}
      <CreatePost />
    {/if}
    {#if $page === "posts" && $user}
      <Posts />
    {/if}
    {#if $page === "viewPost" && $currentPost}
      <ViewPost />
    {/if}
    {#if $page === "editPost" && $currentPost}
      <CreatePost post={$currentPost} isEdit={true} />
    {/if}
    {#if $page === "users"}
      <Users />
    {/if}
  {/if}
</main>

<style>
  main {
    background: #333;
    color: white;
    font-family: "Quattrocento Sans", sans-serif;
    padding: 20px;
    height: calc(100vh - 61px);
    overflow-y: auto;
  }

  h1 {
    margin-top: 20px;
    margin-left: 20px;
    color: white;
  }
</style>
