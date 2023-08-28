<template>
    <div class="flex m-2 shadow-lg shadow-gray-500/50 ">
        <div class="w-1/4  p-2  ">
            <div class="flex flex-col " v-for="(index, i) in courses.index_courses" :key="i">
                <a class="p-4 border border-gray-300 hover:bg-gray-100 mb-2 cursor-pointer relative hover-trigger">{{
                    `Chương ${i + 1}: ` + ' ' + index.title_index }}
                    <div class="absolute  border border-grey-100 p-2 hover-target right-0 bg-gray-100">
                        <p v-html="index.description_index"></p>
                    </div>
                </a>

                <div id="subTabs1" class="pl-4 flex flex-col" v-for="(content, y) in index.content_index_courses" :key="y">
                    <a class="p-4 hover:bg-gray-100 cursor-pointer" @click="showContent(content)">{{ `Phần ${i + 1}: ` 
                        + content.title_content }}</a>
                </div>
            </div>
        </div>
        <div class="w-3/4 p-4  ">
            <!-- Nội dung của tab sẽ được đặt ở đây -->
            <div class="flex " v-if="showCourse">
                <!-- Card -->
                <div class=" p-8">
                    <!-- Header -->
                    <header class="flex font-light text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90 -ml-2" viewBox="0 0 24 24"
                            stroke="#b91c1c">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                        <p>{{ fullname }}</p>
                    </header>

                    <!-- Title -->
                    <h2 class="font-bold text-3xl mt-2">
                        {{ courses.title_course }}
                    </h2>

                    <!-- Description -->
                    <h3 class="font-bold text-xl mt-8"> Miêu tả</h3>
                    <p class="font-light" v-html="courses.description_course"> </p>
                </div>

            </div>
            <!--Nội dung chi tiết-->
            <div v-if="content.type == 'video'" class="p-5">
                <header class="flex font-light mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90 -ml-2" viewBox="0 0 24 24"
                        stroke="#b91c1c">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                    <p class="text-xl font-bold">{{ content.title_content }}</p>
                </header>
                <iframe class="w-full  aspect-video aspect-[4/3] " :src="content.link_video" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            </div>
            <div v-else-if="content.type == 'document'" class="p-5">
                <header class="flex font-light mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90 -ml-2" viewBox="0 0 24 24"
                        stroke="#b91c1c">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                    <p class="text-xl font-bold">{{ content.title_content }}</p>
                </header>
                <p v-html="content.description_content"></p>
            </div>
        </div>
    </div>
    <div
        class="fixed right-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 rounded-lg shadow-md w-32 bottom-2 cursor-pointer" @click="onclose()">
        <div class="flex items-center text-base text-white ">
            <i class="fa-regular fa-comment mr-2"></i>
            <div class=" font-semibold">Bình luận</div>
        </div>
    </div>
    <commentCourseVue :courseId="this.$route.params.id" @cancel="onclose()" v-if="showcomment"/>
    <footerV />

</template>
<style>
.hover-trigger .hover-target {
    display: none;
}

.hover-trigger:hover .hover-target {
    display: block;
}
</style>
<script>
import commentCourseVue from '../../components/commentCourse.vue';
import courseService from '../../plugins/courseService';
import footerV from '../../components/footer.vue';
export default {

    data() {
        return {
            courses: [],
            content: '', fullname: '',
            showCourse: true,showcomment:false
        }
    },
    components: { footerV,commentCourseVue },
    mounted() {
        courseService.getCourseByID(this.$route.params.id).then((data) => {
            this.courses = data
            this.fullname = data.user.fullname
        })

    },
    methods: {
        showContent(content) {
            this.showCourse = false
            this.content = content
        },
        showTextIndex(index) {
            alert(index.id)
        },
        onclose()
        {
            this.showcomment = !this.showcomment
        }
    }

}

</script>