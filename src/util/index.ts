import { posts, fetchUrl, user, currentPost, page } from '../stores'
import { get } from 'svelte/store'

const url = get(fetchUrl);

const getAuthorName = (users: any[], post: { userId: any }) => {
  const author = users.find(user => user.id === post.userId)
  return author ? author.user.displayName : 'Unknown'
}

const getAuthorImageSrc = (users: any[], post: { userId: any }) => {
  const author = users.find(user => user.id === post.userId)
  return author?.user.image ? author.user.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/800px-SNice.svg.png'
}

const getVoteCount = (voteType: { name: any }, post: any) => {
  return post.votes
    ? post.votes.filter(
        (vote: { voteType: any }) => vote.voteType === voteType.name
      ).length
    : 0;
};

const handleClickVote = async (e: any, voteTypeName: string, post: any, user: any) => {
  e.stopPropagation();
  const res = await fetch(
    `${url}/votes/posts/${post.id}/${voteTypeName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  //vote comes back from server with id === null if it was removed
  if(data.id === null) {
    //remove vote from array where voteType is equal to voteTypeName and userId is equal to $user.id 
    post.votes = post.votes.filter((vote: { voteType: any, userId: any }) => vote.voteType !== voteTypeName || vote.userId !== user.id);
  } else {
    post.votes.push(data);
  }

  posts.update(posts => posts);
  currentPost.update(currentPost => post);
};

const deletePost = async (post: any) => {
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
  console.log(post);
  e.stopPropagation();
  if(!post.showDrawer) {
    post.showDrawer = true;
  } else {
    post.showDrawer = false;
  }
  posts.update(posts => posts);
  currentPost.update(currentPost => post);
}

export { getAuthorName, getAuthorImageSrc, getVoteCount, toggleEmojiDrawer, handleClickVote, deletePost }