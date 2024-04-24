<script lang="ts">
  import { currentPost, voteTypes, user, posts } from "../stores";

  const handleClickVote = async (voteTypeName: any) => {
    const res = await fetch(
      `http://localhost:3000/votes/posts/${$currentPost.id}/${voteTypeName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if(data.id === null) {
      //remove vote from array where voteType is equal to voteTypeName and userId is equal to $user.id 
      $currentPost.votes = $currentPost.votes.filter((vote: { voteType: any, userId: any }) => vote.voteType !== voteTypeName || vote.userId !== $user.id);
    } else {
      $currentPost.votes.push(data);
    }

    $currentPost = $currentPost;
    $voteTypes = $voteTypes;
    //replace currentPost in posts array with updated currentPost
    $posts = $posts.map((post: any) => post.id === $currentPost.id ? $currentPost : post);
  };

  const getVoteCount = (voteType: { name: any }) => {
    return $currentPost.votes
      ? $currentPost.votes.filter(
          (vote: { voteType: any }) => vote.voteType === voteType.name
        ).length
      : 0;
  };
</script>

<div class="post">
  <h1>{$currentPost.title}</h1>
  <h2 class="author">lordrahl16</h2>
  <div class="content">{$currentPost.content}</div>
  <div class="voteButtons">
    <button class='emojiButton'>:)</button>
    {#each $voteTypes as voteType}
    {#if getVoteCount(voteType) > 0}
      <button on:click={(e) => handleClickVote(voteType.name)}>
        <img src={voteType.src} alt={voteType.name} />
      </button>
    {/if}
    {/each}
  </div>
</div>

<style>
  .post {
    padding: 10px;
    background: white;
    color: black;
    border-radius: 5px;
    border: 3px solid black;
    width: 100%;
  }

  .author {
    color: blue;
    margin-bottom: 20px;
  }

  .content {
    margin-bottom: 20px;
  }

  .voteButtons {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .voteButtons button {
    background: white;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    align-items: center;
    color: black;
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

  .voteButtons button img {
    width: 25px;
    height: 25px;
  }
</style>
