const getAuthorName = (users: any[], post: { userId: any }) => {
  const author = users.find(user => user.id === post.userId)
  return author ? author.user.displayName : 'Unknown'
}

const getAuthorImageSrc = (users: any[], post: { userId: any }) => {
  const author = users.find(user => user.id === post.userId)
  return author ? author.user.image : ''
}

export { getAuthorName, getAuthorImageSrc }