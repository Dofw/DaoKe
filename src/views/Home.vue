<template>
    <el-container class="my-container">
        <el-header class="pt-2" height="none">
            <el-row :gutter="20">
                <!-- logo -->
                <el-col :span="7">
                    <el-row type="flex">
                        <logo size="25px" class="flex-shrink-1" />
                    </el-row>
                </el-col>
                <!-- nav -->
                <el-col class="d-flex align-items-center" :span="12">
                    <home-nav></home-nav>
                </el-col>

                <!-- userinfo -->
                <el-col :span="5">
                    <home-user></home-user>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import Logo from '@/components/common/logo.vue'
import HomeNav from '@/components/home/homeNav.vue'
import HomeUser from '@/components/home/homeUser.vue'
export default {
    components: {
        Logo,
        HomeNav,
        HomeUser
    },
    setup() {
        return {}
    }
}
</script>

<style lang="scss" scope>
.my-container {
    width: 960px;
    margin: 0 auto;
    .pagination {
        padding: 20px;
        .el-pagination {
            span {
                color: #999;
            }
        }
    }
}
</style>
