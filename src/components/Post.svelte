<script lang="ts">
    import {
      getAuthorImageSrc,
      getAuthorName,
      getVoteCount,
      toggleEmojiDrawer,
      handleClickVote,
      deletePost,
    } from "../util";
    import { users, voteTypes, user, page, currentPost } from "../stores";
    import EmojiDrawer from "./EmojiDrawer.svelte";
  
    export let post: any;
    export let viewPost = false;
    let disableButtons = false;
  
    const handleClickPost = () => {
      if (viewPost) return;
      window.history.pushState(
        `/viewPost/${post.id}`,
        "",
        `/viewPost/${post.id}`,
      );
      $page = "viewPost";
      $currentPost = post;
      document.title = "Forum House - " + post.title;
    };
  
    const handleClickDelete = async (e: { stopPropagation: () => void }) => {
      disableButtons = true;
      e.stopPropagation();
      await deletePost(post);
      disableButtons = false;
    };
  
    const handleClickEdit = () => {
      window.history.pushState(
        `/editPost/${post.id}`,
        "",
        `/editPost/${post.id}`,
      );
      $page = "editPost";
      $currentPost = post;
      document.title = "Forum House - Edit Post";
    };
  
    const getStyle = () => {
      if (viewPost) {
        return "cursor: default";
      }
      return {};
    };
  
    const handleVote = async (
      e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement },
      voteType: string,
      post: any,
      user: any,
    ) => {
      disableButtons = true;
      await handleClickVote(e, voteType, post, user);
      disableButtons = false;
    };
  
    const getDateString = (date: string | number | Date) => {
      const d = new Date(date);
      return d.toLocaleDateString() + " - " + d.toLocaleTimeString();
    };

    console.log(post);
  </script>
  
  <button id={post.id} class="post" on:click={handleClickPost} style={`${getStyle()}`}>
    <div class="author">
      <div class="authorInfo">
        <img src={getAuthorImageSrc($users, post)} alt="author" />
        {getAuthorName($users, post)}
      </div>
      <div class="dates">
        <div class="createdAt">Created: {getDateString(post.createdAt)}</div>
        <div class="updatedAt">Last Updated: {getDateString(post.updatedAt)}</div>
      </div>
    </div>
    <h2>{post.title}</h2>
    <div class="content">{post.content}</div>
    <div class="bottomRow">
      {#if post.showDrawer}
        <EmojiDrawer {post} />
      {/if}
      <div class="voteButtons">
        <button class="emojiButton" on:click={(e) => toggleEmojiDrawer(e, post)}
          >:)</button
        >
        {#each post.votes as vote}
          <button disabled={disableButtons} on:click={(e) => handleVote(e, vote.voteType, post, $user)}>
            <img src={$voteTypes.find((vt) => vt.name === vote.voteType)?.src} alt={vote.voteType} />
            {getVoteCount($voteTypes.find((vt) => vt.name === vote.voteType), post)}
          </button>
        {/each}
      </div>
      {#if $user && $user.id === post.authorId}
        <div class="options">
          <button class="editButton" on:click={handleClickEdit}>Edit</button>
          <button class="deleteButton" on:click={handleClickDelete}>🗑️</button>
        </div>
      {/if}
    </div></button
  >
  
  <style>
    .post {
      margin-bottom: 10px;
      padding: 10px;
      background: white;
      border-radius: 5px;
      border: 3px solid black;
      width: 100%;
      text-align: left;
      position: relative;
    }
  
    .post:hover {
      background: #ccc;
      cursor: pointer;
      color: black;
    }
  
    .post h2 {
      margin-bottom: 10px;
      font-size: 15px;
    }

    .content {
      white-space: pre-wrap;
    }
  
    .bottomRow {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 20px;
      align-items: center;
      justify-content: space-between;
    }
  
    .bottomRow .emojiButton {
      background: #333;
      color: white;
      border: 3px solid yellow;
      border-radius: 180px;
      padding: 10px;
      height: 32px;
      margin-right: 0px;
      display: flex;
      align-items: center;
    }
  
    .bottomRow .emojiButton:hover {
      background: white;
      color: black;
    }
  
    .voteButtons {
      display: flex;
      gap: 5px;
      align-items: center;
      flex-wrap: wrap;
    }
  
    .voteButtons button {
      background: white;
      border: 1px solid black;
      border-radius: 5px;
      padding: 2.5px;
      display: flex;
      gap: 5px;
      align-items: center;
      color: black;
      font-size: 15px;
    }
  
    .voteButtons button img {
      width: 25px;
      height: 25px;
    }
  
    .author {
      font-style: italic;
      color: blue;
      margin-bottom: 20px;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;
    }
  
    .authorInfo {
      display: flex;
      align-items: center;
    }
  
    .author img {
      width: 25px;
      height: 25px;
      border-radius: 180px;
      margin-right: 10px;
    }
  
    .deleteButton,
    .editButton {
      height: 26.6px;
    }
  
    .editButton {
      right: 40px;
    }
  
    .options {
      display: flex;
      gap: 5px;
    }
  
    .deleteButton:hover {
      background: red;
      color: white;
    }
  
    .editButton:hover {
      background: blue;
      color: white;
    }
  
    .createdAt,
    .updatedAt {
      font-size: 10px;
    }
  </style>
  