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
            <div class="wrapper">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in pageDataRef"
                        :key="index"
                        :timestamp="timeRef(item.time)"
                        type="success"
                        size="large"
                    >
                        <!-- 重构 -->
                        <div>
                            <el-row
                                class="mood-content-top"
                                :gutter="10"
                                align="middle"
                            >
                                <el-col :span="1.5">
                                    <div class="block ">
                                        <el-avatar
                                            :size="30"
                                            fit="cover"
                                            :src="item.info.photoUrl"
                                            icon="el-icon-user-solid"
                                        ></el-avatar>
                                    </div>
                                </el-col>
                                <el-col
                                    :span="6"
                                    class="d-flex align-items-center"
                                >
                                    <span class="align-self-shrink"
                                        >{{
                                            item.info.nickname
                                                ? item.info.nickname
                                                : '刀客'
                                        }}
                                        <i class="el-icon-loading"></i
                                        >说：</span
                                    >
                                </el-col>
                            </el-row>
                            <el-row class="mood-content-center" :gutter="10">
                                <el-col :span="16">
                                    <p class="mood-text">
                                        {{ item.mood }}
                                    </p>
                                </el-col>
                                <el-col :span="8">
                                    <div class="radio">
                                        <div
                                            class="mood-img"
                                            v-if="item.pictureUrl"
                                        >
                                            <img
                                                id="audio-img"
                                                :src="item.pictureUrl"
                                            />
                                        </div>
                                        <div
                                            class="mood-mp3 "
                                            v-if="item.mp3Url"
                                        >
                                            <span>{{
                                                item.mp3Name
                                                    ? item.mp3Name
                                                    : '无'
                                            }}</span>
                                            <div class="audio__control">
                                                <audio-control
                                                    :mp3Url="item.mp3Url"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row>
                                <!-- 评论组件 -->
                                <mood-comment-list
                                    :auther="item.username"
                                    :moodId="item._id"
                                    type="mood"
                                />
                            </el-row>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div class="pagination d-flex justify-content-center ">
            <el-pagination
                :hide-on-single-page="paginationRef.hide"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paginationRef.currentPage"
                :page-sizes="paginationRef.pageSizes"
                :page-size="paginationRef.pageSize"
                layout="sizes, prev, pager, next, jumper"
                :total="paginationRef.total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import MoodCommentList from '@/components/home/moodCommentList.vue'
import AudioControl from '@/components/home/audioControl.vue'
import useGetData from '@/compositions/home/useGetData.js'
import usePaginationData from '@/compositions/home/usePaginationData.js'
import useFilterData from '@/compositions/home/useFilterData.js'
import useTimeFormat from '@/compositions/useTimeFormat.js'

export default {
    setup() {
        const obj = useGetData()
        const { filterRef, onchangeFilter, moodFilterRef } = useFilterData(
            obj.moodDataRef
        )

        return {
            filterRef,
            onchangeFilter,
            ...usePaginationData(moodFilterRef),
            ...useTimeFormat()
        }
    },
    components: {
        MoodCommentList,
        AudioControl
    }
}
</script>

<style lang="scss" scope>
@import '@/assets/scss/home/moodContent.scss';
</style>
