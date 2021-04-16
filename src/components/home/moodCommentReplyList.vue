<template>
    <div class="comment-reply-list">
        <template v-for="(rep, index) in repsRef" :key="rep._id">
            <div class="comment-reply-item">
                <div class="d-flex justify-content-between align-items-end">
                    <div class="flex-grow-1">
                        <span class="time">{{ rep.time }}</span>
                        <span v-if="rep.tier === 1">
                            {{ rep.reviewer.nickname }}
                            <span class="reply-color">回复 @</span>
                            {{ rep.auther.nickname }} :
                            {{ rep.content }}
                        </span>
                        <span v-else>
                            {{ rep.reviewer.nickname }} : {{ rep.content }}
                        </span>
                    </div>
                    <div class="d-flex justify-content-end">
                        <el-badge
                            class="item"
                            :value="0"
                            :hidden="!!0"
                            type="success"
                        >
                            <el-button
                                class=""
                                size="mini"
                                @click="onSwitch(index)"
                                >回复</el-button
                            >
                        </el-badge>
                    </div>
                </div>
                <div v-if="isSwitch(index)">
                    <mood-comment-input
                        @myclick="onCreate($event, rep)"
                        @cancel-reply="oncancelReply"
                    ></mood-comment-input>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import useCommentInterface from '@/compositions/home/useCommentInterface.js'
import MoodCommentInput from '@/components/home/moodCommentInput.vue'

import { ref, onMounted, computed, watchEffect } from 'vue'

export default {
    props: {
        com: {
            type: Object,
            required: true
        },
        isCreate: {
            type: Boolean
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

        const oncancelReply = () => {
            switchRef.value = !switchRef.value
        }

        /**
         * 交互功能
         */
        const repsRef = ref([])
        const countRef = ref(0)
        // 发送数据
        const interfaceObj = useCommentInterface()
        const {
            onGetReps,
            onReply,
            onCreateOneRepCount,
            onUpdateOneRepCount,
            onGetOneRepCount
        } = interfaceObj

        // 子组件触发的接受函数
        const countCU = countCUFactory()
        const onCreate = async (condition, rep) => {
            let body = {
                auther: rep.reviewer.username,
                tier: 1,
                content: condition.textarea,
                commentId: props.com._id //耦合props属性。
            }
            await onReply(condition, body, repsRef)

            if (!condition.textarea) {
                return
            }
            const count = await countCU(rep._id)
            console.log(count)
            switchRef.value = !switchRef.value // 回复完，直接切换。
        }

        /**
         * count的创建和update封装函数。
         */
        function countCUFactory() {
            let countNum = 0
            return async id => {
                countNum++
                let count = await onGetOneRepCount(id) //先获取。
                if (count === null) {
                    await onCreateOneRepCount({
                        // 创建
                        id: id,
                        count: countNum
                    })
                } else {
                    await onUpdateOneRepCount({
                        // 更新
                        id: id,
                        count: countNum
                    })
                }
                return (count = await onGetOneRepCount(id)) //先获取。
            }
        }

        // 获取数据
        onMounted(async () => {
            //$http错误的问题都集中在http中，如果入刑到这里，说明是成功的返回结果。
            const reps = await onGetReps(props.com._id)
            repsRef.value = reps.message

            //根据每条评论Id，获取对应的数据长度
            // 根据coms，请求对应_id条件下的rep
            // const repOneArr = reps.message.map(async rep => {
            //     console.log(rep._id)
            //     return onGetOneReps(rep._id)
            // })
            // Promise.all(repOneArr).then(data => {
            //     console.log(data)
            // })
        })

        // 父组件，增加了数据。props.isCreate变化。就执行。
        watchEffect(async () => {
            const isChange = props.isCreate
            const reps = await onGetReps(props.com._id)
            repsRef.value = reps.message
        })

        return {
            repsRef,
            onSwitch,
            isSwitch,
            onCreate,
            oncancelReply
        }
    },
    components: {
        MoodCommentInput
    }
}
</script>

<style MoodCommentReply lang="scss" scope>
@import '@/assets/scss/home/moodCommentReplyList.scss';
</style>
