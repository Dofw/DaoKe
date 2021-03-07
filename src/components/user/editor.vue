<template>
    <div class="row editor">
        <div class="d-flex justify-content-center col-lg-8 mb-2">
            <div class="align-self-center flex-shrink-0">
                <editormood></editormood>
            </div>
        </div>
        <div class="d-flex justify-content-center col-lg-8 ml-auto mb-2">
            <div class="align-self-center flex-shrink-0">内容</div>
        </div>
        <div class="d-flex justify-content-center col-lg-8 ">
            <div class="align-self-center flex-shrink-0">内容3</div>
        </div>
    </div>
</template>

<script>
import editormood from './editormo.vue'
export default {
    components: {
        editormood
    }
}
</script>

<style lang="scss">
@import '../../assets/scss/user/editor.scss';
</style>
