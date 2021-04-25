<template>
    <el-row class="tac">
        <el-col :span="24">
            <el-menu
                :default-openeds="['2']"
                default-active="/home/mood"
                class="el-menu-vertical-demo"
                :router="true"
            >
                <el-menu-item index="/home/mood">
                    <i class="el-icon-s-promotion"></i>
                    <template #title>首页</template>
                </el-menu-item>
                <el-submenu index="2">
                    <template #title>
                        <i class="el-icon-s-promotion"></i>
                        <span>心情</span>
                    </template>
                    <el-menu-item index="/user/mood-editor">
                        <i class="el-icon-s-promotion"></i>
                        <template #title>编辑</template>
                    </el-menu-item>
                    <el-menu-item index="/user/article">
                        <i class="el-icon-s-promotion"></i>
                        <template #title>列表</template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {}
</script>

<style lang="scss" scope>
.el-menu {
    border: none;
    background-color: rgba(#6f42c1, 0) !important;
}
</style>
