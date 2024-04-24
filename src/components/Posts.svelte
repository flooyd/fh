<script lang='ts'>
  import { currentPost, page, posts, voteTypes, user, users } from "../stores";
  import { getAuthorImageSrc, getAuthorName } from '../util';
  import EmojiDrawer from "./EmojiDrawer.svelte";

  const handleClickPost = (post: any) => {
    $page = "viewPost";
    $currentPost = post;
    const windowState = {
      title: post.title,
      url: `/viewPost/${post.id}`
    }
    window.history.pushState(windowState, post.title, windowState.url);
  }

  const handleClickVote = async (e: any, voteTypeName: string, post: any) => {
    e.stopPropagation();
    const res = await fetch(
      `http://localhost:3000/votes/posts/${post.id}/${voteTypeName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    //vote comes back from server with id === null if it was removed
    if(data.id === null) {
      //remove vote from array where voteType is equal to voteTypeName and userId is equal to $user.id 
      post.votes = post.votes.filter((vote: { voteType: any, userId: any }) => vote.voteType !== voteTypeName || vote.userId !== $user.id);
    } else {
      post.votes.push(data);
    }

    $posts = $posts;
  };

  const getVoteCount = (voteType: { name: any }, post: any) => {
    return post.votes
      ? post.votes.filter(
          (vote: { voteType: any }) => vote.voteType === voteType.name
        ).length
      : 0;
  };

  const togglePostDrawer = (e: any, post: any) => {
    e.stopPropagation();
    console.log('hi')
    if(!post.showDrawer) {
      post.showDrawer = true;
    } else {
      post.showDrawer = false;
    }
    $posts = $posts;
  }
</script>

<div class="toolbar">
  <h1>Posts</h1>
  <button on:click={() => $page = "createPost"}>Create Post</button>
</div>

{#each $posts as post}
  <button class="post" on:click={() => handleClickPost(post)}>
    <div class="author">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={getAuthorImageSrc($users, post)} alt="author image" />
      {getAuthorName($users, post)}
    </div>
    <h2>{post.title}</h2>
    <div class="content">{post.content}</div>
    <div class="voteButtons">
      {#if post.showDrawer}
        <EmojiDrawer post={post} />
      {/if}
      <button class='emojiButton' on:click={e => togglePostDrawer(e, post)}>:)</button>
      {#each $voteTypes as voteType}
      {#if getVoteCount(voteType, post) > 0}
        <button on:click={(e) => handleClickVote(e, voteType.name, post)}>
          <img src={voteType.src} alt={voteType.name} />
          {getVoteCount(voteType, post)}
        </button>
      {/if}
    {/each}
    </div>
  </button>
{/each}

<style>
  .toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }

  .post {
    margin-bottom: 20px;
    padding: 10px;
    background: white;
    color: black;
    border-radius: 5px;
    border: 3px solid black;
    width: 100%;
    text-align: left;
  }

  .post:hover {
    background: #eee;
    cursor: pointer;
  }

  .post h2 {
    margin-bottom: 20px;
  }  

  .voteButtons {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 20px;
    align-items: center;
  }

  .voteButtons .emojiButton {
    background: #333;
    color: white;
    border: 3px solid yellow;
    border-radius: 180px;
    padding: 10px;
    height: 32px;
    margin-right: 15px;
  }

  .voteButtons .emojiButton:hover {
    background: white;
    color: black;
  }

  .voteButtons button {
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: black;
  }

  .voteButtons button img {
    width: 25px;
    height: 25px;
  }

  .author {
    font-style: italic;
    color: blue;
    margin-bottom: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  .author img {
    width: 64px;
    height: 64px;
    border-radius: 180px;
    margin-right: 10px;
  }
</style>