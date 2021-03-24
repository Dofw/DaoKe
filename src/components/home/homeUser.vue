<template>
    <div class="nav--user  d-flex align-items-end">
        <div class="unlogin" v-if="!isLogin">
            <router-link custom to="/account/login" v-slot="{ navigate }">
                <div @click="navigate">请登录</div>
            </router-link>
        </div>
        <div class="islogin " v-else>
            <img :src="photoUrl" v-if="photoUrl" alt="" />
            <img src="../../assets/images/you1.jpg" v-else alt="" />
            <span>{{ nickname }}</span>
            <span @click="onexist">退出</span>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
    props: {
        isLogin: {
            type: Boolean
        },
        nickname: {
            type: String
        },
        photoUrl: {
            type: String
        }
    },
    setup(props, context) {
        onMounted(() => {})

        // 退出事件函数
        const onexist = () => {
            context.emit('logout')
        }

        return {
            onexist
        }
    }
}
</script>

<style lang="scss" scope>
.nav--user {
    > div {
        &.unlogin {
            div {
                width: 3rem;
                height: 3rem;
                line-height: 3rem;
                font-size: 0.9rem;
                text-align: center;
                border-radius: 50%;
                background-color: aquamarine;
                border: 2px solid #fd7e14;

                cursor: pointer;
            }
        }
        &.islogin {
            img {
                border: 2px solid #fd7e14;
                border-radius: 50%;
                width: 3rem;
                height: 3rem;

                cursor: pointer;
            }
            span {
                margin-left: 5px;
                border: 2px solid #fd7e14;
                border-radius: 5px;
                padding: 0 5px;
                font-size: 1rem;
                font-weight: 700;
                vertical-align: bottom;

                cursor: pointer;
            }
        }
    }
}
</style>
