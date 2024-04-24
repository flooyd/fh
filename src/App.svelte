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
  } from "./stores";
  import CreatePost from "./components/CreatePost.svelte";
  import ViewPost from "./components/ViewPost.svelte";
  import ProfileModal from "./components/ProfileModal.svelte";

  if (localStorage.getItem("user")) {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      $user = JSON.parse(userFromStorage);
    }
  }
  
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users", {
      headers: {
        Authorization: `Bearer ${$user.token}`,
      },
    });
    const data = await res.json();
    $users = data;
  }
  onMount(async () => {
    const postsRes = await fetch("http://localhost:3000/posts");
    const postsData = await postsRes.json();
    const voteTypesRes = await fetch("http://localhost:3000/voteTypes");
    const voteTypesData = await voteTypesRes.json();
    await fetchUsers();
    console.log($users);
    $voteTypes = voteTypesData;
    await getVotes(postsData);
    if (window.location.pathname.includes("/viewPost/")) {
      const postId = window.location.pathname.split("/viewPost/")[1];
      $currentPost = $posts.find((post: any) => post.id === parseInt(postId));
      $page = "viewPost";
    }
  });

  const getVotes = async (postsData: any) => {
    for (let post of postsData) {
      const res = await fetch(`http://localhost:3000/votes/posts/${post.id}`);
      const data = await res.json();
      post.votes = data.votes;
    }

    $posts = postsData;
    console.log($posts)
  };
</script>

<Nav />
<main>
  {#if $loginOrRegister === "login" || $loginOrRegister === "register"}
    <LoginModal />
  {/if}
  {#if $profileModalOpen}
    <ProfileModal />
  {/if}
  {#if $page === "createPost"}
    <CreatePost />
  {/if}
  {#if $page === "posts"}
    <Posts />
  {/if}
  {#if $page === "viewPost" && $currentPost}
    <ViewPost />
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
</style>
