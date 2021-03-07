<template>
    <div class="account-page d-flex justify-content-around align-items-center">
        <div class="left">
            <logo class="logos" size="40px" />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import logo from '../components/common/logo.vue'
import {} from 'vue'
export default {
    setup() {
    },
    components: {
        logo
    }
}
</script>

<style lang="scss">
@import '../assets/scss/account/account.scss';
</style>
