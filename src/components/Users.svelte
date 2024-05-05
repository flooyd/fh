<script>
import {users} from '../stores';
</script>

<div class='users'>
    {#each $users as user}
        <div class='user'>
                <p class='displayName'>{user.displayName}</p>
                <p>{user.bio}</p>
        {#if user.image}
            <img src={user.image} alt='profile' />
        {/if}
        </div>
    {/each}
</div>

<style>
.users {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    justify-content: space-evenly;
}

.users img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.user {
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 5px;
    color: white;
}

.displayName {
    font-size: 20px;
    font-weight: bold;
}
</style>