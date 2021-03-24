<template>
    <div class="home__mood">
        <div class="home--filter ">
            <ul class="d-flex ">
                <li
                    :class="[filterRef === 'all' ? 'active' : '']"
                    @click="onchangeFilter('all')"
                >
                    All
                </li>
                <li
                    :class="[filterRef === 'music' ? 'active' : '']"
                    @click="onchangeFilter('music')"
                >
                    Music
                </li>
                <li
                    :class="[filterRef === 'nomusic' ? 'active' : '']"
                    @click="onchangeFilter('nomusic')"
                >
                    noMusic
                </li>
            </ul>
        </div>
        <div class="home--exhibition">
            <el-timeline>
                <el-timeline-item
                    v-for="(item, index) in moodFilterRef"
                    :key="index"
                    :color="item.color"
                    :timestamp="item.time"
                    icon="el-icon-more"
                    type="success"
                    size="large"
                >
                    <mood-content v-bind="item" />
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
// import { ref, computed } from 'vue'
import useGetData from '@/compositions/home/useGetData.js'
import useFilterData from '@/compositions/home/useFilterData.js'
import MoodContent from '@/components/home/moodContent.vue'

export default {
    setup() {
        const obj = useGetData()
        return {
            ...useFilterData(obj.moodDataRef),
            ...obj
        }
    },
    components: {
        MoodContent
    }
}
</script>

<style lang="scss" scope>
.home__mood {
    padding: 20px;
    border: 1px solid darkcyan;
    ul {
        li {
            margin-right: 10px;
            &.active {
                color: darkorange;
            }
        }
    }
}
</style>
