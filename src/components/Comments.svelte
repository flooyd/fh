<script>
    import { fetchComments, getAuthorName } from "../util";
    import { users } from "../stores";

    export let post;

    const getComments = async () => {
        await fetchComments(post);
        console.log(post);
    };

    getComments();
</script>

<h1>Comments</h1>

{#if post.comments}
    {#each post.comments as comment}
        <div class="comment">
            <div class="author">
                {getAuthorName($users, post)}
            </div>
            <div class="content">
                {comment.content}
            </div>
        </div>
    {/each}
{/if}

<style>
    .author {
        font-weight: bold;
    }

    h1 {
        padding-bottom: 10px;
        position: sticky;
        padding-top: 10px;
        width: 100%;
        top: -21px;
        background: #333;
    }

    .comment {
        padding: 10px;
        border: 1px solid white;;
        margin-top: 10px;
        background: black;
        white-space: pre-wrap;
    }
</style>
