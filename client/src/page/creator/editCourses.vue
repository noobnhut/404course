<template>
    <!-- Main modal -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
        <div class="relative w-full max-w-screen-lg max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!--view edit course-->
                <div class="course" v-if="editCourse">
                    <!-- Modal course header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mb-2">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Cập nhập khóa học
                        </h3>
                        <button @click="onclose()" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>

                    </div>
                    <span class="text-base text-red-500 m-2 p-2">( Lưu ý việc nhấn tiếp tục sẽ trực tiếp lưu lên CSDL.
                        )</span>

                    <!-- Modal course body -->
                    <div class="p-6 space-y-6">
                        <div class="title_course">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề khóa học</label>
                            <input type="text"
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                                v-model="title_course" required>
                            <p class="text-red-500 text-sm ml-2" v-if="!title_course && title_CourseFocused">Tiêu đề bị
                                trống.</p>
                        </div>

                        <div class="description_course">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Mô tả khóa học</label>
                            <QuillEditor theme="snow" ref="courseEditor" v-model="description_course" />

                        </div>

                        <div class="img_course">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Đường dẫn ảnh</label>
                            <input type="text"
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                                v-model="img_course" required>
                            <img :src="img_course" class="mt-2" alt="Đường dẫn bị lỗi">
                            <p class="text-red-500 text-sm ml-2" v-if="!img_course && img_CourseFocused">Đường dẫn ảnh bị
                                trống.</p>
                        </div>
                    </div>
                    <!-- Modal course footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" @click="updateCourse()"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bước
                            tiếp theo</button>
                        <button type="button" @click="onclose()"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                    </div>
                </div>

                <!--view edit index-->
                <div class="index" v-if="editIndex">
                    <!-- Modal course header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mb-2">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Cập nhập mục lục
                        </h3>
                        <button @click="onclose()" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>

                    </div>
                    <span class="text-base text-red-500 m-2 p-2">( Lưu ý việc nhấn tiếp tục sẽ trực tiếp lưu lên CSDL.
                        )</span>

                    <!-- Modal course body -->
                    <div class="p-6 space-y-6">
                        <div class="flex space-x-6">
                            <span class="cursor-pointer px-4 py-2 bg-violet-500 rounded" @click="isShowAddIndex = true">+
                                Thêm chỉ mục</span>
                        </div>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Tiêu đề
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Nội dung
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        v-for="index in indexs">
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {{ index.title_index }}
                                        </td>
                                        <td class="px-6 py-4">
                                            <p v-html="index.description_index"></p>
                                        </td>
                                        <td class="border-t">
                                            <span class="px-6 py-4 flex items-center">
                                                <span
                                                    class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-green-200 text-green-800 cursor-pointer mr-2"
                                                    @click="isShowUindex = true; sendIndex(index)">Sửa</span>
                                                <span
                                                    class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer"
                                                    @click="deleteIndex(index.id)">Xóa</span>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <!-- Modal course footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" @click="nextContent()"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Bước
                            tiếp theo</button>
                    </div>
                </div>

                <!--view edit content-->
                <div class="content" v-if="editContent">
                    <!-- Modal content header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mb-2">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Cập nhập mục lục
                        </h3>
                        <button @click="onclose()" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>

                    </div>
                    <span class="text-base text-red-500 m-2 p-2">( Lưu ý việc nhấn tiếp tục sẽ trực tiếp lưu lên CSDL.
                        )</span>

                    <!-- Modal content body -->
                    <div class="p-6 space-y-6">

                        <div class="choice_index">
                            <label class="block mb-2 text-sm font-medium text-gray-900">Chọn mục lục - chỉ mục</label>
                            <select id="select" name="select" v-model="id_index" @change="getContent()"
                                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                                <option v-for="index in indexs" :key="index.id" :value="index.id">
                                    {{ index.title_index }}
                                </option>
                            </select>
                        </div>

                        <div class="content" v-if="showContent">
                            <div class="flex space-x-6">
                                <span class="cursor-pointer px-4 py-2 bg-violet-500 rounded"
                                    @click="isShowAddContent = true">+ Thêm nội
                                    dung</span>
                            </div>
                            <div class="relative">
                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead
                                        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Tiêu đề
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Nội dung
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Hành động
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            v-for="content in contents">
                                            <td
                                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {{ content.title_content }}
                                            </td>
                                            <td class="px-6 py-4" v-if="content.type == 'document'">
                                                <span v-html="content.description_content"></span>
                                            </td>
                                            <td class="px-6 py-4" v-if="content.type == 'video'">
                                                <!-- <iframe  :src="content.link_video" frameborder="0" allowfullscreen></iframe> -->
                                                {{ content.link_video }}
                                            </td>

                                            <td class="border-t">
                                                <span class="px-6 py-4 flex items-center">
                                                    <span
                                                        class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-green-200 text-green-800 cursor-pointer mr-2"
                                                        @click="isShowUcontent = true; sendContent(content)">Sửa</span>
                                                    <span
                                                        class="px-2 rounded-full text-sm uppercase tracking-wide font-semibold bg-red-200 text-red-800 cursor-pointer"
                                                        @click="deleteContent(content.id)">Xóa</span>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                    <!-- Modal content footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="Complete()">Hoàn
                            thành</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!--edit popup index-->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        v-if="isShowUindex">
        <div class="relative w-full max-w-xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!--view edit course-->
                <div class="edit_index">
                    <!-- Modal course header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mb-2">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Cập nhập {{ title_index }}
                        </h3>
                        <button @click="isShowUindex = false" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>

                    </div>


                    <!-- Modal course body -->
                    <div class="p-6 space-y-6">
                        <div>
                            <button @click="getData()"
                                class="text-white w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Lấy
                                dữ liệu mô tả</button>
                        </div>
                        <div class="title_course">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề chương</label>
                            <input type="text"
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                                v-model="title_index" required>
                            <p class="text-red-500 text-sm ml-2" v-if="!title_index && title_indexFocused">Tiêu đề bị
                                trống.</p>
                        </div>

                        <div class="description_index">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Mô tả chương</label>
                            <QuillEditor theme="snow" ref="indexEditorsUpdate" />
                        </div>

                    </div>
                    <!-- Modal course footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" @click="updateIndex()"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập
                            nhập</button>
                        <button type="button" @click="isShowUindex = false"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--edit popup content-->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        v-if="isShowUcontent">
        <div class="relative w-full max-w-xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!--view edit course-->
                <div class="edit_index">
                    <!-- Modal course header -->
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 mb-2">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Cập nhập {{ title_content }}
                        </h3>
                        <button @click="isShowUcontent = false" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>

                    </div>


                    <!-- Modal course body -->
                    <div class="p-6 space-y-6">
                        <div class="title_course">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề chương</label>
                            <input type="text"
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                                v-model="title_content" required>
                            <p class="text-red-500 text-sm ml-2" v-if="!title_content && title_contentFocused">Tiêu đề bị
                                trống.</p>
                        </div>

                        <div class="description_content" v-if="type == 'document'">
                            <div>
                                <button @click="getDataContent()"
                                    class="text-white w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 mb-2 md:mr-0">Lấy
                                    dữ liệu mô tả</button>
                            </div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Mô tả chương</label>
                            <QuillEditor theme="snow" ref="contentEditor" />
                        </div>

                        <div class="video_link" v-if="type == 'video'">
                            <label class="block mb-2 text-sm font-medium text-gray-900 ">Đường dẫn video</label>
                            <input type="text"
                                class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                                v-model="video_link" required>
                            <p class="text-red-500 text-sm ml-2" v-if="!video_link && video_linkFocused"> Đường dẫn bị
                                trống.</p>
                        </div>
                    </div>
                    <!-- Modal course footer -->
                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button type="button" @click="updatecontent()"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cập
                            nhập</button>
                        <button type="button" @click="isShowUcontent = false"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Hủy</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--Thêm index-->
    <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50" v-show="isShowAddIndex">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="isShowAddIndex = false"></div>

        <div class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Thêm chỉ mục</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="isShowAddIndex = false"></i>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Tiêu đề</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                        v-model="title_index" required />
                    <p class="text-red-500 m-2" v-if="!title_index && title_indexFocused">
                        - Vui lòng nhập tiêu đề
                    </p>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>
                    <QuillEditor theme="snow" ref="indexEditors" v-model="description_index" />
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="addIndex()">
                    Thêm chỉ mục
                </button>
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="isShowAddIndex = false">
                    Đóng
                </button>
            </div>
        </div>
    </div>

    <!--Thêm index content-->
    <div class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-50" v-show="isShowAddContent">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="isShowAddContent = false"></div>

        <div class="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Thêm nội dung</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl"
                    @click="isShowAddContent = false"></i>
            </div>

            <div class="px-4">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Chọn nội dung</label>
                    <select id="select" name="select" v-model="id_index"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option v-for="index in indexs" :key="index.id" :value="index.id">
                            {{ index.title_index }}
                        </option>
                    </select>
                    <p class="text-red-500 m-2" v-if="!id_index && id_indexFocused">
                        - Vui lòng chọn nội dung
                    </p>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Tiêu đề</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                        v-model="title_content" required />
                    <p class="text-red-500 m-2" v-if="!title_content && title_contentFocused">
                        - Vui lòng nhập đường dẫn Youtube
                    </p>
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">Loại tài liệu:</label>
                    <select id="select" name="select" v-model="type" @change="handleContent()"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
                        <option value="video">Video</option>
                        <option value="document">Document</option>
                    </select>
                    <p class="text-red-500 m-2" v-if="!type && typeFocused">
                        - Vui lòng chọn loại tài liệu
                    </p>
                </div>

                <div v-if="show_Video">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Đường dẫn Youtube</label>
                    <input type="text"
                        class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                        v-model="video_link" required />
                    <p class="text-red-500 m-2" v-if="!video_link && video_linkFocused">
                        - Vui lòng nhập đường dẫn Youtube
                    </p>

                </div>

                <div v-if="show_Content">
                    <label class="block mb-2 text-sm font-medium text-gray-900">Mô tả</label>

                    <QuillEditor theme="snow" ref="contentEditor" v-model="description_index" />

                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                    @click="addContent()">
                    Thêm nội dung
                </button>
                <button
                    class="py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="isShowAddContent = false">
                    Đóng
                </button>
            </div>
        </div>
    </div>

    <toast ref="toast"></toast>
