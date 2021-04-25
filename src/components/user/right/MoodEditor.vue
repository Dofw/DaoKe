<template>
    <div class="row editor">
        <div class="d-flex justify-content-center col-lg-8 mb-2">
            <div class="align-self-center flex-shrink-0">
                <MoodUpload></MoodUpload>
            </div>
        </div>
        <div class="d-flex justify-content-center col-lg-8 ml-auto mb-2">
            <div class="align-self-center flex-shrink-0">...</div>
        </div>
        <div class="d-flex justify-content-center col-lg-8 ">
            <div class="align-self-center flex-shrink-0">...</div>
        </div>
    </div>
</template>

<script>
import MoodUpload from '@/components/user/right/MoodUpload.vue'
export default {
    components: {
        MoodUpload
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/user/editor.scss';
</style>
