import { posts, fetchUrl, user, currentPost, page } from '../stores'
import { get } from 'svelte/store'

const getAuthorName = (users: any[], post: { authorId: any }) => {
  const author = users.find(user => user.id === post.authorId)
  return author ? author.displayName : 'Unknown'
}

const getAuthorImageSrc = (users: any[], post: { authorId: any }) => {
  const author = users.find(user => user.id === post.authorId)
  return author.image ? author.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/800px-SNice.svg.png'
}

const getVoteCount = (voteType: { name: any }, post: any) => {
  if(!voteType) return;
  return post.votes
    ? post.votes.filter(
        (vote: { voteType: any }) => vote.voteType === voteType.name
      ).length
    : 0;
};

const handleClickVote = async (e: any, voteTypeName: string, post: any, user: any) => {
  const url = get(fetchUrl);
  e.stopPropagation();
  const res = await fetch(
    `${url}/votes/posts/${post.id}/${voteTypeName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
  const data = await res.json();
  //vote comes back from server with id === null if it was removed
  if(data.id === null) {
    //remove vote from post where userId === user.id and voteType === voteTypeName
    post.votes.map((vote: any) => {
      if(vote.userId === user.id && vote.voteType === voteTypeName) {
        post.votes.splice(post.votes.indexOf(vote), 1);
      }
    });
    get(posts).find((p: any) => p.id === post.id).votes = post.votes;
  } else {
    post.votes.push(data);
  }

  posts.update(posts => posts);
  currentPost.update(currentPost => post);
};

const deletePost = async (post: any) => {
  const url = get(fetchUrl);
  const res = await fetch(`${url}/posts/${post.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${get(user).token}`,
    },
  });
  if (res.status === 200) {
    posts.update(posts => posts.filter(p => p.id !== post.id));
    currentPost.update(currentPost => null);
    page.update(page => 'posts');
  }
};

const toggleEmojiDrawer = (e: any, post: any) => {
  e.stopPropagation();
  if(!post.showDrawer) {
    post.showDrawer = true;
  } else {
    post.showDrawer = false;
  }
  posts.update(posts => posts);
  currentPost.update(currentPost => post);
}

const fetchComments = async (post: any) => {
  const url = get(fetchUrl);
  const res = await fetch(`${url}/comments/${post.id}`, {
    headers: {
      Authorization: `Bearer ${get(user).token}`,
    },
  });
  const data = await res.json();
  post.comments = data;
  currentPost.update(currentPost => post);
  posts.update(posts => posts);
}

export { getAuthorName, getAuthorImageSrc, getVoteCount, toggleEmojiDrawer, handleClickVote, deletePost, fetchComments }