<template>
    <div class="container-fluid">
        <div class="row">
            <div class="my-menus">
                <div>
                    <logo size="23px" height="80px" />
                </div>
                <div>
                    <left-user />
                </div>
                <div>
                    <left-nav />
                </div>
            </div>
            <div class="my-content col ">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import logo from '@/components/common/logo.vue'
import LeftNav from '@/components/user/left/leftNav.vue'
import leftUser from '@/components/user/left/leftUser.vue'

export default {
    components: {
        logo,
        leftUser,
        LeftNav
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/user/user.scss';
</style>