</template>

<script>
import toast from "../../components/toast/toast.vue";
import courseService from "../../plugins/courseService";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
export default {
    emits: ["cancel"],
    props: ["courseid"],
    data() {
        return {
            editCourse: true, editIndex: false, editContent: false, showContent: false,
            courses: [], indexs: [], contents: {},
            title_course: '', description_course: '', img_course: '',
            title_index: '', description_index: '', id_index: '', index: '',
            title_content: '', document_content: '', video_link: '', id_content: '', type: '',
            title_CourseFocused: false, description_CourseFocused: false, img_CourseFocused: false,
            title_contentFocused: false, document_contentFocused: false, video_linkFocused: false,
            title_indexFocused: false, description_indexFocused: false, typeFocused: false,
            isShowUindex: false, isShowUcontent: false, isShowAddIndex: false, isShowAddContent: false,
            show_Video: false, show_Content: false, id_indexFocused: false
        };
    },
    components: { QuillEditor, toast },
    mounted() {
        courseService.getCourseByID(this.courseid).then((data) => {
            {
                this.courses = data,
                    this.title_course = this.courses.title_course
                this.$refs.courseEditor.setHTML(this.courses.description_course)
                this.img_course = this.courses.img_course
            }
        })

    },
    methods: {
        onclose() {
            this.$emit("cancel");
        },
        async updateCourse() {
            this.title_CourseFocused = true

            this.img_CourseFocused = true
            if (this.title_course && this.img_course) {
                const result = await courseService.updateCourse(this.courseid, this.title_course, this.$refs.courseEditor.getHTML(), this.img_course)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    this.editCourse = false
                    this.editIndex = true
                    courseService.getCourse_Index(this.courseid).then((data) => {
                        this.indexs = data;
                    });
                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
                this.title_CourseFocused = false

                this.img_CourseFocused = false
            }

        },
        nextContent() {
            this.editIndex = false
            this.editContent = true
            this.id_index = ''
        },
        getContent() {
            this.showContent = true
            courseService.getContentbyIndex(this.id_index).then((data) => {
                this.contents = data
            })
        },

        sendIndex(index) {
            this.id_index = index.id
            this.title_index = index.title_index
            this.description_index = index.description_index
        },
        getData() {
            this.$refs.indexEditorsUpdate.setHTML(this.description_index)
        },
        async updateIndex() {
            this.title_indexFocused = true


            if (this.title_index) {
                const result = await courseService.updateIndex(this.id_index, this.title_index, this.$refs.indexEditorsUpdate.getHTML())
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    this.isShowUindex = false
                    courseService.getCourse_Index(this.courseid).then((data) => {
                        this.indexs = data;
                    });
                    this.id_index = ''
                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
                this.title_indexFocused = false

            }
        },
        async deleteIndex(id) {
            try {
                const result = await this.$axios.delete(`course/index/delete/` + id);
                if (result.status == 200) {
                    courseService.getCourse_Index(this.courseid).then((data) => {
                        this.indexs = data;
                    });
                    this.$refs.toast.showToast(result.data.message);
                } else {
                    this.$refs.toast.showToast(result.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addIndex() {
            this.title_indexFocused = true

            if (this.title_index) {
                const result = await courseService.addIndex(this.courseid, this.title_index, this.$refs.indexEditors.getHTML())
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    this.isShowAddIndex = false
                    this.$refs.indexEditors.setHTML('')
                    courseService.getCourse_Index(this.courseid).then((data) => {
                        this.indexs = data;
                    });

                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
                this.title_indexFocused = false
                this.description_indexFocused = false
            }
        },

        sendContent(content) {
            this.title_content = content.title_content
            this.document_content = content.description_content
            this.video_link = content.link_video
            this.id_content = content.id
            this.type = content.type
        },
        getDataContent() {
            this.$refs.contentEditor.setHTML(this.document_content)
        },
        handleContent() {
            if (this.type == "video") {
                this.show_Video = true;
                this.show_Content = false;
            } else {
                this.show_Content = true;
                this.show_Video = false;
            }
        },
        async updatecontent() {
            this.title_contentFocused = true

            this.video_linkFocused = true
            if (this.title_content) {
                const result = await courseService.updateContent(this.id_content, this.title_content, this.$refs.contentEditor.getHTML(), this.video_link)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    this.isShowUcontent = false
                    courseService.getContentbyIndex(this.id_index).then((data) => {
                        this.contents = data
                    })
                    this.id_content = ''
                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
                this.title_contentFocused = false
                this.video_linkFocused = false
            }
        },
        async deleteContent(id) {
            try {
                const result = await this.$axios.delete(
                    `course/index/content/delete/` + id
                );
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    courseService.getContentbyIndex(this.id_index).then((data) => {
                        this.contents = data
                    })
                } else {
                    this.$refs.toast.showToast(result.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addContent() {
            this.title_contentFocused = true
            this.typeFocused = true
            this.id_indexFocused = true
            if (this.title_content) {
                let result;
                result = await courseService.addContent(this.id_index, this.title_content, this.$refs.contentEditor.getHTML(), this.video_link, this.type)
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message);
                    this.isShowAddContent = false
                    courseService.getContentbyIndex(this.id_index).then((data) => {
                        this.contents = data
                    })
                    this.id_content = ''
                }
                else {
                    this.$refs.toast.showToast(result.data.message);
                }
                this.title_contentFocused = false
                this.typeFocused = false
                this.id_indexFocused = false
            }
            else {
                alert('thieu')
            }
        },

        Complete() {
            window.location.reload()
        }


    }
}
</script>