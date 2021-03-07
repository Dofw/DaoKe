<template>
    <div class="list">
        <dl class="" v-for="(item, index) in list" :key="index">
            <dt @click="changeListActive">
                <i class="iconfont" :class="item.logo"> {{ item.category }}</i>
                <i class="iconfont icon-jiantou-you-cuxiantiao-fill"></i>
                <i class="iconfont icon-jiantou-xia-cuxiantiao-fill"></i>
            </dt>
            <div v-if="item.children.length !== 0">
                <dd v-for="(child, index) in item.children" :key="index">
                    <i class="iconfont" :class="child.logo"></i
                    >{{ child.subclass }}
                </dd>
            </div>
            <p v-else></p>
        </dl>
    </div>
</template>

<script>
import useListConstructor from '@/compositions/user/useListConstructor.js'

export default {
    setup() {
        return {
            ...useListConstructor()
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/user/left/leftList.scss';
</style>
