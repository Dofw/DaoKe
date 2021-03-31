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
            <mood-comment-input @myclick="onCreateCom"></mood-comment-input>
        </div>
        <div v-show="!isShow" class="mood-comment--show">
            <el-card
                class="box-card "
                :body-style="{ backgroundColor: '#6f42c1' }"
            >
                <div
                    v-for="(com, index) in comsData"
                    :key="com._id"
                    class="text item "
                >
                    <div class="comment-structure">
                        <div
                            class="comment-structure-content d-flex align-items-center"
                        >
                            <img
                                v-if="com.reviewer.photoUrl"
                                :src="com.reviewer.photoUrl"
                                alt=""
                            />
                            <img v-else src="" alt="默认头像" />
                            <div class="flex-grow-1">
                                <p>
                                    {{
                                        com.reviewer.nickname
                                            ? com.reviewer.nickname
                                            : '刀客'
                                    }}
                                </p>
                                <p>{{ com.content }}</p>
                                <div>
                                    {{ com.time }}
                                    <el-button
                                        size="mini"
                                        @click="onSwitch(index)"
                                        >回复</el-button
                                    >
                                    <el-button size="mini">点赞</el-button>
                                </div>
                                <div
                                    v-if="isSwitch(index)"
                                    class="mood-comment--editor d-flex"
                                >
                                    <mood-comment-input
                                        @myclick="onCreateRep($event, com)"
                                    ></mood-comment-input>
                                </div>
                            </div>
                        </div>

                        <div class="comment-structure-reply ">
                            <mood-comment-reply-list
                                :isCreate="isCreate"
                                :com="com"
                            />
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import useCommentShow from '@/compositions/home/useCommentShow.js'
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import MoodCommentInput from '@/components/home/moodCommentInput.vue'
import MoodCommentReplyList from './moodCommentReplyList.vue'

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

    setup(props, context) {
        /**
         * 切换功能
         */
        const switchRef = ref(false)
        const num = ref(null)
        const onSwitch = index => {
            num.value = index
            switchRef.value = !switchRef.value
        }
        const isSwitch = computed({
            get() {
                return index => {
                    return index === num.value && switchRef.value
                }
            }
        })

        // 交互功能
        const comsData = ref([])
        const repsData = ref({}) //该组件，并没有用到这个响应式数据。为了使用onReply
        const isCreate = ref(true) // 为了，让onReply发送后，切换一次v-if。来达到子组件重新渲染的目的
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

        const interfaceObj = useCommentInterface()
        const { onGetComs, onComment, onReply } = interfaceObj

        // 评论input组件触发的接受函数
        const onCreateCom = condition => {
            body.cotent = condition.textarea
            onComment(condition, body, comsData)
        }

        // 回复input组件触发的接受函数
        const onCreateRep = async (condition, com) => {
            let body = {
                auther: com.reviewer.username,
                tier: condition.tier,
                content: condition.textarea,
                commentId: com._id //耦合props属性。
            }
            // debugger
            await onReply(condition, body, repsData) // 如何创建后，让页面重新刷新呢。
            isCreate.value = !isCreate.value
        }

        // 获取数据
        onMounted(async () => {
            //$http错误的问题都集中在http中，如果进入到这里，说明是成功的返回结果。
            const coms = await onGetComs(params)
            comsData.value = coms.message
        })

        return {
            onSwitch,
            isSwitch,
            onCreateCom,
            onCreateRep,
            isCreate,
            comsData,
            repsData,
            ...useCommentShow()
        }
    },

    components: {
        MoodCommentInput,
        MoodCommentReplyList
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodCommentList.scss';
</style>
