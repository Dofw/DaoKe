<template>
    <div class="mood-comment-list ">
        <div class="mood-comment--btn">
            <el-badge class="item">
                <el-button size="mini">点赞</el-button>
            </el-badge>
            <el-badge class="item" v-if="!isShow">
                <el-button size="mini" @click="onTrigger">收起</el-button>
            </el-badge>
            <el-badge class="item" v-else>
                <el-button size="mini" @click="onTrigger">评论</el-button>
            </el-badge>
        </div>
        <div v-if="!isShow" class="mood-comment--editor d-flex">
            <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="textarea"
                maxlength="30"
                show-word-limit
            >
            </el-input>
            <el-button @click.prevent="onSubmit">提交</el-button>
        </div>
        <div v-show="!isShow" class="mood-comment--show">
            <el-card class="box-card ">
                <div v-for="com in data" :key="com._id" class="text item ">
                    {{ com.reviewer.nickname ? com.reviewer.nickname : '刀客'
                    }}{{ com.content }}
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
// import { ref } from 'vue'
import useCommentShow from '@/compositions/home/useCommentShow.js'
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
export default {
    props: {
        auther: {
            type: String,
            required: true
        }
    },

    setup(props) {
        return {
            ...useCommentShow(),
            ...useCommentInterface(props)
        }
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodCommentList.scss';
</style>
