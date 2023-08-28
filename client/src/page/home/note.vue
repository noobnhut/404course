<template>
    <!--add-->
    <div class=" mt-5 editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        v-if="showAdd">
        <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="title"
            placeholder="Tiêu đề note" type="text">
        <p class="text-red-500 text-sm ml-2" v-if="!title && titleFocused">Tiêu đề bị trống.</p>
        <div class="mb-2">
            <QuillEditor theme="snow" ref="myEditor" v-model="content" />
            <p class="text-red-500 text-sm ml-2" v-if="!content && editFocused">Nội dung bị trống.</p>
        </div>
        <!-- buttons -->
        <div class="buttons flex mt-2">
            <div class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                @click="addNote()">
                Thêm</div>
            <div class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                @click="openAdd()">
                Hủy</div>
        </div>
    </div>

    <!--view-->
    <div class="mx-auto container py-2 px-6">
        <button @click="openAdd()" v-if="!showAdd" type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">Thêm</button>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            <div class="rounded" v-for="(note, index) in notes" :key="index">
                <div class="card mt-5 ml-10 ">
                    <div class="max-w-sm rounded overflow-hidden shadow-2xl bg-gray-100">
                        <img class="w-full h-32 object-cover" :src="imgs[index % imgs.length]" alt="Mountain">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2"> {{ note.title_note }}</div>
                            <p class="text-gray-700 text-base">
                                <span v-html="note.content_note"></span>
                            </p>
                        </div>
                        <div class="px-6 pt-4 pb-2">
                            <button type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                @click="oncloseUpdate(), getText(note)">Cập nhập</button>
                            <button type="button"
                                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                                @click="deleteNote(note.id)">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>


    <!--popup edit - deleteNote -->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowUpdate">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseUpdate"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập ghi chú</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseUpdate"></i>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                        v-model="title" required>
                    <p class="text-red-500 text-sm ml-2" v-if="!title && titleFocused">Tiêu đề bị trống.</p>

                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Nội dung</label>
                    <QuillEditor theme="snow" ref="myEditorUpdate" v-model="content" />
                    <p class="text-red-500 text-sm ml-2"
                        v-if="!content && editFocused">Nội dung bị trống.</p>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="updateNote">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseUpdate()">Đóng</button>
            </div>
        </div>
    </div>

    <toast ref="toast"></toast>
</template>

<script>
import userService from '../../plugins/userServices.js';
import noteService from '../../plugins/noteService';
import functionService from '../../plugins/functionService'
import toast from '../../components/toast/toast.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
    data() {
        return {
            notes: [], query: 1, user: '',
            showAdd: false, showdropdown: false, isShowUpdate: false,
            titleFocused: false, editFocused: false,
            title: '', content: '', note: '', id: '',
            imgs: ['https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/01/Hinh-nen-4K-1.jpg?fit=3840%2C2160&ssl=1',
                'https://thuthuatnhanh.com/wp-content/uploads/2023/06/hinh-nen-4k-cuc-dep-sieu-net-cho-may-tinh.jpg',
                'https://thuthuatnhanh.com/wp-content/uploads/2023/06/hinh-nen-4k-cho-may-tinh.jpg',
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0QC8OuDTtHc6hPJbG8j09_V2G8jmvisd_E27Y_ugPDXdeCUctd4MrNvvJV-ez4EfZ46k&usqp=CAU',
                'https://mekoong.com/wp-content/uploads/2022/12/Hinh-nen-linh-ho-tro-thoi-chien-4k.png',
                'https://demoda.vn/wp-content/uploads/2022/01/hinh-nen-4k-laptop-va-pc-800x500.jpg',
                'https://a-static.besthdwallpaper.com/landscape-scenery-genshin-impact-anime-video-game-wallpaper-2560x1440-72977_51.jpg',
                'https://inkythuatso.com/uploads/thumbnails/800/2022/03/anh-genshin-impact-4k-ngoi-lang-qingce-17-10-31-27.jpg']
        }
    },
    components: { toast, QuillEditor },
    mounted() {
        this.user = userService.getUserToken()
        this.getNote();
    },
    methods: {
        formatDate(time) {
            functionService.formatDate(time)
        },
        async getNote() {
            noteService.getNote(this.user.id).then((data) => { this.notes = data })
        },
        async deleteNote(id) {
            const result = await noteService.deleteNote(id);
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getNote()
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },
        async addNote() {
            this.titleFocused = true
            this.editFocused = true
            if (this.title && this.$refs.myEditor.getText().length > 1) {
                const result = await noteService.addNotes(this.title, this.$refs.myEditor.getHTML(), this.user.id)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message)
                    this.getNote()
                    this.title = ''
                    this.showAdd = false
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
                this.titleFocused = false
                this.editFocused = false
            }



        },
        async updateNote() {
            this.titleFocused = true
            this.editFocused = true
            if (this.title && this.$refs.myEditorUpdate.getText().length > 1) {
                const result = await noteService.updateNote(this.title, this.$refs.myEditorUpdate.getHTML(), this.user.id, this.id)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message)
                    this.getNote()
                    this.clearText()
                    this.isShowUpdate = false
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                } this.titleFocused = false
                this.editFocused = false
            }
        },
        getText(note) {
            this.title = note.title_note;
            this.$refs.myEditorUpdate.setHTML(note.content_note)
            this.id = note.id
        },
        opendropdown() {
            this.showdropdown = !this.showdropdown
        },
        openAdd() {
            this.showAdd = !this.showAdd
        },
        oncloseUpdate() {
            this.isShowUpdate = !this.isShowUpdate
        }
    },


}
</script>