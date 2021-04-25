<template>
    <div class="nav--link d-flex align-items-end ">
        <router-link custom v-slot="{ navigate, isExactActive }" to="/home/mood"
            ><span :class="{ 'exact-active': isExactActive }" @click="navigate"
                >Home</span
            >
        </router-link>
        <router-link
            custom
            v-slot="{ navigate, isExactActive }"
            to="/account/login"
            ><span :class="{ 'exact-active': isExactActive }" @click="navigate"
                >Login</span
            >
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

        border-radius: 5px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        &:hover {
            color: #eee;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.3);
        }
        &.active {
            color: #eee;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.3);
        }
        &.exact-active {
            color: #eee;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.3);
        }
    }
}
</style>
