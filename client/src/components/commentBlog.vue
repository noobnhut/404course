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
                    v-for="cmt in comments.filter(items => items.reply_id == null)">

                    <article class=" mb-6 text-base bg-white rounded-lg ">
                        <footer class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 "><img
                                        class="mr-2 w-6 h-6 rounded-full" :src="cmt.user.avatar">{{ cmt.user.fullname }}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(cmt.createdAt) }}</p>
                            </div>
                            <!--menu edit comment cấp 1-->
                            <button @click="showEditLV1(cmt.id)" :class="getEditLV1(cmt.user.id)"
                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                    </path>
                                </svg>

                            </button>
                            <!-- Dropdown menu -->
                            <div id="dropdownComment1" v-if="isShowEditLV1 && idComment == cmt.id"
                                class=" z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            @click="oncloseEdit(); sendCMT(cmt); !showEditLV1(cmt.id)">Chỉnh sửa</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            @click="deleteCmt(cmt.id)">Xóa</a>
                                    </li>

                                </ul>
                            </div>
                        </footer>
                        <p class="text-gray-500 dark:text-gray-400">{{ cmt.comment }}</p>
                        <!--tra lời comment-->
                        <div class="flex items-center mt-4 space-x-4">
                            <button type="button" @click="oncloseReply(); sendCMT(cmt)"
                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                    </path>
                                </svg>
                                Trả lời
                            </button>
                            <button type="button" @click="getReply(cmt.id);"
                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                    </path>
                                </svg>
                                Xem phản hồi
                            </button>
                        </div>
                        <!--view reply-->
                        <div class="reply" v-for="reply in replys">

                            <article class=" mb-6 ml-6 mt-2 text-base bg-white rounded-lg "
                                v-if="isShowReply && cmt.id == reply.reply_id">
                                <footer class="flex justify-between items-center mb-2">
                                    <div class="flex items-center">
                                        <p class="inline-flex items-center mr-3 text-sm text-gray-900 "><img
                                                class="mr-2 w-6 h-6 rounded-full" :src="reply.user.avatar">{{
                                                    reply.user.fullname }}</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(reply.createdAt)
                                        }}</p>
                                    </div>
                                    <!--menu edit comment cấp 1-->
                                    <button @click="showEditLV1(reply.id)" :class="getEditLV1(reply.user.id)"
                                        class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button">
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                            </path>
                                        </svg>

                                    </button>
                                    <!-- Dropdown menu -->
                                    <div id="dropdownComment1" v-if="isShowEditLV1 && idComment == reply.id"
                                        class=" z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownMenuIconHorizontalButton">
                                            <li>
                                                <a href="#"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    @click="oncloseREdit(); sendReCMT(reply); !showEditLV1(reply.id)">Chỉnh
                                                    sửa</a>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    @click="deleteReply(reply.id, cmt.id)">Xóa</a>
                                            </li>

                                        </ul>
                                    </div>
                                </footer>
                                <p class="text-gray-500 dark:text-gray-400">{{ reply.comment }}</p>

                            </article>
                        </div>
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
    <!--form reply cmt-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowReplyCMT">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseReply"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập bình luận</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseReply"></i>
            </div>

            <div class="px-4">
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="recomment" v-on:keyup.enter="replycomment()"
                        placeholder="Thêm bình luận..."></textarea>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseReply">Đóng</button>
            </div>
        </div>
    </div>
    <!--form update cmt-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowEditCMT">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseEdit"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập bình luận</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseEdit"></i>
            </div>

            <div class="px-4">
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="comment" v-on:keyup.enter="editcomment()"
                        placeholder="Thêm bình luận..."></textarea>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseEdit">Đóng</button>
            </div>
        </div>
    </div>

    <!--form update replycmt-->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowEditRCMT">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseREdit"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập bình luận</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseREdit"></i>
            </div>

            <div class="px-4">
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="recomment" v-on:keyup.enter="editreply()"
                        placeholder="Thêm bình luận..."></textarea>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseREdit">Đóng</button>
            </div>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>
<script>
import dayjs from "dayjs";
import userService from "../plugins/userServices";
import blogService from "../plugins/blogService";
import toast from "./toast/toast.vue";
export default {
    emits: ["cancel"],
    props: ["blogId"],
    data() {
        return {
            comments: [], replys: [],
            comment: '', user: '',
            isShowEditLV1: false, isShowReplyCMT: false, isShowEditCMT: false,
            isShowReply: false, isShowEditRCMT: false,
            idComment: '', recomment: '', id_reply: ''

        };
    },
    components: { toast },
    mounted() {
        this.user = userService.getUserToken();
        blogService.getComment(this.blogId).then((data) => { this.comments = data })
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

        showEditLV1(id) {
            this.idComment = id
            this.isShowEditLV1 = !this.isShowEditLV1
        },

        getEditLV1(id) {
            return id == this.user.id ? '' : 'hidden';
        },

        oncloseReply() {
            this.isShowReplyCMT = !this.isShowReplyCMT
        },

        sendCMT(cmt) {
            if (this.isShowReplyCMT == true) {
                this.idComment = cmt.id
            }
            else {
                this.comment = cmt.comment
                this.idComment = cmt.id
            }
        },

        sendReCMT(reply) {
            this.recomment = reply.comment
            this.idComment = reply.id
            this.id_reply = reply.reply_id
        },

        oncloseEdit() {
            this.isShowEditCMT = !this.isShowEditCMT
        },

        oncloseREdit() {
            this.isShowEditRCMT = !this.isShowEditRCMT
        },

        async addcomment(id) {
            if (this.comment.trim() != '') {
                const result = await blogService.commentBlog(this.comment, this.blogId, this.user.id);
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message)
                    blogService.getComment(this.blogId).then((data) => { this.comments = data })
                    this.comment = ''
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
            }

        },

        async deleteCmt(id) {
            const result = await blogService.deleteComment(id);
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                blogService.getComment(this.blogId).then((data) => { this.comments = data })
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },

        async editcomment() {
            if (this.comment.trim() != '') {

                const result = await blogService.updateComment(this.comment, this.idComment);
                if (result.status == 200) {
                    this.oncloseEdit()
                    blogService.getComment(this.blogId).then((data) => { this.comments = data })
                    this.$refs.toast.showToast(result.data.message)
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
            }
        },

        getReply(id) {
            this.isShowReply = !this.isShowReply
            blogService.getReply(id).then((data) => { this.replys = data })
        },

        async replycomment() {
            if (this.recomment.trim() != '') {

                const result = await blogService.replyCMTBlog(this.recomment, this.blogId, this.user.id, this.idComment);
                if (result.status == 200) {
                    this.oncloseReply()
                    blogService.getComment(this.blogId).then((data) => { this.comments = data })
                    this.$refs.toast.showToast(result.data.message)
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
            }
        },

        async deleteReply(id, id_comment) {
            const result = await blogService.deleteReply(id);
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getReply(id_comment)
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },

        async editreply() {
            if (this.recomment.trim() != '') {
                const result = await blogService.updateReply(this.recomment, this.idComment);
                if (result.status == 200) {
                    this.oncloseREdit()
                    this.getReply(this.id_reply)
                    this.$refs.toast.showToast(result.data.message)
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
            }

        }

    },
};
</script>