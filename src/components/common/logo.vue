<template>
    <div
        class="logo d-flex align-items-center justify-content-center"
        :style="{
            fontSize: size ? size : '40px',
            height: height ? height : ''
        }"
    >
        <div class="photo flex-shrink-0"></div>
        <span class="mx-2 ">Welcome 刀客</span>
    </div>
</template>

<script>
import {} from 'vue'
export default {
    props: ['size', 'height'],
    setup() {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/logo.scss';
</style>
