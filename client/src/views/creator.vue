<template>
    <body class="bg-white">
        <header>
            <nav class="p-6">
                <div class="flex justify-between items-center">
                    <router-link to="/creator">
          <h2 class="font-normal text-2xl leading-6 text-gray-800 dark:text-white">404Learn</h2></router-link>
                    <div class="flex justify-between flex-grow">
                        <div class="flex ml-6 items-center">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4 cursor-pointer text-gray-500"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input class="outline-none text-sm flex-grow bg-gray-100" type="text"
                                placeholder="Tìm kiếm khóa học" />
                        </div>
                        <div class="md:flex space-x-6 hidden">
                            <span class="cursor-pointer px-4 py-2 bg-violet-500 rounded" @click="Showcreate()">+ Thêm khóa
                                học</span>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Section Hero -->
            <div
                class="container mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 h-96 rounded-md flex items-center">
                <div class="sm:ml-20 text-gray-50 text-center sm:text-left">
                    <h1 class="text-5xl font-bold mb-4">
                        404Learn <br />
                        Chia sẽ mọi thứ.
                    </h1>
                    <p class="text-lg inline-block sm:block">Trang quản lý khóa học của nhà sáng tạo.</p>
                    <button class="mt-8 px-4 py-2 bg-fuchsia-500 rounded">Tận tâm vì công việc</button>
                </div>
            </div>

        </header>

        <main class="py-16 container mx-auto px-6 md:px-0">
            <section>
                <h1 class="text-3xl font-bold text-gray-600 mb-10">Danh sách khóa học</h1>
                <!--khóa học-->
                <div class="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 ">
                    <!-- chi tiet -->
                    <div v-for="course in courses">
                        <div class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-3xl  transition duration-300 ease-in-out "
                            v-bind:style="{ 'background-image': 'url(' + course.img_course + ')' }">
                            <div
                                class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                            </div>
                            <div class="relative w-full h-full flex flex-col justify-center items-center">
                                <h3 class="text-center">
                                    <a class="text-white text-2xl font-bold text-center">
                                        {{ course.title_course }}
                                    </a>
                                </h3>
                                <div class="flex">
                                    <button type="button" @click="openEdit(), sendData(course)"
                                        class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Chỉnh
                                        sửa</button>
                                    <button type="button" @click="deleteCourse(course.id)"
                                        class=" cursor-pointer ml-2 py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Xóa</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!--chi muc-->
                <div class="grid sm:grid-cols-3 gap-4 grid-cols-2  mb-10 mt-10">
                    <nav aria-label="Page navigation ">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">&lt&lt</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">&gt&gt</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        </main>

    </body>
    <createCourse v-if="is_showcreate" @cancel="Showcreate()" />
    <editCourses v-if="ShowEdit" @cancel="openEdit()" :courseid="this.id_course" />
</template>

<script>
import createCourse from '../page/creator/createCourses.vue';
import userService from '../plugins/userServices';
import courseService from '../plugins/courseService';
import editCourses from '../page/creator/editCourses.vue';
export default {
    data() {
        return {
            is_showcreate: false,
            user: '',
            courses: [],
            page: 1,
            status: 1,
            isShowIndex: true,
            getcourse: '',
            ShowEdit: false,
            id_course: ''
        }
    },
    components: { createCourse, editCourses },
    mounted() {
        this.user = userService.getUserToken()
        courseService.getCourse(this.page, this.status).then((data) => { this.courses = data.courses });

        if (this.user.role != 'Creator') {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        Showcreate() {
            this.is_showcreate = !this.is_showcreate
        },
        ShowIndex() {
            this.isShowIndex = !this.isShowIndex
        },
        openEdit() {
            this.ShowEdit = !this.ShowEdit
        }, sendData(course) {
            this.getcourse = course
            this.id_course = course.id
        },
        sumcontent(content) {
            let sum = 0;
            for (let i = 0; i < content.length; i++) {
                sum++;
            }
            return sum;
        },
        async deleteCourse(id) {
            try {
                const result = await this.$axios.delete(`course/delete/${id}`)
                if (result.status == 200) {
                    courseService.getCourse(this.page, this.status).then((data) => { this.courses = data.courses });
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
}

</script>