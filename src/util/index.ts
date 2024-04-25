import { posts } from "../stores"

const getAuthorName = (users: any[], post: { userId: any }) => {
  const author = users.find(user => user.id === post.userId)
  return author ? author.user.displayName : 'Unknown'
}

const getAuthorImageSrc = (users: any[], post: { userId: any }) => {
  const author = users.find(user => user.id === post.userId)
  console.log(['author', author])
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
    post.votes = post.votes.filter((vote: { voteType: any, userId: any }) => vote.voteType !== voteTypeName || vote.userId !== user.id);
  } else {
    post.votes.push(data);
  }

  posts.update(posts => posts);
};

const toggleEmojiDrawer = (e: any, post: any) => {
  console.log(posts);
  e.stopPropagation();
  if(!post.showDrawer) {
    post.showDrawer = true;
  } else {
    post.showDrawer = false;
  }
  posts.update(posts => posts);
}

export { getAuthorName, getAuthorImageSrc, getVoteCount, toggleEmojiDrawer, handleClickVote }