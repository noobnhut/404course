<template>
    <!--blog view-->
    <!--view-->
    <div id="blog" class=" px-4 xl:px-4 py-14">
        <div class="container mx-auto px-6 md:px-0">
            <div class=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 ">
                <!-- chi tiet -->
                <div v-for="blog in blogs"
                    class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-3xl  transition duration-300 ease-in-out "
                    v-bind:style="{ 'background-image': 'url(' + blog.img_blog + ')' }">

                    <div class=" w-full flex justify-between px-4 py-2  ">
                        <p tabindex="0" class="focus:outline-none text-sm text-white font-semibold tracking-wide">{{
                            blog.user.fullname }}</p>
                        <p tabindex="0" class="focus:outline-none text-sm text-white font-semibold tracking-wide">{{
                            formatDate(blog.createdAt) }}</p>
                    </div>

                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                    </div>
                    <div class="relative w-full h-full flex flex-col justify-center items-center">
                        <h3 class="text-center">
                            <a class="text-white text-sm md:text-base font-bold text-center">
                                {{ blog.title_blog }}
                            </a>
                        </h3>
                        <div class="flex px-2">
                            <button type="button" @click="openUpdate(), sendData(blog)" v-if="user.id == blog.user.id"
                                class=" mr-2 cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Chỉnh
                                sửa</button>
                            <button type="button" v-if="user.id == blog.user.id" @click="deleteBlog(blog.id)"
                                class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Xóa
                                bài</button>
                        </div>
                        <button type="button"
                            class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block"
                            @click="goToBlog(blog.id)">Xem
                            bài</button>

                    </div>
                </div>

            </div>
        </div>
        <div class="grid sm:grid-cols-3 gap-4 grid-cols-2 mb-10 mt-10" v-if="indexs>1">
            <nav aria-label="Page navigation ">
                <ul class="inline-flex -space-x-px">
                    <li>
                        <a
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 ">&lt&lt</a>
                    </li>
                    
                   <div v-for="n in indexs">
                    <li>
                        <a 
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 " @click="changePage(n)">{{ n }}</a>
                    </li>
                </div>

                    <li>
                        <a
                            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-{}00 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 ">&gt&gt</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>


    <!-- Chinh sua -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        v-show="showUpdate">

        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Cập nhập bài đăng
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        @click="openUpdate">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>

                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Chọn thể loại</label>
                    <select id="select" name="select" v-model="id_tag"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 mb-2 leading-tight focus:outline-none">
                        <option v-for="tag in tags.filter(items => items.status == 1)" :key="tag.id" :value="tag.id"> {{
                            tag.nametag
                        }}
                        </option>
                    </select>
                    <p class="text-red-500 text-sm ml-2" v-if="!id_tag && tagFocused">Danh mục bị trống.</p>

                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text"
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                            v-model="title" required>
                        <p class="text-red-500 text-sm ml-2" v-if="!title && titleFocused">Tiêu đề bị trống.</p>

                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Đường dẫn ảnh</label>
                        <input type="text"
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                            v-model="img_blog" required>
                        <p class="text-red-500 text-sm ml-2" v-if="!img_blog && imgFocused">Đường dẫn ảnh bị trống.</p>

                        <img :src="img_blog" alt="">

                    </div>

                    <QuillEditor theme="snow" ref="myEditorUpdate" v-model="content" />
                    <p class="text-red-500 text-sm ml-2" v-if="!content && contentFocused">Nội dung bị trống.</p>

                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="staticModal" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        @click="updateBlog">Cập
                        nhập</button>
                    <button data-modal-hide="staticModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                        @click="showUpdate">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <toast ref="toast"></toast>
</template>


<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import dayjs from 'dayjs';
import userServices from '../plugins/userServices';
import blogService from '../plugins/blogService';
import toast from './toast/toast.vue';
export default {

    data() {
        return {
            showUpdate: false,
            title: '', content: '', query: 1,
            blogs: [], tags: [], imgs: [], status: 1, indexs: '', numbers: [],
            user: '', id_tag: '', img_blog: '', blog: '', id: '',
            titleFocused: false, tagFocused: false, imgFocused: false, contentFocused: false
        }
    },
    props: ['filter'],
    components: {
        QuillEditor, toast
    },
    mounted() {
        this.getblog()
        this.gettag()
        this.user = userServices.getUserToken()
        this.generateNumbers()
    },
    methods: {
        formatDate(time) {
            return dayjs(time).format('DD-MM-YYYY');
        },
        generateNumbers() {
            for (let i = 1; i <= this.indexs; i++) {
                this.numbers.push(i);
            }
        },
        clearText() {
            this.title = ''
            this.content = ''
            this.img_blog = ''
        },

        async getblog() {
            blogService.getblog(this.query, this.status).then((data) => {
                if (this.filter == '') {
                    this.blogs = data.blogs
                    this.indexs = data.totalPages
                }
                else if (this.filter) {
                    this.blogs = data.blogs.filter(item => item.id_user == this.filter)
                    this.indexs = data.totalPages
                }
            })
        },
        updateContent(newContent) {
            this.content = newContent;
        },
        async deleteBlog(id) {
            const result = await blogService.deleteBlog(id)
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getblog()
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },
        async gettag() {
            try {
                const result = await this.$axios.get(
                    `tag/get`
                );
                this.tags = result.data;
            } catch (e) {
                console.log(e);
            }
        },
        goToBlog(id) {
            window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/blogs/detail/${id}`;
        },
        sendData(blog) {
            this.blog = blog
            this.img_blog = blog.img_blog
            this.title = blog.title_blog
            this.$refs.myEditorUpdate.setHTML(blog.content_blog)
            this.id = blog.id
            this.id_tag = blog.tag.id
        },
        openUpdate() {
            this.showUpdate = !this.showUpdate
        },
        async updateBlog() {
            this.titleFocused = true, this.tagFocused = true, this.imgFocused = true, this.contentFocused = true
            if (this.title && this.id_tag && this.img_blog && this.$refs.myEditorUpdate.getText().length > 1) {
                const result = await blogService.updateBlog(this.title, this.$refs.myEditorUpdate.getHTML(), this.user.id, this.id_tag, this.img_blog, this.id)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message)
                    this.getblog()
                    this.clearText()
                    this.showUpdate = false
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
                this.titleFocused = false, this.tagFocused = false, this.imgFocused = false, this.contentFocused = false

            }

        },
        changePage(n)
        {
            
            this.query = n
            this.getblog()
        }
    }

}

</script>