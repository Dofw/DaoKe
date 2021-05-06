<template>
    <div class="mood-comment-list ">
        <div class="mood-comment--btn">
            <el-badge class="item" :value="praiseRef" :hidden="!praiseRef">
                <el-button size="mini" @click="onpraise">点赞</el-button>
            </el-badge>
            <el-badge
                class="item"
                :value="comsData.length"
                :hidden="!comsData.length"
                type="success"
                v-if="!isShow"
            >
                <el-button size="mini" @click="onTrigger">收起</el-button>
            </el-badge>
            <el-badge
                class="item"
                :value="comsData.length"
                :hidden="!comsData.length"
                type="success"
                v-else
            >
                <el-button size="mini" @click="onTrigger">评论</el-button>
            </el-badge>
        </div>

        <div v-if="!isShow" class="mood-comment--editor d-flex">
            <mood-comment-input
                :isShow="false"
                @myclick="onCreateCom"
            ></mood-comment-input>
        </div>
        <div v-show="!isShow" class="mood-comment--show">
            <el-card
                class="box-card "
                :body-style="{ backgroundColor: '#6f42c1' }"
            >
                <div v-for="com in comsData" :key="com._id" class="text item ">
                    <MoodCommentListItem :com="com" />
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useCommentShow from '@/compositions/home/useCommentShow.js'
import MoodCommentInput from '@/components/home/moodCommentInput.vue'
import MoodCommentListItem from '@/components/home/moodCommentListItem.vue'
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import usePraiseInterface from '@/compositions/home/usePraiseInterface.js'
import { useStore } from 'vuex'
export default {
    name: 'mood-comment-list', // 递归组件
    props: {
        auther: {
            type: String,
            required: true
        },
        type: {
            //mood,media等类型
            type: String,
            required: true
        },
        moodId: {
            //评论接口，对应父级为mood下。
            type: String,
            required: true
        }
    },

    setup(props) {
        const store = useStore()
        // 交互功能
        const comsData = ref([])
        const praiseRef = ref(null)
        const donePraiseRef = ref(false)
        const body = {
            auther: props.auther, // mood的作者
            type: props.type, // mood类型
            moodId: props.moodId // 该moodId
            // content: condition.textarea // 评论内容
        }
        const params = {
            // type: props.type,
            moodId: props.moodId
        }

        const { onGetComs, onComment } = useCommentInterface()

        const { onGetDonePraise, praiseCU } = usePraiseInterface()

        // 评论input组件触发的接受函数
        const onCreateCom = async condition => {
            body.cotent = condition.textarea
            await onComment(condition, body, comsData)
        }

        const onpraise = async () => {
            // userID,怎么获取,这里时为了统一管理用了vuex，由于刷新页面，vuex的状态数据就初始化了。所以要在commit（sessionStorage）
            const result = await praiseCU(props.moodId, store.state.account.id)
            praiseRef.value = result.praise.count
            donePraiseRef.value = result.done
        }

        // 获取数据
        onMounted(async () => {
            //$http错误的问题都集中在http中，如果进入到这里，说明是成功的返回结果。
            const coms = await onGetComs(params)
            // 用户id
            const result = await onGetDonePraise(
                props.moodId,
                store.state.account.id
            )
            comsData.value = coms.message
            if (result === null) {
                praiseRef.value = null
            } else {
                praiseRef.value = result.praise.count
                donePraiseRef.value = result.done
            }
        })

        return {
            ...useCommentShow(),
            onCreateCom,
            comsData,
            praiseRef,
            donePraiseRef,
            onpraise
        }
    },

    components: {
        MoodCommentInput,
        MoodCommentListItem
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodCommentList.scss';
</style>
