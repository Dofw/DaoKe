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
                    <left-list />
                </div>
            </div>
            <div class="my-content col ">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import logo from '../components/common/logo.vue'
import leftUser from '../components/user/left/leftUser.vue'
import leftList from '../components/user/left/leftList.vue'

export default {
    components: {
        logo,
        leftUser,
        leftList
    }
}
</script>

<style lang="scss">
@import '../assets/scss/user/user.scss';
</style>
