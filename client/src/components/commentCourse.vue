<template>
    <div class="w-full h-full bg-gray-800 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 z-50"
        id="chec-div">
        <div class="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="notification">

            <div class="2xl:w-4/12 bg-gray-50 h-screen overflow-y-hidden hover:overflow-scroll p-8 absolute right-0">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Bình luận</p>
                    <button @click="openComment"
                        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M6 6L18 18" stroke="#4B5563" stroke-width="1.25" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <!--biểu ngữ-->
                <p class="p-2 mt-2">(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
                <!--nội dung comment-->
                <div class="w-full p-3 mt-8 bg-white rounded flex"
                    v-for="cmt in comments">

                    <article class=" mb-6 text-base bg-white rounded-lg ">
                        <footer class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 "><img
                                        class="mr-2 w-6 h-6 rounded-full" :src="cmt.user.avatar">{{ cmt.user.fullname }}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(cmt.createdAt) }}</p>
                            </div>
                        </footer>
                        <p class="text-gray-500 dark:text-gray-400">{{ cmt.content_question }}</p>
                    </article>
                </div>

                <!--view comment-->
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="comment" v-on:keyup.enter="addcomment()"
                        placeholder="Thêm bình luận..."></textarea>  
                </div>

            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>
<script>
import dayjs from "dayjs";
import userService from "../plugins/userServices";
import toast from "./toast/toast.vue";
export default {
    emits: ["cancel"],
    props: ["courseId"],
    data() {
        return {
            comments: [], replys: [],
            comment: '', user: '',
        };
    },
    components: { toast },
    mounted() {
        this.user = userService.getUserToken();
        this.getComment()
    },
    methods: {
        openComment() {
            this.$emit("cancel");
        },

        formatDate(createdAt) {
            const now = dayjs();
            const diffInSeconds = now.diff(createdAt, 'second');

            if (diffInSeconds < 60) {
                return `${diffInSeconds} giây`;
            } else if (diffInSeconds < 3600) {
                const diffInMinutes = Math.floor(diffInSeconds / 60);
                return `${diffInMinutes} phút`;
            } else if (diffInSeconds < 86400) {
                const diffInHours = Math.floor(diffInSeconds / 3600);
                return `${diffInHours} giờ`;
            } else {
                const diffInDays = Math.floor(diffInSeconds / 86400);
                return `${diffInDays} ngày`;
            }
        },
   
        async addcomment() {
            try {
               if(this.comment.trim() != '')
               {
                const result = await  this.$axios.post(`course/question/add/${this.courseId}`,
                {
                    id_user: this.user.id,
                    content_question:this.comment
                })
                
                if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getComment()
                this.comment = ''
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
               }
            } catch (error) {
                console.log(error)
            }
        },
        async getComment()
        {
            try {
               const result = await this.$axios.get(`course/question/get/${this.courseId}`)
               this.comments = result.data 
            } catch (error) {
                console.log(error)
            }
        }
    },
};
</script>