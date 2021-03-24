<template>
    <div class="nav--link d-flex align-items-end ">
        <router-link custom v-slot="{ navigate }" to="/home/mood"
            ><span @click="navigate">Home</span>
        </router-link>
        <router-link custom v-slot="{ navigate }" to="/account/login"
            ><span @click="navigate">login</span>
        </router-link>
        <router-link custom v-slot="{ navigate }" to="/user/detail"
            ><span class="flex-shrink-0" @click="navigate">user</span>
        </router-link>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scope>
.nav--link {
    > span {
        margin-right: 15px;
        padding: 0 5px;

        border: 2px solid #fd7e14;
        border-radius: 5px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
    }
}
</style>
