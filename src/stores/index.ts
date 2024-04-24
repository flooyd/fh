import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

const theme: Writable<any> = writable({
  title: 'white',
  navBackground: 'white',
  navBorderSize: '3px',
  navBorderColor: 'transparent'
})

const page: Writable<string> = writable('posts'); // posts, createPost, or profile
const voteTypes: Writable<any[]> = writable([]);
const loginOrRegister: Writable<string> = writable(''); // Login or Register
const profileModalOpen: Writable<boolean> = writable(false); // Profile modal open
const posts: Writable<any[]> = writable([]); // Array of posts
const currentPost: Writable<any> = writable(null); // Current post
const user: Writable<any> = writable(null);
const users: Writable<any[]> = writable([]); // Array of users

export { theme, posts, loginOrRegister, voteTypes, user, page, currentPost, profileModalOpen, users}